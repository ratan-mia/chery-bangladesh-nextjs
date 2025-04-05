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
      modelName: "Model X",
      tagline: "The Ultimate Electric SUV",
      description: "Experience unparalleled performance with our flagship electric SUV featuring advanced autopilot capabilities and up to 360 miles of range.",
      src: "/images/tiggocross/hero/2.webp",
      logoSrc: "/images/brand-logo.svg",
      brochureLink: "/brochures/model-x",
      testDriveLink: "/test-drive/model-x",
      specs: {
        "Range": "360 miles",
        "0-60": "2.5s",
        "Top Speed": "155 mph",
        "Power": "1,020 hp"
      },
      featureHighlight: {
        title: "Falcon Wing Doors",
        description: "Unique upward-opening doors that provide easier access to second and third row seats, even in tight parking spaces."
      }
    },
    {
      modelName: "Model S",
      tagline: "Beyond Ludicrous",
      description: "Our high-performance sedan redefines electric luxury with best-in-class acceleration, range, and safety features.",
      src: "/images/tiggocross/hero/1.webp",
      logoSrc: "/images/brand-logo.svg", 
      brochureLink: "/brochures/model-s",
      testDriveLink: "/test-drive/model-s",
      specs: {
        "Range": "405 miles",
        "0-60": "1.99s",
        "Top Speed": "200 mph",
        "Power": "1,100 hp"
      },
      featureHighlight: {
        title: "Performance Mode",
        description: "Unleash the full potential with our track-optimized performance mode that delivers maximum acceleration and responsiveness."
      }
    }
    // {
    //   modelName: "Roadster",
    //   tagline: "The Future of Hypercars",
    //   description: "The quickest car in the world, with record-setting acceleration, range, and performance.",
    //   type: "video",
    //   src: "/videos/roadster.mp4",
    //   logoSrc: "/images/brand-logo.svg",
    //   brochureLink: "/brochures/roadster",
    //   testDriveLink: "/test-drive/roadster",
    //   specs: {
    //     "Range": "620 miles",
    //     "0-60": "1.9s",
    //     "Top Speed": "250+ mph",
    //     "Torque": "10,000 Nm"
    //   },
    //   featureHighlight: {
    //     title: "SpaceX Package",
    //     description: "Cold air thrusters dramatically improve acceleration, top speed, braking and cornering."
    //   }
    // }
  ];


  return (
    <main>
        <CarShowcaseSlider 
          slides={carSlides} 
          primaryColorClass="bg-gray-900"
          secondaryColorClass="bg-blue-600"
          autoplaySpeed={6000}
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
