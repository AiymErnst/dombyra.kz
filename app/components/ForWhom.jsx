import { Placeholder } from "./ui";

// app/components/ForWhom.jsx
//
// Раньше карточки были плоские: иконка + текст + переменное число фото
// в ряд (2 или 3 в зависимости от карточки). Айым попросила привести
// к тому же виду, что карточки философии на странице "О нас":
// скруглённые, ровно 2 фото с номером-бейджем на первом, и цветная
// плашка снизу вместо иконки сверху.
//
// Тексты по-прежнему из dict.forWhom.*, тот же принцип запасного текста.
const FALLBACK_CARDS = [
  {
    title: "Традиция и связь с корнями",
    text: "Домбра — это то, что вы передадите детям. Семейные вечера с музыкой запомнятся им на всю жизнь.",
    conclusion: "Если вы цените традиции — домбра для вас.",
    tag: "Семья",
    photoHints: ["Фото: семья играет дома", "Фото: старшие учат младших"],
    numBg: "bg-white text-brand-ink",
    tagBg: "bg-brand-blue",
    tagText: "text-white",
  },
  {
    title: "Украшает пространство",
    text: "Не просто инструмент, а часть интерьера с глубоким смыслом — ей можно любоваться, как картиной.",
    conclusion: "Хотите украсить дом чем-то живым — домбра для вас.",
    tag: "Интерьер",
    photoHints: ["Фото: домбра на стене", "Фото: в интерьере"],
    numBg: "bg-brand-lime text-brand-ink",
    tagBg: "bg-brand-lime",
    tagText: "text-brand-ink",
  },
  {
    title: "Статусный подарок",
    text: "Живая музыкальная история — достойный подарок коллеге, руководителю или иностранному гостю.",
    conclusion: "Ищете статусный подарок — это домбра.",
    tag: "Подарок",
    photoHints: ["Фото: подарок, упаковка", "Фото: вручение"],
    numBg: "bg-white text-brand-ink",
    tagBg: "bg-brand-teal",
    tagText: "text-white",
  },
  {
    title: "Польза для ума и тела",
    text: "Тренирует память и усидчивость, развивает моторику пальцев — в любом возрасте.",
    conclusion: "Хотите полезное хобби — домбра для вас.",
    tag: "Развитие",
    photoHints: ["Фото: руки на грифе", "Фото: ребёнок учится"],
    numBg: "bg-brand-ink text-brand-lime",
    tagBg: "bg-brand-ink",
    tagText: "text-brand-lime",
  },
];

export default function ForWhom({ dict }) {
  const f = dict?.forWhom || {};
  const cards = f.cards?.length === 4 ? f.cards : FALLBACK_CARDS;

  return (
    <section className="bg-brand-bg px-5 py-14 lg:py-20">
      <div className="lg:mx-auto lg:max-w-[1180px] lg:px-7">
        <span className="inline-block rounded-full border border-brand-ink/20 px-3 py-1.5 font-brand text-[10px] font-bold tracking-[0.14em] text-brand-ink/60">
          {f.badge || "ДЛЯ КОГО"}
        </span>

        <h2 className="mt-4 max-w-[680px] text-balance font-brand text-[28px] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-brand-ink sm:text-[32px] lg:text-[46px]">
          {f.title1 || "Домбра — это не просто инструмент, это "}
          <span className="font-display italic normal-case font-normal tracking-normal text-brand-blue">
            {f.titleAccent || "традиция"}
          </span>
        </h2>

        <p className="mt-4 max-w-[560px] font-brand text-[14px] font-medium leading-relaxed text-brand-ink/62">
          {f.subtitle ||
            "Необязательно быть музыкантом, чтобы играть на домбре. Можно — для себя, для души, простыми мелодиями, которые греют сердце. Научиться можно в любом возрасте."}
        </p>

        <div className="relative mt-9 overflow-hidden rounded-2xl bg-brand-ink px-6 py-8 lg:px-10 lg:py-10">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-1 -top-5 font-brand text-[80px] font-extrabold leading-none text-white/10 lg:text-[110px]"
          >
            «
          </span>
          <p className="relative font-brand text-[20px] font-bold leading-snug text-white lg:text-[28px]">
            {f.quoteMain || "Нағыз қазақ — қазақ емес, нағыз қазақ — домбыра!"}
          </p>
          <p className="relative mt-3 max-w-[560px] font-brand text-[13px] font-medium leading-relaxed text-white/55">
            {f.quoteSub ||
              "Не зря говорят: домбра должна висеть в каждом казахском доме. Это часть культуры, которая живёт в стенах и передаётся из поколения в поколение."}
          </p>
        </div>

        <div className="mt-9 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {cards.map((card, i) => {
            const style = FALLBACK_CARDS[i] || FALLBACK_CARDS[0];
            const hints = card.photoHints?.length === 2 ? card.photoHints : style.photoHints;
            return (
              <div key={i} className="flex h-full flex-col overflow-hidden rounded-2xl bg-white">
                <div className="relative flex h-[240px] flex-none gap-1 p-1">
                  <div className="relative flex-1 overflow-hidden rounded-xl">
                    <Placeholder>{hints[0]}</Placeholder>
                    <span
                      className={`absolute left-2 top-2 flex h-7 w-7 items-center justify-center rounded-full font-brand text-[11px] font-extrabold shadow ${style.numBg}`}
                    >
                      {i + 1}
                    </span>
                  </div>
                  <div className="flex-1 overflow-hidden rounded-xl">
                    <Placeholder>{hints[1]}</Placeholder>
                  </div>
                </div>
                <div className="flex-1 p-4">
                  <div className="font-brand text-[14px] font-extrabold uppercase leading-snug">
                    {card.title}
                  </div>
                  <div className="mt-1.5 font-brand text-[12.5px] font-medium leading-relaxed text-brand-ink/62">
                    {card.text}
                  </div>
                  <div className="mt-2 font-brand text-[12.5px] font-bold text-brand-blue">
                    {card.conclusion}
                  </div>
                </div>
                <div className={`px-4 py-2 ${style.tagBg}`}>
                  <span className={`font-brand text-[9.5px] font-extrabold uppercase tracking-[0.1em] ${style.tagText}`}>
                    {card.tag}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
