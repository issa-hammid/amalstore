"use client";

export default function CategoryTicker({
  text,
  bgColor = "#d97706",
  textColor = "#ffffff",
}) {
  if (!text || !text.trim()) return null;

  // 12 تكرار في كل مجموعة لضمان تغطية كاملة لأي شاشة مهما كان عرضها
  const items = Array.from({ length: 12 }, (_, i) => i);

  return (
    <div
      dir="ltr"
      className="w-full overflow-hidden shadow-xs select-none py-2 md:py-2.5 transition-colors duration-300 relative z-20"
      style={{ backgroundColor: bgColor }}
    >
      <div className="animate-ticker-marquee flex whitespace-nowrap">
        {/* المجموعة الأولى */}
        <div className="flex shrink-0 items-center justify-around min-w-full">
          {items.map((idx) => (
            <span
              key={`set1-${idx}`}
              dir="rtl"
              className="inline-flex items-center gap-3 px-5 font-bold text-xs sm:text-sm md:text-base tracking-wide whitespace-nowrap shrink-0"
              style={{ color: textColor }}
            >
              <span>{text}</span>
              <span className="opacity-70 font-normal select-none">✦</span>
            </span>
          ))}
        </div>

        {/* المجموعة الثانية (نسخة مطابقة تماماً لضمان حركة لا نهائية وسلسة بدون أي فراغ) */}
        <div className="flex shrink-0 items-center justify-around min-w-full" aria-hidden="true">
          {items.map((idx) => (
            <span
              key={`set2-${idx}`}
              dir="rtl"
              className="inline-flex items-center gap-3 px-5 font-bold text-xs sm:text-sm md:text-base tracking-wide whitespace-nowrap shrink-0"
              style={{ color: textColor }}
            >
              <span>{text}</span>
              <span className="opacity-70 font-normal select-none">✦</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
