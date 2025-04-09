"use client";

import CarFeaturesSlider from "../components/CarFeaturesSlider";
import SimpleBanner from "../components/SimpleBanner";
import CarShowcaseSlider from "../components/tiggo-cross/CarShowcaseSlider";
import CarTechSlider from "../components/tiggo-cross/CarTechSlider";
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

  const cheryVehicles = [
    {
      modelName: "Chery",
      tagline: "Tiggo Cross",
      description:
        "The perfect blend of dynamic styling and advanced technology. The Tiggo Cross delivers a premium driving experience with versatile capabilities for both urban commuting and weekend adventures.",
      src: "/images/tiggocross/hero/1.webp", // Using the provided URL
      logoSrc: "/images/chery-logo.png",
      type: "image",
      specs: {
        ENGINE: "1.5L Turbo",
        POWER: "145 HP",
        TORQUE: "210 Nm",
        TRANSMISSION: "CVT",
      },
      featureHighlight: {
        title: "Smart Voice Control",
        description:
          "Advanced voice recognition system lets you control vehicle functions with natural language commands.",
      },
      brochureLink: "/vehicles/chery/tiggo-cross",
      testDriveLink: "/test-drive/chery/tiggo-cross",
    },
    {
      modelName: "Chery",
      tagline: "Tiggo 7 Pro",
      description:
        "A perfect combination of modern design, intelligent technology and superior comfort. The Tiggo 7 Pro is designed to exceed expectations with its premium features and engaging driving dynamics.",
      src: "/images/tiggocross/hero/2.webp", // Using the provided URL
      logoSrc: "/images/chery-logo.png",
      type: "image",
      specs: {
        ENGINE: "1.6T GDI",
        POWER: "197 HP",
        TORQUE: "290 Nm",
        DRIVE: "AWD",
      },
      featureHighlight: {
        title: "Panoramic Sunroof",
        description:
          "Expansive glass roof that creates an open, airy cabin experience with one-touch controls.",
      },
      brochureLink: "/vehicles/chery/tiggo-7-pro",
      testDriveLink: "/test-drive/chery/tiggo-7-pro",
    },
    {
      modelName: "Chery",
      tagline: "Arrizo 8",
      description:
        "The flagship sedan that combines elegant styling with cutting-edge technology. The Arrizo 8 represents Chery's commitment to premium quality and sophisticated design.",
      src: "/images/chery-arrizo8.jpg",
      logoSrc: "/images/chery-logo.png",
      type: "image",
      specs: {
        ENGINE: "2.0T TGDI",
        POWER: "254 HP",
        ACCELERATION: "7.5s (0-100km/h)",
        "FUEL ECONOMY": "6.8L/100km",
      },
      featureHighlight: {
        title: "ADAS System",
        description:
          "Comprehensive suite of driver assistance features including adaptive cruise control and lane keeping assist.",
      },
      brochureLink: "/vehicles/chery/arrizo-8",
      testDriveLink: "/test-drive/chery/arrizo-8",
    },
  ];

  

  const techSlides = [
 
    // {
    //   mediaType: "image",
    //   image: "/images/tech/surround-airbags.jpg",
    //   title: "Surround Airbags",
    //   description:
    //     "Complete protection with strategically placed airbags that shield passengers from all angles.",
    // },
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider1/sunroof.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/sunroof.jpg",
      title: "Lane Keep Assist",
      description:
        "Intelligent system that helps maintain your vehicle in the proper lane, reducing driver fatigue.",
    },
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider1/wheels.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/wheels.jpg",
      title: "Lane Keep Assist",
      description:
        "Intelligent system that helps maintain your vehicle in the proper lane, reducing driver fatigue.",
    },
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider1/headlights.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/headlights.jpg",
      title: "Adaptive Cruise Control",
      description:
        "Smart speed management that automatically adjusts to maintain safe distance from vehicles ahead.",
    },
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider1/sunroof.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/sunroof.jpg",
      title: "Lane Keep Assist",
      description:
        "Intelligent system that helps maintain your vehicle in the proper lane, reducing driver fatigue.",
    },
  ];

  return (
    <main>
      <CarShowcaseSlider />
      <CarTechSlider slides={techSlides} />
    
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
