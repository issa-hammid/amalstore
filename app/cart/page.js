
"use client";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import Header from "../components/Header";
import Link from "next/link";

// دالة تحديث المخزون في الداتابيز
const updateProductStock = async (cartItems) => {
  try {
    const stockUpdateData = {
      products: cartItems.map(item => ({
        productId: item.productId || item.id.split('-')[0],
        quantity: item.quantity,
        colorName: item.color?.colorName || null
      }))
    };

    const response = await fetch('/api/products/update-stock', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(stockUpdateData)
    });

    const result = await response.json();

    if (!response.ok) {
      throw new Error(result.error || 'Failed to update stock');
    }

    return result;
    
  } catch (error) {
    console.error('❌ Error updating product stock:', error);
    throw error;
  }
};

// دالة جلب التصنيفات لجميع منتجات الكارت
const fetchCartCategories = async (cartItems) => {
  try {
    const productIds = cartItems.map(item => item.productId || item.id.split('-')[0]);
    
    const response = await fetch('/api/cart/categories', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ productIds })
    });

    if (!response.ok) {
      throw new Error(`فشل في جلب التصنيفات: ${response.status}`);
    }

    const result = await response.json();
    
    if (result.success) {
      return result.categories;
    } else {
      throw new Error(result.error || 'خطأ في البيانات');
    }
    
  } catch (error) {
    console.error('❌ خطأ في جلب التصنيفات:', error);
    
    // إرجاع تصنيفات افتراضية في حالة الخطأ
    const defaultCategories = {};
    cartItems.forEach(item => {
      defaultCategories[item.id] = 'منتجات متنوعة';
    });
    return defaultCategories;
  }
};

const sendTelegramNotification = async (orderData) => {
  try {
    const chatId = "5485520710" // استخدم متغيرات البيئة
    const botToken = "8284131441:AAGHKywsX0WyfZFpnUml4ywtkjL4pfQeo6E"
    
    let whatsappLink = '';
    if (orderData.customer.whatsapp) {
      let cleanNumber = orderData.customer.whatsapp.replace(/\s+/g, '');
      
      // حل شامل لجميع الأشكال
      if (cleanNumber.startsWith('+')) {
        // إذا بدأ بـ + نزيله فقط
        cleanNumber = cleanNumber.substring(1);
      } else if (cleanNumber.startsWith('00')) {
        // إذا بدأ بـ 00 نزيلهم
        cleanNumber = cleanNumber.substring(2);
      }
      
      // التأكد من أن الرقم يبدأ بـ 972 فقط (للفلسطينية)
      if (cleanNumber.startsWith('970')) {
        // إذا كان 970 نحوله لـ 972
        cleanNumber = '972' + cleanNumber.substring(3);
      } else if (cleanNumber.startsWith('0')) {
        // إذا بدأ بـ 0 (مثل 0568803133) نستبدله بـ 972
        cleanNumber = '972' + cleanNumber.substring(1);
      } else if (!cleanNumber.startsWith('972')) {
        // إذا لم يبدأ بـ 972 ولا صفر ولا + نضيف 972 افتراضيًا
        cleanNumber = '972' + cleanNumber;
      }
      
      // التأكد من أن الرقم يحتوي على أرقام فقط
      cleanNumber = cleanNumber.replace(/\D/g, '');
      
      whatsappLink = `💬 *راسل على واتساب:* https://wa.me/${cleanNumber}`;
    }
    
    const message = `
🛍️ *طلب جديد من Amal Store*

👤 *العميل:* ${orderData.customer.name}
📞 *الجوال:* ${orderData.customer.phone}
${orderData.customer.whatsapp ? `📱 *الواتساب:* ${orderData.customer.whatsapp}` : ''}
📍 *العنوان:* ${orderData.customer.address}
${orderData.customer.notes ? `📝 *ملاحظات:* ${orderData.customer.notes}` : ''}

💳 *طريقة الدفع:* ${orderData.paymentMethod === 'cash' ? 'نقدي عند الاستلام' : 
                   orderData.paymentMethod === 'mobile_transfer' ? 'تحويل عبر الجوال' : 
                   'تحويل بنكي'}

${orderData.paymentMethod !== 'cash' ? `
🏦 *معلومات التحويل:*
${orderData.paymentMethod === 'mobile_transfer' ? 
  `📱 رقم الجوال: 0592543708` : 
  `📋 رقم IBAN: PS17PALS045230526340993100000`}
` : ''}

🛒 *المنتجات:*
${orderData.items.map(item => `• ${item.name} ${item.color ? `(${item.color.colorName})` : ''} ×${item.quantity} - ₪${(item.price * item.quantity).toFixed(2)} ${item.categoryName ? `[${item.categoryName}]` : ''}`).join('\n')}

${orderData.items.some(item => item.categoryName && item.categoryName !== 'منتجات متنوعة') ? `
📊 *ملخص التصنيفات:*
${Object.entries(
  orderData.items.reduce((acc, item) => {
    const category = item.categoryName || 'منتجات متنوعة';
    acc[category] = (acc[category] || 0) + item.quantity;
    return acc;
  }, {})
).map(([category, count]) => `• ${category}: ${count} منتج`).join('\n')}
` : ''}

💰 *المجموع:* ₪${orderData.total.toFixed(2)}
⏰ *الوقت:* ${new Date().toLocaleString('ar-EG')}

📞 *اتصل الآن:* ${orderData.customer.phone}
${whatsappLink}`.trim();

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
    
    if (!result.ok) {
      throw new Error(result.description || 'Failed to send message');
    }
    
    return result;
    
  } catch (error) {
    console.error('Error sending Telegram notification:', error);
    throw error;
  }
};

