import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/DBconfig/mongoDB";
import Product from "../../../../models/product";

export async function GET(request, { params }) {
  try {
    await connectMongoDB();
    
    const { id } = await params;
    
    const products = await Product.find({ category: id })
      .populate('category', 'name')
      .limit(150)
      .lean();

    return NextResponse.json({
      success: true,
      products: products
    }, { status: 200 });

  } catch (error) {
    console.error("Error:", error);
    return NextResponse.json({
      success: false,
      error: "حدث خطأ في جلب المنتجات"
    }, { status: 500 });
  }
}

// import { NextResponse } from "next/server";
// import { connectMongoDB } from "@/app/DBconfig/mongoDB";
// import Product from "../../../../models/product";

// export async function GET(request, { params }) {
//   try {
//     await connectMongoDB();
    
//     const { id } = await params;
    
//     // جلب منتجات التصنيف
//     const products = await Product.find({ category: id })
//       .populate('category', 'name')
//       .limit(10)
//       .lean();

//     return NextResponse.json({
//       success: true,
//       products: products
//     }, { status: 200 });

//   } catch (error) {
//     console.error("Error:", error);
//     return NextResponse.json({
//       success: false,
//       error: "حدث خطأ في جلب المنتجات"
//     }, { status: 500 });
//   }
// }