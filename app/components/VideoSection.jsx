import { SectionEyebrow, Button } from "./ui";

// app/components/VideoSection.jsx
//
// Раньше брал VIDEOS напрямую из data.js — заголовки роликов были на
// русском без связи с dict. ID видео и длительность — не переводимые
// (тот же ролик на YouTube независимо от языка сайта), поэтому они
// остались структурными данными в компоненте. Заголовок — dict.video.items,
// с тем же текстом как запасной.
const FALLBACK_VIDEOS = [
  { id: "Yed5qUNKD84", duration: "3:37", title: "Урок 1. Структура домбры и как настроить домбру." },
  { id: "kDAEI3asrQI", duration: "2:20", title: "5 основных ошибок во время игры на домбре" },
  { id: "86xhciRBkZo", duration: "2:41", title: "Урок 5. Песня Еркем-ай" },
];

export default function VideoSection({ playingVideo, onPlay, dict }) {
  const t = dict?.video || {};
  const fallbackTitles = FALLBACK_VIDEOS.map((v) => v.title);
  const titles = t.titles?.length === 3 ? t.titles : fallbackTitles;
  const videos = FALLBACK_VIDEOS.map((v, i) => ({ ...v, title: titles[i] }));

  return (
    <section id="video" className="scroll-mt-16 bg-white py-14 lg:py-20">
      <div className="px-5 lg:mx-auto lg:max-w-[1180px] lg:px-7">
        <SectionEyebrow>{t.eyebrow || "YOUTUBE"}</SectionEyebrow>
        <h2 className="mt-3 font-brand text-[28px] font-extrabold uppercase tracking-[-0.025em] sm:text-[34px] lg:text-[46px]">
          {t.title1 || "Смотреть"} {" "}
          <span className="font-display italic normal-case font-normal tracking-normal text-brand-blue">
            {t.title2 || "и слушать"}
          </span>
        </h2>
        <p className="font-brand text-[13.5px] font-medium text-brand-ink/60">
          {t.subtitle || "Записи из мастерской, обзоры моделей и короткие уроки."}
        </p>
      </div>
      <div
        data-row
        className="mt-6 flex gap-3 overflow-x-auto px-5 pb-2 [scroll-snap-type:x_mandatory] lg:mx-auto lg:max-w-[1180px] lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-7"
      >
        {videos.map((video, i) => (
          <div key={video.id} className="w-[320px] sm:w-[360px] flex-none [scroll-snap-align:start] lg:w-auto">
            <div className="relative aspect-video overflow-hidden rounded-2xl border border-brand-border bg-brand-bg">
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
                  <img
                    src={`https://img.youtube.com/vi/${video.id}/hqdefault.jpg`}
                    alt={video.title}
                    className="absolute inset-0 h-full w-full object-cover"
                  />
                  <button
                    onClick={() => onPlay(i)}
                    aria-label={`${t.playLabel || "Воспроизвести"}: ${video.title}`}
                    className="absolute inset-0 flex cursor-pointer items-center justify-center border-none bg-brand-blue/10"
                  >
                    <span className="flex h-13 w-13 items-center justify-center rounded-full bg-brand-lime font-brand text-base font-bold text-brand-ink shadow-[0_6px_20px_rgba(20,30,147,0.25)]">
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
      <div className="px-5 pt-5 lg:mx-auto lg:max-w-[1180px] lg:px-7">
        <a
          href="https://www.youtube.com/@dombyrakz"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Button variant="secondary" className="w-full lg:w-auto">
            {t.channelCta || "Наш канал на YouTube"}
          </Button>
        </a>
      </div>
    </section>
  );
}
