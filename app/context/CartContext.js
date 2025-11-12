// "use client";
// import { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // ✅ تحميل من localStorage
//   useEffect(() => {
//     const savedCart = localStorage.getItem('amal-store-cart');
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   // ✅ حفظ في localStorage عند أي تغيير
//   useEffect(() => {
//     localStorage.setItem('amal-store-cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // ✅ إضافة منتج للسلة
//   const addToCart = (product, selectedColor = null, selectedImage = null) => {
//     const cartItem = {
//       id: `${product._id}-${selectedColor?.colorName || 'main'}`,
//       productId: product._id,
//       name: product.name,
//       price: product.price,
//       image: selectedImage || product.image,
//       color: selectedColor,
//       quantity: 1,
//       stock: selectedColor ? selectedColor.stock : product.stock,
//       maxStock: selectedColor ? selectedColor.stock : product.stock
//     };

//     setCartItems(prev => {
//       const existingItem = prev.find(item => item.id === cartItem.id);
//       if (existingItem) {
//         return prev.map(item =>
//           item.id === cartItem.id
//             ? { ...item, quantity: Math.min(item.quantity + 1, item.maxStock) }
//             : item
//         );
//       }
//       return [...prev, cartItem];
//     });
//   };

//   // ✅ تحديث الكمية
//   const updateQuantity = (itemId, newQuantity) => {
//     if (newQuantity < 1) return;
    
//     setCartItems(prev =>
//       prev.map(item => {
//         if (item.id === itemId) {
//           return { ...item, quantity: Math.min(newQuantity, item.maxStock) };
//         }
//         return item;
//       })
//     );
//   };

//   // ✅ حذف منتج
//   const removeFromCart = (itemId) => {
//     setCartItems(prev => prev.filter(item => item.id !== itemId));
//   };

//   // ✅ المجموع الكلي
//   const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   // ✅ عدد المنتجات الكلي
//   const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <CartContext.Provider value={{
//       cartItems,
//       addToCart,
//       updateQuantity,
//       removeFromCart,
//       totalPrice,
//       totalItems,
//       isCartOpen,
//       setIsCartOpen
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within CartProvider');
//   }
//   return context;
// };
// "use client";
// import { createContext, useContext, useState, useEffect } from 'react';

// const CartContext = createContext();

// export function CartProvider({ children }) {
//   const [cartItems, setCartItems] = useState([]);
//   const [isCartOpen, setIsCartOpen] = useState(false);

//   // ✅ تحميل من localStorage
//   useEffect(() => {
//     const savedCart = localStorage.getItem('amal-store-cart');
//     if (savedCart) {
//       setCartItems(JSON.parse(savedCart));
//     }
//   }, []);

//   // ✅ حفظ في localStorage عند أي تغيير
//   useEffect(() => {
//     localStorage.setItem('amal-store-cart', JSON.stringify(cartItems));
//   }, [cartItems]);

//   // ✅ إضافة منتج للسلة مع التحقق من الكمية
//   const addToCart = (product, selectedColor = null, selectedImage = null) => {
//     const itemId = `${product._id}-${selectedColor?.colorName || 'main'}`;
//     const availableStock = selectedColor ? selectedColor.stock : product.stock;

//     setCartItems(prev => {
//       const existingItem = prev.find(item => item.id === itemId);
      
//       if (existingItem) {
//         // إذا المنتج موجود مسبقاً
//         const newQuantity = Math.min(existingItem.quantity + 1, availableStock);
        
//         if (newQuantity === existingItem.quantity) {
//           // إذا الكمية ما تغيرت (وصلت للحد الأقصى)
//           return prev;
//         }
        
//         return prev.map(item =>
//           item.id === itemId
//             ? { 
//                 ...item, 
//                 quantity: newQuantity,
//                 maxStock: availableStock // نحدث الـ maxStock دائماً
//               }
//             : item
//         );
//       } else {
//         // إذا المنتج جديد
//         if (availableStock <= 0) {
//           // إذا الكمية 0، ما نضيف
//           return prev;
//         }
        
//         const cartItem = {
//           id: itemId,
//           productId: product._id,
//           name: product.name,
//           price: product.price,
//           image: selectedImage || product.image,
//           color: selectedColor,
//           quantity: 1,
//           stock: availableStock,
//           maxStock: availableStock
//         };
        
