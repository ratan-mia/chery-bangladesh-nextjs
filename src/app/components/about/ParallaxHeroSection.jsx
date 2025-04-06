import React, { useCallback, useEffect, useRef, useState } from 'react';

const ParallaxHeroSection = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const requestRef = useRef(null);
  
  // Throttled scroll handler using requestAnimationFrame for better performance
  const handleScroll = useCallback(() => {
    requestRef.current = window.requestAnimationFrame(() => {
      const position = window.pageYOffset;
      setScrollPosition(position);
      
      // Change visibility based on scroll position
      setIsVisible(position > 100);
    });
  }, []);

  useEffect(() => {
    // Initial check
    handleScroll();
    
    // Add event listener with passive option for performance
    window.addEventListener('scroll', handleScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (requestRef.current) {
        window.cancelAnimationFrame(requestRef.current);
      }
    };
  }, [handleScroll]);

  // Calculate parallax effect for different elements
  const getParallaxStyle = (factor = 0.3) => {
    return {
      transform: `translateY(${scrollPosition * factor}px)`
    };
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* First Section */}
      <div 
        className={`
          fixed top-0 left-0 w-full h-screen 
          transition-all duration-1000 ease-in-out
          ${isVisible ? 'opacity-0' : 'opacity-100'}
        `}
        style={{
          backgroundImage: "url('/images/about/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: isVisible ? 'none' : 'auto',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div 
          className="relative h-full flex flex-col items-center justify-center text-center px-4"
          style={getParallaxStyle(0.2)}
        >
          <h1 className="text-5xl md:text-7xl font-bold text-primary-content mb-4">
            HI, WE ARE CHERY
          </h1>
          <p className="text-lg md:text-xl text-primary-content max-w-3xl">
            COMMITTED TO BEING A DIVERSIFIED ENTERPRISE WITH GLOBAL INFLUENCE AND COMPETITIVENESS
          </p>
          <div className="mt-8">
            <button className="bg-primary hover:bg-primary-focus text-primary-content px-6 py-2 rounded-md transition-colors duration-300">
              Discover More
            </button>
          </div>
        </div>
      </div>

      {/* Second Section */}
      <div 
        className={`
          fixed top-0 left-0 w-full h-screen 
          transition-all duration-1000 ease-in-out
          ${isVisible ? 'opacity-100' : 'opacity-0'}
        `}
        style={{
          backgroundImage: "url('/images/about/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          pointerEvents: isVisible ? 'auto' : 'none',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div 
          className="relative h-full flex flex-col items-center justify-center text-center px-4"
          style={getParallaxStyle(0.3)}
        >
          <div className="max-w-4xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-semibold text-secondary-content mb-4">
              Established in 1997,
            </h2>
            <p className="text-xl md:text-2xl text-secondary-content">
              Chery Group has made significant strides in the automotive industry.
            </p>
            <p className="text-lg md:text-xl text-secondary-content">
              Its subsidiary, Chery Automobile, holds the distinction of being the first Chinese automobile brand to exceed one million domestic sales. Additionally Chery Automobile has been a trailblazer in expanding into international markets.
            </p>
            <div className="pt-4">
              <button className="border-2 border-primary hover:bg-primary text-secondary-content hover:text-primary-content px-6 py-2 rounded-md transition-all duration-300">
                Our Journey
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section indicators */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-10">
        <div className="flex flex-col space-y-3">
          <button
            aria-label="Go to first section"
            className={`w-3 h-3 rounded-full transition-all duration-300 ${isVisible ? 'bg-white/50' : 'bg-primary scale-125'}`}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          />
          <button
            aria-label="Go to second section"
            className={`w-3 h-3 rounded-full transition-all duration-300 ${isVisible ? 'bg-primary scale-125' : 'bg-white/50'}`}
            onClick={() => window.scrollTo({ top: 150, behavior: 'smooth' })}
          />
        </div>
      </div>

      {/* Scroll indicator (only visible on first section) */}
      <div 
        className={`fixed bottom-8 left-1/2 transform -translate-x-1/2 transition-opacity duration-500 z-10 ${isVisible ? 'opacity-0' : 'opacity-100'}`}
      >
        <div className="flex flex-col items-center">
          <p className="text-white text-sm mb-2">Scroll down</p>
          <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center items-start">
            <div className="w-1.5 h-3 rounded-full mt-1.5 bg-primary animate-bounce" />
          </div>
        </div>
      </div>

      {/* Spacer div to enable scrolling */}
      <div style={{ height: '200vh' }} aria-hidden="true" />
    </div>
  );
};

export default ParallaxHeroSection;