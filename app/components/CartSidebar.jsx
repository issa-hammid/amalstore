// "use client";
// import { useCart } from '../context/CartContext';
// import Link from 'next/link';

// export default function CartSidebar() {
//   const { 
//     cartItems, 
//     updateQuantity, 
//     removeFromCart, 
//     totalPrice, 
//     isCartOpen, 
//     setIsCartOpen 
//   } = useCart();

//   return (
//     <>
//       {/* Overlay */}
//       {isCartOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity"
//           onClick={() => setIsCartOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed top-0 left-0 h-full w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300
//         ${isCartOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
        
//         {/* Header */}
//         <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-4 text-white">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold">سلة التسوق</h2>
//             <button 
//               onClick={() => setIsCartOpen(false)}
//               className="text-white hover:text-yellow-300 transition-colors"
//             >
//               ✕
//             </button>
//           </div>
//           <p className="text-rose-100 text-sm mt-1">
//             {cartItems.length} منتج في السلة
//           </p>
//         </div>

//         {/* Cart Items */}
//         <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
//           {cartItems.length === 0 ? (
//             <div className="text-center py-8">
//               <div className="text-6xl mb-4">🛒</div>
//               <p className="text-gray-500">السلة فارغة</p>
//               <p className="text-gray-400 text-sm mt-2">أضف بعض المنتجات لتظهر هنا</p>
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="flex gap-3 p-3 bg-gray-50 rounded-lg border">
//                   {/* Product Image */}
//                   <img 
//                     src={item.image} 
//                     alt={item.name}
//                     className="w-16 h-16 object-cover rounded"
//                   />
                  
//                   {/* Product Details */}
//                   <div className="flex-1">
//                     <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
//                       {item.name}
//                     </h3>
                    
//                     {item.color && (
//                       <p className="text-xs text-gray-600 mt-1">
//                         اللون: {item.color.colorName}
//                       </p>
//                     )}
                    
//                     <p className="text-green-600 font-bold mt-1">₪{item.price}</p>
                    
//                     {/* Quantity Controls */}
//                     <div className="flex items-center gap-2 mt-2">
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         disabled={item.quantity <= 1}
//                         className="w-6 h-6 bg-gray-200 rounded text-xs disabled:opacity-50"
//                       >
//                         -
//                       </button>
//                       <span className="text-sm font-medium w-6 text-center">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                         disabled={item.quantity >= item.maxStock}
//                         className="w-6 h-6 bg-gray-200 rounded text-xs disabled:opacity-50"
//                       >
//                         +
//                       </button>
//                     </div>
//                   </div>
                  
//                   {/* Remove Button */}
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-500 hover:text-red-700 transition-colors"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {cartItems.length > 0 && (
//           <div className="border-t p-4 bg-white">
//             {/* Total */}
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-lg font-bold text-gray-800">المجموع:</span>
//               <span className="text-xl font-bold text-green-600">₪{totalPrice.toFixed(2)}</span>
//             </div>

//             {/* Buttons */}
//             <div className="space-y-2">
//               <button
//                 onClick={() => setIsCartOpen(false)}
//                 className="w-full py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//               >
//                 استمر في التسوق
//               </button>
              
//               <Link 
//                 href="/cart"
//                 onClick={() => setIsCartOpen(false)}
//                 className="block w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg text-center font-semibold hover:from-rose-600 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl"
//               >
//                 عرض منتجاتك واكمل الطلب
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }
// "use client";
// import { useCart } from '../context/CartContext';
// import Link from 'next/link';

// export default function CartSidebar() {
//   const { 
//     cartItems, 
//     updateQuantity, 
//     removeFromCart, 
//     totalPrice, 
//     isCartOpen, 
//     setIsCartOpen 
//   } = useCart();

//   return (
//     <>
//       {/* Overlay - شفاف بدل أسود */}
//       {isCartOpen && (
//         <div 
//           className="fixed inset-0 bg-black bg-opacity-30 backdrop-blur-sm z-50 transition-opacity"
//           onClick={() => setIsCartOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div className={`
//         fixed top-0 left-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300
//         ${isCartOpen ? 'translate-x-0' : '-translate-x-full'}
//       `}>
        
