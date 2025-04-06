import React, { useState } from 'react';

const HeroSection = () => {
  const [activeSection, setActiveSection] = useState(0);

  // Toggle between sections
  const toggleSection = () => {
    setActiveSection(activeSection === 0 ? 1 : 0);
  };

  return (
    <div className="relative min-h-screen w-full overflow-hidden">
      {/* First Section with fade transition */}
      <div
        className={`
          absolute top-0 left-0 w-full h-screen
          transition-all duration-1000 ease-out
          ${activeSection === 0 ? 'opacity-100 z-10' : 'opacity-0 z-0'}
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
            <button 
              onClick={toggleSection}
              className="bg-primary hover:bg-primary-focus text-white px-6 py-2 rounded-md transition-colors duration-300"
            >
              Discover More
            </button>
          </div>
        </div>
      </div>

      {/* Second Section with fade transition */}
      <div
        className={`
          absolute top-0 left-0 w-full h-screen
          transition-all duration-1000 ease-out
          ${activeSection === 1 ? 'opacity-100 z-10' : 'opacity-0 z-0'}
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
            <h2 className="text-3xl md:text-4xl font-semibold text-white mb-4 transition-all duration-700">
              Established in 1997,
            </h2>
            <p className="text-xl md:text-2xl text-white transition-all duration-700">
              Chery Group has made significant strides in the automotive industry.
            </p>
            <p className="text-lg md:text-xl text-white transition-all duration-700">
              Its subsidiary, Chery Automobile, holds the distinction of being the first Chinese automobile brand to exceed one million domestic sales. Additionally Chery Automobile has been a trailblazer in expanding into international markets.
            </p>
            <div className="pt-4 transition-all duration-700">
              <button 
                onClick={toggleSection}
                className="border-2 border-primary hover:bg-primary text-white hover:text-white px-6 py-2 rounded-md transition-all duration-300"
              >
                Back to Home
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section indicators */}
      <div className="fixed right-6 top-1/2 transform -translate-y-1/2 z-20">
        <div className="flex flex-col space-y-3">
          {[0, 1].map((index) => (
            <button
              key={index}
              aria-label={`Go to section ${index + 1}`}
              className={`
                w-3 h-3 rounded-full
                transition-all duration-300 ease-in-out
                ${activeSection === index ? 'bg-primary scale-125' : 'bg-white/50 hover:bg-white/70'}
              `}
              onClick={() => setActiveSection(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;