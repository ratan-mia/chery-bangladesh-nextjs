'use client';

import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import type { Swiper as SwiperType } from "swiper";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

interface Slide {
  id?: string;
  src: string;
  modelName: string;
  tagline: string;
  brochureLink?: string;
  testDriveLink?: string;
  buttonText?: {
    brochure?: string;
    testDrive?: string;
  };
}

// Sample data if none is provided
const slidesData: Slide[] = [
  {
    id: "exterior",
    src: "/images/tiggocross/hero/1.webp",
    modelName: "TIGGO CROSS",
    tagline: "FOR EVERY KIND OF YOU",
    brochureLink: "#",
    testDriveLink: "#",
    buttonText: {
      brochure: "View Brochure",
      testDrive: "Test Drive"
    }
  },
  {
    id: "interior",
    src: "/images/tiggocross/hero/2.webp",
    modelName: "TIGGO CROSS",
    tagline: "COMFORT REDEFINED",
    brochureLink: "#",
    testDriveLink: "#",
    buttonText: {
      brochure: "View Brochure",
      testDrive: "Test Drive"
    }
  },
];

interface CarShowcaseProps {
  slides?: Slide[];
  height?: string;
  autoplaySpeed?: number;
  showNavigation?: boolean;
  className?: string;
  buttonColor?: string;
  navigationPosition?: 'top' | 'middle' | 'bottom';
  navigationStyle?: 'dots' | 'lines';
}

const CarShowcase = ({
  slides = slidesData,
  height = "h-[80vh]",
  autoplaySpeed = 6000,
  showNavigation = true,
  className = "",
  buttonColor = "#8c735d", // Primary 700 from Chery design system
  navigationPosition = 'bottom',
  navigationStyle = 'lines',
}: CarShowcaseProps) => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  // Check if on mobile device for responsive adjustments
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);

    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  // Calculate navigation position
  const getNavigationPosition = () => {
    switch (navigationPosition) {
      case 'top':
        return 'top-8';
      case 'middle':
        return 'top-1/2 -translate-y-1/2';
      default:
        return 'bottom-10 md:bottom-12';
    }
  };

  if (!slides || slides.length === 0) {
    return (
      <div
        className={`flex items-center justify-center ${height} bg-gray-900`}
      >
        <p className="text-white text-xl">No vehicles available to display</p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${className} ${height}`}
      role="region"
      aria-label="Car showcase"
    >
      {mounted && (
        <Swiper
          modules={[Autoplay, EffectFade, Navigation]}
          effect="fade"
          speed={1000}
          slidesPerView={1}
          loop={true}
          autoplay={
            isPlaying
              ? {
                delay: autoplaySpeed,
                disableOnInteraction: false,
              }
              : false
          }
          onSlideChange={handleSlideChange}
          onSwiper={setSwiperInstance}
          className="h-full w-full"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={slide.id || index} className="h-full">
              <div className="relative h-full w-full">
                {/* Background gradient for better text readability */}
                <div
                  className="absolute inset-0 z-0 bg-gradient-to-b from-black/10 via-transparent to-black/60"
                  aria-hidden="true"
                >
                  <Image
                    src={slide.src}
                    alt={`${slide.modelName} - ${slide.tagline}`}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                    quality={95}
                  />
                </div>

                {/* Simple content positioned at bottom */}
                <div className="absolute bottom-0 left-0 right-0 z-10 p-8 md:p-12 lg:p-16">
                  <div className="max-w-7xl mx-auto">
                    <h2 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider uppercase mb-2">
                      {slide.modelName}
                    </h2>
                    <p className="text-white text-lg md:text-xl uppercase tracking-wide mb-8">
                      {slide.tagline}
                    </p>

                    <div className="flex flex-wrap gap-4">
                      {slide.brochureLink && (
                        <a
                          href={slide.brochureLink}
                          className="text-white px-8 py-3 inline-block transition-colors duration-300"
                          style={{ backgroundColor: buttonColor }}
                        >
                          {slide.buttonText?.brochure || "View Brochure"}
                        </a>
                      )}

                      {slide.testDriveLink && (
                        <a
                          href={slide.testDriveLink}
                          className="text-white px-8 py-3 inline-block transition-colors duration-300"
                          style={{ backgroundColor: buttonColor }}
                        >
                          {slide.buttonText?.testDrive || "Test Drive"}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Navigation indicators as lines */}
      {showNavigation && slides.length > 1 && (
        <div className={`absolute ${getNavigationPosition()} left-0 right-0 z-20 flex justify-center`}>
          <div className="flex items-center space-x-3">
            {slides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => swiperInstance?.slideTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={activeIndex === idx ? "true" : "false"}
                className={navigationStyle === 'lines'
                  ? `h-0.5 transition-all duration-500 ${activeIndex === idx
                    ? "w-8 bg-white"
                    : "w-4 bg-white/40 hover:bg-white/60"}`
                  : `w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
                  }`
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Minimal arrow navigation for desktop */}
      <div className="hidden md:block">
        <button
          onClick={() => swiperInstance?.slidePrev()}
          className="absolute left-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center"
          aria-label="Previous slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={() => swiperInstance?.slideNext()}
          className="absolute right-6 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center"
          aria-label="Next slide"
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white"
          >
            <path
              d="M9 5L16 12L9 19"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default CarShowcase;