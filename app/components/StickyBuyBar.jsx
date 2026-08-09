import { Button } from "./ui";

export default function StickyBuyBar({ show }) {
  if (!show) return null;

  return (
    <div className="sticky bottom-3.5 z-40 h-0 lg:mx-auto lg:max-w-[1180px]">
      <div className="absolute inset-x-4 bottom-0 flex items-center gap-3 border border-brand-blue bg-white py-2.5 pl-4 pr-2.5 shadow-[0_10px_30px_rgba(20,30,147,0.18)] lg:inset-x-7">
        <div className="min-w-0 flex-1">
          <div className="font-brand text-xs font-bold leading-tight">
            Не знаете, какую выбрать?
          </div>
          <div className="mt-0.5 font-brand text-[11px] font-medium leading-tight text-brand-ink/55">
            Подберём за 5 минут
          </div>
        </div>
        <Button size="sm">Купить</Button>
      </div>
    </div>
  );
}
