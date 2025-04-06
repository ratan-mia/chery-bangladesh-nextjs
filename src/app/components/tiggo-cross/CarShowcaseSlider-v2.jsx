// components/CarShowcaseSlider.jsx
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CarShowcaseSlider = ({ 
  slides = [], 
  primaryColorClass = "bg-gray-900", 
  secondaryColorClass = "bg-blue-500", 
  textColorClass = "text-white", 
  autoplaySpeed = 5000, 
  showPagination = false,
  showNavigation = true,
  aspectRatio = "aspect-[16/9]", // Default aspect ratio
  flatDesign = true,
  showSpecs = true,
  showAutoplayControl = true
}) => {
  const [mounted, setMounted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const swiperRef = useRef(null);

  // Only render client-side to prevent hydration issues with Swiper
  useEffect(() => {
    setMounted(true);
    
    // Clean up on unmount
    return () => {
      if (swiperRef.current?.swiper?.autoplay) {
        swiperRef.current.swiper.autoplay.stop();
      }
    };
  }, []);

  // Handle resize for responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (swiperRef.current?.swiper) {
        swiperRef.current.swiper.update();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Memoize pagination config for performance
  const paginationConfig = useCallback(() => ({
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className} w-12 h-1 rounded-none ${secondaryColorClass.replace('bg-', 'bg-')} opacity-50 hover:opacity-80 mx-1"></span>`;
    },
    bulletActiveClass: 'opacity-100 !w-16'
  }), [secondaryColorClass]);

  // Animation variants
  const contentAnimations = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.4,
        staggerChildren: 0.1
      }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { 
        duration: 0.3,
        staggerChildren: 0.05,
        staggerDirection: -1
      }
    }
  };

  const itemAnimations = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  };

  // Button animation variants
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.03, transition: { duration: 0.2 } },
    tap: { scale: 0.97, transition: { duration: 0.1 } }
  };

  // Empty state handling
  if (!slides || slides.length === 0) {
    return (
      <motion.div 
        className={`p-8 text-center ${primaryColorClass} ${textColorClass} flex items-center justify-center min-h-[50vh] ${aspectRatio}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>No slides available to display</p>
      </motion.div>
    );
  }

  // Handle media loading errors
  const handleMediaError = (e) => {
    console.error("Media loading error:", e);
    e.target.src = "/images/tiggocross/hero/3.webp"; // Provide a fallback image
  };

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    if (!swiperRef.current?.swiper) return;
    
    if (isPlaying) {
      swiperRef.current.swiper.autoplay.stop();
    } else {
      swiperRef.current.swiper.autoplay.start();
    }
    
    setIsPlaying(!isPlaying);
  };

  // Dynamic styles
  const swiperStyles = `
    .swiper-pagination {
      bottom: 40px !important;
    }
    
    .swiper-pagination-bullet {
      height: 2px;
      width: 48px;
      margin: 0 5px;
      transition: all 0.3s ease;
      opacity: 0.6;
      background-color: white;
    }
    
    .swiper-pagination-bullet-active {
      width: 64px;
      opacity: 1;
    }
    
    .swiper-button-prev, 
    .swiper-button-next {
      color: white;
      background: rgba(0, 0, 0, 0.3);
      width: ${flatDesign ? '40px' : '46px'};
      height: ${flatDesign ? '40px' : '46px'};
      border-radius: ${flatDesign ? '0' : '50%'};
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.3s ease;
      transform: translateY(-50%);
    }
    
    .swiper-button-prev:hover, 
    .swiper-button-next:hover {
      background: rgba(0, 0, 0, 0.5);
      transform: translateY(-50%) scale(1.05);
    }
    
    .swiper-button-prev:after, 
    .swiper-button-next:after {
      font-size: 18px;
      font-weight: bold;
    }
    
    .swiper-button-disabled {
      opacity: 0.35;
      cursor: auto;
      pointer-events: none;
    }
    
    .autoplay-control {
      position: absolute;
      bottom: 40px;
      right: 40px;
      z-index: 20;
      background: rgba(0, 0, 0, 0.3);
      width: 40px;
      height: 40px;
      border-radius: ${flatDesign ? '0' : '50%'};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.3s ease;
    }
    
    .autoplay-control:hover {
      background: rgba(0, 0, 0, 0.5);
      transform: scale(1.05);
    }
  `;

  // Model indicator style
  const modelIndicatorStyle = flatDesign 
    ? "absolute top-0 left-0 bg-black/70 py-4 px-8 z-30"
    : "absolute top-10 left-10 bg-black/50 backdrop-blur-sm rounded-lg py-3 px-6 z-30";

  return (
    <motion.section 
      className={`relative w-full overflow-hidden ${primaryColorClass}`} 
      aria-label="Car Showcase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      {/* CSS styles */}
      <style jsx global>{swiperStyles}</style>

      {/* Model indicator */}
      <motion.div 
        className={modelIndicatorStyle}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.p 
            key={`indicator-${activeIndex}`}
            className={`${textColorClass} text-sm font-medium tracking-widest uppercase`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {slides[activeIndex]?.modelName || ''}
          </motion.p>
        </AnimatePresence>
      </motion.div>

      {mounted && (
        <div className={`w-full ${aspectRatio}`}>
          <Swiper
            ref={swiperRef}
            modules={[EffectFade, Navigation, Pagination, Autoplay]}
            effect="fade"
            speed={1000}
            slidesPerView={1}
            navigation={showNavigation}
            pagination={showPagination ? paginationConfig() : false}
            autoplay={isPlaying ? {
              delay: autoplaySpeed,
              disableOnInteraction: false,
            } : false}
            loop={true}
            onSlideChange={handleSlideChange}
            className="relative w-full h-full"
            a11y={{
              prevSlideMessage: 'Previous slide',
              nextSlideMessage: 'Next slide',
              firstSlideMessage: 'This is the first slide',
              lastSlideMessage: 'This is the last slide',
              paginationBulletMessage: 'Go to slide {{index}}'
            }}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={`slide-${index}-${slide.modelName}`} className="w-full h-full">
                {/* Media container */}
                <div className="absolute inset-0 w-full h-full">
                  {slide.type === 'video' ? (
                    <video
                      src={slide.src}
                      className="w-full h-full object-cover"
                      autoPlay
                      loop
                      muted
                      playsInline
                      onError={handleMediaError}
                      aria-label={`Video of ${slide.modelName}`}
                    />
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={slide.src}
                        alt={`${slide.modelName} - ${slide.tagline}`}
                        fill
                        sizes="100vw"
                        style={{ 
                          objectFit: 'cover',
                          objectPosition: 'center' 
                        }}
                        priority={index === 0}
                        onError={handleMediaError}
                        loading={index === 0 ? "eager" : "lazy"}
                        quality={90}
                      />
                    </div>
                  )}
                  
                  {/* Overlay with gradient */}
                  <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/50"></div>
                  
                  {/* Car logo */}
                  {slide.logoSrc && (
                    <motion.div 
                      className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ delay: 0.5, duration: 0.5 }}
                    >
                      <div className="relative w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40">
                        <Image
                          src={slide.logoSrc}
                          alt={`${slide.modelName} logo`}
                          fill
                          style={{ objectFit: 'contain' }}
                          className="drop-shadow-xl"
                        />
                      </div>
                    </motion.div>
                  )}
                  
                  {/* Feature highlight */}
                  {slide.featureHighlight && (
                    <motion.div 
                      className="absolute top-1/2 right-16 transform -translate-y-1/2 max-w-sm z-20 text-right hidden md:block"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      transition={{ delay: 0.6, duration: 0.5 }}
                    >
                      <div className="bg-black/40 backdrop-blur-sm p-6 inline-block">
                        <h3 className="text-white text-2xl font-light uppercase tracking-wider mb-3">
                          {slide.featureHighlight.title}
                        </h3>
                        <p className="text-white/90 text-base">
                          {slide.featureHighlight.description}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </div>

                {/* Text content overlay */}
                <div className="relative z-30 h-full flex items-end">
                  <AnimatePresence mode="wait">
                    {activeIndex === index && (
                      <motion.div 
                        className={flatDesign 
                          ? "w-full py-6 sm:py-10 lg:py-16 px-4 sm:px-6 md:px-10 bg-black/70"
                          : "container mx-auto px-4 sm:px-6 md:px-10 lg:px-20 pb-16 sm:pb-20 lg:pb-24"
                        }
                        key={`content-${index}`}
                        variants={contentAnimations}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                      >
                        {!flatDesign && (
                          <>
                            <motion.h2 
                              className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold tracking-wider ${textColorClass} uppercase mb-2 sm:mb-3`}
                              variants={itemAnimations}
                            >
                              {slide.modelName}
                            </motion.h2>
                            <motion.p 
                              className={`text-lg sm:text-xl md:text-2xl mt-1 sm:mt-2 mb-4 sm:mb-6 md:mb-10 tracking-widest ${textColorClass} uppercase`}
                              variants={itemAnimations}
                            >
                              {slide.tagline}
                            </motion.p>
                          </>
                        )}
                        
                        {flatDesign && (
                          <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 md:gap-10">
                            <div>
                              <motion.p 
                                className={`text-lg sm:text-xl md:text-2xl tracking-widest ${textColorClass} uppercase mb-2 sm:mb-3`}
                                variants={itemAnimations}
                              >
                                {slide.tagline}
                              </motion.p>
                              
                              {slide.description && (
                                <motion.p 
                                  className={`${textColorClass} text-sm sm:text-base md:text-lg max-w-2xl opacity-90`}
                                  variants={itemAnimations}
                                >
                                  {slide.description}
                                </motion.p>
                              )}
                            </div>
                            
                            <motion.div 
                              className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6 md:mt-0"
                              variants={itemAnimations}
                            >
                              {slide.brochureLink && (
                                <motion.div
                                  variants={buttonVariants}
                                  initial="initial"
                                  whileHover="hover"
                                  whileTap="tap"
                                >
                                  <Link 
                                    href={slide.brochureLink} 
                                    className={`${secondaryColorClass} ${textColorClass} py-2 sm:py-3 px-6 sm:px-8 text-center font-medium hover:shadow-xl block text-sm sm:text-base`}
                                    aria-label={`View brochure for ${slide.modelName}`}
                                  >
                                    View Brochure
                                  </Link>
                                </motion.div>
                              )}
                              
                              {slide.testDriveLink && (
                                <motion.div
                                  variants={buttonVariants}
                                  initial="initial"
                                  whileHover="hover"
                                  whileTap="tap"
                                >
                                  <Link 
                                    href={slide.testDriveLink} 
                                    className={`bg-white text-gray-900 py-2 sm:py-3 px-6 sm:px-8 text-center font-medium hover:shadow-xl block text-sm sm:text-base`}
                                    aria-label={`Schedule test drive for ${slide.modelName}`}
                                  >
                                    Test Drive
                                  </Link>
                                </motion.div>
                              )}
                            </motion.div>
                          </div>
                        )}
                        
                        {!flatDesign && (
                          <motion.div 
                            className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-4 sm:mt-6"
                            variants={itemAnimations}
                          >
                            {slide.brochureLink && (
                              <motion.div
                                variants={buttonVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                              >
                                <Link 
                                  href={slide.brochureLink} 
                                  className={`${secondaryColorClass} ${textColorClass} py-2 sm:py-3 px-6 sm:px-8 text-center transition-all duration-300 font-medium opacity-90 hover:opacity-100 hover:shadow-xl block text-sm sm:text-base`}
                                  aria-label={`View brochure for ${slide.modelName}`}
                                >
                                  View Brochure
                                </Link>
                              </motion.div>
                            )}
                            
                            {slide.testDriveLink && (
                              <motion.div
                                variants={buttonVariants}
                                initial="initial"
                                whileHover="hover"
                                whileTap="tap"
                              >
                                <Link 
                                  href={slide.testDriveLink} 
                                  className={`bg-white text-gray-900 py-2 sm:py-3 px-6 sm:px-8 text-center transition-all duration-300 font-medium hover:shadow-xl block text-sm sm:text-base`}
                                  aria-label={`Schedule test drive for ${slide.modelName}`}
                                >
                                  Test Drive
                                </Link>
                              </motion.div>
                            )}
                          </motion.div>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </SwiperSlide>
            ))}

            {/* Floating car specifications for non-flat design */}
            {!flatDesign && showSpecs && slides[activeIndex]?.specs && (
              <AnimatePresence>
                <motion.div 
                  className="absolute bottom-10 right-10 z-30 bg-black/40 backdrop-blur-md rounded-lg p-4 sm:p-6 max-w-sm hidden md:block"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  key={`specs-floating-${activeIndex}`}
                >
                  <h3 className={`text-xl font-semibold ${textColorClass} mb-3`}>
                    Specifications
                  </h3>
                  <ul className={`${textColorClass} text-base space-y-2`}>
                    {Object.entries(slides[activeIndex]?.specs || {}).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span className="opacity-75">{key}</span>
                        <span className="font-medium">{value}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </AnimatePresence>
            )}

            {/* Car specifications for flat design */}
            {flatDesign && showSpecs && slides[activeIndex]?.specs && (
              <div className="absolute top-0 right-0 z-30 hidden md:block">
                <motion.div 
                  className="bg-black/70 py-3 px-6 md:px-8"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4, duration: 0.5 }}
                >
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={`specs-${activeIndex}`}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-row flex-wrap gap-x-6 md:gap-x-8 gap-y-2 justify-end"
                    >
                      {Object.entries(slides[activeIndex]?.specs || {}).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-3">
                          <span className={`${textColorClass} opacity-70 text-xs uppercase`}>{key}</span>
                          <span className={`${textColorClass} text-sm font-medium`}>{value}</span>
                        </div>
                      ))}
                    </motion.div>
                  </AnimatePresence>
                </motion.div>
              </div>
            )}

            {/* Autoplay control button */}
            {showAutoplayControl && (
              <motion.div 
                className="autoplay-control" 
                onClick={toggleAutoplay}
                aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
                whileHover={{ scale: flatDesign ? 1.05 : 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="white">
                    <polygon points="5,3 19,12 5,21" />
                  </svg>
                )}
              </motion.div>
            )}
            
            {/* Progress indicator */}
            {isPlaying && (
              <motion.div 
                className={`absolute bottom-0 left-0 h-1 ${secondaryColorClass} z-10`}
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                key={`progress-${activeIndex}`}
                transition={{ 
                  duration: autoplaySpeed / 1000, 
                  ease: "linear",
                  repeat: 0,
                }}
              />
            )}

            {/* Slide counter */}
            {flatDesign && (
              <div className="absolute bottom-0 left-0 bg-black/70 py-2 sm:py-3 px-4 sm:px-6 z-20">
                <p className={`${textColorClass} text-xs sm:text-sm font-medium`}>
                  <span>{activeIndex + 1}</span>
                  <span className="mx-2">/</span>
                  <span>{slides.length}</span>
                </p>
              </div>
            )}
          </Swiper>
        </div>
      )}
    </motion.section>
  );
};

export default CarShowcaseSlider;