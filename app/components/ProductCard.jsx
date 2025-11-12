// "use client";

// import Link from "next/link";
// import { useCart } from '../context/CartContext';
// import { notify } from '../lib/notifications'
// export default function ProductCard({ product, onColorClick }) {
//       const { addToCart } = useCart();
//   const displayImage = product.currentImage || product.image;
//   const displayStock = product.currentStock || product.stock;
//   const hasColors = product.colors && product.colors.length > 0;
//   const handleAddToCart = () => {
//     addToCart(
//       product, 
//       product.currentColor, 
//       displayImage
//     );
//     notify.success(" تم إضافة المنتج بنجاح");
//   };

//   return (
//     <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group h-full flex flex-col">
      
//       <div className="relative overflow-hidden flex-shrink-0">
//         <Link href={`/products/${product._id}`}>
//         <img
//   src={displayImage}
//   alt={product.name}
//   className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
// />
//         </Link>
       
        
//         {product.discountPercent > 0 && (
//           <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
//             {product.discountPercent}%
//           </div>
//         )}

//         {product.currentColor && product.currentColor.colorName && (
//           <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
//             {product.currentColor.colorName}
//           </div>
//         )}
//       </div>

//       <div className="p-3 flex flex-col flex-grow">
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

//        <button 
//   onClick={handleAddToCart}
//   disabled={displayStock <= 0}
//   className={`w-full py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 mt-auto transition-all duration-300 ${
//     displayStock <= 0 
//       ? 'bg-gray-300 text-gray-500 cursor-not-allowed' 
//       : 'bg-gradient-to-r from-rose-300 to-rose-400 text-white font-medium shadow-md hover:from-rose-500 hover:to-rose-600 hover:shadow-lg hover:scale-[1.02]'
//   }`}
// >
//   {displayStock <= 0 ? 'غير متاح' : (
//     <>
//       <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//       </svg>
//       أضف للسلة
//     </>
//   )}
// </button>
//       </div>
//     </div>
//   );
// }

"use client";
import Link from "next/link";
import { useCart } from "../context/CartContext";
import { notify } from "../lib/notifications";

// ✅ البطاقة الأساسية
export default function ProductCard({ product, onColorClick, loading = false }) {
  const { addToCart } = useCart();

  // 🔹 عرض الـ Skeleton أثناء التحميل
  if (loading) {
    return (
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-pulse flex flex-col h-full">
        {/* الصورة */}
        <div className="relative w-full h-40 sm:h-48 bg-gray-200"></div>

        <div className="p-3 flex flex-col flex-grow">
          {/* الاسم */}
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2 mb-4"></div>

          {/* الكمية */}
          <div className="h-3 bg-gray-200 rounded w-1/4 mb-4"></div>

          {/* السعر */}
          <div className="flex items-center gap-3 mb-4">
            <div className="h-5 w-16 bg-gray-200 rounded"></div>
            <div className="h-4 w-10 bg-gray-200 rounded"></div>
          </div>

          {/* الألوان */}
          <div className="flex gap-2 mb-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <div key={i} className="w-8 h-8 bg-gray-200 rounded-full"></div>
            ))}
          </div>

          {/* الزر */}
          <div className="w-full h-9 bg-gray-200 rounded-lg mt-auto"></div>
        </div>
      </div>
    );
  }

  // 🔹 البطاقة الفعلية بعد التحميل
  const displayImage = product.currentImage || product.image;
  const displayStock = product.currentStock || product.stock;
  const hasColors = product.colors && product.colors.length > 0;

  const handleAddToCart = () => {
    addToCart(product, product.currentColor, displayImage);
    notify.success("تم إضافة المنتج بنجاح");
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden group h-full flex flex-col">
      {/* الصورة */}
      <div className="relative overflow-hidden flex-shrink-0">
        <Link href={`/products/${product._id}`}>
          <img
            src={displayImage}
            alt={product.name}
            className="w-full h-40 sm:h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </Link>

        {/* الخصم */}
        {product.discountPercent > 0 && (
          <div className="absolute top-2 right-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded-full shadow-lg">
            {product.discountPercent}%
          </div>
        )}

        {/* اسم اللون */}
        {product.currentColor && product.currentColor.colorName && (
          <div className="absolute bottom-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md backdrop-blur-sm">
            {product.currentColor.colorName}
          </div>
        )}
      </div>

      {/* التفاصيل */}
      <div className="p-3 flex flex-col flex-grow">
        <h3 className="font-semibold text-gray-800 text-sm sm:text-base mb-2 line-clamp-2 flex-grow">
          {product.name}
        </h3>

        <div className="flex items-center gap-2 mb-2 text-xs text-gray-600">
          <span>الكمية:</span>
          <span
            className={`font-bold ${
              displayStock > 10
                ? "text-green-600"
                : displayStock > 0
                ? "text-yellow-600"
                : "text-red-600"
            }`}
          >
            {displayStock}
          </span>
        </div>

        {displayStock <= 0 && (
          <div className="mb-2 text-red-500 text-xs bg-red-50 px-2 py-1 rounded border border-red-200">
            ⚠️ غير متوفر
          </div>
        )}

        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg font-bold text-green-600">₪{product.price}</span>
          {product.oldPrice && product.oldPrice > product.price && (
            <span className="text-sm text-gray-500 line-through">₪{product.oldPrice}</span>
          )}
        </div>

        {/* ألوان المنتج */}
        {hasColors && (
          <div className="flex gap-1 mb-3 flex-wrap">
            <button
              onClick={() => onColorClick(product._id, null, true)}
              className={`w-8 h-8 rounded-full border overflow-hidden transition-all duration-200 hover:scale-110 ${
                displayImage === product.image
                  ? "border-yellow-400 ring-1 ring-yellow-200"
                  : "border-gray-300 hover:border-yellow-400"
              }`}
              title="الصورة الأساسية"
            >
              <img src={product.image} alt="أساسي" className="w-full h-full object-cover" />
            </button>

            {product.colors.map((color, index) => (
              <button
                key={index}
                onClick={() => onColorClick(product._id, color)}
                className={`w-8 h-8 rounded-full border overflow-hidden transition-all duration-200 hover:scale-110 ${
                  displayImage === color.image
                    ? "border-yellow-400 ring-1 ring-yellow-200"
                    : "border-gray-300 hover:border-yellow-400"
                }`}
                title={color.colorName}
              >
                {color.image ? (
                  <img
                    src={color.image}
                    alt={color.colorName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center text-xs font-medium">
                    {color.colorName?.charAt(0) || "?"}
                  </div>
                )}
              </button>
            ))}
          </div>
        )}

        {/* الزر */}
        <button
          onClick={handleAddToCart}
          disabled={displayStock <= 0}
          className={`w-full py-2 rounded-lg text-xs sm:text-sm font-semibold flex items-center justify-center gap-1 mt-auto transition-all duration-300 ${
            displayStock <= 0
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-gradient-to-r from-rose-400 to-rose-500 text-white font-medium shadow-md hover:from-rose-500 hover:to-rose-600 hover:shadow-lg hover:scale-[1.02]"
          }`}
        >
          {displayStock <= 0 ? (
            "غير متاح"
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              أضف للسلة
            </>
          )}
        </button>
      </div>
    </div>
  );
}
