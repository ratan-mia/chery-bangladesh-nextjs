"use client";

import tiggo8proData from "@/data/vehicles/tiggo8pro";
import CarFeaturesSlider from "@components/CarFeaturesSlider";
import DownloadBrochureCTA from "@components/DownloadBrochureCTA";
import SimpleBanner from "@components/SimpleBanner";
import CarColorSwitcher from "@components/tiggo8pro/CarColorSwitcher";
import ContactBanner from "@components/tiggo8pro/ContactBanner";
import VehicleShowcase from "@components/tiggo8pro/VehicleShowcase";
import VehicleSpecs from "@components/VehicleSpecs";

export default function Tiggo8ProPage() {
  // Destructure data for easier access
  const { appearance, power, intelligence, security, styling } = tiggo8proData;

  return (
    <main>
      {/* =========================================
          HERO SECTION
          ========================================= */}
      {/* <FeatureSlider /> */}
      <VehicleShowcase />
      <DownloadBrochureCTA
        brochureUrl="/brochures/tiggo-8pro-brochure.pdf"
        brochureName="Tiggo 8 Pro"
        title="Get Complete|Information"
        subtitle="Download our comprehensive brochure to explore features, specifications, and pricing"
      />


      {/* =========================================
          APPEARANCE SECTION
          ========================================= */}
      <CarColorSwitcher />

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
        showControls={false}
      />

      <CarFeaturesSlider
        title="Premium Exterior Features"
        subtitle="Discover our range of elegant design elements that enhance both style and performance"
        features={appearance.features}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />

      {/* =========================================
          POWER & PERFORMANCE SECTION
          ========================================= */}
      <VehicleSpecs
        category={power.specs.category}
        title={power.specs.title}
        subtitle={power.specs.subtitle}
        specs={power.specs.details}
      />

      <SimpleBanner
        slides={power.banner}
        accentColor={styling.accentColor}
        height={styling.bannerHeight}
        showControls={false}
      />

      <CarFeaturesSlider
        title="Performance Features"
        subtitle="Experience the perfect balance of power, efficiency, and driving dynamics"
        features={power.features}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />

      {/* =========================================
          INTELLIGENCE & TECHNOLOGY SECTION
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
        showControls={false}
      />

      <CarFeaturesSlider
        title="Intelligent Features"
        subtitle="Advanced technology that enhances comfort, convenience, and entertainment"
        features={intelligence.features}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />

      {/* =========================================
          SECURITY & SAFETY SECTION
          ========================================= */}
      <VehicleSpecs
        category={security.specs.category}
        title={security.specs.title}
        subtitle={security.specs.subtitle}
        specs={security.specs.details}
      />

      <SimpleBanner
        slides={security.banner}
        accentColor={styling.accentColor}
        height={styling.bannerHeight}
        showControls={false}
      />

      <CarFeaturesSlider
        title="Safety & Security Features"
        subtitle="Comprehensive protection systems for you and your passengers"
        features={security.features}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />

      {/* =========================================
          CONTACT SECTION
          ========================================= */}
      <ContactBanner />
    </main>
  );
}