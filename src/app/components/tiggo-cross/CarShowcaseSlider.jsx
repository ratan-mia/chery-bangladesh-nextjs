'use client';

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Autoplay, Controller, EffectCreative, Keyboard, Mousewheel, Thumbs } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/thumbs";

// Default vehicle data
const defaultVehicles = [
  {
    id: "tiggo-cross-1",
    modelName: "TIGGO CROSS",
    modelYear: "2025",
    tagline: "FOR EVERY KIND OF YOU",
    description: "Experience the perfect blend of style, performance and technology",
    images: [
      {
        src: "/images/tiggocross/hero/1.webp",
        alt: "Tiggo Cross exterior front view",
        type: "exterior"
      },
      {
        src: "/images/tiggocross/hero/2.webp",
        alt: "Tiggo Cross interior dashboard view",
        type: "interior"
      }
    ],
    specs: {
      engine: "1.5T GDI",
      power: "156 HP",
      torque: "230 Nm",
      transmission: "7-DCT",
      acceleration: "9.8s",
      fuelEconomy: "6.8L/100km"
    },
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
      },
      {
        label: "Download Brochure",
        url: "#brochure",
        variant: "outline"
      }
    ]
  },
  {
    id: "tiggo-pro-1",
    modelName: "TIGGO PRO",
    modelYear: "2025",
    tagline: "DESIGNED FOR THE FUTURE",
    description: "Advanced driver assistance and premium luxury in every detail",
    images: [
      {
        src: "/images/tiggocross/hero/1.webp", // These would be different images in a real implementation
        alt: "Tiggo Pro exterior front view",
        type: "exterior"
      },
      {
        src: "/images/tiggocross/hero/2.webp", // These would be different images in a real implementation
        type: "interior"
      }
    ],
    specs: {
      engine: "2.0T GDI",
      power: "192 HP",
      torque: "290 Nm",
      transmission: "8-DCT",
      acceleration: "7.8s",
      fuelEconomy: "7.2L/100km"
    },
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
      },
      {
        label: "Download Brochure",
        url: "#brochure",
        variant: "outline"
      }
    ]
  }
];

