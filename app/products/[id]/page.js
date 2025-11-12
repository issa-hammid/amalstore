// "use client";
// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Header from '../../components/Header';

// export default function ProductDetailPage() {
//   const params = useParams();
//   const productId = params.id;
  
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState('');
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [addingToCart, setAddingToCart] = useState(false);

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/products/${productId}`);
//         const data = await res.json();
        
//         if (data.success) {
//           setProduct(data.product);
//           setSelectedImage(data.product.image);
//           setSelectedColor(null); // نضبطها على null بدل ما تكون undefined
//         } else {
//           setError(data.error || 'حدث خطأ في جلب البيانات');
//         }
//       } catch (err) {
//         setError('حدث خطأ في الاتصال بالخادم');
//         console.error('Error fetching product:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (productId) {
//       fetchProductData();
//     }
//   }, [productId]);

//   const handleColorSelect = (color) => {
//     setSelectedColor(color);
//     if (color && color.image) {
//       setSelectedImage(color.image);
//     }
//     // نعيد الكمية إلى 1 عند تغيير اللون
//     setQuantity(1);
//   };

//   const handleImageSelect = (image) => {
//     setSelectedImage(image);
    
//     // نبحث عن اللون اللي مربوط مع هالصورة
//     if (product.colors && product.colors.length > 0) {
//       const colorForImage = product.colors.find(color => color.image === image);
//       if (colorForImage) {
//         setSelectedColor(colorForImage);
//       } else if (image === product.image) {
//         // إذا كانت الصورة الأساسية، نرجع للون الأساسي
//         setSelectedColor(null);
//       }
//     }
    
//     // نعيد الكمية إلى 1 عند تغيير الصورة
//     setQuantity(1);
//   };

//   const handleQuantityChange = (newQuantity) => {
//     const currentStock = selectedColor ? selectedColor.stock : product.stock;
//     if (newQuantity >= 1 && newQuantity <= currentStock) {
//       setQuantity(newQuantity);
//     }
//   };

//   // دالة لحساب الكمية المتوفرة الحالية
//   const getAvailableStock = () => {
//     if (!product) return 0;
    
//     // إذا في لون محدد، نستخدم كمية اللون
//     if (selectedColor) {
//       return selectedColor.stock;
//     }
    
//     // إذا الصورة المحددة بتكون لون معين، نستخدم كمية ذلك اللون
//     if (product.colors && product.colors.length > 0) {
//       const colorForSelectedImage = product.colors.find(color => color.image === selectedImage);
//       if (colorForSelectedImage) {
//         return colorForSelectedImage.stock;
//       }
//     }
    
//     // إذا لا، نستخدم الكمية الأساسية للمنتج
//     return product.stock;
//   };

//   const handleAddToCart = async () => {
//     try {
//       setAddingToCart(true);
      
//       const availableStock = getAvailableStock();
//       if (availableStock <= 0) {
//         alert('المنتج غير متوفر حالياً');
//         return;
//       }
      
//       console.log('إضافة للسلة:', {
//         productId: product._id,
//         productName: product.name,
//         selectedImage: selectedImage,
//         selectedColor: selectedColor,
//         quantity: quantity,
//         price: product.price,
//         availableStock: availableStock
//       });
      
//       alert('تم إضافة المنتج إلى السلة بنجاح!');
      
//     } catch (error) {
//       console.error('Error adding to cart:', error);
//       alert('حدث خطأ أثناء إضافة المنتج إلى السلة');
//     } finally {
//       setAddingToCart(false);
//     }
//   };

//   // ... باقي الكود (الـ loading و error states)

//   if (!product) return null;

//   const availableStock = getAvailableStock();
//   const displayPrice = product.oldPrice && product.oldPrice > product.price ? product.oldPrice : null;
  
//   // جمع كل الصور المتاحة
//   const allImages = [product.image];
//   if (product.colors && product.colors.length > 0) {
//     product.colors.forEach(color => {
//       if (color.image && !allImages.includes(color.image)) {
//         allImages.push(color.image);
//       }
//     });
//   }

//   // الحصول على اسم اللون الحالي
//   const getCurrentColorName = () => {
//     if (selectedColor) {
//       return selectedColor.colorName;
//     }
    
//     // إذا الصورة المحددة بتكون لون معين
//     if (product.colors && product.colors.length > 0) {
//       const colorForSelectedImage = product.colors.find(color => color.image === selectedImage);
//       if (colorForSelectedImage) {
//         return colorForSelectedImage.colorName;
//       }
//     }
    
//     return 'أساسي';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
      
//       <section className="py-8">
//         <div className="container mx-auto px-4">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
//               {/* الجزء الأيمن - الصور */}
//               <div className="space-y-4">
//                 {/* الصورة الرئيسية */}
//                 <div className="bg-gray-100 rounded-xl overflow-hidden">
//                   <img
//                     src={selectedImage}
//                     alt={product.name}
//                     className="w-full h-80 lg:h-96 object-cover"
//                   />
//                 </div>

//                 {/* الصور المصغرة */}
//                 {allImages.length > 1 && (
//                   <div className="flex gap-2 overflow-x-auto pb-2">
//                     {allImages.map((image, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleImageSelect(image)}
//                         className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
//                           selectedImage === image 
//                             ? 'border-yellow-400 ring-2 ring-yellow-200' 
//                             : 'border-gray-300 hover:border-yellow-400'
//                         }`}
//                       >
//                         <img
//                           src={image}
//                           alt={`${product.name} ${index + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* الجزء الأيسر - المعلومات */}
//               <div className="space-y-6">
//                 {/* العنوان والفئة */}
//                 <div>
//                   <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                     {product.category?.name}
//                   </span>
//                   <h1 className="text-3xl font-bold text-gray-800 mt-2">
//                     {product.name}
//                   </h1>
//                 </div>

