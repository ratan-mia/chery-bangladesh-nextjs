"use client";

import CarFeaturesSlider from "@components/CarFeaturesSlider";
import Gallery from "@components/Gallery";
import SimpleBanner from "@components/SimpleBanner";
import CarShowcaseSlider from "@components/tiggo-cross/CarShowcaseSlider";
import CarTechSlider from "@components/tiggo-cross/CarTechSlider";
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

  const comfortSlides = [
    {
      image: "/images/tiggo8pro/banners/banner1.jpg",
      videoSrc: "/videos/ambient-light.mp4",
      title: "Welcome to Our Platform",
      description:
        "Discover amazing features and benefits designed just for you.",
      ctaText: "Get Started",
      ctaLink: "/features",
    },
  ];

  const securitySlides = [
    {
      image: "/images/tiggo8pro/banners/banner1.jpg",
      videoSrc: "/videos/speakers.mp4",
      title: "Welcome to Our Platform",
      description:
        "Discover amazing features and benefits designed just for you.",
      ctaText: "Get Started",
      ctaLink: "/features",
    },
  ];

  const intelligenceSlides = [
    {
      image: "/images/tiggo8pro/banners/banner1.jpg",
      videoSrc: "/videos/interior-design.mp4",
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

  const comfortFeatureSlides = [

    {
      mediaType: "image",
      image: "/images/tiggocross/comfort/slide1.webp",
      title: "Multifunction Steering Wheel",
      description:
        "",
    },
    {
      mediaType: "image",
      image: "/images/tiggocross/comfort/slide2.webp",
      title: "Ergonomic Centre Console",
      description:
        "",
    },
    {
      mediaType: "image",
      image: "/images/tiggocross/comfort/slide3.webp",
      title: "Dual-zone Automatic Air Conditioning",
      description:
        "",
    }
  ];


  const intelligenceFeatureSlides = [

    {
      mediaType: "image",
      image: "/images/tiggocross/intelligence/slide1.webp",
      title: "Dual 10.25-inch Touchscreen & Virtual Driver Cluster",
      description:
        "",
    },
    {
      mediaType: "image",
      image: "/images/tiggocross/intelligence/slide2.webp",
      title: "Smart Voice Assistant",
      description:
        "",
    },
    {
      mediaType: "image",
      image: "/images/tiggocross/intelligence/slide3.webp",
      title: "Wireless CarPlay® & Android Auto™",
      description:
        "",
    }
  ];


  

  const securityFeatureSlides = [

    // {
    //   mediaType: "image",
    //   image: "/images/tech/surround-airbags.jpg",
    //   title: "Surround Airbags",
    //   description:
    //     "Complete protection with strategically placed airbags that shield passengers from all angles.",
    // },
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider3/high-strength-body.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/sunroof.jpg",
      title: "Reinvented Chassis Protection",
      description:
        "",
    },
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider3/airbags.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/wheels.jpg",
      title: "6 Airbags",
      description:
        "",
    },
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider3/360-pano.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/headlights.jpg",
      title: "360° HD Panoramic Camera",
      description:
        "",
    },
  ];

  const galleryImages = [
    {
      src: '/images/tiggocross/gallery/gallery1.webp',
      alt: 'Modern living room with minimalist furniture',
      title: 'Modern Living Room Design'
    },
    {
      src: '/images/tiggocross/gallery/gallery2.webp',
      alt: 'Kitchen with marble countertops',
      title: 'Luxury Kitchen Interior'
    },
    {
      src: '/images/tiggocross/gallery/gallery3.webp',
      alt: 'Master bedroom with large windows',
      title: 'Spacious Master Bedroom'
    },
    {
      src: '/images/tiggocross/gallery/gallery4.webp',
      alt: 'Bathroom with walk-in shower',
      title: 'Contemporary Bathroom'
    },
    {
      src: '/images/tiggocross/gallery/gallery5.webp',
      alt: 'Home office setup',
      title: 'Productivity-Focused Home Office'
    },
    {
      src: '/images/tiggocross/gallery/gallery6.webp',
      alt: 'Outdoor patio area',
      title: 'Relaxing Outdoor Space'
    },
    {
      src: '/images/tiggocross/gallery/gallery7.webp',
      alt: 'Dining room with chandelier',
      title: 'Elegant Dining Setup'
    }
  ]

  return (
    <main>
      <CarShowcaseSlider />
      <CarTechSlider slides={techSlides} />

      {/* <CarColorSwitcher /> */}
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
        showContents={false}
        showControls={false}
        sectionTitle='Striking Lines'
        sectionSubtitle='Appearance'
        sectionText='Make a memorable entrance every time, with design that goes beyond the ordinary.'
      />
      <CarFeaturesSlider
        title="Premium Exterior Features"
        subtitle="Discover our range of elegant design elements that enhance both style and performance"
        features={myFeatures}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />
      <SimpleBanner
        slides={comfortSlides}
        accentColor="#8c735d"
        height="80vh"
        showContents={false}
        showControls={false}
        sectionTitle='Crafted Interior'
        sectionSubtitle='Comfort'
        sectionText='Comfort, Control, and a whole lot of character — every detail is designed to amplify your journeys.'
      />
      <CarTechSlider slides={comfortFeatureSlides} />
      <VehicleSpecs
        category="intelligence"
        title="Immersive Connectivity"
        subtitle=""
        specs={[
          { name: "Full-Liquid Crystal Infotainment Touch Screen", value: "10.25", unit: "inch" },
          { name: "Full-Liquid Crystal Instrument Display Screen", value: "10.25", unit: "inch" },
        ]}
      />
 
      <SimpleBanner
        slides={intelligenceSlides}
        accentColor="#8c735d"
        height="80vh"
        showContents={false}
        showControls={false}
        sectionTitle=''
        sectionSubtitle=''
        sectionText=''
      />
               <CarFeaturesSlider
        title="Premium Exterior Features"
        subtitle="Discover our range of elegant design elements that enhance both style and performance"
        features={intelligenceFeatureSlides}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />

      <SimpleBanner
        slides={securitySlides}
        accentColor="#8c735d"
        height="80vh"
        showContents={false}
        showControls={false}
        sectionTitle='Beyond Safety'
        sectionSubtitle='Security'
        sectionText='Intelligent innovations to keep you safe on the road.'
      />
      <CarTechSlider slides={securityFeatureSlides} />
      <Gallery 
          images={galleryImages}
          title="Gallery"
          subtitle="Experience the design charm of our flagship SUV with premium features and intelligent technology"
          aspectRatio="aspect-[16/9]"

        />
    </main>
  );
}
