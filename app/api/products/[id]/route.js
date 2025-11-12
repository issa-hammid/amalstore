
import { NextResponse } from "next/server";
import mongoose from "mongoose";
import cloudinary from "../../../lib/cloudinary"; // استيراد من الملف الموجود

// الموديل مباشرة
const ProductSchema = new mongoose.Schema({
  name: String,
  description: String,
  image: String,
  price: Number,
  oldPrice: Number,
  discountPercent: Number,
  isFeatured: Boolean,
  stock: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  colors: Array,
}, { timestamps: true });

const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);

// 🔧 دالة مساعدة لاستخراج public_id من رابط Cloudinary
const getPublicIdFromUrl = (imageUrl) => {
  if (!imageUrl || !imageUrl.includes('cloudinary.com')) return null;
  
  try {
    const parts = imageUrl.split('/');
    const uploadIndex = parts.findIndex(part => part === 'upload');
    
    if (uploadIndex !== -1 && parts.length > uploadIndex + 2) {
      // الرابط بيكون مثل: https://res.cloudinary.com/xxx/image/upload/v1234567/products/xyz.jpg
      const publicIdWithVersion = parts.slice(uploadIndex + 2).join('/');
      // نremove الـ version إذا موجود
      const publicId = publicIdWithVersion.replace(/^v\d+\//, '');
      // نremove الامتداد
      return publicId.split('.')[0];
    }
  } catch (error) {
    console.error("Error extracting public_id:", error);
  }
  return null;
};

// 🔧 دالة مساعدة لحذف الصور من Cloudinary (مُصلحة)
const deleteImageFromCloudinary = async (imageUrl) => {
  const publicId = getPublicIdFromUrl(imageUrl);
  
  if (!publicId) {
    console.log("❌ لا يمكن استخراج public_id من الرابط:", imageUrl);
    return;
  }
  
  try {
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result === 'ok') {
      console.log("🗑️ تم حذف الصورة القديمة:", publicId);
    } else {
      console.log("⚠️ الصورة قد تكون محذوفة مسبقاً:", publicId);
    }
    
    return result;
  } catch (error) {
    console.error("❌ فشل في حذف الصورة القديمة:", error.message);
  }
};

// 🔧 دالة مساعدة لرفع الصور إلى Cloudinary (مُصلحة)
const uploadImageToCloudinary = async (file) => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      { 
        folder: "products",
        resource_type: "auto" 
      }, 
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};

