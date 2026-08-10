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

export default function LandingPage({ dict }) {
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
      <Header
        menuOpen={menuOpen}
        onOpenMenu={() => setMenuOpen(true)}
        onCloseMenu={() => setMenuOpen(false)}
        dict={dict}
      />
      <Hero sentinelRef={sentinelRef} dict={dict} />
      <CatalogPreview />
      <Certificate />
      <TrainerPromo />
      <WhyUs />
      <Reviews />
      <Faq openFaq={openFaq} onToggle={setOpenFaq} />
      <Blog />
      <VideoSection playingVideo={playingVideo} onPlay={setPlayingVideo} />
      <LeadForm />
      <Footer />
      <StickyBuyBar show={showStickyBar && !menuOpen} />
    </div>
  );
}
