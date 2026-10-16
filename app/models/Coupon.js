import mongoose, { Schema, models } from "mongoose";

const CouponSchema = new Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      uppercase: true,
    },
    discountType: {
      type: String,
      enum: ["percentage", "fixed"],
      default: "percentage",
      required: true,
    },
    discountValue: {
      type: Number,
      required: true,
      min: 1,
    },
    minOrderAmount: {
      type: Number,
      default: 0,
      min: 0,
    },
    maxDiscount: {
      type: Number,
      default: null, // الحد الأقصى للخصم في حال النسبة المئوية
    },
    usageLimit: {
      type: Number,
      default: null, // الحد الأقصى لمرات الاستخدام الكلية
    },
    usedCount: {
      type: Number,
      default: 0,
    },
    startDate: {
      type: Date,
      default: Date.now,
    },
    endDate: {
      type: Date,
      default: null,
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Coupon = models.Coupon || mongoose.model("Coupon", CouponSchema);
export default Coupon;