//         return [...prev, cartItem];
//       }
//     });
//   };

//   // ✅ تحديث الكمية مع التحقق
//   const updateQuantity = (itemId, newQuantity) => {
//     if (newQuantity < 1) {
//       // إذا الكمية 0، نحذف المنتج
//       removeFromCart(itemId);
//       return;
//     }
    
//     setCartItems(prev =>
//       prev.map(item => {
//         if (item.id === itemId) {
//           const finalQuantity = Math.min(newQuantity, item.maxStock);
//           return { ...item, quantity: finalQuantity };
//         }
//         return item;
//       })
//     );
//   };

//   // ✅ حذف منتج
//   const removeFromCart = (itemId) => {
//     setCartItems(prev => prev.filter(item => item.id !== itemId));
//   };

//   // ✅ تنظيف السلة
//   const clearCart = () => {
//     setCartItems([]);
//   };

//   // ✅ المجموع الكلي
//   const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

//   // ✅ عدد المنتجات الكلي
//   const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

//   return (
//     <CartContext.Provider value={{
//       cartItems,
//       addToCart,
//       updateQuantity,
//       removeFromCart,
//       clearCart,
//       totalPrice,
//       totalItems,
//       isCartOpen,
//       setIsCartOpen
//     }}>
//       {children}
//     </CartContext.Provider>
//   );
// }

// export const useCart = () => {
//   const context = useContext(CartContext);
//   if (!context) {
//     throw new Error('useCart must be used within CartProvider');
//   }
//   return context;
// };


"use client";
import { createContext, useContext, useState, useEffect } from 'react';

