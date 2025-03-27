"use client";

import CarFeaturesSlider from "../components/CarFeaturesSlider";
import SimpleBanner from "../components/SimpleBanner";
import CarShowcaseSlider from "../components/tiggo-cross/CarShowcaseSlider";
import CarColorSwitcher from "../components/tiggo8pro/CarColorSwitcher";
import VehicleSpecs from "../components/VehicleSpecs";

export default function Home() {
  const myFeatures = [
    {
      id: 1,
      image: "/images/tiggo8pro/features/pic01_01.jpg",
      title: "Dynamic lighting combination+Concierge lights",
      text: "Advanced camera system for complete visibility",
    },
    {
      id: 2,
      image: "/images/tiggo8pro/features/pic01_02.jpg",
      title: '19 "glossy sport hub"',
      text: "Fast and convenient charging for all your devices",
    },
    {
      id: 3,
      image: "/images/tiggo8pro/features/pic01_03.jpg",
      title: "Matrix Diamond Front Grille",
      text: "Cutting-edge heads-up display technology",
    },
    {
      id: 4,
      image: "/images/tiggo8pro/features/pic01_03.jpg",
      title: "Matrix Diamond Front Grille",
      text: "Cutting-edge heads-up display technology",
    },
    {
      id: 5,
      image: "/images/tiggo8pro/features/pic01_01.jpg",
      title: "Dynamic lighting combination+Concierge lights",
      text: "Advanced camera system for complete visibility",
    },
  ];

  const simpleSlides = [
    {
      image: "/images/tiggo8pro/banners/banner1.jpg",
      title: "Welcome to Our Platform",
      description:
        "Discover amazing features and benefits designed just for you.",
      ctaText: "Get Started",
      ctaLink: "/features",
    },
  ];

  const carSlides = [
    {
      type: "image",
      src: "/images/tiggocross/hero/1.webp",
      modelName: "TIGGO CROSS",
      tagline: "DESIGNED FOR EVERY JOURNEY",
      brochureLink: "/brochure-tiggo",
      testDriveLink: "/test-drive-tiggo",
      logoSrc: "/images/tiggocross/logo.webp",
      featureHighlight: {
        title: "Bold and Dynamic Design",
        description: "Experience elegance and power in every detail."
      }
    },
    {
      type: "image",
      src: "/images/tiggocross/hero/2.webp",
      modelName: "TIGGO CROSS",
      tagline: "DESIGNED FOR EVERY JOURNEY",
      brochureLink: "/brochure-tiggo",
      testDriveLink: "/test-drive-tiggo",
      logoSrc: "/images/tiggocross/logo.webp",
      featureHighlight: {
        title: "Bold and Dynamic Design",
        description: "Experience elegance and power in every detail."
      }
    },
    // {
    //   type: "video",
    //   src: "/videos/tiggo-cross-driving.mp4",
    //   modelName: "TIGGO CROSS",
    //   tagline: "EXPERIENCE THE JOURNEY",
    //   brochureLink: "/brochure-tiggo",
    //   testDriveLink: "/test-drive-tiggo",
    // },
    {
      type: "image",
      src: "/images/tiggocross/hero/3.webp",
      modelName: "ARRIZO 5",
      tagline: "EMBRACE YOUR DRIVE",
      brochureLink: "/brochure-arrizo",
      testDriveLink: "/test-drive-arrizo",
      logoSrc: "/images/tiggocross/logo.webp",
      featureHighlight: {
        title: "Sophisticated and Energetic Style",
        description: "Unleash your ambition with a sleek design."
      }
    },
  ];

  return (
    <main>
      <CarShowcaseSlider
        slides={carSlides}
        primaryColorClass="bg-primary"
        secondaryColorClass="bg-secondary"
        textColorClass="text-white"
        autoplaySpeed={5000}
      />

      <CarColorSwitcher />
      <VehicleSpecs
        category="Appearance"
        title="Dynamic/Energetic Appearance"
        subtitle="See style, see grace"
        specs={[
          { name: "Length", value: "4720", unit: "mm" },
          { name: "Width", value: "1860", unit: "mm" },
          { name: "Height", value: "1705", unit: "mm" },
          { name: "Wheelbase", value: "2710", unit: "mm" },
        ]}
      />

      <SimpleBanner
        slides={simpleSlides}
        accentColor="#8c735d"
        height="80vh"
        showControls={false}
      />
      <CarFeaturesSlider
        title="Premium Exterior Features"
        subtitle="Discover our range of elegant design elements that enhance both style and performance"
        features={myFeatures}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />
    </main>
  );
}
