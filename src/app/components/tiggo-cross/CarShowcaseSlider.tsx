import { motion } from "framer-motion";
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
  type: "image" | "video";
  src: string;
  modelName: string;
  tagline: string;
  description?: string;
  specs?: { [key: string]: string | number };
  features?: string[];
  brochureLink?: string;
  testDriveLink?: string;
}

const slidesData: Slide[] = [
  {
    id: "exterior",
    type: "image",
    src: "/images/tiggocross/hero/1.webp",
    modelName: "TIGGO CROSS",
    tagline: "FOR EVERY KIND OF YOU",
    specs: {
      Engine: "1.5L Turbo",
      Power: "145 HP",
      Torque: "210 Nm",
      "0-100 km/h": "9.9 sec",
    },
    features: ["Dynamic Styling", "LED Lighting", "18\" Alloy Wheels"],
    brochureLink: "#",
    testDriveLink: "#",
  },
  {
    id: "interior",
    type: "image",
    src: "/images/tiggocross/hero/2.webp",
    modelName: "TIGGO CROSS",
    tagline: "COMFORT REDEFINED",
    specs: {
      Seats: "5 Leather",
      Display: '10.25" Touchscreen',
      Sound: "8-Speaker System",
      "Panoramic Roof": "Available",
    },
    features: ["Ambient Lighting", "Heated Seats", "Dual-Zone Climate"],
    brochureLink: "#",
    testDriveLink: "#",
  },
];

interface CarShowcaseProps {
  slides?: Slide[];
  height?: string;
  autoplaySpeed?: number;
  showControls?: boolean;
  showSpecs?: boolean;
  className?: string;
  theme?: "dark" | "light";
  contentPosition?: "left" | "right";
}

