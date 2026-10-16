// "use client";
// import { useState } from "react";
// import Link from "next/link";
// import { Menu, X  } from "lucide-react";
// export default function AdminLayout({ children }) {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   return (
//     <div dir="rtl" className="flex min-h-screen bg-gray-50">
//       {/* زر القائمة للموبايل */}
//       <button
//         onClick={() => setSidebarOpen(!sidebarOpen)}
//         className="lg:hidden fixed top-4 right-4 z-50 p-2 rounded-xl hover:bg-black/10 transition"
//       >
//         {sidebarOpen ? (
//           <X className="w-6 h-6 text-gray-800 " /> // ❌ أيقونة الإغلاق
//         ) : (
//           <Menu className="w-6 h-6 text-gray-800" /> // ☰ أيقونة القائمة
//         )}
//       </button>

//       {/* الخلفية عند فتح القائمة على الموبايل */}
//       {sidebarOpen && (
//         <div
//           onClick={() => setSidebarOpen(false)}
//           className="fixed inset-0 bg-black/40 z-40 lg:hidden"
//         ></div>
//       )}

//       {/* السايدبار */}
//       <aside
//         className={`fixed z-50 top-0 right-0 h-full bg-white shadow-lg transform transition-transform duration-300 
//         w-64 p-4 flex flex-col justify-between
//         ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
//         lg:translate-x-0 lg:static lg:shadow-none`}
//       >
//         {/* الجزء العلوي */}
//         <div>
//           <div className="flex items-center gap-3 mb-8">
//             <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center font-bold">
//               أ
//             </div>
//             <div>
//               <p className="font-semibold">أمل</p>
//               <p className="text-xs text-gray-500">مالك المتجر</p>
//             </div>
//           </div>

//           <nav className="flex flex-col gap-2">
//             <SidebarLink text="لوحة التحكم " active />
//             <Link href="/admin/show-products">
//               <SidebarLink text="منتجات" />
//             </Link>
//             <Link href="/admin/add-product">
//               <SidebarLink text="اضافة المنتجات" />
//             </Link>
//             <Link href="/admin/category">
//               <SidebarLink text="التصنيفات" />
//             </Link>

//             <Link href="/">
//               <SidebarLink text="العودة الى المتجر" />
//             </Link>
//           </nav>
//         </div>

//         {/* الجزء السفلي */}
//       </aside>

//       {/* محتوى الصفحة */}
//       <main className="flex-1 lg:mr-64 p-6">{children}</main>
//     </div>
//   );
// }

// function SidebarLink({ icon, text, active }) {
//   return (
//     <div
      
//       className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
//         active
//           ? "bg-rose-100 text-rose-600 font-medium"
//           : "text-gray-700 hover:bg-gray-100"
//       }`}
//     >
//       <span className="text-lg">{icon}</span>
//       {text}
//     </div>
//   );
// }
"use client";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  LayoutDashboard,
  Package,
  PlusSquare,
  Layers,
  Store,
  LogOut,
  Ticket,
} from "lucide-react";

