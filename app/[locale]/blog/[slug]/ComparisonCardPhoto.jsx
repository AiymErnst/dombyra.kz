"use client";
import { Placeholder } from "@/app/components/ui";
import { usePhotoScrubber } from "@/app/components/usePhotoScrubber";

// app/[locale]/blog/[slug]/ComparisonCardPhoto.jsx
//
// Фото-часть карточки сравнения (Базовая/Средняя/Премиальная) — по
// просьбе Айым можно листать несколько фото на вариант (сравнить
// рисунок, текстуру дерева и т.д.). Та же логика, что и в
// CatalogPreviewCard.jsx: движение курсора на вебе, свайп на
// мобильном — общий хук usePhotoScrubber. Вынесена в отдельный файл,
// потому что сама страница статьи серверная (async), а обработчики
// мыши/тача работают только в клиентском компоненте.
export default function ComparisonCardPhoto({ photos, fallbackLabel }) {
  const list = photos && photos.length > 0 ? photos : [fallbackLabel];
  const {
    activeIndex,
    hasMultiple,
    showDot,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
  } = usePhotoScrubber(list);

  return (
    <div
      className="relative aspect-[3/4] w-full touch-pan-y overflow-hidden rounded-lg bg-brand-bg sm:rounded-xl"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <Placeholder>{list[activeIndex]}</Placeholder>

      {hasMultiple && (
        <div className="absolute inset-x-1 top-1 hidden gap-0.5 lg:flex">
          {list.map((_, i) => (
            <div
              key={i}
              className={`h-[2px] flex-1 rounded-full transition-colors ${
                i === activeIndex ? "bg-white" : "bg-white/40"
              }`}
              style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.12)" }}
            />
          ))}
        </div>
      )}

      {hasMultiple && (
        <div className="absolute inset-x-0 bottom-1 flex justify-center gap-1">
          {list.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => showDot(e, i)}
              aria-label={`${i + 1}`}
              className={`h-1 w-1 rounded-full transition-colors ${
                i === activeIndex ? "bg-white" : "bg-white/50"
              }`}
              style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.15)" }}
            />
          ))}
        </div>
      )}
    </div>
  );
}
