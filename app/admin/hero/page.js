
"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { notify } from '../../lib/notifications';

export default function AdminHeroPage() {
  const [formData, setFormData] = useState({
    title: "",
    subtitle: "",
    buttonText: "",
    buttonLink: "",
    image: null,
  });
  const [heroSlides, setHeroSlides] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const router = useRouter();

  useEffect(() => {
    const checkAndFetch = async () => {
      const auth = localStorage.getItem("admin-authenticated");
      if (auth !== "true") {
        router.push("/admin/login");
        return;
      }
      setIsAuthenticated(true);
      setCheckingAuth(false);

      try {
        const res = await fetch("/api/hero");
        const data = await res.json();
        if (res.ok) {
          setHeroSlides(data.heroes || []);
        } else {
          setMessage({ type: "error", text: data.error || "فشل في جلب الشرائح" });
        }
      } catch (err) {
        setMessage({ type: "error", text: "فشل الاتصال بالسيرفر" });
      }
    };

    checkAndFetch();
  }, [router]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({
        ...prev,
        image: file,
      }));

      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const auth = localStorage.getItem("admin-authenticated");
    if (auth !== "true") {
      setMessage({ type: "error", text: "انتهت جلسة العمل" });
      router.push("/admin/login");
      return;
    }

    if (!formData.image) {
      setMessage({ type: "error", text: "يرجى اختيار صورة" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append("title", formData.title);
      formDataToSend.append("subtitle", formData.subtitle);
      formDataToSend.append("buttonText", formData.buttonText);
      formDataToSend.append("buttonLink", formData.buttonLink);
      formDataToSend.append("image", formData.image);

      const res = await fetch("/api/hero", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "حدث خطأ أثناء الإضافة" });
      } else {
        notify.success("تم اضافة الصورة بنجاح ")
        setMessage({ type: "success", text: "تم إضافة الشريحة بنجاح ✅" });
        setFormData({
          title: "",
          subtitle: "",
          buttonText: "",
          buttonLink: "",
          image: null,
        });
        setImagePreview(null);
        document.getElementById("imageInput").value = "";

        // تحديث الشرائح
        const refresh = await fetch("/api/hero");
        const newData = await refresh.json();
        setHeroSlides(newData.heroes || []);
      }
    } catch (err) {
      setMessage({ type: "error", text: "فشل الاتصال بالسيرفر" });
    }

    setLoading(false);
  };

  const startEdit = (slide) => {
    setEditingId(slide._id);
    setFormData({
      title: slide.title,
      subtitle: slide.subtitle,
      buttonText: slide.buttonText,
      buttonLink: slide.buttonLink,
      image: null,
    });
  };

  const saveEdit = async () => {
    if (
      !formData.title ||
      !formData.subtitle ||
      !formData.buttonText ||
      !formData.buttonLink
    ) {
      setMessage({ type: "error", text: "جميع الحقول مطلوبة" });
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/hero", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: editingId,
          title: formData.title,
          subtitle: formData.subtitle,
          buttonText: formData.buttonText,
          buttonLink: formData.buttonLink,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "حدث خطأ أثناء التعديل" });
      } else {
        notify.success("تم تعديل الصورة بنجاح ")
        setMessage({ type: "success", text: "تم تعديل الشريحة بنجاح ✅" });
        setEditingId(null);
        setFormData({
          title: "",
          subtitle: "",
          buttonText: "",
          buttonLink: "",
          image: null,
        });
        const refresh = await fetch("/api/hero");
        const newData = await refresh.json();
        setHeroSlides(newData.heroes || []);
      }
    } catch (err) {
      setMessage({ type: "error", text: "فشل الاتصال بالسيرفر" });
    }
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      title: "",
      subtitle: "",
      buttonText: "",
      buttonLink: "",
      image: null,
    });
    setImagePreview(null);
  };

  const deleteSlide = async (id) => {
    if (!confirm("هل أنت متأكد من حذف هذه الشريحة؟")) return;

    setLoading(true);
    try {
      const res = await fetch("/api/hero", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "حدث خطأ أثناء الحذف" });
      } else {
        notify.success("تم حذف الصورة بنجاح ")
        setMessage({ type: "success", text: "تم حذف الشريحة بنجاح ✅" });
        const refresh = await fetch("/api/hero");
        const newData = await refresh.json();
        setHeroSlides(newData.heroes || []);
      }
    } catch (err) {
      notify.success("حصلت مشكلة في الاتصال حاول مرة اخرى")
      setMessage({ type: "error", text: "فشل الاتصال بالسيرفر" });
    }
    setLoading(false);
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">جاري التحقق من الصلاحية...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">إدارة شرائح الهيرو</h1>

        {/* نموذج إضافة/تعديل */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {editingId ? "تعديل الشريحة" : "إضافة شريحة جديدة"}
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  العنوان الرئيسي
                </label>
                <input
                  type="text"
                  placeholder="عنوان كبير الحجم بكون فوق الصورة "
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  العنوان الفرعي
                </label>
                <input
                  type="text"
                  placeholder="نص صغير بكون فوق الصورة "
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  نص الزر
                </label>
                <input
                  type="text"
                  placeholder="اسم الزر مثلا : اكتشف معنا "
                  name="buttonText"
                  value={formData.buttonText}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  رابط الزر
                </label>
                <input
                  type="text"
                  name="buttonLink"
                  value={formData.buttonLink}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="رابط التصنيف اذا ما عرفتي كيف كلمي الدعم"
                  
                />
              </div>
            </div>

            {!editingId && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  صورة الشريحة
                </label>
                <input
                  id="imageInput"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="w-full border border-gray-300 rounded-xl p-3"
                  required={!editingId}
                />
                {imagePreview && (
                  <div className="mt-3">
                    <p className="text-sm text-gray-600 mb-2">معاينة الصورة:</p>
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="w-48 h-32 object-cover rounded-lg border"
                    />
                  </div>
                )}
              </div>
            )}

            <div className="flex space-x-3">
              {editingId ? (
                <>
                  <button
                    type="button"
                    onClick={saveEdit}
                    disabled={loading}
                    className="px-6 py-3 bg-green-500 text-white rounded-xl hover:bg-green-600 transition disabled:bg-green-300"
                  >
                    {loading ? "جاري الحفظ..." : "حفظ التعديلات"}
                  </button>
                  <button
                    type="button"
                    onClick={cancelEdit}
                    disabled={loading}
                    className="px-6 py-3 bg-gray-500 text-white rounded-xl hover:bg-gray-600 transition disabled:bg-gray-300"
                  >
                    إلغاء
                  </button>
                </>
              ) : (
                <button
                  type="submit"
                  disabled={loading || !formData.image}
                  className="px-6 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition disabled:bg-rose-300"
                >
                  {loading ? "جاري الإضافة..." : "إضافة الشريحة"}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* عرض الشرائح */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            الشرائح الحالية ({heroSlides.length})
          </h2>

          {heroSlides.length === 0 ? (
            <p className="text-center text-gray-500 py-8">لا توجد شرائح مضافة بعد</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {heroSlides.map((slide) => (
                <div
                  key={slide._id}
                  className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition"
                >
                  <div className="relative h-48">
                    <img
                      src={slide.image}
                      alt={slide.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-2">
                      {slide.title}
                    </h3>
                    <p className="text-sm text-gray-600 mb-3">{slide.subtitle}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs bg-rose-100 text-rose-800 px-2 py-1 rounded">
                        {slide.buttonText}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEdit(slide)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => deleteSlide(slide._id)}
                          className="text-red-600 hover:text-red-800 text-sm"
                        >
                          حذف
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {message && (
          <div
            className={`mt-4 p-3 rounded-lg text-center ${
              message.type === "success"
                ? "bg-green-50 text-green-600 border border-green-200"
                : "bg-red-50 text-red-600 border border-red-200"
            }`}
          >
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}
