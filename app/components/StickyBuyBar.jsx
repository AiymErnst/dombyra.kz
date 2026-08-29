import { Button } from "./ui";

// app/components/StickyBuyBar.jsx
// Раньше не принимал dict — текст был захардкожен на русском.
export default function StickyBuyBar({ show, dict }) {
  const t = dict?.stickyBar || {};
  if (!show) return null;

  return (
    <div className="sticky bottom-3.5 z-40 h-0 lg:mx-auto lg:max-w-[1180px]">
      <div className="absolute inset-x-4 bottom-0 flex items-center gap-3 rounded-2xl border border-brand-blue bg-white py-3 pl-5 pr-3 shadow-[0_10px_30px_rgba(20,30,147,0.18)] lg:inset-x-7">
        <div className="min-w-0 flex-1">
          <div className="font-brand text-xs font-bold leading-tight">
            {t.title || "Не знаете, какую выбрать?"}
          </div>
          <div className="mt-0.5 font-brand text-[11px] font-medium leading-tight text-brand-ink/55">
            {t.subtitle || "Подберём за 10 минут"}
          </div>
        </div>
        <a href="#lead">
          <Button size="sm">{t.cta || "Купить"}</Button>
        </a>
      </div>
    </div>
  );
}
