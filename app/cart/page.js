// "use client";
// import { useState } from 'react';
// import { useCart } from '../context/CartContext';
// import Header from '../components/Header';
// import Link from 'next/link';

// export default function CartPage() {
//   const { 
//     cartItems, 
//     updateQuantity, 
//     removeFromCart, 
//     totalPrice, 
//     clearCart 
//   } = useCart();

//   const [customerInfo, setCustomerInfo] = useState({
//     name: '',
//     phone: '',
//     whatsapp: '',
//     address: '',
//     notes: ''
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);

//   const handleInputChange = (e) => {
//     setCustomerInfo({
//       ...customerInfo,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSubmitOrder = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     try {
//       // 1. التحقق من البيانات
//       if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
//         alert('يرجى ملء جميع الحقول المطلوبة');
//         return;
//       }

//       if (cartItems.length === 0) {
//         alert('السلة فارغة');
//         return;
//       }

//       // 2. إنشاء الطلب
//       const orderData = {
//         customer: customerInfo,
//         items: cartItems,
//         total: totalPrice,
//         orderDate: new Date().toISOString(),
//         status: 'pending'
//       };

//       // 3. حفظ الطلب (مؤقتاً في localStorage)
//       const existingOrders = JSON.parse(localStorage.getItem('amal-store-orders') || '[]');
//       const newOrder = {
//         id: Date.now().toString(),
//         ...orderData
//       };
//       localStorage.setItem('amal-store-orders', JSON.stringify([...existingOrders, newOrder]));

//       // 4. إظهار نجاح الطلب وتفريغ السلة
//       setOrderSuccess(true);
//       clearCart();
      
//       // 5. إعادة تعيين النموذج
//       setCustomerInfo({
//         name: '',
//         phone: '',
//         whatsapp: '',
//         address: '',
//         notes: ''
//       });

//     } catch (error) {
//       console.error('Error submitting order:', error);
//       alert('حدث خطأ أثناء تقديم الطلب');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   if (orderSuccess) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-2xl mx-auto text-center">
//             <div className="bg-white rounded-2xl shadow-lg p-8">
//               <div className="text-6xl mb-4">🎉</div>
//               <h1 className="text-3xl font-bold text-green-600 mb-4">تم تقديم طلبك بنجاح!</h1>
//               <p className="text-gray-600 mb-6">
//                 سنتصل بك خلال 24 ساعة لتأكيد الطلب وتفاصيل التوصيل
//               </p>
//               <div className="space-y-3">
//                 <Link 
//                   href="/"
//                   className="block w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all"
//                 >
//                   العودة للرئيسية
//                 </Link>
//                 <button
//                   onClick={() => setOrderSuccess(false)}
//                   className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
//                 >
//                   تقديم طلب جديد
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
      
//       <div className="container mx-auto px-4 py-8">
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-3xl font-bold text-gray-800 mb-2 text-center">طلباتك</h1>
//           <p className="text-gray-600 text-center mb-8">راجع منتجاتك وأكمل معلومات التوصيل</p>

//           {cartItems.length === 0 ? (
//             <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
//               <div className="text-6xl mb-4">🛒</div>
//               <h2 className="text-2xl font-bold text-gray-700 mb-4">سلة التسوق فارغة</h2>
//               <p className="text-gray-500 mb-6">لم تقم بإضافة أي منتجات إلى السلة بعد</p>
//               <Link 
//                 href="/"
//                 className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all"
//               >
//                 ابدأ التسوق
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
//               {/* الجزء الأيسر - المنتجات */}
//               <div className="space-y-6">
//                 <div className="bg-white rounded-2xl shadow-lg p-6">
//                   <h2 className="text-xl font-bold text-gray-800 mb-4">المنتجات المختارة</h2>
                  
//                   <div className="space-y-4">
//                     {cartItems.map((item) => (
//                       <div key={item.id} className="flex gap-4 p-4 bg-gray-50 rounded-lg border border-yellow-500">
//                         <img 
//                           src={item.image} 
//                           alt={item.name}
//                           className="w-20 h-20 object-cover rounded-lg flex-shrink-0"
//                         />
                        
//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
//                             {item.name}
//                           </h3>
                          
//                           {item.color && (
//                             <p className="text-xs text-gray-600 mt-1">
//                               اللون: {item.color.colorName}
//                             </p>
//                           )}
                          
//                           <p className="text-green-600 font-bold mt-1">₪{item.price}</p>
                          
