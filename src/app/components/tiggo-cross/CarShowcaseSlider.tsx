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
  },
  {
    id: "interior",
    src: "/images/tiggocross/hero/2.webp",
    modelName: "TIGGO CROSS",
    tagline: "COMFORT REDEFINED",
    brochureLink: "#",
    testDriveLink: "#",
  },
];

interface CarShowcaseProps {
  slides?: Slide[];
  height?: string;
  autoplaySpeed?: number;
  showControls?: boolean;
  className?: string;
}

const CarShowcase = ({
  slides = slidesData,
  height = "h-[80vh]",
  autoplaySpeed = 6000,
  showControls = false,
  className = "",
}: CarShowcaseProps) => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Design system colors based on Chery Bangladesh guidelines
  const colors = {
    primary: "#8c735d", // Primary 700
    white: "#FFFFFF",
  };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

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
                {/* Full image background with gradient overlay */}
                <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-transparent to-black/50">
                  <Image
                    src={slide.src}
                    alt={`${slide.modelName} - ${slide.tagline}`}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                    quality={90}
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
                          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 inline-block transition-colors duration-300"
                          style={{ backgroundColor: colors.primary }}
                        >
                          View Brochure
                        </a>
                      )}

                      {slide.testDriveLink && (
                        <a
                          href={slide.testDriveLink}
                          className="bg-primary hover:bg-primary/90 text-white px-8 py-3 inline-block transition-colors duration-300"
                          style={{ backgroundColor: colors.primary }}
                        >
                          Test Drive
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

      {/* Minimal pagination dots */}
      {showControls && slides.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 z-20 flex justify-center">
          <div className="flex space-x-2">
            {slides.map((_, idx) => (
              <button
                key={idx}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${activeIndex === idx ? "bg-white scale-125" : "bg-white/50"
                  }`}
                onClick={() => swiperInstance?.slideTo(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                aria-current={activeIndex === idx ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CarShowcase;