//         {/* Header - لون دهبي */}
//         <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-4 text-white">
//           <div className="flex items-center justify-between">
//             <h2 className="text-xl font-bold">سلة التسوق</h2>
//             <button 
//               onClick={() => setIsCartOpen(false)}
//               className="text-white hover:text-rose-200 transition-colors text-lg"
//             >
//               ✕
//             </button>
//           </div>
//           <p className="text-rose-100 text-sm mt-1">
//             {cartItems.length} منتج في السلة
//           </p>
//         </div>

//         {/* Cart Items */}
//         <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
//           {cartItems.length === 0 ? (
//             <div className="text-center py-8">
//               <div className="text-6xl mb-4 text-rose-400">🛒</div>
//               <p className="text-gray-500">السلة فارغة</p>
//               <p className="text-gray-400 text-sm mt-2">أضف بعض المنتجات لتظهر هنا</p>
//             </div>
//           ) : (
//             <div className="space-y-3">
//               {cartItems.map((item) => (
//                 <div key={item.id} className="flex gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
//                   {/* Product Image */}
//                   <img 
//                     src={item.image} 
//                     alt={item.name}
//                     className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
//                   />
                  
//                   {/* Product Details */}
//                   <div className="flex-1 min-w-0">
//                     <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
//                       {item.name}
//                     </h3>
                    
//                     {item.color && (
//                       <p className="text-xs text-gray-600 mt-1">
//                         اللون: {item.color.colorName}
//                       </p>
//                     )}
                    
//                     <p className="text-green-600 font-bold mt-1 text-sm sm:text-base">₪{item.price}</p>
                    
//                     {/* Quantity Controls */}
//                     <div className="flex items-center gap-2 mt-2">
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                         disabled={item.quantity <= 1}
//                         className="w-6 h-6 bg-gray-200 rounded text-xs disabled:opacity-50 hover:bg-gray-300 transition-colors"
//                       >
//                         -
//                       </button>
//                       <span className="text-sm font-medium w-6 text-center">
//                         {item.quantity}
//                       </span>
//                       <button
//                         onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                         disabled={item.quantity >= item.maxStock}
//                         className="w-6 h-6 bg-gray-200 rounded text-xs disabled:opacity-50 hover:bg-gray-300 transition-colors"
//                       >
//                         +
//                       </button>
//                     </div>

//                     {/* رسالة نفاذ الكمية */}
//                     {item.quantity >= item.maxStock && (
//                       <p className="text-red-500 text-xs mt-2 bg-red-50 px-2 py-1 rounded border border-red-200">
//                         ⚠️ نفذت الكمية المتاحة
//                       </p>
//                     )}
//                   </div>
                  
//                   {/* Remove Button */}
//                   <button
//                     onClick={() => removeFromCart(item.id)}
//                     className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0 self-start"
//                   >
//                     ✕
//                   </button>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         {cartItems.length > 0 && (
//           <div className="border-t border-gray-200 p-4 bg-white">
//             {/* Total */}
//             <div className="flex justify-between items-center mb-4">
//               <span className="text-lg font-bold text-gray-800">المجموع:</span>
//               <span className="text-xl font-bold text-green-600">₪{totalPrice.toFixed(2)}</span>
//             </div>

//             {/* Buttons */}
//             <div className="space-y-2">
//               <button
//                 onClick={() => setIsCartOpen(false)}
//                 className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
//               >
//                 استمر في التسوق
//               </button>
              
//               <Link 
//                 href="/cart"
//                 onClick={() => setIsCartOpen(false)}
//                 className="block w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg text-center font-semibold hover:from-rose-600 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl"
//               >
//                 عرض منتجاتك واكمل الطلب
//               </Link>
//             </div>
//           </div>
//         )}
//       </div>
//     </>
//   );
// }

"use client";
import { useCart } from '../context/CartContext';
import Link from 'next/link';

