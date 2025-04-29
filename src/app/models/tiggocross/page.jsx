"use client";

import CarFeaturesSlider from "@components/CarFeaturesSlider";
import Gallery from "@components/Gallery";
import SimpleBanner from "@components/SimpleBanner";
import CarShowcaseSlider from "@components/tiggo-cross/CarShowcaseSlider";
import CarTechSlider from "@components/tiggo-cross/CarTechSlider";
import VehicleSpecs from "@components/VehicleSpecs";

export default function TiggoCrossPage() {
  // =========================================
  // DATA ORGANIZATION
  // =========================================

  // Exterior Features Data
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

  // Exterior Tech Highlights
  const exteriorTechSlides = [
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider1/sunroof.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/sunroof.jpg",
      title: "Lane Keep Assist",
      description: "Intelligent system that helps maintain your vehicle in the proper lane, reducing driver fatigue.",
    },
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider1/wheels.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/wheels.jpg",
      title: "Lane Keep Assist",
      description: "Intelligent system that helps maintain your vehicle in the proper lane, reducing driver fatigue.",
    },
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider1/headlights.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/headlights.jpg",
      title: "Adaptive Cruise Control",
      description: "Smart speed management that automatically adjusts to maintain safe distance from vehicles ahead.",
    },
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider1/sunroof.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/sunroof.jpg",
      title: "Lane Keep Assist",
      description: "Intelligent system that helps maintain your vehicle in the proper lane, reducing driver fatigue.",
    },
  ];

  // Comfort Features Data
  const comfortFeatureSlides = [
    {
      mediaType: "image",
      image: "/images/tiggocross/comfort/slide1.webp",
      title: "Multifunction Steering Wheel",
      description: "",
    },
    {
      mediaType: "image",
      image: "/images/tiggocross/comfort/slide2.webp",
      title: "Ergonomic Centre Console",
      description: "",
    },
    {
      mediaType: "image",
      image: "/images/tiggocross/comfort/slide3.webp",
      title: "Dual-zone Automatic Air Conditioning",
      description: "",
    }
  ];

  // Intelligence Features Data
  const intelligenceFeatureSlides = [
    {
      mediaType: "image",
      image: "/images/tiggocross/intelligence/slide1.webp",
      title: "Dual 10.25-inch Touchscreen & Virtual Driver Cluster",
      description: "",
    },
    {
      mediaType: "image",
      image: "/images/tiggocross/intelligence/slide2.webp",
      title: "Smart Voice Assistant",
      description: "",
    },
    {
      mediaType: "image",
      image: "/images/tiggocross/intelligence/slide3.webp",
      title: "Wireless CarPlay® & Android Auto™",
      description: "",
    }
  ];

  // Security Features Data
  const securityFeatureSlides = [
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider3/high-strength-body.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/sunroof.jpg",
      title: "Reinvented Chassis Protection",
      description: "",
    },
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider3/airbags.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/wheels.jpg",
      title: "6 Airbags",
      description: "",
    },
    {
      mediaType: "video",
      videoUrl: "/videos/tiggo-cross/slider3/360-pano.mp4",
      videoPoster: "/videos/tiggo-cross/slider1/headlights.jpg",
      title: "360° HD Panoramic Camera",
      description: "",
    },
  ];

  // Gallery Images
  const galleryImages = [
    {
      src: '/images/tiggocross/gallery/gallery1.webp',
      alt: 'Tiggo Cross front view',
      title: 'Stylish Front Design'
    },
    {
      src: '/images/tiggocross/gallery/gallery2.webp',
      alt: 'Tiggo Cross side profile',
      title: 'Dynamic Side Profile'
    },
    {
      src: '/images/tiggocross/gallery/gallery3.webp',
      alt: 'Tiggo Cross interior dashboard',
      title: 'Modern Dashboard Layout'
    },
    {
      src: '/images/tiggocross/gallery/gallery4.webp',
      alt: 'Tiggo Cross rear view',
      title: 'Distinctive Rear Design'
    },
    {
      src: '/images/tiggocross/gallery/gallery5.webp',
      alt: 'Tiggo Cross interior features',
      title: 'Premium Interior Features'
    },
    {
      src: '/images/tiggocross/gallery/gallery6.webp',
      alt: 'Tiggo Cross driving shot',
      title: 'Dynamic Driving Experience'
    },
    {
      src: '/images/tiggocross/gallery/gallery7.webp',
      alt: 'Tiggo Cross technology features',
      title: 'Innovative Technology'
    }
  ];

  // Banner Slides - Organized by section
  const appearanceBannerSlides = [
    {
      image: "/images/tiggo8pro/banners/banner1.jpg",
      title: "Striking Design",
      description: "Bold lines and dynamic styling that stand out in any environment.",
      ctaText: "Explore Design",
      ctaLink: "/features/design",
    },
  ];

  const comfortBannerSlides = [
    {
      image: "/images/tiggo8pro/banners/banner1.jpg",
      videoSrc: "/videos/ambient-light.mp4",
      title: "Luxurious Comfort",
      description: "Premium materials and thoughtful design create a superior driving experience.",
      ctaText: "Explore Comfort",
      ctaLink: "/features/comfort",
    },
  ];

  const intelligenceBannerSlides = [
    {
      image: "/images/tiggo8pro/banners/banner1.jpg",
      videoSrc: "/videos/interior-design.mp4",
      title: "Intelligent Technology",
      description: "Cutting-edge innovations that enhance your driving experience.",
      ctaText: "Explore Technology",
      ctaLink: "/features/technology",
    },
  ];

  const securityBannerSlides = [
    {
      image: "/images/tiggo8pro/banners/banner1.jpg",
      videoSrc: "/videos/speakers.mp4",
      title: "Advanced Safety",
      description: "Comprehensive safety features that protect you on every journey.",
      ctaText: "Explore Safety",
      ctaLink: "/features/safety",
    },
  ];

  // Constants for styling and configuration
  const ACCENT_COLOR = "#8c735d";
  const BANNER_HEIGHT = "80vh";

  return (
    <main>
      {/* =========================================
          HERO SECTION
          ========================================= */}
      <CarShowcaseSlider />

      {/* =========================================
          APPEARANCE & EXTERIOR SECTION
          ========================================= */}
      <CarTechSlider slides={exteriorTechSlides} />

      <VehicleSpecs
        category="Appearance"
        title="Dynamic & Energetic Appearance"
        subtitle="See style, see grace"
        specs={[
          { name: "Length", value: "4720", unit: "mm" },
          { name: "Width", value: "1860", unit: "mm" },
          { name: "Height", value: "1705", unit: "mm" },
          { name: "Wheelbase", value: "2710", unit: "mm" },
        ]}
      />

      <SimpleBanner
        slides={appearanceBannerSlides}
        accentColor={ACCENT_COLOR}
        height={BANNER_HEIGHT}
        showContents={false}
        showControls={false}
        sectionTitle='Striking Lines'
        sectionSubtitle='Appearance'
        sectionText='Make a memorable entrance every time, with design that goes beyond the ordinary.'
      />

      <CarFeaturesSlider
        title="Premium Exterior Features"
        subtitle="Discover our range of elegant design elements that enhance both style and performance"
        features={exteriorFeatures}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />

      {/* =========================================
          COMFORT SECTION
          ========================================= */}
      <SimpleBanner
        slides={comfortBannerSlides}
        accentColor={ACCENT_COLOR}
        height={BANNER_HEIGHT}
        showContents={false}
        showControls={false}
        sectionTitle='Crafted Interior'
        sectionSubtitle='Comfort'
        sectionText='Comfort, Control, and a whole lot of character — every detail is designed to amplify your journeys.'
      />

      <CarTechSlider slides={comfortFeatureSlides} />

      {/* =========================================
          INTELLIGENCE & CONNECTIVITY SECTION
          ========================================= */}
      <VehicleSpecs
        category="Intelligence"
        title="Immersive Connectivity"
        subtitle="Smart features for the modern driver"
        specs={[
          { name: "Full-Liquid Crystal Infotainment Touch Screen", value: "10.25", unit: "inch" },
          { name: "Full-Liquid Crystal Instrument Display Screen", value: "10.25", unit: "inch" },
        ]}
      />
 
      <SimpleBanner
        slides={intelligenceBannerSlides}
        accentColor={ACCENT_COLOR}
        height={BANNER_HEIGHT}
        showContents={false}
        showControls={false}
        sectionTitle='Advanced Technology'
        sectionSubtitle='Intelligence'
        sectionText='Seamless connectivity and intuitive controls to enhance your driving experience.'
      />

      <CarFeaturesSlider
        title="Intelligent Features"
        subtitle="Advanced technology that keeps you connected, informed, and entertained"
        features={intelligenceFeatureSlides}
        accentColor="bg-primary-700"
        backgroundColor="bg-gray-200"
      />

      {/* =========================================
          SECURITY & SAFETY SECTION
          ========================================= */}
      <SimpleBanner
        slides={securityBannerSlides}
        accentColor={ACCENT_COLOR}
        height={BANNER_HEIGHT}
        showContents={false}
        showControls={false}
        sectionTitle='Beyond Safety'
        sectionSubtitle='Security'
        sectionText='Intelligent innovations to keep you safe on the road.'
      />

      <CarTechSlider slides={securityFeatureSlides} />

      {/* =========================================
          GALLERY SECTION
          ========================================= */}
      <Gallery 
        images={galleryImages}
        title="Gallery"
        subtitle="Experience the design charm of our flagship SUV with premium features and intelligent technology"
        aspectRatio="aspect-[16/9]"
      />
    </main>
  );
}