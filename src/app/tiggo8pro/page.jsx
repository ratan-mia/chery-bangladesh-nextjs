"use client";

import CarFeaturesSlider from "../components/CarFeaturesSlider-v1";
import SimpleBanner from "../components/SimpleBanner";
import CarColorSwitcher from "../components/tiggo8pro/CarColorSwitcher";
import FeatureSlider from "../components/tiggo8pro/FeatureSlider";
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
      image: '/images/tiggo8pro/banners/banner1.jpg',
      title: 'Welcome to Our Platform',
      description: 'Discover amazing features and benefits designed just for you.',
      ctaText: 'Get Started',
      ctaLink: '/features',
    }
  ];

  return (
    <main>
      <FeatureSlider />
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
