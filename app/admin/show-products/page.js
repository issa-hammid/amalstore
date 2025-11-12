// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// export default function ShowProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
// const [searchTerm, setSearchTerm] = useState(""); // 🔍 state جديد للبحث

//   // 🟢 تصفية المنتجات بناءً على البحث
//   const filteredProducts = products.filter(product => {
//     if (!searchTerm) return true;
    
//     const term = searchTerm.toLowerCase();
//     return (
//       product.name?.toLowerCase().includes(term) ||
//       product.category?.name?.toLowerCase().includes(term) ||
//       product.description?.toLowerCase().includes(term)
//     );
//   });
//   // 🟢 جلب المنتجات
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("/api/getProducts");
//         const data = await res.json();
//         if (res.ok) {
//           setProducts(data.products || []);
//         }
//       } catch (error) {
//         console.error("خطأ في جلب المنتجات:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // 🟢 تنسيق التاريخ
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('ar-EG', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // 🟢 تنسيق السعر
//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('ar-EG').format(price) + " ريال";
//   };

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-8">
//         <div className="flex justify-center items-center h-40">
//           <div className="text-yellow-500 text-lg">جاري تحميل المنتجات...</div>
//         </div>
//       </div>
//     );
//   }
// // 🟢 دالة حذف المنتج
// const handleDeleteProduct = async (productId, productName) => {
//   if (!confirm(`هل أنت متأكد من حذف المنتج "${productName}"؟\nهذا الإجراء لا يمكن التراجع عنه!`)) {
//     return;
//   }

//   try {
//     const res = await fetch(`/api/products/${productId}`, {
//       method: "DELETE",
//     });

//     const data = await res.json();
    
//     if (res.ok) {
//       alert("✅ تم حذف المنتج بنجاح");
//       // تحديث القائمة تلقائياً
//       setProducts(products.filter(product => product._id !== productId));
//     } else {
//       alert("❌ خطأ: " + data.error);
//     }
//   } catch (error) {
//     console.error("خطأ في حذف المنتج:", error);
//     alert("حدث خطأ أثناء الحذف");
//   }
// };
//   return (
//     <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-4 md:p-8 mt-8">
//       {/* العنوان */}
//       <div className="mb-6">
//         <h2 className="text-2xl md:text-3xl font-bold text-yellow-500">
//            إدارة المنتجات
//         </h2>
//         <p className="text-gray-600 mt-2">
//           إجمالي المنتجات: <span className="font-bold">{products.length}</span> منتج
//         </p>
//       </div>
// <div className="w-full lg:w-64">
//       <div className="relative">
//         <input
//           type="text"
//           placeholder="🔍 ابحث عن منتج أو تصنيف..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//           className="w-full p-3 pr-10 bg-yellow-50 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
//         />
//         {searchTerm && (
//           <button
//             onClick={() => setSearchTerm("")}
//             className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//           >
//             ✕
//           </button>
//         )}
//       </div>
//     </div>
//       {products.length === 0 ? (
//         // حالة عدم وجود منتجات
//         <div className="text-center py-12 bg-yellow-50 rounded-2xl border border-yellow-200">
//           <div className="text-6xl mb-4"></div>
//           <h3 className="text-xl font-bold text-gray-700 mb-2">لا توجد منتجات بعد</h3>
//           <p className="text-gray-600 mb-4">ابدأ بإضافة منتجك الأول إلى المتجر</p>
//           <button 
//             onClick={() => window.location.href = '/admin/add-product'}
//             className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
//           >
//             + إضافة منتج جديد
//           </button>
//         </div>
//       ) : (
//         // عرض المنتجات
//         <div className="overflow-hidden">
//           {/* للشاشات الكبيرة - جدول */}
//           <div className="hidden lg:block overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-yellow-500 text-white">
//                   <th className="p-3 text-right font-semibold rounded-tr-2xl"> الصورة</th>
//                   <th className="p-3 text-right font-semibold">اسم المنتج</th>
//                   <th className="p-3 text-right font-semibold">السعر</th>
//                   <th className="p-3 text-right font-semibold">الكمية</th>
//                   <th className="p-3 text-right font-semibold">مميز</th>
//                   <th className="p-3 text-right font-semibold">تاريخ الإضافة</th>
//                   <th className="p-3 text-right font-semibold rounded-tl-2xl">الإجراءات</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {products.map((product, index) => (
//                   <tr 
//                     key={product._id}
//                     className={`border-b border-gray-200 hover:bg-yellow-50 transition-colors ${
//                       index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
//                     }`}
//                   >
//                     {/* الصورة المصغرة */}
//                     <td className="p-3">
//                       <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
//                         {product.image ? (
//                           <img 
//                             src={product.image} 
//                             alt={product.name}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <span className="text-gray-400 text-lg">🖼️</span>
//                         )}
//                       </div>
//                     </td>

//                     {/* اسم المنتج */}
//                     <td className="p-3">
//                       <div className="font-bold text-gray-800">{product.name}</div>
//                       <div className="text-sm text-gray-600 line-clamp-2">
//                         {product.description}
//                       </div>
//                     </td>

//                     {/* السعر */}
//                     <td className="p-3">
//                       <span className="font-bold text-green-600">
//                         {formatPrice(product.price)}
//                       </span>
//                       {product.oldPrice && (
//                         <div className="text-sm text-gray-500 line-through">
//                           {formatPrice(product.oldPrice)}
//                         </div>
//                       )}
//                     </td>

//                     {/* الكمية */}
//                     <td className="p-3">
//                       <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
//                         product.stock > 10 
//                           ? 'bg-green-100 text-green-800' 
//                           : product.stock > 0 
//                             ? 'bg-yellow-100 text-yellow-800'
//                             : 'bg-red-100 text-red-800'
//                       }`}>
//                         {product.stock > 0 ? product.stock : 'نفذ'}
//                       </span>
//                     </td>

//                     {/* مميز */}
//                     <td className="p-3 text-center">
//                       {product.isFeatured ? (
//                         <span className="text-yellow-500 text-xl">⭐</span>
//                       ) : (
//                         <span className="text-gray-300">-</span>
//                       )}
//                     </td>

//                     {/* تاريخ الإضافة */}
//                     <td className="p-3 text-gray-600 text-sm">
//                       {formatDate(product.createdAt)}
//                     </td>

//                     {/* الإجراءات */}
//                     <td className="p-3">
//                       <div className="flex gap-2 justify-end">
//                         <Link href={`/admin/edit-product/${product._id}`}>
//                         <button 
//                             className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                             >
//                             ✏️
//                         </button>
//                       </Link> 
//                         <button 
//                           className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors opacity-50 cursor-not-allowed"
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* للشاشات الصغيرة - كاردز */}
//           <div className="lg:hidden space-y-4">
//             {products.map((product) => (
//               <div 
//                 key={product._id}
//                 className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div className="flex gap-4">
//                   {/* الصورة */}
//                   <div className="flex-shrink-0">
//                     <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
//                       {product.image ? (
//                         <img 
//                           src={product.image} 
//                           alt={product.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <span className="text-gray-400 text-lg">🖼️</span>
//                       )}
//                     </div>
//                   </div>

