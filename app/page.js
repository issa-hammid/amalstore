// "use client";
// import Header from "././components/Header"
// import HeroSection from "./components/HeroSection";
// import CategoriesSection from "./components/CategoriesSection";
// import { useState, useEffect } from "react";

// export default function Home() {
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
// const [recentCategories, setRecentCategories] = useState([]);
// const [categoryProducts, setCategoryProducts] = useState({});
// const [categoriesLoading, setCategoriesLoading] = useState(true);
  
// useEffect(() => {
//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch("/api/getProducts");
//         const data = await res.json();
//         if (res.ok) {
//           // تصفية المنتجات المميزة وإضافة حالة لكل منتج
//           const featured = data.products
//             .filter(product => product.isFeatured === true)
//             .map(product => ({
//               ...product,
//               currentImage: product.image, // الصورة الحالية المعروضة
//               currentStock: product.stock, // الكمية الحالية المعروضة
//               currentColor: null // اللون/المقاس الحالي
//             }));
//           setFeaturedProducts(featured);
//         }
//       } catch (error) {
//         console.error("خطأ في جلب المنتجات المميزة:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFeaturedProducts();
//   }, []);
//   // 🟢 جلب التصنيفات ومنتجاتها
// useEffect(() => {
//   const fetchCategoriesWithProducts = async () => {
//     try {
//       setCategoriesLoading(true);
      
//       // ١. جلب كل التصنيفات
//       const categoriesRes = await fetch("/api/categories");
//       const categoriesData = await categoriesRes.json();
      
//       if (categoriesRes.ok && categoriesData.categories) {
//         // نأخذ أول 3 تصنيفات (أحدثهم)
//         const recentCats = categoriesData.categories.slice(0, 3);
//         setRecentCategories(recentCats);
        
//         // ٢. جلب منتجات كل تصنيف
//         const productsPromises = recentCats.map(category =>
//           fetch(`/api/categories/${category._id}/products`)
//             .then(res => res.json())
//             .then(data => ({
//               categoryId: category._id,
//               products: data.products || []
//             }))
//         );
        
//         const productsResults = await Promise.all(productsPromises);
        
//         // ٣. تحويل النتائج لكائن سهل الاستخدام
//         const productsMap = {};
//         productsResults.forEach(result => {
//           productsMap[result.categoryId] = result.products;
//         });
        
//         setCategoryProducts(productsMap);
//       }
//     } catch (error) {
//       console.error("خطأ في جلب التصنيفات:", error);
//     } finally {
//       setCategoriesLoading(false);
//     }
//   };
  
//   fetchCategoriesWithProducts();
// }, []);
  
//   const handleColorClick = (productId, color, isMainImage = false) => {
//     setFeaturedProducts(prevProducts =>
//       prevProducts.map(product => {
//         if (product._id === productId) {
//           if (isMainImage) {
//             // الرجوع للصورة الأساسية
//             return {
//               ...product,
//               currentImage: product.image,
//               currentStock: product.stock,
//               currentColor: null
//             };
//           } else {
//             // تغيير للصورة والكمية الجديدة
//             return {
//               ...product,
//               currentImage: color.image || product.image,
//               currentStock: color.stock || product.stock,
//               currentColor: color
//             };
//           }
//         }
//         return product;
//       })
//     );
//   };
   
// return (
//     <div className="min-h-screen bg-gray-50">
//       <Header/>
//       <HeroSection />
//       <CategoriesSection />
      
//       {/* 🟢 قسم المنتجات المميزة */}
//       <section className="py-12 bg-white">
//         <div className="container mx-auto px-4">
//           {/* عنوان القسم */}
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-yellow-500 mb-2">
//                المنتجات المميزة
//             </h2>
//             <p className="text-gray-600">أفضل المنتجات المختارة خصيصاً لك</p>
//           </div>

//           {loading ? (
//             <div className="flex justify-center">
//               <div className="text-gray-500">جاري تحميل المنتجات...</div>
//             </div>
//           ) : featuredProducts.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-500">لا توجد منتجات مميزة حالياً</p>
//             </div>
//           ) : (
//             <>
//               {/* للشاشات الكبيرة - Grid */}
//               <div className="hidden lg:grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
//                 {featuredProducts.map((product) => {
//                   const displayImage = product.currentImage;
//                   const displayStock = product.currentStock;
//                   const hasColors = product.colors && product.colors.length > 0;
                  
//                   return (
//                     <div key={product._id} className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group">
                      
//                       {/* الصورة ونسبة الخصم */}
//                       <div className="relative overflow-hidden">
//                         <img
//                           src={displayImage}
//                           alt={product.name}
//                           className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
//                         />
                        
//                         {/* نسبة الخصم */}
//                         {product.discountPercent > 0 && (
//                           <div className="absolute top-3 right-3 bg-black/15 text-red-500 text-sm font-bold px-3 py-1 rounded-full shadow-lg">
//                             {product.discountPercent}%- 
//                           </div>
//                         )}

//                         {/* 🆕 القيمة المخزنة في أسفل اليمين */}
//                         {product.currentColor && product.currentColor.colorName && (
//                           <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
//                             {product.currentColor.colorName}
//                           </div>
//                         )}

                      
//                       </div>

//                       {/* محتوى الكارد */}
//                       <div className="p-4">
//                         {/* اسم المنتج */}
//                         <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2">
//                           {product.name}
//                         </h3>

//                         {/* 🆕 الكمية المتوفرة */}
//                         <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
//   <span>الكمية:</span>
//   <span className={`font-bold ${
//     displayStock > 10 ? 'text-green-600' : 
//     displayStock > 0 ? 'text-yellow-600' : 'text-red-600'
//   }`}>
//     {displayStock}
//   </span>
// </div>
// {/* 🆕 رسالة عدم التوفر */}
// {displayStock <= 0 && (
//   <div className="mb-3 text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">
//     ⚠️ غير متواجد الآن، سيتم توفيره في أقرب وقت
//   </div>
// )}

