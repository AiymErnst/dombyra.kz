import { Placeholder } from "./ui";

// app/components/ForWhom.jsx
//
// Блок "Для кого" — четыре месседжа, кому и зачем нужна домбра.
// Стоит на главной сразу после CatalogPreview (см. LandingPage.jsx).
// Тексты полностью в dict.forWhom — если блока ещё нет в locales/*.json,
// используются русские запасные тексты (тот же приём, что у CatalogPreview),
// сборка не падает.
//
// У каждой карточки строка из фото (2-3 штуки) под текстом — как в
// референсе (карточки "Дом с душой" / "Статусный подарок" с рядом
// маленьких фото). Реальных фото пока нет, на их месте Placeholder
// (тот же компонент, что в Hero.jsx) с подписью, какой кадр сюда нужен.
// Когда фото появятся — заменить Placeholder на <Image src="..." fill
// className="object-cover" .../> и добавить import Image from "next/image";
// вверху файла, сама сетка/отступы вокруг не меняются.

const ICONS = {
  home: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 11.5 12 4l9 7.5" />
      <path d="M5.5 10v9a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-9" />
    </svg>
  ),
  frame: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="1.5" />
      <circle cx="9" cy="10" r="1.6" />
      <path d="M20 16.5 15 11l-9 9" />
    </svg>
  ),
  gift: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3.5" y="9" width="17" height="11" rx="1" />
      <path d="M3.5 13h17" />
      <path d="M12 9v11" />
      <path d="M12 9C9 9 8 7.3 8 6a2 2 0 0 1 4 0c0-1.3-1-2-4-2M12 9c3 0 4-1.7 4-3a2 2 0 0 0-4 0c0-1.3 1-2 4-2" />
    </svg>
  ),
  brain: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M9 4.5a2.5 2.5 0 0 0-2.5 2.5v.3A2.7 2.7 0 0 0 4.5 10v1a2.7 2.7 0 0 0 1 2.1V14a3 3 0 0 0 3 3h.5" />
      <path d="M15 4.5a2.5 2.5 0 0 1 2.5 2.5v.3A2.7 2.7 0 0 1 19.5 10v1a2.7 2.7 0 0 1-1 2.1V14a3 3 0 0 1-3 3h-.5" />
      <path d="M9 4.5V18a2 2 0 0 0 2 2h2a2 2 0 0 0 2-2V4.5" />
      <path d="M9 9h2M13 9h2M9 13h2M13 13h2" />
    </svg>
  ),
};

// подписи для Placeholder — что за фото должно быть в каждой позиции.
// количество подписей = количество фото в строке у этой карточки:
// у "традиции" и "пользы" — 3 кадра, у "интерьера" и "подарка" — 2
// (просто чтобы сетка не выглядела монотонно, число можно менять свободно)
const FALLBACK_CARDS = [
  {
    icon: "home",
    title: "Традиция и связь с корнями",
    text: "Домбра — это то, что вы передадите детям. Семейные вечера с музыкой запомнятся им на всю жизнь. Качественная домбра служит десятилетиями и становится настоящей семейной ценностью.",
    conclusion: "Если вы цените традиции и хотите передать их детям — домбра для вас.",
    photoHints: [
      "Фото: семья играет на домбре дома",
      "Фото: старшее поколение учит младшее",
      "Фото: домбра передаётся из рук в руки",
    ],
  },
  {
    icon: "frame",
    title: "Украшает пространство",
    text: "Домбра ручной работы — не просто инструмент, а часть интерьера с глубоким смыслом. Она наполняет дом особой энергией и наследием предков. Ей можно любоваться, как картиной, — гости обязательно обратят внимание, а вы сможете сыграть что-то на память.",
    conclusion: "Если вы хотите украсить дом чем-то живым и настоящим — домбра для вас.",
    photoHints: [
      "Фото: домбра на стене как часть интерьера",
      "Фото: домбра в светлом премиальном интерьере",
    ],
  },
  {
    icon: "gift",
    title: "Статусный подарок",
    text: "Не сувенир, который забудут на следующий день, а живая музыкальная история — достойный подарок коллеге, руководителю, партнёру по бизнесу или иностранному гостю. Домбра ручной работы говорит о вкусе дарящего лучше любых слов.",
    conclusion: "Если вы ищете запоминающийся статусный подарок — это домбра.",
    photoHints: [
      "Фото: домбра как подарок, красивая упаковка",
      "Фото: вручение домбры",
    ],
  },
  {
    icon: "brain",
    title: "Польза для ума и тела",
    text: "Игра на домбре тренирует память и усидчивость, развивает моторику пальцев, создаёт новые нейронные связи — в любом возрасте.",
    conclusion: "Если вы хотите новое полезное хобби для себя или ребёнка — домбра для вас.",
    photoHints: [
      "Фото: крупный план — руки на грифе",
      "Фото: ребёнок учится играть",
      "Фото: взрослый увлечённо играет",
    ],
  },
];