//                           {/* Quantity Controls */}
//                           <div className="flex items-center gap-3 mt-3">
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity - 1)}
//                               disabled={item.quantity <= 1}
//                               className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50 hover:bg-gray-300 transition-colors"
//                             >
//                               -
//                             </button>
//                             <span className="text-lg font-medium w-8 text-center">
//                               {item.quantity}
//                             </span>
//                             <button
//                               onClick={() => updateQuantity(item.id, item.quantity + 1)}
//                               disabled={item.quantity >= item.maxStock}
//                               className="w-8 h-8 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50 hover:bg-gray-300 transition-colors"
//                             >
//                               +
//                             </button>
//                           </div>

//                           {/* رسالة نفاذ الكمية */}
//                           {item.quantity >= item.maxStock && (
//                             <p className="text-red-500 text-xs mt-2 bg-red-50 px-2 py-1 rounded border border-red-200">
//                               ⚠️ نفذت الكمية المتاحة
//                             </p>
//                           )}
//                         </div>
                        
//                         {/* Remove Button & Subtotal */}
//                         <div className="flex flex-col items-end justify-between">
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="text-red-500 hover:text-red-700 transition-colors text-lg"
//                           >
//                             ✕
//                           </button>
//                           <p className="text-green-600 font-bold">
//                             ₪{(item.price * item.quantity).toFixed(2)}
//                           </p>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Order Summary */}
//                   <div className="border-t  pt-4 mt-6">
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-gray-600">
//                         <span>المجموع:</span>
//                         <span>₪{totalPrice.toFixed(2)}</span>
//                       </div>
//                       <div className="flex justify-between text-gray-600">
//                         <span>الشحن:</span>
//                         <span>يتم تحديد عند التواصل</span>
//                       </div>
//                       <div className="flex justify-between text-lg font-bold  pt-2 border-t">
//                         <span className='text-yellow-600'>الإجمالي:</span>
//                         <span className="text-green-600">₪{totalPrice.toFixed(2)}</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* الجزء الأيمن - معلومات التوصيل */}
//               <div className="space-y-6">
//                 <div className="bg-white rounded-2xl shadow-lg p-6">
//                   <h2 className="text-xl font-bold text-gray-800 mb-4">معلومات التوصيل</h2>
                  
//                   <form onSubmit={handleSubmitOrder} className="space-y-4">
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         الاسم الكامل *
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={customerInfo.name}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
//                         placeholder="أدخل اسمك الكامل"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         رقم الجوال *
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={customerInfo.phone}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
//                         placeholder="05XXXXXXXX"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         رقم الواتساب
//                       </label>
//                       <input
//                         type="tel"
//                         name="whatsapp"
//                         value={customerInfo.whatsapp}
//                         onChange={handleInputChange}
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
//                         placeholder="05XXXXXXXX (اختياري)"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         عنوان التوصيل *
//                       </label>
//                       <textarea
//                         name="address"
//                         value={customerInfo.address}
//                         onChange={handleInputChange}
//                         required
//                         rows="3"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
//                         placeholder="أدخل عنوانك بالتفصيل (المنطقة، الشارع، رقم المنزل)"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         ملاحظات إضافية
//                       </label>
//                       <textarea
//                         name="notes"
//                         value={customerInfo.notes}
//                         onChange={handleInputChange}
//                         rows="2"
//                         className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
//                         placeholder="ملاحظات حول الطلب أو وقت التوصيل المناسب"
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={isSubmitting || cartItems.length === 0}
//                       className={`w-full py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center gap-2 ${
//                         cartItems.length === 0 || isSubmitting
//                           ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                           : 'bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:from-amber-600 hover:to-amber-700 hover:shadow-xl transform hover:scale-105'
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           جاري تقديم الطلب...
//                         </>
//                       ) : (
//                         `تأكيد الطلب - ₪${totalPrice.toFixed(2)}`
//                       )}
//                     </button>
//                   </form>
//                 </div>

//                 {/* معلومات إضافية */}
//                 <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
//                   <div className="flex items-start gap-3">
//                     <div className="text-amber-500 text-lg">ℹ️</div>
//                     <div className="text-sm text-amber-800">
//                       <p className="font-semibold mb-1">معلومات مهمة:</p>
//                       <ul className="list-disc list-inside space-y-1">
//                         <li>سيتم الاتصال بك خلال 24 ساعة لتأكيد الطلب</li>
//                         <li>التوصيل مجاني لجميع الطلبات</li>
//                         <li>يمكنك تعديل الطلب قبل التأكيد النهائي</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useState } from "react";
// import { useCart } from "../context/CartContext";
// import Header from "../components/Header";
// import Link from "next/link";
// const sendTelegramNotification = async (orderData) => {
//   try {
//     const chatId = "2077008446";
//     const botToken = "8536648814:AAH0BP1wEVdVIGhbcxRei4sYGSZlJ4BQrBA";
    
