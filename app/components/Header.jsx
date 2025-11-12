// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import CartSidebar from "./CartSidebar/page";

// function Header() {
//   const [categories, setCategories] = useState([]);
//   const { totalItems, setIsCartOpen } = useCart();

//   // 🟢 جلب التصنيفات
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("/api/categories");
//         const data = await res.json();
//         if (res.ok) {
//           setCategories(data.categories || []);
//         }
//       } catch (error) {
//         console.error("خطأ في جلب التصنيفات:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   return (
//     <div>
//       {/* 🎯 الهيدر */}
//       <header className="bg-gradient-to-r from-rose-500 to-rose-600 shadow-lg sticky top-0 z-40 w-full">
//         <div className="container mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             {/* 🏪 الشعار واسم المتجر */}
//             <div className="flex items-center space-x-3 space-x-reverse">
//               <h1 className="text-2xl font-bold text-white">Amal store</h1>
//             </div>

//             {/* 🔍 شريط البحث */}
//             <div className="flex-1 max-w-2xl mx-8">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder=" ابحث عن منتج..."
//                   className="w-full py-2 px-4 pr-10 rounded-full border-0 focus:ring-2 focus:ring-yellow-300 focus:outline-none bg-white bg-opacity-90 text-gray-800 placeholder-gray-500"
//                 />
//                 <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-rose-500 transition-colors">
//                   🔍
//                 </button>
//               </div>
//             </div>

//             {/* 🛒 سلة التسوق مع العداد */}
//             <div className="flex items-center space-x-6 space-x-reverse">
//               <button
//                 onClick={() => setIsCartOpen(true)}
//                 className="relative w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
//               >
//                 <span className="text-white text-xl">🛒</span>
//                 {totalItems > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-yellow-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
//                     {totalItems}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* 📁 شريط التصنيفات */}
//           <nav className="mt-4">
//             <div className="flex items-center space-x-8 space-x-reverse overflow-x-auto pb-2 scrollbar-rose">
//               {/* زر الرئيسية */}
//               <Link
//                 href="/"
//                 className="flex-shrink-0 text-white hover:text-yellow-500 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10"
//               >
//                 الرئيسية
//               </Link>

//               {/* التصنيفات */}
//               {categories.map((category) => (
//                 <Link
//                   key={category._id}
//                   href={`/category/${category._id}`}
//                   className="flex-shrink-0 text-white hover:text-yellow-200 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10 whitespace-nowrap hover:text-yellow-500"
//                 >
//                   {category.name}
//                 </Link>
//               ))}

//               {/* زر عرض الكل */}
//               <Link
//                 href="/products"
//                 className="flex-shrink-0 text-yellow-300 hover:text-yellow-200 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10 border border-yellow-500"
//               >
//                 جميع المنتجات
//               </Link>
//             </div>
//           </nav>
//         </div>
//       </header>

//       {/* 🛒 السلة المنبثقة */}
//       <CartSidebar />
//     </div>
//   );
// }

// export default Header;
// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import CartSidebar from "./CartSidebar";

// function Header() {
//   const [categories, setCategories] = useState([]);
//   const { totalItems, setIsCartOpen } = useCart();

//   // 🟢 جلب التصنيفات
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("/api/categories");
//         const data = await res.json();
//         if (res.ok) {
//           setCategories(data.categories || []);
//         }
//       } catch (error) {
//         console.error("خطأ في جلب التصنيفات:", error);
//       }
//     };
//     fetchCategories();
//   }, []);

//   return (
//     <div>
//       {/* 🎯 الهيدر */}
//       <header className="bg-gradient-to-r from-rose-300 to-rose-400 shadow-lg sticky top-0 z-40 w-full">
//         <div className="container mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             {/* 🏪 الشعار واسم المتجر */}
//             <div className="flex items-center space-x-3 space-x-reverse">
//               <h1 className="text-2xl font-bold text-white">Amal store</h1>
//             </div>

//             {/* 🔍 شريط البحث */}
//             <div className="flex-1 max-w-2xl mx-8">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder=" ابحث عن منتج..."
//                   className="w-full py-2 px-4 pr-10 rounded-full border-0 focus:ring-2 focus:ring-yellow-300 focus:outline-none bg-white bg-opacity-90 text-gray-800 placeholder-gray-500"
//                 />
//                 <button className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-rose-500 transition-colors">
//                   🔍
//                 </button>
//               </div>
//             </div>

