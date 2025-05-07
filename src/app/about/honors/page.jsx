"use client";

import CheryHonorsParallax from "../../components/honors/CheryHonorsParallax";
import KeyAwardsSlider from "../../components/honors/KeyAwardsSlider";
import LearnMoreSection from "../../components/honors/LearnMoreSection";

export default function Home() {
  return (
    <main>
      <CheryHonorsParallax />
      <section id="awards">
        <KeyAwardsSlider />
      </section>

      {/* <BrandMilestones /> */}
      <LearnMoreSection />

    </main>
  );
}
