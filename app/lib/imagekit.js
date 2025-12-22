// // import { v2 as cloudinary } from "cloudinary";

// // cloudinary.config({
// //   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
// //   api_key: process.env.CLOUDINARY_API_KEY,
// //   api_secret: process.env.CLOUDINARY_API_SECRET,
// // });

// // export default cloudinary;
// import { v2 as cloudinary } from "cloudinary";

// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

// // دالة لرفع الصور إلى Cloudinary
// export const uploadToCloudinary = async (file) => {
//   try {
//     // تحويل File إلى buffer
//     const arrayBuffer = await file.arrayBuffer();
//     const buffer = Buffer.from(arrayBuffer);

//     // رفع الصورة إلى Cloudinary
//     const result = await new Promise((resolve, reject) => {
//       cloudinary.uploader
//         .upload_stream(
//           {
//             resource_type: "image",
//             folder: "hero-slides", // مجلد خاص لصور الهيرو
//             transformation: [
//               { width: 2000, height: 1000, crop: "limit", quality: "auto" }
//             ]
//           },
//           (error, result) => {
//             if (error) {
//               reject(error);
//             } else {
//               resolve(result);
//             }
//           }
//         )
//         .end(buffer);
//     });

//     return {
//       success: true,
//       url: result.secure_url,
//       public_id: result.public_id
//     };
//   } catch (error) {
//     console.error("Cloudinary upload error:", error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// };

// // دالة لحذف الصور من Cloudinary
// export const deleteFromCloudinary = async (publicId) => {
//   try {
//     const result = await cloudinary.uploader.destroy(publicId);
    
//     if (result.result === "ok") {
//       return {
//         success: true,
//         message: "تم حذف الصورة بنجاح"
//       };
//     } else {
//       return {
//         success: false,
//         error: "فشل في حذف الصورة من Cloudinary"
//       };
//     }
//   } catch (error) {
//     console.error("Cloudinary delete error:", error);
//     return {
//       success: false,
//       error: error.message
//     };
//   }
// };

// // دالة لرفع ملفات متعددة (للمستقبل)
// export const uploadMultipleToCloudinary = async (files) => {
//   const uploadPromises = files.map(file => uploadToCloudinary(file));
//   const results = await Promise.all(uploadPromises);
//   return results;
// };

// export default cloudinary;

import ImageKit from "imagekit";

// إعداد ImageKit
const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
  urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT,
});

// دالة لرفع صورة واحدة
export const uploadToImageKit = async (file) => {
  try {
    // تحويل File إلى buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // رفع الصورة
    const result = await imagekit.upload({
      file: buffer,
      fileName: file.name,
      folder: "/hero-slides", // نفس المجلد القديم
    });

    return {
      success: true,
      url: result.url,
      fileId: result.fileId, // بديل public_id
    };
  } catch (error) {
    console.error("ImageKit upload error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// دالة لحذف صورة باستخدام fileId
export const deleteFromImageKit = async (fileId) => {
  try {
    const result = await imagekit.deleteFile(fileId);
    return {
      success: true,
      message: "تم حذف الصورة بنجاح",
    };
  } catch (error) {
    console.error("ImageKit delete error:", error);
    return {
      success: false,
      error: error.message,
    };
  }
};

// دالة لرفع ملفات متعددة
export const uploadMultipleToImageKit = async (files) => {
  const uploadPromises = files.map((file) => uploadToImageKit(file));
  const results = await Promise.all(uploadPromises);
  return results;
};

export default imagekit;
