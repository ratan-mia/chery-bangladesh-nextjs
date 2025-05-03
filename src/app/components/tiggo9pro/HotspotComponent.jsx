'use client';

import { Plus, X } from 'lucide-react';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

// Chery-specific hotspot data with full content from the original component
const cheryHotspots = [
  {
    position: { top: '25%', left: '15%' },
    title: 'Matrix LED Headlights',
    subtitle: 'INTELLIGENT LIGHTING',
    description: 'Advanced Matrix LED technology provides exceptional illumination while automatically adjusting beam patterns to avoid dazzling other drivers.',
    features: [
      {
        title: 'Adaptive Beam Control',
        description: 'Individual LED control for precise light distribution'
      },
      {
        title: 'Dynamic Cornering',
        description: 'Follows steering input for enhanced visibility in turns'
      },
      {
        title: 'Weather Adaptation',
        description: 'Automatically adjusts for fog, rain, and snow conditions'
      }
    ],
    specifications: [
      { label: 'Light Output', value: '2,500 lumens' },
      { label: 'LED Count', value: '84 individual LEDs' },
      { label: 'Response Time', value: '< 1 millisecond' }
    ],
    detailImageSrc: '/images/headlights-detail.jpg',
    detailImageAlt: 'Matrix LED Headlights'
  },
  {
    position: { top: '35%', left: '60%' },
    title: 'Retractable panoramic sunroof with electric sunshade',
    subtitle: 'LUXURIOUS DESIGN',
    description: 'Experience the freedom of open-air driving with our expansive panoramic sunroof featuring electric operation and automatic sunshade.',
    features: [
      {
        title: 'One-Touch Operation',
        description: 'Effortless control with anti-pinch safety technology'
      },
      {
        title: 'Solar Protection',
        description: 'UV-filtering glass blocks 99% of harmful rays'
      },
      {
        title: 'Rain Sensing',
        description: 'Automatically closes when precipitation is detected'
      }
    ],
    specifications: [
      { label: 'Opening Size', value: '1.2m x 0.8m' },
      { label: 'Glass Type', value: 'Laminated safety glass' },
      { label: 'UV Protection', value: '99.9%' }
    ],
    detailImageSrc: '/images/sunroof-detail.jpg',
    detailImageAlt: 'Panoramic sunroof'
  },
  {
    position: { top: '55%', left: '75%' },
    title: 'LED Tail Lights',
    subtitle: 'DISTINCTIVE SIGNATURE',
    description: 'Full-width LED light bar creates a striking visual signature while providing superior visibility and safety in all conditions.',
    features: [
      {
        title: 'Sequential Indicators',
        description: 'Dynamic turn signals for clear communication'
      },
      {
        title: 'Adaptive Brightness',
        description: 'Automatically adjusts based on ambient light'
      },
      {
        title: '3D Light Design',
        description: 'Multi-dimensional light elements for depth'
      }
    ],
    specifications: [
      { label: 'LED Type', value: 'High-intensity OLED' },
      { label: 'Lifespan', value: '50,000 hours' },
      { label: 'Response Time', value: '0.2 seconds' }
    ],
    detailImageSrc: '/images/taillights-detail.jpg',
    detailImageAlt: 'LED tail lights'
  },
  {
    position: { top: '50%', left: '90%' },
    title: 'Side Mirror Tech',
    subtitle: 'SMART VISIBILITY',
    description: 'Intelligent side mirrors with integrated technology ensure safe driving with blind spot monitoring, auto-dimming, and camera integration.',
    features: [
      {
        title: 'Blind Spot Alert',
        description: 'Visual and audible warnings for hidden vehicles'
      },
      {
        title: 'Auto-Folding',
        description: 'Automatically folds when parked for protection'
      },
      {
        title: '360° Camera',
        description: 'Integrated cameras for surround view system'
      }
    ],
    specifications: [
      { label: 'Mirror Type', value: 'Electrochromic' },
      { label: 'Camera Resolution', value: '1080p HD' },
      { label: 'Field of View', value: '180°' }
    ],
    detailImageSrc: '/images/mirrors-detail.jpg',
    detailImageAlt: 'Side mirror technology'
  }
];