const CarShowcase = ({
  slides = slidesData,
  height = "h-[700px]",
  autoplaySpeed = 6000,
  showControls = true,
  showSpecs = true,
  className = "",
  theme = "dark",
  contentPosition = "left",
}: CarShowcaseProps) => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Apply theme colors with reduced opacity settings
  const colors = theme === "dark"
    ? {
      accent: '#e2cdb8',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.95)',
      buttonBg: '#e2cdb8',
      buttonText: '#111827',
      accentLine: '#e2cdb8',
      contentBg: 'rgba(17, 24, 39, 0.40)',
      controlBg: 'rgba(17, 24, 39, 0.30)',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.5)'
    }
    : {
      accent: '#1a365d',
      text: '#111827',
      textSecondary: 'rgba(26, 32, 44, 0.95)',
      buttonBg: '#1a365d',
      buttonText: '#ffffff',
      accentLine: '#1a365d',
      contentBg: 'rgba(255, 255, 255, 0.40)',
      controlBg: 'rgba(255, 255, 255, 0.30)',
      textShadow: '0 2px 4px rgba(0, 0, 0, 0.3)'
    };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const toggleAutoplay = useCallback(() => {
    if (swiperInstance) {
      if (isPlaying) {
        swiperInstance.autoplay.stop();
      } else {
        swiperInstance.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, swiperInstance]);

  if (!slides || slides.length === 0) {
    return (
      <div
        className={`flex items-center justify-center ${height}`}
        style={{ color: colors.text }}
      >
        <p className="text-xl font-light">No vehicles available to display</p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${className} ${height}`}
      role="region"
      aria-label="Car showcase slider"
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
                {/* Full image background with no overlay */}
                <motion.div
                  className="absolute inset-0 z-0"
                  initial={{ scale: 1.05 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 20, ease: "easeOut" }}
                >
                  <Image
                    src={slide.src}
                    alt=""
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                    aria-hidden="true"
                    quality={90}
                  />
                </motion.div>

                {/* Side-positioned content card with glow effect */}
                <div className="relative z-20 h-full flex items-center">
                  <div className={`w-full max-w-md p-8 ${contentPosition === 'left' ? 'ml-8 md:ml-16' : 'ml-auto mr-8 md:mr-16'}`}>
                    <motion.div
                      className="relative"
                      initial="hidden"
                      animate="visible"
                      variants={containerVariants}
                    >
                      {/* Glow effect behind content */}
                      <div
                        className="absolute inset-0 blur-3xl opacity-20 z-0"
                        style={{
                          background: `radial-gradient(circle at center, ${colors.accent}44 0%, transparent 70%)`,
                          transform: 'translate(0, -5%)'
                        }}
                        aria-hidden="true"
                      ></div>

                      {/* Content card with minimal background */}
                      <motion.div
                        className="backdrop-blur-sm p-8 rounded-xl relative z-10"
                        style={{
                          backgroundColor: colors.contentBg,
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
                        }}
                        variants={itemVariants}
                      >
                        {/* Accent line */}
                        <div
                          className="h-1.5 w-28 mb-6"
                          style={{ backgroundColor: colors.accentLine }}
                        ></div>

                        <motion.h2
                          className="text-5xl font-bold mb-2"
                          style={{
                            color: colors.text,
                            textShadow: colors.textShadow
                          }}
                          variants={itemVariants}
                        >
                          {slide.modelName}
                        </motion.h2>

                        <motion.p
                          className="text-2xl font-light mb-6"
                          style={{
                            color: colors.textSecondary,
                            textShadow: colors.textShadow
                          }}
                          variants={itemVariants}
                        >
                          {slide.tagline}
                        </motion.p>

                        {slide.description && (
                          <motion.p
                            className="text-lg mb-6"
                            style={{ color: colors.textSecondary }}
                            variants={itemVariants}
                          >
                            {slide.description}
                          </motion.p>
                        )}

                        {/* Features list */}
                        {slide.features && slide.features.length > 0 && (
                          <motion.ul
                            className="space-y-2 mb-6"
                            variants={itemVariants}
                          >
                            {slide.features.map((feature, idx) => (
                              <li
                                key={idx}
                                className="flex items-center"
                                style={{ color: colors.textSecondary }}
                              >
                                <span className="mr-2 text-lg" style={{ color: colors.accent }}>•</span>
                                {feature}
                              </li>
                            ))}
                          </motion.ul>
                        )}

                        {/* Action buttons */}
                        <motion.div
                          className="flex flex-wrap gap-4 mt-6"
                          variants={itemVariants}
                        >
                          {slide.brochureLink && (
                            <a
                              href={slide.brochureLink}
                              className="inline-flex items-center justify-center px-6 py-3 rounded-lg transition-all duration-200"
                              style={{
                                backgroundColor: colors.buttonBg,
                                color: colors.buttonText,
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                              }}
                            >
                              Download Brochure
                              <svg className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                                <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-7.707a1 1 0 011.414 0L10 11.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
                              </svg>
                            </a>
                          )}

                          {slide.testDriveLink && (
                            <a
                              href={slide.testDriveLink}
                              className="inline-flex items-center justify-center px-6 py-3 rounded-lg transition-all duration-200"
                              style={{
                                borderWidth: '2px',
                                borderStyle: 'solid',
                                borderColor: colors.accent,
                                color: colors.text,
                                textShadow: colors.textShadow
                              }}
                            >
                              Test Drive
                            </a>
                          )}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Specs panel at bottom */}
                {showSpecs && slide.specs && (
                  <div className="absolute bottom-8 left-0 right-0 z-30 px-8 md:px-16">
                    <motion.div
                      className="backdrop-blur-md p-4 rounded-xl overflow-hidden"
                      style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.20)',
                      }}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {Object.entries(slide.specs).map(([key, value], idx) => (
                          <div key={key} className={idx > 0 ? "border-l border-opacity-20 pl-6" : ""}>
                            <span
                              className="block text-xs uppercase tracking-wide mb-1"
                              style={{ color: 'rgba(255, 255, 255, 0.7)' }}
                            >
                              {key}
                            </span>
                            <span
                              className="block text-xl font-medium"
                              style={{
                                color: colors.text,
                                textShadow: colors.textShadow
                              }}
                            >
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Minimal floating controls */}
      {showControls && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-4 z-40 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-lg"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18L9 12L15 6" />
            </svg>
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-4 z-40 w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-lg"
            style={{
              backgroundColor: 'rgba(0, 0, 0, 0.15)',
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6L15 12L9 18" />
            </svg>
          </button>

          {/* Controls pager */}
          <div className="absolute bottom-8 right-8 z-40 flex items-center space-x-4">
            <button
              onClick={toggleAutoplay}
              className="w-10 h-10 flex items-center justify-center rounded-full backdrop-blur-lg"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
              }}
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill="white"
                >
                  <path d="M6 4l15 8-15 8V4z" />
                </svg>
              )}
            </button>

            <div
              className="flex items-center px-3 py-1 rounded-full backdrop-blur-lg"
              style={{
                backgroundColor: 'rgba(0, 0, 0, 0.15)',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
              }}
            >
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  className="w-2 h-2 mx-1 rounded-full transition-all duration-300 ease-in-out"
                  style={{
                    backgroundColor: activeIndex === idx ? 'white' : 'rgba(255, 255, 255, 0.5)',
                    transform: activeIndex === idx ? 'scale(1.5)' : 'scale(1)'
                  }}
                  onClick={() => swiperInstance?.slideTo(idx)}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CarShowcase;