//                   {/* المحتوى */}
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
//                       {product.isFeatured && (
//                         <span className="text-yellow-500 text-sm">⭐ مميز</span>
//                       )}
//                     </div>
                    
//                     <p className="text-gray-600 text-sm mt-1 line-clamp-2">
//                       {product.description}
//                     </p>

//                     <div className="flex flex-wrap gap-4 mt-3">
//                       <div className="text-green-600 font-bold">
//                         {formatPrice(product.price)}
//                       </div>
//                       <div className={`px-2 py-1 rounded-full text-xs ${
//                         product.stock > 10 
//                           ? 'bg-green-100 text-green-800' 
//                           : product.stock > 0 
//                             ? 'bg-yellow-100 text-yellow-800'
//                             : 'bg-red-100 text-red-800'
//                       }`}>
//                         الكمية: {product.stock > 0 ? product.stock : 'نفذ'}
//                       </div>
//                     </div>

//                     <div className="flex justify-between items-center mt-3">
//                       <span className="text-gray-500 text-xs">
//                         {formatDate(product.createdAt)}
//                       </span>
//                       <div className="flex gap-2">
//                         <button 
//                           className="p-1 bg-blue-500 text-white rounded-lg opacity-50 cursor-not-allowed"
//                           disabled
//                         >
//                           ✏️
//                         </button>
//                        <button 
//                             onClick={() => handleDeleteProduct(product._id, product.name)}
//                             className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                             title="حذف المنتج"
//                             >
//                             🗑️
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { notify } from '../../lib/notifications';

