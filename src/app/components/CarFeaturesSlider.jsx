'use client'

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

const CarFeaturesSlider = ({ 
  // Content props
  title = "Vehicle Features",
  subtitle = "Explore our premium vehicle features",
  features,
  
  // Styling props
  backgroundColor = "bg-gray-50",
  titleColor = "text-brown-700",
  headingColor = "text-brown-800",
  subtitleColor = "text-brown-600",
  indicatorActiveColor = "bg-brown-600",
  indicatorColor = "bg-brown-300",
  
  // Layout & behavior props
  slidesPerView = { 
    mobile: 1,
    tablet: 2,
    desktop: 3
  },
  height = "h-64",
  autoplay = false,
  autoplaySpeed = 5000,
  showDots = true,
  showArrows = true,
  showHeading = true
}) => {
  // Default features if none are provided
  const defaultFeatures = [
    {
      id: 1,
      image: "/images/dynamic-lighting.jpg",
      title: "Dynamic lighting combination+Concierge lights"
    },
    {
      id: 2,
      image: "/images/sport-hub.jpg",
      title: "19 'glossy sport hub"
    },
    {
      id: 3,
      image: "/images/grille.jpg",
      title: "Matrix Diamond Front Grille"
    }
  ];

  const items = features || defaultFeatures;
  const totalItems = items.length;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [visibleItems, setVisibleItems] = useState(slidesPerView.desktop);
  const sliderRef = useRef(null);
  
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

  // Autoplay functionality
  useEffect(() => {
    let interval;
    if (autoplay) {
      interval = setInterval(() => {
        nextSlide();
      }, autoplaySpeed);
    }
    return () => clearInterval(interval);
  }, [autoplay, autoplaySpeed, currentIndex]);

  const nextSlide = () => {
    if (currentIndex < totalItems - visibleItems) {
      setCurrentIndex(currentIndex + 1);
    } else {
      setCurrentIndex(0);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else {
      setCurrentIndex(totalItems - visibleItems);
    }
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  // Touch events for mobile swiping
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 50) {
      nextSlide();
    }
    if (touchEnd - touchStart > 50) {
      prevSlide();
    }
  };

  return (
    <div className={`relative max-w-7xl mx-auto px-4 py-12 ${backgroundColor}`}>
      {/* Heading section */}
      {showHeading && (
        <div className="text-center mb-10">
          <h2 className={`text-3xl font-bold ${headingColor} mb-3`}>{title}</h2>
          <p className={`${subtitleColor} max-w-3xl mx-auto`}>{subtitle}</p>
        </div>
      )}
      
      {/* Navigation Buttons */}
      {showArrows && (
        <>
          <button 
            onClick={prevSlide}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all focus:outline-none"
            aria-label="Previous slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={titleColor}>
              <polyline points="15 18 9 12 15 6"></polyline>
            </svg>
          </button>
          
          <button 
            onClick={nextSlide}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-md transition-all focus:outline-none"
            aria-label="Next slide"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={titleColor}>
              <polyline points="9 18 15 12 9 6"></polyline>
            </svg>
          </button>
        </>
      )}
      
      {/* Slider Container */}
      <div 
        className="overflow-hidden"
        ref={sliderRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${currentIndex * (100 / visibleItems)}%)` }}
        >
          {items.map((feature, index) => (
            <div 
              key={feature.id || index} 
              className="flex-none px-2"
              style={{ width: `${100 / visibleItems}%` }}
            >
              <div className="bg-white rounded-md overflow-hidden shadow">
                <div className={`relative w-full ${height}`}>
                  <Image 
                    src={feature.image}
                    alt={feature.title || ''}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    className="object-cover"
                    priority={index < 3}
                  />
                </div>
                {feature.title && (
                  <div className="p-4">
                    <h3 className={`${titleColor} text-lg font-medium`}>{feature.title}</h3>
                    {feature.description && (
                      <p className="text-gray-500 mt-1 text-sm">{feature.description}</p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Indicator Dots */}
      {showDots && totalItems > visibleItems && (
        <div className="flex justify-center mt-6 gap-2">
          {Array.from({ length: totalItems - visibleItems + 1 }).map((_, index) => (
            <button
              key={index}
              className={`h-3 rounded-full transition-all focus:outline-none ${
                currentIndex === index ? `${indicatorActiveColor} w-6` : `${indicatorColor} w-3`
              }`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default CarFeaturesSlider;