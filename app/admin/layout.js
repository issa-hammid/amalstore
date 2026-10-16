import AdminLayout from "./components/AdminLayout";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
export default function RootLayout({ children }) {
  return (
    <html lang="ar" dir="rtl">
      <body>
        {/* الـ ToastContainer هنا علشان يغطي كل الصفحات */}
        <ToastContainer
          position="top-left"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={true}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        
        {/* لوحة تحكم الأدمن والصفحات التابعة لها */}
        <AdminLayout>
          {children}
        </AdminLayout>
      </body>
    </html>
  );
}