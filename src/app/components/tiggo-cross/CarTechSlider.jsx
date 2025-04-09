"use client";

import Image from "next/image";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  A11y,
  Autoplay,
  EffectCoverflow,
  EffectFade,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/a11y";
import "swiper/css/effect-coverflow";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";

// Theme configuration based on the Climate Design System
const themes = {
  dark: {
    accent: "#e2cdb8", // Lighter tan for better contrast
    text: "#ffffff", // Pure white text
    textSecondary: "rgba(255, 255, 255, 0.95)", // Higher opacity for better readability
    buttonBg: "#e2cdb8", // Accent color for primary button
    buttonText: "#111827", // Dark text on primary button
    accentLine: "#e2cdb8", // Accent line color
    contentBg: "rgba(17, 24, 39, 0.85)", // Semi-transparent background for text content
    backgroundOverlay: "rgba(17, 24, 39, 0.97)",
    cardBg: "rgba(30, 41, 59, 0.95)",
    featureIconBg: "rgba(226, 205, 184, 0.15)",
    sectionBg: "rgba(17, 24, 39, 1)",
    borderColor: "rgba(226, 205, 184, 0.2)",
    placeholder: "rgba(30, 41, 59, 0.95)",
  },
  light: {
    accent: "#1a365d", // Deep blue color
    text: "#111827", // Dark text
    textSecondary: "rgba(26, 32, 44, 0.95)", // Higher opacity for better readability
    buttonBg: "#1a365d", // Accent color for primary button
    buttonText: "#ffffff", // White text on primary button
    accentLine: "#1a365d", // Accent line color
    contentBg: "rgba(255, 255, 255, 0.9)", // Semi-transparent white background
    backgroundOverlay: "rgba(255, 255, 255, 0.97)",
    cardBg: "rgba(241, 245, 249, 0.95)",
    featureIconBg: "rgba(26, 54, 93, 0.1)",
    sectionBg: "rgba(249, 250, 251, 1)",
    borderColor: "rgba(26, 54, 93, 0.2)",
    placeholder: "rgba(241, 245, 249, 0.95)",
  },
};

// Media placeholder components
const ImagePlaceholder = ({ currentTheme }) => {
  const theme = themes[currentTheme];

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: theme.placeholder,
        borderColor: theme.borderColor,
      }}
    >
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: theme.accent }}
      >
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <circle cx="8.5" cy="8.5" r="1.5"></circle>
        <polyline points="21 15 16 10 5 21"></polyline>
      </svg>
    </div>
  );
};

const VideoPlaceholder = ({ currentTheme }) => {
  const theme = themes[currentTheme];

  return (
    <div
      className="w-full h-full flex items-center justify-center"
      style={{
        backgroundColor: theme.placeholder,
        borderColor: theme.borderColor,
      }}
    >
      <svg
        className="w-10 h-10"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ color: theme.accent }}
      >
        <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
      </svg>
    </div>
  );
};

// Video player component
const VideoPlayer = ({ src, poster, currentTheme }) => {
  const videoRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const theme = themes[currentTheme];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const togglePlay = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="relative w-full h-full overflow-hidden group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover"
        muted
        loop
        playsInline
        poster={poster}
        aria-label="Feature demonstration video"
      >
        {isVisible && <source src={src} type="video/mp4" />}
        Your browser does not support the video tag.
      </video>

      <div
        onClick={togglePlay}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 
          flex items-center justify-center rounded-full cursor-pointer 
          transition-all duration-300 opacity-90 group-hover:opacity-100 group-hover:scale-105
          backdrop-blur-sm"
        style={{ backgroundColor: `${theme.accent}90` }}
        aria-hidden="true"
      >
        <svg
          className="w-8 h-8"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          style={{ color: theme.buttonText }}
        >
          {isPlaying ? (
            <rect x="6" y="4" width="4" height="16" fill="currentColor" />
          ) : (
            <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
          )}
        </svg>
      </div>
    </div>
  );
};

