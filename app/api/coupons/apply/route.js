import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/DBconfig/mongoDB";
import Coupon from "@/app/models/Coupon";

export async function POST(request) {
  try {
    await connectMongoDB();

    const { code } = await request.json();

    if (!code || typeof code !== "string") {
      return NextResponse.json(
        { success: false, error: "كود الكوبون مطلوب" },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();
    const updated = await Coupon.findOneAndUpdate(
      { code: cleanCode },
      { $inc: { usedCount: 1 } },
      { new: true }
    );

    if (!updated) {
      return NextResponse.json(
        { success: false, error: "الكوبون غير موجود" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم تحديث استخدام الكوبون",
      usedCount: updated.usedCount,
    });
  } catch (error) {
    console.error("Error applying coupon:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
