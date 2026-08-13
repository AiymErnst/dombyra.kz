"use client";
import { useEffect, useRef, useState } from "react";
import Header from "./Header";
import Hero from "./Hero";
import CatalogPreview from "./CatalogPreview";
import Certificate from "./Certificate";
import TrainerPromo from "./TrainerPromo";
import WhyUs from "./WhyUs";
import Reviews from "./Reviews";
import Faq from "./Faq";
import Blog from "./Blog";
import VideoSection from "./VideoSection";
import LeadForm from "./LeadForm";
import Footer from "./Footer";
import StickyBuyBar from "./StickyBuyBar";

// locale и posts приходят от серверной страницы app/[locale]/page.jsx:
// этот компонент клиентский и сам к базе обращаться не может.
export default function LandingPage({ dict, locale, posts = [] }) {
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

  return (
    <div className="relative overflow-x-clip bg-white font-brand text-brand-ink">
      {/* path="" — признак главной: якоря работают как якоря.
          На остальных страницах Header получает свой путь и превращает
          их в полноценные ссылки /{locale}#catalog */}
      <Header
        dict={dict}
        locale={locale}
        path=""
        menuOpen={menuOpen}
        onOpenMenu={() => setMenuOpen(true)}
        onCloseMenu={() => setMenuOpen(false)}
      />
      <Hero sentinelRef={sentinelRef} dict={dict} locale={locale} />
      <CatalogPreview dict={dict} locale={locale} />
      <Certificate dict={dict} locale={locale} />
      <TrainerPromo dict={dict} locale={locale} />
      <WhyUs dict={dict} locale={locale} />
      <Reviews dict={dict} locale={locale} />
      <Faq openFaq={openFaq} onToggle={setOpenFaq} dict={dict} locale={locale} />
      <Blog posts={posts} dict={dict} locale={locale} />
      <VideoSection playingVideo={playingVideo} onPlay={setPlayingVideo} dict={dict} locale={locale} />
      <LeadForm dict={dict} locale={locale} />
      <Footer dict={dict} locale={locale} path="" />
      <StickyBuyBar show={showStickyBar && !menuOpen} dict={dict} locale={locale} />
    </div>
  );
}
