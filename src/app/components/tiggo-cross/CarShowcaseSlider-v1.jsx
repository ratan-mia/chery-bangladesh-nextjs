// components/CarShowcaseSlider.jsx
import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import all required Swiper styles at once
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
  showPagination = true,
  showNavigation = true,
  height = { mobile: "500px", tablet: "600px", desktop: "700px" },
  flatDesign = true
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
      setMounted(false);
    };
  }, []);

  // Memoize pagination config to prevent unnecessary re-renders
  const paginationConfig = useCallback(() => ({
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className} w-10 h-1 rounded-none ${secondaryColorClass} opacity-50 hover:opacity-80 mx-1"></span>`;
    },
    bulletActiveClass: 'opacity-100 !w-14'
  }), [secondaryColorClass]);

  // Animation variants - flat and minimal
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

  // Button animation variants - simplified for flat design
  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  };

  // Empty state handling with proper feedback
  if (!slides || slides.length === 0) {
    return (
      <motion.div 
        className={`p-8 text-center ${primaryColorClass} ${textColorClass} min-h-[300px] flex items-center justify-center`}
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
    e.target.src = "/fallback-image.jpg"; // Provide a fallback image
  };

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsPlaying(prev => !prev);
    if (swiperRef.current && swiperRef.current.swiper) {
      if (isPlaying) {
        swiperRef.current.swiper.autoplay.stop();
      } else {
        swiperRef.current.swiper.autoplay.start();
      }
    }
  };

  // Flat design styles
  const flatDesignStyles = `
    .swiper-pagination {
      bottom: 30px !important;
    }
    
    .swiper-pagination-bullet {
      height: 2px;
      width: 40px;
      margin: 0 4px;
      transition: all 0.2s ease;
      opacity: 0.7;
      background-color: white;
    }
    
    .swiper-pagination-bullet-active {
      width: 56px;
      opacity: 1;
      background-color: ${secondaryColorClass.replace('bg-', '')};
    }
    
    .swiper-button-prev, 
    .swiper-button-next {
      color: white;
      background: ${flatDesign ? 'rgba(0, 0, 0, 0.2)' : 'rgba(0, 0, 0, 0.3)'};
      width: ${flatDesign ? '36px' : '42px'};
      height: ${flatDesign ? '36px' : '42px'};
      border-radius: ${flatDesign ? '0' : '50%'};
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all 0.2s ease;
      transform: translateY(-50%);
    }
    
    .swiper-button-prev:hover, 
    .swiper-button-next:hover {
      background: rgba(0, 0, 0, 0.4);
    }
    
    .swiper-button-prev:after, 
    .swiper-button-next:after {
      font-size: 16px;
      font-weight: bold;
    }
    
    .swiper-button-disabled {
      opacity: 0.35;
      cursor: auto;
      pointer-events: none;
    }
    
    .autoplay-control {
      position: absolute;
      bottom: 30px;
      right: 30px;
      z-index: 20;
      background: rgba(0, 0, 0, 0.2);
      width: 36px;
      height: 36px;
      border-radius: ${flatDesign ? '0' : '50%'};
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      transition: all 0.2s ease;
    }
    
    .autoplay-control:hover {
      background: rgba(0, 0, 0, 0.4);
    }
    
    .swiper-container {
      overflow: hidden;
    }
  `;

  // Dynamic class for height based on screen size
  const heightClass = `h-[${height.mobile}] md:h-[${height.tablet}] lg:h-[${height.desktop}]`;

  // Model indicator style based on flat design preference
  const modelIndicatorStyle = flatDesign 
    ? "absolute top-0 left-0 bg-black/60 py-3 px-6 z-30"
    : "absolute top-8 left-8 bg-black/40 backdrop-blur-sm rounded-lg py-2 px-4 z-30";

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
      {/* Custom CSS styles for Swiper */}
      <style jsx global>{flatDesignStyles}</style>

      {/* Model indicator that always shows current model */}
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
          className={`relative w-full ${heightClass}`}
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
              {/* Media container - full width and height */}
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
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
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
                
                {/* Semi-transparent overlay - flat style */}
                <div className="absolute inset-0 bg-black/20"></div>
                
                {/* Car logo in the center of the slider */}
                {slide.logoSrc && (
                  <motion.div 
                    className="absolute top-1/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                  >
                    <div className="relative w-32 h-32 md:w-40 md:h-40">
                      <Image
                        src={slide.logoSrc}
                        alt={`${slide.modelName} logo`}
                        fill
                        style={{ objectFit: 'contain' }}
                        className="drop-shadow-lg"
                      />
                    </div>
                  </motion.div>
                )}
                
                {/* Feature highlight text */}
                {slide.featureHighlight && (
                  <motion.div 
                    className="absolute top-1/2 right-12 transform -translate-y-1/2 max-w-xs z-20 text-right"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                  >
                    <div className="bg-black/30 backdrop-blur-sm p-4 inline-block">
                      <h3 className="text-white text-xl font-light uppercase tracking-wider mb-2">
                        {slide.featureHighlight.title}
                      </h3>
                      <p className="text-white/80 text-sm">
                        {slide.featureHighlight.description}
                      </p>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Text content overlay - positioned at the bottom for flat design */}
              <div className="relative z-30 h-full flex items-end">
                <AnimatePresence mode="wait">
                  {activeIndex === index && (
                    <motion.div 
                      className={flatDesign 
                        ? "w-full py-12 px-8 bg-black/60"
                        : "container mx-auto px-4 md:px-8 lg:px-16 pb-20"
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
                            className={`text-4xl md:text-5xl font-bold tracking-wider ${textColorClass} uppercase mb-2`}
                            variants={itemAnimations}
                          >
                            {slide.modelName}
                          </motion.h2>
                          <motion.p 
                            className={`text-xl md:text-2xl mt-2 mb-8 tracking-widest ${textColorClass} uppercase`}
                            variants={itemAnimations}
                          >
                            {slide.tagline}
                          </motion.p>
                        </>
                      )}
                      
                      {flatDesign && (
                        <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
                          <div>
                            <motion.p 
                              className={`text-xl md:text-2xl tracking-widest ${textColorClass} uppercase mb-2`}
                              variants={itemAnimations}
                            >
                              {slide.tagline}
                            </motion.p>
                            
                            {slide.description && (
                              <motion.p 
                                className={`${textColorClass} text-sm md:text-base max-w-xl opacity-80`}
                                variants={itemAnimations}
                              >
                                {slide.description}
                              </motion.p>
                            )}
                          </div>
                          
                          <motion.div 
                            className="flex flex-row gap-4"
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
                                  className={`${secondaryColorClass} ${textColorClass} py-3 px-8 text-center font-medium hover:shadow-lg block`}
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
                                  className={`bg-white text-gray-900 py-3 px-8 text-center font-medium hover:shadow-lg block`}
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
                          className="flex flex-col sm:flex-row gap-4"
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
                                className={`${secondaryColorClass} ${textColorClass} py-3 px-8 text-center transition-all duration-300 font-medium opacity-90 hover:opacity-100 hover:shadow-lg block`}
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
                                className={`${secondaryColorClass} ${textColorClass} py-3 px-8 text-center transition-all duration-300 font-medium opacity-90 hover:opacity-100 hover:shadow-lg block`}
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
          {!flatDesign && (
            <AnimatePresence>
              {slides[activeIndex]?.specs && (
                <motion.div 
                  className="absolute bottom-8 right-8 z-30 bg-black/30 backdrop-blur-md rounded-lg p-4 max-w-xs"
                  initial={{ x: 100, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 50, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <h3 className={`text-lg font-semibold ${textColorClass} mb-2`}>
                    Specifications
                  </h3>
                  <ul className={`${textColorClass} text-sm space-y-1`}>
                    {Object.entries(slides[activeIndex]?.specs || {}).map(([key, value]) => (
                      <li key={key} className="flex justify-between">
                        <span className="opacity-75">{key}</span>
                        <span className="font-medium">{value}</span>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              )}
            </AnimatePresence>
          )}

          {/* Car specifications for flat design */}
          {flatDesign && slides[activeIndex]?.specs && (
            <div className="absolute top-0 right-0 z-30">
              <motion.div 
                className="bg-black/60 py-2 px-6"
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
                    className="flex flex-row flex-wrap gap-x-6 gap-y-1 justify-end"
                  >
                    {Object.entries(slides[activeIndex]?.specs || {}).map(([key, value]) => (
                      <div key={key} className="flex items-center gap-2">
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
          <motion.div 
            className="autoplay-control" 
            onClick={toggleAutoplay}
            aria-label={isPlaying ? "Pause slideshow" : "Play slideshow"}
            whileHover={{ scale: flatDesign ? 1.05 : 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            {isPlaying ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="white">
                <polygon points="5,3 19,12 5,21" />
              </svg>
            )}
          </motion.div>
          
          {/* Progress indicator */}
          {isPlaying && (
            <motion.div 
              className={`absolute bottom-0 left-0 h-1 ${secondaryColorClass} z-10`}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ 
                duration: autoplaySpeed / 1000, 
                ease: "linear",
                repeat: Infinity,
                repeatType: "loop"
              }}
            />
          )}

          {/* Slide counter */}
          {flatDesign && (
            <div className="absolute bottom-0 left-0 bg-black/60 py-2 px-4 z-20">
              <p className={`${textColorClass} text-sm font-medium`}>
                <span>{activeIndex + 1}</span>
                <span className="mx-1">/</span>
                <span>{slides.length}</span>
              </p>
            </div>
          )}
        </Swiper>
      )}
    </motion.section>
  );
};

export default CarShowcaseSlider;