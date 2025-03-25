'use client'

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const CarFeaturesSlider = ({ 
  // Content props
  features,
  
  // Styling props - simplified with light theme
  backgroundColor = "bg-gray-200",
  textColor = "text-gray-800",
  accentColor = "bg-blue-500",
  accentTextColor = "text-blue-500",
  
  // Layout & behavior props
  slidesPerView = { 
    mobile: 1,
    tablet: 2,
    desktop: 3
  },
  autoplay = true,
  autoplaySpeed = 5000,
  showHeading = true,
  heading = "Car Features",
  subtitle = "Explore what makes our vehicles special"
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
    }
  ];

  const items = features || defaultFeatures;
  const totalItems = items.length;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleItems, setVisibleItems] = useState(slidesPerView.desktop);
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
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesPerView]);

  // Calculate max index based on visible items
  const maxIndex = Math.max(0, totalItems - visibleItems);

  // Autoplay functionality
  useEffect(() => {
    if (autoplay && !isPaused) {
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
  }, [autoplay, autoplaySpeed, isPaused, maxIndex]);

  const nextSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex < maxIndex ? prevIndex + 1 : 0
    );
  };

  const prevSlide = () => {
    setCurrentIndex(prevIndex => 
      prevIndex > 0 ? prevIndex - 1 : maxIndex
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
  };

  // Touch handlers
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 70) {
      nextSlide();
    }
    if (touchEnd - touchStart > 70) {
      prevSlide();
    }
    setIsPaused(false);
  };

  return (
    <div className={`w-full ${backgroundColor}`}>
      {/* Header - Simplified */}
      {showHeading && (
        <div className="relative w-full">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 pt-8 pb-4">
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                <div className={`${accentColor} h-1 w-12 mb-3`}></div>
                <h2 className={`text-2xl md:text-3xl font-bold ${textColor} mb-2`}>
                  {heading}
                </h2>
                <p className="text-gray-500 text-base max-w-xl">
                  {subtitle}
                </p>
              </div>
              
              {/* Navigation controls - Simplified */}
              <div className="flex items-center mt-4 md:mt-0">
                <button 
                  onClick={prevSlide}
                  className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center mr-2 focus:outline-none ${currentIndex === 0 ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  aria-label="Previous slide"
                  disabled={currentIndex === 0}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                
                <button 
                  onClick={nextSlide}
                  className={`w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center focus:outline-none ${currentIndex === maxIndex ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100'}`}
                  aria-label="Next slide"
                  disabled={currentIndex === maxIndex}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-600">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Slider - Simplified design */}
      <div className="w-full overflow-hidden py-6">
        <div 
          className="w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div className="max-w-7xl mx-auto px-6 lg:px-8">
            <div 
              className="flex transition-transform duration-500 ease-out h-full"
              style={{ transform: `translateX(calc(-${currentIndex * (100 / visibleItems)}%))` }}
            >
              {items.map((feature, index) => (
                <div 
                  key={feature.id || index}
                  className="flex-none pr-4"
                  style={{ width: `${100 / visibleItems}%` }}
                >
                  <div className="group h-full bg-white rounded-lg shadow-sm overflow-hidden">
                    {/* Image */}
                    <div className="relative w-full aspect-[16/9] overflow-hidden">
                      <Image 
                        src={feature.image}
                        alt={feature.title || ''}
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                        priority={index < 3}
                      />
                    </div>
                    
                    {/* Content */}
                    <div className="p-4">
                      <h3 className={`${textColor} text-lg font-semibold mb-2`}>
                        {feature.title}
                      </h3>
                      <p className="text-gray-600 text-sm">
                        {feature.text}
                      </p>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-between items-center">
                        <span className={`${accentTextColor} text-sm font-medium`}>Learn more</span>
                        <div className={`w-6 h-6 ${accentColor} rounded-full flex items-center justify-center`}>
                          <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                            <polyline points="9 18 15 12 9 6"></polyline>
                          </svg>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress indicator - Simplified */}
      <div className="w-full max-w-7xl mx-auto px-6 lg:px-8 pb-8">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="text-gray-500 p-2 focus:outline-none mr-2"
              aria-label={isPaused ? "Play slideshow" : "Pause slideshow"}
            >
              {isPaused ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="6" y="4" width="4" height="16"></rect>
                  <rect x="14" y="4" width="4" height="16"></rect>
                </svg>
              )}
            </button>
            <div className="text-xs text-gray-500">
              <span className={accentTextColor}>{currentIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>{maxIndex + 1}</span>
            </div>
          </div>
          
          <div className="flex-1 mx-4">
            <div className="h-1 bg-gray-300 w-full rounded-full">
              <div 
                className={`h-full ${accentColor} rounded-full transition-all duration-300`}
                style={{ width: `${((currentIndex) / (maxIndex)) * 100}%` }}
              />
            </div>
          </div>
          
          <div className="flex">
            {Array.from({ length: Math.min(5, maxIndex + 1) }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`w-2 h-2 mx-1 rounded-full transition-colors ${currentIndex === index ? accentColor : 'bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarFeaturesSlider;