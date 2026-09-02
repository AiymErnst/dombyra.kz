import { CONTACT_WHATSAPP_URL } from "@/app/components/data";

// app/[locale]/katalog/DecorationsGallery.jsx
//
// Вынесена из page.js в отдельный файл, чтобы использовать её на двух
// страницах: странице каталога целиком и странице отдельной домбры
// (Айым попросила продублировать блок там же, внизу).
const DECORATION_PHOTOS = [
  "Серебряная накладка на голову",
  "Гравировка с именем",
  "Ру танба на грифе",
  "Узоры сбоку корпуса",
  "Костяная накладка",
  "Деревянная резьба",
];

export default function DecorationsGallery({ dict }) {
  const decorations = dict?.catalogPage?.decorations || {};

  return (
    <section className="mt-16 border-t border-brand-border pt-10 lg:mt-24">
      <h2 className="font-brand text-[24px] font-extrabold uppercase tracking-[-0.02em] text-brand-ink lg:text-[32px]">
        {decorations.title || "Дополнительно"}
      </h2>
      <p className="mt-3 max-w-[640px] font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/65 lg:text-[14.5px]">
        {decorations.subtitle ||
          "По желанию можно добавить накладку на голову из серебра, кости или дерева с бесплатной гравировкой, ру танба, узоры на грифе и сбоку корпуса, звукосниматель."}
      </p>

      <div data-row className="mt-6 flex gap-3 overflow-x-auto pb-2">
        {(decorations.photos?.length ? decorations.photos : DECORATION_PHOTOS).map(
          (caption, i) => (
            <div
              key={i}
              className="h-[190px] w-[220px] flex-none overflow-hidden rounded-2xl border border-brand-border bg-brand-bg"
            >
              <div className="flex h-full w-full items-center justify-center px-3 text-center font-brand text-[11px] font-medium text-brand-ink/40">
                {caption}
              </div>
            </div>
          )
        )}
      </div>

      
        href={`${CONTACT_WHATSAPP_URL}?text=${encodeURIComponent(
          decorations.prefillMessage || "Здравствуйте! Хочу узнать про украшения для домбры."
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 font-brand text-[13px] font-bold text-white transition-colors hover:bg-brand-blue-dark"
      >
        {decorations.cta || "Выбрать украшения"} <span>›</span>
      </a>
    </section>
  );
}