// دالة نسخ النص
const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text).then(() => {
    alert('تم نسخ النص إلى الحافظة');
  }).catch(err => {
    console.error('Failed to copy text: ', err);
  });
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

  const [paymentMethod, setPaymentMethod] = useState("cash");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderSuccess, setOrderSuccess] = useState(false);
  const [productCategories, setProductCategories] = useState({});

  // جلب التصنيفات عند تغيير الكارت
  useEffect(() => {
    if (cartItems.length > 0) {
      fetchCartCategories(cartItems).then(categories => {
        setProductCategories(categories);
      });
    } else {
      setProductCategories({});
    }
  }, [cartItems]);

  const handleInputChange = (e) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // 1. التحقق من البيانات
      if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
        alert('يرجى ملء جميع الحقول المطلوبة (الاسم، الجوال، العنوان)');
        return;
      }

      if (cartItems.length === 0) {
        alert('السلة فارغة');
        return;
      }

      // 2. إضافة التصنيفات لمنتجات الكارت
      const cartItemsWithCategories = cartItems.map((item) => ({
        ...item,
        categoryName: productCategories[item.id] || 'منتجات متنوعة'
      }));

      // 3. إنشاء بيانات الطلب
      const orderData = {
        customer: customerInfo,
        items: cartItemsWithCategories,
        total: totalPrice,
        paymentMethod: paymentMethod,
        orderDate: new Date().toISOString(),
        status: 'pending'
      };

      // 4. تحديث المخزون في الداتابيز
      await updateProductStock(cartItems);

      // 5. إرسال إشعار التيليجرام
      await sendTelegramNotification(orderData);
      
      // 6. حفظ الطلب في localStorage
      const existingOrders = JSON.parse(localStorage.getItem('amal-store-orders') || '[]');
      const newOrder = {
        id: Date.now().toString(),
        ...orderData
      };
      localStorage.setItem('amal-store-orders', JSON.stringify([...existingOrders, newOrder]));

      // 7. إظهار نجاح الطلب وتفريغ السلة
      setOrderSuccess(true);
      clearCart();
      
      // 8. إعادة تعيين النموذج
      setCustomerInfo({
        name: '',
        phone: '',
        whatsapp: '',
        address: '',
        notes: ''
      });
      setPaymentMethod('cash');

    } catch (error) {
      console.error(' Error submitting order:', error);
      
      if (error.message.includes('الكمية غير كافية')) {
        alert('عذراً، بعض المنتجات لم تعد متوفرة بالكمية المطلوبة. يرجى تحديث السلة والمحاولة مرة أخرى.');
      } else {
        alert('تم تقديم الطلب ولكن حدث خطأ. سيتم التواصل معك قريباً.');
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
              <div className="text-6xl mb-4">🎉</div>
              <h1 className="text-2xl sm:text-3xl font-bold text-green-600 mb-4">
                تم تقديم طلبك بنجاح!
              </h1>
              <p className="text-gray-600 mb-6 text-sm sm:text-base">
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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl sm:text-3xl font-bold text-amber-500 mb-2 text-center">
            طلباتك
          </h1>
          <p className="text-gray-600 text-center mb-6 sm:mb-8 text-sm sm:text-base">
            راجع منتجاتك وأكمل معلومات التوصيل
          </p>

          {cartItems.length === 0 ? (
            <div className="bg-white rounded-2xl shadow-lg p-6 text-center">
              <div className="text-6xl mb-4">🛒</div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-700 mb-4">
                سلة التسوق فارغة
              </h2>
              <p className="text-gray-500 mb-6 text-sm sm:text-base">
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
              {/* الجزء الأيسر - المنتجات */}
              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-3 sm:mb-4">
                    المنتجات المختارة
                  </h2>

                  <div className="space-y-3 sm:space-y-4">
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

                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-gray-800 text-sm line-clamp-2">
                            {item.name}
                          </h3>

                          {item.color && (
                            <p className="text-xs text-gray-600 mt-1">
                              اللون: {item.color.colorName}
                            </p>
                          )}

                          {/* عرض التصنيف الحقيقي */}
                          {productCategories[item.id] && (
                            <p className="text-xs text-amber-600 bg-amber-50 px-2 py-1 rounded-full inline-block mt-1 border border-amber-200">
                               {productCategories[item.id]}
                            </p>
                          )}

                          <p className="text-green-600 font-bold mt-1 text-sm sm:text-base">
                            ₪{item.price}
                          </p>

                          {/* Quantity Controls */}
                          <div className="flex items-center gap-2 mt-2 sm:mt-3">
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

                          {item.quantity >= item.maxStock && (
                            <p className="text-red-500 text-xs mt-2 bg-red-50 px-2 py-1 rounded border border-red-200 leading-tight">
                              ⚠️ نفذت الكمية
                            </p>
                          )}

                          <div className="sm:hidden mt-2">
                            <p className="text-green-600 font-bold text-sm">
                              المجموع: ₪{(item.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>

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

              <div className="space-y-4 sm:space-y-6">
                <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6">
                  <h2 className="text-lg sm:text-xl font-bold text-amber-500 mb-3 sm:mb-4">
                    معلومات التوصيل
                  </h2>

                  <form
                    onSubmit={handleSubmitOrder}
                    className="space-y-3 sm:space-y-4"
                  >
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
                        style={{outline:"none"}}
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
                        style={{outline:"none"}}
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
                        style={{outline:"none"}}
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
                        style={{outline:"none"}}
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
                        style={{outline:"none"}}
                      />
                    </div>

                    {/* قسم طريقة الدفع */}
                    <div className="border-t pt-4 mt-4">
                      <h3 className="text-lg font-bold text-amber-500 mb-3">
                        طريقة الدفع
                      </h3>
                      
                      <div className="space-y-3">
                        <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-amber-400 hover:bg-amber-50 transition-all cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="cash"
                            checked={paymentMethod === "cash"}
                            onChange={() => handlePaymentMethodChange("cash")}
                            className="text-amber-500 focus:ring-amber-500"
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">💵</span>
                            <div>
                              <p className="font-medium text-gray-800">الدفع نقداً عند الاستلام</p>
                              <p className="text-sm text-gray-600">ادفع عند استلام الطلب</p>
                            </div>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-amber-400 hover:bg-amber-50 transition-all cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="mobile_transfer"
                            checked={paymentMethod === "mobile_transfer"}
                            onChange={() => handlePaymentMethodChange("mobile_transfer")}
                            className="text-amber-500 focus:ring-amber-500"
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">📱</span>
                            <div>
                              <p className="font-medium text-gray-800">تحويل عبر الجوال</p>
                              <p className="text-sm text-gray-600">تحويل مباشر عبر رقم الجوال</p>
                            </div>
                          </div>
                        </label>

                        <label className="flex items-center gap-3 p-3 border border-gray-300 rounded-lg hover:border-amber-400 hover:bg-amber-50 transition-all cursor-pointer">
                          <input
                            type="radio"
                            name="paymentMethod"
                            value="bank_transfer"
                            checked={paymentMethod === "bank_transfer"}
                            onChange={() => handlePaymentMethodChange("bank_transfer")}
                            className="text-amber-500 focus:ring-amber-500"
                          />
                          <div className="flex items-center gap-2">
                            <span className="text-2xl">🏦</span>
                            <div>
                              <p className="font-medium text-gray-800">تحويل بنكي</p>
                              <p className="text-sm text-gray-600">تحويل عبر رقم IBAN</p>
                            </div>
                          </div>
                        </label>
                      </div>

                      {paymentMethod !== "cash" && (
                        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-lg">
                          <h4 className="font-bold text-amber-700 mb-2">
                            {paymentMethod === "mobile_transfer" 
                              ? "معلومات التحويل عبر الجوال" 
                              : "معلومات التحويل البنكي"}
                          </h4>
                          
                          {paymentMethod === "mobile_transfer" ? (
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-700">رقم الجوال:</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-amber-600">0592543708</span>
                                  <button
                                    type="button"
                                    onClick={() => copyToClipboard("0592543708")}
                                    className="text-amber-500 hover:text-amber-700 text-sm bg-white px-2 py-1 rounded border border-amber-300"
                                  >
                                    نسخ
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-amber-600 mt-2">
                                ✅ سيتم تأكيد الطلب بعد التحويل
                              </p>
                            </div>
                          ) : (
                            <div className="space-y-2">
                              <div className="flex justify-between items-center">
                                <span className="text-gray-700">رقم IBAN:</span>
                                <div className="flex items-center gap-2">
                                  <span className="font-mono text-amber-600 text-sm">PS17PALS045230526340993100000</span>
                                  <button
                                    type="button"
                                    onClick={() => copyToClipboard("PS17PALS045230526340993100000")}
                                    className="text-amber-500 hover:text-amber-700 text-sm bg-white px-2 py-1 rounded border border-amber-300"
                                  >
                                    نسخ
                                  </button>
                                </div>
                              </div>
                              <p className="text-sm text-amber-600 mt-2">
                                ✅ سيتم تأكيد الطلب بعد التحويل
                              </p>
                            </div>
                          )}
                        </div>
                      )}
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

                <div className="bg-amber-50 border border-amber-200 rounded-2xl p-3 sm:p-4">
                  <div className="flex items-start gap-2 sm:gap-3">
                    <div className="text-amber-500 text-base sm:text-lg">ℹ️</div>
                    <div className="text-xs sm:text-sm text-amber-600">
                      <p className="font-semibold mb-1">معلومات مهمة:</p>
                      <ul className="list-disc list-inside space-y-1">
                        <li>سيتم التواصل معك خلال دقائق</li>
                        <li>يتم تحديد رسوم التوصيل عند مراسلتكم لتأكيد الطلب</li>
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
