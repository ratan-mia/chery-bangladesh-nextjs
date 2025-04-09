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
}

const CarShowcase = ({
  slides = slidesData,
  height = "h-[700px]",
  autoplaySpeed = 6000,
  showControls = true,
  showSpecs = true,
  className = "",
  theme = "dark",
}: CarShowcaseProps) => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  // Apply theme colors
  const colors = theme === "dark"
    ? {
      accent: '#e2cdb8',
      text: '#ffffff',
      textSecondary: 'rgba(255, 255, 255, 0.95)',
      buttonBg: '#e2cdb8',
      buttonText: '#111827',
      accentLine: '#e2cdb8',
      contentBg: 'rgba(17, 24, 39, 0.85)',
    }
    : {
      accent: '#1a365d',
      text: '#111827',
      textSecondary: 'rgba(26, 32, 44, 0.95)',
      buttonBg: '#1a365d',
      buttonText: '#ffffff',
      accentLine: '#1a365d',
      contentBg: 'rgba(255, 255, 255, 0.9)',
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
                {/* Background Image */}
                <div className="absolute inset-0 z-0">
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

                  {/* Custom overlay */}
                  <div
                    className="absolute inset-0 z-10"
                    style={{
                      background: theme === "dark"
                        ? 'linear-gradient(to bottom, rgba(17, 24, 39, 0.9), rgba(17, 24, 39, 0.95))'
                        : 'linear-gradient(to bottom, rgba(255, 255, 255, 0.85), rgba(255, 255, 255, 0.9))'
                    }}
                  ></div>
                </div>

                {/* Content */}
                <div className="relative z-20 h-full flex flex-col justify-center p-8 md:p-16">
                  <div
                    className="backdrop-blur-sm p-8 md:p-10 rounded-xl"
                    style={{
                      backgroundColor: colors.contentBg,
                      boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.06)',
                    }}
                  >
                    {/* Accent line */}
                    <div
                      className="h-1.5 w-28"
                      style={{ backgroundColor: colors.accentLine }}
                    ></div>

                    <div className="mt-6">
                      <h2
                        className="text-5xl font-bold -tracking-tight leading-tight"
                        style={{ color: colors.text }}
                      >
                        {slide.modelName}
                      </h2>

                      <p
                        className="text-2xl font-light leading-relaxed mt-2"
                        style={{ color: colors.textSecondary }}
                      >
                        {slide.tagline}
                      </p>

                      {slide.description && (
                        <p
                          className="text-lg leading-relaxed mt-4"
                          style={{ color: colors.textSecondary }}
                        >
                          {slide.description}
                        </p>
                      )}

                      {/* Features */}
                      {slide.features && slide.features.length > 0 && (
                        <div className="mt-6 space-y-2">
                          {slide.features.map((feature, idx) => (
                            <div
                              key={idx}
                              className="flex items-center"
                            >
                              <svg
                                className="w-5 h-5 mr-2"
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                style={{ color: colors.accent }}
                              >
                                <path
                                  d="M7 13L10 16L17 9"
                                  stroke="currentColor"
                                  strokeWidth="2"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                />
                              </svg>
                              <span style={{ color: colors.textSecondary }}>
                                {feature}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Buttons */}
                      <div className="mt-8 flex flex-wrap gap-4">
                        {slide.brochureLink && (
                          <a
                            href={slide.brochureLink}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-lg font-medium transition-all duration-200"
                            style={{
                              backgroundColor: colors.buttonBg,
                              color: colors.buttonText,
                              boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                            }}
                            aria-label={`Download brochure for ${slide.modelName}`}
                          >
                            Download Brochure
                          </a>
                        )}

                        {slide.testDriveLink && (
                          <a
                            href={slide.testDriveLink}
                            className="inline-flex items-center justify-center px-8 py-4 rounded-lg transition-all duration-200"
                            style={{
                              borderWidth: '2px',
                              borderStyle: 'solid',
                              borderColor: colors.accent,
                              color: colors.text,
                              background: 'rgba(255, 255, 255, 0.1)'
                            }}
                            aria-label={`Test drive ${slide.modelName}`}
                          >
                            Test Drive
                          </a>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Specifications */}
                  {showSpecs && slide.specs && (
                    <div className="mt-8">
                      <div
                        className="backdrop-blur-sm p-6 rounded-xl"
                        style={{
                          backgroundColor: colors.contentBg,
                          boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.06)'
                        }}
                      >
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                          {Object.entries(slide.specs).map(([key, value], idx) => (
                            <div key={key} className={idx > 0 ? "border-l pl-6" : ""}>
                              <span
                                className="block text-xs uppercase tracking-wide mb-1"
                                style={{ color: colors.textSecondary }}
                              >
                                {key}
                              </span>
                              <span
                                className="block text-xl font-light"
                                style={{ color: colors.text }}
                              >
                                {value}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Controls */}
      {showControls && (
        <>
          <button
            className="absolute top-1/2 -translate-y-1/2 left-4 z-40 w-10 h-10 flex items-center justify-center rounded-full"
            style={{
              background: colors.contentBg,
            }}
            onClick={() => swiperInstance?.slidePrev()}
            aria-label="Previous slide"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: colors.text }}
            >
              <path
                d="M15 18L9 12L15 6"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            className="absolute top-1/2 -translate-y-1/2 right-4 z-40 w-10 h-10 flex items-center justify-center rounded-full"
            style={{
              background: colors.contentBg,
            }}
            onClick={() => swiperInstance?.slideNext()}
            aria-label="Next slide"
          >
            <svg
              className="w-6 h-6"
              viewBox="0 0 24 24"
              fill="none"
              style={{ color: colors.text }}
            >
              <path
                d="M9 6L15 12L9 18"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          <button
            onClick={toggleAutoplay}
            className="absolute bottom-6 right-6 z-40 w-10 h-10 flex items-center justify-center rounded-full"
            style={{
              background: colors.contentBg,
            }}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
          >
            {isPlaying ? (
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: colors.text }}
              >
                <rect
                  x="7"
                  y="6"
                  width="3"
                  height="12"
                  rx="1"
                  fill="currentColor"
                />
                <rect
                  x="14"
                  y="6"
                  width="3"
                  height="12"
                  rx="1"
                  fill="currentColor"
                />
              </svg>
            ) : (
              <svg
                className="w-5 h-5"
                viewBox="0 0 24 24"
                fill="none"
                style={{ color: colors.text }}
              >
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
              </svg>
            )}
          </button>

          <div
            className="absolute bottom-6 left-6 z-40 px-3 py-2 rounded"
            style={{ background: colors.contentBg }}
          >
            <p style={{ color: colors.text }}>
              <span className="text-lg">{activeIndex + 1}</span>
              <span className="mx-2 opacity-40">/</span>
              <span className="opacity-70">{slides.length}</span>
            </p>
          </div>
        </>
      )}

      <style jsx global>{`
        .swiper-slide-active .fade-in-up {
          animation: fadeInUp 0.8s ease forwards;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CarShowcase;
