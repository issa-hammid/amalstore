// import mongoose, { Schema, models } from "mongoose";

// const CategorySchema = new Schema(
//   {
//     name: {
//       type: String,
//       required: true,
//       unique: true,
//       trim: true,
//     },
//   },
//   { timestamps: true }
// );

// const Category = models.Category || mongoose.model("Category", CategorySchema);
// export default Category;
import mongoose, { Schema, models } from "mongoose";

const CategorySchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    image: {
      type: String, // URL من Cloudinary
      required: false, // اختيارية في البداية
    },
    imagePublicId: {
      type: String, // Public ID في Cloudinary
      required: false,
    },
    description: {
      type: String,
      trim: true,
    },
    // الشريط الإعلاني المتحرك للتصنيف
    tickerText: {
      type: String,
      default: "",
      trim: true,
    },
    tickerBgColor: {
      type: String,
      default: "#d97706", // لون خردلي / ذهبي افتراضي مثل الصورة
    },
    tickerTextColor: {
      type: String,
      default: "#ffffff",
    },
    tickerEnabled: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, strict: false }
);

// حذف النموذج المخزن مؤقتاً لضمان تحديث الحقول فورياً في بيئة التطوير
if (mongoose.models && mongoose.models.Category) {
  delete mongoose.models.Category;
}

const Category = mongoose.models.Category || mongoose.model("Category", CategorySchema);
export default Category;