//                 {/* اللون الحالي */}
//                 <div className="flex items-center gap-2 text-sm">
//                   <span className="text-gray-600">النوع المحدد:</span>
//                   <span className="font-bold text-yellow-600">
//                     {getCurrentColorName()}
//                   </span>
//                 </div>

//                 {/* الأسعار */}
//                 <div className="flex items-center gap-4">
//                   <span className="text-3xl font-bold text-green-600">
//                     ₪{product.price}
//                   </span>
//                   {displayPrice && (
//                     <>
//                       <span className="text-xl text-gray-500 line-through">
//                         ₪{displayPrice}
//                       </span>
//                       {product.discountPercent > 0 && (
//                         <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">
//                           خصم {product.discountPercent}%
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </div>

//                 {/* الكمية المتوفرة */}
//                 <div className="flex items-center gap-2 text-sm">
//                   <span className="text-gray-600">الكمية المتوفرة:</span>
//                   <span className={`font-bold ${
//                     availableStock > 10 ? 'text-green-600' : 
//                     availableStock > 0 ? 'text-yellow-600' : 'text-red-600'
//                   }`}>
//                     {availableStock}
//                   </span>
//                 </div>

//                 {/* الوصف */}
//                 <div className="text-gray-700 leading-relaxed">
//                   <h3 className="font-semibold text-lg mb-2">الوصف:</h3>
//                   <p className="text-gray-600">{product.description}</p>
//                 </div>

//                 {/* الألوان */}
//                 {product.colors && product.colors.length > 0 && (
//                   <div className="space-y-3">
//                     <h3 className="font-semibold text-lg">الألوان المتاحة:</h3>
//                     <div className="flex gap-3 flex-wrap">
//                       <button
//                         onClick={() => {
//                           setSelectedColor(null);
//                           setSelectedImage(product.image);
//                           setQuantity(1);
//                         }}
//                         className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
//                           !selectedColor && selectedImage === product.image
//                             ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200'
//                             : 'border-gray-300 hover:border-yellow-400'
//                         }`}
//                       >
//                         <img
//                           src={product.image}
//                           alt="أساسي"
//                           className="w-8 h-8 rounded-full object-cover"
//                         />
//                         <span className="text-sm">أساسي</span>
//                         <span className="text-xs text-gray-500">({product.stock})</span>
//                       </button>

//                       {product.colors.map((color, index) => (
//                         <button
//                           key={index}
//                           onClick={() => handleColorSelect(color)}
//                           className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
//                             selectedColor?.colorName === color.colorName
//                               ? 'border-yellow-400 bg-yellow-50 ring-2 ring-yellow-200'
//                               : 'border-gray-300 hover:border-yellow-400'
//                           }`}
//                         >
//                           {color.image ? (
//                             <img
//                               src={color.image}
//                               alt={color.colorName}
//                               className="w-8 h-8 rounded-full object-cover"
//                             />
//                           ) : (
//                             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
//                               {color.colorName?.charAt(0) || '?'}
//                             </div>
//                           )}
//                           <span className="text-sm">{color.colorName}</span>
//                           <span className="text-xs text-gray-500">({color.stock})</span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* الكمية */}
//                 <div className="space-y-3">
//                   <h3 className="font-semibold text-lg">الكمية:</h3>
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => handleQuantityChange(quantity - 1)}
//                       disabled={quantity <= 1}
//                       className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       -
//                     </button>
//                     <span className="text-lg font-semibold w-12 text-center">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => handleQuantityChange(quantity + 1)}
//                       disabled={quantity >= availableStock}
//                       className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed"
//                     >
//                       +
//                     </button>
//                   </div>
//                 </div>

