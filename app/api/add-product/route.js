// import { NextResponse } from "next/server";
// import { connectMongoDB } from "@/app/DBconfig/mongoDB";
// import Product from "@/app/models/product";
// import Category from "@/app/models/Category";

// export async function POST(req){
//     try{
//         //we need to connect with DB
//         await connectMongoDB();
//         const {
//             name,
//             description,
//             image,
//             price,
//             oldPrice,
//             discountPercent,
//             isFeatured,
//             stock,
//             category,
//             colors,
//         } = await req.json();

//         if(!name || !description || !image || !price || !stock){
//            return NextResponse.json(
//             {error: "الرجاء تعبئة الحقول الاساسية لتنظيم بيانات المنتج كما هو مطلوب"},
//             {status: 400}
//            )
//         }

//         const foundCategory = await Category.findById(category);
//         if(!foundCategory){
//             return NextResponse.json(
//                 {error: "تصنيف المنتج غير موجود "},
//                 {status: 404}
//             );
//         }

//         //crate new product in db
//         const newProduct = await Product.create({
//             name,
//             description,
//             image,
//             price,
//             oldPrice,
//             discountPercent,
//             isFeatured,
//             stock,
//             category: foundCategory._id,
//             colors,  
//         });
//         return NextResponse.json(
//             { message: "تم إنشاء المنتج بنجاح", product: newProduct },
//             { status: 201 }
//         );
//        } catch (error) {
//             console.error("Error creating product:", error);
//             return NextResponse.json(
//                 { error: "حدث خطأ أثناء إنشاء المنتج" },
//                 { status: 500 }
//             );
//         }

// }

// import { NextResponse } from "next/server";
// import { connectMongoDB } from "@/app/DBconfig/mongoDB";
// import Product from "@/app/models/product";
// import Category from "@/app/models/Category";
// import cloudinary from "@/app/lib/cloudinary";

// export async function POST(req) {
//   try {
//     await connectMongoDB();

//     // استقبال البيانات من FormData لأن فيها ملفات (images)
//     const formData = await req.formData();

//     const name = formData.get("name");
//     const description = formData.get("description");
//     const price = formData.get("price");
//     const oldPrice = formData.get("oldPrice");
//     const discountPercent = formData.get("discountPercent");
//     const isFeatured = formData.get("isFeatured") === "true";
//     const stock = formData.get("stock");
//     const category = formData.get("category");

//     const colors = JSON.parse(formData.get("colors") || "[]");

//     // الصورة الرئيسية
//     const imageFile = formData.get("image");

//     if (!name || !description || !price || !stock || !imageFile) {
//       return NextResponse.json(
//         { error: "الرجاء تعبئة جميع الحقول المطلوبة" },
//         { status: 400 }
//       );
//     }

//     // التحقق من وجود التصنيف
//     const foundCategory = await Category.findById(category);
//     if (!foundCategory) {
//       return NextResponse.json(
//         { error: "التصنيف غير موجود" },
//         { status: 404 }
//       );
//     }

//     // رفع الصورة إلى Cloudinary
//     const bytes = await imageFile.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadResponse = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream({ folder: "products" }, (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         })
//         .end(buffer);
//     });

//     const productImageUrl = uploadResponse.secure_url;

//     // معالجة ألوان المنتج (ورفع صورها إن وجدت)
//     const processedColors = await Promise.all(
//       colors.map(async (color) => {
//         if (color.image && color.image.startsWith("data:")) {
//           // لو الصورة مرسلة كـ base64 نرفعها
//           const uploadColor = await cloudinary.uploader.upload(color.image, {
//             folder: "product_colors",
//           });
//           return {
//             ...color,
//             image: uploadColor.secure_url,
//           };
//         }
//         return color;
//       })
//     );

//     // إنشاء المنتج الجديد في قاعدة البيانات
//     const newProduct = await Product.create({
//       name,
//       description,
//       image: productImageUrl,
//       price,
//       oldPrice,
//       discountPercent,
//       isFeatured,
//       stock,
//       category: foundCategory._id,
//       colors: processedColors,
//     });

//     return NextResponse.json(
//       { message: "✅ تم إنشاء المنتج بنجاح", product: newProduct },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating product:", error);
//     return NextResponse.json(
//       { error: "حدث خطأ أثناء إنشاء المنتج" },
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from "next/server";
// import { connectMongoDB } from "@/app/DBconfig/mongoDB";
// import Product from "@/app/models/product";
// import Category from "@/app/models/Category";
// import cloudinary from "../../lib/cloudinary";

// export async function POST(req) {
//   try {
//     await connectMongoDB();

//     const formData = await req.formData();
// console.log("Form Data keys:", Array.from(formData.keys()));

//     const file = formData.get("image");
//     const name = formData.get("name");
//     const description = formData.get("description");
//     const price = formData.get("price");
//     const oldPrice = formData.get("oldPrice");
//     const discountPercent = formData.get("discountPercent");
//     const isFeatured = formData.get("isFeatured") === "true";
//     const stock = formData.get("stock");
//     const category = formData.get("category");
//     const colors = JSON.parse(formData.get("colors") || "[]");

//     // تحقق من الحقول الأساسية
   