export async function GET(request, { params }) {
  try {
    const { id } = await params;
    console.log("🔍 بدء جلب المنتج بالـ ID:", id);
    
    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("✅ تم الاتصال بقاعدة البيانات");
    }

    const product = await Product.findById(id)
      .populate('category', 'name _id');

    console.log("📦 نتيجة البحث:", product ? "موجود" : "غير موجود");

    if (!product) {
      return NextResponse.json(
        { 
          success: false, 
          error: "المنتج غير موجود",
          productId: id 
        },
        { status: 404 }
      );
    }

    console.log("✅ تم جلب المنتج بنجاح:", product.name);
    
    return NextResponse.json(
      { 
        success: true, 
        product: product 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ خطأ في جلب المنتج:", error.message);
    return NextResponse.json(
      { 
        success: false, 
        error: error.message
      },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = await params;
    console.log("✏️ بدء تحديث المنتج:", id);

    const formData = await request.formData();
    console.log("📋 بيانات التعديل:", Array.from(formData.keys()));

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // البحث عن المنتج الحالي
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "المنتج غير موجود" },
        { status: 404 }
      );
    }

    // معالجة البيانات الأساسية
    const updateData = {
      name: formData.get("name"),
      description: formData.get("description"),
      price: parseFloat(formData.get("price")),
      oldPrice: formData.get("oldPrice") ? parseFloat(formData.get("oldPrice")) : null,
      discountPercent: formData.get("discountPercent") ? parseFloat(formData.get("discountPercent")) : null,
      isFeatured: formData.get("isFeatured") === "true",
      stock: parseInt(formData.get("stock")),
      category: formData.get("category"),
    };

    // 1. معالجة الصورة الرئيسية
    const mainImageFile = formData.get("image");
    if (mainImageFile && mainImageFile.size > 0) {
      console.log("📸 رفع صورة رئيسية جديدة...");
      
      // 🗑️ حذف الصورة القديمة أولاً إذا كانت موجودة
      if (existingProduct.image) {
        console.log("🗑️ جاري حذف الصورة الرئيسية القديمة...");
        await deleteImageFromCloudinary(existingProduct.image);
      }
      
      try {
        const mainImageResult = await uploadImageToCloudinary(mainImageFile);
        updateData.image = mainImageResult.secure_url;
        console.log("✅ تم رفع الصورة الرئيسية الجديدة");
      } catch (error) {
        console.error("❌ فشل في رفع الصورة الرئيسية:", error);
        return NextResponse.json(
          { success: false, error: "فشل في رفع الصورة الرئيسية" },
          { status: 500 }
        );
      }
    }

    // 2. معالجة الألوان
    const processedColors = [];
    let colorCount = 0;

    // عد عدد الألوان
    for (let key of formData.keys()) {
      if (key.startsWith('colors[') && key.includes('][colorName]')) {
        colorCount++;
      }
    }

    console.log(`🎨 معالجة ${colorCount} لون`);

    for (let i = 0; i < colorCount; i++) {
      const colorName = formData.get(`colors[${i}][colorName]`);
      const colorStock = formData.get(`colors[${i}][stock]`);
      const colorImageFile = formData.get(`colors[${i}][image]`);

      let colorImageUrl = existingProduct.colors[i]?.image || "";

      // إذا في صورة جديدة للون
      if (colorImageFile && colorImageFile.size > 0) {
        console.log(`📸 رفع صورة اللون ${i}...`);
        
        // 🗑️ حذف الصورة القديمة إذا موجودة
        const oldColorImage = existingProduct.colors[i]?.image;
        if (oldColorImage) {
          console.log(`🗑️ جاري حذف صورة اللون القديمة ${i}...`);
          await deleteImageFromCloudinary(oldColorImage);
        }
        
        try {
          const colorImageResult = await uploadImageToCloudinary(colorImageFile);
          colorImageUrl = colorImageResult.secure_url;
          console.log(`✅ تم رفع صورة اللون ${i}`);
        } catch (error) {
          console.error(`❌ فشل في رفع صورة اللون ${i}:`, error);
        }
      }

      processedColors.push({
        colorName: colorName || "",
        image: colorImageUrl,
        stock: parseInt(colorStock) || 0,
      });
    }

    updateData.colors = processedColors;

    // تحديث المنتج
    console.log("💾 حفظ التعديلات...");
    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    ).populate('category', 'name _id');

    console.log("✅ تم تحديث المنتج بنجاح:", updatedProduct.name);

    return NextResponse.json(
      { 
        success: true, 
        message: "تم تحديث المنتج بنجاح",
        product: updatedProduct 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ خطأ في تحديث المنتج:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "حدث خطأ أثناء تحديث المنتج: " + error.message 
      },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = await params;
    console.log("🗑️ بدء حذف المنتج:", id);

    if (mongoose.connection.readyState !== 1) {
      await mongoose.connect(process.env.MONGODB_URI);
    }

    // البحث عن المنتج قبل الحذف
    const existingProduct = await Product.findById(id);
    if (!existingProduct) {
      return NextResponse.json(
        { success: false, error: "المنتج غير موجود" },
        { status: 404 }
      );
    }

    console.log("📦 المنتج المطلوب حذفه:", existingProduct.name);

    // 🗑️ ١. حذف الصورة الرئيسية من Cloudinary
    if (existingProduct.image) {
      console.log("🗑️ جاري حذف الصورة الرئيسية...");
      await deleteImageFromCloudinary(existingProduct.image);
    }

    // 🗑️ ٢. حذف صور الألوان من Cloudinary
    if (existingProduct.colors && existingProduct.colors.length > 0) {
      console.log(`🎨 جاري حذف ${existingProduct.colors.length} صورة لون...`);
      
      for (let i = 0; i < existingProduct.colors.length; i++) {
        const colorImage = existingProduct.colors[i]?.image;
        if (colorImage) {
          console.log(`🗑️ حذف صورة اللون ${i}...`);
          await deleteImageFromCloudinary(colorImage);
        }
      }
    }

    // 🗑️ ٣. حذف المنتج من قاعدة البيانات
    const deletedProduct = await Product.findByIdAndDelete(id);
    
    console.log("✅ تم حذف المنتج بنجاح:", existingProduct.name);

    return NextResponse.json(
      { 
        success: true, 
        message: "تم حذف المنتج بنجاح",
        deletedProduct: {
          id: deletedProduct._id,
          name: deletedProduct.name
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ خطأ في حذف المنتج:", error);
    return NextResponse.json(
      { 
        success: false, 
        error: "حدث خطأ أثناء حذف المنتج: " + error.message 
      },
      { status: 500 }
    );
  }
}