export default function CartSidebar() {
  const { 
    cartItems, 
    updateQuantity, 
    removeFromCart, 
    totalPrice, 
    isCartOpen, 
    setIsCartOpen,
    refreshCartItems // أضفنا الدالة الجديدة
  } = useCart();

  return (
    <>
      {/* Overlay - شفاف بدل أسود */}
      {isCartOpen && (
        <div 
          className="fixed inset-0  backdrop-blur-sm z-50 transition-opacity"
          onClick={() => setIsCartOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`
        fixed top-0 left-0 h-full w-full sm:w-96 bg-white shadow-2xl z-50 transform transition-transform duration-300
        ${isCartOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        
        {/* Header - لون دهبي */}
        <div className="bg-gradient-to-r from-rose-500 to-rose-600 p-4 text-white">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-bold">سلة التسوق</h2>
            <button 
              onClick={() => setIsCartOpen(false)}
              className="text-white hover:text-rose-200 transition-colors text-lg"
            >
              ✕
            </button>
          </div>
          <div className="flex items-center justify-between mt-2">
            <p className="text-rose-100 text-sm">
              {cartItems.length} منتج في السلة
            </p>
            {/* <button 
              onClick={refreshCartItems}
              className="text-rose-100 hover:text-white text-xs bg-rose-600 px-2 py-1 rounded transition-colors"
              title="تحديث الكميات"
            >
              🔄 تحديث
            </button> */}
          </div>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 'calc(100vh - 200px)' }}>
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-6xl mb-4 text-rose-400">🛒</div>
              <p className="text-gray-500">السلة فارغة</p>
              <p className="text-gray-400 text-sm mt-2">أضف بعض المنتجات لتظهر هنا</p>
            </div>
          ) : (
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.id} className="flex gap-3 p-3 bg-white rounded-lg border border-gray-200 shadow-sm">
                  {/* Product Image */}
                  <img 
                    src={item.image} 
                    alt={item.name}
                    className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                  />
                  
                  {/* Product Details */}
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                      {item.name}
                    </h3>
                    
                    {item.color && (
                      <p className="text-xs text-gray-600 mt-1">
                        اللون: {item.color.colorName}
                      </p>
                    )}
                    
                    <p className="text-green-600 font-bold mt-1 text-sm sm:text-base">₪{item.price}</p>
                    
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        disabled={item.quantity <= 1}
                        className="w-6 h-6 bg-gray-200 rounded text-xs disabled:opacity-50 hover:bg-gray-300 transition-colors"
                      >
                        -
                      </button>
                      <span className="text-sm font-medium w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        disabled={item.quantity >= item.maxStock}
                        className="w-6 h-6 bg-gray-200 rounded text-xs disabled:opacity-50 hover:bg-gray-300 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* معلومات المخزون */}
                    <div className="flex items-center gap-2 mt-2 text-xs">
                      <span className="text-gray-500">المخزون:</span>
                      <span className={`font-bold ${
                        item.maxStock > 10 ? 'text-green-600' : 
                        item.maxStock > 0 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {item.maxStock}
                      </span>
                    </div>

                    {/* رسالة نفاذ الكمية */}
                    {item.quantity >= item.maxStock && (
                      <p className="text-red-500 text-xs mt-2 bg-red-50 px-2 py-1 rounded border border-red-200">
                        ⚠️ نفذت الكمية المتاحة
                      </p>
                    )}
                  </div>
                  
                  {/* Remove Button */}
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-red-500 hover:text-red-700 transition-colors flex-shrink-0 self-start"
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {cartItems.length > 0 && (
          <div className="border-t border-gray-200 p-4 bg-white">
            {/* Total */}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-bold text-amber-500">المجموع:</span>
              <span className="text-xl font-bold text-green-600">₪{totalPrice.toFixed(2)}</span>
            </div>

            {/* Buttons */}
            <div className="space-y-2">
              <Link 
                href="/cart"
                onClick={() => setIsCartOpen(false)}
                className="block w-full py-3 bg-gradient-to-r from-rose-500 to-rose-600 text-white rounded-lg text-center font-semibold hover:from-rose-600 hover:to-rose-700 transition-all shadow-lg hover:shadow-xl"
              >
                عرض منتجاتك واكمل الطلب
              </Link>
              <button
                onClick={() => setIsCartOpen(false)}
                className="w-full py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors font-medium"
              >
                استمر في التسوق
              </button>
              
              
            </div>
          </div>
        )}
      </div>
    </>
  );
}