import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/DBconfig/mongoDB";
import Product from "@/app/models/product";

export async function GET(req, { params }) {
  try {
    await connectMongoDB();
    
    const { id } = params;
    
    // تنظيف الـ ID - إزالة الـ "-main" إذا موجود
    const cleanId = id.replace('-main', '');
    
    const product = await Product.findById(cleanId).populate('category', 'name');
    
    if (!product) {
      return NextResponse.json(
        { error: "المنتج غير موجود" },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      success: true,
      product: {
        id: product._id,
        name: product.name,
        category: product.category?.name || 'غير مصنف'
      }
    });
    
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      { error: "حدث خطأ في جلب بيانات المنتج" },
      { status: 500 }
    );
  }
}