//     // نص الرسالة بالعربية
//     const message = `
// 🛍️ *طلب جديد من Amal Store*

// 👤 *العميل:* ${orderData.customer.name}
// 📞 *الجوال:* ${orderData.customer.phone}
// ${orderData.customer.whatsapp ? `📱 *الواتساب:* ${orderData.customer.whatsapp}` : ''}
// 📍 *العنوان:* ${orderData.customer.address}
// ${orderData.customer.notes ? `📝 *ملاحظات:* ${orderData.customer.notes}` : ''}

// 🛒 *المنتجات:*
// ${orderData.items.map(item => `• ${item.name} ${item.color ? `(${item.color.colorName})` : ''} ×${item.quantity} - ₪${(item.price * item.quantity).toFixed(2)}`).join('\n')}

// 💰 *المجموع:* ₪${orderData.total.toFixed(2)}
// ⏰ *الوقت:* ${new Date().toLocaleString('ar-EG')}

// 📞 *اتصل الآن:* ${orderData.customer.phone}
// ${orderData.customer.whatsapp ? `💬 *راسل على واتساب:* https://wa.me/970${orderData.customer.whatsapp.replace(/^0/, '')}` : ''}
//     `.trim();

//     console.log('Sending Telegram message:', message);

//     const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         chat_id: chatId,
//         text: message,
//         parse_mode: 'Markdown',
//         disable_web_page_preview: true
//       })
//     });

//     const result = await response.json();
//     console.log('Telegram API response:', result);
    
//     if (!result.ok) {
//       throw new Error(result.description || 'Failed to send message');
//     }
    
//     return result;
    
//   } catch (error) {
//     console.error('Error sending Telegram notification:', error);
//     throw error; // نرمي الخطأ عشان نتعامل معه في الدالة الأم
//   }
// };
// export default function CartPage() {
//   const {
//     cartItems,
//     updateQuantity,
//     removeFromCart,
//     totalPrice,
//     clearCart,
//   } = useCart();

//   const [customerInfo, setCustomerInfo] = useState({
//     name: "",
//     phone: "",
//     whatsapp: "",
//     address: "",
//     notes: "",
//   });
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [orderSuccess, setOrderSuccess] = useState(false);

//   const handleInputChange = (e) => {
//     setCustomerInfo({
//       ...customerInfo,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmitOrder = async (e) => {
//   e.preventDefault();
//   setIsSubmitting(true);

//   try {
//     // 1. التحقق من البيانات
//     if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
//       alert('يرجى ملء جميع الحقول المطلوبة (الاسم، الجوال، العنوان)');
//       return;
//     }

//     if (cartItems.length === 0) {
//       alert('السلة فارغة');
//       return;
//     }

//     // 2. إنشاء بيانات الطلب
//     const orderData = {
//       customer: customerInfo,
//       items: cartItems,
//       total: totalPrice,
//       orderDate: new Date().toISOString(),
//       status: 'pending'
//     };

//     // 3. إرسال إشعار التيليجرام أولاً
//     await sendTelegramNotification(orderData);
    
//     // 4. حفظ الطلب في localStorage
//     const existingOrders = JSON.parse(localStorage.getItem('amal-store-orders') || '[]');
//     const newOrder = {
//       id: Date.now().toString(),
//       ...orderData
//     };
//     localStorage.setItem('amal-store-orders', JSON.stringify([...existingOrders, newOrder]));

//     // 5. إظهار نجاح الطلب وتفريغ السلة
//     setOrderSuccess(true);
//     clearCart();
    
//     // 6. إعادة تعيين النموذج
//     setCustomerInfo({
//       name: '',
//       phone: '',
//       whatsapp: '',
//       address: '',
//       notes: ''
//     });

//   } catch (error) {
//     console.error('Error submitting order:', error);
//     alert('تم تقديم الطلب ولكن حدث خطأ في إرسال الإشعار. سيتم التواصل معك قريباً.');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   if (orderSuccess) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="max-w-2xl mx-auto text-center">
//             <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
//               {/* تعديل padding */}
//               <div className="text-6xl mb-4">🎉</div>
//               <h1 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4">
//                 تم تقديم طلبك بنجاح!
//               </h1>
//               {/* تعديل حجم الخط */}
//               <p className="text-gray-600 mb-6 text-sm sm:text-base">
//                 {/* تعديل حجم الخط */}
//                 سنتصل بك خلال 24 ساعة لتأكيد الطلب وتفاصيل التوصيل
//               </p>
//               <div className="space-y-3">
//                 <Link
//                   href="/"
//                   className="block w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all text-sm sm:text-base"
//                 >
//                   العودة للرئيسية
//                 </Link>
//                 <button
//                   onClick={() => setOrderSuccess(false)}
//                   className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
//                 >
//                   تقديم طلب جديد
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />

//       <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
//         {/* تعديل padding */}
//         <div className="max-w-4xl mx-auto">
//           <h1 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-2 text-center">
//             طلباتك
//           </h1>
//           {/* تعديل حجم الخط */}
//           <p className="text-gray-600 text-center mb-6 sm:mb-8 text-sm sm:text-base">
//             {/* تعديل حجم الخط والمسافة */}
//             راجع منتجاتك وأكمل معلومات التوصيل
//           </p>

//           {cartItems.length === 0 ? (
//             <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
//               <div className="text-6xl mb-4">🛒</div>
//               <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4">
//                 سلة التسوق فارغة
//               </h2>
//               {/* تعديل حجم الخط */}
//               <p className="text-gray-500 mb-6 text-sm sm:text-base">
//                 {/* تعديل حجم الخط */}
//                 لم تقم بإضافة أي منتجات إلى السلة بعد
//               </p>
//               <Link
//                 href="/"
//                 className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all text-sm sm:text-base"
//               >
//                 ابدأ التسوق
//               </Link>
//             </div>
//           ) : (
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
//               {/* تعديل المسافة */}

//               {/* الجزء الأيسر - المنتجات */}
//               <div className="space-y-4 sm:space-y-6">
//                 {/* تعديل المسافة */}
//                 <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
//                   {/* تعديل padding */}
//                   <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-3 sm:mb-4">
//                     المنتجات المختارة
//                   </h2>
//                   {/* تعديل حجم الخط والمسافة */}

//                   <div className="space-y-3 sm:space-y-4">
//                     {/* تعديل المسافة */}
//                     {cartItems.map((item) => (
//                       <div
//                         key={item.id}
//                         className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-yellow-600"
//                       >
//                         <img
//                           src={item.image}
//                           alt={item.name}
//                           className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
//                         />
//                         {/* تعديل حجم الصورة */}

//                         <div className="flex-1 min-w-0">
//                           <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
//                             {item.name}
//                           </h3>

//                           {item.color && (
//                             <p className="text-xs text-gray-600 mt-1">
//                               اللون: {item.color.colorName}
//                             </p>
//                           )}

//                           <p className="text-green-600 font-bold mt-1 text-sm sm:text-base">
//                             ₪{item.price}
//                           </p>
//                           {/* تعديل حجم الخط */}

//                           {/* Quantity Controls */}
//                           <div className="flex items-center gap-2 mt-2 sm:mt-3">
//                             {/* تعديل المسافة */}
//                             <button
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity - 1)
//                               }
//                               disabled={item.quantity <= 1}
//                               className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50 hover:bg-gray-300 transition-colors text-sm"
//                             >
//                               -
//                             </button>
//                             <span className="text-base font-medium w-6 sm:w-8 text-center">
//                               {item.quantity}
//                             </span>
//                             <button
//                               onClick={() =>
//                                 updateQuantity(item.id, item.quantity + 1)
//                               }
//                               disabled={item.quantity >= item.maxStock}
//                               className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50 hover:bg-gray-300 transition-colors text-sm"
//                             >
//                               +
//                             </button>
//                           </div>

//                           {/* رسالة نفاذ الكمية */}
//                           {item.quantity >= item.maxStock && (
//                             <p className="text-red-500 text-xs mt-2 bg-red-50 px-2 py-1 rounded border border-red-200 leading-tight">
//                               {/* إضافة leading-tight */}
//                               ⚠️ نفذت الكمية
//                             </p>
//                           )}

//                           {/* السعر الإجمالي للعنصر */}
//                           <div className="sm:hidden mt-2">
//                             {/* يظهر فقط في الشاشات الصغيرة */}
//                             <p className="text-green-600 font-bold text-sm">
//                               المجموع: ₪
//                               {(item.price * item.quantity).toFixed(2)}
//                             </p>
//                           </div>
//                         </div>

//                         {/* Remove Button */}
//                         <div className="hidden sm:flex flex-col items-end justify-between">
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="text-red-500 hover:text-red-700 transition-colors text-lg"
//                           >
//                             ✕
//                           </button>
//                           <p className="text-green-600 font-bold">
//                             ₪{(item.price * item.quantity).toFixed(2)}
//                           </p>
//                         </div>