const VehicleShowcase = ({
  vehicles = defaultVehicles,
  height = "h-screen",
  accentColor = "#8c735d", // Vibrant orange as primary accent
  secondaryColor = "#1a1a1a", // Dark gray for secondary elements
  darkMode = true,
  showSpecs = true,
  showThumbNav = true,
  autoplayDelay = 5000,
  effectIntensity = 0.4,
  className = "",
}) => {
  // Component state
  const [mounted, setMounted] = useState(false);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  
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

  // Calculated theme colors
  const themeColors = useMemo(() => {
    return {
      accent: accentColor,
      secondary: secondaryColor,
      background: darkMode ? '#101010' : '#f5f5f5',
      text: darkMode ? '#ffffff' : '#101010',
      textMuted: darkMode ? '#a0a0a0' : '#505050',
      surface: darkMode ? '#1a1a1a' : '#ffffff',
      surfaceAlt: darkMode ? '#252525' : '#e5e5e5',
      border: darkMode ? '#333333' : '#e0e0e0',
    };
  }, [accentColor, secondaryColor, darkMode]);
  
  // Handle resize and initial setup
  useEffect(() => {
    setMounted(true);
    
    const handleResize = () => {
      // Any resize-specific logic
    };
    
    window.addEventListener('resize', handleResize, { passive: true });
    return () => {
      window.removeEventListener('resize', handleResize);
      setMounted(false);
    };
  }, []);
  
  // Handle slide change from main swiper
  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.activeIndex);
    const newVehicleId = allImages[swiper.activeIndex]?.vehicleId;
    
    // Find index of this vehicle in the vehicles array
    const vehicleIndex = vehicles.findIndex(v => v.id === newVehicleId);
    if (vehicleIndex !== -1 && thumbsSwiper) {
      // Only change thumbs if it's a different vehicle
      if (thumbsSwiper.activeIndex !== vehicleIndex) {
        thumbsSwiper.slideTo(vehicleIndex);
      }
    }
    
    setHasInteracted(true);
  }, [allImages, vehicles, thumbsSwiper]);
  
  // Navigation functions
  const goToVehicle = useCallback((index) => {
    if (!mainSwiper) return;
    
    // Find the first image for this vehicle
    const targetImageIndex = allImages.findIndex(img => img.vehicleId === vehicles[index].id);
    if (targetImageIndex !== -1) {
      mainSwiper.slideTo(targetImageIndex);
    }
  }, [mainSwiper, vehicles, allImages]);
  
  const goToNextVehicle = useCallback(() => {
    const currentVehicleId = allImages[activeIndex]?.vehicleId;
    const currentVehicleIndex = vehicles.findIndex(v => v.id === currentVehicleId);
    const nextIndex = (currentVehicleIndex + 1) % vehicles.length;
    goToVehicle(nextIndex);
  }, [vehicles, allImages, activeIndex, goToVehicle]);
  
  const goToPrevVehicle = useCallback(() => {
    const currentVehicleId = allImages[activeIndex]?.vehicleId;
    const currentVehicleIndex = vehicles.findIndex(v => v.id === currentVehicleId);
    const prevIndex = (currentVehicleIndex - 1 + vehicles.length) % vehicles.length;
    goToVehicle(prevIndex);
  }, [vehicles, allImages, activeIndex, goToVehicle]);
  
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
      if (e.key === 'ArrowLeft') {
        e.preventDefault();
        if (mainSwiper) mainSwiper.slidePrev();
      } else if (e.key === 'ArrowRight') {
        e.preventDefault();
        if (mainSwiper) mainSwiper.slideNext();
      } else if (e.key === ' ') {
        e.preventDefault();
        toggleAutoplay();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mounted, mainSwiper, toggleAutoplay]);
  
  // If no data, show placeholder
  if (!vehicles || vehicles.length === 0) {
    return (
      <div className={`${height} flex items-center justify-center bg-zinc-900`}>
        <div className="text-white text-xl">No vehicle data available</div>
      </div>
    );
  }
  
  return (
    <div 
      className={`relative w-full overflow-hidden ${height} ${className}`}
      style={{ backgroundColor: themeColors.background }}
    >
      {/* Main showcase area */}
      <div className="absolute inset-0 w-full h-full z-0">
        {mounted && (
          <Swiper
            modules={[Autoplay, EffectCreative, Controller, Keyboard, Mousewheel]}
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
                  {/* Fixed overlay pattern */}
                  <div className="absolute inset-0 z-0 pointer-events-none bg-pattern opacity-10"></div>
                  
                  {/* Main gradient overlay to enhance readability */}
                  <div 
                    className="absolute inset-0 z-10 pointer-events-none"
                    style={{
                      background: `linear-gradient(0deg, ${themeColors.background} 0%, rgba(0,0,0,0) 50%, ${themeColors.background}20 100%)`
                    }}
                  ></div>
                  
                  {/* Vehicle image */}
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={image.src}
                      alt={image.alt || image.vehicleInfo.modelName}
                      fill
                      priority={index === 0}
                      quality={100}
                      sizes="100vw"
                      className="object-cover object-center transition-transform duration-7000"
                      style={{
                        filter: darkMode ? 'brightness(0.9) contrast(1.1)' : 'brightness(1) contrast(1)'
                      }}
                    />
                  </div>
                  
                  {/* Type indicator (interior/exterior) */}
                  <div 
                    className="absolute top-6 left-6 z-30 py-1 px-3 uppercase text-xs tracking-widest"
                    style={{ 
                      backgroundColor: image.type === 'interior' ? themeColors.accent : themeColors.secondary,
                      color: themeColors.text
                    }}
                  >
                    {image.type}
                  </div>
                  
                  {/* Vehicle info content */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-8 md:p-12">
                    <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
                      {/* Left side: Vehicle details */}
                      <div className="flex flex-col justify-end">
                        <div className="mb-2 opacity-80" style={{ color: themeColors.textMuted }}>
                          <span className="uppercase tracking-widest text-sm">{image.vehicleInfo.modelYear}</span>
                        </div>
                        
                        <h2 
                          className="text-5xl font-bold uppercase mb-2 tracking-tight"
                          style={{ color: themeColors.text }}
                        >
                          {image.vehicleInfo.modelName}
                        </h2>
                        
                        <div 
                          className="w-16 h-1 mb-4"
                          style={{ backgroundColor: themeColors.accent }}
                        ></div>
                        
                        <p 
                          className="text-xl mb-8 max-w-lg"
                          style={{ color: themeColors.textMuted }}
                        >
                          {image.vehicleInfo.tagline}
                        </p>
                        
                        {/* CTA Buttons */}
                        <div className="flex flex-wrap gap-4 mt-4">
                          {image.vehicleInfo.buttons?.map((button, idx) => (
                            <a
                              key={idx}
                              href={button.url}
                              className="py-3 px-6 inline-flex items-center transition-transform duration-300 hover:-translate-y-1"
                              style={{
                                backgroundColor: button.variant === 'primary' ? themeColors.accent : 
                                               button.variant === 'secondary' ? themeColors.secondary : 'transparent',
                                color: (button.variant === 'primary' || button.variant === 'secondary') ? '#ffffff' : themeColors.text,
                                border: button.variant === 'outline' ? `1px solid ${themeColors.border}` : 'none'
                              }}
                            >
                              <span>{button.label}</span>
                              <svg className="ml-2 w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="square" strokeLinejoin="arcs" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                              </svg>
                            </a>
                          ))}
                        </div>
                      </div>
                      
                      {/* Right side: Vehicle specs */}
                      {showSpecs && (
                        <div className="flex flex-col justify-end">
                          <div 
                            className="grid grid-cols-2 gap-4 p-6"
                            style={{ backgroundColor: themeColors.surface }}
                          >
                            {image.vehicleInfo.specs && Object.entries(image.vehicleInfo.specs).map(([key, value], idx) => (
                              <div key={idx} className="border-b border-gray-800 pb-3 mb-3 last:border-0 last:mb-0 last:pb-0">
                                <div 
                                  className="text-sm uppercase tracking-wider mb-1"
                                  style={{ color: themeColors.textMuted }}
                                >
                                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </div>
                                <div 
                                  className="text-lg font-medium"
                                  style={{ color: idx % 2 === 0 ? themeColors.accent : themeColors.text }}
                                >
                                  {value}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
      
      {/* Vehicles thumbnail navigation */}
      {showThumbNav && mounted && vehicles.length > 1 && (
        <div 
          className="absolute left-6 top-0 bottom-0 z-40 w-24 hidden md:flex flex-col items-center justify-center"
        >
          <div className="py-6 px-3" style={{ backgroundColor: themeColors.surface }}>
            <Swiper
              modules={[Thumbs]}
              direction="vertical"
              slidesPerView={3}
              spaceBetween={12}
              watchSlidesProgress={true}
              onSwiper={setThumbsSwiper}
              className="h-full max-h-96"
            >
              {vehicles.map((vehicle, idx) => (
                <SwiperSlide key={vehicle.id} className="h-20 cursor-pointer">
                  <div 
                    className={`relative h-full w-full flex items-center justify-center p-1 transition-all duration-300 ${
                      activeVehicle.id === vehicle.id ? 'opacity-100' : 'opacity-50 hover:opacity-80'
                    }`}
                    onClick={() => goToVehicle(idx)}
                    style={{ 
                      borderLeft: activeVehicle.id === vehicle.id 
                        ? `3px solid ${themeColors.accent}` 
                        : `3px solid transparent` 
                    }}
                  >
                    <Image
                      src={vehicle.images[0].src}
                      alt={vehicle.modelName}
                      fill
                      sizes="100px"
                      className="object-cover"
                    />
                    <div 
                      className="absolute inset-0 flex items-center justify-center"
                      style={{ backgroundColor: 'rgba(0,0,0,0.4)' }}
                    >
                      <span className="text-white text-xs uppercase tracking-wider">{vehicle.modelName}</span>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
      )}
      
      {/* Custom navigation controls */}
      <div className="absolute right-8 bottom-8 z-40 flex items-center space-x-4">
        {/* Previous vehicle button */}
        <button
          onClick={goToPrevVehicle}
          className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:-translate-x-1"
          style={{ backgroundColor: themeColors.surface }}
          aria-label="Previous vehicle"
          disabled={isDragging}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={themeColors.text}>
            <path strokeLinecap="square" strokeLinejoin="arcs" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Autoplay toggle */}
        <button
          onClick={toggleAutoplay}
          className="w-12 h-12 flex items-center justify-center transition-opacity duration-300 hover:opacity-80"
          style={{ backgroundColor: themeColors.accent }}
          aria-label={isAutoplay ? "Pause slideshow" : "Play slideshow"}
          disabled={isDragging}
        >
          {isAutoplay ? (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white">
              <rect x="6" y="5" width="4" height="14" fill="white" />
              <rect x="14" y="5" width="4" height="14" fill="white" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="white">
              <path fill="white" d="M6 4l15 8-15 8z" />
            </svg>
          )}
        </button>
        
        {/* Next vehicle button */}
        <button
          onClick={goToNextVehicle}
          className="w-12 h-12 flex items-center justify-center transition-all duration-300 hover:translate-x-1"
          style={{ backgroundColor: themeColors.surface }}
          aria-label="Next vehicle"
          disabled={isDragging}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke={themeColors.text}>
            <path strokeLinecap="square" strokeLinejoin="arcs" strokeWidth="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
      
      {/* Progress indicator */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1 bg-gray-800">
        {vehicles.map((vehicle, idx) => {
          // Calculate total percentage allocated to this vehicle
          const segmentWidth = 100 / vehicles.length;
          const isActiveVehicle = vehicle.id === activeVehicle.id;
          
          // Calculate progress within this segment for the active vehicle
          let progressWithinSegment = 0;
          if (isActiveVehicle) {
            // Find all indexes in allImages that belong to this vehicle
            const vehicleImageIndexes = allImages
              .map((img, i) => img.vehicleId === vehicle.id ? i : -1)
              .filter(i => i !== -1);
            
            // Find the position of the active index within this vehicle's images
            const positionInVehicleImages = vehicleImageIndexes.indexOf(activeIndex);
            const totalImagesForVehicle = vehicleImageIndexes.length;
            
            // Calculate progress as a percentage of the segment
            progressWithinSegment = totalImagesForVehicle > 1 
              ? (positionInVehicleImages / (totalImagesForVehicle - 1)) * segmentWidth 
              : 0;
          }
          
          // Calculate the actual width for this segment's progress bar
          const segmentProgressWidth = isActiveVehicle 
            ? (idx * segmentWidth) + progressWithinSegment 
            : (idx < vehicles.findIndex(v => v.id === activeVehicle.id) ? segmentWidth : 0);
          
          return (
            <div 
              key={vehicle.id}
              style={{ 
                position: 'absolute',
                left: `${idx * segmentWidth}%`,
                width: `${segmentWidth}%`,
                height: '100%',
                backgroundColor: isActiveVehicle ? 'rgba(255,255,255,0.2)' : 'transparent'
              }}
            >
              <div 
                style={{
                  height: '100%',
                  width: isActiveVehicle ? `${(progressWithinSegment / segmentWidth) * 100}%` : (idx < vehicles.findIndex(v => v.id === activeVehicle.id) ? '100%' : '0%'),
                  backgroundColor: themeColors.accent,
                  transition: 'width 300ms ease-out'
                }}
              />
            </div>
          );
        })}
        
        <div 
          className="h-full bg-white transition-all duration-500 ease-out"
          style={{ 
            width: `${(vehicles.findIndex(v => v.id === activeVehicle.id) / vehicles.length) * 100}%`,
            backgroundColor: themeColors.accent
          }}
        />
      </div>
      
      {/* CSS for custom styling */}
      <style jsx global>{`
        .bg-pattern {
          background-image: url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M54.627 0l.83.828-1.415 1.415L51.8 0h2.827zM5.373 0l-.83.828L5.96 2.243 8.2 0H5.374zM48.97 0l3.657 3.657-1.414 1.414L46.143 0h2.828zM11.03 0L7.372 3.657l1.415 1.414L13.858 0H11.03zm32.284 0l6.364 6.364-1.414 1.414L36.143 0h7.17zM23.97 0l-6.364 6.364 1.414 1.414L25.142 0h-1.172zM30 0l-6.364 6.364 1.414 1.415L31.414 0H30zm12.727 0l-6.364 6.364 1.414 1.415L44.142 0H42.727zM18.364 0L12 6.364l1.414 1.415L19.778 0h-1.414zM36.727 0L30.364 6.364l1.414 1.415L38.142 0h-1.415zM1.414 0L0 1.414l1.414 1.414L4.243 0H1.414zM54.627 60l.83-.828-1.415-1.415L51.8 60h2.827zM5.373 60l-.83-.828L5.96 57.757 8.2 60H5.374zM48.97 60l3.657-3.657-1.414-1.414L46.143 60h2.828zM11.03 60L7.372 56.343l1.415-1.414L13.858 60H11.03zm32.284 0l6.364-6.364-1.414-1.414L36.143 60h7.17zM23.97 60l-6.364-6.364 1.414-1.414L25.142 60h-1.172zM30 60l-6.364-6.364 1.414-1.415L31.414 60H30zm12.727 0l-6.364-6.364 1.414-1.415L44.142 60H42.727zM18.364 60L12 53.636l1.414-1.415L19.778 60h-1.414zM36.727 60L30.364 53.636l1.414-1.415L38.142 60h-1.415zM1.414 60L0 58.586l1.414-1.414L4.243 60H1.414z' fill='%23cccccc' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E");
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideUp {
          from { transform: translateY(20px); opacity: 0; }
          to { transform: translateY(0); opacity: 1; }
        }
        
        .swiper-slide-active .fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
        
        .swiper-slide-active .slide-up {
          animation: slideUp 0.8s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default VehicleShowcase;