// Navigation buttons component
const NavigationButtons = ({
  onPrev,
  onNext,
  currentTheme,
  layout = "standard",
}) => {
  const theme = themes[currentTheme];
  const baseButtonClasses =
    "flex items-center justify-center transition-all duration-200";

  const buttonStyleClasses = {
    showcase: "absolute top-1/2 -translate-y-1/2 z-10",
    filmstrip: "mt-4",
    cards: "",
    standard: "",
  };

  const prevBtnClasses = `${baseButtonClasses} ${
    buttonStyleClasses[layout] || ""
  } ${layout === "showcase" ? "left-4" : ""}`;
  const nextBtnClasses = `${baseButtonClasses} ${
    buttonStyleClasses[layout] || ""
  } ${layout === "showcase" ? "right-4" : ""}`;

  const buttonStyles = {
    backgroundColor: theme.buttonBg,
    color: theme.buttonText,
    width: "40px",
    height: "40px",
    borderRadius: layout === "minimal" ? "50%" : "4px",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  };

  if (layout === "showcase") {
    return (
      <>
        <button
          onClick={onPrev}
          className={prevBtnClasses}
          style={buttonStyles}
          aria-label="Previous slide"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M15 19L8 12L15 5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
        <button
          onClick={onNext}
          className={nextBtnClasses}
          style={buttonStyles}
          aria-label="Next slide"
        >
          <svg
            className="w-5 h-5"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M9 5L16 12L9 19"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </>
    );
  }

  return (
    <div className="flex justify-center space-x-3">
      <button
        onClick={onPrev}
        className={prevBtnClasses}
        style={buttonStyles}
        aria-label="Previous slide"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M15 19L8 12L15 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <button
        onClick={onNext}
        className={nextBtnClasses}
        style={buttonStyles}
        aria-label="Next slide"
      >
        <svg
          className="w-5 h-5"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 5L16 12L9 19"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
    </div>
  );
};

// Pagination component
const PaginationIndicator = ({
  activeIndex,
  totalSlides,
  onDotClick,
  currentTheme,
}) => {
  const slideIndices = Array.from({ length: totalSlides }, (_, i) => i);
  const theme = themes[currentTheme];

  const getDotStyle = (isActive) => {
    const baseStyle = {
      transition: "all 0.3s",
      cursor: "pointer",
    };

    if (isActive) {
      return {
        ...baseStyle,
        backgroundColor: theme.accent,
        transform: "scale(1.1)",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
      };
    }

    return {
      ...baseStyle,
      backgroundColor: `${theme.accent}40`,
      width: "8px",
      height: "8px",
      borderRadius: "50%",
    };
  };

  return (
    <div className="flex items-center justify-center space-x-2 py-2">
      {slideIndices.map((index) => (
        <button
          key={index}
          style={getDotStyle(index === activeIndex)}
          onClick={() => onDotClick(index)}
          aria-label={`Go to slide ${index + 1}`}
          aria-current={index === activeIndex ? "true" : "false"}
        />
      ))}
    </div>
  );
};

