'use client';

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Autoplay, Controller, EffectFade, Keyboard, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
  className = "",
}) => {
  // Design system colors based on Chery Bangladesh guidelines
  const themeColors = {
    primaryLight: '#c4b19c',
    primary700: '#8c735d',
    primary800: '#b7a99a',
    primary900: '#524336',
    gray900: '#111827',
    gray600: '#4B5563',
    gray500: '#6B7280',
    gray200: '#E5E7EB',
    gray100: '#F3F4F6',
    white: '#FFFFFF',
    black: '#000000',
  };

  // Component state
  const [mounted, setMounted] = useState(false);
  const [mainSwiper, setMainSwiper] = useState(null);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [activeVehicleIndex, setActiveVehicleIndex] = useState(0);
  const [isAutoplay, setIsAutoplay] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [showInfo, setShowInfo] = useState(true);
  const [activeImageType, setActiveImageType] = useState('exterior');
  
  // Flatten all vehicle images for the main carousel
  const allImages = useMemo(() => {
    return vehicles.flatMap(vehicle => 
      vehicle.images.map(image => ({
        ...image,
        vehicleId: vehicle.id,
        vehicleIndex: vehicles.findIndex(v => v.id === vehicle.id),
        vehicleInfo: vehicle
      }))
    );
  }, [vehicles]);

  // Get active vehicle based on active index
  const activeVehicle = useMemo(() => {
    return vehicles[activeVehicleIndex] || vehicles[0];
  }, [vehicles, activeVehicleIndex]);

  // Handle vehicle change
  const handleVehicleChange = useCallback((vehicleIndex) => {
    setActiveVehicleIndex(vehicleIndex);
    
    // Find the first image of this vehicle
    const firstImageIndex = allImages.findIndex(img => img.vehicleIndex === vehicleIndex);
    if (firstImageIndex !== -1 && mainSwiper) {
      mainSwiper.slideTo(firstImageIndex);
    }
  }, [allImages, mainSwiper]);

  // Handle slide change
  const handleSlideChange = useCallback((swiper) => {
    setActiveIndex(swiper.activeIndex);
    
    // Get the vehicle index from the current slide
    const currentVehicleIndex = allImages[swiper.activeIndex]?.vehicleIndex;
    if (currentVehicleIndex !== undefined && currentVehicleIndex !== activeVehicleIndex) {
      setActiveVehicleIndex(currentVehicleIndex);
    }
    
    // Update active image type
    const currentImageType = allImages[swiper.activeIndex]?.type;
    if (currentImageType) {
      setActiveImageType(currentImageType);
    }
  }, [allImages, activeVehicleIndex]);

  // Toggle autoplay
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

  // Toggle info panel
  const toggleInfo = useCallback(() => {
    setShowInfo(!showInfo);
  }, [showInfo]);

  // Navigation functions
  const goToNextVehicle = useCallback(() => {
    const nextIndex = (activeVehicleIndex + 1) % vehicles.length;
    handleVehicleChange(nextIndex);
  }, [activeVehicleIndex, vehicles.length, handleVehicleChange]);

  const goToPrevVehicle = useCallback(() => {
    const prevIndex = (activeVehicleIndex - 1 + vehicles.length) % vehicles.length;
    handleVehicleChange(prevIndex);
  }, [activeVehicleIndex, vehicles.length, handleVehicleChange]);

  // Filter images by type
  const filterByImageType = useCallback((vehicleId, type) => {
    if (!mainSwiper) return;
    
    const targetImageIndex = allImages.findIndex(img => 
      img.vehicleId === vehicleId && img.type === type
    );
    
    if (targetImageIndex !== -1) {
      mainSwiper.slideTo(targetImageIndex);
    }
  }, [mainSwiper, allImages]);

  // Initialize
  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  // Handle keyboard navigation
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
      } else if (e.key === 'i') {
        e.preventDefault();
        toggleInfo();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [mounted, mainSwiper, toggleAutoplay, toggleInfo]);

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className={`${height} flex items-center justify-center bg-white`}>
        <div className="text-gray-900 text-xl">No vehicle data available</div>
      </div>
    );
  }

  return (
    <div className={`relative w-full overflow-hidden ${height} ${className} bg-white`}>
      {/* Main Showcase */}
      <div className="absolute inset-0">
        {mounted && (
          <Swiper
            modules={[Autoplay, EffectFade, Controller, Keyboard, Navigation, Pagination]}
            effect="fade"
            speed={800}
            keyboard={{ enabled: true }}
            slidesPerView={1}
            spaceBetween={0}
            onSlideChange={handleSlideChange}
            onSwiper={setMainSwiper}
            autoplay={isAutoplay ? {
              delay: 5000,
              disableOnInteraction: false
            } : false}
            onTouchStart={() => setIsDragging(true)}
            onTouchEnd={() => setIsDragging(false)}
            className="h-full w-full"
          >
            {allImages.map((image, index) => (
              <SwiperSlide key={`${image.vehicleId}-${index}`} className="h-full">
                <div className="relative h-full w-full">
                  {/* Vehicle image */}
                  <div className="absolute inset-0">
                    <Image
                      src={image.src}
                      alt={image.alt || image.vehicleInfo.modelName}
                      fill
                      priority={index === 0}
                      quality={90}
                      sizes="100vw"
                      className="object-cover object-center"
                    />
                    
                    {/* Gradient overlay for text legibility */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/70"></div>
                  </div>
                  
                  {/* Image type indicator */}
                  <div className="absolute top-6 left-6 z-30 py-1.5 px-4 bg-primary-700 text-white uppercase text-xs tracking-widest font-medium"
                    style={{ backgroundColor: themeColors.primary700 }}
                  >
                    {image.type}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Information Panel - slides in from right */}
      <div 
        className={`absolute top-0 bottom-0 right-0 z-40 w-full md:w-[500px] transition-transform duration-500 ${
          showInfo ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ backgroundColor: 'rgba(255, 255, 255, 0.95)' }}
      >
        {/* Toggle Button */}
        <button 
          className="absolute -left-10 top-1/2 transform -translate-y-1/2 p-2 z-50"
          onClick={toggleInfo}
          aria-label={showInfo ? "Hide information" : "Show information"}
          style={{ backgroundColor: themeColors.primary700 }}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className={`h-6 w-6 text-white transition-transform duration-300 ${showInfo ? 'rotate-180' : ''}`}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Content */}
        <div className="h-full overflow-y-auto p-8 md:p-10">
          {/* Model Year & Name */}
          <div className="border-l-2 border-primary-700 pl-4 mb-6" style={{ borderColor: themeColors.primary700 }}>
            <div className="text-gray-500 text-sm uppercase tracking-widest mb-1">
              {activeVehicle.modelYear}
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
              {activeVehicle.modelName}
            </h2>
          </div>
          
          {/* Tagline */}
          <div className="mb-8">
            <div className="w-16 h-1 mb-4" style={{ backgroundColor: themeColors.primary700 }}></div>
            <p className="text-xl text-gray-900 font-light">
              {activeVehicle.tagline}
            </p>
            <p className="text-gray-600 mt-2">
              {activeVehicle.description}
            </p>
          </div>
          
          {/* View Toggle */}
          <div className="flex mb-8 border-b border-gray-200">
            <button 
              className={`py-2 px-4 relative text-sm font-medium ${
                activeImageType === 'exterior' ? 'text-primary-900' : 'text-gray-500'
              }`}
              onClick={() => filterByImageType(activeVehicle.id, 'exterior')}
              style={{ 
                color: activeImageType === 'exterior' ? themeColors.primary900 : themeColors.gray500
              }}
            >
              Exterior
              {activeImageType === 'exterior' && (
                <div 
                  className="absolute bottom-0 left-0 w-full h-0.5"
                  style={{ backgroundColor: themeColors.primary700 }}
                ></div>
              )}
            </button>
            <button 
              className={`py-2 px-4 relative text-sm font-medium ${
                activeImageType === 'interior' ? 'text-primary-900' : 'text-gray-500'
              }`}
              onClick={() => filterByImageType(activeVehicle.id, 'interior')}
              style={{ 
                color: activeImageType === 'interior' ? themeColors.primary900 : themeColors.gray500
              }}
            >
              Interior
              {activeImageType === 'interior' && (
                <div 
                  className="absolute bottom-0 left-0 w-full h-0.5"
                  style={{ backgroundColor: themeColors.primary700 }}
                ></div>
              )}
            </button>
          </div>
          
          {/* Vehicle Specifications */}
          <div className="mb-8">
            <h3 className="text-sm uppercase tracking-widest text-gray-500 mb-4">
              Specifications
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {activeVehicle.specs && Object.entries(activeVehicle.specs).map(([key, value], idx) => (
                <div 
                  key={idx} 
                  className="bg-gray-100 border-l-2 p-3"
                  style={{ borderColor: themeColors.primary700 }}
                >
                  <div className="text-xs text-gray-500 uppercase tracking-wider">{key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}</div>
                  <div className="text-gray-900 font-medium">{value}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div className="flex flex-col gap-4">
            {activeVehicle.buttons?.map((button, idx) => (
              <Link
                key={idx}
                href={button.url}
                className={`py-3 px-6 inline-flex items-center justify-center transition-all duration-300 
                  ${button.variant === 'primary' 
                    ? 'bg-primary-700 text-white hover:bg-primary-900' 
                    : button.variant === 'secondary' 
                      ? 'bg-gray-900 text-white hover:bg-black' 
                      : 'border border-gray-300 text-gray-900 hover:border-primary-700 hover:text-primary-700'
                  }`}
                style={{
                  backgroundColor: button.variant === 'primary' 
                    ? themeColors.primary700 
                    : button.variant === 'secondary' 
                      ? themeColors.gray900 
                      : 'transparent',
                  borderColor: button.variant === 'outline' ? themeColors.gray200 : 'transparent',
                  color: (button.variant === 'primary' || button.variant === 'secondary') 
                    ? themeColors.white 
                    : themeColors.gray900
                }}
              >
                <span>{button.label}</span>
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Vehicle Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30">
        <div 
          className="px-4 py-3 flex items-center gap-2 md:gap-4"
          style={{ backgroundColor: 'rgba(255, 255, 255, 0.9)' }}
        >
          {/* Previous Vehicle Button */}
          <button
            onClick={goToPrevVehicle}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary-700 transition-colors duration-300"
            aria-label="Previous vehicle"
            style={{ 
              color: themeColors.gray600,
              '--hover-color': themeColors.primary700
            }}
            disabled={isDragging}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          
          {/* Vehicle Thumbnails / Pagination */}
          <div className="flex items-center gap-3">
            {vehicles.map((vehicle, idx) => (
              <button
                key={vehicle.id}
                onClick={() => handleVehicleChange(idx)}
                className={`transition-all duration-300 ${
                  activeVehicleIndex === idx ? 'opacity-100' : 'opacity-50 hover:opacity-70'
                }`}
                aria-label={`View ${vehicle.modelName}`}
                aria-current={activeVehicleIndex === idx}
              >
                <div className="relative w-16 h-10 overflow-hidden">
                  <Image
                    src={vehicle.images[0].src}
                    alt={vehicle.modelName}
                    fill
                    sizes="64px"
                    className="object-cover"
                  />
                  {activeVehicleIndex === idx && (
                    <div 
                      className="absolute bottom-0 left-0 right-0 h-1"
                      style={{ backgroundColor: themeColors.primary700 }}
                    ></div>
                  )}
                </div>
              </button>
            ))}
          </div>
          
          {/* Next Vehicle Button */}
          <button
            onClick={goToNextVehicle}
            className="w-10 h-10 flex items-center justify-center text-gray-600 hover:text-primary-700 transition-colors duration-300"
            aria-label="Next vehicle"
            style={{ 
              color: themeColors.gray600,
              '--hover-color': themeColors.primary700
            }}
            disabled={isDragging}
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
          
          {/* Play/Pause Button */}
          <button
            onClick={toggleAutoplay}
            className="w-10 h-10 flex items-center justify-center ml-2"
            style={{ backgroundColor: themeColors.primary700 }}
            aria-label={isAutoplay ? "Pause slideshow" : "Play slideshow"}
          >
            {isAutoplay ? (
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <rect x="6" y="5" width="4" height="14" fill="currentColor" />
                <rect x="14" y="5" width="4" height="14" fill="currentColor" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path fill="currentColor" d="M6 4l15 8-15 8z" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Model Name Overlay */}
      <div className="absolute top-1/2 left-8 transform -translate-y-1/2 z-20 hidden md:block">
        <h2 className="text-white text-8xl font-bold opacity-20 uppercase tracking-wider">
          {activeVehicle.modelName.split(' ')[0]}
        </h2>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 z-10 h-1 bg-gray-200">
        {vehicles.map((vehicle, idx) => (
          <div 
            key={vehicle.id}
            style={{ 
              position: 'absolute',
              left: `${(idx / vehicles.length) * 100}%`,
              width: `${(1 / vehicles.length) * 100}%`,
              height: '100%',
              backgroundColor: activeVehicleIndex === idx ? themeColors.primary700 : 'transparent',
              transition: 'background-color 300ms ease-out'
            }}
          />
        ))}
      </div>

      {/* CSS Variables for Theme Colors */}
      <style jsx global>{`
        :root {
          --primary-light: ${themeColors.primaryLight};
          --primary-700: ${themeColors.primary700};
          --primary-800: ${themeColors.primary800};
          --primary-900: ${themeColors.primary900};
          --gray-900: ${themeColors.gray900};
          --gray-600: ${themeColors.gray600};
          --gray-500: ${themeColors.gray500};
          --gray-200: ${themeColors.gray200};
          --gray-100: ${themeColors.gray100};
        }
        
        .bg-primary-700 {
          background-color: var(--primary-700);
        }
        
        .hover\:bg-primary-700:hover {
          background-color: var(--primary-700);
        }
        
        .hover\:bg-primary-900:hover {
          background-color: var(--primary-900);
        }
        
        .text-primary-700 {
          color: var(--primary-700);
        }
        
        .text-primary-900 {
          color: var(--primary-900);
        }
        
        .hover\:text-primary-700:hover {
          color: var(--primary-700);
        }
        
        .hover\:border-primary-700:hover {
          border-color: var(--primary-700);
        }
        
        .border-primary-700 {
          border-color: var(--primary-700);
        }
        
        .swiper-slide {
          transition: opacity 0.8s ease;
        }
        
        button:focus-visible,
        a:focus-visible {
          outline: 2px solid var(--primary-700);
          outline-offset: 2px;
        }
      `}</style>
    </div>
  );
};

export default VehicleShowcase;