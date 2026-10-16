"use client";

export default function CategoryTicker({
  text,
  bgColor = "#d97706",
  textColor = "#ffffff",
}) {
  if (!text || !text.trim()) return null;

  // نكرر النص عدة مرات لضمان تغطية الشاشة بالكامل أثناء الحركة الانسيابية
  const items = Array.from({ length: 8 }, (_, i) => i);

  return (
    <div
      dir="rtl"
      className="w-full overflow-hidden shadow-sm select-none py-2 md:py-2.5 transition-colors duration-300 relative z-20"
      style={{ backgroundColor: bgColor }}
    >
      <div className="animate-ticker-marquee flex whitespace-nowrap">
        {/* المجموعة الأولى */}
        <div className="flex shrink-0 items-center">
          {items.map((idx) => (
            <span
              key={`set1-${idx}`}
              className="inline-flex items-center gap-3 px-4 font-bold text-xs sm:text-sm md:text-base tracking-wide"
              style={{ color: textColor }}
            >
              <span className="opacity-70">—</span>
              <span>{text}</span>
            </span>
          ))}
        </div>

        {/* المجموعة الثانية (نسخة مطابقة لضمان حركة لا نهائية سلسة) */}
        <div className="flex shrink-0 items-center" aria-hidden="true">
          {items.map((idx) => (
            <span
              key={`set2-${idx}`}
              className="inline-flex items-center gap-3 px-4 font-bold text-xs sm:text-sm md:text-base tracking-wide"
              style={{ color: textColor }}
            >
              <span className="opacity-70">—</span>
              <span>{text}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
