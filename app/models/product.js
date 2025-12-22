import mongoose, { Schema, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      
      trim: true,
    },
    description: {
      type: String,
      // 
    },
    image: {
      type: String,
      // 
    },
    price: {
      type: Number,
      // 
    },
    oldPrice: {
      type: Number,
    },
    discountPercent: {
      type: Number,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    stock: {
      type: Number,
      
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      
    },
    colors: [
      {
        colorName: String,
        image: String,
        stock: Number,
      },
    ],
  },
  { timestamps: true }
);

const Product = models.Product || mongoose.model("Product", ProductSchema);
export default Product;
