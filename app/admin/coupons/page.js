"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { notify } from "@/app/lib/notifications";
import {
  Ticket,
  Plus,
  Trash2,
  CheckCircle2,
  XCircle,
  Copy,
  Calendar,
  Percent,
  Coins,
  TrendingUp,
  AlertCircle,
  X,
} from "lucide-react";

// دالة تنسيق التاريخ ليكون باليوم/الشهر/السنة
const formatDateDMY = (dateStr) => {
  if (!dateStr) return "دائم";
  const d = new Date(dateStr);
  if (isNaN(d.getTime())) return dateStr;
  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}/${month}/${year}`;
};

// مكون إدخال التاريخ بتنسيق اليوم/الشهر/السنة (dd/mm/yyyy)
function DateInputDMY({ value, onChange }) {
  const [displayValue, setDisplayValue] = useState("");
  const hiddenPickerRef = useRef(null);

  useEffect(() => {
    if (!value) {
      setDisplayValue("");
      return;
    }
    const match = value.match(/^(\d{4})-(\d{2})-(\d{2})/);
    if (match) {
      const [, y, m, d] = match;
      setDisplayValue(`${d}/${m}/${y}`);
    }
  }, [value]);

  const handleTextChange = (e) => {
    const rawInput = e.target.value;

    // إذا كان المستخدم يمسح نصاً
    if (rawInput.length < displayValue.length) {
      setDisplayValue(rawInput);
      if (!rawInput.trim()) {
        onChange("");
      }
      return;
    }

    // استخراج الأرقام فقط بحد أقصى 8 أرقام (يوم: 2، شهر: 2، سنة: 4)
    const digits = rawInput.replace(/\D/g, "").slice(0, 8);
    let formatted = "";

    if (digits.length > 0) {
      formatted = digits.slice(0, 2);
      if (digits.length > 2) {
        formatted += "/" + digits.slice(2, 4);
      } else if (digits.length === 2 && rawInput.length > displayValue.length) {
        formatted += "/";
      }

      if (digits.length > 4) {
        formatted += "/" + digits.slice(4, 8);
      } else if (digits.length === 4 && rawInput.length > displayValue.length) {
        formatted += "/";
      }
    }

    setDisplayValue(formatted);

    // إذا اكتمل إدخال 8 أرقام تحقق من صحتها
    if (digits.length === 8) {
      const day = parseInt(digits.slice(0, 2), 10);
      const month = parseInt(digits.slice(2, 4), 10);
      const year = parseInt(digits.slice(4, 8), 10);

      if (
        day >= 1 &&
        day <= 31 &&
        month >= 1 &&
        month <= 12 &&
        year >= 2024 &&
        year <= 2100
      ) {
        const iso = `${year}-${String(month).padStart(2, "0")}-${String(day).padStart(2, "0")}`;
        onChange(iso);
      }
    } else if (!formatted) {
      onChange("");
    }
  };

  const handleCalendarChange = (e) => {
    const selected = e.target.value; // YYYY-MM-DD
    if (selected) {
      const [y, m, d] = selected.split("-");
      setDisplayValue(`${d}/${m}/${y}`);
      onChange(selected);
    } else {
      setDisplayValue("");
      onChange("");
    }
  };

  const handleClear = () => {
    setDisplayValue("");
    onChange("");
    if (hiddenPickerRef.current) {
      hiddenPickerRef.current.value = "";
    }
  };

  return (
    <div className="relative">
      <div className="relative flex items-center">
        <input
          type="text"
          dir="ltr"
          value={displayValue}
          onChange={handleTextChange}
          placeholder="dd/mm/yyyy"
          className="w-full px-3.5 py-2.5 pe-16 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none text-sm font-mono placeholder:text-gray-400 text-left"
        />
        <div className="absolute inset-y-0 end-0 flex items-center pe-3 gap-1.5">
          {displayValue && (
            <button
              type="button"
              onClick={handleClear}
              className="text-gray-400 hover:text-gray-600 p-1 rounded-md transition"
              title="مسح التاريخ"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
          <div
            className="relative w-6 h-6 flex items-center justify-center cursor-pointer text-gray-400 hover:text-rose-500 transition"
            title="فتح التقويم"
          >
            <Calendar className="w-4 h-4 pointer-events-none" />
            <input
              type="date"
              ref={hiddenPickerRef}
              value={value ? value.slice(0, 10) : ""}
              onChange={handleCalendarChange}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
              tabIndex={-1}
              aria-label="اختر التاريخ من التقويم"
            />
          </div>
        </div>
      </div>
      <p className="text-[11px] text-gray-400 mt-1">
        التنسيق: اليوم / الشهر / السنة (مثال: 25/12/2026)
      </p>
    </div>
  );
}

export default function AdminCouponsPage() {
  const router = useRouter();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAddForm, setShowAddForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // حالة النموذج
  const [formData, setFormData] = useState({
    code: "",
    discountType: "percentage",
    discountValue: "",
    minOrderAmount: "",
    maxDiscount: "",
    usageLimit: "",
    endDate: "",
    isActive: true,
  });

  // التحقق من صلاحية الأدمن
  useEffect(() => {
    const auth = localStorage.getItem("admin-authenticated");
    if (auth !== "true") {
      router.push("/admin/login");
    } else {
      setIsAuthenticated(true);
      fetchCoupons();
    }
  }, [router]);

  // جلب الكوبونات من السيرفر
  const fetchCoupons = async () => {
    try {
      setLoading(true);
      const res = await fetch("/api/admin/coupons");
      const data = await res.json();
      if (res.ok) {
        setCoupons(data.coupons || []);
      } else {
        notify.error(data.error || "فشل في جلب الكوبونات");
      }
    } catch (err) {
      console.error(err);
      notify.error("حدث خطأ أثناء الاتصال بالخادم");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleCreateCoupon = async (e) => {
    e.preventDefault();
    if (!formData.code.trim()) {
      notify.error("يرجى إدخال كود الكوبون");
      return;
    }
    if (!formData.discountValue || Number(formData.discountValue) <= 0) {
      notify.error("قيمة الخصم يجب أن تكون أكبر من 0");
      return;
    }

    try {
      setSubmitting(true);
      const res = await fetch("/api/admin/coupons", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          code: formData.code.trim().toUpperCase(),
          discountType: formData.discountType,
          discountValue: Number(formData.discountValue),
          minOrderAmount: formData.minOrderAmount ? Number(formData.minOrderAmount) : 0,
          maxDiscount: formData.maxDiscount ? Number(formData.maxDiscount) : null,
          usageLimit: formData.usageLimit ? Number(formData.usageLimit) : null,
          endDate: formData.endDate
            ? new Date(
                formData.endDate.includes("T")
                  ? formData.endDate
                  : `${formData.endDate}T23:59:59.999`
              ).toISOString()
            : null,
          isActive: formData.isActive,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        notify.success("تم إنشاء الكوبون بنجاح ✅");
        setFormData({
          code: "",
          discountType: "percentage",
          discountValue: "",
          minOrderAmount: "",
          maxDiscount: "",
          usageLimit: "",
          endDate: "",
          isActive: true,
        });
        setShowAddForm(false);
        fetchCoupons();
      } else {
        notify.error(data.error || "فشل إنشاء الكوبون");
      }
    } catch (err) {
      console.error(err);
      notify.error("حدث خطأ أثناء حفظ الكوبون");
    } finally {
      setSubmitting(false);
    }
  };

  const handleToggleActive = async (coupon) => {
    try {
      const res = await fetch(`/api/admin/coupons/${coupon._id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !coupon.isActive }),
      });
      const data = await res.json();
      if (res.ok) {
        notify.success(
          !coupon.isActive ? "تم تفعيل الكوبون بنجاح" : "تم تعطيل الكوبون"
        );
        fetchCoupons();
      } else {
        notify.error(data.error || "فشل تعديل حالة الكوبون");
      }
    } catch (err) {
      console.error(err);
      notify.error("حدث خطأ أثناء تعديل الكوبون");
    }
  };

  const handleDeleteCoupon = async (id, code) => {
    if (!window.confirm(`هل أنت متأكد من حذف الكوبون (${code})؟`)) {
      return;
    }
    try {
      const res = await fetch(`/api/admin/coupons/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        notify.success("تم حذف الكوبون بنجاح");
        fetchCoupons();
      } else {
        notify.error(data.error || "فشل حذف الكوبون");
      }
    } catch (err) {
      console.error(err);
      notify.error("حدث خطأ أثناء حذف الكوبون");
    }
  };

  const copyCode = (code) => {
    navigator.clipboard.writeText(code);
    notify.success(`تم نسخ الكود: ${code}`);
  };

  // إحصائيات سريعة
  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter(
    (c) => c.isActive && (!c.endDate || new Date(c.endDate) > new Date())
  ).length;
  const totalUsage = coupons.reduce((sum, c) => sum + (c.usedCount || 0), 0);

  if (!isAuthenticated) {
    return (
      <div className="flex justify-center items-center h-64 text-gray-500">
        جاري التحقق من الصلاحيات...
      </div>
    );
  }

  return (
    <div className="space-y-4 sm:space-y-6">
      {/* رأس الصفحة وأزرار التحكم */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 sm:p-5 rounded-2xl shadow-sm border border-gray-100">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800 flex items-center gap-2">
            <Ticket className="w-6 h-6 sm:w-7 sm:h-7 text-rose-500" />
            إدارة كوبونات الخصم
          </h1>
          <p className="text-xs sm:text-sm text-gray-500 mt-1">
            أنشئ كوبونات خصم لعملائك لزيادة المبيعات والترويج لمتجرك
          </p>
        </div>

        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className={`w-full sm:w-auto justify-center flex items-center gap-2 px-5 py-2.5 rounded-xl font-medium transition-all shadow-sm ${
            showAddForm
              ? "bg-gray-200 text-gray-700 hover:bg-gray-300"
              : "bg-gradient-to-r from-rose-400 to-rose-500 text-white hover:from-rose-500 hover:to-rose-600 shadow-rose-200"
          }`}
        >
          {showAddForm ? (
            <>
              <XCircle className="w-5 h-5" />
              إلغاء
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" />
              إضافة كوبون جديد
            </>
          )}
        </button>
      </div>

      {/* كروت الإحصائيات */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">إجمالي الكوبونات</p>
            <p className="text-2xl font-bold text-gray-800 mt-1">{totalCoupons}</p>
          </div>
          <div className="w-12 h-12 bg-rose-50 text-rose-500 rounded-xl flex items-center justify-center">
            <Ticket className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">الكوبونات النشطة</p>
            <p className="text-2xl font-bold text-green-600 mt-1">{activeCoupons}</p>
          </div>
          <div className="w-12 h-12 bg-green-50 text-green-500 rounded-xl flex items-center justify-center">
            <CheckCircle2 className="w-6 h-6" />
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-xs text-gray-500 font-medium">مرات الاستخدام الكلية</p>
            <p className="text-2xl font-bold text-amber-600 mt-1">{totalUsage}</p>
          </div>
          <div className="w-12 h-12 bg-amber-50 text-amber-500 rounded-xl flex items-center justify-center">
            <TrendingUp className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* نموذج إضافة كوبون جديد */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-rose-100 animate-fadeIn">
          <h2 className="text-lg font-bold text-gray-800 mb-4 pb-2 border-b border-gray-100 flex items-center gap-2">
            <Plus className="w-5 h-5 text-rose-500" />
            إنشاء كوبون جديد
          </h2>

          <form onSubmit={handleCreateCoupon} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {/* كود الكوبون */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  كود الكوبون * <span className="text-gray-400 font-normal">(مثال: AMAL10)</span>
                </label>
                <input
                  type="text"
                  name="code"
                  value={formData.code}
                  onChange={(e) =>
                    setFormData({ ...formData, code: e.target.value.toUpperCase() })
                  }
                  required
                  placeholder="AMAL10"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl font-mono uppercase focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none text-sm"
                />
              </div>

              {/* نوع الخصم */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  نوع الخصم *
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, discountType: "percentage" })}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-semibold transition ${
                      formData.discountType === "percentage"
                        ? "bg-rose-50 border-rose-400 text-rose-600"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Percent className="w-3.5 h-3.5" />
                    نسبة مئوية (%)
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData({ ...formData, discountType: "fixed" })}
                    className={`flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl border text-xs font-semibold transition ${
                      formData.discountType === "fixed"
                        ? "bg-rose-50 border-rose-400 text-rose-600"
                        : "border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    <Coins className="w-3.5 h-3.5" />
                    مبلغ ثابت (₪)
                  </button>
                </div>
              </div>

              {/* قيمة الخصم */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  قيمة الخصم *{" "}
                  <span className="text-gray-400 font-normal">
                    ({formData.discountType === "percentage" ? "نسبة %" : "شيكل ₪"})
                  </span>
                </label>
                <input
                  type="number"
                  name="discountValue"
                  min="1"
                  max={formData.discountType === "percentage" ? "100" : undefined}
                  value={formData.discountValue}
                  onChange={handleInputChange}
                  required
                  placeholder={formData.discountType === "percentage" ? "10" : "15"}
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none text-sm"
                />
              </div>

              {/* الحد الأدنى للطلب */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  الحد الأدنى للطلب (₪){" "}
                  <span className="text-gray-400 font-normal">(اختياري)</span>
                </label>
                <input
                  type="number"
                  name="minOrderAmount"
                  min="0"
                  value={formData.minOrderAmount}
                  onChange={handleInputChange}
                  placeholder="0 (بدون حد أدنى)"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none text-sm"
                />
              </div>

              {/* الحد الأقصى للخصم (إذا نسبة) */}
              {formData.discountType === "percentage" && (
                <div>
                  <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                    سقف الخصم الأقصى (₪){" "}
                    <span className="text-gray-400 font-normal">(اختياري)</span>
                  </label>
                  <input
                    type="number"
                    name="maxDiscount"
                    min="1"
                    value={formData.maxDiscount}
                    onChange={handleInputChange}
                    placeholder="بدون حد أقصى"
                    className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none text-sm"
                  />
                </div>
              )}

              {/* الحد الأقصى لمرات الاستخدام */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  الحد الأقصى لمرات الاستخدام{" "}
                  <span className="text-gray-400 font-normal">(اختياري)</span>
                </label>
                <input
                  type="number"
                  name="usageLimit"
                  min="1"
                  value={formData.usageLimit}
                  onChange={handleInputChange}
                  placeholder="غير محدود"
                  className="w-full px-3.5 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-rose-400 focus:border-rose-400 outline-none text-sm"
                />
              </div>

              {/* تاريخ انتهاء الصلاحية */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 mb-1.5">
                  تاريخ انتهاء الصلاحية{" "}
                  <span className="text-gray-400 font-normal">(اختياري)</span>
                </label>
                <DateInputDMY
                  value={formData.endDate}
                  onChange={(val) => setFormData({ ...formData, endDate: val })}
                />
              </div>
            </div>

            {/* حالة التفعيل الفوري */}
            <div className="flex items-center gap-2 pt-2">
              <input
                type="checkbox"
                id="isActive"
                name="isActive"
                checked={formData.isActive}
                onChange={handleInputChange}
                className="w-4 h-4 text-rose-500 rounded border-gray-300 focus:ring-rose-400"
              />
              <label htmlFor="isActive" className="text-xs font-medium text-gray-700 cursor-pointer">
                تفعيل الكوبون فوراً للعملاء
              </label>
            </div>

            {/* أزرار الحفظ والإلغاء */}
            <div className="flex justify-end gap-3 pt-3 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-5 py-2 rounded-xl text-gray-600 hover:bg-gray-100 text-sm font-medium transition"
              >
                إلغاء
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="px-6 py-2 bg-gradient-to-r from-rose-400 to-rose-500 text-white rounded-xl text-sm font-semibold hover:from-rose-500 hover:to-rose-600 transition disabled:opacity-60 shadow-sm"
              >
                {submitting ? "جاري الحفظ..." : "حفظ الكوبون"}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* قائمة وجدول الكوبونات */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-5 border-b border-gray-100 flex items-center justify-between">
          <h2 className="font-bold text-gray-800 text-lg">قائمة الكوبونات</h2>
          <span className="text-xs text-gray-500 bg-gray-100 px-3 py-1 rounded-full">
            {coupons.length} كوبون
          </span>
        </div>

        {loading ? (
          <div className="p-12 text-center text-gray-500">جاري تحميل الكوبونات...</div>
        ) : coupons.length === 0 ? (
          <div className="p-12 text-center">
            <Ticket className="w-12 h-12 text-gray-300 mx-auto mb-3" />
            <p className="text-gray-500 font-medium">لا توجد كوبونات مضافة بعد</p>
            <p className="text-xs text-gray-400 mt-1">اضغط على زر "إضافة كوبون جديد" لبدء إنشاء أول كوبون</p>
          </div>
        ) : (
          <div className="overflow-x-auto w-full max-w-full touch-pan-x">
            <table className="w-full min-w-[700px] text-right text-sm">
              <thead className="bg-gray-50 text-gray-600 text-xs font-semibold border-b border-gray-100">
                <tr>
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">الكود</th>
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">قيمة الخصم</th>
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">الحد الأدنى</th>
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">الاستخدام</th>
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">الصلاحية</th>
                  <th className="p-3.5 sm:p-4 whitespace-nowrap">الحالة</th>
                  <th className="p-3.5 sm:p-4 whitespace-nowrap text-center">الإجراءات</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {coupons.map((coupon) => {
                  const isExpired =
                    coupon.endDate && new Date(coupon.endDate) < new Date();
                  const isLimitReached =
                    coupon.usageLimit && coupon.usedCount >= coupon.usageLimit;

                  return (
                    <tr key={coupon._id} className="hover:bg-gray-50/70 transition">
                      {/* الكود */}
                      <td className="p-3.5 sm:p-4 whitespace-nowrap font-mono font-bold text-rose-600">
                        <div className="flex items-center gap-2">
                          <span className="bg-rose-50 px-2.5 py-1 rounded-lg border border-rose-200">
                            {coupon.code}
                          </span>
                          <button
                            onClick={() => copyCode(coupon.code)}
                            title="نسخ الكود"
                            className="text-gray-400 hover:text-gray-600 p-1"
                          >
                            <Copy className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>

                      {/* قيمة الخصم */}
                      <td className="p-3.5 sm:p-4 whitespace-nowrap font-semibold text-gray-800">
                        {coupon.discountType === "percentage" ? (
                          <span className="inline-flex items-center gap-1 text-purple-600 bg-purple-50 px-2 py-0.5 rounded-md text-xs">
                            <Percent className="w-3 h-3" /> {coupon.discountValue}%
                            {coupon.maxDiscount && (
                              <span className="text-gray-400 font-normal">
                                (سقف ₪{coupon.maxDiscount})
                              </span>
                            )}
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-md text-xs">
                            <Coins className="w-3 h-3" /> ₪{coupon.discountValue}
                          </span>
                        )}
                      </td>

                      {/* الحد الأدنى للطلب */}
                      <td className="p-3.5 sm:p-4 whitespace-nowrap text-gray-600 text-xs">
                        {coupon.minOrderAmount > 0
                          ? `₪${coupon.minOrderAmount}`
                          : "بدون حد أدنى"}
                      </td>

                      {/* الاستخدام */}
                      <td className="p-3.5 sm:p-4 whitespace-nowrap text-xs text-gray-700">
                        <span className="font-semibold">{coupon.usedCount || 0}</span>
                        {coupon.usageLimit ? (
                          <span className="text-gray-400"> / {coupon.usageLimit}</span>
                        ) : (
                          <span className="text-gray-400"> (غير محدود)</span>
                        )}
                        {isLimitReached && (
                          <span className="block text-[10px] text-amber-600 font-medium mt-0.5">
                            تم استنفاد الحد
                          </span>
                        )}
                      </td>

                      {/* تاريخ الصلاحية */}
                      <td className="p-3.5 sm:p-4 whitespace-nowrap text-xs text-gray-600">
                        {coupon.endDate ? (
                          <span
                            className={
                              isExpired ? "text-red-500 font-medium" : "text-gray-600"
                            }
                          >
                            {formatDateDMY(coupon.endDate)}
                            {isExpired && " (منتهي)"}
                          </span>
                        ) : (
                          <span className="text-gray-400">دائم</span>
                        )}
                      </td>

                      {/* الحالة */}
                      <td className="p-3.5 sm:p-4 whitespace-nowrap">
                        {isExpired ? (
                          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
                            منتهي
                          </span>
                        ) : !coupon.isActive ? (
                          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-gray-100 text-gray-600 border border-gray-200">
                            معطّل
                          </span>
                        ) : isLimitReached ? (
                          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
                            مستنفد
                          </span>
                        ) : (
                          <span className="inline-flex items-center gap-1 text-xs px-2.5 py-1 rounded-full bg-green-50 text-green-700 border border-green-200">
                            نشط
                          </span>
                        )}
                      </td>

                      {/* الإجراءات */}
                      <td className="p-3.5 sm:p-4 whitespace-nowrap text-center">
                        <div className="flex items-center justify-center gap-2">
                          {/* تفعيل / تعطيل */}
                          <button
                            onClick={() => handleToggleActive(coupon)}
                            className={`p-1.5 rounded-lg text-xs font-medium transition ${
                              coupon.isActive
                                ? "text-amber-600 hover:bg-amber-50"
                                : "text-green-600 hover:bg-green-50"
                            }`}
                            title={coupon.isActive ? "تعطيل الكوبون" : "تفعيل الكوبون"}
                          >
                            {coupon.isActive ? "تعطيل" : "تفعيل"}
                          </button>

                          {/* حذف */}
                          <button
                            onClick={() => handleDeleteCoupon(coupon._id, coupon.code)}
                            className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition"
                            title="حذف الكوبون"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
