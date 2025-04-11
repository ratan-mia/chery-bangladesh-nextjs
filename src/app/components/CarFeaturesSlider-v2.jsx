'use client'

import Image from 'next/image';
import { useEffect, useState } from 'react';

const CarFeaturesGallery = ({
  // Content props
  features,
  
  // Styling props
  backgroundColor = "bg-white",
  textColor = "text-gray-900",
  accentColor = "bg-emerald-600",
  accentTextColor = "text-emerald-600",
  
  // Layout & behavior props
  autoplay = true,
  autoplaySpeed = 4000,
  showHeading = true,
  heading = "Vehicle Highlights",
  subtitle = "Discover the premium features that set our vehicles apart"
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
  
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Autoplay functionality
  useEffect(() => {
    if (!autoplay || isPaused) return;
    
    const timer = setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % items.length);
    }, autoplaySpeed);
    
    return () => clearTimeout(timer);
  }, [activeIndex, autoplay, autoplaySpeed, isPaused, items.length]);

  const handlePrevious = () => {
    setActiveIndex((prev) => (prev - 1 + items.length) % items.length);
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % items.length);
  };

  const handleDotClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className={`w-full ${backgroundColor} py-12`}
         onMouseEnter={() => setIsPaused(true)}
         onMouseLeave={() => setIsPaused(false)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        {showHeading && (
          <div className="text-center mb-12">
            <span className={`inline-block ${accentColor} h-1 w-20 mb-4`}></span>
            <h2 className={`text-3xl md:text-4xl font-bold ${textColor} mb-3`}>
              {heading}
            </h2>
            <p className="text-gray-500 max-w-2xl mx-auto">
              {subtitle}
            </p>
          </div>
        )}
        
        {/* Gallery Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left: Featured Image */}
          <div className="relative rounded-xl overflow-hidden shadow-lg">
            <div className="aspect-[4/3] relative">
              <Image
                src={items[activeIndex].image}
                alt={items[activeIndex].title}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
                priority
              />
              
              {/* Image overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
              
              {/* Feature title on image */}
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h3 className="text-white text-2xl font-bold mb-2">
                  {items[activeIndex].title}
                </h3>
                <p className="text-white/80 text-sm md:text-base max-w-md">
                  {items[activeIndex].text}
                </p>
              </div>
              
              {/* Navigation controls on image */}
              <div className="absolute top-1/2 left-4 right-4 flex justify-between items-center -translate-y-1/2">
                <button
                  onClick={handlePrevious}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center focus:outline-none hover:bg-white/30 transition"
                  aria-label="Previous feature"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polyline points="15 18 9 12 15 6"></polyline>
                  </svg>
                </button>
                
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center focus:outline-none hover:bg-white/30 transition"
                  aria-label="Next feature"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          
          {/* Right: Thumbnails & Feature List */}
          <div className="space-y-6">
            {/* Feature info for mobile (visible below image on small screens) */}
            <div className="lg:hidden">
              <h3 className={`${textColor} text-xl font-bold mb-2`}>
                {items[activeIndex].title}
              </h3>
              <p className="text-gray-600">
                {items[activeIndex].text}
              </p>
            </div>
            
            {/* Thumbnails grid */}
            <div className="grid grid-cols-3 gap-3">
              {items.map((item, index) => (
                <button
                  key={item.id || index}
                  onClick={() => handleDotClick(index)}
                  className={`relative aspect-video rounded-md overflow-hidden focus:outline-none ${
                    index === activeIndex 
                      ? 'ring-2 ring-offset-2 ' + accentTextColor.replace('text-', 'ring-')
                      : 'opacity-70 hover:opacity-100'
                  }`}
                  aria-label={`View ${item.title}`}
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 33vw, 10vw"
                    className="object-cover"
                  />
                </button>
              ))}
            </div>
            
            {/* Feature List */}
            <div className="mt-8 space-y-4">
              {items.map((item, index) => (
                <button
                  key={`list-${item.id || index}`}
                  onClick={() => handleDotClick(index)}
                  className={`w-full text-left p-4 rounded-lg transition ${
                    index === activeIndex
                      ? `${accentColor.replace('bg-', 'bg-opacity-10 ')} border border-${accentColor.replace('bg-', '')}`
                      : 'hover:bg-gray-100'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`flex-shrink-0 w-4 h-4 rounded-full ${
                      index === activeIndex ? accentColor : 'bg-gray-300'
                    }`}></div>
                    <h4 className={`ml-3 font-medium ${
                      index === activeIndex ? accentTextColor : textColor
                    }`}>
                      {item.title}
                    </h4>
                  </div>
                </button>
              ))}
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between mt-6">
              <button
                onClick={() => setIsPaused(!isPaused)}
                className="text-gray-500 hover:text-gray-700 focus:outline-none flex items-center"
                aria-label={isPaused ? "Resume slideshow" : "Pause slideshow"}
              >
                {isPaused ? (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <polygon points="5 3 19 12 5 21 5 3"></polygon>
                    </svg>
                    <span className="text-sm">Play</span>
                  </>
                ) : (
                  <>
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <rect x="6" y="4" width="4" height="16"></rect>
                      <rect x="14" y="4" width="4" height="16"></rect>
                    </svg>
                    <span className="text-sm">Pause</span>
                  </>
                )}
              </button>
              
              <div className="text-sm text-gray-500">
                {activeIndex + 1} of {items.length}
              </div>
              
              <a className={`${accentTextColor} text-sm font-medium flex items-center hover:underline`} href="#">
                View All Features
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1">
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                  <polyline points="12 5 19 12 12 19"></polyline>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CarFeaturesGallery;