"use client";

import CheryTiggoSection from "./components/CheryTiggoSection";
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
      <MasonryImageSlider />
      <NewsSection />
    </main>
  );
}