export default function AdminLayout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div dir="rtl" className="flex min-h-screen bg-gray-50 relative">
      {/* شريط الموبايل العلوي مع زر القائمة */}
      <div className="lg:hidden fixed top-0 left-0 right-0 h-16 bg-white/95 backdrop-blur-md border-b border-gray-200 z-[9990] flex items-center justify-between px-4 shadow-xs">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-gradient-to-r from-rose-400 to-pink-500 text-white rounded-lg flex items-center justify-center font-bold text-sm shadow-xs">
            أ
          </div>
          <div>
            <span className="font-bold text-gray-800 text-sm block leading-tight">لوحة تحكم أمل</span>
            <span className="text-[10px] text-gray-400 font-normal">إدارة المتجر</span>
          </div>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 rounded-xl bg-gray-50 border border-gray-200 text-gray-700 hover:bg-gray-100 transition shadow-xs focus:outline-none"
          aria-label="القائمة الرئيسية"
        >
          {sidebarOpen ? (
            <X className="w-5 h-5 text-gray-800" />
          ) : (
            <Menu className="w-5 h-5 text-gray-800" />
          )}
        </button>
      </div>

      {/* الخلفية الداكنة عند فتح السايدبار على الموبايل */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/40 z-[9998] lg:hidden backdrop-blur-xs transition-opacity"
        ></div>
      )}

      {/* السايدبار */}
      <aside
        className={`fixed z-[9999] top-0 right-0 h-full bg-white border-l border-gray-200 shadow-xl lg:shadow-none transform transition-transform duration-300
        w-64 p-4 flex flex-col justify-between
        ${sidebarOpen ? "translate-x-0" : "translate-x-full"}
        lg:translate-x-0 lg:static`}
      >
        {/* الجزء العلوي */}
        <div>
          {/* البروفايل */}
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 bg-gradient-to-r from-rose-300 to-pink-400 text-white rounded-full flex items-center justify-center font-bold">
              أ
            </div>
            <div>
              <p className="font-semibold text-gray-800">أمل</p>
              <p className="text-xs text-gray-500">مالك المتجر</p>
            </div>
          </div>

          {/* الروابط */}
          <nav className="flex flex-col gap-2">
            <SidebarItem
              href="/admin/hero"
              icon={<LayoutDashboard className="w-5 h-5" />}
              text="صور المتجر"
              pathname={pathname}
              setSidebarOpen={setSidebarOpen}
            />
            <SidebarItem
              href="/admin/show-products"
              icon={<Package className="w-5 h-5" />}
              text="المنتجات"
              pathname={pathname}
              setSidebarOpen={setSidebarOpen}
            />
            <SidebarItem
              href="/admin/add-product"
              icon={<PlusSquare className="w-5 h-5" />}
              text="إضافة منتج"
              pathname={pathname}
              setSidebarOpen={setSidebarOpen}
            />
            <SidebarItem
              href="/admin/category"
              icon={<Layers className="w-5 h-5" />}
              text="التصنيفات"
              pathname={pathname}
              setSidebarOpen={setSidebarOpen}
            />
            <SidebarItem
              href="/admin/coupons"
              icon={<Ticket className="w-5 h-5" />}
              text="كوبونات الخصم"
              pathname={pathname}
              setSidebarOpen={setSidebarOpen}
            />
            <SidebarItem
              href="/"
              icon={<Store className="w-5 h-5" />}
              text="العودة إلى المتجر"
              pathname={pathname}
              setSidebarOpen={setSidebarOpen}
            />
          </nav>
        </div>

        {/* الجزء السفلي */}
        <div className="mt-6 border-t border-gray-200 pt-4">
          <SidebarLink
            icon={<LogOut className="w-5 h-5" />}
            text="تسجيل الخروج"
          />
        </div>
      </aside>

      {/* محتوى الصفحة - تم ضبطه بحيث لا يفيض ولا يكسر الشاشة على الجوال أبداً */}
      <main className="flex-1 min-w-0 w-full max-w-full p-3.5 sm:p-5 md:p-6 pt-20 lg:pt-6 overflow-x-hidden transition-all duration-300">
        {children}
      </main>
    </div>
  );
}

// 🔹 عنصر الرابط الجاهز
function SidebarItem({ href, icon, text, pathname, setSidebarOpen }) {
  const isActive = pathname === href;
  return (
    <Link href={href} onClick={() => setSidebarOpen(false)}>
      <SidebarLink icon={icon} text={text} active={isActive} />
    </Link>
  );
}

// 🔹 تصميم الرابط نفسه
function SidebarLink({ icon, text, active }) {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors cursor-pointer
      ${
        active
          ? "bg-gradient-to-r from-pink-100 to-rose-100 text-rose-600 font-medium"
          : "text-gray-700 hover:bg-gray-100 hover:text-rose-500"
      }`}
    >
      <span>{icon}</span>
      <span className="text-sm">{text}</span>
    </div>
  );
}