//             {/* 🛒 سلة التسوق مع العداد */}
//             <div className="flex items-center space-x-6 space-x-reverse">
//               <button
//                 onClick={() => setIsCartOpen(true)}
//                 className="relative w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
//               >
//                 <span className="text-white text-xl">🛒</span>
//                 {totalItems > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-amber-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
//                     {totalItems}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* 📁 شريط التصنيفات */}
//           <nav className="mt-4">
//             <div className="flex items-center space-x-8 space-x-reverse overflow-x-auto pb-2 scrollbar-rose">
//               {/* زر الرئيسية */}
//               <Link
//                 href="/"
//                 className="flex-shrink-0 text-white hover:text-yellow-500 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10"
//               >
//                 الرئيسية
//               </Link>

//               {/* التصنيفات */}
//               {categories.map((category) => (
//                 <Link
//                   key={category._id}
//                   href={`/categories/${category._id}`}
//                   className="flex-shrink-0 text-white hover:text-yellow-200 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10 whitespace-nowrap hover:text-yellow-500"
//                 >
//                   {category.name}
//                 </Link>
//               ))}

//               {/* زر عرض الكل */}
//               {/* <Link
//                 href="/products"
//                 className="flex-shrink-0 text-yellow-300 hover:text-yellow-200 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10 border border-yellow-500"
//               >
//                 جميع المنتجات
//               </Link> */}
//             </div>
//           </nav>
//         </div>
//       </header>

//       {/* 🛒 السلة المنبثقة */}
//       <CartSidebar />
//     </div>
//   );
// }

// export default Header;
// "use client";
// import Link from "next/link";
// import { useState, useEffect } from "react";
// import { useCart } from "../context/CartContext";
// import CartSidebar from "./CartSidebar";
// import { ShoppingCart } from "lucide-react";
// function Header() {
//   const [categories, setCategories] = useState([]);
//   const [loading, setLoading] = useState(true); // ✅ حالة التحميل
//   const { totalItems, setIsCartOpen } = useCart();

//   // 🟢 جلب التصنيفات
//   useEffect(() => {
//     const fetchCategories = async () => {
//       try {
//         const res = await fetch("/api/categories");
//         const data = await res.json();
//         if (res.ok) {
//           setCategories(data.categories || []);
//         }
//       } catch (error) {
//         console.error("خطأ في جلب التصنيفات:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchCategories();
//   }, []);

//   // عدد placeholders للسكيلتون
//   const skeletonCount = 6;

//   return (
//     <div>
//       {/* 🎯 الهيدر */}
//       <header className="bg-gradient-to-r from-rose-400 to-rose-500 shadow-lg sticky top-0 z-40 w-full">
//         <div className="container mx-auto px-4 py-3">
//           <div className="flex items-center justify-between">
//             {/* 🏪 الشعار واسم المتجر */}
//             <div className="flex items-center space-x-3 space-x-reverse">
//               <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-rose-300 bg-clip-text text-transparent">Amal store</h1>
//             </div>

//             {/* 🔍 شريط البحث */}
//             <div className="flex-1 max-w-2xl mx-8">
//               <div className="relative">
//                 <input
//                   type="text"
//                   placeholder=" ابحث عن منتج"
//                   className="w-full py-2 px-4 pr-10 rounded-full border-0 focus:ring-2 focus:ring-yellow-300 focus:outline-none bg-white bg-opacity-90 text-gray-800 placeholder-gray-500"
//                 />
//                 <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-rose-500 transition-colors">
//                   🔍
//                 </button>
//               </div>
//             </div>

//             {/* 🛒 سلة التسوق مع العداد */}
//             <div className="flex items-center space-x-6 space-x-reverse">
//               <button
//                 onClick={() => setIsCartOpen(true)}
//                 className="relative w-10 h-10  bg-opacity-20 rounded-full flex items-center justify-center hover:bg-opacity-30 transition-all"
//               >
//                 <ShoppingCart className="w-7 h-7 inline text-white" />
//                 {totalItems > 0 && (
//                   <span className="absolute -top-1 -right-1 bg-amber-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
//                     {totalItems}
//                   </span>
//                 )}
//               </button>
//             </div>
//           </div>

