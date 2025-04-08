"use client";

import CheryBanner from "./components/CheryBanner";
import CheryTiggoSection from "./components/CheryTiggoSection";
import ContactSection from "./components/ContactSection";
import GlobalPresenceBanner from "./components/GlobalPresenceBanner";
import HeroSlider from "./components/HeroSlider";
import MasonryImageSlider from "./components/MasonryImageSlider";
import NewsSection from "./components/NewsSection";

export default function Home() {
  return (
    <main>

      <HeroSlider />
      <CheryTiggoSection />
      <GlobalPresenceBanner />
      <CheryBanner />
      <MasonryImageSlider />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
