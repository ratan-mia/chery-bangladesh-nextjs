"use client";

import BrandMilestones from "../components/honors/BrandMilestones";
import CheryHonorsParallax from "../components/honors/CheryHonorsParallax-v3";
import KeyAwardsSlider from "../components/honors/KeyAwardsSlider";
import LearnMoreSection from "../components/honors/LearnMoreSection";

export default function Home() {
  return (
    <main>
      <CheryHonorsParallax/> 
      <KeyAwardsSlider/>
      <BrandMilestones/>
      <LearnMoreSection/>
      
    </main>
  );
}
