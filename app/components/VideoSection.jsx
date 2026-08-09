import { Placeholder, SectionEyebrow, Button } from "./ui";
import { VIDEOS } from "./data";

export default function VideoSection({ playingVideo, onPlay }) {
  return (
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
                    onClick={() => onPlay(i)}
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
  );
}
