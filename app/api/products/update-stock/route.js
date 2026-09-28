import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/DBconfig/mongoDB";
import Product from "@/app/models/product";

export async function POST(req) {
  try {
    console.log('🔵 بدء update-stock API...');
    await connectMongoDB();
    console.log('✅ تم الاتصال بقاعدة البيانات');

    const body = await req.json();
    console.log('📥 البيانات المستلمة:', body);

    const { products } = body;

    // التحقق من البيانات
    if (!products || !Array.isArray(products)) {
      console.log('❌ بيانات غير صالحة');
      return NextResponse.json(
        { error: "بيانات غير صالحة" },
        { status: 400 }
      );
    }

    console.log(`🔄 معالجة ${products.length} منتج...`);

    const updateResults = [];

    // تحديث كل منتج
    for (const item of products) {
      const { productId, quantity, colorName } = item;
      console.log(`🔍 معالجة المنتج: ${productId}, الكمية: ${quantity}, اللون: ${colorName}`);

      if (!productId || !quantity) {
        updateResults.push({
          productId,
          success: false,
          error: "بيانات ناقصة"
        });
        continue;
      }

      try {
        // 🔄 الحل: نجرب كل الطرق الممكنة للعثور على المنتج
        
        let product;
        
        // الطريقة 1: جرب الـ ID كما هو (لـ MongoDB ObjectId)
        try {
          product = await Product.findById(productId);
          console.log(`✅ وجدنا المنتج باستخدام الـ ID: ${product?.name}`);
        } catch (idError) {
          console.log(`❌ الـ ID غير صالح: ${productId}`);
          product = null;
        }

        // الطريقة 2: إذا فشلت، جرب البحث في كل المنتجات وابحث عن تطابق
        if (!product) {
          console.log(`🔍 البحث في جميع المنتجات...`);
          const allProducts = await Product.find({});
          
          // ابحث عن منتج قد يكون الـ ID يحتوي على جزء منه
          product = allProducts.find(p => 
            productId.includes(p._id.toString()) || 
            p._id.toString().includes(productId)
          );
          
          if (product) {
            console.log(`✅ وجدنا المنتج باستخدام البحث الجزئي: ${product.name}`);
          }
        }

        // إذا ما زلنا ما لقينا المنتج
        if (!product) {
          console.log(`❌ لم نتمكن من العثور على المنتج بأي طريقة`);
          updateResults.push({
            productId,
            success: false,
            error: "لم نتمكن من العثور على المنتج في قاعدة البيانات"
          });
          continue;
        }

        console.log(`✅ المنتج النهائي: ${product.name} (ID: ${product._id})`);

        let updateQuery = {};
        let stockUpdated = false;

        if (colorName) {
          // خصم من كمية اللون المحدد
          const colorIndex = product.colors.findIndex(
            color => color.colorName === colorName
          );

          if (colorIndex === -1) {
            console.log(`❌ اللون غير موجود: ${colorName}`);
            updateResults.push({
              productId,
              success: false,
              error: `اللون ${colorName} غير موجود`
            });
            continue;
          }

          console.log(`🎨 اللون موجود، الكمية الحالية: ${product.colors[colorIndex].stock}`);

          if (product.colors[colorIndex].stock < quantity) {
            console.log(`❌ كمية غير كافية للون: ${colorName}`);
            updateResults.push({
              productId,
              success: false,
              error: `الكمية غير كافية للون ${colorName}`
            });
            continue;
          }

          // تحديث كمية اللون
          const newColorStock = product.colors[colorIndex].stock - quantity;
          updateQuery[`colors.${colorIndex}.stock`] = newColorStock;
          
          // تحديث الكمية الإجمالية للمنتج أيضاً
          if (product.colors && product.colors.length > 0) {
            const hasColorsWithStock = product.colors.some(c => typeof c.stock === 'number' && !isNaN(c.stock));
            if (hasColorsWithStock) {
              const updatedTotalStock = product.colors.reduce((sum, c, idx) => {
                const s = idx === colorIndex ? newColorStock : (c.stock || 0);
                return sum + Math.max(0, s);
              }, 0);
              updateQuery.stock = updatedTotalStock;
            } else if (typeof product.stock === 'number') {
              updateQuery.stock = Math.max(0, product.stock - quantity);
            }
          } else if (typeof product.stock === 'number') {
            updateQuery.stock = Math.max(0, product.stock - quantity);
          }

          stockUpdated = true;
          console.log(`✅ سيتم خصم ${quantity} من اللون ${colorName} وتحديث الكمية الإجمالية للمنتج إلى: ${updateQuery.stock}`);
        } else {
          // خصم من الكمية الرئيسية
          console.log(`📦 الكمية الرئيسية الحالية: ${product.stock}`);
          
          if (product.stock < quantity) {
            console.log(`❌ كمية رئيسية غير كافية`);
            updateResults.push({
              productId,
              success: false,
              error: "الكمية غير كافية"
            });
            continue;
          }

          updateQuery.stock = Math.max(0, product.stock - quantity);
          stockUpdated = true;
          console.log(`✅ سيتم خصم ${quantity} من الكمية الرئيسية`);
        }

        if (stockUpdated) {
          // تنفيذ التحديث باستخدام الـ ID الحقيقي من قاعدة البيانات
          console.log(`🔄 تنفيذ التحديث في قاعدة البيانات...`);
          await Product.findByIdAndUpdate(product._id, {
            $set: updateQuery
          });
          console.log(`✅ تم التحديث في قاعدة البيانات`);

          updateResults.push({
            productId: productId, // الـ ID الأصلي من الكارت
            realProductId: product._id.toString(), // الـ ID الحقيقي
            success: true,
            message: colorName ? 
              `تم خصم ${quantity} من اللون ${colorName}` :
              `تم خصم ${quantity} من الكمية الرئيسية`
          });
        }

      } catch (error) {
        console.error(`❌ خطأ في معالجة المنتج ${productId}:`, error);
        updateResults.push({
          productId,
          success: false,
          error: error.message
        });
      }
    }

    // التحقق إذا كان هناك أي عملية فشلت
    const hasFailures = updateResults.some(result => !result.success);
    console.log(`📊 النتائج النهائية:`, updateResults);

    return NextResponse.json(
      { 
        message: hasFailures ? 
          "تمت بعض العمليات مع أخطاء" : 
          "تم تحديث المخزون بنجاح",
        results: updateResults 
      },
      { status: hasFailures ? 207 : 200 }
    );

  } catch (error) {
    console.error("❌ Error updating stock:", error);
    return NextResponse.json(
      { error: "حدث خطأ في تحديث المخزون: " + error.message },
      { status: 500 }
    );
  }
}