const CartContext = createContext();

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // ✅ تحميل من localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('amal-store-cart');
    if (savedCart) {
      setCartItems(JSON.parse(savedCart));
    }
  }, []);

  // ✅ حفظ في localStorage عند أي تغيير
  useEffect(() => {
    localStorage.setItem('amal-store-cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ دالة مساعدة لجلب أحدث بيانات المنتج
  const fetchLatestProductData = async (productId) => {
    try {
      const res = await fetch(`/api/products/${productId}`);
      const data = await res.json();
      if (data.success) {
        return data.product;
      }
    } catch (error) {
      console.error('Error fetching latest product data:', error);
    }
    return null;
  };

  // ✅ إضافة منتج للسلة مع التحقق من الكمية
  const addToCart = async (product, selectedColor = null, selectedImage = null) => {
    const itemId = `${product._id}-${selectedColor?.colorName || 'main'}`;
    const availableStock = selectedColor ? selectedColor.stock : product.stock;

    setCartItems(prev => {
      const existingItem = prev.find(item => item.id === itemId);
      
      if (existingItem) {
        // إذا المنتج موجود مسبقاً
        const newQuantity = Math.min(existingItem.quantity + 1, availableStock);
        
        if (newQuantity === existingItem.quantity) {
          // إذا الكمية ما تغيرت (وصلت للحد الأقصى)
          return prev;
        }
        
        return prev.map(item =>
          item.id === itemId
            ? { 
                ...item, 
                quantity: newQuantity,
                maxStock: availableStock, // نحدث الـ maxStock دائماً
                stock: availableStock // نحدث stock أيضاً
              }
            : item
        );
      } else {
        // إذا المنتج جديد
        if (availableStock <= 0) {
          // إذا الكمية 0، ما نضيف
          return prev;
        }
        
        const cartItem = {
          id: itemId,
          productId: product._id,
          name: product.name,
          price: product.price,
          image: selectedImage || product.image,
          color: selectedColor,
          quantity: 1,
          stock: availableStock,
          maxStock: availableStock
        };
        
        return [...prev, cartItem];
      }
    });
  };

  // ✅ تحديث الكمية مع التحقق والتحديث من السيرفر
  const updateQuantity = async (itemId, newQuantity) => {
    if (newQuantity < 1) {
      // إذا الكمية 0، نحذف المنتج
      removeFromCart(itemId);
      return;
    }

    // نبحث عن المنتج في السلة
    const existingItem = cartItems.find(item => item.id === itemId);
    if (!existingItem) return;

    try {
      // نجلب أحدث بيانات المنتج من السيرفر
      const latestProduct = await fetchLatestProductData(existingItem.productId);
      if (!latestProduct) return;

      // نحسب المخزون المتاح بناءً على اللون المحدد
      let availableStock = latestProduct.stock;
      if (existingItem.color && latestProduct.colors) {
        const colorData = latestProduct.colors.find(
          color => color.colorName === existingItem.color.colorName
        );
        if (colorData) {
          availableStock = colorData.stock;
        }
      }

      // نحدد الكمية النهائية
      const finalQuantity = Math.min(newQuantity, availableStock);

      setCartItems(prev =>
        prev.map(item => {
          if (item.id === itemId) {
            return { 
              ...item, 
              quantity: finalQuantity,
              maxStock: availableStock,
              stock: availableStock
            };
          }
          return item;
        })
      );
    } catch (error) {
      console.error('Error updating quantity:', error);
      // إذا فشل الاتصال بالسيرفر، نستخدم البيانات المحلية
      setCartItems(prev =>
        prev.map(item => {
          if (item.id === itemId) {
            const finalQuantity = Math.min(newQuantity, item.maxStock);
            return { ...item, quantity: finalQuantity };
          }
          return item;
        })
      );
    }
  };

  // ✅ تحديث كل عناصر السلة ببيانات حديثة
  const refreshCartItems = async () => {
    try {
      const updatedItems = await Promise.all(
        cartItems.map(async (item) => {
          const latestProduct = await fetchLatestProductData(item.productId);
          if (!latestProduct) return item;

          let availableStock = latestProduct.stock;
          if (item.color && latestProduct.colors) {
            const colorData = latestProduct.colors.find(
              color => color.colorName === item.color.colorName
            );
            if (colorData) {
              availableStock = colorData.stock;
            }
          }

          return {
            ...item,
            maxStock: availableStock,
            stock: availableStock,
            // إذا الكمية الحالية أكثر من المخزون المتاح، نضبطها للمخزون
            quantity: Math.min(item.quantity, availableStock)
          };
        })
      );

      setCartItems(updatedItems);
    } catch (error) {
      console.error('Error refreshing cart:', error);
    }
  };

  // ✅ حذف منتج
  const removeFromCart = (itemId) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };

  // ✅ تنظيف السلة
  const clearCart = () => {
    setCartItems([]);
  };

  // ✅ المجموع الكلي
  const totalPrice = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  // ✅ عدد المنتجات الكلي
  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
const addToCartWithQuantity = (product, selectedColor = null, selectedImage = null, quantity = 1) => {
  const itemId = `${product._id}-${selectedColor?.colorName || 'main'}`;
  const availableStock = selectedColor ? selectedColor.stock : product.stock;

  // إذا الكمية المطلوبة أكثر من المخزون، نضبطها للمخزون
  const finalQuantity = Math.min(quantity, availableStock);

  if (finalQuantity <= 0) {
    // إذا الكمية 0، ما نضيف
    return;
  }

  setCartItems(prev => {
    const existingItem = prev.find(item => item.id === itemId);
    
    if (existingItem) {
      // إذا المنتج موجود مسبقاً، نضيف الكمية الجديدة مع التحقق من عدم تجاوز المخزون
      const newQuantity = Math.min(existingItem.quantity + finalQuantity, availableStock);
      
      return prev.map(item =>
        item.id === itemId
          ? { 
              ...item, 
              quantity: newQuantity,
              maxStock: availableStock,
              stock: availableStock
            }
          : item
      );
    } else {
      // إذا المنتج جديد
      const cartItem = {
        id: itemId,
        productId: product._id,
        name: product.name,
        price: product.price,
        image: selectedImage || product.image,
        color: selectedColor,
        quantity: finalQuantity, // نستخدم الكمية المحددة
        stock: availableStock,
        maxStock: availableStock
      };
      
      return [...prev, cartItem];
    }
  });
};
  return (
    <CartContext.Provider value={{
     cartItems,
    addToCart, // الدالة القديمة (تضيف 1 فقط)
    addToCartWithQuantity, // الدالة الجديدة (تضيف كمية محددة)
    updateQuantity,
    removeFromCart,
    clearCart,
    refreshCartItems,
    totalPrice,
    totalItems,
    isCartOpen,
    setIsCartOpen
    }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};