export default function ForWhom({ dict }) {
  const f = dict?.forWhom || {};
  const cards = f.cards?.length === 4 ? f.cards : FALLBACK_CARDS;

  return (
    <section className="bg-brand-bg px-5 py-12 lg:py-20">
      <div className="lg:mx-auto lg:max-w-[1180px] lg:px-7">
        <span className="inline-block border border-brand-ink/20 px-2.5 py-1 font-brand text-[10px] font-bold tracking-[0.14em] text-brand-ink/60">
          {f.badge || "ДЛЯ КОГО"}
        </span>

        <h2 className="mt-4 max-w-[640px] text-balance font-brand text-[28px] font-extrabold uppercase leading-[1.05] tracking-[-0.02em] text-brand-ink lg:text-[44px]">
          {f.title1 || "Домбра — это не просто инструмент, это "}
          <span className="text-brand-blue">{f.titleAccent || "традиция"}</span>
        </h2>

        <p className="mt-3.5 max-w-[520px] font-brand text-[14px] font-medium leading-relaxed text-brand-ink/62 lg:text-[16px]">
          {f.subtitle ||
            "Необязательно быть музыкантом, чтобы играть на домбре. Можно — для себя, для души, простыми мелодиями, которые греют сердце. Научиться можно в любом возрасте."}
        </p>

        {/* цитата */}
        <div className="relative mt-8 overflow-hidden bg-brand-ink px-6 py-7 lg:mt-10 lg:px-10 lg:py-9">
          <span
            aria-hidden="true"
            className="pointer-events-none absolute -left-1 -top-4 font-brand text-[64px] font-extrabold leading-none text-white/10 lg:text-[96px]"
          >
            «
          </span>
          <p className="relative font-brand text-[19px] font-bold leading-snug text-white lg:text-[26px]">
            {f.quoteMain || "Нағыз қазақ — қазақ емес, нағыз қазақ — домбыра!"}
          </p>
          <p className="relative mt-3 max-w-[560px] font-brand text-[13px] font-medium leading-relaxed text-white/55 lg:text-[14px]">
            {f.quoteSub ||
              "Не зря говорят: домбра должна висеть в каждом казахском доме. Это часть культуры, которая живёт в стенах и передаётся из поколения в поколение."}
          </p>
        </div>

        {/* карточки — иконка+текст сверху, строка из фото снизу */}
        <div className="mt-8 grid grid-cols-1 gap-8 lg:mt-10 lg:grid-cols-2 lg:gap-10">
          {cards.map((card, i) => {
            const hints = card.photoHints?.length
              ? card.photoHints
              : FALLBACK_CARDS[i]?.photoHints || ["Фото"];
            return (
              <div key={i} className="bg-white p-5 lg:p-7">
                <span className="flex h-9 w-9 items-center justify-center border border-brand-border text-brand-blue lg:h-10 lg:w-10">
                  <span className="h-5 w-5">{ICONS[card.icon] || ICONS.home}</span>
                </span>
                <h3 className="mt-3.5 font-brand text-[16px] font-bold text-brand-ink lg:text-[18px]">
                  {card.title}
                </h3>
                <p className="mt-1.5 font-brand text-[13px] font-medium leading-relaxed text-brand-ink/62 lg:text-[14px]">
                  {card.text}
                </p>
                <p className="mt-2.5 font-brand text-[13px] font-bold leading-snug text-brand-blue lg:text-[14px]">
                  {card.conclusion}
                </p>

                {/* строка фото — 2 или 3 кадра, столько же колонок */}
                <div
                  className="mt-4 grid gap-2"
                  style={{ gridTemplateColumns: `repeat(${hints.length}, minmax(0, 1fr))` }}
                >
                  {hints.map((hint, hi) => (
                    <div key={hi} className="relative aspect-square overflow-hidden">
                      <Placeholder>{hint}</Placeholder>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
