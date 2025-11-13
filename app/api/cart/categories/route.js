import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/DBconfig/mongoDB";
import Product from "@/app/models/product";

export async function POST(req) {
  try {
    await connectMongoDB();
    
    const { productIds } = await req.json();
    
    if (!productIds || !Array.isArray(productIds)) {
      return NextResponse.json(
        { error: "بيانات غير صالحة" },
        { status: 400 }
      );
    }

    // تنظيف الـ IDs
    const cleanIds = productIds.map(id => id.replace('-main', ''));
    
    // جلب جميع المنتجات مرة واحدة
    const products = await Product.find({ 
      _id: { $in: cleanIds } 
    }).populate('category', 'name');
    
    // إنشاء خريطة للتصنيفات
    const categoriesMap = {};
    products.forEach(product => {
      const originalId = productIds.find(id => id.replace('-main', '') === product._id.toString());
      categoriesMap[originalId] = product.category?.name || 'غير مصنف';
    });

    return NextResponse.json({
      success: true,
      categories: categoriesMap
    });
    
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "حدث خطأ في جلب التصنيفات" },
      { status: 500 }
    );
  }
}