//     // تحقق من وجود التصنيف
//     const foundCategory = await Category.findById(category);
//     if (!foundCategory) {
//       return NextResponse.json(
//         { error: "التصنيف المحدد غير موجود" },
//         { status: 404 }
//       );
//     }

//     // رفع الصورة إلى Cloudinary
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     const uploadResult = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream({ folder: "products" }, (error, result) => {
//           if (error) reject(error);
//           else resolve(result);
//         })
//         .end(buffer);
//     });

//     // إنشاء المنتج
//     const newProduct = await Product.create({
//       name,
//       description,
//       image: uploadResult.secure_url,
//       price,
//       oldPrice,
//       discountPercent,
//       isFeatured,
//       stock,
//       category: foundCategory._id,
//       colors,
//     });

//     return NextResponse.json(
//       { message: "تم إنشاء المنتج بنجاح", product: newProduct },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating product:", error);
//     return NextResponse.json(
//       { error: "حدث خطأ أثناء إنشاء المنتج" },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/DBconfig/mongoDB";
import Product from "@/app/models/product";
import Category from "@/app/models/Category";
import cloudinary from "../../lib/cloudinary";

export async function POST(req) {
  try {
    await connectMongoDB();

    const formData = await req.formData();
    console.log("Form Data keys:", Array.from(formData.keys()));

    // الحصول على البيانات الأساسية
    const name = formData.get("name");
    const description = formData.get("description");
    const price = parseFloat(formData.get("price"));
    const oldPrice = formData.get("oldPrice") ? parseFloat(formData.get("oldPrice")) : null;
    const discountPercent = formData.get("discountPercent") ? parseFloat(formData.get("discountPercent")) : null;
    const isFeatured = formData.get("isFeatured") === "true";
    const stock = parseInt(formData.get("stock"));
    const category = formData.get("category");
    const mainImageFile = formData.get("image");

    // التحقق من الحقول الأساسية
    if (!name || !description || !price || !stock || !category || !mainImageFile) {
      return NextResponse.json(
        { error: "جميع الحقول الأساسية مطلوبة" },
        { status: 400 }
      );
    }

    // تحقق من وجود التصنيف
    const foundCategory = await Category.findById(category);
    if (!foundCategory) {
      return NextResponse.json(
        { error: "التصنيف المحدد غير موجود" },
        { status: 404 }
      );
    }

    // 🔄 دالة مساعدة لرفع الصور
    const uploadImageToCloudinary = async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream(
            { 
              folder: "products",
              resource_type: "auto" 
            }, 
            (error, result) => {
              if (error) reject(error);
              else resolve(result);
            }
          )
          .end(buffer);
      });
    };

    // 1. رفع الصورة الرئيسية
    console.log("📸 رفع الصورة الرئيسية...");
    const mainImageResult = await uploadImageToCloudinary(mainImageFile);
    console.log("✅ تم رفع الصورة الرئيسية");

    // 2. معالجة الألوان ورفع صورها
    console.log("🎨 معالجة الألوان...");
    const processedColors = [];

    // عدّ عدد الألوان من خلال البحث عن keys
    let colorCount = 0;
    for (let key of formData.keys()) {
      if (key.startsWith('colors[') && key.includes('][colorName]')) {
        colorCount++;
      }
    }

    console.log(`🔍 عدد الألوان المكتشفة: ${colorCount}`);

    for (let i = 0; i < colorCount; i++) {
      const colorName = formData.get(`colors[${i}][colorName]`);
      const colorStock = formData.get(`colors[${i}][stock]`);
      const colorImageFile = formData.get(`colors[${i}][image]`);

      console.log(`اللون ${i}:`, { 
        colorName, 
        colorStock, 
        hasImage: !!colorImageFile 
      });

      let colorImageUrl = "";

      // إذا في صورة للون، ارفعها
      if (colorImageFile && colorImageFile.size > 0) {
        console.log(`📸 رفع صورة اللون ${i}...`);
        try {
          const colorImageResult = await uploadImageToCloudinary(colorImageFile);
          colorImageUrl = colorImageResult.secure_url;
          console.log(`✅ تم رفع صورة اللون ${i}`);
        } catch (error) {
          console.error(`❌ فشل في رفع صورة اللون ${i}:`, error);
        }
      }

      processedColors.push({
        colorName: colorName || "",
        image: colorImageUrl,
        stock: parseInt(colorStock) || 0,
      });
    }

    console.log("🎨 الألوان المعالجة:", processedColors);

    // 3. إنشاء المنتج
    console.log("💾 حفظ المنتج في الداتابيز...");
    const newProduct = await Product.create({
      name,
      description,
      image: mainImageResult.secure_url,
      price,
      oldPrice: oldPrice || null,
      discountPercent: discountPercent || null,
      isFeatured,
      stock,
      category: foundCategory._id,
      colors: processedColors,
    });

    console.log("✅ المنتج تم إنشاؤه بنجاح!");
    return NextResponse.json(
      { 
        message: "تم إنشاء المنتج بنجاح", 
        product: newProduct 
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ Error creating product:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء المنتج: " + error.message },
      { status: 500 }
    );
  }
}