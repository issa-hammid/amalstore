/**
 * أداة مساعدة لإدارة وتحسين روابط الصور ومعالجة أخطاء التحميل
 */

export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 400' width='400' height='400'%3E%3Crect width='400' height='400' fill='%23f8fafc'/%3E%3Cg fill='none' stroke='%23cbd5e1' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Crect x='100' y='90' width='200' height='200' rx='16' fill='%23ffffff' stroke='%23e2e8f0'/%3E%3Cpath d='M140 230l35-35a10 10 0 0 1 14 0l45 45'/%3E%3Cpath d='M220 220l15-15a10 10 0 0 1 14 0l25 25'/%3E%3Ccircle cx='165' cy='150' r='16' fill='%23fef3c7' stroke='%23f59e0b' stroke-width='2'/%3E%3C/g%3E%3Ctext x='50%25' y='330' dominant-baseline='middle' text-anchor='middle' fill='%2394a3b8' font-family='sans-serif' font-weight='600' font-size='16'%3E%D8%A3%D9%85%D9%84 %D8%B3%D8%AA%D9%88%D8%B1%3C/text%3E%3C/svg%3E";

/**
 * تحسين رابط الصورة عبر ImageKit أو Cloudinary لتسريع التحميل وتوفير الباندويث
 * @param {string} url - رابط الصورة الأصلي
 * @param {object} options - خيارات التحسين (width, quality, thumbnail)
 * @returns {string} رابط محسن
 */
export function getOptimizedImageUrl(url, { width = 500, quality = 80, thumbnail = false } = {}) {
  if (!url || typeof url !== "string") {
    return PLACEHOLDER_IMAGE;
  }

  const trimmed = url.trim();
  if (!trimmed) return PLACEHOLDER_IMAGE;

  // عدم تعديل روابط الـ Data URI والـ Blob والمسارات المحلية
  if (trimmed.startsWith("data:") || trimmed.startsWith("blob:") || trimmed.startsWith("/")) {
    return trimmed;
  }

  // دعم وتحسين خوادم ImageKit
  if (trimmed.includes("ik.imagekit.io")) {
    const w = thumbnail ? 120 : width;
    const q = thumbnail ? 75 : quality;
    const transformParam = `tr=w-${w},q-${q},f-auto`;

    // إذا كان الرابط يحتوي بالفعل على معلمات تحويل
    if (trimmed.includes("tr=")) {
      return trimmed;
    }

    const separator = trimmed.includes("?") ? "&" : "?";
    return `${trimmed}${separator}${transformParam}`;
  }

  // دعم وتحسين روابط Cloudinary القديمة إن وجدت
  if (trimmed.includes("cloudinary.com") && trimmed.includes("/upload/")) {
    const w = thumbnail ? 120 : width;
    const q = thumbnail ? 75 : quality;
    if (!trimmed.includes("/upload/w_") && !trimmed.includes("/upload/f_auto")) {
      return trimmed.replace("/upload/", `/upload/w_${w},q_${q},f_auto/`);
    }
  }

  return trimmed;
}

/**
 * معالج موحد لأخطاء تحميل الصور يمنع التكرار اللانهائي ويستبدل الصورة بالبديل الأنيق
 * @param {Event} event - حدث الخطأ
 * @param {string} fallbackSrc - الصورة البديلة
 */
export function handleImageError(event, fallbackSrc = PLACEHOLDER_IMAGE) {
  if (event && event.currentTarget) {
    event.currentTarget.onerror = null; // يمنع اللوب اللانهائي في حال فشل البديل
    event.currentTarget.src = fallbackSrc;
  }
}