//                         {/* الأسعار */}
//                         <div className="flex items-center gap-3 mb-3">
//                           <span className="text-xl font-bold text-green-600">
//                             ₪{product.price}
//                           </span>
//                           {product.oldPrice && product.oldPrice > product.price && (
//                             <span className="text-lg text-gray-500 line-through">
//                               ₪{product.oldPrice}
//                             </span>
//                           )}
//                         </div>

//                         {/* الألوان/المقاسات */}
//                         {hasColors && (
//                           <div className="flex gap-2 mb-4 flex-wrap">
//                             {/* 🆕 زر الصورة الأساسية */}
//                             <button
//                               onClick={() => handleColorClick(product._id, null, true)}
//                               className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-all duration-200 hover:scale-110 ${
//                                 displayImage === product.image 
//                                   ? 'border-yellow-400 ring-2 ring-yellow-200' 
//                                   : 'border-gray-300 hover:border-yellow-400'
//                               }`}
//                               title="الصورة الأساسية"
//                             >
//                               <img
//                                 src={product.image}
//                                 alt="أساسي"
//                                 className="w-full h-full object-cover"
//                               />
//                             </button>

//                             {/* أزرار الألوان/المقاسات */}
//                             {product.colors.map((color, index) => (
//                               <button
//                                 key={index}
//                                 onClick={() => handleColorClick(product._id, color)}
//                                 className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-all duration-200 hover:scale-110 ${
//                                   displayImage === color.image 
//                                     ? 'border-yellow-400 ring-2 ring-yellow-200' 
//                                     : 'border-gray-300 hover:border-yellow-400'
//                                 }`}
//                                 title={color.colorName}
//                               >
//                                 {color.image ? (
//                                   <img
//                                     src={color.image}
//                                     alt={color.colorName}
//                                     className="w-full h-full object-cover"
//                                   />
//                                 ) : (
//                                   <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs font-medium">
//                                     {color.colorName?.charAt(0) || '?'}
//                                   </div>
//                                 )}
//                               </button>
//                             ))}
//                           </div>
//                         )}

//                         {/* أيقونة السلة */}
//                        <button 
//   disabled={displayStock <= 0}
//   className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1 ${
//     displayStock <= 0 
//       ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//       : 'bg-pink-500 hover:bg-pink-600 text-white'
//   }`}
// >
//   {displayStock <= 0 ? 'غير متاح' : 'أضف للسلة'}
// </button>
//                       </div>
//                     </div>
//                   );
//                 })}
//               </div>

//               {/* للشاشات الصغيرة - سلايدر */}
//               <div className="lg:hidden">
//                 <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-100">
//                   {featuredProducts.map((product) => {
//                     const displayImage = product.currentImage;
//                     const displayStock = product.currentStock;
//                     const hasColors = product.colors && product.colors.length > 0;
                    
//                     return (
//                       <div key={product._id} className="flex-shrink-0 w-72 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
                        
//                         {/* الصورة ونسبة الخصم */}
//                         <div className="relative">
//                           <img
//                             src={displayImage}
//                             alt={product.name}
//                             className="w-full h-52 object-cover"
//                           />
                          
//                           {product.discountPercent > 0 && (
//                             <div className="absolute top-2 right-2 bg-black/15 text-red-500 text-xs font-bold px-2 py-1 rounded-full">
//                               {product.discountPercent}%
//                             </div>
//                           )}

//                           {/* 🆕 القيمة المخزنة في أسفل اليمين */}
//                           {product.currentColor && product.currentColor.colorName && (
//                             <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md">
//                               {product.currentColor.colorName}
//                             </div>
//                           )}

                         
//                         </div>

//                         {/* محتوى الكارد */}
//                         <div className="p-3">
//                           <h3 className="font-semibold text-gray-800 text-sm mb-2 line-clamp-2">
//                             {product.name}
//                           </h3>

//                           {/* 🆕 الكمية المتوفرة */}
//                           <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
//                             <span>الكمية:</span>
//                             <span className={`font-bold ${
//                               displayStock > 10 ? 'text-green-600' : 
//                               displayStock > 0 ? 'text-yellow-600' : 'text-red-600'
//                             }`}>
//                               {displayStock}
//                             </span>
//                           </div>

//                           <div className="flex items-center gap-2 mb-3">
//                             <span className="text-lg font-bold text-green-600">
//                               ₪{product.price}
//                             </span>
//                             {product.oldPrice && product.oldPrice > product.price && (
//                               <span className="text-sm text-gray-500 line-through">
//                                 ₪{product.oldPrice}
//                               </span>
//                             )}
//                           </div>

//                           {/* الألوان/المقاسات */}
//                           {hasColors && (
//                             <div className="flex gap-1 mb-3">
//                               {/* زر الصورة الأساسية */}
//                               <button
//                                 onClick={() => handleColorClick(product._id, null, true)}
//                                 className={`w-8 h-8 rounded-full border overflow-hidden ${
//                                   displayImage === product.image 
//                                     ? 'border-yellow-400 ring-1 ring-yellow-200' 
//                                     : 'border-gray-300'
//                                 }`}
//                               >
//                                 <img
//                                   src={product.image}
//                                   alt="أساسي"
//                                   className="w-full h-full object-cover"
//                                 />
//                               </button>

//                               {/* أزرار الألوان/المقاسات */}
//                               {product.colors.slice(0, 4).map((color, index) => (
//                                 <button
//                                   key={index}
//                                   onClick={() => handleColorClick(product._id, color)}
//                                   className={`w-8 h-8 rounded-full border overflow-hidden ${
//                                     displayImage === color.image 
//                                       ? 'border-yellow-400 ring-1 ring-yellow-200' 
//                                       : 'border-gray-300'
//                                   }`}
//                                 >
//                                   {color.image ? (
//                                     <img
//                                       src={color.image}
//                                       alt={color.colorName}
//                                       className="w-full h-full object-cover"
//                                     />
//                                   ) : (
//                                     <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs">
//                                       {color.colorName?.charAt(0) || '?'}
//                                     </div>
//                                   )}
//                                 </button>
//                               ))}
//                             </div>
//                           )}
                          
