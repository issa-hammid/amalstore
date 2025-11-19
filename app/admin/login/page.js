"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // كلمة المرور (تغيرها أنت)
  const ADMIN_PASSWORD = "amal5991";

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    if (password === ADMIN_PASSWORD) {
      // حفظ حالة الدخول في localStorage
      localStorage.setItem('admin-authenticated', 'true');
      // التوجيه للوحة التحكم
      router.push('/admin/show-products');
    } else {
      setError('كلمة المرور غير صحيحة');
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-amber-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-md">
        {/* الشعار */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-amber-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-white text-2xl font-bold">أ</span>
          </div>
          <h1 className="text-2xl font-bold text-gray-800">لوحة تحكم Amal Store</h1>
          <p className="text-gray-600 mt-2">أدخل كلمة المرور للدخول</p>
        </div>

        {/* نموذج الدخول */}
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              كلمة المرور
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all"
              placeholder="أدخل كلمة المرور"
              required
            />
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-3">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-amber-500 text-white py-3 rounded-lg font-semibold hover:bg-amber-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'جاري الدخول...' : 'دخول إلى لوحة التحكم'}
          </button>
        </form>

        {/* تلميح أمان */}
        <div className="mt-6 p-3 bg-amber-50 rounded-lg border border-amber-200">
          <p className="text-amber-800 text-xs text-center">
            🔒 هذه الصفحة مخصصة لإدارة المتجر فقط
          </p>
        </div>
      </div>
    </div>
  );
}