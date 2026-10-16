import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/DBconfig/mongoDB";
import Coupon from "@/app/models/Coupon";

export async function POST(request) {
  try {
    await connectMongoDB();

    const { code, cartTotal } = await request.json();

    if (!code || typeof code !== "string" || !code.trim()) {
      return NextResponse.json(
        { success: false, error: "يرجى إدخال كود الكوبون" },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();
    const totalAmount = Number(cartTotal) || 0;

    const coupon = await Coupon.findOne({ code: cleanCode });

    if (!coupon) {
      return NextResponse.json(
        { success: false, error: "كود الكوبون غير صحيح أو غير موجود" },
        { status: 404 }
      );
    }

    if (!coupon.isActive) {
      return NextResponse.json(
        { success: false, error: "هذا الكوبون معطّل حالياً" },
        { status: 400 }
      );
    }

    const now = new Date();

    if (coupon.startDate && new Date(coupon.startDate) > now) {
      return NextResponse.json(
        { success: false, error: "هذا الكوبون لم يبدأ تفعيله بعد" },
        { status: 400 }
      );
    }

    if (coupon.endDate && new Date(coupon.endDate) < now) {
      return NextResponse.json(
        { success: false, error: "عذراً، هذا الكوبون منتهي الصلاحية" },
        { status: 400 }
      );
    }

    if (coupon.usageLimit && coupon.usedCount >= coupon.usageLimit) {
      return NextResponse.json(
        { success: false, error: "تم استنفاد الحد الأقصى لاستخدام هذا الكوبون" },
        { status: 400 }
      );
    }

    if (coupon.minOrderAmount && totalAmount < coupon.minOrderAmount) {
      return NextResponse.json(
        {
          success: false,
          error: `الحد الأدنى للطلب لتفعيل هذا الكوبون هو ₪${coupon.minOrderAmount}`,
        },
        { status: 400 }
      );
    }

    // حساب قيمة الخصم
    let discountAmount = 0;
    if (coupon.discountType === "percentage") {
      discountAmount = (totalAmount * coupon.discountValue) / 100;
      if (coupon.maxDiscount && discountAmount > coupon.maxDiscount) {
        discountAmount = coupon.maxDiscount;
      }
    } else {
      // مبلغ ثابت
      discountAmount = Math.min(coupon.discountValue, totalAmount);
    }

    discountAmount = Math.round(discountAmount * 100) / 100;

    return NextResponse.json(
      {
        success: true,
        coupon: {
          code: coupon.code,
          discountType: coupon.discountType,
          discountValue: coupon.discountValue,
          discountAmount: discountAmount,
        },
        message: "تم تطبيق الكوبون بنجاح!",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error validating coupon:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء فحص الكوبون: " + error.message },
      { status: 500 }
    );
  }
}
