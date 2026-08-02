"use client";

import { useEffect, useRef, useState } from "react";

// ---------- контент (тексты, цены, отзывы) ----------
// Вынесено в массивы, чтобы позже было легко перевести на Supabase —
// пока просто редактируется прямо здесь.

const CATALOG = [
  { name: "Асыл", subtitle: "Ель / клён · классика", price: "185 000 ₸", badge: "Хит" },
  { name: "Дала", subtitle: "Кедр / орех · концертная", price: "320 000 ₸" },
  { name: "Тұран", subtitle: "Сосна · для начинающих", price: "96 000 ₸", badge: "Новинка" },
  { name: "Кербез", subtitle: "Орех / перламутр · премиум", price: "540 000 ₸" },
];

const TRAINER_CARDS = [
  { caption: "Подсветка ладов в темпе мелодии", ph: "GIF: подсказки по ладам" },
  { caption: "Тренажёр слышит фальшь и поправляет", ph: "GIF: проверка звука" },
  { caption: "Прогресс по 40 мелодиям", ph: "GIF: прогресс и мелодии" },
];

const TUNER_STEPS = [
  { num: "01", title: "Слышит обе струны", desc: "Ре и соль определяются автоматически" },
  { num: "02", title: "Точность ±1 цент", desc: "Стрелка показывает, куда крутить колок" },
  { num: "03", title: "Без установки", desc: "Работает в браузере телефона" },
  { num: "04", title: "Всем и навсегда", desc: "Без регистрации и оплаты" },
];

const WHY_TAGS = [
  { label: "Гарантия 3 года", filled: true },
  { label: "Бесплатный тренажёр", filled: true },
  { label: "Опытные мастера" },
  { label: "Премиум качество" },
  { label: "Качественные материалы" },
  { label: "Эксклюзивные дизайны" },
  { label: "Превосходное звучание", filled: true },
  { label: "Свободная кастомизация" },
  { label: "Бесплатная доставка по КЗ" },
];

const REVIEWS = [
  {
    text: "Взял «Дала» для концертов. Строй держит весь вечер, звук плотный, на подзвучке не гудит. Кейс серьёзный — летал с ней трижды.",
    name: "Алишер Қ.",
    role: "домбрист, Астана",
  },
  {
    text: "Дочке купили «Тұран» на 9 лет. Помогли выбрать размер по руке, прислали запись звука до оплаты. Через месяц играет кюй.",
    name: "Динара С.",
    role: "Алматы",
  },
  {
    text: "Заказывал в Берлин. Дошло за девять дней, ни одной трещины. Мастер ответил на все вопросы про уход в мессенджере.",
    name: "Ержан М.",
    role: "Берлин",
  },
];

