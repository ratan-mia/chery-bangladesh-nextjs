"use client";

import CarFeaturesSlider from "@components/CarFeaturesSlider";
import SimpleBanner from "@components/SimpleBanner";
import CarColorSwitcher from "@components/tiggo8pro/CarColorSwitcher";
import ContactBanner from "@components/tiggo8pro/ContactBanner";
import FeatureSlider from "@components/tiggo8pro/FeatureSlider";
import VehicleSpecs from "@components/VehicleSpecs";

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

  const powerFeatures = [
    {
      id: 1,
      image: "/images/tiggo8pro/features/pic02_01.jpg",
      title: "2.0TGDI Engine",
      text: "",
    },
    {
      id: 2,
      image: "/images/tiggo8pro/features/pic02_02.jpg",
      title: 'ZF All-scene intelligent 4-wheel drive"',
      text: "",
    },
    {
      id: 3,
      image: "/images/tiggo8pro/features/pic02_03.jpg",
      title: "7DCT High-efficiency Transmission",
      text: "",
    },
  ];



  const intelligenFeatures = [
    {
      id: 1,
      image: "/images/tiggo8pro/features/pic03_01.jpg",
      title: "Dynamic lighting combination+Concierge lights",
      text: "Advanced camera system for complete visibility",
    },
    {
      id: 2,
      image: "/images/tiggo8pro/features/pic03_02.jpg",
      title: '19 "glossy sport hub"',
      text: "Fast and convenient charging for all your devices",
    },
    {
      id: 3,
      image: "/images/tiggo8pro/features/pic03_03.jpg",
      title: "Matrix Diamond Front Grille",
      text: "Cutting-edge heads-up display technology",
    },
    {
      id: 4,
      image: "/images/tiggo8pro/features/pic03_04.jpg",
      title: "Matrix Diamond Front Grille",
      text: "Cutting-edge heads-up display technology",
    },
    {
      id: 5,
      image: "/images/tiggo8pro/features/pic03_05.jpg",
      title: "Dynamic lighting combination+Concierge lights",
      text: "Advanced camera system for complete visibility",
    },
  ];


  const securityFeatures = [
    {
      id: 1,
      image: "/images/tiggo8pro/features/pic04_01.jpg",
      title: "T1X platform",
      text: "",
    },
    {
      id: 2,
      image: "/images/tiggo8pro/features/pic04_02.jpg",
      title: 'ADAS"',
      text: "",
    },
    {
      id: 3,
      image: "/images/tiggo8pro/features/pic04_03.jpg",
      title: "Intelligent embedded driving recorder",
      text: "Cutting-edge heads-up display technology",
    },
    {
      id: 4,
      image: "/images/tiggo8pro/features/pic04_04.jpg",
      title: "Matrix Diamond Front Grille",
      text: "Cutting-edge heads-up display technology",
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

  const powerSlides = [
    {
      image: '/images/tiggo8pro/banners/power.jpg',
      title: 'Welcome to Our Platform',
      description: 'Discover amazing features and benefits designed just for you.',
      ctaText: 'Get Started',
      ctaLink: '/features',
    }
  ];

  const IntelligentSlides = [
    {
      image: '/images/tiggo8pro/banners/Intelligent.jpg',
      title: 'Welcome to Our Platform',
      description: 'Discover amazing features and benefits designed just for you.',
      ctaText: 'Get Started',
      ctaLink: '/features',
    }
  ];


  const SecuritytSlides = [
    {
      image: '/images/tiggo8pro/banners/security.jpg',
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
      <VehicleSpecs
        category="Power"
        title="Chery Power-2.0TGDI"
        subtitle="Supreme power, easy elegance"
        specs={[
          { name: "Maximum Power", value: "145", unit: "kw" },
          { name: "Maximum Torque", value: "375", unit: "N-m" },
          { name: "Fuel consumption", value: "7.39", unit: "L/100km" },
          { name: "Driving modes", value: "6", unit: "" },
        ]}
      />
      <SimpleBanner
        slides={powerSlides}
        accentColor="#8c735d"
        height="80vh"
        showControls={false}
      />

      <CarFeaturesSlider
        title="Premium Exterior Features"
        subtitle="Discover our range of elegant design elements that enhance both style and performance"
        features={powerFeatures}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />
      <VehicleSpecs
        category="Intelligent"
        title="Intelligent/Entertainment cockpit"
        subtitle="Smart Comfort for Every Smooth Drive"
        specs={[
          { name: "Speakers", value: "10", unit: "" },
          { name: "Dual screen", value: "24.6", unit: "inch" },
          { name: "Panoramic image", value: "540", unit: "°" },
          { name: "Multilingual intelligent voice interaction", value: "N", unit: "+" },
        ]}
      />
      <SimpleBanner
        slides={IntelligentSlides}
        accentColor="#8c735d"
        height="80vh"
        showControls={false}
      />
      <CarFeaturesSlider
        title="Premium Exterior Features"
        subtitle="Discover our range of elegant design elements that enhance both style and performance"
        features={intelligenFeatures}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />
      <VehicleSpecs
        category="Security"
        title="Ultimate Security"
        subtitle=""
        specs={[
          { name: "Safety airbags", value: "9", unit: "" },
          { name: "ADAS functions", value: "15", unit: "" },
        ]}
      />
      <SimpleBanner
        slides={SecuritytSlides}
        accentColor="#8c735d"
        height="80vh"
        showControls={false}
      />

      <CarFeaturesSlider
        title="Premium Exterior Features"
        subtitle="Discover our range of elegant design elements that enhance both style and performance"
        features={securityFeatures}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />
      <ContactBanner/>

    </main>
  );
}
