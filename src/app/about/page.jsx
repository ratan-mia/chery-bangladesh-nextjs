"use client";

import BrandCoreGrid from "../components/about/BrandCoreGrid";
import ParallaxHeroSection from "../components/about/ParallaxHeroSection";
import VisionMissionSection from "../components/about/VisionMissionSection";

export default function Home() {
  return (
    <main>
    
      <ParallaxHeroSection />
      <VisionMissionSection />;
      <BrandCoreGrid />
    </main>
  );
}
