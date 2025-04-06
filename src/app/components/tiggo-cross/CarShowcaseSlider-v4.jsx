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

// Animation variants
const ANIMATIONS = {
  content: {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.4, staggerChildren: 0.1 }
    },
    exit: { 
      opacity: 0, 
      y: -20, 
      transition: { duration: 0.3, staggerChildren: 0.05, staggerDirection: -1 }
    }
  },
  item: {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -10 }
  },
  button: {
    initial: { scale: 1 },
    hover: { scale: 1.02, transition: { duration: 0.2 } },
    tap: { scale: 0.98, transition: { duration: 0.1 } }
  }
};

const CarShowcaseSlider = ({ 
  slides = [], 
  primaryColorClass = "bg-gray-900", 
  secondaryColorClass = "bg-blue-500", 
  textColorClass = "text-white", 
  autoplaySpeed = 5000, 
  showPagination = true,
  showNavigation = true,
  flatDesign = true,
  // Fixed the height implementation with proper defaults
  height = "h-[600px]"
}) => {
  // State management
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

  // Handle slide change
  const handleSlideChange = (swiper) => {
    setActiveIndex(swiper.realIndex);
  };

  // Toggle autoplay
  const toggleAutoplay = () => {
    setIsPlaying(prev => !prev);
    if (swiperRef.current?.swiper) {
      if (isPlaying) {
        swiperRef.current.swiper.autoplay.stop();
      } else {
        swiperRef.current.swiper.autoplay.start();
      }
    }
  };

  // Memoize pagination config to prevent unnecessary re-renders
  const paginationConfig = useCallback(() => ({
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class="${className} w-10 h-1 rounded-none ${secondaryColorClass} opacity-50 hover:opacity-80 mx-1"></span>`;
    },
    bulletActiveClass: 'opacity-100 !w-14'
  }), [secondaryColorClass]);

  // Handle media loading errors
  const handleMediaError = (e) => {
    console.error("Media loading error:", e);
    e.target.src = "/fallback-image.jpg"; // Provide a fallback image
  };

  // Empty state handling with proper feedback
  if (!slides || slides.length === 0) {
    return (
      <motion.div 
        className={`p-8 text-center ${primaryColorClass} ${textColorClass} ${height} flex items-center justify-center`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <p>No slides available to display</p>
      </motion.div>
    );
  }

  // Import CSS at the top of your component file
  // Note: In a real project, you'd add this import at the top of the file
  // import '../styles/carShowcaseSlider.css';

  // Render model indicator based on design theme
  const renderModelIndicator = () => {
    const indicatorClass = flatDesign 
      ? "absolute top-0 left-0 bg-black/60 py-3 px-6 z-30"
      : "absolute top-8 left-8 bg-black/40 backdrop-blur-sm rounded-lg py-2 px-4 z-30";
      
    return (
      <motion.div 
        className={indicatorClass}
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
    );
  };

  // Render media (image or video)
  const renderMedia = (slide, index) => {
    return (
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
                objectPosition: 'center',
                transition: 'transform 7s ease',
                transform: index === activeIndex ? 'scale(1.05)' : 'scale(1)', 
              }}
              priority={index === 0}
              onError={handleMediaError}
              loading={index === 0 ? "eager" : "lazy"}
              quality={90}
            />
          </div>
        )}
        
        {/* Semi-transparent overlay */}
        <div className={flatDesign 
          ? "absolute inset-0 bg-black/20" 
          : "absolute inset-0 bg-gradient-to-b from-black/10 via-black/20 to-black/60"
        }></div>
      </div>
    );
  };

  // Render car logo
  const renderLogo = (slide) => {
    if (!slide.logoSrc) return null;
    
    return (
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
    );
  };

  // Render feature highlight
  const renderFeatureHighlight = (slide) => {
    if (!slide.featureHighlight) return null;
    
    return (
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
    );
  };

  // Render car specifications based on design theme
  const renderSpecifications = () => {
    const activeSlide = slides[activeIndex];
    if (!activeSlide?.specs) return null;
    
    if (flatDesign) {
      return (
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
                {Object.entries(activeSlide.specs).map(([key, value]) => (
                  <div key={key} className="flex items-center gap-2">
                    <span className={`${textColorClass} opacity-70 text-xs uppercase`}>{key}</span>
                    <span className={`${textColorClass} text-sm font-medium`}>{value}</span>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </div>
      );
    }
    
    return (
      <AnimatePresence>
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
            {Object.entries(activeSlide.specs).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span className="opacity-75">{key}</span>
                <span className="font-medium">{value}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </AnimatePresence>
    );
  };
  
  // Render content based on design theme
  const renderContent = (slide, index) => {
    if (flatDesign) {
      return (
        <motion.div 
          className="w-full py-12 px-8 bg-black/60"
          key={`content-${index}`}
          variants={ANIMATIONS.content}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div>
              <motion.p 
                className={`text-xl md:text-2xl tracking-widest ${textColorClass} uppercase mb-2`}
                variants={ANIMATIONS.item}
              >
                {slide.tagline}
              </motion.p>
              
              {slide.description && (
                <motion.p 
                  className={`${textColorClass} text-sm md:text-base max-w-xl opacity-80`}
                  variants={ANIMATIONS.item}
                >
                  {slide.description}
                </motion.p>
              )}
            </div>
            
            <motion.div 
              className="flex flex-row gap-4"
              variants={ANIMATIONS.item}
            >
              {slide.brochureLink && (
                <motion.div
                  variants={ANIMATIONS.button}
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
                  variants={ANIMATIONS.button}
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
        </motion.div>
      );
    }
    
    return (
      <motion.div 
        className="container mx-auto px-4 md:px-8 lg:px-16 pb-20"
        key={`content-${index}`}
        variants={ANIMATIONS.content}
        initial="hidden"
        animate="visible"
        exit="exit"
      >
        <motion.h2 
          className={`text-4xl md:text-5xl font-bold tracking-wider ${textColorClass} uppercase mb-2`}
          variants={ANIMATIONS.item}
        >
          {slide.modelName}
        </motion.h2>
        <motion.p 
          className={`text-xl md:text-2xl mt-2 mb-8 tracking-widest ${textColorClass} uppercase`}
          variants={ANIMATIONS.item}
        >
          {slide.tagline}
        </motion.p>
        
        <motion.div 
          className="flex flex-col sm:flex-row gap-4"
          variants={ANIMATIONS.item}
        >
          {slide.brochureLink && (
            <motion.div
              variants={ANIMATIONS.button}
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
              variants={ANIMATIONS.button}
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
      </motion.div>
    );
  };

  // Main component render
  return (
    <motion.section 
      className={`relative w-full overflow-hidden ${primaryColorClass} ${flatDesign ? 'flat-design' : 'rounded-design'}`} 
      aria-label="Car Showcase"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      style={{ "--accent-color": secondaryColorClass.replace('bg-', '') }}
    >


      {/* Model indicator */}
      {renderModelIndicator()}

      {mounted && (
        <Swiper
          ref={swiperRef}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          effect="fade"
          speed={1000}
          slidesPerView={1}
          navigation={showNavigation}
          pagination={showPagination ? paginationConfig() : false}
          autoplay={isPlaying && slides.length > 1 ? {
            delay: autoplaySpeed,
            disableOnInteraction: false,
          } : false}
          loop={slides.length > 1}
          onSlideChange={handleSlideChange}
          className={`relative w-full ${height}`}
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
              {/* Media (Image/Video) */}
              {renderMedia(slide, index)}
              
              {/* Car logo */}
              {renderLogo(slide)}
              
              {/* Feature highlight text */}
              {renderFeatureHighlight(slide)}

              {/* Text content overlay */}
              <div className="relative z-30 h-full flex items-end">
                <AnimatePresence mode="wait">
                  {activeIndex === index && renderContent(slide, index)}
                </AnimatePresence>
              </div>
            </SwiperSlide>
          ))}

          {/* Car specifications */}
          {renderSpecifications()}

          {/* Autoplay control button */}
          {slides.length > 1 && (
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
          )}
          
          {/* Progress indicator */}
          {isPlaying && slides.length > 1 && (
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
          {flatDesign && slides.length > 1 && (
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