// {displayStock <= 0 && (
//   <div className="mb-2 text-red-500 text-xs bg-red-50 px-2 py-1 rounded border border-red-200">
//     ⚠️ غير متوفر حالياً
//   </div>
// )}
//                           <button 
//   disabled={displayStock <= 0}
//   className={`w-full py-2 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-1 ${
//     displayStock <= 0 
//       ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//       : 'bg-pink-500 hover:bg-pink-600 text-white'
//   }`}
// >
//   {displayStock <= 0 ? 'غير متاح' : 'أضف للسلة'}
// </button>
//                         </div>
//                       </div>
//                     );
//                   })}
//                 </div>
//               </div>
//             </>
//           )}
//         </div>
//       </section>
//     </div>
//   );
// }
// "use client";
// import Header from "././components/Header"
// import HeroSection from "./components/HeroSection";
// import CategoriesSection from "./components/CategoriesSection";
// import { useState, useEffect } from "react";

// // استيراد Swiper
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import Link from 'next/link';

// export default function Home() {
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [categoryProducts, setCategoryProducts] = useState({});
//   const [categoriesLoading, setCategoriesLoading] = useState(true);
  
//   useEffect(() => {
//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch("/api/getProducts");
//         const data = await res.json();
//         if (res.ok) {
//           const featured = data.products
//             .filter(product => product.isFeatured === true)
//             .map(product => ({
//               ...product,
//               currentImage: product.image,
//               currentStock: product.stock,
//               currentColor: null
//             }));
//           setFeaturedProducts(featured);
//         }
//       } catch (error) {
//         console.error("خطأ في جلب المنتجات المميزة:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFeaturedProducts();
//   }, []);

//   useEffect(() => {
//     const fetchCategoriesWithProducts = async () => {
//       try {
//         setCategoriesLoading(true);
        
//         // جلب كل التصنيفات
//         const categoriesRes = await fetch("/api/categories");
//         const categoriesData = await categoriesRes.json();
        
//         if (categoriesRes.ok && categoriesData.categories) {
//           // نأخذ كل التصنيفات
//           const allCategories = categoriesData.categories;
//           setCategories(allCategories);
          
//           // جلب منتجات كل تصنيف
//           const productsPromises = allCategories.map(category =>
//             fetch(`/api/categories/${category._id}/products`)
//               .then(res => res.json())
//               .then(data => ({
//                 categoryId: category._id,
//                 products: (data.products || []).slice(0, 8) // نأخذ أول 8 منتجات فقط لكل تصنيف
//               }))
//               .catch(error => ({
//                 categoryId: category._id,
//                 products: []
//               }))
//           );
          
//           const productsResults = await Promise.all(productsPromises);
          
//           const productsMap = {};
//           productsResults.forEach(result => {
//             productsMap[result.categoryId] = result.products;
//           });
          
//           setCategoryProducts(productsMap);
//         }
//       } catch (error) {
//         console.error("خطأ في جلب التصنيفات:", error);
//       } finally {
//         setCategoriesLoading(false);
//       }
//     };
    
//     fetchCategoriesWithProducts();
//   }, []);
  
//   const handleColorClick = (productId, color, isMainImage = false, categoryId = null) => {
//     if (categoryId) {
//       // تحديث منتجات التصنيف
//       setCategoryProducts(prev => ({
//         ...prev,
//         [categoryId]: prev[categoryId]?.map(product => 
//           product._id === productId ? {
//             ...product,
//             currentImage: isMainImage ? product.image : (color.image || product.image),
//             currentStock: isMainImage ? product.stock : (color.stock || product.stock),
//             currentColor: isMainImage ? null : color
//           } : product
//         ) || []
//       }));
//     } else {
//       // تحديث المنتجات المميزة
//       setFeaturedProducts(prevProducts =>
//         prevProducts.map(product => {
//           if (product._id === productId) {
//             if (isMainImage) {
//               return {
//                 ...product,
//                 currentImage: product.image,
//                 currentStock: product.stock,
//                 currentColor: null
//               };
//             } else {
//               return {
//                 ...product,
//                 currentImage: color.image || product.image,
//                 currentStock: color.stock || product.stock,
//                 currentColor: color
//               };
//             }
//           }
//           return product;
//         })
//       );
//     }
//   };
   
//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header/>
//       <HeroSection />
//       <CategoriesSection />
      
//       {/* قسم المنتجات المميزة */}
//       <section className="py-12 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-yellow-500 mb-2">
//               المنتجات المميزة
//             </h2>
//             <p className="text-gray-600">أفضل المنتجات المختارة خصيصاً لك</p>
//           </div>

//           {loading ? (
//             <div className="flex justify-center">
//               <div className="text-gray-500">جاري تحميل المنتجات...</div>
//             </div>
//           ) : featuredProducts.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-500">لا توجد منتجات مميزة حالياً</p>
//             </div>
//           ) : (
//             <ProductsSwiper 
//               products={featuredProducts} 
//               onColorClick={handleColorClick}
//             />
//           )}
//         </div>
//       </section>

//       {/* قسم التصنيفات */}
//       {categories.map(category => {
//         const categoryProductsList = categoryProducts[category._id] || [];
        
//         if (categoryProductsList.length === 0) return null;
        
//         return (
//           <section key={category._id} className="py-12 bg-gray-50 border-t border-gray-200">
//             <div className="container mx-auto px-4">
//               {/* عنوان التصنيف */}
//               <div className="flex items-center justify-between mb-8">
//                 <div className="text-right">
//                   <h2 className="text-3xl font-bold text-yellow-500 mb-2">
//                     {category.name}
//                   </h2>
//                   <p className="text-gray-600">{category.description || `أفضل ${category.name} مختارة لك`}</p>
//                 </div>
                
