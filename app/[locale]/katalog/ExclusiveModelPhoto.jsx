"use client";
import Image from "next/image";
import Link from "next/link";
import { Placeholder } from "@/app/components/ui";
import { usePhotoScrubber } from "@/app/components/usePhotoScrubber";

// app/[locale]/katalog/ExclusiveModelPhoto.jsx
//
// Фото-часть баннера — отдельный клиентский компонент, потому что
// обработчики мыши/тача работают только на клиенте, а сам
// ExclusiveModelBanner — серверный.
export default function ExclusiveModelPhoto({ photos, name, href, badge }) {
  const {
    activeIndex,
    hasMultiple,
    showDot,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleLinkClick,
  } = usePhotoScrubber(photos);

  return (
    <Link
      href={href}
      onClick={handleLinkClick}
      className="relative block h-[280px] w-full flex-none touch-pan-y overflow-hidden bg-brand-ink sm:h-[380px] sm:w-[45%] lg:h-[420px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {photos[activeIndex] ? (
        <Image
          src={photos[activeIndex]}
          alt={name}
          fill
          className="object-cover transition-transform duration-300 hover:scale-105"
          sizes="(max-width: 640px) 100vw, 45vw"
        />
      ) : (
        <Placeholder>Фото — эксклюзивная модель</Placeholder>
      )}

      <span className="absolute left-4 top-4 rounded-full bg-brand-lime px-3 py-1.5 font-brand text-[10.5px] font-extrabold uppercase tracking-[0.1em] text-brand-ink">
        {badge}
      </span>

      {hasMultiple && (
        <div className="absolute inset-x-3 top-3 hidden gap-1 lg:flex">
          {photos.map((_, i) => (
            <div
              key={i}
              className={`h-[3px] flex-1 rounded-full transition-colors ${
                i === activeIndex ? "bg-white" : "bg-white/40"
              }`}
              style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.12)" }}
            />
          ))}
        </div>
      )}

      {hasMultiple && (
        <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5 lg:hidden">
          {photos.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={(e) => showDot(e, i)}
              aria-label={`Фото ${i + 1}`}
              className={`h-1.5 w-1.5 rounded-full transition-colors ${
                i === activeIndex ? "bg-white" : "bg-white/45"
              }`}
              style={{ boxShadow: "0 0 0 1px rgba(0,0,0,0.15)" }}
            />
          ))}
        </div>
      )}
    </Link>
  );
}