// export default function ShowProductsPage() {
//   const [products, setProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState(""); // 🔍 state جديد للبحث

//   // 🟢 تصفية المنتجات بناءً على البحث
//   const filteredProducts = products.filter(product => {
//     if (!searchTerm) return true;
    
//     const term = searchTerm.toLowerCase();
//     return (
//       product.name?.toLowerCase().includes(term) ||
//       product.category?.name?.toLowerCase().includes(term) ||
//       product.description?.toLowerCase().includes(term)
//     );
//   });

//   // 🟢 جلب المنتجات
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         const res = await fetch("/api/getProducts");
//         const data = await res.json();
//         if (res.ok) {
//           setProducts(data.products || []);
//         }
//       } catch (error) {
//         console.error("خطأ في جلب المنتجات:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // 🟢 تنسيق التاريخ
//   const formatDate = (dateString) => {
//     return new Date(dateString).toLocaleDateString('ar-EG', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   // 🟢 تنسيق السعر
//   const formatPrice = (price) => {
//     return new Intl.NumberFormat('ar-EG').format(price) + " ريال";
//   };

//   // 🟢 دالة حذف المنتج
//   const handleDeleteProduct = async (productId, productName) => {
//      if (!confirm(`هل أنت متأكد من حذف "${productName}"؟`)) return;
//     try {
//       const res = await fetch(`/api/products/${productId}`, {
//         method: "DELETE",
//       });

//       const data = await res.json();
      
//       if (res.ok) {
//         // alert("✅ تم حذف المنتج بنجاح");
//         notify.success("✅ تم حذف المنتج بنجاح");
//         // تحديث القائمة تلقائياً
//         setProducts(products.filter(product => product._id !== productId));
//       } else {
//         // alert("❌ خطأ: " + data.error);
//         notify.error("❌ خطأ: " + data.error); // بدل alert
//       }
//     } catch (error) {
//       console.error("خطأ في حذف المنتج:", error);
//       alert("حدث خطأ أثناء الحذف");
//     }
//   };

//   if (loading) {
//     return (
//       <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-8">
//         <div className="flex justify-center items-center h-40">
//           <div className="text-yellow-500 text-lg">جاري تحميل المنتجات...</div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-4 md:p-8 mt-8">
//       {/* العنوان وشريط البحث */}
//       <div className="mb-6">
//         <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
//           {/* العنوان والإحصائيات */}
//           <div className="flex-1">
//             <h2 className="text-2xl md:text-3xl font-bold text-yellow-500">
//               📦 إدارة المنتجات
//             </h2>
//             <p className="text-gray-600 mt-2">
//               إجمالي المنتجات: <span className="font-bold">{products.length}</span> منتج
//               {filteredProducts.length !== products.length && (
//                 <span className="text-yellow-600 mr-2">
//                   • المعروض: <span className="font-bold">{filteredProducts.length}</span>
//                 </span>
//               )}
//             </p>
//           </div>

