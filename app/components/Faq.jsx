import { SectionEyebrow } from "./ui";

// app/components/Faq.jsx
//
// Раньше брал FAQS напрямую из data.js — на русском, без связи с dict.
// Теперь — dict.faq.items, тот же текст как запасной. FAQS в data.js
// этим компонентом больше не используется.
const FALLBACK_FAQS = [
  {
    q: "Как выбрать домбыру новичку?",
    a: "Начните с модели «Тұран»: мягкое натяжение струн и узкая шейка. Напишите нам рост и размер руки — предложим два-три варианта и пришлём записи звука.",
  },
  {
    q: "Сколько ждать доставку?",
    a: "Алматы — курьер в день заказа. Города Казахстана — 1–2 дня. Международная отправка — 5–9 дней, трек присылаем в WhatsApp.",
  },
  {
    q: "Можно услышать инструмент до покупки?",
    a: "Да. У каждой домбыры в каталоге есть аудиозапись и видео 360°. Можем провести живой видеозвонок из мастерской.",
  },
  {
    q: "Есть рассрочка?",
    a: "Kaspi Red и рассрочка 0-0-12 на все модели дороже 100 000 ₸. Для юрлиц — счёт и безнал.",
  },
  {
    q: "Что если инструмент не подойдёт?",
    a: "14 дней на возврат в оригинальной упаковке — вернём полную стоимость, доставку берём на себя.",
  },
];

export default function Faq({ openFaq, onToggle, dict }) {
  const t = dict?.faq || {};
  const items = t.items?.length ? t.items : FALLBACK_FAQS;

  return (
    <section
      id="faq"
      className="scroll-mt-16 bg-white px-5 py-14 lg:mx-auto lg:max-w-[1180px] lg:px-7 lg:py-20"
    >
      <SectionEyebrow>{t.eyebrow || "ВОПРОС — ОТВЕТ"}</SectionEyebrow>
      <h2 className="mt-3 mb-6 font-brand text-[28px] font-extrabold uppercase tracking-[-0.025em] sm:text-[34px] lg:text-[46px]">
        {t.title1 || "Что спрашивают"}{" "}
        <span className="font-display italic normal-case font-normal tracking-normal text-brand-blue">
          {t.title2 || "чаще всего"}
        </span>
      </h2>
      <div>
        {items.map((faq, i) => {
          const isOpen = openFaq === i;
          return (
            <div key={i} className="border-t border-brand-border last:border-b">
              <button
                onClick={() => onToggle(isOpen ? -1 : i)}
                className="flex w-full cursor-pointer items-start gap-3.5 border-none bg-transparent py-5 text-left"
              >
                <span className="flex-1 font-brand text-[15px] font-bold leading-snug">
                  {faq.q}
                </span>
                <span
                  className={`w-5 flex-none font-brand text-xl font-bold text-brand-blue transition-transform duration-150 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <p className="m-0 pb-5 pr-8 font-brand text-sm font-medium leading-relaxed text-brand-ink/62">
                  {faq.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