//                 {/* زر عرض الكل */}
//                 <Link 
//                   href={`/categories/${category._id}`}
//                   className="flex items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl"
//                 >
//                   <span>عرض الكل</span>
//                   <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </Link>
//               </div>

//               {/* سلايدر منتجات التصنيف */}
//               <ProductsSwiper 
//                 products={categoryProductsList}
//                 onColorClick={(productId, color, isMainImage) => 
//                   handleColorClick(productId, color, isMainImage, category._id)
//                 }
//               />
//             </div>
//           </section>
//         );
//       })}
//     </div>
//   );
// }

// // مكون السلايدر الرئيسي لإعادة الاستخدام
// function ProductsSwiper({ products, onColorClick }) {
//   return (
//     <Swiper
//       modules={[Autoplay, Navigation, Pagination]}
//       spaceBetween={20}
//       slidesPerView={1}
//       breakpoints={{
//         480: {
//           slidesPerView: 1.5,
//           spaceBetween: 16
//         },
//         640: {
//           slidesPerView: 2.2,
//           spaceBetween: 20
//         },
//         768: {
//           slidesPerView: 2.5,
//           spaceBetween: 20
//         },
//         1024: {
//           slidesPerView: 3.2,
//           spaceBetween: 24
//         },
//         1280: {
//           slidesPerView: 4,
//           spaceBetween: 24
//         }
//       }}
//       autoplay={{
//         delay: 4000,
//         disableOnInteraction: false,
//         pauseOnMouseEnter: true
//       }}
//       navigation={{
//         nextEl: '.swiper-button-next',
//         prevEl: '.swiper-button-prev',
//       }}
//       pagination={{
//         clickable: true,
//         dynamicBullets: true
//       }}
//       loop={products.length > 1}
//       grabCursor={true}
//       className="products-swiper pb-12"
//     >
//       {products.map((product) => (
//         <SwiperSlide key={product._id}>
//           <div className="h-full py-2">
//             <ProductCard product={product} onColorClick={onColorClick} />
//           </div>
//         </SwiperSlide>
//       ))}
      
//       {/* أزرار التنقل */}
//       <div className="swiper-button-prev !text-yellow-500 !w-12 !h-12 after:!text-xl bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300"></div>
//       <div className="swiper-button-next !text-yellow-500 !w-12 !h-12 after:!text-xl bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300"></div>
//     </Swiper>
//   );
// }

// // مكون كارد المنتج
// function ProductCard({ product, onColorClick }) {
//   const displayImage = product.currentImage || product.image;
//   const displayStock = product.currentStock || product.stock;
//   const hasColors = product.colors && product.colors.length > 0;
  
//   return (
//     <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group h-full flex flex-col">
      
//       {/* الصورة ونسبة الخصم */}
//       <div className="relative overflow-hidden flex-shrink-0">
//         <img
//           src={displayImage}
//           alt={product.name}
//           className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-300"
//         />
        
//         {/* نسبة الخصم */}
//         {product.discountPercent > 0 && (
//           <div className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-600 text-white text-sm font-bold px-3 py-1 rounded-full shadow-lg">
//             {product.discountPercent}% خصم
//           </div>
//         )}

//         {/* القيمة المخزنة في أسفل اليمين */}
//         {product.currentColor && product.currentColor.colorName && (
//           <div className="absolute bottom-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
//             {product.currentColor.colorName}
//           </div>
//         )}
//       </div>

//       {/* محتوى الكارد */}
//       <div className="p-4 flex flex-col flex-grow">
//         {/* اسم المنتج */}
//         <h3 className="font-semibold text-gray-800 text-lg mb-2 line-clamp-2 flex-grow">
//           {product.name}
//         </h3>

//         {/* الكمية المتوفرة */}
//         <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
//           <span>الكمية:</span>
//           <span className={`font-bold ${
//             displayStock > 10 ? 'text-green-600' : 
//             displayStock > 0 ? 'text-yellow-600' : 'text-red-600'
//           }`}>
//             {displayStock}
//           </span>
//         </div>

//         {/* رسالة عدم التوفر */}
//         {displayStock <= 0 && (
//           <div className="mb-3 text-red-500 text-sm bg-red-50 px-3 py-2 rounded-lg border border-red-200">
//             ⚠️ غير متوفر حالياً
//           </div>
//         )}

//         {/* الأسعار */}
//         <div className="flex items-center gap-3 mb-3">
//           <span className="text-xl font-bold text-green-600">
//             ₪{product.price}
//           </span>
//           {product.oldPrice && product.oldPrice > product.price && (
//             <span className="text-lg text-gray-500 line-through">
//               ₪{product.oldPrice}
//             </span>
//           )}
//         </div>

//         {/* الألوان/المقاسات */}
//         {hasColors && (
//           <div className="flex gap-2 mb-4 flex-wrap">
//             {/* زر الصورة الأساسية */}
//             <button
//               onClick={() => onColorClick(product._id, null, true)}
//               className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-all duration-200 hover:scale-110 ${
//                 displayImage === product.image 
//                   ? 'border-yellow-400 ring-2 ring-yellow-200' 
//                   : 'border-gray-300 hover:border-yellow-400'
//               }`}
//               title="الصورة الأساسية"
//             >
//               <img
//                 src={product.image}
//                 alt="أساسي"
//                 className="w-full h-full object-cover"
//               />
//             </button>