const HotspotComponent = ({
  imageSrc = '/images/tiggo9pro/hotspot.jpg',
  imageAlt = 'Chery Tiggo9 Vehicle',
  hotspots = cheryHotspots,
  className = '',
  onHotspotClick = () => {},
  onHotspotClose = () => {},
}) => {
  const [activeHotspot, setActiveHotspot] = useState(null);
  const [isAnimating, setIsAnimating] = useState(false);
  const [contentReady, setContentReady] = useState(false);

  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape' && activeHotspot) {
        closeHotspot();
      }
    };

    if (activeHotspot) {
      document.addEventListener('keydown', handleEscapeKey);
      // Delay content animation for smooth transition
      setTimeout(() => setContentReady(true), 100);
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      setContentReady(false);
    };
  }, [activeHotspot]);

  const openHotspot = (hotspot) => {
    setActiveHotspot(hotspot);
    setIsAnimating(true);
    onHotspotClick(hotspot);
  };

  const closeHotspot = () => {
    setIsAnimating(false);
    setContentReady(false);
    setTimeout(() => {
      setActiveHotspot(null);
      onHotspotClose();
    }, 500);
  };

  // Design match shows single column layout (Image 2)
  const showSingleColumn = activeHotspot && !activeHotspot.features;

  return (
    <div className={`relative w-full h-screen bg-gray-100 overflow-hidden ${className}`}>
      {/* Header text - shown when no hotspot is active */}
      {!activeHotspot && (
        <div className={`absolute top-16 left-16 z-10 max-w-2xl transition-all duration-500 ${
          activeHotspot ? 'opacity-0 -translate-x-8' : 'opacity-100 translate-x-0'
        }`}>
          <p className="text-sm font-medium mb-4 text-gray-600 tracking-wider">LUXURIOUS DESIGN</p>
          <h1 className="text-5xl font-bold mb-6 text-gray-800 leading-tight">
            DECENT APPEARANCE<br />
            DESIGN
          </h1>
          <h2 className="text-2xl mb-6 text-gray-700">Family style design languages of new series</h2>
          <p className="text-gray-600 leading-relaxed text-lg max-w-xl">
            THE HOWL OF TIGER BRINGS IMPOSING APPEARANCE. THE APPEARANCE
            IMITATES THE OUTLINE OF A ROARING TIGER, WHICH APPEARS THE
            POWER. A POWERFUL AND DISTINCTIVE VEHICLE.
          </p>
        </div>
      )}

      {/* Main layout container */}
      <div className="flex h-full w-full">
        {/* Vehicle image panel - keeps full width when hotspot is active */}
        <div 
          className={`relative transition-all duration-700 ease-in-out ${
            activeHotspot ? 'w-1/2' : 'w-full'
          }`}
        >
          <div className="relative h-full w-full">
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              className="object-cover object-center"
              priority
            />
            
            {/* Hotspot Triggers - Always visible */}
            {hotspots.map((hotspot, index) => (
              <button
                key={index}
                onClick={() => !activeHotspot && openHotspot(hotspot)}
                className={`absolute group transition-all duration-300 ${
                  activeHotspot ? 'cursor-default opacity-50' : 'cursor-pointer opacity-100'
                }`}
                style={{ 
                  top: hotspot.position.top, 
                  left: hotspot.position.left,
                }}
                aria-label={`View ${hotspot.title} details`}
                disabled={!!activeHotspot}
              >
                <div className="relative">
                  {/* Ripple effects */}
                  {!activeHotspot && (
                    <>
                      <div className="absolute inset-0 w-12 h-12 -m-1 rounded-full border-2 border-white/30 animate-ping" />
                      <div className="absolute inset-0 w-10 h-10 rounded-full border border-white/40 animate-pulse" />
                    </>
                  )}
                  {/* Main button */}
                  <div className={`relative w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center
                               shadow-lg transition-all duration-300 ${
                                !activeHotspot ? 'hover:bg-white hover:scale-110' : ''
                               }`}>
                    <Plus size={20} className="text-gray-800" />
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Brand text */}
          <div className={`absolute bottom-16 right-16 transition-all duration-500 ${
            activeHotspot ? 'opacity-0' : 'opacity-100'
          }`}>
            <p className="text-3xl font-bold text-gray-800">CHERY</p>
          </div>
        </div>

        {/* Detail panel - slides in from right */}
        {activeHotspot && (
          <div 
            className={`flex-1 bg-gray-100 transition-all duration-700 ease-in-out ${
              isAnimating ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
            }`}
          >
            <div className="h-full flex flex-col relative">
              {/* Close button */}
              <button 
                onClick={closeHotspot}
                className="absolute right-8 top-8 p-3 rounded-full hover:bg-gray-200 transition-all duration-200 z-10"
                aria-label="Close panel"
              >
                <X size={24} className="text-gray-800" />
              </button>

              {/* Content area - enhanced layout */}
              {showSingleColumn ? (
                // Single column layout (like Image 2) - with larger image
                <div className="flex-1 p-16 flex flex-col justify-between h-full">
                  {/* Text content */}
                  <div className={`transition-all duration-700 delay-200 ${
                    contentReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    <p className="text-sm font-medium mb-6 text-gray-600 tracking-wider">{activeHotspot.subtitle}</p>
                    <h2 className="text-4xl font-bold mb-4 text-gray-800 max-w-lg leading-tight">
                      {activeHotspot.title}
                    </h2>
                  </div>

                  {/* Detail image - enlarged */}
                  <div className={`w-full transition-all duration-700 delay-300 ${
                    contentReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}>
                    <div className="relative w-full h-96">
                      <Image
                        src={activeHotspot.detailImageSrc || '/images/sunroof-detail.jpg'}
                        alt={activeHotspot.detailImageAlt || 'Feature detail'}
                        fill
                        className="object-cover rounded-xl shadow-2xl"
                      />
                    </div>
                  </div>
                </div>
              ) : (
                // Two column layout with features and specifications - with larger image
                <div className="flex-1 p-16 flex">
                  <div className="flex-1 pr-8">
                    {/* Text content */}
                    <div className={`transition-all duration-700 delay-200 ${
                      contentReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                      <p className="text-sm font-medium mb-6 text-gray-600 tracking-wider">{activeHotspot.subtitle}</p>
                      <h2 className="text-4xl font-bold mb-6 text-gray-800">
                        {activeHotspot.title}
                      </h2>
                      <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                        {activeHotspot.description}
                      </p>
                    </div>

                    {/* Features */}
                    {activeHotspot.features && (
                      <div className={`transition-all duration-700 delay-300 ${
                        contentReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}>
                        <h3 className="text-xl font-semibold mb-6 text-gray-800">Features</h3>
                        <ul className="space-y-6">
                          {activeHotspot.features.map((feature, index) => (
                            <li key={index} className="flex items-start">
                              <span className="w-2 h-2 bg-blue-600 rounded-full mt-2 mr-4"></span>
                              <div>
                                <h4 className="font-medium text-gray-800 text-lg">{feature.title}</h4>
                                <p className="text-gray-600">{feature.description}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>

                  {/* Right column - Image and specifications - enhanced */}
                  <div className="w-1/2 pl-8">
                    {/* Detail image - enlarged */}
                    <div className={`transition-all duration-700 delay-300 ${
                      contentReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                    }`}>
                      <div className="relative w-full h-96 mb-8">
                        <Image
                          src={activeHotspot.detailImageSrc || '/images/sunroof-detail.jpg'}
                          alt={activeHotspot.detailImageAlt || 'Feature detail'}
                          fill
                          className="object-cover rounded-xl shadow-2xl"
                        />
                      </div>
                    </div>

                    {/* Specifications */}
                    {activeHotspot.specifications && (
                      <div className={`transition-all duration-700 delay-400 ${
                        contentReady ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                      }`}>
                        <h3 className="text-xl font-semibold mb-6 text-gray-800">Specifications</h3>
                        <div className="space-y-4">
                          {activeHotspot.specifications.map((spec, index) => (
                            <div key={index} className="flex justify-between border-b border-gray-200 pb-3">
                              <span className="text-gray-600 text-lg">{spec.label}</span>
                              <span className="font-medium text-gray-800 text-lg">{spec.value}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default HotspotComponent;