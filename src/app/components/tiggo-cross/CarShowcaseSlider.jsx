'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Autoplay, EffectCreative, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

// Refined theme configuration with earth tones from other components
const theme = {
  primary: '#8c735d',
  primaryDark: '#65584A',
  primaryLight: '#A59988',
  accent: '#D3B88C',
  text: '#2D2A26',
  textSecondary: '#5F574E',
  buttonBg: '#F3F4F6',
  buttonText: '#2D2A26',
  contentBg: '#F5F4F2',
  borderColor: '#E5E0DB',
  cardBg: '#FFFFFF',
  highlight: '#F0EBE5',
  overlay: "rgba(45, 42, 38, 0.6)"
};

// Default vehicle data with only interior and exterior slides
const defaultVehicles = [
  {
    id: "exterior",
    modelName: "EXTERIOR",
    modelYear: "2025",
    tagline: "FOR EVERY KIND OF YOU",
    description: "Experience the perfect blend of style, performance and technology",
    images: [
      {
        src: "/images/tiggocross/hero/exterior.jpg",
        alt: "Vehicle exterior view",
        type: "exterior"
      }
    ],
    specs: {
      engine: "1.5L Turbo",
      power: "145 HP",
      torque: "210 Nm",
      transmission: "6-Speed DCT"
    },
    features: [
      "Biomimetic Tiger Face Design",
      "Starry Diamond-Shaped Grille Pattern",
      "Tiger Claw Style Headlight Trim",
      "Sleek and Aerodynamic Profile"
    ],
    buttons: [
      {
        label: "Explore Features",
        url: "#features",
        variant: "primary"
      },
      {
        label: "Book Test Drive",
        url: "#test-drive",
        variant: "secondary"
      }
    ]
  },
  {
    id: "interior",
    modelName: "INTERIOR",
    modelYear: "2025",
    tagline: "DESIGNED FOR COMFORT",
    description: "Advanced driver assistance and premium luxury in every detail",
    images: [
      {
        src: "/images/tiggocross/hero/interior.jpg",
        alt: "Vehicle interior view",
        type: "interior"
      }
    ],
    specs: {
      display: "10.25\" LCD Screen",
      sound: "6-Speaker System",
      climate: "Dual-Zone AC",
      connectivity: "Wireless AA+CP"
    },
    features: [
      "10.25-inch Ultra-Clear LCD Screen",
      "Wireless Apple CarPlay and Android Auto",
      "Voice-activated Sunroof",
      "Integrated Sports Seats"
    ],
    buttons: [
      {
        label: "Explore Features",
        url: "#features",
        variant: "primary"
      },
      {
        label: "Book Test Drive",
        url: "#test-drive",
        variant: "secondary"
      }
    ]
  }
];

