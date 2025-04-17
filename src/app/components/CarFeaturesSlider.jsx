'use client'

import Image from 'next/image';
import Link from 'next/link';
import { useCallback, useEffect, useRef, useState } from 'react';

const CarFeaturesSlider = ({ 
  // Content props
  features,
  
  // Styling props
  backgroundColor = "bg-white", // Changed to white as primary background
  textColor = "text-gray-900", // Using brand guidelines text color
  accentColor = "bg-primary-700", // Using Chery primary-700 from guidelines
  accentTextColor = "text-primary-700",
  
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
  subtitle = "Explore what makes our vehicles special",
  showLearnMore = true, // Changed to true to follow Chery's content focus principle
  
  // Enhanced functionality
  linkAllCards = false,
  linkTarget = '/features',
  cardAspectRatio = "aspect-[16/9]", // Changed to 16/9 to match guidelines
  showProgressBar = true,
  showBulletPagination = true,
  linkBase = '/features',
  animationSpeed = 300, // Changed to 300ms (medium) per guidelines
}) => {
  // Default features if none are provided
  const defaultFeatures = [
    {
      id: 1,
      image: "/api/placeholder/800/600",
      title: "Dynamic LED Lighting",
      text: "Adaptive lighting system that automatically adjusts to driving conditions.",
      link: "/features/lighting"
    },
    {
      id: 2,
      image: "/api/placeholder/800/600",
      title: "Premium Alloy Wheels",
      text: "Lightweight design enhancing performance and efficiency with premium materials.",
      link: "/features/wheels"
    },
    {
      id: 3,
      image: "/api/placeholder/800/600",
      title: "Signature Front Grille",
      text: "Distinctive design with premium finish for unmistakable presence on the road.",
      link: "/features/grille"
    },
    {
      id: 4,
      image: "/api/placeholder/800/600",
      title: "Panoramic Sunroof",
      text: "Full-length glass roof providing an enhanced sense of space and light.",
      link: "/features/sunroof"
    },
    {
      id: 5,
      image: "/api/placeholder/800/600",
      title: "Advanced Infotainment",
      text: "Seamless connectivity with intuitive controls and premium audio.",
      link: "/features/infotainment"
    }
  ];

  const items = features || defaultFeatures;
  const totalItems = items.length;
  
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [visibleItems, setVisibleItems] = useState(slidesPerView.desktop);
  const [isTransitioning, setIsTransitioning] = useState(false);
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
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [slidesPerView]);

  // Calculate max index based on visible items
  const maxIndex = Math.max(0, totalItems - visibleItems);

  // Autoplay functionality with improved pause handling
  useEffect(() => {
    if (autoplay && !isPaused) {
      autoplayTimerRef.current = setInterval(() => {
        if (!isTransitioning) {
          setCurrentIndex(prevIndex => 
            prevIndex < maxIndex ? prevIndex + 1 : 0
          );
        }
      }, autoplaySpeed);
    }
    
    return () => {
      if (autoplayTimerRef.current) {
        clearInterval(autoplayTimerRef.current);
      }
    };
  }, [autoplay, autoplaySpeed, isPaused, maxIndex, isTransitioning]);

  // Navigation functions with transition lock
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex < maxIndex ? prevIndex + 1 : 0;
      
      // Reset to start if we've reached the end and are going to first slide
      if (prevIndex === maxIndex && newIndex === 0 && sliderRef.current) {
        // Use setTimeout to allow the DOM to update
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
            sliderRef.current.style.transform = 'translateX(0)';
            // Force reflow
            void sliderRef.current.offsetWidth;
            sliderRef.current.style.transition = `transform ${animationSpeed}ms ease-out`;
          }
        }, animationSpeed);
      }
      
      return newIndex;
    });
    
    setTimeout(() => setIsTransitioning(false), animationSpeed);
  }, [maxIndex, isTransitioning, animationSpeed]);

  const prevSlide = useCallback(() => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(prevIndex => {
      const newIndex = prevIndex > 0 ? prevIndex - 1 : maxIndex;
      
      // Jump to end if we're at the start and going to last slide
      if (prevIndex === 0 && newIndex === maxIndex && sliderRef.current) {
        setTimeout(() => {
          if (sliderRef.current) {
            sliderRef.current.style.transition = 'none';
            sliderRef.current.style.transform = `translateX(calc(-${maxIndex * (100 / visibleItems)}%))`;
            // Force reflow
            void sliderRef.current.offsetWidth;
            sliderRef.current.style.transition = `transform ${animationSpeed}ms ease-out`;
          }
        }, animationSpeed);
      }
      
      return newIndex;
    });
    
    setTimeout(() => setIsTransitioning(false), animationSpeed);
  }, [maxIndex, isTransitioning, visibleItems, animationSpeed]);

  const goToSlide = useCallback((index) => {
    if (isTransitioning) return;
    
    setIsTransitioning(true);
    setCurrentIndex(Math.min(Math.max(0, index), maxIndex));
    setTimeout(() => setIsTransitioning(false), animationSpeed);
  }, [maxIndex, isTransitioning, animationSpeed]);

  // Touch handlers with improved sensitivity
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
    
    // Optional: Add drag effect on the slider
    if (sliderRef.current && touchStart) {
      const distance = touchEnd - touchStart;
      const translateValue = -currentIndex * (100 / visibleItems) + (distance / sliderRef.current.offsetWidth) * 100;
      
      // Limit drag within bounds
      if ((currentIndex === 0 && distance > 0) || (currentIndex === maxIndex && distance < 0)) {
        // Reduce effect for out-of-bounds drag
        sliderRef.current.style.transform = `translateX(calc(${translateValue * 0.3}%))`;
      } else {
        sliderRef.current.style.transform = `translateX(calc(${translateValue}%))`;
      }
    }
  };

  const handleTouchEnd = () => {
    if (sliderRef.current) {
      // Reset transition
      sliderRef.current.style.transition = `transform ${animationSpeed}ms ease-out`;
    }
    
    // Threshold for swipe detection - more sensitive now
    if (touchStart - touchEnd > 50) {
      nextSlide();
    } else if (touchEnd - touchStart > 50) {
      prevSlide();
    } else {
      // Restore position if no swipe detected
      if (sliderRef.current) {
        sliderRef.current.style.transform = `translateX(calc(-${currentIndex * (100 / visibleItems)}%))`;
      }
    }
    
    setIsPaused(false);
  };

  // Progress calculation
  const progressPercentage = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 100;

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  return (
    <div className={`w-full ${backgroundColor}`}>
      {/* Header with improved structure following Chery guidelines */}
      {showHeading && (
        <div className="relative w-full py-8 md:py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row md:items-end justify-between">
              <div>
                {/* Accent bar per Chery guidelines */}
                <div className={`${accentColor} h-1 w-12 mb-4`}></div>
                <h2 className={`text-2xl md:text-3xl lg:text-4xl font-bold ${textColor} mb-2`}>
                  {heading}
                </h2>
                <p className="text-gray-600 text-base md:text-lg max-w-xl">
                  {subtitle}
                </p>
              </div>
              
              {/* Navigation controls with Chery styling */}
              <div className="flex items-center mt-6 md:mt-0">
                <button 
                  onClick={prevSlide}
                  className={`w-10 h-10 border border-gray-200 flex items-center justify-center mr-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-700 transition-colors ${currentIndex === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                  aria-label="Previous slide"
                  disabled={currentIndex === 0 && isTransitioning}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                
                <button 
                  onClick={nextSlide}
                  className={`w-10 h-10 border border-gray-200 flex items-center justify-center focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-700 transition-colors ${currentIndex === maxIndex ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}
                  aria-label="Next slide"
                  disabled={currentIndex === maxIndex && isTransitioning}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Slider with improved interaction */}
      <div className="w-full overflow-hidden py-6">
        <div 
          className="w-full"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          aria-roledescription="carousel"
          aria-label="Car features showcase"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div 
              ref={sliderRef}
              className="flex transition-transform duration-300 ease-out h-full" // Using 300ms per guidelines
              style={{ transform: `translateX(calc(-${currentIndex * (100 / visibleItems)}%))` }}
              role="presentation"
            >
              {items.map((feature, index) => {
                const CardTag = (linkAllCards || feature.link) ? Link : 'div';
                const cardProps = (linkAllCards || feature.link) ? {
                  href: feature.link || `${linkBase}/${feature.id}`,
                  className: "block h-full"
                } : {};
                
                return (
                  <div 
                    key={feature.id || index}
                    className="flex-none pr-4"
                    style={{ width: `${100 / visibleItems}%` }}
                    role="group"
                    aria-roledescription="slide"
                    aria-label={`Slide ${index + 1} of ${items.length}: ${feature.title}`}
                  >
                    {/* Card using Chery's design patterns */}
                    <div className="group h-full bg-white border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-primary-700">
                      <CardTag {...cardProps}>
                        {/* Image with improved hover effect per Chery guidelines */}
                        <div className={`relative w-full ${cardAspectRatio} overflow-hidden`}>
                          <Image 
                            src={feature.image}
                            alt={feature.title || ''}
                            fill
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            priority={index < visibleItems}
                          />
                          {/* Gradient overlay on hover per Chery guidelines */}
                          <div className="absolute inset-0 bg-gradient-to-t from-primary-900/0 via-primary-900/0 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                          
                          {/* Category label */}
                          {feature.caption && (
                            <div className="absolute bottom-0 left-0 bg-white py-1 px-3 z-10">
                              <span className="text-xs font-medium uppercase tracking-wider text-gray-900">{feature.caption}</span>
                            </div>
                          )}
                        </div>
                        
                        {/* Content with Chery's layout pattern */}
                        <div className="p-5 border-t-0 border-l border-r border-b border-gray-200">
                          <h3 className={`${textColor} text-lg font-semibold mb-2 group-hover:text-primary-900 transition-colors duration-300`}>
                            {feature.title}
                          </h3>
                          <p className="text-gray-600 text-sm leading-relaxed mb-4">
                            {feature.text}
                          </p>
                          {showLearnMore && (
                            <div className="mt-auto">
                              <span className={`inline-flex items-center ${accentTextColor} text-sm font-medium group-hover:text-primary-900 transition-colors duration-300`}>
                                Learn More
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:ml-3 transition-all duration-300">
                                  <polyline points="9 18 15 12 9 6"></polyline>
                                </svg>
                              </span>
                            </div>
                          )}
                        </div>
                      </CardTag>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      
      {/* Improved controls and indicators with Chery styling */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-10">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-0 sm:items-center sm:justify-between">
          {/* Play/pause and count indicators */}
          <div className="flex items-center">
            <button 
              onClick={() => setIsPaused(!isPaused)}
              className="text-gray-500 hover:text-gray-700 p-2 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-700 mr-2 transition-colors"
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
              <span className={`font-medium ${accentTextColor}`}>{currentIndex + 1}</span>
              <span className="mx-1">/</span>
              <span>{maxIndex + 1}</span>
            </div>
          </div>
          
          {/* Progress bar styled per Chery guidelines */}
          {showProgressBar && (
            <div className="flex-1 mx-4 hidden sm:block">
              <div className="h-1 bg-gray-200 w-full overflow-hidden">
                <div 
                  className={`h-full ${accentColor} transition-all duration-300`}
                  style={{ width: `${progressPercentage}%` }}
                />
              </div>
            </div>
          )}
          
          {/* Bullet pagination styled per Chery guidelines */}
          {showBulletPagination && (
            <div className="flex">
              {Array.from({ length: Math.min(maxIndex + 1, 7) }).map((_, index) => {
                // For many slides, show ellipsis in the middle
                if (maxIndex + 1 > 7 && index === 3 && currentIndex > 3 && currentIndex < maxIndex - 2) {
                  return (
                    <div key="ellipsis" className="mx-1 flex items-center">
                      <span className="text-gray-400 text-xs">...</span>
                    </div>
                  );
                }
                
                // Calculate which index to show for the bullet
                let bulletIndex = index;
                if (maxIndex + 1 > 7) {
                  if (currentIndex > 3 && currentIndex < maxIndex - 2) {
                    if (index === 0) bulletIndex = 0;
                    else if (index === 1) bulletIndex = 1;
                    else if (index === 2) bulletIndex = 2;
                    else if (index === 4) bulletIndex = currentIndex;
                    else if (index === 5) bulletIndex = maxIndex - 1;
                    else if (index === 6) bulletIndex = maxIndex;
                  } else if (currentIndex >= maxIndex - 2) {
                    if (index <= 2) bulletIndex = index;
                    else bulletIndex = maxIndex - (6 - index);
                  }
                }
                
                return (
                  <button
                    key={bulletIndex}
                    onClick={() => goToSlide(bulletIndex)}
                    className={`w-6 h-2 mx-0.5 transition-all duration-300 ${
                      currentIndex === bulletIndex 
                        ? `${accentColor}` 
                        : 'bg-gray-200 hover:bg-gray-300'
                    }`}
                    aria-label={`Go to slide ${bulletIndex + 1}`}
                    aria-current={currentIndex === bulletIndex ? "true" : "false"}
                  />
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CarFeaturesSlider;