//                 {/* زر الإضافة للسلة */}
//                 <button
//                   onClick={handleAddToCart}
//                   disabled={availableStock <= 0 || addingToCart}
//                   className={`w-full py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center gap-2 ${
//                     availableStock <= 0
//                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       : 'bg-gradient-to-r from-rose-500 to-yellow-500 hover:from-rose-600 hover:to-yellow-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105'
//                   } ${addingToCart ? 'opacity-70 cursor-not-allowed' : ''}`}
//                 >
//                   {addingToCart ? (
//                     <>
//                       <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
//                       جاري الإضافة...
//                     </>
//                   ) : availableStock <= 0 ? (
//                     'غير متوفر'
//                   ) : (
//                     <>
//                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                       </svg>
//                       أضف إلى السلة - ₪{(product.price * quantity).toFixed(2)}
//                     </>
//                   )}
//                 </button>

//                 {/* معلومات الشحن */}
//                 <div className="bg-gray-50 rounded-lg p-4 space-y-2">
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span>شحن سريع خلال 2-3 أيام</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm text-gray-600">
//                     <svg className="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                       <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
//                     </svg>
//                     <span>إرجاع مجاني خلال 14 يوم</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }

// "use client";
// import { useState, useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Header from '../../components/Header';
// import { useCart } from '../../context/CartContext'; // أضفنا استيراد useCart
// import { notify } from "../../lib/notifications"
// export default function ProductDetailPage() {
//   const params = useParams();
//   const productId = params.id;
  
//   const [product, setProduct] = useState(null);
//   const [selectedImage, setSelectedImage] = useState('');
//   const [selectedColor, setSelectedColor] = useState(null);
//   const [quantity, setQuantity] = useState(1);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
  
//   // استخدمنا useCart بدل useState المحلي
//   const { addToCartWithQuantity, setIsCartOpen } = useCart();

//   useEffect(() => {
//     const fetchProductData = async () => {
//       try {
//         setLoading(true);
//         const res = await fetch(`/api/products/${productId}`);
//         const data = await res.json();
        
//         if (data.success) {
//           setProduct(data.product);
//           setSelectedImage(data.product.image);
//           setSelectedColor(null);
//         } else {
//           setError(data.error || 'حدث خطأ في جلب البيانات');
//         }
//       } catch (err) {
//         setError('حدث خطأ في الاتصال بالخادم');
//         console.error('Error fetching product:', err);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (productId) {
//       fetchProductData();
//     }
//   }, [productId]);

//   const handleColorSelect = (color) => {
//     setSelectedColor(color);
//     if (color && color.image) {
//       setSelectedImage(color.image);
//     }
//     setQuantity(1);
//   };

//   const handleImageSelect = (image) => {
//     setSelectedImage(image);
    
//     if (product.colors && product.colors.length > 0) {
//       const colorForImage = product.colors.find(color => color.image === image);
//       if (colorForImage) {
//         setSelectedColor(colorForImage);
//       } else if (image === product.image) {
//         setSelectedColor(null);
//       }
//     }
    
//     setQuantity(1);
//   };

//   const handleQuantityChange = (newQuantity) => {
//     const currentStock = selectedColor ? selectedColor.stock : product.stock;
//     if (newQuantity >= 1 && newQuantity <= currentStock) {
//       setQuantity(newQuantity);
//     }
//   };

//   // دالة لحساب الكمية المتوفرة الحالية
//   const getAvailableStock = () => {
//     if (!product) return 0;
    
//     if (selectedColor) {
//       return selectedColor.stock;
//     }
    
//     if (product.colors && product.colors.length > 0) {
//       const colorForSelectedImage = product.colors.find(color => color.image === selectedImage);
//       if (colorForSelectedImage) {
//         return colorForSelectedImage.stock;
//       }
//     }
    
//     return product.stock;
//   };

//   // دالة الإضافة للسلة المحدثة
//  const handleAddToCart = () => {
//   const availableStock = getAvailableStock();
  
//   if (availableStock <= 0) {
//     notify.error("المنتج غير متوفر حالياً");
//     return;
//   }

//   if (quantity > availableStock) {
//     notify.error(`الكمية المطلوبة (${quantity}) تتجاوز الكمية المتاحة (${availableStock})`);
//     return;
//   }

//   // استخدام الدالة الجديدة التي تأخذ الكمية
//   addToCartWithQuantity(product, selectedColor, selectedImage, quantity);
//   notify.success(" تم إضافة المنتج بنجاح");
//   // فتح السلة المنبثقة تلقائياً
//   setIsCartOpen(true);
  
//   // إعادة تعيين الكمية إلى 1 بعد الإضافة
//   setQuantity(1);
// };