const VehicleShowcase = ({
  vehicles = defaultVehicles,
  height = "h-screen",
  showSpecs = true,
  autoplayDelay = 5000,
  className = "",
}) => {
  // Component state
  const [mounted, setMounted] = useState(false);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef(null);

  // Flatten all vehicle images for the main carousel
  const allImages = useMemo(() => {
    return vehicles.flatMap(vehicle =>
      vehicle.images.map(image => ({
        ...image,
        vehicleId: vehicle.id,
        vehicleInfo: vehicle
      }))
    );
  }, [vehicles]);

  // Determine which vehicle is active
  const activeVehicle = useMemo(() => {
    if (!allImages[activeIndex]) return vehicles[0];
    return vehicles.find(v => v.id === allImages[activeIndex].vehicleId) || vehicles[0];
  }, [vehicles, allImages, activeIndex]);

  // Calculate container height on mount and resize
  useEffect(() => {
    setMounted(true);

    const handleResize = () => {
      const viewportHeight = window.innerHeight;
      const navbarHeight = 60; // Adjust based on your actual navbar height
      const newHeight = viewportHeight - navbarHeight;
      setContainerHeight(newHeight);
    };

    // Initial calculation
    handleResize();

    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      setMounted(false);
    };
  }, []);

  // Detect when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.2 }
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

  // Handle slide change from main swiper
  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.activeIndex);
  }, []);

  // Toggle between interior and exterior
  const toggleView = useCallback(() => {
    if (!mainSwiper) return;
    
    const currentVehicleId = allImages[activeIndex]?.vehicleId;
    const targetIndex = currentVehicleId === 'exterior' ? 1 : 0;
    
    mainSwiper.slideTo(targetIndex);
  }, [mainSwiper, allImages, activeIndex]);

  // Handle autoplay toggle
  const toggleAutoplay = useCallback(() => {
    if (mainSwiper) {
      if (isAutoplay) {
        mainSwiper.autoplay.stop();
      } else {
        mainSwiper.autoplay.start();
      }
      setIsAutoplay(!isAutoplay);
    }
  }, [mainSwiper, isAutoplay]);

  // Keyboard event handling
  useEffect(() => {
    if (!mounted) return;

    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
        e.preventDefault();
        toggleView();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleAutoplay();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mounted, toggleView, toggleAutoplay]);

  // Animation variants
  const fadeVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1, transition: { duration: 0.7 } },
    exit: { opacity: 0, transition: { duration: 0.5 } }
  };

  const slideUpVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1,
      y: 0,
      transition: { 
        duration: 0.6,
        ease: [0.25, 0.1, 0.25, 1.0]
      }
    }
  };

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className={`w-full flex items-center justify-center`} style={{ backgroundColor: theme.contentBg, height: containerHeight }}>
        <div className="text-xl" style={{ color: theme.text }}>No vehicle data available</div>
      </div>
    );
  }

  return (
    <div
      ref={sectionRef}
      className={`relative w-full overflow-hidden ${height} ${className}`}
      style={{
        height: containerHeight ? `${containerHeight}px` : '100vh',
        maxHeight: '100vh',
        backgroundColor: theme.contentBg,
      }}
    >
      {/* Main showcase area */}
      <div className="absolute inset-0 w-full h-full z-0">
        {mounted && (
          <Swiper
            modules={[Autoplay, EffectCreative, Keyboard, Mousewheel]}
            effect="creative"
            creativeEffect={{
              prev: {
                translate: [0, 0, -400],
                opacity: 0
              },
              next: {
                translate: ['100%', 0, 0],
                opacity: 0
              },
            }}
            speed={800}
            keyboard={{ enabled: true }}
            mousewheel={{
              sensitivity: 1,
              releaseOnEdges: true
            }}
            slidesPerView={1}
            onSlideChange={handleSlideChange}
            onSwiper={setMainSwiper}
            autoplay={isAutoplay ? {
              delay: autoplayDelay,
              disableOnInteraction: false
            } : false}
            className="h-full w-full"
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
          >
            {allImages.map((image, index) => (
              <SwiperSlide key={`${image.vehicleId}-${index}`} className="h-full">
                <div className="relative h-full w-full">
                  {/* Vehicle image */}
                  <AnimatePresence mode="wait">
                    <motion.div 
                      key={`${image.vehicleId}-${index}-image`}
                      variants={fadeVariants}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      className="absolute inset-0 z-0"
                    >
                      <Image
                        src={image.src}
                        alt={image.alt || image.vehicleInfo.modelName}
                        fill
                        priority={index === 0}
                        quality={90}
                        sizes="100vw"
                        className="object-cover object-center"
                      />
                    </motion.div>
                  </AnimatePresence>

                  {/* Enhanced gradient overlay for better readability */}
                  <div 
                    className="absolute inset-0 z-10 pointer-events-none" 
                    style={{
                      background: `linear-gradient(to top, rgba(45, 42, 38, 0.20), rgba(45, 42, 38, 0.1) 10%, rgba(45, 42, 38, 0.2))`
                    }}
                  ></div>

                  {/* Type indicator (interior/exterior) with improved visibility */}
                  <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className={`absolute top-6 left-6 z-30 py-2 px-4 uppercase text-sm tracking-widest rounded-sm ${
                      image.type === 'interior' ? 'bg-[#8c735d]' : 'bg-[#65584A]'
                    } text-white font-semibold shadow-lg`}
                  >
                    {image.type}
                  </motion.div>

                  {/* Vehicle info content with improved layout and animations */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 lg:p-10">
                    <motion.div 
                      variants={slideUpVariants}
                      initial="hidden"
                      animate={isInView ? "visible" : "hidden"}
                      className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8"
                    >
                      {/* Left side: Vehicle details with enhanced readability */}
                      <div className="flex flex-col justify-end md:col-span-7 bg-black/40 p-6 md:p-8 rounded-lg backdrop-blur-sm border-l-4" style={{ borderColor: theme.primary }}>
                        <div className="mb-2 text-white/90">
                          <span className="uppercase tracking-widest text-sm font-medium">{image.vehicleInfo.modelYear}</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-3 tracking-tight text-white">
                          {image.vehicleInfo.modelName}
                        </h2>

                        <div className="w-24 h-1 mb-4" style={{ backgroundColor: theme.accent }}></div>

                        <p className="text-base md:text-xl mb-6 max-w-lg text-white leading-relaxed">
                          {image.vehicleInfo.tagline}
                        </p>

                        {/* Feature list with improved visibility */}
                        {/* <div className="mb-8 hidden md:block">
                          <h3 className="text-sm uppercase tracking-wider text-white/90 font-semibold mb-4">Key Features</h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {image.vehicleInfo.features.slice(0, 4).map((feature, idx) => (
                              <li key={idx} className="flex items-start text-white/90 text-base">
                                <div className="flex-shrink-0 h-6 w-6 mt-0.5 rounded-full flex items-center justify-center mr-3" style={{ backgroundColor: `${theme.primary}30` }}>
                                  <svg className="h-3 w-3" style={{ color: theme.accent }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div> */}

                        {/* CTA Buttons with improved design */}
                        <div className="flex flex-wrap gap-4 mt-2">
                          {image.vehicleInfo.buttons?.map((button, idx) => (
                            <a
                              key={idx}
                              href={button.url}
                              className={`group inline-flex items-center px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium transition-all duration-300 shadow-lg rounded-sm ${
                                button.variant === 'primary' 
                                  ? 'bg-[#8c735d] text-white hover:bg-[#65584A]'
                                  : 'bg-transparent border border-white text-white hover:bg-white/10'
                              }`}
                            >
                              <span>{button.label}</span>
                              <svg className="ml-2 w-5 h-5 group-hover:ml-3 transition-all duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </a>
                          ))}
                        </div>
                      </div>

                      {/* Right side: Vehicle specs with enhanced design */}
                      {/* {showSpecs && (
                        <div className="flex flex-col justify-end md:col-span-5">
                          <div className="grid grid-cols-2 gap-4 p-6 md:p-8 rounded-lg backdrop-blur-sm shadow-lg" style={{ backgroundColor: theme.cardBg, borderLeft: `4px solid ${theme.primary}` }}>
                            {image.vehicleInfo.specs && Object.entries(image.vehicleInfo.specs).map(([key, value], idx) => (
                              <div key={idx} className="border-b pb-3 mb-3 last:border-0 last:mb-0 last:pb-0" style={{ borderColor: theme.borderColor }}>
                                <div className="text-sm uppercase tracking-wider mb-1 font-medium" style={{ color: theme.textSecondary }}>
                                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </div>
                                <div className="text-lg md:text-xl font-semibold" style={{ color: idx % 2 === 0 ? theme.primary : theme.text }}>
                                  {value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )} */}
                    </motion.div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Toggle view button (interior/exterior) with improved design */}
      <motion.div 
        className="absolute right-6 top-6 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <button
          onClick={toggleView}
          className="inline-flex items-center justify-center shadow-lg px-5 py-3 text-sm uppercase tracking-wider font-medium transition-colors duration-300 rounded-sm"
          style={{ 
            backgroundColor: theme.cardBg, 
            color: theme.primary,
            border: `1px solid ${theme.borderColor}`,
          }}
        >
          View {activeVehicle.id === 'exterior' ? 'Interior' : 'Exterior'}
        </button>
      </motion.div>

      {/* Control buttons with improved design */}
      <motion.div 
        className="absolute right-6 bottom-6 z-40 flex items-center space-x-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {/* Toggle view button */}
        <button
          onClick={toggleView}
          className="w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-full shadow-lg"
          style={{ 
            backgroundColor: theme.cardBg,
            color: theme.primary,
            border: `1px solid ${theme.borderColor}`,
          }}
          aria-label={`View ${activeVehicle.id === 'exterior' ? 'Interior' : 'Exterior'}`}
          disabled={isDragging}
        >
          <svg className="w-6 h-6" style={{ color: theme.primary }} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth="2" 
              d={activeVehicle.id === 'exterior' 
                ? "M19 9l-7 7-7-7" // Down arrow for exterior (to show interior)
                : "M5 15l7-7 7 7" // Up arrow for interior (to show exterior)
              } 
            />
          </svg>
        </button>

        {/* Autoplay toggle */}
        <button
          onClick={toggleAutoplay}
          className="w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-full shadow-lg"
          style={{ 
            backgroundColor: theme.primary,
            color: '#FFFFFF',
          }}
          aria-label={isAutoplay ? "Pause slideshow" : "Play slideshow"}
          disabled={isDragging}
        >
          {isAutoplay ? (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <rect x="6" y="5" width="4" height="14" fill="white" />
              <rect x="14" y="5" width="4" height="14" fill="white" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path fill="white" d="M6 4l15 8-15 8z" />
            </svg>
          )}
        </button>
      </motion.div>

      {/* Progress indicator with improved design */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1.5 bg-black/30">
        <motion.div
          className="h-full transition-all duration-500 ease-out"
          style={{
            backgroundColor: theme.accent,
            width: `${((activeIndex + 1) / allImages.length) * 100}%`,
          }}
          initial={{ width: 0 }}
          animate={{ width: `${((activeIndex + 1) / allImages.length) * 100}%` }}
          transition={{ duration: 0.5 }}
        ></motion.div>
      </div>

      {/* Color dots indicator for available views */}
      <motion.div 
        className="absolute left-6 bottom-6 z-40 flex items-center space-x-3"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        {vehicles.map((vehicle, index) => (
          <button
            key={vehicle.id}
            onClick={() => mainSwiper?.slideTo(index)}
            className={`w-10 h-10 rounded-full border-2 transition-all duration-300 flex items-center justify-center ${
              activeVehicle.id === vehicle.id 
                ? 'border-white scale-110' 
                : 'border-white/50 scale-100 hover:scale-105'
            }`}
            style={{ 
              backgroundColor: vehicle.id === 'exterior' ? '#65584A' : '#8c735d',
              boxShadow: activeVehicle.id === vehicle.id ? '0 0 0 2px rgba(255, 255, 255, 0.2)' : 'none'
            }}
            aria-label={`View ${vehicle.id}`}
          >
            <span className="text-xs text-white uppercase">{vehicle.id.charAt(0)}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default VehicleShowcase;