//             {/* أزرار الألوان/المقاسات */}
//             {product.colors.map((color, index) => (
//               <button
//                 key={index}
//                 onClick={() => onColorClick(product._id, color)}
//                 className={`w-10 h-10 rounded-full border-2 overflow-hidden transition-all duration-200 hover:scale-110 ${
//                   displayImage === color.image 
//                     ? 'border-yellow-400 ring-2 ring-yellow-200' 
//                     : 'border-gray-300 hover:border-yellow-400'
//                 }`}
//                 title={color.colorName}
//               >
//                 {color.image ? (
//                   <img
//                     src={color.image}
//                     alt={color.colorName}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs font-medium">
//                     {color.colorName?.charAt(0) || '?'}
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>
//         )}

//         {/* أيقونة السلة */}
//         <button 
//           disabled={displayStock <= 0}
//           className={`w-full py-3 rounded-lg text-sm font-semibold transition-colors flex items-center justify-center gap-2 mt-auto ${
//             displayStock <= 0 
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//               : 'bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl'
//           }`}
//         >
//           {displayStock <= 0 ? 'غير متاح' : (
//             <>
//               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               أضف للسلة
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }

// "use client";
// import Header from "././components/Header"
// import HeroSection from "./components/HeroSection";
// import CategoriesSection from "./components/CategoriesSection";
// import { useState, useEffect } from "react";

// // استيراد Swiper
// import { Swiper, SwiperSlide } from 'swiper/react';
// import { Autoplay, Navigation, Pagination } from 'swiper/modules';
// import 'swiper/css';
// import 'swiper/css/navigation';
// import 'swiper/css/pagination';
// import Link from 'next/link';

// export default function Home() {
//   const [featuredProducts, setFeaturedProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [categoryProducts, setCategoryProducts] = useState({});
//   const [categoriesLoading, setCategoriesLoading] = useState(true);
  
//   useEffect(() => {
//     const fetchFeaturedProducts = async () => {
//       try {
//         const res = await fetch("/api/getProducts");
//         const data = await res.json();
//         if (res.ok) {
//           const featured = data.products
//             .filter(product => product.isFeatured === true)
//             .map(product => ({
//               ...product,
//               currentImage: product.image,
//               currentStock: product.stock,
//               currentColor: null
//             }));
//           setFeaturedProducts(featured);
//         }
//       } catch (error) {
//         console.error("خطأ في جلب المنتجات المميزة:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchFeaturedProducts();
//   }, []);

//   useEffect(() => {
//     const fetchCategoriesWithProducts = async () => {
//       try {
//         setCategoriesLoading(true);
        
//         const categoriesRes = await fetch("/api/categories");
//         const categoriesData = await categoriesRes.json();
        
//         if (categoriesRes.ok && categoriesData.categories) {
//           const allCategories = categoriesData.categories;
//           setCategories(allCategories);
          
//           const productsPromises = allCategories.map(category =>
//             fetch(`/api/categories/${category._id}/products`)
//               .then(res => res.json())
//               .then(data => ({
//                 categoryId: category._id,
//                 products: (data.products || []).slice(0, 10)
//               }))
//               .catch(error => ({
//                 categoryId: category._id,
//                 products: []
//               }))
//           );
          
//           const productsResults = await Promise.all(productsPromises);
          
//           const productsMap = {};
//           productsResults.forEach(result => {
//             productsMap[result.categoryId] = result.products;
//           });
          
//           setCategoryProducts(productsMap);
//         }
//       } catch (error) {
//         console.error("خطأ في جلب التصنيفات:", error);
//       } finally {
//         setCategoriesLoading(false);
//       }
//     };
    
//     fetchCategoriesWithProducts();
//   }, []);
  
//   const handleColorClick = (productId, color, isMainImage = false, categoryId = null) => {
//     if (categoryId) {
//       setCategoryProducts(prev => ({
//         ...prev,
//         [categoryId]: prev[categoryId]?.map(product => 
//           product._id === productId ? {
//             ...product,
//             currentImage: isMainImage ? product.image : (color.image || product.image),
//             currentStock: isMainImage ? product.stock : (color.stock || product.stock),
//             currentColor: isMainImage ? null : color
//           } : product
//         ) || []
//       }));
//     } else {
//       setFeaturedProducts(prevProducts =>
//         prevProducts.map(product => {
//           if (product._id === productId) {
//             if (isMainImage) {
//               return {
//                 ...product,
//                 currentImage: product.image,
//                 currentStock: product.stock,
//                 currentColor: null
//               };
//             } else {
//               return {
//                 ...product,
//                 currentImage: color.image || product.image,
//                 currentStock: color.stock || product.stock,
//                 currentColor: color
//               };
//             }
//           }
//           return product;
//         })
//       );
//     }
//   };
   
//   return (
//     <div className="min-h-screen bg-gray-50 overflow-x-hidden"> {/* أضفنا overflow-x-hidden هنا */}
//       <Header/>
//       <HeroSection />
//       <CategoriesSection />
      
//       {/* قسم المنتجات المميزة */}
//       <section className="py-12 bg-white">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-8">
//             <h2 className="text-3xl font-bold text-yellow-500 mb-2">
//               المنتجات المميزة
//             </h2>
//             <p className="text-gray-600">أفضل المنتجات المختارة خصيصاً لك</p>
//           </div>

//           {loading ? (
//             <div className="flex justify-center">
//               <div className="text-gray-500">جاري تحميل المنتجات...</div>
//             </div>
//           ) : featuredProducts.length === 0 ? (
//             <div className="text-center py-8">
//               <p className="text-gray-500">لا توجد منتجات مميزة حالياً</p>
//             </div>
//           ) : (
//             <ProductsSwiper 
//               products={featuredProducts} 
//               onColorClick={handleColorClick}
//             />
//           )}
//         </div>
//       </section>

//       {/* قسم التصنيفات */}
//       {categories.map(category => {
//         const categoryProductsList = categoryProducts[category._id] || [];
        
//         if (categoryProductsList.length === 0) return null;
        
