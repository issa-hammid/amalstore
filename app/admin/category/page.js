// "use client";
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AddCategoryPage() {
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//  const [isAuthenticated, setIsAuthenticated] = useState(false);
 
//   const router = useRouter();
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setMessage(null);

//     try {
//       const res = await fetch("/api/categories", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setMessage({ type: "error", text: data.error || "حدث خطأ أثناء الإضافة" });
//       } else {
//         setMessage({ type: "success", text: "تمت إضافة التصنيف بنجاح ✅" });
//         setName("");
//       }
//     } catch (err) {
//       setMessage({ type: "error", text: "فشل الاتصال بالسيرفر" });
//     }

//     setLoading(false);
//   };

//   return (
//     <div dir="rtl" className="p-6 max-w-md mx-auto">
//       <h1 className="text-2xl font-bold mb-6 text-gray-800">إضافة تصنيف جديد</h1>

//       <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 space-y-4">
//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-2">
//             اسم التصنيف
//           </label>
//           <input
//             type="text"
//             placeholder="اكتب اسم التصنيف"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
//           />
//         </div>

//         <button
//           type="submit"
//           disabled={loading || !name}
//           className={`w-full py-3 rounded-xl text-white font-medium transition ${
//             loading || !name
//               ? "bg-rose-300 cursor-not-allowed"
//               : "bg-rose-500 hover:bg-rose-600"
//           }`}
//         >
//           {loading ? "جارٍ الإضافة..." : "إضافة التصنيف"}
//         </button>

//         {message && (
//           <p
//             className={`text-center text-sm font-medium ${
//               message.type === "success" ? "text-green-600" : "text-red-500"
//             }`}
//           >
//             {message.text}
//           </p>
//         )}
//       </form>
//     </div>
//   );
// }
// "use client";
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AddCategoryPage() {
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [checkingAuth, setCheckingAuth] = useState(true);
  
//   const router = useRouter();

//   // 🔐 التحقق من المصادقة
//   useEffect(() => {
//     const checkAuth = () => {
//       const auth = localStorage.getItem('admin-authenticated');
//       if (auth !== 'true') {
//         router.push('/admin/login');
//       } else {
//         setIsAuthenticated(true);
//         setCheckingAuth(false);
//       }
//     };

//     checkAuth();
//   }, [router]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // تأكيد المصادقة قبل الإرسال
//     const auth = localStorage.getItem('admin-authenticated');
//     if (auth !== 'true') {
//       setMessage({ type: "error", text: "انتهت جلسة العمل، يرجى تسجيل الدخول مرة أخرى" });
//       router.push('/admin/login');
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const res = await fetch("/api/categories", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setMessage({ type: "error", text: data.error || "حدث خطأ أثناء الإضافة" });
//       } else {
//         setMessage({ type: "success", text: "تمت إضافة التصنيف بنجاح ✅" });
//         setName("");
//       }
//     } catch (err) {
//       setMessage({ type: "error", text: "فشل الاتصال بالسيرفر" });
//     }

//     setLoading(false);
//   };

//   // 🔐 عرض شاشة التحميل أثناء التحقق من المصادقة
//   if (checkingAuth) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">جاري التحقق من الصلاحية...</p>
//         </div>
//       </div>
//     );
//   }

//   // 🔐 إذا لم يتم المصادقة، لا يعرض المحتوى
//   if (!isAuthenticated) {
//     return null;
//   }

//   return (
//     <div dir="rtl" className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-md mx-auto">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">إضافة تصنيف جديد</h1>

//         <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-2xl p-6 space-y-4">
//           <div>
//             <label className="block text-sm font-medium text-gray-700 mb-2">
//               اسم التصنيف
//             </label>
//             <input
//               type="text"
//               placeholder="اكتب اسم التصنيف"
//               value={name}
//               onChange={(e) => setName(e.target.value)}
//               className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
//               required
//             />
//           </div>

//           <button
//             type="submit"
//             disabled={loading || !name.trim()}
//             className={`w-full py-3 rounded-xl text-white font-medium transition ${
//               loading || !name.trim()
//                 ? "bg-rose-300 cursor-not-allowed"
//                 : "bg-rose-500 hover:bg-rose-600"
//             }`}
//           >
//             {loading ? "جارٍ الإضافة..." : "إضافة التصنيف"}
//           </button>

//           {message && (
//             <div className={`p-3 rounded-lg text-center ${
//               message.type === "success" 
//                 ? "bg-green-50 text-green-600 border border-green-200" 
//                 : "bg-red-50 text-red-600 border border-red-200"
//             }`}>
//               <p className="text-sm font-medium">{message.text}</p>
//             </div>
//           )}
//         </form>

//         {/* تلميح أمان */}
//         <div className="mt-6 p-4 bg-rose-50 rounded-lg border border-rose-200">
//           <p className="text-rose-800 text-xs text-center">
//             🔒 هذه الصفحة مخصصة لإدارة المتجر فقط
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// "use client";
// import { useEffect, useState } from 'react';
// import { useRouter } from 'next/navigation';

// export default function AddCategoryPage() {
//   const [name, setName] = useState("");
//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState(null);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [checkingAuth, setCheckingAuth] = useState(true);
//   const [categories, setCategories] = useState([]);
//   const [editingId, setEditingId] = useState(null);
//   const [editName, setEditName] = useState("");
//   const [deleteLoading, setDeleteLoading] = useState(null); // loading للحذف فقط
  
//   const router = useRouter();

//   // 🔐 التحقق من المصادقة
//   useEffect(() => {
//     const checkAuth = () => {
//       const auth = localStorage.getItem('admin-authenticated');
//       if (auth !== 'true') {
//         router.push('/admin/login');
//       } else {
//         setIsAuthenticated(true);
//         setCheckingAuth(false);
//       }
//     };

//     checkAuth();
//   }, [router]);

//   // جلب التصنيفات
//   const fetchCategories = async () => {
//     try {
//       const res = await fetch("/api/categories");
//       const data = await res.json();
      
//       if (res.ok) {
//         setCategories(data.categories || []);
//       } else {
//         console.error("Error fetching categories:", data.error);
//       }
//     } catch (err) {
//       console.error("Failed to fetch categories:", err);
//     }
//   };

//   // جلب التصنيفات عند المصادقة
//   useEffect(() => {
//     if (isAuthenticated) {
//       fetchCategories();
//     }
//   }, [isAuthenticated]);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     const auth = localStorage.getItem('admin-authenticated');
//     if (auth !== 'true') {
//       setMessage({ type: "error", text: "انتهت جلسة العمل، يرجى تسجيل الدخول مرة أخرى" });
//       router.push('/admin/login');
//       return;
//     }

//     setLoading(true);
//     setMessage(null);

//     try {
//       const res = await fetch("/api/categories", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setMessage({ type: "error", text: data.error || "حدث خطأ أثناء الإضافة" });
//       } else {
//         setMessage({ type: "success", text: "تمت إضافة التصنيف بنجاح ✅" });
//         setName("");
//         fetchCategories();
//       }
//     } catch (err) {
//       setMessage({ type: "error", text: "فشل الاتصال بالسيرفر" });
//     }

//     setLoading(false);
//   };

//   // بدء التعديل
//   const startEdit = (category) => {
//     setEditingId(category._id);
//     setEditName(category.name);
//   };

//   // حفظ التعديل
//   const saveEdit = async (id) => {
//     if (!editName.trim()) {
//       setMessage({ type: "error", text: "يرجى إدخال اسم التصنيف" });
//       return;
//     }

//     const auth = localStorage.getItem('admin-authenticated');
//     if (auth !== 'true') {
//       setMessage({ type: "error", text: "انتهت جلسة العمل" });
//       router.push('/admin/login');
//       return;
//     }

//     setLoading(true);
//     try {
//       const res = await fetch("/api/categories", {
//         method: "PUT",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ id, name: editName }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setMessage({ type: "error", text: data.error || "حدث خطأ أثناء التعديل" });
//       } else {
//         setMessage({ type: "success", text: "تم تعديل التصنيف بنجاح ✅" });
//         setEditingId(null);
//         setEditName("");
//         fetchCategories();
//       }
//     } catch (err) {
//       setMessage({ type: "error", text: "فشل الاتصال بالسيرفر" });
//     }
//     setLoading(false);
//   };

//   // إلغاء التعديل
//   const cancelEdit = () => {
//     setEditingId(null);
//     setEditName("");
//   };

//   // حذف التصنيف - الطريقة المحسنة
//   const deleteCategory = async (id, categoryName) => {
//     if (!confirm(`هل أنت متأكد من حذف التصنيف "${categoryName}"؟\nهذا الإجراء لا يمكن التراجع عنه.`)) {
//       return;
//     }

//     const auth = localStorage.getItem('admin-authenticated');
//     if (auth !== 'true') {
//       setMessage({ type: "error", text: "انتهت جلسة العمل" });
//       router.push('/admin/login');
//       return;
//     }

//     setDeleteLoading(id);
//     setMessage(null);

//     try {
//       console.log("🔄 Attempting to delete category with ID:", id);
      
//       // طريقة 1: استخدام query parameters
//       const res = await fetch(`/api/categories?id=${id}`, {
//         method: "DELETE",
//       });

//       // إذا فشلت الطريقة الأولى، جرب الطريقة الثانية
//       let data;
//       if (!res.ok) {
//         console.log("🔄 Trying method 2 with JSON body");
//         const res2 = await fetch("/api/categories", {
//           method: "DELETE",
//           headers: { "Content-Type": "application/json" },
//           body: JSON.stringify({ id }),
//         });
//         data = await res2.json();
        
//         if (!res2.ok) {
//           throw new Error(data.error || "فشل في الحذف");
//         }
//       } else {
//         data = await res.json();
//       }

//       console.log("✅ Delete response:", data);

//       if (data.error) {
//         setMessage({ type: "error", text: data.error });
//       } else {
//         setMessage({ type: "success", text: "تم حذف التصنيف بنجاح ✅" });
//         fetchCategories();
//       }
//     } catch (err) {
//       console.error("❌ Delete error:", err);
//       setMessage({ type: "error", text: err.message || "فشل الاتصال بالسيرفر" });
//     }
    
//     setDeleteLoading(null);
//   };

//   // 🔐 عرض شاشة التحميل أثناء التحقق من المصادقة
//   if (checkingAuth) {
//     return (
//       <div className="min-h-screen bg-gray-50 flex items-center justify-center">
//         <div className="text-center">
//           <div className="w-16 h-16 border-4 border-rose-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
//           <p className="text-gray-600">جاري التحقق من الصلاحية...</p>
//         </div>
//       </div>
//     );
//   }

//   if (!isAuthenticated) {
//     return null;
//   }

//   return (
//     <div dir="rtl" className="min-h-screen bg-gray-50 p-6">
//       <div className="max-w-4xl mx-auto">
//         <h1 className="text-2xl font-bold mb-6 text-gray-800">إدارة التصنيفات</h1>

//         {/* قسم إضافة تصنيف جديد */}
//         <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
//           <h2 className="text-lg font-semibold mb-4 text-gray-700">إضافة تصنيف جديد</h2>
//           <form onSubmit={handleSubmit} className="space-y-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-700 mb-2">
//                 اسم التصنيف
//               </label>
//               <input
//                 type="text"
//                 placeholder="اكتب اسم التصنيف"
//                 value={name}
//                 onChange={(e) => setName(e.target.value)}
//                 className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
//                 required
//               />
//             </div>

//             <button
//               type="submit"
//               disabled={loading || !name.trim()}
//               className={`w-full py-3 rounded-xl text-white font-medium transition ${
//                 loading || !name.trim()
//                   ? "bg-rose-300 cursor-not-allowed"
//                   : "bg-rose-500 hover:bg-rose-600"
//               }`}
//             >
//               {loading ? "جارٍ الإضافة..." : "إضافة التصنيف"}
//             </button>
//           </form>
//         </div>

//         {/* قسم عرض التصنيفات */}
//         <div className="bg-white shadow-md rounded-2xl p-6">
//           <h2 className="text-lg font-semibold mb-4 text-gray-700">
//             التصنيفات الموجودة ({categories.length})
//           </h2>
          
//           {categories.length === 0 ? (
//             <p className="text-center text-gray-500 py-8">لا توجد تصنيفات مضافة بعد</p>
//           ) : (
//             <div className="space-y-3">
//               {categories.map((category) => (
//                 <div key={category._id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg hover:bg-gray-50">
//                   {editingId === category._id ? (
//                     // وضع التعديل
//                     <div className="flex items-center space-x-3 flex-1">
//                       <input
//                         type="text"
//                         value={editName}
//                         onChange={(e) => setEditName(e.target.value)}
//                         className="flex-1 border border-gray-300 rounded-lg p-2 focus:outline-none focus:ring-2 focus:ring-rose-400"
//                         autoFocus
//                       />
//                       <button
//                         onClick={() => saveEdit(category._id)}
//                         disabled={loading}
//                         className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:bg-green-300"
//                       >
//                         {loading ? "جاري..." : "حفظ"}
//                       </button>
//                       <button
//                         onClick={cancelEdit}
//                         disabled={loading}
//                         className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition disabled:bg-gray-300"
//                       >
//                         إلغاء
//                       </button>
//                     </div>
//                   ) : (
//                     // وضع العرض
//                     <>
//                       <div className="flex-1">
//                         <h3 className="font-medium text-gray-800">{category.name}</h3>
//                         <p className="text-sm text-gray-500">
//                           {category.productCount || 0} منتج
//                         </p>
//                       </div>
//                       <div className="flex space-x-2">
//                         <button
//                           onClick={() => startEdit(category)}
//                           disabled={loading}
//                           className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition text-sm disabled:bg-blue-300"
//                         >
//                           تعديل
//                         </button>
//                         <button
//                           onClick={() => deleteCategory(category._id, category.name)}
//                           disabled={deleteLoading === category._id}
//                           className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition text-sm disabled:bg-red-300"
//                         >
//                           {deleteLoading === category._id ? "جاري الحذف..." : "حذف"}
//                         </button>
//                       </div>
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         {/* رسائل النظام */}
//         {message && (
//           <div className={`mt-4 p-3 rounded-lg text-center ${
//             message.type === "success" 
//               ? "bg-green-50 text-green-600 border border-green-200" 
//               : "bg-red-50 text-red-600 border border-red-200"
//           }`}>
//             <p className="text-sm font-medium">{message.text}</p>
//           </div>
//         )}

//         <div className="mt-6 p-4 bg-rose-50 rounded-lg border border-rose-200">
//           <p className="text-rose-800 text-xs text-center">
//             🔒 هذه الصفحة مخصصة لإدارة المتجر فقط
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }
"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminCategoriesPage() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: null
  });
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [editingId, setEditingId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  
  const router = useRouter();

  // 🔐 التحقق من المصادقة
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

  // جلب التصنيفات - وضعناها داخل useEffect مباشرة
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        
        if (res.ok) {
          setCategories(data.categories || []);
        } else {
          setMessage({ type: "error", text: data.error || "فشل في جلب التصنيفات" });
        }
      } catch (err) {
        setMessage({ type: "error", text: "فشل الاتصال بالسيرفر" });
      }
    };

    if (isAuthenticated) {
      fetchCategories();
    }
  }, [isAuthenticated]); // فقط isAuthenticated في dependencies

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file
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
    
    const auth = localStorage.getItem('admin-authenticated');
    if (auth !== 'true') {
      setMessage({ type: "error", text: "انتهت جلسة العمل" });
      router.push('/admin/login');
      return;
    }

    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "يرجى إدخال اسم التصنيف" });
      return;
    }

    setLoading(true);
    setMessage(null);

    try {
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description || '');
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const res = await fetch("/api/categories", {
        method: "POST",
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "حدث خطأ أثناء الإضافة" });
      } else {
        setMessage({ type: "success", text: "تم إضافة التصنيف بنجاح ✅" });
        setFormData({
          name: '',
          description: '',
          image: null
        });
        setImagePreview(null);
        
        // إعادة جلب التصنيفات بعد الإضافة
        const refreshRes = await fetch("/api/categories");
        const refreshData = await refreshRes.json();
        if (refreshRes.ok) {
          setCategories(refreshData.categories || []);
        }
        
        // تنظيف حقل الصورة
        const imageInput = document.getElementById('imageInput');
        if (imageInput) imageInput.value = '';
      }
    } catch (err) {
      setMessage({ type: "error", text: "فشل الاتصال بالسيرفر" });
    }

    setLoading(false);
  };

  const startEdit = (category) => {
    setEditingId(category._id);
    setFormData({
      name: category.name,
      description: category.description || '',
      image: null
    });
    setImagePreview(category.image || null);
  };

  const saveEdit = async () => {
    if (!formData.name.trim()) {
      setMessage({ type: "error", text: "يرجى إدخال اسم التصنيف" });
      return;
    }

    setLoading(true);
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('id', editingId);
      formDataToSend.append('name', formData.name);
      formDataToSend.append('description', formData.description || '');
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      } else if (!imagePreview) {
        formDataToSend.append('removeImage', 'true');
      }

      const res = await fetch("/api/categories", {
        method: "PUT",
        body: formDataToSend,
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "حدث خطأ أثناء التعديل" });
      } else {
        setMessage({ type: "success", text: "تم تعديل التصنيف بنجاح ✅" });
        setEditingId(null);
        setFormData({
          name: '',
          description: '',
          image: null
        });
        setImagePreview(null);
        
        // إعادة جلب التصنيفات بعد التعديل
        const refreshRes = await fetch("/api/categories");
        const refreshData = await refreshRes.json();
        if (refreshRes.ok) {
          setCategories(refreshData.categories || []);
        }
        
        // تنظيف حقل الصورة
        const imageInput = document.getElementById('imageInput');
        if (imageInput) imageInput.value = '';
      }
    } catch (err) {
      setMessage({ type: "error", text: "فشل الاتصال بالسيرفر" });
    }
    setLoading(false);
  };

  const cancelEdit = () => {
    setEditingId(null);
    setFormData({
      name: '',
      description: '',
      image: null
    });
    setImagePreview(null);
    const imageInput = document.getElementById('imageInput');
    if (imageInput) imageInput.value = '';
  };

  const removeImage = () => {
    setImagePreview(null);
    setFormData(prev => ({
      ...prev,
      image: null
    }));
    const imageInput = document.getElementById('imageInput');
    if (imageInput) imageInput.value = '';
  };

  const deleteCategory = async (id, categoryName) => {
    if (!confirm(`هل أنت متأكد من حذف التصنيف "${categoryName}"؟`)) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/categories", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage({ type: "error", text: data.error || "حدث خطأ أثناء الحذف" });
      } else {
        setMessage({ type: "success", text: "تم حذف التصنيف بنجاح ✅" });
        
        // إعادة جلب التصنيفات بعد الحذف
        const refreshRes = await fetch("/api/categories");
        const refreshData = await refreshRes.json();
        if (refreshRes.ok) {
          setCategories(refreshData.categories || []);
        }
      }
    } catch (err) {
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

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div dir="rtl" className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-2xl font-bold mb-6 text-gray-800">إدارة التصنيفات</h1>

        {/* نموذج إضافة/تعديل تصنيف */}
        <div className="bg-white shadow-md rounded-2xl p-6 mb-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            {editingId ? "تعديل التصنيف" : "إضافة تصنيف جديد"}
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  اسم التصنيف *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  الوصف (اختياري)
                </label>
                <input
                  type="text"
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
                  placeholder="وصف قصير للتصنيف"
                />
              </div>
            </div>

            {/* حقل الصورة */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                صورة التصنيف {!editingId && '(اختياري)'}
              </label>
              <input
                id="imageInput"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-rose-400"
              />
              
              {imagePreview && (
                <div className="mt-3">
                  <p className="text-sm text-gray-600 mb-2">معاينة الصورة:</p>
                  <div className="relative inline-block">
                    <img 
                      src={imagePreview} 
                      alt="Preview" 
                      className="w-48 h-32 object-cover rounded-lg border shadow-sm"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs hover:bg-red-600"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              )}
            </div>

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
                  disabled={loading || !formData.name.trim()}
                  className="px-6 py-3 bg-rose-500 text-white rounded-xl hover:bg-rose-600 transition disabled:bg-rose-300"
                >
                  {loading ? "جاري الإضافة..." : "إضافة التصنيف"}
                </button>
              )}
            </div>
          </form>
        </div>

        {/* عرض التصنيفات الحالية */}
        <div className="bg-white shadow-md rounded-2xl p-6">
          <h2 className="text-lg font-semibold mb-4 text-gray-700">
            التصنيفات الحالية ({categories.length})
          </h2>
          
          {categories.length === 0 ? (
            <p className="text-center text-gray-500 py-8">لا توجد تصنيفات مضافة بعد</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <div key={category._id} className="border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition">
                  <div className="relative h-48 bg-gray-100">
                    {category.image ? (
                      <img
                        src={category.image}
                        alt={category.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-rose-50 to-pink-100">
                        <span className="text-gray-400 text-lg">لا توجد صورة</span>
                      </div>
                    )}
                    <div className="absolute top-2 left-2 bg-rose-500 text-white px-2 py-1 rounded text-xs">
                      {category.productCount || 0} منتج
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800 mb-1">{category.name}</h3>
                    {category.description && (
                      <p className="text-sm text-gray-600 mb-3">{category.description}</p>
                    )}
                    <div className="flex justify-between items-center">
                      <span className="text-xs text-gray-500">
                        {new Date(category.createdAt).toLocaleDateString('ar-SA')}
                      </span>
                      <div className="flex space-x-2">
                        <button
                          onClick={() => startEdit(category)}
                          className="text-blue-600 hover:text-blue-800 text-sm px-2 py-1 rounded hover:bg-blue-50"
                        >
                          تعديل
                        </button>
                        <button
                          onClick={() => deleteCategory(category._id, category.name)}
                          className="text-red-600 hover:text-red-800 text-sm px-2 py-1 rounded hover:bg-red-50"
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

        {/* رسائل النظام */}
        {message && (
          <div className={`mt-4 p-3 rounded-lg text-center ${
            message.type === "success" 
              ? "bg-green-50 text-green-600 border border-green-200" 
              : "bg-red-50 text-red-600 border border-red-200"
          }`}>
            <p className="text-sm font-medium">{message.text}</p>
          </div>
        )}
      </div>
    </div>
  );
}