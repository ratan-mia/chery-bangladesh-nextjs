"use client";

import BrandValuesSection from "@components/home/BrandValuesSection";
import BrandCoreGrid from "./components/about/BrandCoreGrid";
import CheryBanner from "./components/CheryBanner";
import CheryTiggoSection from "./components/CheryTiggoSection";
import ContactSection from "./components/ContactSection";
import GlobalPresenceBanner from "./components/GlobalPresenceBanner";
import HeroSlider from "./components/HeroSlider";
import BrandMasonrySlider from "./components/home/BrandMasonrySlider";
import NewsSection from "./components/NewsSection";

export default function Home() {
  return (
    <main>

      <HeroSlider />
      <CheryTiggoSection />
      <BrandValuesSection />
      <GlobalPresenceBanner />
      {/* <CheryFeaturesAccordion /> */}
      <BrandCoreGrid />
      <CheryBanner />

      {/* <MasonryImageSlider /> */}
      <BrandMasonrySlider />
      <NewsSection />
      <ContactSection />
    </main>
  );
}
