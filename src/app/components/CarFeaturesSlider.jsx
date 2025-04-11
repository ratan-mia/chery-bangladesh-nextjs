'use client'

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const SwiperCarSlider = ({
  // Content props
  features,
  
  // Styling props
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  accentColor = "bg-slate-800",
  accentTextColor = "text-slate-800",
  
  // Layout & behavior props
  slidesPerView = { 
    desktop: 3,
    tablet: 2,
    mobile: 1
  },
  autoplay = true,
  autoplaySpeed = 5000,
  showHeading = true,
  heading = "Vehicle Features",
  subtitle = "Discover the premium elements that define our vehicles"
}) => {
  // Default features if none are provided
  const defaultFeatures = [
    {
      id: 1,
      image: "/api/placeholder/800/600",
      title: "Dynamic LED Lighting",
      text: "Adaptive lighting system that automatically adjusts to driving conditions."
    },
    {
      id: 2,
      image: "/api/placeholder/800/600",
      title: "Premium Alloy Wheels",
      text: "Lightweight design enhancing performance and efficiency with premium materials."
    },
    {
      id: 3,
      image: "/api/placeholder/800/600",
      title: "Signature Front Grille",
      text: "Distinctive design with premium finish for unmistakable presence on the road."
    },
    {
      id: 4,
      image: "/api/placeholder/800/600",
      title: "Panoramic Sunroof",
      text: "Full-length glass roof providing an enhanced sense of space and light."
    },
    {
      id: 5,
      image: "/api/placeholder/800/600",
      title: "Advanced Infotainment",
      text: "Seamless connectivity with intuitive controls and premium audio."
    },
    {
      id: 6,
      image: "/api/placeholder/800/600",
      title: "Driver Assistance",
      text: "Intelligent safety features that help prevent accidents and protect occupants."
    },
    {
      id: 7,
      image: "/api/placeholder/800/600",
      title: "Ergonomic Seating",
      text: "Contoured seats with multi-way adjustments for superior comfort on any journey."
    },
    {
      id: 8,
      image: "/api/placeholder/800/600",
      title: "Climate Control",
      text: "Precision heating and cooling with multi-zone settings for personalized comfort."
    }
  ];

  const items = features || defaultFeatures;
  const totalItems = items.length;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [visibleItems, setVisibleItems] = useState(slidesPerView.desktop);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStartX, setDragStartX] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [slideWidth, setSlideWidth] = useState(0);
  
  const sliderRef = useRef(null);
  const autoplayTimerRef = useRef(null);
  
  // Responsive behavior
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setVisibleItems(slidesPerView.mobile);
      } else if (window.innerWidth < 1024) {
        setVisibleItems(slidesPerView.tablet);
      } else {
        setVisibleItems(slidesPerView.desktop);
      }
      
      // Calculate slide width
      if (sliderRef.current) {
        const containerWidth = sliderRef.current.offsetWidth;
        setSlideWidth(containerWidth / visibleItems);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesPerView, visibleItems]);

  // Calculate max index based on visible items
  const maxIndex = Math.max(0, totalItems - visibleItems);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && !isPaused && !isDragging) {
      autoplayTimerRef.current = setInterval(() => {
        setCurrentIndex(prevIndex => 
          prevIndex < maxIndex ? prevIndex + 1 : 0
        );
      }, autoplaySpeed);
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, autoplaySpeed, isPaused, isDragging, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex < maxIndex ? prevIndex + 1 : prevIndex
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  // Mouse drag handlers (desktop swipe behavior)
  const handleMouseDown = (e) => {
    setIsPaused(true);
    setIsDragging(true);
    setDragStartX(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    
    const currentDragOffset = e.clientX - dragStartX;
    setDragOffset(currentDragOffset);
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    // If dragged more than 20% of slide width, change slide
    const dragThreshold = slideWidth * 0.2;
    
    if (dragOffset < -dragThreshold) {
      nextSlide();
    } else if (dragOffset > dragThreshold) {
      prevSlide();
    }
    
    setIsDragging(false);
    setDragOffset(0);
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
    setIsPaused(false);
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setIsPaused(true);
    setIsDragging(true);
    setDragStartX(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging) return;
    
    const currentDragOffset = e.touches[0].clientX - dragStartX;
    setDragOffset(currentDragOffset);
  };

  const handleTouchEnd = () => {
    handleMouseUp();
  };

  // Calculate the transform value considering the drag offset
  const getTransformValue = () => {
    const baseTransform = -currentIndex * 100 / visibleItems;
    const dragPercent = dragOffset / slideWidth * (100 / visibleItems);
    
    return `translateX(${baseTransform + dragPercent}%)`;
  };

  return (
    <div className={`w-full ${backgroundColor}`}>
      {/* Header - Clean and professional design */}
      {showHeading && (
        <div className="w-full">
          <div className="max-w-screen-2xl mx-auto px-6 md:px-8 pt-16 pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <div className={`${accentColor} h-0.5 w-12 mb-4`}></div>
                <h2 className={`text-2xl md:text-3xl font-semibold ${textColor} mb-2`}>
                  {heading}
                </h2>
                <p className="text-gray-500 text-base max-w-xl">
                  {subtitle}
                </p>
              </div>
              
              {/* Navigation controls */}
              <div className="flex items-center mt-6 md:mt-0">
                <button 
                  onClick={prevSlide}
                  className={`w-12 h-12 border border-gray-200 flex items-center justify-center mr-1 focus:outline-none bg-white transition ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300'}`}
                  aria-label="Previous slide"
                  disabled={currentIndex === 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                
                <button 
                  onClick={nextSlide}
                  className={`w-12 h-12 border border-gray-200 flex items-center justify-center focus:outline-none bg-white transition ${currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:border-gray-300'}`}
                  aria-label="Next slide"
                  disabled={currentIndex === maxIndex}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Swiper-Style Slider */}
      <div 
        className="w-full overflow-hidden"
        ref={sliderRef}
      >
        <div 
          className="w-full cursor-grab select-none"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          <div 
            className="flex transition-transform duration-300 ease-out px-6 md:px-8 max-w-screen-2xl mx-auto"
            style={{ transform: getTransformValue() }}
          >
            {items.map((feature, index) => (
              <div 
                key={feature.id || index}
                className="flex-none px-2"
                style={{ width: `${100 / visibleItems}%` }}
              >
                <div className="h-full bg-white border border-gray-100 overflow-hidden hover:shadow-sm transition-shadow duration-300">
                  {/* Larger image */}
                  <div className="relative w-full aspect-[16/10] overflow-hidden">
                    <Image 
                      src={feature.image}
                      alt={feature.title || ''}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 hover:scale-105"
                      priority={index < 4}
                    />
                    
                    {/* Feature title overlaid on image */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/70 to-transparent">
                      <h3 className="text-white text-lg font-medium">
                        {feature.title}
                      </h3>
                    </div>
                  </div>
                  
                  {/* Minimal content below the image */}
                  <div className="p-6">
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {feature.text}
                    </p>
                    
                    {/* Simple text link */}
                    <div className="mt-4 pt-4 border-t border-gray-100">
                      <a 
                        href="#" 
                        className={`${accentTextColor} text-sm font-medium inline-flex items-center hover:underline`}
                      >
                        View details
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1.5">
                          <line x1="5" y1="12" x2="19" y2="12"></line>
                          <polyline points="12 5 19 12 12 19"></polyline>
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      {/* Swiper-style pagination with progress */}
      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-8 py-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          {/* Swiper-style pagination bullets */}
          <div className="flex items-center space-x-2">
            {Array.from({ length: Math.min(8, maxIndex + 1) }).map((_, idx) => {
              // If we have more than 8 indices, we need to distribute them evenly
              const actualIndex = maxIndex > 7 
                ? Math.floor(idx * maxIndex / 7) 
                : idx;
                
              return (
                <button
                  key={idx}
                  onClick={() => goToSlide(actualIndex)}
                  className={`w-8 h-0.5 transition-colors focus:outline-none ${
                    currentIndex === actualIndex 
                      ? accentColor
                      : 'bg-gray-300'
                  }`}
                  aria-label={`Go to slide ${actualIndex + 1}`}
                />
              );
            })}
          </div>
          
          {/* Autoplay control with fraction */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="text-gray-500 p-2 border border-gray-200 focus:outline-none"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              )}
            </button>
            
            <div className="text-sm text-gray-600 font-medium">
              <span className={accentTextColor}>{currentIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>{maxIndex + 1}</span>
            </div>
            
            <a href="#" className={`text-sm ${accentTextColor} font-medium hover:underline inline-flex items-center ml-4`}>
              View all features
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </a>
          </div>
        </div>
      </div>
      
      {/* Instructions for swiper (can be removed in production) */}
      <div className="w-full max-w-screen-2xl mx-auto px-6 md:px-8 py-2 mb-8">
        <p className="text-sm text-gray-400 italic">
          Drag horizontally to navigate through features
        </p>
      </div>
    </div>
  );
};

export default SwiperCarSlider;