//   // حالات التحميل والخطأ
//   // if (loading) {
//   //   return (
//   //     <div className="min-h-screen bg-gray-50">
//   //       <Header />
//   //       <div className="container mx-auto px-4 py-8">
//   //         <div className="flex justify-center items-center h-64">
//   //           <div className="text-gray-500 text-lg">جاري تحميل المنتج...</div>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
//   // }
// if (loading) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
//             {/* العمود الأيمن - الصور */}
//             <div className="space-y-4">
//               <div className="w-full h-80 lg:h-96 bg-gray-300 rounded-xl"></div>
//               <div className="flex gap-2 overflow-x-auto">
//                 {Array.from({ length: 4 }).map((_, i) => (
//                   <div key={i} className="w-16 h-16 rounded-lg bg-gray-300 flex-shrink-0"></div>
//                 ))}
//               </div>
//             </div>

//             {/* العمود الأيسر - المعلومات */}
//             <div className="space-y-6">
//               <div className="h-6 w-32 bg-gray-300 rounded-full"></div>
//               <div className="h-10 w-3/4 bg-gray-300 rounded-full"></div>
//               <div className="h-6 w-1/4 bg-gray-300 rounded-full"></div>
//               <div className="h-8 w-32 bg-gray-300 rounded-full"></div>
//               <div className="h-4 w-full bg-gray-300 rounded-lg"></div>
//               <div className="h-4 w-full bg-gray-300 rounded-lg"></div>
//               <div className="h-4 w-5/6 bg-gray-300 rounded-lg"></div>
//               <div className="flex gap-3">
//                 {Array.from({ length: 3 }).map((_, i) => (
//                   <div key={i} className="w-20 h-10 bg-gray-300 rounded-lg"></div>
//                 ))}
//               </div>
//               <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
//               <div className="h-20 w-full bg-gray-300 rounded-lg"></div>
//             </div>
//           </div>
//         </div>
//       </div>
//     );
//   }
//   // if (error) {
//   //   return (
//   //     <div className="min-h-screen bg-gray-50">
//   //       <Header />
//   //       <div className="container mx-auto px-4 py-8">
//   //         <div className="flex justify-center items-center h-64">
//   //           <div className="text-red-500 text-lg">{error}</div>
//   //         </div>
//   //       </div>
//   //     </div>
//   //   );
//   // }
// if (error || !product) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
//           <div className="text-red-500 text-lg">{error || 'المنتج غير موجود'}</div>
//         </div>
//       </div>
//     );
//   }
//   if (!product) {
//     return (
//       <div className="min-h-screen bg-gray-50">
//         <Header />
//         <div className="container mx-auto px-4 py-8">
//           <div className="flex justify-center items-center h-64">
//             <div className="text-gray-500 text-lg">المنتج غير موجود</div>
//           </div>
//         </div>
//       </div>
//     );
//   }

//   const availableStock = getAvailableStock();
//   const displayPrice = product.oldPrice && product.oldPrice > product.price ? product.oldPrice : null;
  
//   // جمع كل الصور المتاحة
//   const allImages = [product.image];
//   if (product.colors && product.colors.length > 0) {
//     product.colors.forEach(color => {
//       if (color.image && !allImages.includes(color.image)) {
//         allImages.push(color.image);
//       }
//     });
//   }

//   // الحصول على اسم اللون الحالي
//   const getCurrentColorName = () => {
//     if (selectedColor) {
//       return selectedColor.colorName;
//     }
    
//     if (product.colors && product.colors.length > 0) {
//       const colorForSelectedImage = product.colors.find(color => color.image === selectedImage);
//       if (colorForSelectedImage) {
//         return colorForSelectedImage.colorName;
//       }
//     }
    
//     return 'أساسي';
//   };

//   return (
//     <div className="min-h-screen bg-gray-50">
//       <Header />
      
//       <section className="py-8">
//         <div className="container mx-auto px-4">
//           <div className="bg-white rounded-2xl shadow-lg p-6">
//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
//               {/* الجزء الأيمن - الصور */}
//               <div className="space-y-4">
//                 {/* الصورة الرئيسية */}
//                 <div className="bg-gray-100 rounded-xl overflow-hidden">
//                   <img
//                     src={selectedImage}
//                     alt={product.name}
//                     className="w-full h-80 lg:h-96 object-cover"
//                   />
//                 </div>

//                 {/* الصور المصغرة */}
//                 {allImages.length > 1 && (
//                   <div className="flex gap-2 overflow-x-auto pb-2">
//                     {allImages.map((image, index) => (
//                       <button
//                         key={index}
//                         onClick={() => handleImageSelect(image)}
//                         className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
//                           selectedImage === image 
//                             ? 'border-amber-400 ring-2 ring-amber-200' 
//                             : 'border-gray-300 hover:border-amber-400'
//                         }`}
//                       >
//                         <img
//                           src={image}
//                           alt={`${product.name} ${index + 1}`}
//                           className="w-full h-full object-cover"
//                         />
//                       </button>
//                     ))}
//                   </div>
//                 )}
//               </div>

//               {/* الجزء الأيسر - المعلومات */}
//               <div className="space-y-6">
//                 {/* العنوان والفئة */}
//                 <div>
//                   <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
//                     {product.category?.name}
//                   </span>
//                   <h1 className="text-3xl font-bold text-gray-800 mt-2">
//                     {product.name}
//                   </h1>
//                 </div>

//                 {/* اللون الحالي */}
//                 <div className="flex items-center gap-2 text-sm">
//                   <span className="text-gray-600">النوع المحدد:</span>
//                   <span className="font-bold text-amber-600">
//                     {getCurrentColorName()}
//                   </span>
//                 </div>

//                 {/* الأسعار */}
//                 <div className="flex items-center gap-4">
//                   <span className="text-3xl font-bold text-green-600">
//                     ₪{product.price}
//                   </span>
//                   {displayPrice && (
//                     <>
//                       <span className="text-xl text-gray-500 line-through">
//                         ₪{displayPrice}
//                       </span>
//                       {product.discountPercent > 0 && (
//                         <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">
//                           خصم {product.discountPercent}%
//                         </span>
//                       )}
//                     </>
//                   )}
//                 </div>

//                 {/* الكمية المتوفرة */}
//                 <div className="flex items-center gap-2 text-sm">
//                   <span className="text-gray-600">الكمية المتوفرة:</span>
//                   <span className={`font-bold ${
//                     availableStock > 10 ? 'text-green-600' : 
//                     availableStock > 0 ? 'text-yellow-600' : 'text-red-600'
//                   }`}>
//                     {availableStock}
//                   </span>
//                 </div>

//                 {/* الوصف */}
//                 <div className="text-gray-700 leading-relaxed">
//                   <h3 className="font-semibold text-lg mb-2">الوصف:</h3>
//                   <p className="text-gray-600">{product.description}</p>
//                 </div>

//                 {/* الألوان */}
//                 {product.colors && product.colors.length > 0 && (
//                   <div className="space-y-3">
//                     <h3 className="font-semibold text-lg">الألوان المتاحة:</h3>
//                     <div className="flex gap-3 flex-wrap">
//                       <button
//                         onClick={() => {
//                           setSelectedColor(null);
//                           setSelectedImage(product.image);
//                           setQuantity(1);
//                         }}
//                         className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
//                           !selectedColor && selectedImage === product.image
//                             ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200'
//                             : 'border-gray-300 hover:border-amber-400'
//                         }`}
//                       >
//                         <img
//                           src={product.image}
//                           alt="أساسي"
//                           className="w-8 h-8 rounded-full object-cover"
//                         />
//                         <span className="text-sm">أساسي</span>
//                         <span className="text-xs text-gray-500">({product.stock})</span>
//                       </button>

//                       {product.colors.map((color, index) => (
//                         <button
//                           key={index}
//                           onClick={() => handleColorSelect(color)}
//                           className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
//                             selectedColor?.colorName === color.colorName
//                               ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200'
//                               : 'border-gray-300 hover:border-amber-400'
//                           }`}
//                         >
//                           {color.image ? (
//                             <img
//                               src={color.image}
//                               alt={color.colorName}
//                               className="w-8 h-8 rounded-full object-cover"
//                             />
//                           ) : (
//                             <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
//                               {color.colorName?.charAt(0) || '?'}
//                             </div>
//                           )}
//                           <span className="text-sm">{color.colorName}</span>
//                           <span className="text-xs text-gray-500">({color.stock})</span>
//                         </button>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* الكمية */}
//                 <div className="space-y-3">
//                   <h3 className="font-semibold text-lg">الكمية:</h3>
//                   <div className="flex items-center gap-3">
//                     <button
//                       onClick={() => handleQuantityChange(quantity - 1)}
//                       disabled={quantity <= 1}
//                       className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
//                     >
//                       -
//                     </button>
//                     <span className="text-lg font-semibold w-12 text-center">
//                       {quantity}
//                     </span>
//                     <button
//                       onClick={() => handleQuantityChange(quantity + 1)}
//                       disabled={quantity >= availableStock}
//                       className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
//                     >
//                       +
//                     </button>
//                   </div>
                  
//                   {/* رسالة إذا الكمية المطلوبة تتجاوز المخزون */}
//                   {quantity > availableStock && (
//                     <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded border border-red-200">
//                       ⚠️ الكمية المطلوبة تتجاوز المخزون المتاح
//                     </p>
//                   )}
//                 </div>

