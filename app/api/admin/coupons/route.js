import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/DBconfig/mongoDB";
import Coupon from "@/app/models/Coupon";

// جلب كل الكوبونات للوحة التحكم
export async function GET() {
  try {
    await connectMongoDB();

    const coupons = await Coupon.find().sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      coupons,
    });
  } catch (error) {
    console.error("Error fetching coupons:", error);
    return NextResponse.json(
      { success: false, error: "فشل في جلب الكوبونات: " + error.message },
      { status: 500 }
    );
  }
}

// إضافة كوبون جديد
export async function POST(request) {
  try {
    await connectMongoDB();

    const body = await request.json();
    const {
      code,
      discountType,
      discountValue,
      minOrderAmount,
      maxDiscount,
      usageLimit,
      startDate,
      endDate,
      isActive,
    } = body;

    if (!code || !code.trim()) {
      return NextResponse.json(
        { success: false, error: "كود الكوبون مطلوب" },
        { status: 400 }
      );
    }

    if (!discountValue || Number(discountValue) <= 0) {
      return NextResponse.json(
        { success: false, error: "قيمة الخصم يجب أن تكون أكبر من صفر" },
        { status: 400 }
      );
    }

    if (discountType === "percentage" && Number(discountValue) > 100) {
      return NextResponse.json(
        { success: false, error: "نسبة الخصم المئوية لا يمكن أن تتجاوز 100%" },
        { status: 400 }
      );
    }

    const cleanCode = code.trim().toUpperCase();

    // التحقق من عدم تكرار الكود
    const existing = await Coupon.findOne({ code: cleanCode });
    if (existing) {
      return NextResponse.json(
        { success: false, error: "هذا الكود مستخدم بالفعل، يرجى اختيار كود آخر" },
        { status: 400 }
      );
    }

    const newCoupon = await Coupon.create({
      code: cleanCode,
      discountType: discountType || "percentage",
      discountValue: Number(discountValue),
      minOrderAmount: minOrderAmount ? Number(minOrderAmount) : 0,
      maxDiscount: maxDiscount ? Number(maxDiscount) : null,
      usageLimit: usageLimit ? Number(usageLimit) : null,
      startDate: startDate ? new Date(startDate) : new Date(),
      endDate: endDate ? new Date(endDate) : null,
      isActive: isActive !== undefined ? isActive : true,
    });

    return NextResponse.json(
      {
        success: true,
        message: "تم إنشاء الكوبون بنجاح",
        coupon: newCoupon,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating coupon:", error);
    return NextResponse.json(
      { success: false, error: "حدث خطأ أثناء إنشاء الكوبون: " + error.message },
      { status: 500 }
    );
  }
}
