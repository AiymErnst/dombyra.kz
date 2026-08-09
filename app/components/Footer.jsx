export default function Footer() {
  return (
    <footer className="bg-brand-ink px-5 py-9 pb-24 text-white lg:px-7">
      <div className="lg:mx-auto lg:max-w-[1180px]">
        <div className="text-[22px] font-extrabold tracking-tight">
          dombyra<span className="text-brand-lime">.kz</span>
        </div>
        <p className="mt-2.5 mb-6 max-w-[280px] font-brand text-[13px] font-medium leading-relaxed text-white/55">
          Мастерская домбыры в Алматы. Традиция, собранная руками — для тех,
          кто играет сегодня.
        </p>
        <div className="grid grid-cols-2 gap-6 lg:grid-cols-3">
          <div className="flex flex-col gap-2.5">
            <div className="font-brand text-[10.5px] font-bold tracking-[0.14em] text-white/40">
              МАГАЗИН
            </div>
            {[
              ["#catalog", "Каталог"],
              ["#catalog", "Аксессуары"],
              ["#certificate", "Сертификат"],
              ["#trainer", "Тренажёр"],
              ["#tuner", "Тюнер"],
            ].map(([href, label]) => (
              <a key={label} href={href} className="font-brand text-[13.5px] font-medium text-white">
                {label}
              </a>
            ))}
          </div>
          <div className="flex flex-col gap-2.5">
            <div className="font-brand text-[10.5px] font-bold tracking-[0.14em] text-white/40">
              О НАС
            </div>
            {[
              ["#video", "Мастерская"],
              ["#blog", "Журнал"],
              ["#reviews", "Отзывы"],
              ["#faq", "Доставка и гарантия"],
            ].map(([href, label]) => (
              <a key={label} href={href} className="font-brand text-[13.5px] font-medium text-white">
                {label}
              </a>
            ))}
          </div>
        </div>
        <div className="mt-7 flex flex-col gap-3.5 border-t border-white/12 pt-5">
          <a href="tel:+77001234567" className="font-brand text-lg font-bold text-brand-lime">
            +7 700 123 45 67
          </a>
          <div className="font-brand text-[13px] font-medium text-white/55">
            Алматы, ул. Панфилова 98
            <br />
            salem@dombyra.kz
          </div>
          <div className="flex gap-2">
            {["IG", "YT", "TT", "WA"].map((s) => (
              <span
                key={s}
                className="flex items-center justify-center border border-white/25 px-3 py-2 font-brand text-[11px] font-bold tracking-[0.1em]"
              >
                {s}
              </span>
            ))}
          </div>
        </div>
        <div className="mt-6 font-brand text-[11px] font-medium text-white/35">
          © {new Date().getFullYear()} dombyra.kz · ИП «Домбыра Ателье» · Публичная оферта
        </div>
      </div>
    </footer>
  );
}