//                 {/* زر الإضافة للسلة */}
//                 <button
//                   onClick={handleAddToCart}
//                   disabled={availableStock <= 0 || quantity > availableStock}
//                   className={`w-full py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center gap-2 ${
//                     availableStock <= 0 || quantity > availableStock
//                       ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
//                       : 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-lg hover:from-rose-500 hover:to-rose-700 hover:shadow-xl transform hover:scale-105'
//                   }`}
//                 >
//                   {availableStock <= 0 ? (
//                     'غير متوفر'
//                   ) : quantity > availableStock ? (
//                     'تجاوز المخزون'
//                   ) : (
//                     <>
//                       <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
//                       </svg>
//                       أضف إلى السلة - ₪{(product.price * quantity).toFixed(2)}
//                     </>
//                   )}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// }
"use client";
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Header from '../../components/Header';
import { useCart } from '../../context/CartContext';
import { notify } from "../../lib/notifications";
import Link from 'next/link';

export default function ProductDetailPage() {
  const params = useParams();
  const productId = params.id;
  
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [relatedLoading, setRelatedLoading] = useState(false);
  
  const { addToCartWithQuantity, setIsCartOpen } = useCart();

  useEffect(() => {
    const fetchProductData = async () => {
      try {
        setLoading(true);
        const res = await fetch(`/api/products/${productId}`);
        const data = await res.json();
        
        if (data.success) {
          setProduct(data.product);
          setSelectedImage(data.product.image);
          setSelectedColor(null);
          
          // جلب المنتجات المشابهة بعد تحميل المنتج
          fetchRelatedProducts(data.product.category?._id, data.product._id);
        } else {
          setError(data.error || 'حدث خطأ في جلب البيانات');
        }
      } catch (err) {
        setError('حدث خطأ في الاتصال بالخادم');
        console.error('Error fetching product:', err);
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchProductData();
    }
  }, [productId]);

  // دالة لجلب المنتجات المشابهة
  const fetchRelatedProducts = async (categoryId, currentProductId) => {
    if (!categoryId) return;
    
    try {
      setRelatedLoading(true);
      const res = await fetch(`/api/products?category=${categoryId}&limit=4`);
      const data = await res.json();
      
      if (data.success) {
        // تصفية المنتج الحالي من القائمة
        const filteredProducts = data.products.filter(
          product => product._id !== currentProductId
        );
        setRelatedProducts(filteredProducts.slice(0, 4)); // أخذ أول 4 منتجات
      }
    } catch (err) {
      console.error('Error fetching related products:', err);
    } finally {
      setRelatedLoading(false);
    }
  };

  const handleColorSelect = (color) => {
    setSelectedColor(color);
    if (color && color.image) {
      setSelectedImage(color.image);
    }
    setQuantity(1);
  };

  const handleImageSelect = (image) => {
    setSelectedImage(image);
    
    if (product.colors && product.colors.length > 0) {
      const colorForImage = product.colors.find(color => color.image === image);
      if (colorForImage) {
        setSelectedColor(colorForImage);
      } else if (image === product.image) {
        setSelectedColor(null);
      }
    }
    
    setQuantity(1);
  };

  const handleQuantityChange = (newQuantity) => {
    const currentStock = selectedColor ? selectedColor.stock : product.stock;
    if (newQuantity >= 1 && newQuantity <= currentStock) {
      setQuantity(newQuantity);
    }
  };

  const getAvailableStock = () => {
    if (!product) return 0;
    
    if (selectedColor) {
      return selectedColor.stock;
    }
    
    if (product.colors && product.colors.length > 0) {
      const colorForSelectedImage = product.colors.find(color => color.image === selectedImage);
      if (colorForSelectedImage) {
        return colorForSelectedImage.stock;
      }
    }
    
    return product.stock;
  };

  const handleAddToCart = () => {
    const availableStock = getAvailableStock();
    
    if (availableStock <= 0) {
      notify.error("المنتج غير متوفر حالياً");
      return;
    }

    if (quantity > availableStock) {
      notify.error(`الكمية المطلوبة (${quantity}) تتجاوز الكمية المتاحة (${availableStock})`);
      return;
    }

    addToCartWithQuantity(product, selectedColor, selectedImage, quantity);
    notify.success(" تم إضافة المنتج بنجاح");
    setIsCartOpen(true);
    setQuantity(1);
  };

  // دالة لإضافة المنتج المشابه إلى السلة
  const handleAddRelatedToCart = (relatedProduct) => {
    addToCartWithQuantity(relatedProduct, null, relatedProduct.image, 1);
    notify.success("تم إضافة المنتج المشابه إلى السلة");
    setIsCartOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 animate-pulse">
            {/* العمود الأيمن - الصور */}
            <div className="space-y-4">
              <div className="w-full h-80 lg:h-96 bg-gray-300 rounded-xl"></div>
              <div className="flex gap-2 overflow-x-auto">
                {Array.from({ length: 4 }).map((_, i) => (
                  <div key={i} className="w-16 h-16 rounded-lg bg-gray-300 flex-shrink-0"></div>
                ))}
              </div>
            </div>

            {/* العمود الأيسر - المعلومات */}
            <div className="space-y-6">
              <div className="h-6 w-32 bg-gray-300 rounded-full"></div>
              <div className="h-10 w-3/4 bg-gray-300 rounded-full"></div>
              <div className="h-6 w-1/4 bg-gray-300 rounded-full"></div>
              <div className="h-8 w-32 bg-gray-300 rounded-full"></div>
              <div className="h-4 w-full bg-gray-300 rounded-lg"></div>
              <div className="h-4 w-full bg-gray-300 rounded-lg"></div>
              <div className="h-4 w-5/6 bg-gray-300 rounded-lg"></div>
              <div className="flex gap-3">
                {Array.from({ length: 3 }).map((_, i) => (
                  <div key={i} className="w-20 h-10 bg-gray-300 rounded-lg"></div>
                ))}
              </div>
              <div className="h-12 w-full bg-gray-300 rounded-lg"></div>
              <div className="h-20 w-full bg-gray-300 rounded-lg"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8 flex justify-center items-center h-64">
          <div className="text-red-500 text-lg">{error || 'المنتج غير موجود'}</div>
        </div>
      </div>
    );
  }

  const availableStock = getAvailableStock();
  const displayPrice = product.oldPrice && product.oldPrice > product.price ? product.oldPrice : null;
  
  const allImages = [product.image];
  if (product.colors && product.colors.length > 0) {
    product.colors.forEach(color => {
      if (color.image && !allImages.includes(color.image)) {
        allImages.push(color.image);
      }
    });
  }

  const getCurrentColorName = () => {
    if (selectedColor) {
      return selectedColor.colorName;
    }
    
    if (product.colors && product.colors.length > 0) {
      const colorForSelectedImage = product.colors.find(color => color.image === selectedImage);
      if (colorForSelectedImage) {
        return colorForSelectedImage.colorName;
      }
    }
    
    return 'أساسي';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <section className="py-8">
        <div className="container mx-auto px-4">
          {/* المنتج الرئيسي */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              
              {/* الجزء الأيمن - الصور */}
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-xl overflow-hidden">
                  <img
                    src={selectedImage}
                    alt={product.name}
                    className="w-full h-80 lg:h-96 object-cover"
                  />
                </div>

                {allImages.length > 1 && (
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {allImages.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => handleImageSelect(image)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg border-2 overflow-hidden transition-all ${
                          selectedImage === image 
                            ? 'border-amber-400 ring-2 ring-amber-200' 
                            : 'border-gray-300 hover:border-amber-400'
                        }`}
                      >
                        <img
                          src={image}
                          alt={`${product.name} ${index + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* الجزء الأيسر - المعلومات */}
              <div className="space-y-6">
                <div>
                  <span className="text-sm text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
                    {product.category?.name}
                  </span>
                  <h1 className="text-3xl font-bold text-gray-800 mt-2">
                    {product.name}
                  </h1>
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">النوع المحدد:</span>
                  <span className="font-bold text-amber-600">
                    {getCurrentColorName()}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <span className="text-3xl font-bold text-green-600">
                    ₪{product.price}
                  </span>
                  {displayPrice && (
                    <>
                      <span className="text-xl text-gray-500 line-through">
                        ₪{displayPrice}
                      </span>
                      {product.discountPercent > 0 && (
                        <span className="text-sm bg-red-500 text-white px-2 py-1 rounded">
                          خصم {product.discountPercent}%
                        </span>
                      )}
                    </>
                  )}
                </div>

                <div className="flex items-center gap-2 text-sm">
                  <span className="text-gray-600">الكمية المتوفرة:</span>
                  <span className={`font-bold ${
                    availableStock > 10 ? 'text-green-600' : 
                    availableStock > 0 ? 'text-yellow-600' : 'text-red-600'
                  }`}>
                    {availableStock}
                  </span>
                </div>

                <div className="text-gray-700 leading-relaxed">
                  <h3 className="font-semibold text-lg mb-2">الوصف:</h3>
                  <p className="text-gray-600">{product.description}</p>
                </div>

                {product.colors && product.colors.length > 0 && (
                  <div className="space-y-3">
                    <h3 className="font-semibold text-lg">الألوان المتاحة:</h3>
                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={() => {
                          setSelectedColor(null);
                          setSelectedImage(product.image);
                          setQuantity(1);
                        }}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                          !selectedColor && selectedImage === product.image
                            ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200'
                            : 'border-gray-300 hover:border-amber-400'
                        }`}
                      >
                        <img
                          src={product.image}
                          alt="أساسي"
                          className="w-8 h-8 rounded-full object-cover"
                        />
                        <span className="text-sm">أساسي</span>
                        <span className="text-xs text-gray-500">({product.stock})</span>
                      </button>

                      {product.colors.map((color, index) => (
                        <button
                          key={index}
                          onClick={() => handleColorSelect(color)}
                          className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 transition-all ${
                            selectedColor?.colorName === color.colorName
                              ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200'
                              : 'border-gray-300 hover:border-amber-400'
                          }`}
                        >
                          {color.image ? (
                            <img
                              src={color.image}
                              alt={color.colorName}
                              className="w-8 h-8 rounded-full object-cover"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs">
                              {color.colorName?.charAt(0) || '?'}
                            </div>
                          )}
                          <span className="text-sm">{color.colorName}</span>
                          <span className="text-xs text-gray-500">({color.stock})</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-3">
                  <h3 className="font-semibold text-lg">الكمية:</h3>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleQuantityChange(quantity - 1)}
                      disabled={quantity <= 1}
                      className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                    >
                      -
                    </button>
                    <span className="text-lg font-semibold w-12 text-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => handleQuantityChange(quantity + 1)}
                      disabled={quantity >= availableStock}
                      className="w-10 h-10 bg-gray-200 rounded-lg flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
                    >
                      +
                    </button>
                  </div>
                  
                  {quantity > availableStock && (
                    <p className="text-red-500 text-sm bg-red-50 px-3 py-2 rounded border border-red-200">
                      ⚠️ الكمية المطلوبة تتجاوز المخزون المتاح
                    </p>
                  )}
                </div>

                <button
                  onClick={handleAddToCart}
                  disabled={availableStock <= 0 || quantity > availableStock}
                  className={`w-full py-4 rounded-lg text-lg font-semibold transition-all flex items-center justify-center gap-2 ${
                    availableStock <= 0 || quantity > availableStock
                      ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                      : 'bg-gradient-to-r from-rose-400 to-rose-500 text-white shadow-lg hover:from-rose-500 hover:to-rose-700 hover:shadow-xl transform hover:scale-105'
                  }`}
                >
                  {availableStock <= 0 ? (
                    'غير متوفر'
                  ) : quantity > availableStock ? (
                    'تجاوز المخزون'
                  ) : (
                    <>
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                      أضف إلى السلة - ₪{(product.price * quantity).toFixed(2)}
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>

          {/* قسم المنتجات المشابهة */}
          {relatedProducts.length > 0 && (
            <div className="bg-white rounded-2xl shadow-lg p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                  <svg className="w-6 h-6 text-rose-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  منتجات مشابهة
                </h2>
                <Link 
                  href={`/categories/${product.category?._id}`}
                  className="text-rose-500 hover:text-rose-600 font-medium flex items-center gap-1 transition-colors"
                >
                  عرض الكل
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </Link>
              </div>

              {relatedLoading ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <div key={i} className="animate-pulse">
                      <div className="bg-gray-300 rounded-xl h-48 mb-3"></div>
                      <div className="h-4 bg-gray-300 rounded mb-2"></div>
                      <div className="h-6 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                  {relatedProducts.map((relatedProduct) => (
                    <div key={relatedProduct._id} className="group bg-gray-50 rounded-xl overflow-hidden hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-rose-200">
                      <Link href={`/products/${relatedProduct._id}`}>
                        <div className="relative overflow-hidden">
                          <img
                            src={relatedProduct.image}
                            alt={relatedProduct.name}
                            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                          />
                          <div className="absolute top-2 left-2 bg-rose-500 text-white px-2 py-1 rounded text-xs">
                            {relatedProduct.stock > 0 ? 'متوفر' : 'غير متوفر'}
                          </div>
                        </div>
                      </Link>
                      
                      <div className="p-4">
                        <Link href={`/products/${relatedProduct._id}`}>
                          <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-rose-600 transition-colors line-clamp-2">
                            {relatedProduct.name}
                          </h3>
                        </Link>
                        
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-bold text-green-600">
                            ₪{relatedProduct.price}
                          </span>
                          {relatedProduct.oldPrice && relatedProduct.oldPrice > relatedProduct.price && (
                            <span className="text-sm text-gray-500 line-through">
                              ₪{relatedProduct.oldPrice}
                            </span>
                          )}
                        </div>

                        <button
                          onClick={() => handleAddRelatedToCart(relatedProduct)}
                          disabled={relatedProduct.stock <= 0}
                          className={`w-full py-2 rounded-lg font-medium transition-all flex items-center justify-center gap-2 ${
                            relatedProduct.stock <= 0
                              ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                              : 'bg-rose-500 text-white hover:bg-rose-600'
                          }`}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                          </svg>
                          أضف للسلة
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}