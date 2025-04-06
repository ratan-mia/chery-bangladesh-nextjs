"use client";

import AwardsSection from "../components/about/AwardsSection";
import BrandCoreGrid from "../components/about/BrandCoreGrid";
import CommunitySection from "../components/about/CommunitySection";
import ParallaxHeroSection from "../components/about/ParallaxHeroSection";
import VisionMissionSection from "../components/about/VisionMissionSection";

export default function Home() {
  return (
    <main>
      <ParallaxHeroSection />
      <VisionMissionSection />
      <BrandCoreGrid />
      <CommunitySection />
      <AwardsSection/>
    </main>
  );
}
