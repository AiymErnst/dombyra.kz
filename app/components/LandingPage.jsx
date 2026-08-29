"use client";
import { useEffect, useRef, useState } from "react";
import Hero from "./Hero";
import CatalogPreview from "./CatalogPreview";
import ForWhom from "./ForWhom";
import Certificate from "./Certificate";
import TrainerPromo from "./TrainerPromo";
import Reviews from "./Reviews";
import Faq from "./Faq";
import Blog from "./Blog";
import VideoSection from "./VideoSection";
import LeadForm from "./LeadForm";
import StickyBuyBar from "./StickyBuyBar";
// Header и Footer переехали в app/[locale]/layout.jsx (через SiteChrome):
// теперь они есть на всех страницах сайта, а не только на главной.
//
// WhyUs.jsx больше не рендерится здесь — блок "Почему мы" убрали как
// отдельную секцию, его преимущества переехали в начало CatalogPreview.
// Сам файл WhyUs.jsx можно удалить из репозитория, если он больше
// нигде не импортируется — он просто не используется этим компонентом.
//
// locale, posts и catalogItems приходят от серверной страницы
// app/[locale]/page.jsx: этот компонент клиентский и сам к базе
// обращаться не может.
export default function LandingPage({ dict, locale, posts = [], catalogItems = [] }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const sentinelRef = useRef(null);
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
  return (
    <div className="relative overflow-x-clip bg-white font-brand text-brand-ink">
      <Hero sentinelRef={sentinelRef} dict={dict} locale={locale} />
      <CatalogPreview dict={dict} locale={locale} items={catalogItems} />
      <ForWhom dict={dict} locale={locale} />
      <Certificate dict={dict} locale={locale} />
      <TrainerPromo dict={dict} locale={locale} />
      <Reviews dict={dict} locale={locale} />
      <Faq openFaq={openFaq} onToggle={setOpenFaq} dict={dict} locale={locale} />
      <Blog posts={posts} dict={dict} locale={locale} />
      <VideoSection playingVideo={playingVideo} onPlay={setPlayingVideo} dict={dict} locale={locale} />
      <LeadForm dict={dict} locale={locale} />
      <StickyBuyBar show={showStickyBar} dict={dict} locale={locale} />
    </div>
  );
}