// Main component
const CarTechSlider = ({
  slides = [],
  className = "",
  title = "Featured Technology",
  autoplay = false,
  autoplaySpeed = 5000,
  showCaptions = true,
  layout = "standard",
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState(null);
  const [currentTheme, setCurrentTheme] = useState("light"); // Default to light theme
  const sectionRef = useRef(null);
  const [isInView, setIsInView] = useState(false);

  const theme = themes[currentTheme];

  // Toggle theme function
  const toggleTheme = () => {
    setCurrentTheme(currentTheme === "dark" ? "light" : "dark");
  };

  const getEffectiveTotalSlides = () => {
    if (layout === "showcase" || layout === "cards") {
      return slides.length;
    }
    if (layout === "filmstrip") {
      return Math.ceil(slides.length / 4);
    }
    return Math.ceil(slides.length / 3);
  };

  const effectiveTotalSlides = getEffectiveTotalSlides();

  const handlePrev = useCallback(() => {
    swiperInstance?.slidePrev();
  }, [swiperInstance]);

  const handleNext = useCallback(() => {
    swiperInstance?.slideNext();
  }, [swiperInstance]);

  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const handleDotClick = useCallback(
    (index) => {
      swiperInstance?.slideTo(index);
    },
    [swiperInstance]
  );

  // Observer to check if section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (swiperInstance && autoplay) {
      if (isHovering) {
        swiperInstance.autoplay?.stop();
      } else {
        swiperInstance.autoplay?.start();
      }
    }
  }, [isHovering, autoplay, swiperInstance]);

  if (!slides.length) {
    return null;
  }

  const getSwiperOptions = () => {
    const baseOptions = {
      loop: slides.length > 1,
      autoplay: autoplay
        ? {
            delay: autoplaySpeed,
            disableOnInteraction: false,
          }
        : false,
      direction: "horizontal",
      watchSlidesProgress: true,
    };

    switch (layout) {
      case "showcase":
        return {
          ...baseOptions,
          slidesPerView: 1,
          spaceBetween: 0,
          centeredSlides: true,
          effect: "fade",
          fadeEffect: {
            crossFade: true,
          },
        };

      case "filmstrip":
        return {
          ...baseOptions,
          slidesPerView: 1.5,
          spaceBetween: 12,
          centeredSlides: false,
          breakpoints: {
            480: {
              slidesPerView: 2.5,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 3.5,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 4.5,
              spaceBetween: 24,
            },
          },
        };

      case "cards":
        return {
          ...baseOptions,
          slidesPerView: 1.2,
          spaceBetween: 16,
          centeredSlides: true,
          effect: "coverflow",
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 100,
            modifier: 2,
            slideShadows: false,
          },
          breakpoints: {
            480: {
              slidesPerView: 1.5,
            },
            640: {
              slidesPerView: 2.2,
            },
            1024: {
              slidesPerView: 3.2,
            },
          },
        };

      default:
        return {
          ...baseOptions,
          slidesPerView: 1,
          spaceBetween: 16,
          breakpoints: {
            480: {
              slidesPerView: 1.5,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 3,
              spaceBetween: 24,
            },
          },
        };
    }
  };

  return (
    <section    ref={sectionRef} className="w-full py-8 md:py-12 relative overflow-hidden"
    style={{
      backgroundColor: theme.sectionBg,
      color: theme.text,
      borderTop: `1px solid ${theme.borderColor}`,
      borderBottom: `1px solid ${theme.borderColor}`,
    }}
    aria-labelledby="car-tech-slider-title"
    onMouseEnter={() => setIsHovering(true)}
    onMouseLeave={() => setIsHovering(false)}
    >
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-brown-900 dark:text-brown-50 mb-10">
          Advanced Safety Technology
        </h2>

        <div>
          {/* Theme switcher in top-right corner */}
          <div className="absolute top-4 right-4 md:right-8 z-20">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full transition-all duration-300 ease-in-out"
              style={{
                backgroundColor: `${theme.accent}20`,
                border: `1px solid ${theme.accent}40`,
              }}
              aria-label={`Switch to ${
                currentTheme === "dark" ? "light" : "dark"
              } theme`}
            >
              {currentTheme === "dark" ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill={theme.accent}
                >
                  <path
                    fillRule="evenodd"
                    d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                    clipRule="evenodd"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill={theme.accent}
                >
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
          </div>

          <div
            className={`mx-auto px-4 sm:px-6 ${
              layout === "filmstrip" ? "max-w-full" : "max-w-7xl"
            }`}
          >
            {/* Accent line element */}
            {title && (
              <div className="flex justify-center mb-4">
                <div
                  className="h-1 w-24"
                  style={{
                    backgroundColor: theme.accentLine,
                    width: isInView ? "96px" : "0",
                    transition: "width 0.6s ease-out",
                  }}
                ></div>
              </div>
            )}

            {title && (
              <h2
                id="car-tech-slider-title"
                className="text-2xl md:text-3xl font-bold mb-8 text-center transition-opacity duration-500"
                style={{
                  color: theme.text,
                  opacity: isInView ? 1 : 0,
                  transform: isInView ? "translateY(0)" : "translateY(20px)",
                  transition: "opacity 0.5s, transform 0.5s",
                }}
              >
                {title}
              </h2>
            )}

            <div className="relative mx-auto">
              {layout === "showcase" && slides.length > 1 && (
                <NavigationButtons
                  onPrev={handlePrev}
                  onNext={handleNext}
                  currentTheme={currentTheme}
                  layout={layout}
                />
              )}

              <Swiper
                onSwiper={setSwiperInstance}
                modules={[
                  Navigation,
                  Pagination,
                  A11y,
                  Autoplay,
                  EffectFade,
                  EffectCoverflow,
                ]}
                {...getSwiperOptions()}
                onSlideChange={handleSlideChange}
                navigation={{
                  nextEl: ".car-tech-next",
                  prevEl: ".car-tech-prev",
                }}
                className={`mb-6 ${layout === "cards" ? "py-6" : ""}`}
                a11y={{
                  prevSlideMessage: "Previous slide",
                  nextSlideMessage: "Next slide",
                  firstSlideMessage: "This is the first slide",
                  lastSlideMessage: "This is the last slide",
                }}
              >
                {slides.map((slide, index) => (
                  <SwiperSlide key={slide.id || index} className="h-auto">
                    <div
                      className="h-full flex flex-col backdrop-blur-sm"
                      style={{
                        backgroundColor:
                          layout === "cards" ? theme.cardBg : "transparent",
                        padding: layout === "cards" ? "12px" : "0",
                        borderRadius: layout === "cards" ? "8px" : "0",
                        border:
                          layout === "cards"
                            ? `1px solid ${theme.borderColor}`
                            : "none",
                        boxShadow:
                          layout === "cards"
                            ? `0 4px 6px -1px rgba(0, 0, 0, ${
                                currentTheme === "dark" ? "0.2" : "0.1"
                              })`
                            : "none",
                        transition: "transform 0.3s, box-shadow 0.3s",
                      }}
                    >
                      <div
                        className={`relative overflow-hidden flex-grow ${
                          layout === "showcase"
                            ? "aspect-[16/9]"
                            : layout === "filmstrip"
                            ? "aspect-square"
                            : "aspect-[4/3]"
                        }`}
                      >
                        {slide.mediaType === "image" ? (
                          slide.image ? (
                            <div className="relative w-full h-full">
                              <Image
                                src={slide.image}
                                alt={slide.title || "Feature image"}
                                className="object-cover"
                                style={{ borderRadius: "4px" }}
                                fill
                                priority={index < 3}
                                sizes={
                                  layout === "showcase"
                                    ? "100vw"
                                    : "(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                                }
                              />
                            </div>
                          ) : (
                            <ImagePlaceholder currentTheme={currentTheme} />
                          )
                        ) : slide.videoUrl ? (
                          <VideoPlayer
                            src={slide.videoUrl}
                            poster={slide.videoPoster}
                            currentTheme={currentTheme}
                          />
                        ) : (
                          <VideoPlaceholder currentTheme={currentTheme} />
                        )}
                      </div>

                      {showCaptions && (
                        <div
                          className={
                            layout === "showcase"
                              ? "absolute bottom-0 left-0 right-0 p-6 pt-16"
                              : "mt-4 px-1"
                          }
                          style={{
                            background:
                              layout === "showcase"
                                ? "linear-gradient(to top, rgba(0,0,0,0.8), transparent)"
                                : "transparent",
                          }}
                        >
                          <h3
                            className="text-lg font-semibold mb-2"
                            style={{
                              color:
                                layout === "showcase" ? "#ffffff" : theme.text,
                            }}
                          >
                            {slide.title}
                          </h3>
                          {slide.description && (
                            <p
                              className="text-sm line-clamp-2"
                              style={{
                                color:
                                  layout === "showcase"
                                    ? "rgba(255, 255, 255, 0.9)"
                                    : theme.textSecondary,
                              }}
                            >
                              {slide.description}
                            </p>
                          )}
                        </div>
                      )}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {slides.length > 1 && (
                <div className="flex flex-col items-center space-y-4">
                  <PaginationIndicator
                    activeIndex={activeIndex}
                    totalSlides={effectiveTotalSlides}
                    onDotClick={handleDotClick}
                    currentTheme={currentTheme}
                  />

                  {layout !== "showcase" && (
                    <NavigationButtons
                      onPrev={handlePrev}
                      onNext={handleNext}
                      currentTheme={currentTheme}
                      layout={layout}
                    />
                  )}
                </div>
              )}

              <div className="hidden">
                <button className="car-tech-prev" aria-hidden="true" />
                <button className="car-tech-next" aria-hidden="true" />
              </div>
            </div>
          </div>

          <style jsx global>{`
            @keyframes progressAnim {
              0% {
                width: 0%;
              }
              100% {
                width: 100%;
              }
            }

            .swiper-slide-active .animate-in {
              animation: fadeInUp 0.5s ease forwards;
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
      </div>
    </section>
  );
};

export default CarTechSlider;
