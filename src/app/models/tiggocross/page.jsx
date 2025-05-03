"use client";

import tiggoCrossData from "@/data/vehicles/tiggocross";
import CarFeaturesSlider from "@components/CarFeaturesSlider";
import SimpleBanner from "@components/SimpleBanner";
import CarColorSwitcher from "@components/tiggo-cross/CarColorSwitcher";
import CarShowcaseSlider from "@components/tiggo-cross/CarShowcaseSlider";
import CarTechSlider from "@components/tiggo-cross/CarTechSlider";
import VehicleSpecs from "@components/VehicleSpecs";

export default function TiggoCrossPage() {
  // Destructure data for easier access
  const { appearance, comfort, intelligence, security, gallery, styling } = tiggoCrossData;

  return (
    <main>
      {/* =========================================
          HERO SECTION
          ========================================= */}
      <CarShowcaseSlider />

      <CarColorSwitcher />

      {/* =========================================
          APPEARANCE & EXTERIOR SECTION
          ========================================= */}

      <VehicleSpecs
        category={appearance.specs.category}
        title={appearance.specs.title}
        subtitle={appearance.specs.subtitle}
        specs={appearance.specs.details}
      />
      <SimpleBanner
        slides={appearance.banner}
        accentColor={styling.accentColor}
        height={styling.bannerHeight}
        showSectionHeader={false}
        showContents={false}
        showControls={false}
        sectionTitle='Striking Lines'
        sectionSubtitle='Appearance'
        sectionText='Make a memorable entrance every time, with design that goes beyond the ordinary.'
      />
      <CarTechSlider slides={appearance.techSlides} />



      {/* <SimpleBanner
        slides={appearance.banner}
        accentColor={styling.accentColor}
        height={styling.bannerHeight}
        showContents={false}
        showControls={false}
        sectionTitle='Striking Lines'
        sectionSubtitle='Appearance'
        sectionText='Make a memorable entrance every time, with design that goes beyond the ordinary.'
      /> */}

      {/* <CarFeaturesSlider
        title="Premium Exterior Features"
        subtitle="Discover our range of elegant design elements that enhance both style and performance"
        features={appearance.features}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      /> */}

      {/* =========================================
          COMFORT SECTION
          ========================================= */}
      <SimpleBanner
        slides={comfort.banner}
        accentColor={styling.accentColor}
        height={styling.bannerHeight}
        showContents={false}
        showControls={false}
        sectionTitle='Crafted Interior'
        sectionSubtitle='Comfort'
        sectionText='Comfort, Control, and a whole lot of character — every detail is designed to amplify your journeys.'
      />

      <CarTechSlider slides={comfort.features} />

      {/* =========================================
          INTELLIGENCE & CONNECTIVITY SECTION
          ========================================= */}
      <VehicleSpecs
        category={intelligence.specs.category}
        title={intelligence.specs.title}
        subtitle={intelligence.specs.subtitle}
        specs={intelligence.specs.details}
      />

      <SimpleBanner
        slides={intelligence.banner}
        accentColor={styling.accentColor}
        height={styling.bannerHeight}
        showContents={false}
        showControls={false}
        sectionTitle='Advanced Technology'
        sectionSubtitle='Intelligence'
        sectionText='Seamless connectivity and intuitive controls to enhance your driving experience.'
      />

      <CarFeaturesSlider
        title="Intelligent Features"
        subtitle="Advanced technology that keeps you connected, informed, and entertained"
        features={intelligence.features}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />

      {/* =========================================
          SECURITY & SAFETY SECTION
          ========================================= */}
      <SimpleBanner
        slides={security.banner}
        accentColor={styling.accentColor}
        height={styling.bannerHeight}
        showContents={false}
        showControls={false}
        sectionTitle='Beyond Safety'
        sectionSubtitle='Security'
        sectionText='Intelligent innovations to keep you safe on the road.'
      />

      <CarTechSlider slides={security.features} />

      {/* =========================================
          GALLERY SECTION
          ========================================= */}
      {/* <Gallery 
        images={gallery.images}
        title={gallery.config.title}
        subtitle={gallery.config.subtitle}
        aspectRatio={gallery.config.aspectRatio}
      /> */}
    </main>
  );
}