const FAQS = [
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

const BLOG_POSTS = [
  {
    category: "Гид",
    time: "6 мин",
    title: "Как выбрать первую домбыру и не переплатить",
    desc: "Порода дерева, длина шейки, натяжение — что действительно влияет на звук.",
  },
  {
    category: "Уход",
    time: "4 мин",
    title: "Пять правил, которые продлят жизнь инструменту",
    desc: "Влажность, хранение, замена струн и что делать зимой.",
  },
  {
    category: "Культура",
    time: "8 мин",
    title: "Кюй: с чего начать слушать",
    desc: "Десять записей от Құрманғазы до современных домбристов.",
  },
];

const VIDEOS = [
  { id: "XxbLTkQ4pnI", title: "Как звучит «Асыл» — три кюя подряд", duration: "8:12" },
  { id: "iEqXHYvEsK4", title: "Мастерская: от доски до готовой домбыры", duration: "12:40" },
  { id: "Rq6HWfL9lD8", title: "Первый урок: постановка руки за 6 минут", duration: "6:05" },
];

const NAV_LINKS = [
  { href: "#catalog", label: "Каталог" },
  { href: "#certificate", label: "Сертификат" },
  { href: "#trainer", label: "Тренажёр" },
  { href: "#tuner", label: "Тюнер", badge: "FREE" },
  { href: "#why", label: "Почему мы" },
  { href: "#reviews", label: "Отзывы" },
  { href: "#blog", label: "Журнал" },
];

// ---------- мелкие переиспользуемые кусочки ----------

function Placeholder({ children }) {
  return (
    <div className="flex h-full w-full items-center justify-center bg-brand-bg p-2.5 text-center font-brand text-[11px] font-medium text-brand-ink/40">
      {children}
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-block rounded-full bg-brand-lime px-2.5 py-1 font-brand text-[10px] font-extrabold uppercase tracking-[0.1em] text-brand-ink">
      {children}
    </span>
  );
}

function Button({ children, variant = "primary", size = "lg", className = "", ...props }) {
  const base =
    "font-brand font-bold rounded-full cursor-pointer transition-colors duration-150 inline-flex items-center justify-center";
  const variants = {
    primary: "bg-brand-blue text-white hover:bg-brand-blue-dark",
    secondary:
      "bg-transparent text-brand-blue border-[1.5px] border-brand-blue hover:bg-brand-bg",
  };
  const sizes = {
    sm: "px-4.5 py-2.5 text-xs",
    md: "px-5.5 py-3.5 text-[13px]",
    lg: "px-6.5 py-4.5 text-sm",
  };
  return (
    <button
      type="button"
      className={`${base} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}

function SectionEyebrow({ children }) {
  return (
    <span className="font-brand text-[10.5px] font-bold tracking-[0.16em] text-brand-teal">
      {children}
    </span>
  );
}

// ---------- основной компонент ----------

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const sentinelRef = useRef(null);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const el = sentinelRef.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setShowStickyBar(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { threshold: 0 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="relative overflow-x-clip bg-white font-brand text-brand-ink">
      {/* ---------- шапка ---------- */}
      <header className="sticky top-0 z-50 flex items-center justify-between gap-3 border-b border-brand-border bg-white/92 px-4 py-3 backdrop-blur-md lg:px-[max(28px,calc((100%-1180px)/2))]">
        <button
          onClick={() => setMenuOpen(true)}
          aria-label="Открыть меню"
          className="flex h-11 w-11 flex-col justify-center gap-[5px] border-none bg-transparent pl-0.5 lg:hidden"
        >
          <span className="block h-0.5 w-[22px] bg-brand-blue" />
          <span className="block h-0.5 w-3.5 bg-brand-ink" />
          <span className="block h-0.5 w-[22px] bg-brand-ink" />
        </button>

        <div className="text-[17px] font-extrabold tracking-tight">
          dombyra<span className="text-brand-blue">.kz</span>
        </div>

        <nav className="hidden items-center gap-6 lg:flex">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="flex items-center gap-1.5 font-brand text-[13px] font-semibold text-brand-ink hover:text-brand-teal"
            >
              {link.label}
              {link.badge && (
                <span className="rounded-full bg-brand-lime px-1.5 py-1 font-brand text-[8.5px] font-extrabold tracking-[0.1em] text-brand-ink">
                  {link.badge}
                </span>
              )}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <span className="font-brand text-[11px] font-bold tracking-[0.1em] text-brand-ink/40">
            KZ
          </span>
          <span className="h-3 w-px bg-brand-border" />
          <span className="font-brand text-[11px] font-bold tracking-[0.1em] text-brand-blue">
            RU
          </span>
        </div>
      </header>

      {/* ---------- мобильное меню ---------- */}
      {menuOpen && (
        <div className="fixed inset-0 z-[60] flex flex-col overflow-y-auto bg-brand-bg px-5 pb-8 pt-4 lg:hidden">
          <div className="mb-7 flex h-11 items-center justify-between">
            <div className="text-[17px] font-extrabold tracking-tight">
              dombyra<span className="text-brand-blue">.kz</span>
            </div>
            <button
              onClick={closeMenu}
              aria-label="Закрыть меню"
              className="flex h-11 w-11 items-center justify-center border-none bg-transparent text-[26px] font-bold text-brand-blue"
            >
              ×
            </button>
          </div>
          <nav className="flex flex-col">
            {[...NAV_LINKS, { href: "#video", label: "Видео" }].map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={closeMenu}
                className="flex items-center gap-2.5 border-b border-[#D8E0EE] py-2.5 font-brand text-[30px] font-extrabold leading-[1.15] tracking-tight text-brand-ink last:border-b-0"
              >
                {link.label}
                {link.badge && (
                  <span className="rounded-full bg-brand-lime px-1.5 py-1 font-brand text-[9.5px] font-extrabold tracking-[0.12em] text-brand-ink">
                    БЕСПЛАТНО
                  </span>
                )}
              </a>
            ))}
          </nav>
          <div className="mt-auto flex flex-col gap-3.5 pt-8">
            <a href="tel:+77001234567" className="font-brand text-xl font-bold">
              +7 700 123 45 67
            </a>
            <div className="font-brand text-[13px] text-brand-ink/60">
              Алматы, ул. Панфилова 98
              <br />
              Ежедневно 10:00 — 20:00
            </div>
            <Button className="w-full">Купить домбру</Button>
          </div>
        </div>
      )}

      {/* ---------- hero ---------- */}
      <section className="bg-white px-5 pt-8 lg:mx-auto lg:max-w-[1180px] lg:px-7 lg:pb-2 lg:pt-[72px]">
        <div className="inline-flex items-center gap-2 border border-[#C9D4EA] bg-brand-bg px-3 py-1.5">
          <span className="h-1.5 w-1.5 bg-brand-lime" />
          <span className="whitespace-nowrap font-brand text-[10px] font-bold tracking-[0.14em] text-brand-blue">
            ҚОЛДАН ЖАСАЛҒАН · АЛМАТЫ
          </span>
        </div>
        <h1 className="mt-4.5 text-balance font-brand text-[40px] font-extrabold uppercase leading-[0.98] tracking-[-0.035em] lg:text-[82px] lg:leading-[0.92]">
          Домбыра
          <br />
          <span className="text-brand-blue">твой голос</span>
        </h1>
        <p className="mt-3.5 max-w-[310px] font-brand text-[15px] font-medium leading-relaxed text-brand-ink/62 lg:max-w-[520px] lg:text-[17px]">
          Мастерские инструменты из массива — собраны, отстроены и прослушаны
          вручную. Звук, который слышно с первой ноты.
        </p>
      </section>

      <section className="relative mt-6 h-[400px] overflow-hidden lg:h-[600px]">
        <Placeholder>Фото домбры — светлый премиальный кадр</Placeholder>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[44%] bg-gradient-to-t from-white from-[58%] to-transparent" />
        <div className="pointer-events-none absolute bottom-4 left-5 flex items-baseline gap-2.5">
          <span className="font-brand text-[13px] font-extrabold tracking-[0.1em] text-brand-blue">
            «АСЫЛ»
          </span>
          <span className="font-brand text-xs font-medium text-brand-ink/50">
            ель / клён · 185 000 ₸
          </span>
        </div>
      </section>

      <section className="flex flex-col gap-2.5 bg-white px-5 pb-8 pt-2 lg:mx-auto lg:max-w-[1180px] lg:px-7">
        <Button className="w-full">Купить</Button>
        <div ref={sentinelRef} className="h-px" />
      </section>

      {/* ---------- бегущая строка ---------- */}
      <div className="flex overflow-hidden bg-brand-ink text-brand-lime">
        <div className="flex animate-[marquee_22s_linear_infinite] gap-5.5 whitespace-nowrap px-3 py-2.5 font-brand text-[10.5px] font-bold tracking-[0.16em]">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-5.5">
              НАҒЫЗ ҚАЗАҚ — ҚАЗАҚ ЕМЕС, НАҒЫЗ ҚАЗАҚ — ДОМБЫРА!
              <span className="text-brand-lime">◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* ---------- статистика ---------- */}
      <section className="grid grid-cols-3 border-b border-brand-border bg-brand-bg lg:mx-auto lg:max-w-[1180px]">
        {[
          { n: "1998", l: "с этого года\nработает топ-мастер" },
          { n: "2015", l: "год запуска\nпроекта dombyra.kz" },
          { n: "10 000+", l: "клиентов\nпо всему миру" },
        ].map((s, i) => (
          <div
            key={s.n}
            className={`px-2.5 py-6 text-center lg:py-10 ${
              i < 2 ? "border-r border-brand-border" : ""
            }`}
          >
            <div className="font-brand text-[26px] font-extrabold text-brand-blue lg:text-[44px]">
              {s.n}
            </div>
            <div className="mt-1.5 whitespace-pre-line font-brand text-[11px] font-medium leading-snug text-brand-ink/55">
              {s.l}
            </div>
          </div>
        ))}
      </section>

      {/* ---------- каталог ---------- */}
      <section id="catalog" className="scroll-mt-16 bg-white pt-10 lg:mx-auto lg:max-w-[1180px]">
        <div className="flex items-end justify-between gap-3 px-5 pb-1.5 lg:px-7">
          <h2 className="font-brand text-[28px] font-extrabold uppercase tracking-[-0.025em] lg:text-[52px]">
            Каталог
          </h2>
          <a
            href="#catalog"
            className="pb-1 font-brand text-xs font-bold uppercase tracking-[0.08em] text-brand-teal"
          >
            все 47 →
          </a>
        </div>
        <p className="px-5 font-brand text-sm font-medium text-brand-ink/60 lg:px-7">
          Каждая домбыра — один экземпляр. Слушайте запись до покупки.
        </p>
        <div
          data-row
          className="flex gap-3 overflow-x-auto px-5 py-4 [scroll-snap-type:x_mandatory] lg:grid lg:grid-cols-4 lg:overflow-visible lg:px-7"
        >
          {CATALOG.map((item) => (
            <article
              key={item.name}
              className="w-[232px] flex-none border border-brand-border bg-white [scroll-snap-align:start] lg:w-auto"
            >
              <div className="relative h-[232px] bg-brand-bg lg:h-[300px]">
                <Placeholder>Домбыра «{item.name}»</Placeholder>
                {item.badge && (
                  <div className="pointer-events-none absolute left-0 top-0">
                    <Badge>{item.badge}</Badge>
                  </div>
                )}
              </div>
              <div className="p-4">
                <div className="font-brand text-[17px] font-bold">{item.name}</div>
                <div className="mt-1 font-brand text-xs font-medium text-brand-ink/50">
                  {item.subtitle}
                </div>
                <div className="mt-3 font-brand text-lg font-extrabold text-brand-blue">
                  {item.price}
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="px-5 lg:px-7">
          <Button className="w-full lg:w-auto">Перейти в каталог</Button>
        </div>
        <div className="h-16" />
      </section>

      {/* ---------- сертификат ---------- */}
      <section
        id="certificate"
        className="scroll-mt-16 bg-brand-ink px-5 py-10 text-white lg:px-7"
      >
        <div className="lg:mx-auto lg:max-w-[1180px]">
          <SectionEyebrow>ПОДЛИННОСТЬ</SectionEyebrow>
          <h2 className="mt-3 max-w-[640px] font-brand text-[28px] font-extrabold uppercase leading-[1.05] tracking-[-0.025em] lg:text-[52px]">
            Нағыз қазақ
            <br />
            сертификаты
          </h2>
          <p className="mt-2.5 max-w-[640px] font-brand text-sm font-medium leading-relaxed text-white/70">
            К каждому инструменту прилагается именной сертификат: порода
            дерева, имя мастера, дата сборки и номер экземпляра.
          </p>
          <div className="mt-6 max-w-[460px] bg-white p-3.5 shadow-[0_18px_40px_rgba(0,0,0,0.35)]">
            <div className="h-[360px] border border-[#E4E9F5]">
              <Placeholder>Фото сертификата «Нағыз қазақ сертификаты»</Placeholder>
            </div>
          </div>
          <div className="mt-6 flex max-w-[640px] flex-col gap-3">
            {[
              "Уникальный номер и подпись мастера от руки",
              "QR-код с аудиозаписью и паспортом инструмента",
              "Подтверждает ручную работу и происхождение дерева",
            ].map((line) => (
              <div key={line} className="flex items-baseline gap-3">
                <span className="mt-[-2px] h-1.5 w-1.5 flex-none bg-brand-lime" />
                <span className="font-brand text-[13.5px] font-medium leading-relaxed text-white/82">
                  {line}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- тренажёр ---------- */}
      <section
        id="trainer"
        className="scroll-mt-16 bg-brand-bg py-10 lg:pb-11"
      >
        <div className="px-5 lg:mx-auto lg:max-w-[1180px] lg:px-7">
          <SectionEyebrow>ТРЕНАЖЁР</SectionEyebrow>
          <h2 className="mt-3 font-brand text-[32px] font-extrabold uppercase leading-none tracking-[-0.03em]">
            Научитесь играть
            <br />
            всего за <span className="text-brand-blue">час</span>
          </h2>
          <p className="mt-2.5 font-brand text-sm font-medium leading-relaxed text-brand-ink/62">
            Симулятор показывает, куда ставить пальцы, и слушает вашу игру
            через микрофон. Кюи и песни — прямо в браузере, без установки.
          </p>
        </div>
        <div
          data-row
          className="flex gap-3 overflow-x-auto px-5 py-5.5 [scroll-snap-type:x_mandatory] lg:mx-auto lg:max-w-[1180px] lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-7"
        >
          {TRAINER_CARDS.map((card) => (
            <figure
              key={card.caption}
              className="m-0 w-[200px] flex-none border border-brand-border bg-white [scroll-snap-align:start] lg:w-auto"
            >
              <div className="h-[266px] bg-[#E8EDF7] lg:h-[340px]">
                <Placeholder>{card.ph}</Placeholder>
              </div>
              <figcaption className="p-3.5 pt-3 font-brand text-[12.5px] font-bold leading-snug">
                {card.caption}
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="flex flex-col gap-2.5 px-5 pt-1 lg:mx-auto lg:max-w-[1180px] lg:px-7">
          <div className="border border-brand-border bg-white p-4">
            <div className="inline-flex items-center gap-1.5 rounded-full bg-brand-lime px-3 py-1.5">
              <span className="font-brand text-[10.5px] font-extrabold tracking-[0.12em] text-brand-ink">
                ТРЕНАЖЁР БЕСПЛАТНЫЙ
              </span>
            </div>
            <div className="mt-3.5 flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-brand-blue" />
              <span className="font-brand text-[13px] font-medium text-brand-ink/70">
                Часть мелодий открыта всем и навсегда — заходите и играйте
              </span>
            </div>
            <div className="mt-2 flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-brand-blue" />
              <span className="font-brand text-[13px] font-medium text-brand-ink/70">
                Остальные мелодии — платные
              </span>
            </div>
            <div className="mt-2 flex gap-2.5">
              <span className="mt-1.5 h-1.5 w-1.5 flex-none bg-brand-lime" />
              <span className="font-brand text-[13px] font-semibold">
                Нашим клиентам — все мелодии бесплатно навсегда
              </span>
            </div>
          </div>
          <a href="/simulator">
            <Button className="w-full">Открыть тренажёр</Button>
          </a>
        </div>
      </section>

      {/* ---------- тюнер ---------- */}
      <section
        id="tuner"
        className="scroll-mt-16 bg-white px-5 py-11 text-center lg:px-7"
      >
        <div className="mx-auto mb-4.5 h-3 w-3 rotate-45 bg-brand-lime" />
        <h2 className="font-brand text-[34px] font-extrabold uppercase leading-[0.94] tracking-[-0.035em] lg:text-[52px]">
          Бесплатный
          <br />
          <span className="text-brand-blue">тюнер домбры</span>
        </h2>
        <p className="mx-auto mt-3.5 max-w-[300px] text-pretty font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/60">
          Он живёт на той же странице, что и тренажёр. Включите микрофон — и
          строй D–G будет чистым за минуту, без слуха и опыта.
        </p>

        <div className="mx-auto mt-6.5 grid max-w-[1000px] grid-cols-2 gap-2.5 text-left lg:grid-cols-4">
          {TUNER_STEPS.map((step) => (
            <div key={step.num} className="bg-brand-bg px-3.5 pb-4.5 pt-4">
              <div className="mb-3 flex h-6.5 w-6.5 items-center justify-center bg-brand-blue font-brand text-[11px] font-extrabold text-white">
                {step.num}
              </div>
              <div className="font-brand text-[13px] font-extrabold uppercase tracking-[-0.01em]">
                {step.title}
              </div>
              <div className="mt-1.5 font-brand text-xs font-medium leading-snug text-brand-ink/60">
                {step.desc}
              </div>
            </div>
          ))}
        </div>

        <a
          href="/simulator"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-brand-blue px-6.5 py-3.5 font-brand text-sm font-bold text-white transition-colors hover:bg-brand-blue-dark"
        >
          Настроить домбру
          <span className="font-brand text-[15px] font-bold">›</span>
        </a>
        <div className="mt-3 font-brand text-[11.5px] font-medium text-brand-ink/45">
          Тюнер и тренажёр — на одной странице
        </div>
      </section>

      {/* ---------- почему мы ---------- */}
      <section
        id="why"
        className="scroll-mt-16 bg-white px-5 py-11 text-center lg:px-7"
      >
        <div className="mx-auto mb-4.5 h-3 w-3 rotate-45 bg-brand-lime" />
        <h2 className="font-brand text-[34px] font-extrabold uppercase leading-[0.94] tracking-[-0.035em]">
          Почему
          <br />
          <span className="text-brand-blue">именно мы</span>
        </h2>
        <div className="mx-auto mt-6.5 flex max-w-[900px] flex-wrap justify-center gap-2">
          {WHY_TAGS.map((tag) => (
            <span
              key={tag.label}
              className={`inline-flex items-center whitespace-nowrap rounded-full px-3.5 py-2.5 font-brand text-[12.5px] font-bold tracking-[-0.01em] ${
                tag.filled
                  ? "bg-brand-blue text-white"
                  : "border border-[#D8E0EE] bg-brand-bg text-brand-blue"
              }`}
            >
              {tag.label}
            </span>
          ))}
        </div>
      </section>

      {/* ---------- отзывы ---------- */}
      <section id="reviews" className="scroll-mt-16 bg-brand-bg py-10">
        <div className="px-5 lg:mx-auto lg:max-w-[1180px] lg:px-7">
          <SectionEyebrow>ОТЗЫВЫ</SectionEyebrow>
          <h2 className="mt-3 font-brand text-[28px] font-extrabold uppercase tracking-[-0.025em] lg:text-[52px]">
            Говорят музыканты
          </h2>
          <div className="font-brand text-[13px] font-medium text-brand-ink/55">
            4,9 из 5 · 412 отзыва на Kaspi и 2GIS
          </div>
        </div>
        <div
          data-row
          className="flex gap-3 overflow-x-auto px-5 py-5.5 [scroll-snap-type:x_mandatory] lg:mx-auto lg:max-w-[1180px] lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-7"
        >
          {REVIEWS.map((review) => (
            <blockquote
              key={review.name}
              className="w-[288px] flex-none border border-brand-border bg-white p-5.5 [scroll-snap-align:start] lg:w-auto"
            >
              <div className="font-brand text-[13px] font-bold tracking-[0.2em] text-brand-blue">
                ★★★★★
              </div>
              <p className="mt-3.5 font-brand text-sm font-medium leading-relaxed text-brand-ink/78">
                {review.text}
              </p>
              <footer className="mt-5 flex items-center gap-3">
                <div className="h-11 w-11 flex-none">
                  <Placeholder>Фото</Placeholder>
                </div>
                <div>
                  <div className="font-brand text-[13px] font-bold leading-tight">
                    {review.name}
                  </div>
                  <div className="mt-0.5 font-brand text-[11.5px] font-medium text-brand-ink/45">
                    {review.role}
                  </div>
                </div>
              </footer>
            </blockquote>
          ))}
        </div>
        <div className="px-5 pt-2.5 font-brand text-[11px] font-medium uppercase tracking-[0.08em] text-brand-ink/40 lg:px-7">
          ← Листайте
        </div>
      </section>

      {/* ---------- FAQ ---------- */}
      <section
        id="faq"
        className="scroll-mt-16 bg-white px-5 py-10 lg:mx-auto lg:max-w-[1180px] lg:px-7"
      >
        <SectionEyebrow>ВОПРОС — ОТВЕТ</SectionEyebrow>
        <h2 className="mt-3 mb-1 font-brand text-[28px] font-extrabold uppercase tracking-[-0.025em] lg:text-[52px]">
          Что спрашивают чаще всего
        </h2>
        <div>
          {FAQS.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div key={faq.q} className="border-t border-brand-border last:border-b">
                <button
                  onClick={() => setOpenFaq(isOpen ? -1 : i)}
                  className="flex w-full items-start gap-3.5 border-none bg-transparent py-4.5 text-left cursor-pointer"
                >
                  <span className="flex-1 font-brand text-[15px] font-bold leading-snug">
                    {faq.q}
                  </span>
                  <span
                    className={`flex-none w-5 font-brand text-xl font-bold text-brand-blue transition-transform duration-150 ${
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

      {/* ---------- журнал ---------- */}
      <section
        id="blog"
        className="scroll-mt-16 bg-brand-bg px-5 py-10 lg:px-7"
      >
        <div className="lg:mx-auto lg:max-w-[1180px]">
          <SectionEyebrow>ЖУРНАЛ</SectionEyebrow>
          <h2 className="mt-3 mb-5.5 font-brand text-[28px] font-extrabold uppercase tracking-[-0.025em] lg:text-[52px]">
            Читать перед покупкой
          </h2>
          <div className="flex flex-col gap-4 lg:grid lg:grid-cols-3">
            {BLOG_POSTS.map((post) => (
              <article
                key={post.title}
                className="flex flex-col border border-brand-border bg-white"
              >
                <div className="h-[160px]">
                  <Placeholder>Фото: {post.category.toLowerCase()}</Placeholder>
                </div>
                <div className="p-4.5">
                  <div className="flex items-center gap-2.5 font-brand text-[10.5px] font-bold uppercase tracking-[0.12em] text-brand-ink/40">
                    <span className="text-brand-blue">{post.category}</span>
                    <span>{post.time}</span>
                  </div>
                  <h3 className="mt-2.5 font-brand text-[17px] font-bold leading-snug">
                    {post.title}
                  </h3>
                  <p className="mt-2 font-brand text-[13.5px] font-medium leading-relaxed text-brand-ink/60">
                    {post.desc}
                  </p>
                  <div className="mt-4">
                    <Button variant="secondary" size="sm">
                      Читать
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- видео ---------- */}
      <section id="video" className="scroll-mt-16 bg-white py-10">
        <div className="px-5 lg:mx-auto lg:max-w-[1180px] lg:px-7">
          <SectionEyebrow>YOUTUBE</SectionEyebrow>
          <h2 className="mt-3 font-brand text-[28px] font-extrabold uppercase tracking-[-0.025em] lg:text-[52px]">
            Смотреть и слушать
          </h2>
          <p className="font-brand text-[13.5px] font-medium text-brand-ink/60">
            Записи из мастерской, обзоры моделей и короткие уроки.
          </p>
        </div>
        <div
          data-row
          className="flex gap-3 overflow-x-auto px-5 py-5.5 [scroll-snap-type:x_mandatory] lg:mx-auto lg:max-w-[1180px] lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-7"
        >
          {VIDEOS.map((video, i) => (
            <div key={video.id} className="w-[280px] flex-none [scroll-snap-align:start] lg:w-auto">
              <div className="relative h-[158px] border border-brand-border bg-brand-bg">
                {playingVideo === i ? (
                  <iframe
                    src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
                    title={video.title}
                    allow="accelerometer; autoplay; encrypted-media; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 h-full w-full border-none"
                  />
                ) : (
                  <>
                    <Placeholder>Кадр из видео</Placeholder>
                    <button
                      onClick={() => setPlayingVideo(i)}
                      aria-label={`Воспроизвести: ${video.title}`}
                      className="absolute inset-0 flex items-center justify-center border-none bg-brand-blue/8 cursor-pointer"
                    >
                      <span className="flex h-13 w-13 items-center justify-center bg-brand-lime font-brand text-base font-bold text-brand-ink shadow-[0_6px_20px_rgba(20,30,147,0.25)]">
                        ▶
                      </span>
                    </button>
                  </>
                )}
              </div>
              <div className="pt-3">
                <div className="font-brand text-sm font-bold leading-snug">{video.title}</div>
                <div className="mt-1.5 font-brand text-[11.5px] font-medium text-brand-ink/45">
                  {video.duration} · dombyra.kz
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="px-5 pt-4 lg:mx-auto lg:max-w-[1180px] lg:px-7">
          <Button variant="secondary" className="w-full lg:w-auto">
            Наш канал на YouTube
          </Button>
        </div>
      </section>

      {/* ---------- форма заявки ---------- */}
      <section id="lead" className="bg-brand-blue px-5 py-9 pb-10 text-white lg:px-7">
        <div className="lg:mx-auto lg:max-w-[560px]">
          <h2 className="font-brand text-[26px] font-extrabold uppercase leading-[1.08] tracking-[-0.025em]">
            Подберём домбыру под вашу руку
          </h2>
          <p className="mt-2.5 mb-5 font-brand text-sm font-medium leading-relaxed text-white/78">
            Оставьте номер — мастер напишет в WhatsApp и пришлёт аудиозаписи
            трёх подходящих инструментов.
          </p>
          <div className="flex flex-col gap-2.5">
            <input
              type="tel"
              placeholder="+7 (___) ___ __ __"
              className="w-full rounded-full border border-white/35 bg-white/8 px-4 py-3.5 font-brand text-sm font-medium text-white placeholder:text-white/55"
            />
            <Button className="w-full">Купить с подбором</Button>
          </div>
          <div className="mt-3 font-brand text-[11px] font-medium text-white/62">
            Нажимая кнопку, вы соглашаетесь с политикой обработки данных.
          </div>
        </div>
      </section>

      {/* ---------- подвал ---------- */}
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

      {/* ---------- плавающая панель покупки ---------- */}
      {showStickyBar && !menuOpen && (
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
      )}
    </div>
  );
}