//         return (
//           <section key={category._id} className="py-12 bg-gray-50 border-t border-gray-200">
//             <div className="container mx-auto px-4">
//               {/* عنوان التصنيف */}
//               <div className="flex items-center justify-between mb-8">
//                 <div className="text-right">
//                   <h2 className="text-3xl font-bold text-yellow-500 mb-2">
//                     {category.name}
//                   </h2>
//                   <p className="text-gray-600">{category.description || `أفضل ${category.name} مختارة لك`}</p>
//                 </div>
                
                
//               </div>

//               <ProductsSwiper 
//                 products={categoryProductsList}
//                 onColorClick={(productId, color, isMainImage) => 
//                   handleColorClick(productId, color, isMainImage, category._id)
//                 }
//               />
//               <Link 
//                   href={`/categories/${category._id}`}
//                   className=" items-center gap-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-lg transition-colors duration-300 font-semibold shadow-lg hover:shadow-xl"
//                 >
//                   <span>عرض الكل</span>
//                   <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//                   </svg>
//                 </Link>
//             </div>
            
//           </section>
          
//         );
//       })}
//     </div>
//   );
// }

// // مكون السلايدر الرئيسي - معدل
// // function ProductsSwiper({ products, onColorClick }) {
// //   return (
// //     <div className="relative"> {/* نضيف container نسبي */}
// //       <Swiper
// //         modules={[Autoplay, Navigation, Pagination]}
// //         spaceBetween={20}
// //         slidesPerView={1}
// //         breakpoints={{
// //           480: {
// //             slidesPerView: 1.2,
// //             spaceBetween: 16
// //           },
// //           640: {
// //             slidesPerView: 2,
// //             spaceBetween: 20
// //           },
// //           768: {
// //             slidesPerView: 2.5,
// //             spaceBetween: 20
// //           },
// //           1024: {
// //             slidesPerView: 3,
// //             spaceBetween: 24
// //           },
// //           1280: {
// //             slidesPerView: 4,
// //             spaceBetween: 24
// //           }
// //         }}
// //         autoplay={{
// //           delay: 4000,
// //           disableOnInteraction: false,
// //           pauseOnMouseEnter: true
// //         }}
// //         navigation={{
// //           nextEl: '.swiper-button-next-custom',
// //           prevEl: '.swiper-button-prev-custom',
// //         }}
// //         pagination={{
// //           clickable: true,
// //           dynamicBullets: true,
// //           el: '.swiper-pagination-custom'
// //         }}
// //         loop={products.length > 1}
// //         grabCursor={true}
// //         className="w-full" // نغير الكلاس هنا
// //       >
// //         {products.map((product) => (
// //           <SwiperSlide key={product._id}>
// //             <div className="h-full py-2 px-2"> {/* نضيف padding هنا */}
// //               <ProductCard product={product} onColorClick={onColorClick} />
// //             </div>
// //           </SwiperSlide>
// //         ))}
// //       </Swiper>
      
// //       {/* أزرار التنقل المخصصة */}
// //       <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer">
// //         <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
// //         </svg>
// //       </div>
      
// //       <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 left-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer">
// //         <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
// //           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
// //         </svg>
// //       </div>
      
// //       {/* Pagination مخصص */}
// //       <div className="swiper-pagination-custom mt-6 flex justify-center gap-2"></div>
// //     </div>
// //   );
// // }
// // مكون السلايدر الرئيسي - معدل لعرض منتجين في الشاشات الصغيرة
// function ProductsSwiper({ products, onColorClick }) {
//   return (
//     <div className="relative">
//       <Swiper
//         modules={[Autoplay, Navigation, Pagination]}
//         spaceBetween={16} // مسافة أقل للشاشات الصغيرة
//         slidesPerView={1.8} // بداية بعرض 1.8 منتج في الشاشات الصغيرة جداً
//         breakpoints={{
//           // الشاشات الصغيرة جداً (أقل من 480px)
//           320: {
//             slidesPerView: 1.5,
//             spaceBetween: 12
//           },
//           // الشاشات الصغيرة (480px - 639px)
//           480: {
//             slidesPerView: 2, // عرض منتجين بالضبط
//             spaceBetween: 14
//           },
//           // الشاشات المتوسطة الصغيرة (640px - 767px)
//           640: {
//             slidesPerView: 2.3, // عرض منتجين مع جزء من الثالث
//             spaceBetween: 16
//           },
//           // الشاشات المتوسطة (768px - 1023px)
//           768: {
//             slidesPerView: 2.8, // عرض 2.8 منتج
//             spaceBetween: 18
//           },
//           // الشاشات الكبيرة (1024px - 1279px)
//           1024: {
//             slidesPerView: 3.2, // عرض 3.2 منتج
//             spaceBetween: 20
//           },
//           // الشاشات الكبيرة جداً (1280px+)
//           1280: {
//             slidesPerView: 4, // عرض 4 منتجات
//             spaceBetween: 24
//           },
//           1536: {
//             slidesPerView: 4.5, // عرض 4.5 منتج للشاشات الأكبر
//             spaceBetween: 24
//           }
//         }}
//         autoplay={{
//           delay: 4000,
//           disableOnInteraction: false,
//           pauseOnMouseEnter: true
//         }}
//         navigation={{
//           nextEl: '.swiper-button-next-custom',
//           prevEl: '.swiper-button-prev-custom',
//         }}
//         pagination={{
//           clickable: true,
//           dynamicBullets: true,
//           el: '.swiper-pagination-custom'
//         }}
//         loop={products.length > 1}
//         grabCursor={true}
//         className="w-full"
//       >
//         {products.map((product) => (
//           <SwiperSlide key={product._id}>
//             <div className="h-full py-2 px-1"> {/* مسافة أقل بين الكروت */}
//               <ProductCard product={product} onColorClick={onColorClick} />
//             </div>
//           </SwiperSlide>
//         ))}
//       </Swiper>
      
//       {/* أزرار التنقل المخصصة */}
//       <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer">
//         <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
//         </svg>
//       </div>
      
//       <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 left-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer">
//         <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//           <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
//         </svg>
//       </div>
      
//       {/* Pagination مخصص */}
//       <div className="swiper-pagination-custom mt-6 flex justify-center gap-2"></div>
//     </div>
//   );
// }

// // مكون كارد المنتج - نفس الكود السابق
// function ProductCard({ product, onColorClick }) {
//   const displayImage = product.currentImage || product.image;
//   const displayStock = product.currentStock || product.stock;
//   const hasColors = product.colors && product.colors.length > 0;
  
//   return (
//     <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group h-full flex flex-col">
      
//       <div className="relative overflow-hidden flex-shrink-0">
//         <img
//           src={displayImage}
//           alt={product.name}
//           className="w-full h-48 sm:h-56 object-cover group-hover:scale-105 transition-transform duration-300" /* ارتفاع أقل للشاشات الصغيرة */
//         />
        
//         {product.discountPercent > 0 && (
//           <div className="absolute top-2 right-2 bg-gradient-to-r from-red-500 to-pink-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
//             {product.discountPercent}%
//           </div>
//         )}

//         {product.currentColor && product.currentColor.colorName && (
//           <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
//             {product.currentColor.colorName}
//           </div>
//         )}
//       </div>

//       <div className="p-3 flex flex-col flex-grow"> {/* padding أقل */}
//         <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-2 line-clamp-2 flex-grow">
//           {product.name}
//         </h3>

//         <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
//           <span>الكمية:</span>
//           <span className={`font-bold ${
//             displayStock > 10 ? 'text-green-600' : 
//             displayStock > 0 ? 'text-yellow-600' : 'text-red-600'
//           }`}>
//             {displayStock}
//           </span>
//         </div>

//         {displayStock <= 0 && (
//           <div className="mb-2 text-red-500 text-xs bg-red-50 px-2 py-1 rounded border border-red-200">
//             ⚠️ غير متوفر
//           </div>
//         )}

//         <div className="flex items-center gap-2 mb-3">
//           <span className="text-lg font-bold text-green-600">
//             ₪{product.price}
//           </span>
//           {product.oldPrice && product.oldPrice > product.price && (
//             <span className="text-sm text-gray-500 line-through">
//               ₪{product.oldPrice}
//             </span>
//           )}
//         </div>

//         {hasColors && (
//           <div className="flex gap-1 mb-3 flex-wrap"> 
//             <button
//               onClick={() => onColorClick(product._id, null, true)}
//               className={`w-8 h-8 rounded-full border overflow-hidden transition-all duration-200 hover:scale-110 ${
//                 displayImage === product.image 
//                   ? 'border-yellow-400 ring-1 ring-yellow-200' 
//                   : 'border-gray-300 hover:border-yellow-400'
//               }`}
//               title="الصورة الأساسية"
//             >
//               <img
//                 src={product.image}
//                 alt="أساسي"
//                 className="w-full h-full object-cover"
//               />
//             </button>

//             {product.colors.map((color, index) => (
//               <button
//                 key={index}
//                 onClick={() => onColorClick(product._id, color)}
//                 className={`w-8 h-8 rounded-full border overflow-hidden transition-all duration-200 hover:scale-110 ${
//                   displayImage === color.image 
//                     ? 'border-yellow-400 ring-1 ring-yellow-200' 
//                     : 'border-gray-300 hover:border-yellow-400'
//                 }`}
//                 title={color.colorName}
//               >
//                 {color.image ? (
//                   <img
//                     src={color.image}
//                     alt={color.colorName}
//                     className="w-full h-full object-cover"
//                   />
//                 ) : (
//                   <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs font-medium">
//                     {color.colorName?.charAt(0) || '?'}
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>
//         )}

//         <button 
//           disabled={displayStock <= 0}
//           className={`w-full py-2 rounded-lg text-xs sm:text-sm font-semibold transition-colors flex items-center justify-center gap-1 mt-auto ${
//             displayStock <= 0 
//               ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//               : 'bg-gradient-to-r from-pink-500 to-yellow-500 hover:from-pink-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl'
//           }`}
//         >
//           {displayStock <= 0 ? 'غير متاح' : (
//             <>
//               <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//               </svg>
//               أضف للسلة
//             </>
//           )}
//         </button>
//       </div>
//     </div>
//   );
// }



"use client";
import Header from "././components/Header"
import HeroSection from "./components/HeroSection";
import CategoriesSection from "./components/CategoriesSection";
import { useState, useEffect } from "react";


