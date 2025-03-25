"use client";

import CheryBanner from "./components/CheryBanner";
import CheryTiggoSection from "./components/CheryTiggoSection";
import GlobalPresenceBanner from "./components/GlobalPresenceBanner";
import Header from "./components/Header";
import HeroSlider from "./components/HeroSlider";
import MasonryImageSlider from "./components/MasonryImageSlider";
import NewsSection from "./components/NewsSection";

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSlider />
      <CheryTiggoSection />
      <GlobalPresenceBanner />
      <CheryBanner />
      <MasonryImageSlider />
      <NewsSection />
    </main>
  );
}