//           {/* شريط البحث */}
//           <div className="w-full lg:w-64">
//             <div className="relative">
//               <input
//                 type="text"
//                 placeholder="🔍 ابحث عن منتج أو تصنيف..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="w-full p-3 pr-10 bg-yellow-50 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
//               />
//               {searchTerm && (
//                 <button
//                   onClick={() => setSearchTerm("")}
//                   className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
//                 >
//                   ✕
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {filteredProducts.length === 0 ? ( // غيرت products إلى filteredProducts
//         // حالة عدم وجود منتجات
//         <div className="text-center py-12 bg-yellow-50 rounded-2xl border border-yellow-200">
//           <div className="text-6xl mb-4">📭</div>
//           <h3 className="text-xl font-bold text-gray-700 mb-2">
//             {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد منتجات بعد"}
//           </h3>
//           <p className="text-gray-600 mb-4">
//             {searchTerm ? "جرب البحث بكلمات أخرى" : "ابدأ بإضافة منتجك الأول إلى المتجر"}
//           </p>
//           <button 
//             onClick={() => window.location.href = '/admin/add-product'}
//             className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
//           >
//             + إضافة منتج جديد
//           </button>
//           {searchTerm && (
//             <button 
//               onClick={() => setSearchTerm("")}
//               className="mr-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//             >
//               عرض كل المنتجات
//             </button>
//           )}
//         </div>
//       ) : (
//         // عرض المنتجات
//         <div className="overflow-hidden">
//           {/* للشاشات الكبيرة - جدول */}
//           <div className="hidden lg:block overflow-x-auto">
//             <table className="w-full border-collapse">
//               <thead>
//                 <tr className="bg-yellow-500 text-white">
//                   <th className="p-3 text-right font-semibold rounded-tr-2xl">🖼️ الصورة</th>
//                   <th className="p-3 text-right font-semibold">اسم المنتج</th>
//                   <th className="p-3 text-right font-semibold">السعر</th>
//                   <th className="p-3 text-right font-semibold">الكمية</th>
//                   <th className="p-3 text-right font-semibold">مميز</th>
//                   <th className="p-3 text-right font-semibold">تاريخ الإضافة</th>
//                   <th className="p-3 text-right font-semibold rounded-tl-2xl">الإجراءات</th>
//                 </tr>
//               </thead>
//               <tbody>
//                 {filteredProducts.map((product, index) => ( // غيرت products إلى filteredProducts
//                   <tr 
//                     key={product._id}
//                     className={`border-b border-gray-200 hover:bg-yellow-50 transition-colors ${
//                       index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
//                     }`}
//                   >
//                     {/* الصورة المصغرة */}
//                     <td className="p-3">
//                       <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
//                         {product.image ? (
//                           <img 
//                             src={product.image} 
//                             alt={product.name}
//                             className="w-full h-full object-cover"
//                           />
//                         ) : (
//                           <span className="text-gray-400 text-lg">🖼️</span>
//                         )}
//                       </div>
//                     </td>

//                     {/* اسم المنتج */}
//                     <td className="p-3">
//                       <div className="font-bold text-gray-800">{product.name}</div>
//                       <div className="text-sm text-gray-600 line-clamp-2">
//                         {product.description}
//                       </div>
//                     </td>

//                     {/* السعر */}
//                     <td className="p-3">
//                       <span className="font-bold text-green-600">
//                         {formatPrice(product.price)}
//                       </span>
//                       {product.oldPrice && (
//                         <div className="text-sm text-gray-500 line-through">
//                           {formatPrice(product.oldPrice)}
//                         </div>
//                       )}
//                     </td>

//                     {/* الكمية */}
//                     <td className="p-3">
//                       <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
//                         product.stock > 10 
//                           ? 'bg-green-100 text-green-800' 
//                           : product.stock > 0 
//                             ? 'bg-yellow-100 text-yellow-800'
//                             : 'bg-red-100 text-red-800'
//                       }`}>
//                         {product.stock > 0 ? product.stock : 'نفذ'}
//                       </span>
//                     </td>

//                     {/* مميز */}
//                     <td className="p-3 text-center">
//                       {product.isFeatured ? (
//                         <span className="text-yellow-500 text-xl">⭐</span>
//                       ) : (
//                         <span className="text-gray-300">-</span>
//                       )}
//                     </td>

//                     {/* تاريخ الإضافة */}
//                     <td className="p-3 text-gray-600 text-sm">
//                       {formatDate(product.createdAt)}
//                     </td>

//                     {/* الإجراءات */}
//                     <td className="p-3">
//                       <div className="flex gap-2 justify-end">
//                         <Link href={`/admin/edit-product/${product._id}`}>
//                           <button 
//                             className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                           >
//                             ✏️
//                           </button>
//                         </Link> 
//                         <button 
//                           onClick={() => handleDeleteProduct(product._id, product.name)}
//                           className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                           title="حذف المنتج"
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>

//           {/* للشاشات الصغيرة - كاردز */}
//           <div className="lg:hidden space-y-4">
//             {filteredProducts.map((product) => ( // غيرت products إلى filteredProducts
//               <div 
//                 key={product._id}
//                 className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
//               >
//                 <div className="flex gap-4">
//                   {/* الصورة */}
//                   <div className="flex-shrink-0">
//                     <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
//                       {product.image ? (
//                         <img 
//                           src={product.image} 
//                           alt={product.name}
//                           className="w-full h-full object-cover"
//                         />
//                       ) : (
//                         <span className="text-gray-400 text-lg">🖼️</span>
//                       )}
//                     </div>
//                   </div>

//                   {/* المحتوى */}
//                   <div className="flex-1">
//                     <div className="flex justify-between items-start">
//                       <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
//                       {product.isFeatured && (
//                         <span className="text-yellow-500 text-sm">⭐ مميز</span>
//                       )}
//                     </div>
                    
//                     <p className="text-gray-600 text-sm mt-1 line-clamp-2">
//                       {product.description}
//                     </p>

//                     <div className="flex flex-wrap gap-4 mt-3">
//                       <div className="text-green-600 font-bold">
//                         {formatPrice(product.price)}
//                       </div>
//                       <div className={`px-2 py-1 rounded-full text-xs ${
//                         product.stock > 10 
//                           ? 'bg-green-100 text-green-800' 
//                           : product.stock > 0 
//                             ? 'bg-yellow-100 text-yellow-800'
//                             : 'bg-red-100 text-red-800'
//                       }`}>
//                         الكمية: {product.stock > 0 ? product.stock : 'نفذ'}
//                       </div>
//                     </div>

//                     <div className="flex justify-between items-center mt-3">
//                       <span className="text-gray-500 text-xs">
//                         {formatDate(product.createdAt)}
//                       </span>
//                       <div className="flex gap-2">
//                         <Link href={`/admin/edit-product/${product._id}`}>
//                           <button 
//                             className="p-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
//                           >
//                             ✏️
//                           </button>
//                         </Link>
//                         <button 
//                           onClick={() => handleDeleteProduct(product._id, product.name)}
//                           className="p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
//                         >
//                           🗑️
//                         </button>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }


"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter } from 'next/navigation';
import { notify } from '../../lib/notifications';
import {
  Package,
  Search,
  Inbox,
  Star,
  Pencil,
  Trash2,
} from "lucide-react";
export default function ShowProductsPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  
  const router = useRouter();

  // 🔐 التحقق من المصادقة
  useEffect(() => {
    const checkAuth = () => {
      const auth = localStorage.getItem('admin-authenticated');
      if (auth !== 'true') {
        router.push('/admin/login');
      } else {
        setIsAuthenticated(true);
        setCheckingAuth(false);
      }
    };

    checkAuth();
  }, [router]);

  // 🟢 جلب المنتجات
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/getProducts");
        const data = await res.json();
        if (res.ok) {
          setProducts(data.products || []);
        }
      } catch (error) {
        console.error("خطأ في جلب المنتجات:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [isAuthenticated]);

  // 🟢 تصفية المنتجات بناءً على البحث
  const filteredProducts = products.filter(product => {
    if (!searchTerm) return true;
    
    const term = searchTerm.toLowerCase();
    return (
      product.name?.toLowerCase().includes(term) ||
      product.category?.name?.toLowerCase().includes(term) ||
      product.description?.toLowerCase().includes(term)
    );
  });

  // 🟢 تنسيق التاريخ
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('ar-EG', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  // 🟢 تنسيق السعر
  const formatPrice = (price) => {
    return new Intl.NumberFormat('ar-EG').format(price) + " ₪";
  };

  // 🟢 دالة حذف المنتج
  const handleDeleteProduct = async (productId, productName) => {
    // تأكيد المصادقة قبل الحذف
    const auth = localStorage.getItem('admin-authenticated');
    if (auth !== 'true') {
      notify.error("انتهت جلسة العمل، يرجى تسجيل الدخول مرة أخرى");
      router.push('/admin/login');
      return;
    }

    if (!confirm(`هل أنت متأكد من حذف "${productName}"؟`)) return;
    
    try {
      const res = await fetch(`/api/products/${productId}`, {
        method: "DELETE",
      });

      const data = await res.json();
      
      if (res.ok) {
        notify.success("✅ تم حذف المنتج بنجاح");
        setProducts(products.filter(product => product._id !== productId));
      } else {
        notify.error("❌ خطأ: " + data.error);
      }
    } catch (error) {
      console.error("خطأ في حذف المنتج:", error);
      notify.error("حدث خطأ أثناء الحذف");
    }
  };

  // 🔐 عرض شاشة التحميل أثناء التحقق من المصادقة
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحقق من الصلاحية...</p>
        </div>
      </div>
    );
  }

  // 🔐 إذا لم يتم المصادقة، لا يعرض المحتوى
  if (!isAuthenticated) {
    return null;
  }

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-8">
        <div className="flex justify-center items-center h-40">
          <div className="text-yellow-500 text-lg">جاري تحميل المنتجات...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto bg-white shadow-md rounded-2xl p-4 md:p-8 mt-8">
      {/* زر العودة للوحة التحكم */}
      <div className="mb-6">
       

        {/* العنوان وشريط البحث */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          {/* العنوان والإحصائيات */}
          <div className="flex-1">
            
            <h2 className="text-2xl md:text-3xl font-bold text-yellow-500">
              
               إدارة المنتجات
            </h2>
            <p className="text-gray-600 mt-2">
              إجمالي المنتجات: <span className="font-bold">{products.length}</span> منتج
              {filteredProducts.length !== products.length && (
                <span className="text-yellow-600 mr-2">
                  • المعروض: <span className="font-bold">{filteredProducts.length}</span>
                </span>
              )}
            </p>
          </div>

          {/* شريط البحث */}
          <div className="w-full lg:w-64">
            <div className="relative">
              <input
                type="text"
                placeholder="🔍 ابحث عن منتج أو تصنيف..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-3 pr-10 bg-yellow-50 border border-gray-300 rounded-lg focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-colors"
              />
              {searchTerm && (
                <button
                  onClick={() => setSearchTerm("")}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  ✕
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {filteredProducts.length === 0 ? (
        // حالة عدم وجود منتجات
        <div className="text-center py-12 bg-yellow-50 rounded-2xl border border-yellow-200">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-bold text-gray-700 mb-2">
            {searchTerm ? "لا توجد نتائج للبحث" : "لا توجد منتجات بعد"}
          </h3>
          <p className="text-gray-600 mb-4">
            {searchTerm ? "جرب البحث بكلمات أخرى" : "ابدأ بإضافة منتجك الأول إلى المتجر"}
          </p>
          <button 
            onClick={() => router.push('/admin/add-product')}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors"
          >
            + إضافة منتج جديد
          </button>
          {searchTerm && (
            <button 
              onClick={() => setSearchTerm("")}
              className="mr-4 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              عرض كل المنتجات
            </button>
          )}
        </div>
      ) : (
        // عرض المنتجات
        <div className="overflow-hidden">
          {/* للشاشات الكبيرة - جدول */}
          <div className="hidden lg:block overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-yellow-500 text-white">
                  <th className="p-3 text-right font-semibold rounded-tr-2xl"> الصورة</th>
                  <th className="p-3 text-right font-semibold">اسم المنتج</th>
                  <th className="p-3 text-right font-semibold">السعر</th>
                  <th className="p-3 text-right font-semibold">الكمية</th>
                  <th className="p-3 text-right font-semibold">مميز</th>
                  <th className="p-3 text-right font-semibold">تاريخ الإضافة</th>
                  <th className="p-3 text-right font-semibold rounded-tl-2xl">الإجراءات</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
                  <tr 
                    key={product._id}
                    className={`border-b border-gray-200 hover:bg-yellow-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    {/* الصورة المصغرة */}
                    <td className="p-3">
                      <div className="w-12 h-12 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                        {product.image ? (
                          <img 
                            src={product.image} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <span className="text-gray-400 text-lg">🖼️</span>
                        )}
                      </div>
                    </td>

                    {/* اسم المنتج */}
                    <td className="p-3">
                      <div className="font-bold text-gray-800">{product.name}</div>
                      <div className="text-sm text-gray-600 line-clamp-2">
                        {product.description}
                      </div>
                    </td>

                    {/* السعر */}
                    <td className="p-3">
                      <span className="font-bold text-green-600">
                        {formatPrice(product.price)}
                      </span>
                      {product.oldPrice && (
                        <div className="text-sm text-gray-500 line-through">
                          {formatPrice(product.oldPrice)}
                        </div>
                      )}
                    </td>

                    {/* الكمية */}
                    <td className="p-3">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-sm font-medium ${
                        product.stock > 10 
                          ? 'bg-green-100 text-green-800' 
                          : product.stock > 0 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        {product.stock > 0 ? product.stock : 'نفذ'}
                      </span>
                    </td>

                    {/* مميز */}
                    <td className="p-3 text-center">
                      {product.isFeatured ? (
                        <Star className="w-6 h-6 text-yellow-500" />
                      ) : (
                        <span className="text-gray-300">-</span>
                      )}
                    </td>

                    {/* تاريخ الإضافة */}
                    <td className="p-3 text-gray-600 text-sm">
                      {formatDate(product.createdAt)}
                    </td>

                    {/* الإجراءات */}
                    <td className="p-3">
                      <div className="flex gap-2 justify-end">
                        <Link href={`/admin/edit-product/${product._id}`}>
                          <button 
                            className="p-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                        </Link> 
                        <button 
                          onClick={() => handleDeleteProduct(product._id, product.name)}
                          className="p-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                          title="حذف المنتج"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* للشاشات الصغيرة - كاردز */}
          <div className="lg:hidden space-y-4">
            {filteredProducts.map((product) => (
              <div 
                key={product._id}
                className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex gap-4">
                  {/* الصورة */}
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg overflow-hidden flex items-center justify-center">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <span className="text-gray-400 text-lg">🖼️</span>
                      )}
                    </div>
                  </div>

                  {/* المحتوى */}
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h3 className="font-bold text-gray-800 text-lg">{product.name}</h3>
                      {product.isFeatured && (
                        <Star className="w-6 h-6 text-yellow-500" />
                      )}
                    </div>
                    
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {product.description}
                    </p>

                    <div className="flex flex-wrap gap-4 mt-3">
                      <div className="text-green-600 font-bold">
                        {formatPrice(product.price)}
                      </div>
                      <div className={`px-2 py-1 rounded-full text-xs ${
                        product.stock > 10 
                          ? 'bg-green-100 text-green-800' 
                          : product.stock > 0 
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                      }`}>
                        الكمية: {product.stock > 0 ? product.stock : 'نفذ'}
                      </div>
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <span className="text-gray-500 text-xs">
                        {formatDate(product.createdAt)}
                      </span>
                      <div className="flex gap-2">
                        <Link href={`/admin/edit-product/${product._id}`}>
                          <button 
                            className="p-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                          >
                            <Pencil className="w-5 h-5" />
                          </button>
                        </Link>
                        <button 
                          onClick={() => handleDeleteProduct(product._id, product.name)}
                          className="p-1 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}