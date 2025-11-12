import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/DBconfig/mongoDB";
import Product from "@/app/models/product";
import Category from "@/app/models/Category";

export async function GET() {
  try {
    await connectMongoDB();

    // جلب جميع المنتجات مع بيانات التصنيف
    const products = await Product.find({})
      .populate('category', 'name') // جلب اسم التصنيف فقط
      .sort({ createdAt: -1 }) // ترتيب من الأحدث للأقدم
      .lean(); // لتحسين الأداء

    console.log(`✅ تم جلب ${products.length} منتج`);

    return NextResponse.json(
      { 
        success: true,
        products: products 
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Error fetching products:", error);
    return NextResponse.json(
      { 
        success: false,
        error: "حدث خطأ أثناء جلب المنتجات" 
      },
      { status: 500 }
    );
  }
}