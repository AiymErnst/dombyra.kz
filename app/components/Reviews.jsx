import { Placeholder, SectionEyebrow } from "./ui";
import { REVIEWS } from "./data";

export default function Reviews() {
  return (
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
  );
}