//           {/* 📁 شريط التصنيفات */}
//           <nav className="mt-4">
//             <div className="flex items-center space-x-8 space-x-reverse overflow-x-auto pb-2 scrollbar-rose">
//               {/* زر الرئيسية */}
//               <Link
//                 href="/"
//                 className="flex-shrink-0 text-white hover:text-yellow-500 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10"
//               >
//                 الرئيسية
//               </Link>

//               {/* التصنيفات أو سكيلتون */}
//               {loading
//                 ? Array.from({ length: skeletonCount }).map((_, i) => (
//                     <div
//                       key={i}
//                       className="flex-shrink-0 bg-gray-100 rounded-md h-6 w-20 animate-pulse"
//                     />
//                   ))
//                 : categories.map((category) => (
//                     <Link
//                       key={category._id}
//                       href={`/categories/${category._id}`}
//                       className="flex-shrink-0 text-white hover:text-yellow-200 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10 whitespace-nowrap hover:text-yellow-500"
//                     >
//                       {category.name}
//                     </Link>
//                   ))}
//             </div>
//           </nav>
//         </div>
//       </header>

//       {/* 🛒 السلة المنبثقة */}
//       <CartSidebar />
//     </div>
//   );
// }

// export default Header;
"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "../context/CartContext";
import CartSidebar from "./CartSidebar";
import { ShoppingCart, Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { ShoppingBag } from "lucide-react";
function Header() {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [showSearch, setShowSearch] = useState(false);
  
  const { totalItems, setIsCartOpen } = useCart();
  const router = useRouter();

  // جلب التصنيفات
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await fetch("/api/categories");
        const data = await res.json();
        if (res.ok) {
          setCategories(data.categories || []);
        }
      } catch (error) {
        console.error("خطأ في جلب التصنيفات:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchCategories();
  }, []);

  // البحث البسيط
  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery("");
      setShowSearch(false);
    }
  };

  const skeletonCount = 6;

  return (
    <div>
      <header className="bg-gradient-to-r from-rose-400 to-rose-500 shadow-lg sticky top-0 z-40 w-full">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* الشعار */}
            <div className="flex items-center space-x-3 space-x-reverse">
              <Link href="/">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-rose-300 bg-clip-text text-transparent hover:from-amber-300 hover:to-rose-200 transition-all">
                  Amal store
                </h1>
              </Link>
            </div>

            {/* شريط البحث المبسط */}
            <div className="flex-1 max-w-2xl mx-8">
              <form onSubmit={handleSearch} className="relative">
                <input
                  type="text"
                  placeholder=" ابحث عن منتج..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full py-2 px-4 pr-12 rounded-full border-0 focus:ring-2 focus:ring-yellow-300 focus:outline-none bg-white bg-opacity-90 text-gray-800 placeholder-gray-500"
                />
                <button 
                  type="submit"
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-rose-500 transition-colors"
                >
                  <Search className="w-5 h-5" />
                </button>
              </form>
            </div>

            {/* سلة التسوق */}
            <div className="flex items-center space-x-6 space-x-reverse">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative w-10 h-10 rounded-full flex items-center justify-center hover:bg-white hover:bg-opacity-20 transition-all"
              >
                <ShoppingCart className="w-7 h-7 text-white" />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-amber-400 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
                    {totalItems}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* شريط التصنيفات */}
          <nav className="mt-4">
            <div className="flex items-center space-x-8 space-x-reverse overflow-x-auto pb-2">
              <Link
                href="/"
                className="flex-shrink-0 text-white hover:text-yellow-500 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10"
              >
                الرئيسية
              </Link>

              {loading
                ? Array.from({ length: skeletonCount }).map((_, i) => (
                    <div
                      key={i}
                      className="flex-shrink-0 bg-gray-100 rounded-md h-6 w-20 animate-pulse"
                    />
                  ))
                : categories.map((category) => (
                    <Link
                      key={category._id}
                      href={`/categories/${category._id}`}
                      className="flex-shrink-0 text-white hover:text-yellow-200 transition-colors font-medium px-3 py-1 rounded-lg hover:bg-white hover:bg-opacity-10 whitespace-nowrap"
                    >
                      {category.name}
                    </Link>
                  ))}
            </div>
          </nav>
        </div>
      </header>

      <CartSidebar />
    </div>
  );
}

export default Header;