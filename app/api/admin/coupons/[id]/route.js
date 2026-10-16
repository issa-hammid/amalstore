import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/DBconfig/mongoDB";
import Coupon from "@/app/models/Coupon";

// تعديل أو تفعيل/تعطيل الكوبون
export async function PATCH(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = await params;
    const body = await request.json();

    const updatedCoupon = await Coupon.findByIdAndUpdate(
      id,
      { $set: body },
      { new: true }
    );

    if (!updatedCoupon) {
      return NextResponse.json(
        { success: false, error: "الكوبون غير موجود" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم تحديث الكوبون بنجاح",
      coupon: updatedCoupon,
    });
  } catch (error) {
    console.error("Error updating coupon:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

// حذف الكوبون
export async function DELETE(request, { params }) {
  try {
    await connectMongoDB();
    const { id } = await params;

    const deletedCoupon = await Coupon.findByIdAndDelete(id);

    if (!deletedCoupon) {
      return NextResponse.json(
        { success: false, error: "الكوبون غير موجود" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "تم حذف الكوبون بنجاح",
    });
  } catch (error) {
    console.error("Error deleting coupon:", error);
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}
