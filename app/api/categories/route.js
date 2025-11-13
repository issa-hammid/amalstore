// import { NextResponse } from "next/server";
// import { connectMongoDB } from "@/app/DBconfig/mongoDB";
// import Category from "@/app/models/Category";

// export async function POST(req) {
//   try {
//     await connectMongoDB();
//     const { name } = await req.json();

//     if (!name || name.trim() === "") {
//       return NextResponse.json(
//         { error: "يرجى إدخال اسم التصنيف" },
//         { status: 400 }
//       );
//     }

//     // التأكد من عدم تكرار الاسم
//     const exists = await Category.findOne({ name });
//     if (exists) {
//       return NextResponse.json(
//         { error: "اسم التصنيف موجود بالفعل" },
//         { status: 409 }
//       );
//     }

//     const newCategory = await Category.create({ name });

//     return NextResponse.json(
//       { message: "تم إنشاء التصنيف بنجاح", category: newCategory },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating category:", error);
//     return NextResponse.json(
//       { error: "حدث خطأ أثناء إنشاء التصنيف" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     await connectMongoDB();
//     const categories = await Category.find().sort({ createdAt: -1 });
//     return NextResponse.json({ categories });
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return NextResponse.json(
//       { error: "فشل في جلب التصنيفات" },
//       { status: 500 }
//     );
//   }
// }
// import { NextResponse } from "next/server";
// import { connectMongoDB } from "@/app/DBconfig/mongoDB";
// import Category from "@/app/models/Category";

// export async function POST(req) {
//   try {
//     await connectMongoDB();
//     const { name } = await req.json();

//     if (!name || name.trim() === "") {
//       return NextResponse.json(
//         { error: "يرجى إدخال اسم التصنيف" },
//         { status: 400 }
//       );
//     }

//     const exists = await Category.findOne({ name });
//     if (exists) {
//       return NextResponse.json(
//         { error: "اسم التصنيف موجود بالفعل" },
//         { status: 409 }
//       );
//     }

//     const newCategory = await Category.create({ name });

//     return NextResponse.json(
//       { message: "تم إنشاء التصنيف بنجاح", category: newCategory },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating category:", error);
//     return NextResponse.json(
//       { error: "حدث خطأ أثناء إنشاء التصنيف" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     await connectMongoDB();
    
//     const categories = await Category.find().sort({ createdAt: -1 });
    
//     // إضافة productCount يدوياً إذا ما في منتجات
//     const categoriesWithCount = categories.map(cat => ({
//       ...cat.toObject(),
//       productCount: 0
//     }));

//     return NextResponse.json({ categories: categoriesWithCount });
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return NextResponse.json(
//       { error: "فشل في جلب التصنيفات" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req) {
//   try {
//     await connectMongoDB();
//     const { id, name } = await req.json();

//     if (!name || name.trim() === "") {
//       return NextResponse.json(
//         { error: "يرجى إدخال اسم التصنيف" },
//         { status: 400 }
//       );
//     }

//     const exists = await Category.findOne({ name, _id: { $ne: id } });
//     if (exists) {
//       return NextResponse.json(
//         { error: "اسم التصنيف موجود بالفعل" },
//         { status: 409 }
//       );
//     }

//     const updatedCategory = await Category.findByIdAndUpdate(
//       id,
//       { name },
//       { new: true }
//     );

//     if (!updatedCategory) {
//       return NextResponse.json(
//         { error: "التصنيف غير موجود" },
//         { status: 404 }
//       );
//     }

//     return NextResponse.json(
//       { message: "تم تعديل التصنيف بنجاح", category: updatedCategory },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating category:", error);
//     return NextResponse.json(
//       { error: "حدث خطأ أثناء تعديل التصنيف" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req) {
//   try {
//     await connectMongoDB();
    
//     // طريقة أفضل لاستقبال البيانات
//     const url = new URL(req.url);
//     const id = url.searchParams.get('id');
    
//     // إذا ما ضبطت الطريقة الأولى، جرب الطريقة الثانية
//     let requestData;
//     if (!id) {
//       try {
//         requestData = await req.json();
//       } catch (parseError) {
//         return NextResponse.json(
//           { error: "بيانات غير صالحة" },
//           { status: 400 }
//         );
//       }
//     }

//     const categoryId = id || requestData?.id;
    
//     console.log("🔍 Deleting category with ID:", categoryId);

//     if (!categoryId) {
//       return NextResponse.json(
//         { error: "معرف التصنيف مطلوب" },
//         { status: 400 }
//       );
//     }

//     // تحقق إذا التصنيف موجود
//     const category = await Category.findById(categoryId);
//     if (!category) {
//       return NextResponse.json(
//         { error: "التصنيف غير موجود" },
//         { status: 404 }
//       );
//     }

//     // حاول حذف التصنيف مباشرة
//     const deletedCategory = await Category.findByIdAndDelete(categoryId);

//     if (!deletedCategory) {
//       return NextResponse.json(
//         { error: "فشل في حذف التصنيف" },
//         { status: 500 }
//       );
//     }

//     console.log("✅ Category deleted successfully:", deletedCategory);
    
//     return NextResponse.json(
//       { message: "تم حذف التصنيف بنجاح" },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("❌ Error deleting category:", error);
//     return NextResponse.json(
//       { error: "حدث خطأ أثناء حذف التصنيف: " + error.message },
//       { status: 500 }
//     );
//   }
// }
import { NextResponse } from "next/server";
import { connectMongoDB } from "@/app/DBconfig/mongoDB";
import Category from "@/app/models/Category";
import { uploadToCloudinary, deleteFromCloudinary } from "../../lib/cloudinary";

export async function POST(req) {
  try {
    await connectMongoDB();
    const formData = await req.formData();
    
    const name = formData.get('name');
    const description = formData.get('description');
    const image = formData.get('image');

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "يرجى إدخال اسم التصنيف" },
        { status: 400 }
      );
    }

    // التأكد من عدم تكرار الاسم
    const exists = await Category.findOne({ name });
    if (exists) {
      return NextResponse.json(
        { error: "اسم التصنيف موجود بالفعل" },
        { status: 409 }
      );
    }

    let imageUrl = null;
    let imagePublicId = null;

    // رفع الصورة إذا موجودة
    if (image) {
      const uploadResult = await uploadToCloudinary(image);
      
      if (!uploadResult.success) {
        return NextResponse.json(
          { error: "فشل في رفع الصورة" },
          { status: 500 }
        );
      }

      imageUrl = uploadResult.url;
      imagePublicId = uploadResult.public_id;
    }

    const newCategory = await Category.create({
      name,
      description,
      image: imageUrl,
      imagePublicId
    });

    return NextResponse.json(
      { 
        message: "تم إنشاء التصنيف بنجاح", 
        category: newCategory 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating category:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء إنشاء التصنيف" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await connectMongoDB();
    
    // استخدام aggregate مع lookup للمنتجات
    try {
      const categories = await Category.aggregate([
        {
          $lookup: {
            from: "products", 
            localField: "_id",
            foreignField: "category", 
            as: "products"
          }
        },
        {
          $addFields: {
            productCount: { $size: "$products" }
          }
        },
        {
          $project: {
            products: 0
          }
        },
        {
          $sort: { createdAt: -1 }
        }
      ]);
      return NextResponse.json({ categories });
    } catch (aggregateError) {
      // إذا الـ aggregate فشل، استخدم find عادي
      console.log("Using simple find instead of aggregate");
      const categories = await Category.find().sort({ createdAt: -1 });
      const categoriesWithCount = categories.map(cat => ({
        ...cat.toObject(),
        productCount: 0
      }));
      return NextResponse.json({ categories: categoriesWithCount });
    }
  } catch (error) {
    console.error("Error fetching categories:", error);
    return NextResponse.json(
      { error: "فشل في جلب التصنيفات" },
      { status: 500 }
    );
  }
}

export async function PUT(req) {
  try {
    await connectMongoDB();
    const formData = await req.formData();
    
    const id = formData.get('id');
    const name = formData.get('name');
    const description = formData.get('description');
    const image = formData.get('image');
    const removeImage = formData.get('removeImage');

    if (!name || name.trim() === "") {
      return NextResponse.json(
        { error: "يرجى إدخال اسم التصنيف" },
        { status: 400 }
      );
    }

    // إيجاد التصنيف الحالي
    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      return NextResponse.json(
        { error: "التصنيف غير موجود" },
        { status: 404 }
      );
    }

    // التأكد من عدم تكرار الاسم مع تصنيف آخر
    const nameExists = await Category.findOne({ name, _id: { $ne: id } });
    if (nameExists) {
      return NextResponse.json(
        { error: "اسم التصنيف موجود بالفعل" },
        { status: 409 }
      );
    }

    let imageUrl = existingCategory.image;
    let imagePublicId = existingCategory.imagePublicId;

    // حذف الصورة القديمة إذا طلب المستخدم أو رفع صورة جديدة
    if ((removeImage === 'true' || image) && existingCategory.imagePublicId) {
      const deleteResult = await deleteFromCloudinary(existingCategory.imagePublicId);
      if (!deleteResult.success) {
        console.error("Failed to delete old image:", deleteResult.error);
      }
      imageUrl = null;
      imagePublicId = null;
    }

    // رفع الصورة الجديدة إذا موجودة
    if (image) {
      const uploadResult = await uploadToCloudinary(image);
      if (uploadResult.success) {
        imageUrl = uploadResult.url;
        imagePublicId = uploadResult.public_id;
      } else {
        return NextResponse.json(
          { error: "فشل في رفع الصورة" },
          { status: 500 }
        );
      }
    }

    // تحديث البيانات
    const updateData = {
      name,
      description,
      image: imageUrl,
      imagePublicId
    };

    const updatedCategory = await Category.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json(
      { 
        message: "تم تعديل التصنيف بنجاح", 
        category: updatedCategory 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating category:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء تعديل التصنيف" },
      { status: 500 }
    );
  }
}

export async function DELETE(req) {
  try {
    await connectMongoDB();
    const { id } = await req.json();

    console.log("Deleting category with ID:", id);

    // إيجاد التصنيف
    const category = await Category.findById(id);
    if (!category) {
      return NextResponse.json(
        { error: "التصنيف غير موجود" },
        { status: 404 }
      );
    }

    // حذف الصورة من Cloudinary إذا موجودة
    if (category.imagePublicId) {
      const deleteResult = await deleteFromCloudinary(category.imagePublicId);
      if (!deleteResult.success) {
        console.error("Failed to delete image from Cloudinary:", deleteResult.error);
      }
    }

    // التحقق من وجود منتجات مرتبطة
    try {
      const Product = require("../../models/product").default;
      const productsCount = await Product.countDocuments({ category: id });
      if (productsCount > 0) {
        return NextResponse.json(
          { error: `لا يمكن حذف التصنيف لأنه يحتوي على ${productsCount} منتج` },
          { status: 400 }
        );
      }
    } catch (productError) {
      console.log("Product model not available, skipping product check");
    }

    // حذف التصنيف من قاعدة البيانات
    const deletedCategory = await Category.findByIdAndDelete(id);

    if (!deletedCategory) {
      return NextResponse.json(
        { error: "فشل في حذف التصنيف" },
        { status: 500 }
      );
    }

    console.log("✅ Category deleted successfully");
    
    return NextResponse.json(
      { message: "تم حذف التصنيف بنجاح" },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Error deleting category:", error);
    return NextResponse.json(
      { error: "حدث خطأ أثناء حذف التصنيف: " + error.message },
      { status: 500 }
    );
  }
}




// import { NextResponse } from "next/server";
// import { connectMongoDB } from "@/app/DBconfig/mongoDB";
// import Category from "@/app/models/Category";
// import { uploadToCloudinary, deleteFromCloudinary } from "../../lib/cloudinary";

// export async function POST(req) {
//   try {
//     await connectMongoDB();
//     const formData = await req.formData();
    
//     const name = formData.get('name');
//     const description = formData.get('description');
//     const image = formData.get('image');

//     if (!name || name.trim() === "") {
//       return NextResponse.json(
//         { error: "يرجى إدخال اسم التصنيف" },
//         { status: 400 }
//       );
//     }

//     // التأكد من عدم تكرار الاسم
//     const exists = await Category.findOne({ name });
//     if (exists) {
//       return NextResponse.json(
//         { error: "اسم التصنيف موجود بالفعل" },
//         { status: 409 }
//       );
//     }

//     let imageUrl = null;
//     let imagePublicId = null;

//     // رفع الصورة إذا موجودة
//     if (image) {
//       const uploadResult = await uploadToCloudinary(image);
      
//       if (!uploadResult.success) {
//         return NextResponse.json(
//           { error: "فشل في رفع الصورة" },
//           { status: 500 }
//         );
//       }

//       imageUrl = uploadResult.url;
//       imagePublicId = uploadResult.public_id;
//     }

//     const newCategory = await Category.create({
//       name,
//       description,
//       image: imageUrl,
//       imagePublicId
//     });

//     return NextResponse.json(
//       { 
//         message: "تم إنشاء التصنيف بنجاح", 
//         category: newCategory 
//       },
//       { status: 201 }
//     );
//   } catch (error) {
//     console.error("Error creating category:", error);
//     return NextResponse.json(
//       { error: "حدث خطأ أثناء إنشاء التصنيف" },
//       { status: 500 }
//     );
//   }
// }

// export async function GET() {
//   try {
//     await connectMongoDB();
    
//     // استخدام aggregate مع lookup للمنتجات
//     try {
//       const categories = await Category.aggregate([
//         {
//           $lookup: {
//             from: "products", 
//             localField: "_id",
//             foreignField: "category", 
//             as: "products"
//           }
//         },
//         {
//           $addFields: {
//             productCount: { $size: "$products" }
//           }
//         },
//         {
//           $project: {
//             products: 0
//           }
//         },
//         {
//           $sort: { createdAt: -1 }
//         }
//       ]);
//       return NextResponse.json({ categories });
//     } catch (aggregateError) {
//       // إذا الـ aggregate فشل، استخدم find عادي
//       console.log("Using simple find instead of aggregate");
//       const categories = await Category.find().sort({ createdAt: -1 });
//       const categoriesWithCount = categories.map(cat => ({
//         ...cat.toObject(),
//         productCount: 0
//       }));
//       return NextResponse.json({ categories: categoriesWithCount });
//     }
//   } catch (error) {
//     console.error("Error fetching categories:", error);
//     return NextResponse.json(
//       { error: "فشل في جلب التصنيفات" },
//       { status: 500 }
//     );
//   }
// }

// export async function PUT(req) {
//   try {
//     await connectMongoDB();
//     const formData = await req.formData();
    
//     const id = formData.get('id');
//     const name = formData.get('name');
//     const description = formData.get('description');
//     const image = formData.get('image');
//     const removeImage = formData.get('removeImage');

//     if (!name || name.trim() === "") {
//       return NextResponse.json(
//         { error: "يرجى إدخال اسم التصنيف" },
//         { status: 400 }
//       );
//     }

//     // إيجاد التصنيف الحالي
//     const existingCategory = await Category.findById(id);
//     if (!existingCategory) {
//       return NextResponse.json(
//         { error: "التصنيف غير موجود" },
//         { status: 404 }
//       );
//     }

//     // التأكد من عدم تكرار الاسم مع تصنيف آخر
//     const nameExists = await Category.findOne({ name, _id: { $ne: id } });
//     if (nameExists) {
//       return NextResponse.json(
//         { error: "اسم التصنيف موجود بالفعل" },
//         { status: 409 }
//       );
//     }

//     let imageUrl = existingCategory.image;
//     let imagePublicId = existingCategory.imagePublicId;

//     // حذف الصورة القديمة إذا طلب المستخدم أو رفع صورة جديدة
//     if ((removeImage === 'true' || image) && existingCategory.imagePublicId) {
//       const deleteResult = await deleteFromCloudinary(existingCategory.imagePublicId);
//       if (!deleteResult.success) {
//         console.error("Failed to delete old image:", deleteResult.error);
//       }
//       imageUrl = null;
//       imagePublicId = null;
//     }

//     // رفع الصورة الجديدة إذا موجودة
//     if (image) {
//       const uploadResult = await uploadToCloudinary(image);
//       if (uploadResult.success) {
//         imageUrl = uploadResult.url;
//         imagePublicId = uploadResult.public_id;
//       } else {
//         return NextResponse.json(
//           { error: "فشل في رفع الصورة" },
//           { status: 500 }
//         );
//       }
//     }

//     // تحديث البيانات
//     const updateData = {
//       name,
//       description,
//       image: imageUrl,
//       imagePublicId
//     };

//     const updatedCategory = await Category.findByIdAndUpdate(
//       id,
//       updateData,
//       { new: true }
//     );

//     return NextResponse.json(
//       { 
//         message: "تم تعديل التصنيف بنجاح", 
//         category: updatedCategory 
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("Error updating category:", error);
//     return NextResponse.json(
//       { error: "حدث خطأ أثناء تعديل التصنيف" },
//       { status: 500 }
//     );
//   }
// }

// export async function DELETE(req) {
//   try {
//     await connectMongoDB();
//     const { id } = await req.json();

//     console.log("Deleting category with ID:", id);

//     // إيجاد التصنيف
//     const category = await Category.findById(id);
//     if (!category) {
//       return NextResponse.json(
//         { error: "التصنيف غير موجود" },
//         { status: 404 }
//       );
//     }

//     // حذف الصورة من Cloudinary إذا موجودة
//     if (category.imagePublicId) {
//       const deleteResult = await deleteFromCloudinary(category.imagePublicId);
//       if (!deleteResult.success) {
//         console.error("Failed to delete image from Cloudinary:", deleteResult.error);
//       }
//     }

//     // التحقق من وجود منتجات مرتبطة
//     try {
//       const Product = require("../../models/product").default;
//       const productsCount = await Product.countDocuments({ category: id });
//       if (productsCount > 0) {
//         return NextResponse.json(
//           { error: `لا يمكن حذف التصنيف لأنه يحتوي على ${productsCount} منتج` },
//           { status: 400 }
//         );
//       }
//     } catch (productError) {
//       console.log("Product model not available, skipping product check");
//     }

//     // حذف التصنيف من قاعدة البيانات
//     const deletedCategory = await Category.findByIdAndDelete(id);

//     if (!deletedCategory) {
//       return NextResponse.json(
//         { error: "فشل في حذف التصنيف" },
//         { status: 500 }
//       );
//     }

//     console.log("✅ Category deleted successfully");
    
//     return NextResponse.json(
//       { message: "تم حذف التصنيف بنجاح" },
//       { status: 200 }
//     );

//   } catch (error) {
//     console.error("❌ Error deleting category:", error);
//     return NextResponse.json(
//       { error: "حدث خطأ أثناء حذف التصنيف: " + error.message },
//       { status: 500 }
//     );
//   }
// }