//                         {/* Remove Button - للشاشات الصغيرة */}
//                         <div className="sm:hidden self-start">
//                           <button
//                             onClick={() => removeFromCart(item.id)}
//                             className="text-red-500 hover:text-red-700 transition-colors"
//                           >
//                             ✕
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Order Summary */}
//                   <div className="border-t pt-4 mt-4 sm:mt-6">
//                     {/* تعديل المسافة */}
//                     <div className="space-y-2">
//                       <div className="flex justify-between text-gray-600 text-sm sm:text-base">
//                         <span>المجموع:</span>
//                         <span>₪{totalPrice.toFixed(2)}</span>
//                       </div>
//                       <div className="flex justify-between text-gray-600 text-sm sm:text-base">
//                         <span>الشحن:</span>
//                         <span>يتم التحديد عن التواصل</span>
//                       </div>
//                       <div className="flex justify-between text-base sm:text-lg font-bold text-gray-800 pt-2 border-t">
//                         <span className="text-yellow-600">الإجمالي:</span>
//                         <span className="text-green-600">
//                           ₪{totalPrice.toFixed(2)}
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* الجزء الأيمن - معلومات التوصيل */}
//               <div className="space-y-4 sm:space-y-6">
//                 {/* تعديل المسافة */}
//                 <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
//                   {/* تعديل padding */}
//                   <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-3 sm:mb-4">
//                     معلومات التوصيل
//                   </h2>

//                   <form
//                     onSubmit={handleSubmitOrder}
//                     className="space-y-3 sm:space-y-4"
//                   >
//                     {/* تعديل المسافة */}
//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         الاسم الكامل *
//                       </label>
//                       <input
//                         type="text"
//                         name="name"
//                         value={customerInfo.name}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm sm:text-base"
//                         placeholder="أدخل اسمك الكامل"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         رقم الجوال *
//                       </label>
//                       <input
//                         type="tel"
//                         name="phone"
//                         value={customerInfo.phone}
//                         onChange={handleInputChange}
//                         required
//                         className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm sm:text-base"
//                         placeholder="05XXXXXXXX"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         رقم الواتساب
//                       </label>
//                       <input
//                         type="tel"
//                         name="whatsapp"
//                         value={customerInfo.whatsapp}
//                         onChange={handleInputChange}
//                         className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm sm:text-base"
//                         placeholder="05XXXXXXXX (اختياري)"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         عنوان التوصيل *
//                       </label>
//                       <textarea
//                         name="address"
//                         value={customerInfo.address}
//                         onChange={handleInputChange}
//                         required
//                         rows="3"
//                         className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm sm:text-base"
//                         placeholder="أدخل عنوانك بالتفصيل (المنطقة، الشارع، رقم المنزل)"
//                       />
//                     </div>

//                     <div>
//                       <label className="block text-sm font-medium text-gray-700 mb-2">
//                         ملاحظات إضافية
//                       </label>
//                       <textarea
//                         name="notes"
//                         value={customerInfo.notes}
//                         onChange={handleInputChange}
//                         rows="2"
//                         className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm sm:text-base"
//                         placeholder="ملاحظات حول الطلب أو وقت التوصيل المناسب"
//                       />
//                     </div>

//                     <button
//                       type="submit"
//                       disabled={isSubmitting || cartItems.length === 0}
//                       className={`w-full py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all flex items-center justify-center gap-2 ${
//                         cartItems.length === 0 || isSubmitting
//                           ? "bg-gray-300 text-gray-500 cursor-not-allowed"
//                           : "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:from-amber-600 hover:to-amber-700 hover:shadow-xl transform hover:scale-105"
//                       }`}
//                     >
//                       {isSubmitting ? (
//                         <>
//                           <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                           جاري تقديم الطلب...
//                         </>
//                       ) : (
//                         `تأكيد الطلب - ₪${totalPrice.toFixed(2)}`
//                       )}
//                     </button>
//                   </form>
//                 </div>

//                 {/* معلومات إضافية */}
//                 <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 sm:p-4">
//                   {/* تعديل padding */}
//                   <div className="flex items-start gap-2 sm:gap-3">
//                     {/* تعديل المسافة */}
//                     <div className="text-amber-500 text-base sm:text-lg">ℹ️</div>
//                     {/* تعديل الحجم */}
//                     <div className="text-xs sm:text-sm text-amber-600">
//                       {/* تعديل حجم الخط */}
//                       <p className="font-semibold mb-1">معلومات مهمة:</p>
//                       <ul className="list-disc list-inside space-y-1">
//                         <li>سيتم التواصل معك خلال دقائق</li>
//                         <li>يتم تحديد رسوم التوصيل عند مراسلتكم لتأكيد الطلب </li>
//                         <li>يمكنك تعديل الطلب قبل التأكيد النهائي</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Link from "next/link";

