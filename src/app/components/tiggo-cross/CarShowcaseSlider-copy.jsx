import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { useCallback, useEffect, useState } from "react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";

// Sample data
const slidesData = [
  {
    id: "exterior",
    type: "image",
    src: "/images/tiggocross/hero/1.webp",
    modelName: "TIGGO CROSS",
    tagline: "FOR EVERY KIND OF YOU",
    description: "Elevate your everyday drive with bold styling and advanced features that adapt to your lifestyle.",
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
    description: "Experience premium materials and thoughtful design for journeys that feel as good as they look.",
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

function CarShowcase({
  slides = slidesData,
  height = "h-[700px]",
  autoplaySpeed = 6000,
  showControls = true,
  showSpecs = true,
  className = "",
  theme = "light",
  contentPosition = "left",
}) {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState(null);

  // Animation variants for staggered animations
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
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] }
    }
  };

  // Apply theme colors based on design system
  const colors = theme === "dark"
    ? {
      accent: '#8c735d',       // primary-700
      accentHover: '#524336',  // primary-900
      text: '#111827',         // gray-900
      textSecondary: '#4B5563', // gray-600
      buttonBg: '#8c735d',     // primary-700
      buttonText: '#FFFFFF',   // white
      accentLine: '#b7a99a',   // primary-800
      contentBg: 'rgba(255, 255, 255, 0.85)',
      controlBg: 'rgba(17, 24, 39, 0.60)'
    }
    : {
      accent: '#8c735d',       // primary-700
      accentHover: '#524336',  // primary-900
      text: '#111827',         // gray-900
      textSecondary: '#4B5563', // gray-600
      buttonBg: '#8c735d',     // primary-700
      buttonText: '#FFFFFF',   // white
      accentLine: '#b7a99a',   // primary-800
      contentBg: 'rgba(255, 255, 255, 0.95)',
      controlBg: 'rgba(255, 255, 255, 0.85)'
    };

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSlideChange = useCallback((swiper) => {
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
          speed={800}
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
                {/* Background image */}
                <div className="absolute inset-0 z-0">
                  <Image
                    src={slide.src}
                    alt={`${slide.modelName} - ${slide.tagline}`}
                    fill
                    priority
                    className="object-cover object-center"
                    sizes="100vw"
                    aria-hidden="true"
                    quality={90}
                  />
                  {/* Gradient overlay */}
                  <div
                    className="absolute inset-0 bg-gradient-to-r"
                    style={{
                      background: contentPosition === 'left'
                        ? 'linear-gradient(90deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)'
                        : 'linear-gradient(270deg, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.1) 50%, rgba(0,0,0,0) 100%)'
                    }}
                  />
                </div>

                {/* Content card */}
                <div className="relative z-20 h-full flex items-center">
                  <div className={`w-full max-w-lg px-4 md:px-0 ${contentPosition === 'left' ? 'ml-4 md:ml-16' : 'ml-auto mr-4 md:mr-16'}`}>
                    <motion.div
                      className="relative"
                      initial="hidden"
                      animate="visible"
                      variants={containerVariants}
                    >
                      <motion.div
                        className="backdrop-blur-md p-8 rounded-sm relative z-10 border-l-2 shadow-md"
                        style={{
                          backgroundColor: colors.contentBg,
                          borderColor: colors.accent,
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
                        }}
                        variants={itemVariants}
                      >
                        {/* Accent line */}
                        <div
                          className="h-1 w-24 mb-6"
                          style={{ backgroundColor: colors.accentLine }}
                        ></div>

                        <motion.h2
                          className="text-3xl md:text-4xl font-bold mb-2 tracking-tight leading-tight"
                          style={{ color: colors.text }}
                          variants={itemVariants}
                        >
                          {slide.modelName}
                        </motion.h2>

                        <motion.p
                          className="text-xl md:text-2xl font-medium mb-4 tracking-wide"
                          style={{ color: colors.textSecondary }}
                          variants={itemVariants}
                        >
                          {slide.tagline}
                        </motion.p>

                        {slide.description && (
                          <motion.p
                            className="text-base mb-6 leading-normal"
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
                              className="group inline-flex items-center px-10 py-4 font-medium hover:bg-primary-900 transition-all duration-300"
                              style={{
                                backgroundColor: colors.buttonBg,
                                color: colors.buttonText,
                                boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                              }}
                            >
                              Download Brochure
                              <ArrowRight
                                size={20}
                                className="ml-2 group-hover:ml-3 transition-all duration-300"
                              />
                            </a>
                          )}

                          {slide.testDriveLink && (
                            <a
                              href={slide.testDriveLink}
                              className="inline-flex items-center justify-center bg-transparent border-2 px-10 py-3.5 font-medium transition-all duration-300 hover:bg-primary-700/10"
                              style={{
                                borderColor: colors.accent,
                                color: colors.text
                              }}
                            >
                              Schedule Test Drive
                            </a>
                          )}
                        </motion.div>
                      </motion.div>
                    </motion.div>
                  </div>
                </div>

                {/* Specs panel */}
                {showSpecs && slide.specs && (
                  <div className="absolute bottom-0 left-0 right-0 z-30 px-4 md:px-16">
                    <motion.div
                      className="backdrop-blur-md p-4 border-t border-primary-800/30"
                      style={{
                        backgroundColor: 'rgba(255, 255, 255, 0.80)',
                      }}
                      initial={{ y: 50, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
                        {Object.entries(slide.specs).map(([key, value], idx) => (
                          <div key={key} className={idx > 0 ? "border-l border-primary-800/20 pl-6" : ""}>
                            <span
                              className="block text-xs uppercase tracking-wider mb-1 font-medium"
                              style={{ color: colors.accent }}
                            >
                              {key}
                            </span>
                            <span
                              className="block text-xl font-medium"
                              style={{ color: colors.text }}
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

      {/* Navigation controls */}
      {showControls && (
        <>
          {/* Previous button */}
          <button
            className="absolute top-1/2 -translate-y-1/2 left-4 z-40 w-12 h-12 flex items-center justify-center backdrop-blur-lg rounded-sm border border-gray-200/20 hover:border-primary-700 transition-colors duration-300"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18L9 12L15 6" />
            </svg>
          </button>

          {/* Next button */}
          <button
            className="absolute top-1/2 -translate-y-1/2 right-4 z-40 w-12 h-12 flex items-center justify-center backdrop-blur-lg rounded-sm border border-gray-200/20 hover:border-primary-700 transition-colors duration-300"
            style={{
              backgroundColor: 'rgba(255, 255, 255, 0.15)',
              boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
            }}
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              stroke={colors.accent}
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 6L15 12L9 18" />
            </svg>
          </button>

          {/* Controls at bottom */}
          <div className="absolute bottom-24 right-8 z-40 flex items-center space-x-4">
            {/* Play/Pause button */}
            <button
              onClick={toggleAutoplay}
              className="w-10 h-10 flex items-center justify-center backdrop-blur-lg rounded-sm border border-gray-200/20 hover:border-primary-700 transition-colors duration-300"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
              }}
              aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isPlaying ? (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill={colors.accent}
                >
                  <rect x="6" y="4" width="4" height="16" rx="1" />
                  <rect x="14" y="4" width="4" height="16" rx="1" />
                </svg>
              ) : (
                <svg
                  className="w-5 h-5"
                  viewBox="0 0 24 24"
                  fill={colors.accent}
                >
                  <path d="M6 4l15 8-15 8V4z" />
                </svg>
              )}
            </button>

            {/* Slide indicators */}
            <div
              className="flex items-center px-3 py-1 backdrop-blur-lg rounded-sm border border-gray-200/20"
              style={{
                backgroundColor: 'rgba(255, 255, 255, 0.15)',
                boxShadow: '0 0 15px rgba(0, 0, 0, 0.1)'
              }}
            >
              {slides.map((_, idx) => (
                <button
                  key={idx}
                  className="w-2 h-2 mx-1 rounded-full transition-all duration-300 ease-in-out"
                  style={{
                    backgroundColor: activeIndex === idx ? colors.accent : 'rgba(140, 115, 93, 0.5)',
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
}

export default CarShowcase;