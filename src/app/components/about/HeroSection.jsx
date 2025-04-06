import React from 'react';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen w-full overflow-hidden flex flex-col items-center justify-center bg-cover bg-center" style={{ backgroundImage: "url('/images/about/hero.jpg')" }}>
      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 text-center px-4 py-12 md:py-24 max-w-5xl">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          HI, WE ARE CHERY
        </h1>
        <p className="text-lg md:text-xl lg:text-2xl text-gray-300 mb-12">
          COMMITTED TO BEING A DIVERSIFIED ENTERPRISE WITH GLOBAL INFLUENCE AND COMPETITIVENESS
        </p>
        <div className="mb-12">
          <button className="bg-primary hover:bg-primary-focus text-white px-8 py-3 rounded-full transition-colors duration-300 shadow-md">
            Discover More
          </button>
        </div>
        <div className="space-y-8">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-4">
            Established in 1997,
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
            Chery Group has made significant strides in the automotive industry.
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-gray-300">
            Its subsidiary, Chery Automobile, holds the distinction of being the first Chinese automobile brand to exceed one million domestic sales. Additionally, Chery Automobile has been a trailblazer in expanding into international markets.
          </p>
          <div className="pt-4">
            <button className="border-2 border-primary hover:bg-primary text-white hover:text-white px-8 py-3 rounded-full transition-all duration-300 shadow-md">
              Our Journey
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;