// استيراد Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import Link from 'next/link';
import ProductCard from "./components/ProductCard";
import WhyChooseUs from "./components/WhyChooseUs ";
export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  const [categoryProducts, setCategoryProducts] = useState({});
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  
  useEffect(() => {
    const fetchFeaturedProducts = async () => {
      try {
        const res = await fetch("/api/getProducts");
        const data = await res.json();
        if (res.ok) {
          const featured = data.products
            .filter(product => product.isFeatured === true)
            .map(product => ({
              ...product,
              currentImage: product.image,
              currentStock: product.stock,
              currentColor: null
            }));
          setFeaturedProducts(featured);
        }
      } catch (error) {
        console.error("خطأ في جلب المنتجات المميزة:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchFeaturedProducts();
  }, []);

  useEffect(() => {
    const fetchCategoriesWithProducts = async () => {
      try {
        setCategoriesLoading(true);
        
        const categoriesRes = await fetch("/api/categories");
        const categoriesData = await categoriesRes.json();
        
        if (categoriesRes.ok && categoriesData.categories) {
          const allCategories = categoriesData.categories;
          setCategories(allCategories);
          
          const productsPromises = allCategories.map(category =>
            fetch(`/api/categories/${category._id}/products`)
              .then(res => res.json())
              .then(data => ({
                categoryId: category._id,
                products: (data.products || []).slice(0, 8)
              }))
              .catch(error => ({
                categoryId: category._id,
                products: []
              }))
          );
          
          const productsResults = await Promise.all(productsPromises);
          
          const productsMap = {};
          productsResults.forEach(result => {
            productsMap[result.categoryId] = result.products;
          });
          
          setCategoryProducts(productsMap);
        }
      } catch (error) {
        console.error("خطأ في جلب التصنيفات:", error);
      } finally {
        setCategoriesLoading(false);
      }
    };
    
    fetchCategoriesWithProducts();
  }, []);
  
  const handleColorClick = (productId, color, isMainImage = false, categoryId = null) => {
    if (categoryId) {
      setCategoryProducts(prev => ({
        ...prev,
        [categoryId]: prev[categoryId]?.map(product => 
          product._id === productId ? {
            ...product,
            currentImage: isMainImage ? product.image : (color.image || product.image),
            currentStock: isMainImage ? product.stock : (color.stock || product.stock),
            currentColor: isMainImage ? null : color
          } : product
        ) || []
      }));
    } else {
      setFeaturedProducts(prevProducts =>
        prevProducts.map(product => {
          if (product._id === productId) {
            if (isMainImage) {
              return {
                ...product,
                currentImage: product.image,
                currentStock: product.stock,
                currentColor: null
              };
            } else {
              return {
                ...product,
                currentImage: color.image || product.image,
                currentStock: color.stock || product.stock,
                currentColor: color
              };
            }
          }
          return product;
        })
      );
    }
  };
   
  return (
    <div className="min-h-screen bg-gray-50 overflow-x-hidden">
      <Header/>
      <HeroSection />
      <CategoriesSection />
      {/* قسم المنتجات المميزة */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          {/* العنوان في المنتصف */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-yellow-500 mb-2">
              المنتجات المميزة
            </h2>
            <p className="text-gray-600">أفضل المنتجات المختارة خصيصاً لك</p>
          </div>

          {loading ? (
            <div className="flex justify-center">
              <div className="text-gray-500">جاري تحميل المنتجات...</div>
            </div>
          ) : featuredProducts.length === 0 ? (
            <div className="text-center py-8">
              <p className="text-gray-500">لا توجد منتجات مميزة حالياً</p>
            </div>
          ) : (
            <ProductsSwiper 
              products={featuredProducts} 
              onColorClick={handleColorClick}
            />
          )}
        </div>
      </section>

      {/* قسم التصنيفات */}
      {categories.map(category => {
        const categoryProductsList = categoryProducts[category._id] || [];
        
        if (categoryProductsList.length === 0) return null;
        
        return (
          <section key={category._id} className="py-12 bg-gray-50 border-t border-gray-200">
            <div className="container mx-auto px-4">
              {/* العنوان في المنتصف */}
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-yellow-500 mb-2">
                  {category.name}
                </h2>
                <p className="text-gray-600">
                  {category.description || `أفضل ${category.name} مختارة لك`}
                </p>
              </div>

              {/* سلايدر منتجات التصنيف */}
              <ProductsSwiper 
                products={categoryProductsList}
                onColorClick={(productId, color, isMainImage) => 
                  handleColorClick(productId, color, isMainImage, category._id)
                }
              />

              {/* زر عرض الكل في المنتصف */}
              <div className="text-center mt-8">
                <Link 
                 href={`/categories/${category._id}`}
                  className="inline-flex items-center gap-2 bg-transparent border-2 border-rose-500 text-amber-500 hover:bg-rose-500 hover:text-amber-300 px-6 py-3 rounded-lg transition-all duration-300 font-semibold text-md shadow-md hover:shadow-lg transform hover:scale-105"
                >
                  <span>عرض الكل</span>
                  <svg className="w-5 h-5 rtl:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </Link>
              </div>
            </div>
          </section>
        );
      })}
                <WhyChooseUs />

    </div>

  ); 
}
 
// مكون السلايدر الرئيسي - معدل لعرض منتجين في الشاشات الصغيرة
function ProductsSwiper({ products, onColorClick }) {
  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay, Navigation, Pagination]}
        spaceBetween={16}
        slidesPerView={1.8}
        breakpoints={{
          320: {
            slidesPerView: 1.5,
            spaceBetween: 12
          },
          480: {
            slidesPerView: 2,
            spaceBetween: 14
          },
          640: {
            slidesPerView: 2.3,
            spaceBetween: 16
          },
          768: {
            slidesPerView: 2.8,
            spaceBetween: 18
          },
          1024: {
            slidesPerView: 3.2,
            spaceBetween: 20
          },
          1280: {
            slidesPerView: 4,
            spaceBetween: 24
          },
          1536: {
            slidesPerView: 4.5,
            spaceBetween: 24
          }
        }}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
          pauseOnMouseEnter: true
        }}
        navigation={{
          nextEl: '.swiper-button-next-custom',
          prevEl: '.swiper-button-prev-custom',
        }}
        pagination={{
          clickable: true,
          dynamicBullets: true,
          el: '.swiper-pagination-custom'
        }}
        loop={products.length > 1}
        grabCursor={true}
        className="w-full"
      >
        {products.map((product) => (
          <SwiperSlide key={product._id}>
            <div className="h-full py-2 px-1">
              <ProductCard product={product} onColorClick={onColorClick} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
      
      {/* أزرار التنقل المخصصة */}
      <div className="swiper-button-prev-custom absolute top-1/2 -translate-y-1/2 right-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer">
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </div>
      
      <div className="swiper-button-next-custom absolute top-1/2 -translate-y-1/2 left-4 z-10 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full shadow-lg hover:bg-white hover:shadow-xl transition-all duration-300 flex items-center justify-center cursor-pointer">
        <svg className="w-6 h-6 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </div>
      
      {/* Pagination مخصص */}
      <div className="swiper-pagination-custom mt-6 flex justify-center gap-2"></div>
    </div>
  );
  
}

