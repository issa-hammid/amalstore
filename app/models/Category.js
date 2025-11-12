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
    }
  },
  { timestamps: true }
);

const Category = models.Category || mongoose.model("Category", CategorySchema);
export default Category;