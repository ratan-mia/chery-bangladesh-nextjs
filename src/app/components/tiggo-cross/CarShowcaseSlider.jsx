'use client';

import Image from "next/image";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Autoplay, EffectCreative, Keyboard, Mousewheel } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/effect-creative";

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
        src: "/images/tiggocross/hero/1.webp",
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
        src: "/images/tiggocross/hero/2.webp",
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

  if (!vehicles || vehicles.length === 0) {
    return (
      <div className={`w-full flex items-center justify-center bg-gray-100`} style={{ height: containerHeight }}>
        <div className="text-gray-900 text-xl">No vehicle data available</div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden ${height} ${className}`}
      style={{
        height: containerHeight ? `${containerHeight}px` : '100vh',
        maxHeight: '100vh'
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
                  <div className="absolute inset-0 z-0">
                    <Image
                      src={image.src}
                      alt={image.alt || image.vehicleInfo.modelName}
                      fill
                      priority={index === 0}
                      quality={90}
                      sizes="100vw"
                      className="object-cover object-center"
                    />
                  </div>

                  {/* Enhanced gradient overlay for better readability */}
                  <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/70 via-black/20 to-black/40 pointer-events-none"></div>

                  {/* Type indicator (interior/exterior) with improved visibility */}
                  <div className={`absolute top-6 left-6 z-30 py-2 px-4 uppercase text-sm tracking-widest rounded-sm ${
                    image.type === 'interior' ? 'bg-[#8c735d]' : 'bg-[#524336]'
                  } text-white font-semibold shadow-lg`}>
                    {image.type}
                  </div>

                  {/* Vehicle info content with improved readability */}
                  <div className="absolute bottom-0 left-0 right-0 z-20 p-6 md:p-8 lg:p-10">
                    <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-8">
                      {/* Left side: Vehicle details with enhanced readability */}
                      <div className="flex flex-col justify-end md:col-span-7 bg-black/40 p-6 rounded-lg backdrop-blur-sm">
                        <div className="mb-2 text-white/90">
                          <span className="uppercase tracking-widest text-sm font-medium">{image.vehicleInfo.modelYear}</span>
                        </div>

                        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold uppercase mb-3 tracking-tight text-white">
                          {image.vehicleInfo.modelName}
                        </h2>

                        <div className="w-20 h-1 mb-4 bg-[#8c735d]"></div>

                        <p className="text-base md:text-xl mb-6 max-w-lg text-white leading-relaxed">
                          {image.vehicleInfo.tagline}
                        </p>

                        {/* Feature list with improved visibility */}
                        <div className="mb-8 hidden md:block">
                          <h3 className="text-sm uppercase tracking-wider text-white/90 font-semibold mb-4">Key Features</h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {image.vehicleInfo.features.slice(0, 4).map((feature, idx) => (
                              <li key={idx} className="flex items-start text-white/90 text-base">
                                <div className="flex-shrink-0 h-6 w-6 mt-0.5 rounded-full bg-[#8c735d]/30 flex items-center justify-center mr-3">
                                  <svg className="h-3 w-3 text-[#c4b19c]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                                  </svg>
                                </div>
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* CTA Buttons with improved visibility */}
                        <div className="flex flex-wrap gap-4 mt-2">
                          {image.vehicleInfo.buttons?.map((button, idx) => (
                            <a
                              key={idx}
                              href={button.url}
                              className={`group inline-flex items-center px-6 py-3 md:px-8 md:py-4 text-sm md:text-base font-medium transition-all duration-300 shadow-lg ${
                                button.variant === 'primary' 
                                  ? 'bg-[#8c735d] text-white hover:bg-[#8c735d]/90'
                                  : 'bg-[#524336] text-white hover:bg-[#524336]/90'
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

                      {/* Right side: Vehicle specs with enhanced readability */}
                      {showSpecs && (
                        <div className="flex flex-col justify-end md:col-span-5">
                          <div className="grid grid-cols-2 gap-4 p-6 rounded-lg bg-white/90 backdrop-blur-sm shadow-lg border-l-4 border-[#8c735d]">
                            {image.vehicleInfo.specs && Object.entries(image.vehicleInfo.specs).map(([key, value], idx) => (
                              <div key={idx} className="border-b border-gray-200 pb-3 mb-3 last:border-0 last:mb-0 last:pb-0">
                                <div className="text-sm uppercase tracking-wider mb-1 text-gray-500 font-medium">
                                  {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                                </div>
                                <div className={`text-lg md:text-xl font-semibold ${idx % 2 === 0 ? 'text-[#8c735d]' : 'text-gray-900'}`}>
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

      {/* Toggle view button (interior/exterior) with improved visibility */}
      <div className="absolute right-6 top-6 z-40">
        <button
          onClick={toggleView}
          className="inline-flex items-center justify-center bg-white shadow-lg px-5 py-3 text-sm uppercase tracking-wider font-medium text-[#524336] hover:bg-[#8c735d] hover:text-white transition-colors duration-300 rounded-sm"
        >
          View {activeVehicle.id === 'exterior' ? 'Interior' : 'Exterior'}
        </button>
      </div>

      {/* Control buttons with improved visibility */}
      <div className="absolute right-6 bottom-6 z-40 flex items-center space-x-3">
        {/* Toggle view button */}
        <button
          onClick={toggleView}
          className="w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-full bg-white shadow-lg hover:bg-gray-100"
          aria-label={`View ${activeVehicle.id === 'exterior' ? 'Interior' : 'Exterior'}`}
          disabled={isDragging}
        >
          <svg className="w-6 h-6 text-[#524336]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
          className="w-12 h-12 flex items-center justify-center transition-all duration-300 rounded-full bg-[#8c735d] hover:bg-[#524336] shadow-lg"
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
      </div>

      {/* Progress indicator with improved visibility */}
      <div className="absolute bottom-0 left-0 right-0 z-30 h-1.5 bg-black/30">
        <div
          className="h-full bg-[#8c735d] transition-all duration-500 ease-out"
          style={{
            width: `${(activeIndex / allImages.length) * 100}%`,
          }}
        ></div>
      </div>
    </div>
  );
};

export default VehicleShowcase;