import { CONTACT_WHATSAPP_URL } from "@/app/components/data";

// app/[locale]/katalog/DecorationsGallery.jsx
//
// Используется на двух страницах: странице каталога целиком и странице
// отдельной домбры. Текст переведён прямо здесь, на 4 языках, без
// обращения к dict — так же, как характеристики на странице товара.
const TEXT_BY_LOCALE = {
  ru: {
    title: "Дополнительно",
    subtitle:
      "По желанию можно добавить накладку на голову из серебра, кости или дерева с бесплатной гравировкой, ру танба, узоры на грифе и сбоку корпуса, звукосниматель.",
    photos: [
      "Серебряная накладка на голову",
      "Гравировка с именем",
      "Ру танба на грифе",
      "Узоры сбоку корпуса",
      "Костяная накладка",
      "Деревянная резьба",
    ],
    cta: "Выбрать украшения",
    prefillMessage: "Здравствуйте! Хочу узнать про украшения для домбры.",
  },
  kz: {
    title: "Қосымша",
    subtitle:
      "Қалауыңыз бойынша басына күмістен, сүйектен немесе ағаштан қаптама тегін гравировкамен, ру таңба, грифке және корпустың бүйіріне өрнек, дыбыс қабылдағыш қосуға болады.",
    photos: [
      "Басына күміс қаптама",
      "Атпен гравировка",
      "Грифтегі ру таңба",
      "Корпус бүйіріндегі өрнек",
      "Сүйек қаптама",
      "Ағаш ою",
    ],
    cta: "Әшекей таңдау",
    prefillMessage: "Сәлеметсіз бе! Домбыраға арналған әшекейлер туралы білгім келеді.",
  },
  en: {
    title: "Extras",
    subtitle:
      "On request we can add a silver, bone, or wood headstock plate with free engraving, a clan tamga, patterns on the neck and sides of the body, or a pickup.",
    photos: [
      "Silver headstock plate",
      "Engraving with a name",
      "Clan tamga on the neck",
      "Patterns on the sides of the body",
      "Bone plate",
      "Wood carving",
    ],
    cta: "Choose decorations",
    prefillMessage: "Hello! I'd like to ask about decorations for a dombra.",
  },
  tr: {
    title: "Ek özellikler",
    subtitle:
      "İsteğe bağlı olarak gümüş, kemik veya ahşap baş kaplaması ücretsiz gravürle, boy damgası, sap ve gövde yanlarına desen ya da manyetik alıcı eklenebilir.",
    photos: [
      "Gümüş baş kaplaması",
      "İsimle gravür",
      "Saptaki boy damgası",
      "Gövde yanlarındaki desenler",
      "Kemik kaplama",
      "Ahşap oyma",
    ],
    cta: "Süsleme seç",
    prefillMessage: "Merhaba! Dombra süslemeleri hakkında bilgi almak istiyorum.",
  },
};

export default function DecorationsGallery({ locale }) {
  const t = TEXT_BY_LOCALE[locale] || TEXT_BY_LOCALE.ru;

  return (
    <section className="mt-16 border-t border-brand-border pt-10 lg:mt-24">
      <h2 className="font-brand text-[24px] font-extrabold uppercase tracking-[-0.02em] text-brand-ink lg:text-[32px]">
        {t.title}
      </h2>
      <p className="mt-3 max-w-[640px] font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/65 lg:text-[14.5px]">
        {t.subtitle}
      </p>

      <div data-row className="mt-6 flex gap-3 overflow-x-auto pb-2">
        {t.photos.map((caption, i) => (
          <div
            key={i}
            className="h-[190px] w-[220px] flex-none overflow-hidden rounded-2xl border border-brand-border bg-brand-bg"
          >
            <div className="flex h-full w-full items-center justify-center px-3 text-center font-brand text-[11px] font-medium text-brand-ink/40">
              {caption}
            </div>
          </div>
        ))}
      </div>

      
        href={`${CONTACT_WHATSAPP_URL}?text=${encodeURIComponent(t.prefillMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6 py-3.5 font-brand text-[13px] font-bold text-white transition-colors hover:bg-brand-blue-dark"
      >
        {t.cta} <span>›</span>
      </a>
    </section>
  );
}
