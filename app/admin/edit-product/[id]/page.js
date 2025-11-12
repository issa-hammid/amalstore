"use client";
import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { notify } from './../../../lib/notifications';

export default function EditProductPage() {
  const params = useParams();
  const router = useRouter();
  const productId = params.id;

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
  const [loading, setLoading] = useState(true);
  const [imagePreviews, setImagePreviews] = useState({
    main: null,
    colors: [],
  });

  // 🟢 جلب بيانات المنتج والتصنيفات
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // جلب التصنيفات
        const categoriesRes = await fetch("/api/categories");
        const categoriesData = await categoriesRes.json();
        if (categoriesRes.ok) {
          setCategories(categoriesData.categories);
        }

        // جلب بيانات المنتج
        const productRes = await fetch(`/api/products/${productId}`);
        const productData = await productRes.json();
        
        if (productRes.ok && productData.success) {
          const product = productData.product;
          
          // تعبئة الفورم ببيانات المنتج
          setFormData({
            name: product.name || "",
            description: product.description || "",
            image: product.image || null, // نتعامل معه كرابط موجود
            price: product.price || "",
            oldPrice: product.oldPrice || "",
            discountPercent: product.discountPercent || "",
            isFeatured: product.isFeatured || false,
            stock: product.stock || "",
            category: product.category?._id || product.category || "",
            colors: product.colors?.map(color => ({
              colorName: color.colorName || "",
              image: color.image || null,
              stock: color.stock || ""
            })) || [{ colorName: "", image: null, stock: "" }]
          });

          // تعبئة معاينات الصور
          if (product.image) {
            setImagePreviews(prev => ({ ...prev, main: product.image }));
          }
          
          if (product.colors) {
            const colorPreviews = product.colors.map(color => color.image || null);
            setImagePreviews(prev => ({ ...prev, colors: colorPreviews }));
          }

        } else {
          alert("المنتج غير موجود");
          router.push("/admin/show-products");
        }
      } catch (error) {
        console.error("خطأ في جلب البيانات:", error);
        alert("حدث خطأ في تحميل البيانات");
      } finally {
        setLoading(false);
      }
    };

    if (productId) {
      fetchData();
    }
  }, [productId, router]);

  // 🟢 دالة معاينة الصور
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

  // 🟢 تغيير القيم الأساسية
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file" && files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      if (name === "image") {
        handleImagePreview(files[0], 'main');
      }
    } else {
      setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
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
    setFormData({ ...formData, colors: newColors });
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
    setFormData({ ...formData, colors: newColors });
    setImagePreviews(prev => ({ ...prev, colors: newPreviews }));
  };

  // 🟢 عند الإرسال (تحديث المنتج)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const fd = new FormData();

      // القيم الأساسية
      fd.append("name", formData.name);
      fd.append("description", formData.description);
      fd.append("price", formData.price);
      fd.append("oldPrice", formData.oldPrice);
      fd.append("discountPercent", formData.discountPercent);
      fd.append("isFeatured", formData.isFeatured);
      fd.append("stock", formData.stock);
      fd.append("category", formData.category);
      
      // إذا المستخدم رفع صورة جديدة
      if (formData.image && typeof formData.image !== 'string') {
        fd.append("image", formData.image);
      }

      // الألوان
      formData.colors.forEach((color, index) => {
        fd.append(`colors[${index}][colorName]`, color.colorName);
        fd.append(`colors[${index}][stock]`, color.stock);
        if (color.image && typeof color.image !== 'string') {
          fd.append(`colors[${index}][image]`, color.image);
        }
      });

      const res = await fetch(`/api/products/${productId}`, {
        method: "PUT",
        body: fd,
      });

      const data = await res.json();
      if (res.ok) {
        notify.success("✅ تم تحديث المنتج بنجاح"); // بدل alert
        router.push("/admin/show-products");
      } else {
        notify.error("❌ خطأ: " + data.error); // بدل alert
      }
    } catch (error) {
      notify.error("حدث خطأ أثناء التحديث"); // بدل alert
      alert("حدث خطأ أثناء التحديث");
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-8">
        <div className="flex justify-center items-center h-40">
          <div className="text-yellow-500 text-lg">جاري تحميل بيانات المنتج...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white shadow-md rounded-2xl p-8 mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold text-yellow-500">✏️تعديل المنتج</h2>
        
      </div>

      <form onSubmit={handleSubmit} encType="multipart/form-data" className="space-y-6">
        {/* نفس تصميم فورم الإضافة - مع البيانات المعبأة */}
        
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
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-gray-700">الفئة</label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full rounded-lg p-2 bg-yellow-50 border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              required
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
            required
          />
        </div>

        {/* الأسعار */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block mb-2 text-gray-700">السعر الحالي</label>
            <input
              type="number"
              name="price"
              placeholder="السعر الحالي"
              value={formData.price}
              onChange={handleChange}
              className="w-full rounded-lg p-2 bg-yellow-50 border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              required
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
            />
          </div>
          
          <div>
            <label className="block mb-2 text-gray-700">نسبة الخصم %</label>
            <input
              type="number"
              name="discountPercent"
              placeholder="نسبة الخصم"
              value={formData.discountPercent}
              onChange={handleChange}
              className="w-full rounded-lg p-2 bg-yellow-50 border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
            />
          </div>
        </div>

        {/* الكمية والمنتج المميز */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block mb-2 text-gray-700">الكمية المتاحة</label>
            <input
              type="number"
              name="stock"
              placeholder="الكمية في المخزن"
              value={formData.stock}
              onChange={handleChange}
              className="w-full rounded-lg p-2 bg-yellow-50 border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
              required
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
          <label className="block mb-2 text-gray-700">صورة المنتج الرئيسية</label>
          <input
            type="file"
            name="image"
            accept="image/*"
            onChange={handleChange}
            className="w-full p-2 bg-yellow-50 rounded-lg border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
          />
          {imagePreviews.main && (
            <div className="mt-3">
              <p className="text-sm text-green-600 mb-1">الصورة الحالية:</p>
              <img 
                src={imagePreviews.main} 
                alt="معاينة الصورة الرئيسية" 
                className="h-32 w-32 object-cover rounded-lg border-2 border-yellow-500 shadow-md"
              />
            </div>
          )}
        </div>

        {/* الألوان */}
        <div className="border-t pt-6">
          <h3 className="text-xl font-semibold mb-4 text-gray-800">الألوان المتاحة</h3>
          {formData.colors.map((color, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
              <div>
                <label className="block mb-2 text-sm text-gray-700">اسم اللون</label>
                <input
                  placeholder="مثال: أحمر، أزرق"
                  value={color.colorName}
                  onChange={(e) => handleColorChange(i, "colorName", e.target.value)}
                  className="w-full rounded-lg p-2 bg-white border border-gray-300 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block mb-2 text-sm text-gray-700">صورة اللون</label>
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
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold py-2 px-6 rounded-lg transition-colors flex items-center gap-2"
          >
            <span>+</span>
            إضافة لون جديد
          </button>
        </div>

        {/* أزرار الإرسال */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <button
            type="button"
            onClick={() => router.push("/admin/show-products")}
            className="px-6 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors font-medium"
          >
            إلغاء
          </button>
          <button
            type="submit"
            disabled={uploading}
            className="px-6 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-lg transition-colors font-medium disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {uploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                جاري التحديث...
              </>
            ) : (
              "💾 تحديث المنتج"
            )}
          </button>
        </div>
      </form>
    </div>
  );
}