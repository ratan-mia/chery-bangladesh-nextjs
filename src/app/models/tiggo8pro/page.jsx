"use client";

import CarFeaturesSlider from "@components/CarFeaturesSlider";
import SimpleBanner from "@components/SimpleBanner";
import CarColorSwitcher from "@components/tiggo8pro/CarColorSwitcher";
import ContactBanner from "@components/tiggo8pro/ContactBanner";
import FeatureSlider from "@components/tiggo8pro/FeatureSlider";
import VehicleSpecs from "@components/VehicleSpecs";

export default function Tiggo8ProPage() {
  // =========================================
  // CONSTANTS
  // =========================================
  const ACCENT_COLOR = "#8c735d";
  const BANNER_HEIGHT = "80vh";

  // =========================================
  // APPEARANCE SECTION DATA
  // =========================================
  const exteriorFeatures = [
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

  const appearanceBannerSlides = [
    {
      image: '/images/tiggo8pro/banners/banner1.jpg',
      title: 'Striking Design',
      description: 'Bold lines and dynamic styling that stand out in any environment.',
      ctaText: 'Explore Design',
      ctaLink: '/features/design',
    }
  ];

  // =========================================
  // POWER SECTION DATA
  // =========================================
  const powerFeatures = [
    {
      id: 1,
      image: "/images/tiggo8pro/features/pic02_01.jpg",
      title: "1.6T Engine",
      text: "Powerful and efficient turbocharged performance",
    },
    {
      id: 2,
      image: "/images/tiggo8pro/features/pic02_02.jpg",
      title: "ZF All-scene intelligent 4-wheel drive",
      text: "Superior traction and control in all driving conditions",
    },
    {
      id: 3,
      image: "/images/tiggo8pro/features/pic02_03.jpg",
      title: "7DCT High-efficiency Transmission",
      text: "Smooth shifting and responsive performance",
    },
  ];

  const powerBannerSlides = [
    {
      image: '/images/tiggo8pro/banners/power.jpg',
      title: 'Powerful Performance',
      description: 'Experience the thrill of advanced engine technology and responsive handling.',
      ctaText: 'Explore Performance',
      ctaLink: '/features/performance',
    }
  ];

  // =========================================
  // INTELLIGENCE SECTION DATA
  // =========================================
  const intelligenceFeatures = [
    {
      id: 1,
      image: "/images/tiggo8pro/features/pic03_01.jpg",
      title: "10.25-inch Dual Screen Setup",
      text: "Intuitive controls and clear information display",
    },
    {
      id: 2,
      image: "/images/tiggo8pro/features/pic03_02.jpg",
      title: "Wireless Smartphone Integration",
      text: "Seamless connectivity with Apple CarPlay and Android Auto",
    },
    {
      id: 3,
      image: "/images/tiggo8pro/features/pic03_03.jpg",
      title: "Sony Premium Sound System",
      text: "Immersive audio experience with 8 high-quality speakers",
    },
    {
      id: 4,
      image: "/images/tiggo8pro/features/pic03_04.jpg",
      title: "Voice Command System",
      text: "Control vehicle functions with natural voice commands",
    },
    {
      id: 5,
      image: "/images/tiggo8pro/features/pic03_05.jpg",
      title: "Smart Connectivity Suite",
      text: "Stay connected with advanced mobile integration",
    },
  ];

  const intelligenceBannerSlides = [
    {
      image: '/images/tiggo8pro/banners/Intelligent.jpg',
      title: 'Intelligent Technology',
      description: 'Cutting-edge features that enhance your driving experience and keep you connected.',
      ctaText: 'Explore Technology',
      ctaLink: '/features/technology',
    }
  ];

  // =========================================
  // SECURITY SECTION DATA
  // =========================================
  const securityFeatures = [
    {
      id: 1,
      image: "/images/tiggo8pro/features/pic04_01.jpg",
      title: "T1X Platform",
      text: "Advanced architecture for superior safety and stability",
    },
    {
      id: 2,
      image: "/images/tiggo8pro/features/pic04_02.jpg",
      title: "Advanced Driver Assistance Systems (ADAS)",
      text: "Comprehensive suite of safety technologies",
    },
    {
      id: 3,
      image: "/images/tiggo8pro/features/pic04_03.jpg",
      title: "Intelligent Embedded Driving Recorder",
      text: "Automatic recording for added security and peace of mind",
    },
    {
      id: 4,
      image: "/images/tiggo8pro/features/pic04_04.jpg",
      title: "9 Safety Airbags",
      text: "Comprehensive protection for all occupants",
    },
  ];

  const securityBannerSlides = [
    {
      image: '/images/tiggo8pro/banners/security.jpg',
      title: 'Advanced Safety',
      description: 'Comprehensive protection systems that keep you and your passengers secure.',
      ctaText: 'Explore Safety',
      ctaLink: '/features/safety',
    }
  ];

  return (
    <main>
      {/* =========================================
          HERO SECTION
          ========================================= */}
      <FeatureSlider />
      
      {/* =========================================
          APPEARANCE SECTION
          ========================================= */}
      <CarColorSwitcher />
      
      <VehicleSpecs
        category="Appearance"
        title="Dynamic & Energetic Appearance"
        subtitle="See style, see grace"
        specs={[
          { name: "Length", value: "4722", unit: "mm" },
          { name: "Width", value: "1860", unit: "mm" },
          { name: "Height", value: "1705", unit: "mm" },
          { name: "Wheelbase", value: "2710", unit: "mm" },
        ]}
      />

      <SimpleBanner
        slides={appearanceBannerSlides}
        accentColor={ACCENT_COLOR}
        height={BANNER_HEIGHT}
        showControls={false}
      />
      
      <CarFeaturesSlider
        title="Premium Exterior Features"
        subtitle="Discover our range of elegant design elements that enhance both style and performance"
        features={exteriorFeatures}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />
      
      {/* =========================================
          POWER & PERFORMANCE SECTION
          ========================================= */}
      <VehicleSpecs
        category="Power"
        title="Chery Power-1.6T"
        subtitle="Supreme power, easy elegance"
        specs={[
          { name: "Maximum Power", value: "195", unit: "BHP" },
          { name: "Maximum Torque", value: "290", unit: "Nm" },
          { name: "Transmission", value: "7", unit: "Speed Dual Clutch" },
          { name: "Fuel Tank Capacity", value: "51", unit: "L" },
        ]}
      />
      
      <SimpleBanner
        slides={powerBannerSlides}
        accentColor={ACCENT_COLOR}
        height={BANNER_HEIGHT}
        showControls={false}
      />

      <CarFeaturesSlider
        title="Performance Features"
        subtitle="Experience the perfect balance of power, efficiency, and driving dynamics"
        features={powerFeatures}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />
      
      {/* =========================================
          INTELLIGENCE & TECHNOLOGY SECTION
          ========================================= */}
      <VehicleSpecs
        category="Intelligent"
        title="Intelligent Entertainment Cockpit"
        subtitle="Smart Comfort for Every Smooth Drive"
        specs={[
          { name: "Speakers (Sony HD)", value: "8", unit: "" },
          { name: "Dual Curved Screen", value: "24.6", unit: "inch" },
          { name: "Panoramic Image", value: "360", unit: "°" },
          { name: "Intelligent Voice Assistant", value: "N", unit: "+" },
        ]}
      />
      
      <SimpleBanner
        slides={intelligenceBannerSlides}
        accentColor={ACCENT_COLOR}
        height={BANNER_HEIGHT}
        showControls={false}
      />
      
      <CarFeaturesSlider
        title="Intelligent Features"
        subtitle="Advanced technology that enhances comfort, convenience, and entertainment"
        features={intelligenceFeatures}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />
      
      {/* =========================================
          SECURITY & SAFETY SECTION
          ========================================= */}
      <VehicleSpecs
        category="Security"
        title="Ultimate Security"
        subtitle="Advanced protection for peace of mind"
        specs={[
          { name: "Safety Airbags", value: "9", unit: "" },
          { name: "ADAS Functions", value: "15", unit: "" },
        ]}
      />
      
      <SimpleBanner
        slides={securityBannerSlides}
        accentColor={ACCENT_COLOR}
        height={BANNER_HEIGHT}
        showControls={false}
      />

      <CarFeaturesSlider
        title="Safety & Security Features"
        subtitle="Comprehensive protection systems for you and your passengers"
        features={securityFeatures}
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