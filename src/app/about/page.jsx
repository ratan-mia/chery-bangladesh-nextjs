"use client";

import AwardsSection from "../components/about/AwardsSection";
import BrandCoreGrid from "../components/about/BrandCoreGrid";
import CommunitySection from "../components/about/CommunitySection";
import ModernParallaxHero from "../components/about/ModernParallaxHero";
import VisionMissionSection from "../components/about/VisionMissionSection";

export default function About() {
  return (
    <main>
      <ModernParallaxHero />
      <VisionMissionSection />
      <BrandCoreGrid />
      <CommunitySection />
      <AwardsSection />
    </main>
  );
}
