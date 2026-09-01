"use client";
// app/components/usePhotoScrubber.js
//
// Общая логика переключения фото — раньше жила только внутри
// CatalogPreviewCard.jsx. Вынесена сюда, чтобы то же самое поведение
// (движение курсора на вебе, свайп на мобильном) можно было
// использовать и в ExclusiveModelBanner.jsx, не копируя код дважды.
import { useRef, useState } from "react";

const SWIPE_THRESHOLD = 40;

export function usePhotoScrubber(photos) {
  const [activeIndex, setActiveIndex] = useState(0);
  const hasMultiple = photos.length > 1;

  const touchStartX = useRef(null);
  const wasSwipe = useRef(false);

  function goTo(i) {
    setActiveIndex((i + photos.length) % photos.length);
  }

  function showDot(e, i) {
    e.preventDefault();
    e.stopPropagation();
    goTo(i);
  }

  function handleMouseMove(e) {
    if (!hasMultiple) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const relX = e.clientX - rect.left;
    const segment = Math.min(
      photos.length - 1,
      Math.max(0, Math.floor((relX / rect.width) * photos.length))
    );
    setActiveIndex(segment);
  }

  function handleMouseLeave() {
    if (!hasMultiple) return;
    setActiveIndex(0);
  }

  function handleTouchStart(e) {
    if (!hasMultiple) return;
    touchStartX.current = e.touches[0].clientX;
    wasSwipe.current = false;
  }

  function handleTouchMove(e) {
    if (!hasMultiple || touchStartX.current === null) return;
    const delta = e.touches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 10) wasSwipe.current = true;
  }

  function handleTouchEnd(e) {
    if (!hasMultiple || touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(delta) > SWIPE_THRESHOLD) {
      goTo(delta < 0 ? activeIndex + 1 : activeIndex - 1);
    }
  }

  function handleLinkClick(e) {
    if (wasSwipe.current) {
      e.preventDefault();
      wasSwipe.current = false;
    }
  }

  return {
    activeIndex,
    hasMultiple,
    showDot,
    handleMouseMove,
    handleMouseLeave,
    handleTouchStart,
    handleTouchMove,
    handleTouchEnd,
    handleLinkClick,
  };
}
