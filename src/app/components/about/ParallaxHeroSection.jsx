import React, { useCallback, useEffect, useRef, useState } from 'react';

const ParallaxHeroSection = () => {
  const [activeSection, setActiveSection] = useState(0);
  const heroRef = useRef(null);
  const requestRef = useRef(null);

  const handleScroll = useCallback(() => {
    requestRef.current = window.requestAnimationFrame(() => {
      if (!heroRef.current) return;

      const scrollPosition = window.pageYOffset;
      const viewportHeight = window.innerHeight;
      const triggerPoint = viewportHeight * 0.3; // Trigger at 30% of viewport height

      // Determine active section based on scroll position
      if (scrollPosition < triggerPoint) {
        setActiveSection(0);
      } else {
        setActiveSection(1);
      }
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

  // Scroll to specific section
  const scrollToSection = (index) => {
    const yOffset = index === 0 ? 0 : window.innerHeight * 0.4;
    window.scrollTo({ top: yOffset, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden" ref={heroRef}>
      {/* First Section with slide-up transition */}
      <div
        className={`
          fixed top-0 left-0 w-full h-full
          transition-all duration-1000 ease-out
          ${activeSection === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-16 pointer-events-none'}
        `}
        style={{
          backgroundImage: "url('/images/about/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <h1 className="text-5xl md:text-7xl font-bold text-white mb-4 transition-all duration-700 delay-100">
            HI, WE ARE CHERY
          </h1>
          <p className="text-lg md:text-xl text-white max-w-3xl transition-all duration-700 delay-200">
            COMMITTED TO BEING A DIVERSIFIED ENTERPRISE WITH GLOBAL INFLUENCE AND COMPETITIVENESS
          </p>
          <div className="mt-8 transition-all duration-700 delay-300">
            <button className="bg-primary hover:bg-primary-focus text-white px-6 py-2 transition-colors duration-300">
              Discover More
            </button>
          </div>
        </div>
      </div>

      {/* Second Section with fade-in and scale transition */}
      <div
        className={`
          fixed top-0 left-0 w-full h-screen
          transition-all duration-1000 ease-out
          ${activeSection === 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-105 pointer-events-none'}
        `}
        style={{
          backgroundImage: "url('/images/about/hero.jpg')",
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4">
          <div className="max-w-4xl mx-auto space-y-6">
            <h2
              className={`
                text-3xl md:text-4xl font-semibold text-white mb-4
                transition-all duration-700 delay-100
                ${activeSection === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              Established in 1997,
            </h2>
            <p
              className={`
                text-xl md:text-2xl text-white
                transition-all duration-700 delay-200
                ${activeSection === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              Chery Group has made significant strides in the automotive industry.
            </p>
            <p
              className={`
                text-lg md:text-xl text-white
                transition-all duration-700 delay-300
                ${activeSection === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              Its subsidiary, Chery Automobile, holds the distinction of being the first Chinese automobile brand to exceed one million domestic sales. Additionally Chery Automobile has been a trailblazer in expanding into international markets.
            </p>
            <div
              className={`
                pt-4
                transition-all duration-700 delay-400
                ${activeSection === 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
              `}
            >
              <button className="border-2 border-primary hover:bg-primary text-white hover:text-white px-6 py-2 transition-all duration-300">
                Our Journey
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section indicators with flat design */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-10">
        <div className="flex flex-col space-y-3">
          {[0, 1].map((index) => (
            <button
              key={index}
              aria-label={`Go to section ${index + 1}`}
              className={`
                w-4 h-4
                transition-all duration-300 ease-in-out
                ${activeSection === index ? 'bg-primary scale-110' : 'bg-white/50 hover:bg-white/70'}
              `}
              onClick={() => scrollToSection(index)}
            />
          ))}
        </div>
      </div>

       {/* Scroll indicator with enhanced animation */}
       <div 
        className={`
          fixed bottom-8 left-1/2 transform -translate-x-1/2 
          transition-all duration-500 ease-in-out
          ${activeSection === 0 
            ? 'opacity-100 translate-y-0' 
            : 'opacity-0 translate-y-4 pointer-events-none'}
          z-10
        `}
      >
        <div className="flex flex-col items-center cursor-pointer" onClick={() => scrollToSection(1)}>
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