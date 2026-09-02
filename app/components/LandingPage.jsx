"use client";
import { useState } from "react";
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
// Header и Footer переехали в app/[locale]/layout.jsx (через SiteChrome):
// теперь они есть на всех страницах сайта, а не только на главной.
//
// StickyBuyBar убрана по просьбе Айым — мешала на странице. Вместе с
// самим компонентом убрала и всю логику, которая существовала только
// ради него: sentinelRef, showStickyBar, IntersectionObserver в
// useEffect. Hero.jsx у себя внутри всё ещё принимает пропс sentinelRef
// (там стоит невидимый div-"часовой") — теперь он просто не используется,
// можно почистить и там при следующей правке Hero.jsx, если захотите.
//
// WhyUs.jsx тоже не рендерится здесь — блок "Почему мы" убрали как
// отдельную секцию, его преимущества переехали в начало CatalogPreview.
//
// locale, posts и catalogItems приходят от серверной страницы
// app/[locale]/page.js: этот компонент клиентский и сам к базе
// обращаться не может.
export default function LandingPage({ dict, locale, posts = [], catalogItems = [] }) {
  const [openFaq, setOpenFaq] = useState(0);
  const [playingVideo, setPlayingVideo] = useState(null);

  return (
    <div className="relative overflow-x-clip bg-white font-brand text-brand-ink">
      <Hero dict={dict} locale={locale} />
      <CatalogPreview dict={dict} locale={locale} items={catalogItems} />
      <ForWhom dict={dict} locale={locale} />
      <Certificate dict={dict} locale={locale} />
      <TrainerPromo dict={dict} locale={locale} />
      <Reviews dict={dict} locale={locale} />
      <Faq openFaq={openFaq} onToggle={setOpenFaq} dict={dict} locale={locale} />
      <Blog posts={posts} dict={dict} locale={locale} />
      <VideoSection playingVideo={playingVideo} onPlay={setPlayingVideo} dict={dict} locale={locale} />
      <LeadForm dict={dict} locale={locale} />
    </div>
  );
}
