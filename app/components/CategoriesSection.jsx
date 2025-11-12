// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";

// export default function CategoriesSection() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // 🟢 جلب التصنيفات
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("/api/categories");
//         const data = await res.json();
//         if (res.ok) {
//           setCategories(data.categories || []);
//         }
//       } catch (error) {
//         console.error("خطأ في جلب التصنيفات:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // صور افتراضية للتصنيفات
//   const categoryImages = [
//     "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//     "https://images.unsplash.com/photo-1496171367470-9ed9a91ea931?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//     "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//     "https://images.unsplash.com/photo-1546868871-7041f2a55e12?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//     "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
//     "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80"
//   ];

//   if (loading) {
//     return (
//       <section className="py-12 bg-white">
//         <div className="container mx-auto px-4">
//           <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
//             تصفح حسب الفئة
//           </h2>
//           <div className="flex justify-center">
//             <div className="text-gray-500">جاري تحميل التصنيفات...</div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-12 bg-gray-50">
//       <div className="container mx-auto px-4">
//         {/* عنوان القسم */}
//         <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
//           تصفح حسب الفئة
//         </h2>

//         {/* للشاشات الكبيرة - Grid */}
//         <div className="hidden lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
//           {categories.map((category, index) => (
//             <Link
//               key={category._id}
//               href={`/categories/${category._id}`}
//               className="group text-center"
//             >
//               <div className="relative mb-4 mx-auto transition-all duration-300 group-hover:scale-105">
//                 {/* الصورة الدائرية */}
//                 <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-yellow-400 transition-all duration-300 shadow-lg group-hover:shadow-xl mx-auto">
//                   <img
//                     src={categoryImages[index % categoryImages.length]}
//                     alt={category.name}
//                     className="w-full h-full object-cover"
//                   />
//                 </div>
                
//                 {/* تأثير hover */}
//                 <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-yellow-400 group-hover:bg-yellow-400/10 transition-all duration-300"></div>
//               </div>
              
//               {/* اسم التصنيف */}
//               <h3 className="text-lg font-semibold text-amber-500 group-hover:text-pink-600 transition-colors">
//                 {category.name}
//               </h3>
//             </Link>
//           ))}
//         </div>

//         {/* للشاشات الصغيرة - Scroll أفقي بدون أسهم */}
//         <div className="lg:hidden">
//           <div className="flex space-x-6 space-x-reverse overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-100">
//             {categories.map((category, index) => (
//               <div key={category._id} className="flex-shrink-0 w-28 text-center">
//                 <Link
//                   href={`/categories/${category._id}`}
//                   className="group block"
//                 >
//                   <div className="relative mb-3 transition-all duration-300 group-hover:scale-105">
//                     {/* الصورة الدائرية */}
//                     <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-yellow-400 transition-all duration-300 shadow-lg group-hover:shadow-xl mx-auto">
//                       <img
//                         src={categoryImages[index % categoryImages.length]}
//                         alt={category.name}
//                         className="w-full h-full object-cover"
//                       />
//                     </div>
                    
//                     {/* تأثير hover */}
//                     <div className="absolute inset-0 rounded-full border-4 border-transparent group-hover:border-yellow-400 group-hover:bg-yellow-400/10 transition-all duration-300"></div>
//                   </div>
                  
//                   {/* اسم التصنيف */}
//                   <h3 className="text-sm font-semibold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2 px-1">
//                     {category.name}
//                   </h3>
//                 </Link>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* تلميح للتمرير (اختياري) */}
//         <div className="lg:hidden text-center mt-4">
//           <p className="text-sm text-gray-500 flex items-center justify-center">
//             اسحب  لمشاهدة المزيد
//           </p>
//         </div>
//       </div>
//     </section>
//   );
// }
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function CategoriesSection() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🟢 جلب التصنيفات
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (res.ok) {
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error("خطأ في جلب التصنيفات:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // 🟡 أثناء التحميل - عرض Skeleton effect
  if (loading) {
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-amber-500 mb-8">
            تصفح حسب الفئة
          </h2>

          {/* Grid سكليتون لشاشات كبيرة */}
          <div className="hidden lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="text-center animate-pulse">
                <div className="w-32 h-32 rounded-full bg-gray-200 mx-auto mb-4" />
                <div className="h-4 bg-gray-200 rounded w-20 mx-auto" />
              </div>
            ))}
          </div>

          {/* Scroll سكليتون لشاشات صغيرة */}
          <div className="lg:hidden flex space-x-6 space-x-reverse overflow-x-auto pb-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="flex-shrink-0 w-28 text-center animate-pulse">
                <div className="w-20 h-20 rounded-full bg-gray-200 mx-auto mb-3" />
                <div className="h-3 bg-gray-200 rounded w-16 mx-auto" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // ✅ بعد تحميل البيانات
  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* عنوان القسم */}
        <h2 className="text-3xl font-bold text-center text-amber-400 mb-12">
          تصفح حسب الفئة
        </h2>

        {/* للشاشات الكبيرة */}
        <div className="hidden lg:grid grid-cols-2 md:grid-cols-3 lg:grid-cols-10 gap-6">
          {categories.map((category) => (
            <Link
              key={category._id}
              href={`/categories/${category._id}`}
              className="group text-center"
            >
              <div className="relative mb-4 mx-auto transition-all duration-300 group-hover:scale-105">
                <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-yellow-400 transition-all duration-300 shadow-lg group-hover:shadow-xl mx-auto">
                  {category.image ? (
                    // ✅ استخدم صورة الادمن إذا موجودة
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    // ❌ إذا ما في صورة، اتركها فاضية بخلفية جميلة
                    <div className="w-full h-full bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center">
                      <span className="text-rose-400 text-sm font-medium">
                        {category.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>
              <h3 className="text-lg font-semibold text-rose-400 group-hover:text-pink-600 transition-colors">
                {category.name}
              </h3>
            </Link>
          ))}
        </div>

        {/* للشاشات الصغيرة */}
        <div className="lg:hidden">
          <div className="flex space-x-3 space-x-reverse overflow-x-auto pb-4 scrollbar-thin scrollbar-thumb-pink-400 scrollbar-track-gray-100">
            {categories.map((category) => (
              <div key={category._id} className="flex-shrink-0 w-28 text-center">
                <Link href={`/categories/${category._id}`} className="group block">
                  <div className="relative mb-3 transition-all duration-300 group-hover:scale-105">
                    <div className="w-20 h-20 rounded-full overflow-hidden border-4 border-gray-200 group-hover:border-yellow-400 transition-all duration-300 shadow-lg group-hover:shadow-xl mx-auto">
                      {category.image ? (
                        // ✅ استخدم صورة الادمن إذا موجودة
                        <img
                          src={category.image}
                          alt={category.name}
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        // ❌ إذا ما في صورة، اتركها فاضية بخلفية جميلة
                        <div className="w-full h-full bg-gradient-to-br from-rose-100 to-pink-200 flex items-center justify-center">
                          <span className="text-rose-400 text-xs font-medium">
                            {category.name}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                  <h3 className="text-sm font-semibold text-gray-800 group-hover:text-pink-600 transition-colors line-clamp-2 px-1">
                    {category.name}
                  </h3>
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* تلميح للتمرير */}
        <div className="lg:hidden text-center mt-4">
          <p className="text-sm text-gray-500 flex items-center justify-center">
            اسحب لمشاهدة المزيد
          </p>
        </div>
      </div>
    </section>
  );
}