// دالة تحديث المخزون في الداتابيز
const updateProductStock = async (cartItems) => {
  try {
    console.log('🛠️ بدء updateProductStock...');
    console.log('🔍 فحص الـ IDs في الكارت:', cartItems.map(item => ({
      id: item.id,
      type: typeof item.id,
      length: item.id.length
    })));
    
    const stockUpdateData = {
      products: cartItems.map(item => ({
        productId: item.id,           // الـ ID الأساسي للمنتج
        quantity: item.quantity,      // الكمية المطلوبة
        colorName: item.color?.colorName || null // اسم اللون إذا موجود
      }))
    };

    console.log('📤 بيانات الإرسال للـ API:', stockUpdateData);

    const response = await fetch('/api/products/update-stock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stockUpdateData)
    });

    console.log('📡 حالة الـ response:', response.status, response.statusText);

    const result = await response.json();
    console.log('📥 نتيجة الـ API:', result);

    if (!response.ok) {
      throw new Error(result.error || 'Failed to update stock');
    }

    return result;
    
  } catch (error) {
    console.error('❌ Error updating product stock:', error);
    throw error;
  }
};

const sendTelegramNotification = async (orderData) => {
  try {
    const chatId = "2077008446";
    const botToken = "8536648814:AAH0BP1wEVdVIGhbcxRei4sYGSZlJ4BQrBA";
    
    // نص الرسالة بالعربية
    const message = `
🛍️ *طلب جديد من Amal Store*

👤 *العميل:* ${orderData.customer.name}
📞 *الجوال:* ${orderData.customer.phone}
${orderData.customer.whatsapp ? `📱 *الواتساب:* ${orderData.customer.whatsapp}` : ''}
📍 *العنوان:* ${orderData.customer.address}
${orderData.customer.notes ? `📝 *ملاحظات:* ${orderData.customer.notes}` : ''}

🛒 *المنتجات:*
${orderData.items.map(item => `• ${item.name} ${item.color ? `(${item.color.colorName})` : ''} ×${item.quantity} - ₪${(item.price * item.quantity).toFixed(2)}`).join('\n')}

💰 *المجموع:* ₪${orderData.total.toFixed(2)}
⏰ *الوقت:* ${new Date().toLocaleString('ar-EG')}

📞 *اتصل الآن:* ${orderData.customer.phone}
${orderData.customer.whatsapp ? `💬 *راسل على واتساب:* https://wa.me/970${orderData.customer.whatsapp.replace(/^0/, '')}` : ''}
    `.trim();

    console.log('Sending Telegram message:', message);

    const response = await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: 'Markdown',
        disable_web_page_preview: true
      })
    });

    const result = await response.json();
    console.log('Telegram API response:', result);
    
    if (!result.ok) {
      throw new Error(result.description || 'Failed to send message');
    }
    
    return result;
    
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    throw error; // نرمي الخطأ عشان نتعامل معه في الدالة الأم
  }
};

export default function CartPage() {
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    totalPrice,
    clearCart,
  } = useCart();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    whatsapp: "",
    address: "",
    notes: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

 const handleSubmitOrder = async (e) => {
  e.preventDefault();
  setIsSubmitting(true);
console.log('🔍 فحص بيانات الكارت بالتفصيل:', JSON.stringify(cartItems, null, 2));

  try {
    console.log('🚀 بدء تقديم الطلب...');
    
    // 1. التحقق من البيانات
    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert('يرجى ملء جميع الحقول المطلوبة (الاسم، الجوال، العنوان)');
      return;
    }

    if (cartItems.length === 0) {
      alert('السلة فارغة');
      return;
    }

    // 2. إنشاء بيانات الطلب
    const orderData = {
      customer: customerInfo,
      items: cartItems,
      total: totalPrice,
      orderDate: new Date().toISOString(),
      status: 'pending'
    };

    console.log('📦 بيانات الطلب:', orderData);
    console.log('🛒 المنتجات في السلة:', cartItems);

    // 🔥 3. تحديث المخزون في الداتابيز (الجديد)
    console.log('🔄 محاولة تحديث المخزون...');
    const stockResult = await updateProductStock(cartItems);
    console.log('✅ نتيجة تحديث المخزون:', stockResult);

    // 4. إرسال إشعار التيليجرام
    console.log('📱 إرسال إشعار التليجرام...');
    await sendTelegramNotification(orderData);
    console.log('✅ تم إرسال التليجرام');
    
    // 5. حفظ الطلب في localStorage
    const existingOrders = JSON.parse(localStorage.getItem('amal-store-orders') || '[]');
    const newOrder = {
      id: Date.now().toString(),
      ...orderData
    };
    localStorage.setItem('amal-store-orders', JSON.stringify([...existingOrders, newOrder]));
    console.log('💾 تم حفظ الطلب في localStorage');

    // 6. إظهار نجاح الطلب وتفريغ السلة
    setOrderSuccess(true);
    clearCart();
    
    // 7. إعادة تعيين النموذج
    setCustomerInfo({
      name: '',
      phone: '',
      whatsapp: '',
      address: '',
      notes: ''
    });

    console.log('🎉 تم تقديم الطلب بنجاح!');

  } catch (error) {
    console.error('❌ Error submitting order:', error);
    
    // رسالة خطأ أكثر وضوحاً
    if (error.message.includes('الكمية غير كافية')) {
      alert('عذراً، بعض المنتجات لم تعد متوفرة بالكمية المطلوبة. يرجى تحديث السلة والمحاولة مرة أخرى.');
    } else {
      alert('تم تقديم الطلب ولكن حدث خطأ في تحديث المخزون. سيتم التواصل معك قريباً.');
    }
  } finally {
    setIsSubmitting(false);
  }
};

  if (orderSuccess) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8">
              {/* تعديل padding */}
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4">
                تم تقديم طلبك بنجاح!
              </h1>
              {/* تعديل حجم الخط */}
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
                {/* تعديل حجم الخط */}
                سنتصل بك لتأكيد الطلب وتفاصيل التوصيل
              </p>
              <div className="space-y-3">
                <Link
                  href="/"
                  className="block w-full py-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all text-sm sm:text-base"
                >
                  العودة للرئيسية
                </Link>
                <button
                  onClick={() => setOrderSuccess(false)}
                  className="w-full py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors text-sm sm:text-base"
                >
                  تقديم طلب جديد
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-3 sm:px-4 py-6 sm:py-8">
        {/* تعديل padding */}
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-2 text-center">
            طلباتك
          </h1>
          {/* تعديل حجم الخط */}
          <p className="text-gray-600 text-center mb-6 sm:mb-8 text-sm sm:text-base">
            {/* تعديل حجم الخط والمسافة */}
            راجع منتجاتك وأكمل معلومات التوصيل
          </p>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4">
                سلة التسوق فارغة
              </h2>
              {/* تعديل حجم الخط */}
              <p className="text-gray-500 mb-6 text-sm sm:text-base">
                {/* تعديل حجم الخط */}
                لم تقم بإضافة أي منتجات إلى السلة بعد
              </p>
              <Link
                href="/"
                className="inline-block bg-gradient-to-r from-amber-500 to-amber-600 text-white px-6 sm:px-8 py-3 rounded-lg font-semibold hover:from-amber-600 hover:to-amber-700 transition-all text-sm sm:text-base"
              >
                ابدأ التسوق
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
              {/* تعديل المسافة */}

              {/* الجزء الأيسر - المنتجات */}
              <div className="space-y-4 sm:space-y-6">
                {/* تعديل المسافة */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                  {/* تعديل padding */}
                  <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-3 sm:mb-4">
                    المنتجات المختارة
                  </h2>
                  {/* تعديل حجم الخط والمسافة */}

                  <div className="space-y-3 sm:space-y-4">
                    {/* تعديل المسافة */}
                    {cartItems.map((item) => (
                      <div
                        key={item.id}
                        className="flex gap-3 p-3 bg-gray-50 rounded-lg border border-yellow-600"
                      >
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                        />
                        {/* تعديل حجم الصورة */}

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                            {item.name}
                          </h3>

                          {item.color && (
                            <p className="text-xs text-gray-600 mt-1">
                              اللون: {item.color.colorName}
                            </p>
                          )}

                          <p className="text-green-600 font-bold mt-1 text-sm sm:text-base">
                            ₪{item.price}
                          </p>
                          {/* تعديل حجم الخط */}

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2 sm:mt-3">
                            {/* تعديل المسافة */}
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                              className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50 hover:bg-gray-300 transition-colors text-sm"
                            >
                              -
                            </button>
                            <span className="text-base font-medium w-6 sm:w-8 text-center">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() =>
                                updateQuantity(item.id, item.quantity + 1)
                              }
                              disabled={item.quantity >= item.maxStock}
                              className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50 hover:bg-gray-300 transition-colors text-sm"
                            >
                              +
                            </button>
                          </div>

                          {/* رسالة نفاذ الكمية */}
                          {item.quantity >= item.maxStock && (
                            <p className="text-red-500 text-xs mt-2 bg-red-50 px-2 py-1 rounded border border-red-200 leading-tight">
                              {/* إضافة leading-tight */}
                              ⚠️ نفذت الكمية
                            </p>
                          )}

                          {/* السعر الإجمالي للعنصر */}
                          <div className="sm:hidden mt-2">
                            {/* يظهر فقط في الشاشات الصغيرة */}
                            <p className="text-green-600 font-bold text-sm">
                              المجموع: ₪
                              {(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

                        {/* Remove Button */}
                        <div className="hidden sm:flex flex-col items-end justify-between">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors text-lg"
                          >
                            ✕
                          </button>
                          <p className="text-green-600 font-bold">
                            ₪{(item.price * item.quantity).toFixed(2)}
                          </p>
                        </div>

                        {/* Remove Button - للشاشات الصغيرة */}
                        <div className="sm:hidden self-start">
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="text-red-500 hover:text-red-700 transition-colors"
                          >
                            ✕
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-4 mt-4 sm:mt-6">
                    {/* تعديل المسافة */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                        <span>المجموع:</span>
                        <span>₪{totalPrice.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-gray-600 text-sm sm:text-base">
                        <span>الشحن:</span>
                        <span>يتم التحديد عن التواصل</span>
                      </div>
                      <div className="flex justify-between text-base sm:text-lg font-bold text-gray-800 pt-2 border-t">
                        <span className="text-yellow-600">الإجمالي:</span>
                        <span className="text-green-600">
                          ₪{totalPrice.toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* الجزء الأيمن - معلومات التوصيل */}
              <div className="space-y-4 sm:space-y-6">
                {/* تعديل المسافة */}
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                  {/* تعديل padding */}
                  <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-3 sm:mb-4">
                    معلومات التوصيل
                  </h2>

                  <form
                    onSubmit={handleSubmitOrder}
                    className="space-y-3 sm:space-y-4"
                  >
                    {/* تعديل المسافة */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        الاسم الكامل *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={customerInfo.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm sm:text-base"
                        placeholder="أدخل اسمك الكامل"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الجوال *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={customerInfo.phone}
                        onChange={handleInputChange}
                        required
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm sm:text-base"
                        placeholder="05XXXXXXXX"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        رقم الواتساب
                      </label>
                      <input
                        type="tel"
                        name="whatsapp"
                        value={customerInfo.whatsapp}
                        onChange={handleInputChange}
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm sm:text-base"
                        placeholder="05XXXXXXXX (اختياري)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        عنوان التوصيل *
                      </label>
                      <textarea
                        name="address"
                        value={customerInfo.address}
                        onChange={handleInputChange}
                        required
                        rows="3"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm sm:text-base"
                        placeholder="أدخل عنوانك بالتفصيل (المنطقة، الشارع، رقم المنزل)"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        ملاحظات إضافية
                      </label>
                      <textarea
                        name="notes"
                        value={customerInfo.notes}
                        onChange={handleInputChange}
                        rows="2"
                        className="w-full px-3 sm:px-4 py-2 sm:py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all text-sm sm:text-base"
                        placeholder="ملاحظات حول الطلب أو وقت التوصيل المناسب"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting || cartItems.length === 0}
                      className={`w-full py-3 sm:py-4 rounded-lg text-base sm:text-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                        cartItems.length === 0 || isSubmitting
                          ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                          : "bg-gradient-to-r from-amber-500 to-amber-600 text-white shadow-lg hover:from-amber-600 hover:to-amber-700 hover:shadow-xl transform hover:scale-105"
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 sm:w-5 sm:h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          جاري تقديم الطلب...
                        </>
                      ) : (
                        `تأكيد الطلب - ₪${totalPrice.toFixed(2)}`
                      )}
                    </button>
                  </form>
                </div>

                {/* معلومات إضافية */}
                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 sm:p-4">
                  {/* تعديل padding */}
                  <div className="flex items-start gap-2 sm:gap-3">
                    {/* تعديل المسافة */}
                    <div className="text-amber-500 text-base sm:text-lg">ℹ️</div>
                    {/* تعديل الحجم */}
                    <div className="text-xs sm:text-sm text-amber-600">
                      {/* تعديل حجم الخط */}
                      <p className="font-semibold mb-1">معلومات مهمة:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>سيتم التواصل معك خلال دقائق</li>
                        <li>يتم تحديد رسوم التوصيل عند مراسلتكم لتأكيد الطلب </li>
                        <li>يمكنك تعديل الطلب قبل التأكيد النهائي</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}