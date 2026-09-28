
"use client";
import { useState, useEffect } from "react";
import { notify } from '../../lib/notifications';
import { useRouter } from 'next/navigation';

export default function AddProductPage() {
  const router = useRouter();
  
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);

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

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: null,
    price: "",
    oldPrice: "",
    discountPercent: "",
    isFeatured: false,
    stock: "",
    category: "",
    colors: [{ colorName: "", image: null, stock: "" }],
  });

  const [categories, setCategories] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [imagePreviews, setImagePreviews] = useState({
    main: null,
    colors: [],
  });

  // 🟢 دالة حساب نسبة الخصم التلقائية
  const calculateDiscountPercent = (price, oldPrice) => {
    if (!price || !oldPrice || parseFloat(oldPrice) <= 0 || parseFloat(price) <= 0) {
      return "";
    }
    
    const currentPrice = parseFloat(price);
    const previousPrice = parseFloat(oldPrice);
    
    if (currentPrice >= previousPrice) {
      return "";
    }
    
    const discount = ((previousPrice - currentPrice) / previousPrice) * 100;
    return Math.round(discount); // تقريب لأقرب رقم صحيح
  };

  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (res.ok) setCategories(data.categories);
      } catch (err) {
        console.error("خطأ في الاتصال:", err);
      }
    };
    fetchCategories();
  }, [isAuthenticated]);

  const handleImagePreview = (file, type, index = null) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      if (type === 'main') {
        setImagePreviews(prev => ({ ...prev, main: reader.result }));
      } else if (type === 'color' && index !== null) {
        const newColors = [...imagePreviews.colors];
        newColors[index] = reader.result;
        setImagePreviews(prev => ({ ...prev, colors: newColors }));
      }
    };
    reader.readAsDataURL(file);
  };

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    
    if (type === "file" && files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      if (name === "image") {
        handleImagePreview(files[0], 'main');
      }
    } else {
      const updatedFormData = { ...formData, [name]: type === "checkbox" ? checked : value };
      
      if (name === "price" || name === "oldPrice") {
        const price = name === "price" ? value : formData.price;
        const oldPrice = name === "oldPrice" ? value : formData.oldPrice;
        const discountPercent = calculateDiscountPercent(price, oldPrice);
        
        updatedFormData.discountPercent = discountPercent;
      }
      
      setFormData(updatedFormData);
    }
  };

  // 🟢 تغيير بيانات اللون
  const handleColorChange = (index, field, value, files) => {
    const newColors = [...formData.colors];
    if (field === "image" && files && files[0]) {
      newColors[index][field] = files[0];
      handleImagePreview(files[0], 'color', index);
    } else {
      newColors[index][field] = value;
    }

    let updatedStock = formData.stock;
    if (field === "stock") {
      const anyStock = newColors.some(c => c.stock !== "" && !isNaN(Number(c.stock)));
      if (anyStock) {
        const totalStock = newColors.reduce((sum, c) => sum + (Number(c.stock) || 0), 0);
        updatedStock = totalStock > 0 ? String(totalStock) : "";
      }
    }

    setFormData({ ...formData, colors: newColors, stock: updatedStock });
  };

  // 🟢 إضافة لون جديد
  const addColor = () => {
    setFormData({
      ...formData,
      colors: [...formData.colors, { colorName: "", image: null, stock: "" }],
    });
    setImagePreviews(prev => ({ 
      ...prev, 
      colors: [...prev.colors, null] 
    }));
  };

  // 🟢 إزالة لون
  const removeColor = (index) => {
    const newColors = formData.colors.filter((_, i) => i !== index);
    const newPreviews = imagePreviews.colors.filter((_, i) => i !== index);
    const anyStock = newColors.some(c => c.stock !== "" && !isNaN(Number(c.stock)));
    let updatedStock = formData.stock;
    if (anyStock) {
      const totalStock = newColors.reduce((sum, c) => sum + (Number(c.stock) || 0), 0);
      updatedStock = totalStock > 0 ? String(totalStock) : "";
    }
    setFormData({ ...formData, colors: newColors, stock: updatedStock });
    setImagePreviews(prev => ({ ...prev, colors: newPreviews }));
  };

  // 🟢 عند الإرسال
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setUploading(true);

  //   try {
  //     const fd = new FormData();

  //     // القيم الأساسية
  //     fd.append("name", formData.name);
  //     fd.append("description", formData.description);
  //     fd.append("price", formData.price);
  //     fd.append("oldPrice", formData.oldPrice);
  //     fd.append("discountPercent", formData.discountPercent || ""); // إرسال القيمة المحسوبة
  //     fd.append("isFeatured", formData.isFeatured);
  //     fd.append("stock", formData.stock);
  //     fd.append("category", formData.category);
  //     fd.append("image", formData.image);

  //     // الألوان (كل لون له مجموعة قيم)
  //     formData.colors.forEach((color, index) => {
  //       fd.append(`colors[${index}][colorName]`, color.colorName);
  //       fd.append(`colors[${index}][stock]`, color.stock);
  //       if (color.image) {
  //         fd.append(`colors[${index}][image]`, color.image);
  //       }
  //     });

  //     const res = await fetch("/api/add-product", {
  //       method: "POST",
  //       body: fd,
  //     });

  //     const data = await res.json();
  //     if (res.ok) {
  //       notify.success(" تم إضافة المنتج بنجاح");
  //       setFormData({
  //         name: "",
  //         description: "",
  //         image: null,
  //         price: "",
  //         oldPrice: "",
  //         discountPercent: "",
  //         isFeatured: false,
  //         stock: "",
  //         category: "",
  //         colors: [{ colorName: "", image: null, stock: "" }],
  //       });
  //       setImagePreviews({
  //         main: null,
  //         colors: [],
  //       });
  //     } else {
  //       notify.error(" خطأ: " + data.error);
  //     }
  //   } catch (error) {
  //     console.error(error);
  //     alert("حدث خطأ أثناء الإرسال");
  //   } finally {
  //     setUploading(false);
  //   }
  // };
  const handleSubmit = async (e) => {
  e.preventDefault();
  setUploading(true);

  try {
    const fd = new FormData();

    // 🟢 أرسل فقط القيم الموجودة
    if (formData.name) fd.append("name", formData.name);
    if (formData.description) fd.append("description", formData.description);
    if (formData.price) fd.append("price", formData.price);
    if (formData.oldPrice) fd.append("oldPrice", formData.oldPrice);
    const colorStockSum = formData.colors.reduce((sum, c) => sum + (Number(c.stock) || 0), 0);
    const effectiveStock = formData.stock || (colorStockSum > 0 ? String(colorStockSum) : "");
    if (effectiveStock) fd.append("stock", effectiveStock);
    if (formData.category) fd.append("category", formData.category);

    fd.append("isFeatured", formData.isFeatured);

    if (formData.image) {
      fd.append("image", formData.image);
    }

    // 🟢 الألوان (بس اللي فيهم قيمة)
    formData.colors.forEach((color, index) => {
      if (color.colorName) {
        fd.append(`colors[${index}][colorName]`, color.colorName);
      }
      if (color.stock) {
        fd.append(`colors[${index}][stock]`, color.stock);
      }
      if (color.image) {
        fd.append(`colors[${index}][image]`, color.image);
      }
    });

    const res = await fetch("/api/add-product", {
      method: "POST",
      body: fd,
    });

    const data = await res.json();

    if (res.ok) {
      notify.success("تم إضافة المنتج بنجاح");
      setFormData({
        name: "",
        description: "",
        image: null,
        price: "",
        oldPrice: "",
        discountPercent: "",
        isFeatured: false,
        stock: "",
        category: "",
        colors: [{ colorName: "", image: null, stock: "" }],
      });
      setImagePreviews({
        main: null,
        colors: [],
      });
    } else {
      notify.error(data.error || "حدث خطأ");
    }
  } catch (err) {
    console.error(err);
    notify.error("خطأ في الإرسال");
  } finally {
    setUploading(false);
  }
};

  // 🔐 عرض شاشة التحميل أثناء التحقق من المصادقة
  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحقق من الصلاحية...</p>
        </div>
      </div>
    );
  }

  // 🔐 إذا لم يتم المصادقة، لا يعرض المحتوى
  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-8">
      {/* زر العودة للوحة التحكم */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-yellow-500">إضافة منتج جديد</h2>
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {/* الاسم والفئة */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-700">اسم المنتج</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="ادخل اسم المنتج"
              className="w-full rounded-lg p-2 bg-yellow-50 border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">الفئة</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg p-2 bg-yellow-50 border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              
            >
              <option value="">اختر الفئة</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* الوصف */}
        <div>
          <label className="block mb-2 text-gray-700">الوصف</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="وصف المنتج"
            className="w-full rounded-lg p-2 bg-yellow-50 border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            rows="3"
            
          />
        </div>

        {/* الأسعار */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-gray-700">السعر الحالي *</label>
            <input
              type="number"
              name="price"
              placeholder="السعر الحالي"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded-lg p-2 bg-yellow-50 border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              
              min="0"
              step="0.01"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-gray-700">السعر القديم</label>
            <input
              type="number"
              name="oldPrice"
              placeholder="السعر القديم"
              value={formData.oldPrice}
              onChange={handleChange}
              className="w-full rounded-lg p-2 bg-yellow-50 border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              min="0"
              step="0.01"
            />
          </div>
          
          <div>
            <label className="block mb-2 text-gray-700">نسبة الخصم %</label>
            <input
              type="number"
              name="discountPercent"
              placeholder="سيتم الحساب تلقائياً"
              value={formData.discountPercent}
              readOnly
              className="w-full rounded-lg p-2 bg-gray-100 border border-gray-300 text-gray-600 cursor-not-allowed"
            />
            {formData.discountPercent && (
              <p className="text-sm text-green-600 mt-1">
                ✅ تم حساب الخصم تلقائياً: {formData.discountPercent}%
              </p>
            )}
          </div>
        </div>

        {/* الكمية والمنتج المميز */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-700">
              الكمية المتاحة الإجمالية <span className="text-gray-400 font-normal text-xs">(تُحسب تلقائياً من مجموع الألوان إذا أدخلتها)</span>
            </label>
            <input
              type="number"
              name="stock"
              placeholder="الكمية في المخزن"
              value={formData.stock}
              onChange={handleChange}
              className="w-full rounded-lg p-2 bg-yellow-50 border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              min="0"
            />
          </div>
          
          <div className="flex items-center gap-3 mt-6">
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
              className="w-4 h-4 text-yellow-500 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label className="text-gray-700 font-medium">هل المنتج مميز؟</label>
          </div>
        </div>

        {/* صورة المنتج الرئيسية */}
        <div>
          <label className="block mb-2 text-gray-700">
            صورة المنتج الرئيسية <span className="text-gray-400 font-normal text-sm">(اختياري - في حال عدم الرفع سيتم اعتماد صور المنتجات الفرعية ليختار الزبون منها)</span>
          </label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            
            className="w-full p-2 bg-yellow-50 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          />
          {imagePreviews.main && (
            <div className="mt-3">
              <p className="text-sm text-green-600 mb-1">✓ معاينة الصورة:</p>
              <img 
                src={imagePreviews.main} 
                alt="معاينة الصورة الرئيسية" 
                className="h-32 w-32 object-cover rounded-lg border-2 border-yellow-500 shadow-md"
              />
            </div>
          )}
          {formData.image && !imagePreviews.main && (
            <p className="text-sm text-gray-500 mt-1">
               تم اختيار الصورة: {formData.image.name}
            </p>
          )}
        </div>

        {/* الألوان */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">المنتج الثانوي</h3>
          {formData.colors.map((color, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <label className="block mb-2 text-sm text-gray-700">اسم اللون او الحجم </label>
                <input
                  placeholder="مثال: أحمر، xl"
                  value={color.colorName}
                  onChange={(e) => handleColorChange(i, "colorName", e.target.value)}
                  className="w-full rounded-lg p-2 bg-white border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm text-gray-700">صورة المنتج الثانوي</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleColorChange(i, "image", null, e.target.files)}
                  className="w-full rounded-lg p-2 bg-white border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
                {imagePreviews.colors[i] && (
                  <div className="mt-2">
                    <img 
                      src={imagePreviews.colors[i]} 
                      alt={`معاينة اللون ${i + 1}`} 
                      className="h-20 w-20 object-cover rounded border border-yellow-500 shadow-sm"
                    />
                  </div>
                )}
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-700">الكمية</label>
                <input
                  type="number"
                  placeholder="0"
                  value={color.stock}
                  onChange={(e) => handleColorChange(i, "stock", e.target.value)}
                  className="w-full rounded-lg p-2 bg-white border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                  min="0"
                />
              </div>

              {formData.colors.length > 1 && (
                <div className="md:col-span-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => removeColor(i)}
                    className="text-red-500 hover:text-red-700 font-medium text-sm px-3 py-1 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
                  >
                    🗑️ حذف اللون
                  </button>
                </div>
              )}
            </div>
          ))}
          
          <button
            type="button"
            onClick={addColor}
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-4 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>+</span>
            إضافة لون جديد
          </button>
        </div>

        {/* زر الإرسال */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => {
              setFormData({
                name: "",
                description: "",
                image: null,
                price: "",
                oldPrice: "",
                discountPercent: "",
                isFeatured: false,
                stock: "",
                category: "",
                colors: [{ colorName: "", image: null, stock: "" }],
              });
              setImagePreviews({
                main: null,
                colors: [],
              });
            }}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {uploading ? (
              <>
                <div className="w-2 h-2 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري الحفظ...
              </>
            ) : (
              " حفظ المنتج"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}