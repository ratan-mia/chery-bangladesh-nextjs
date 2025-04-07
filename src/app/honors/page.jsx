"use client";

import BrandMilestones from "../components/honors/BrandMilestones";
import CheryHonorsParallax from "../components/honors/CheryHonorsParallax";
import KeyAwardsSlider from "../components/honors/KeyAwardsSlider";

export default function Home() {
  return (
    <main>
      <CheryHonorsParallax/> 
      <KeyAwardsSlider/>
      <BrandMilestones/>
      
    </main>
  );
}
