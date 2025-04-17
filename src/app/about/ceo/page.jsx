import { ArrowRight } from 'lucide-react';
import React from 'react';

const CEOPage = () => {
  return (
    <div className="bg-white min-h-screen">
      {/* Header/Navigation */}

      {/* Breadcrumb - Updated with more subtle styling */}
      <div className="bg-gray-100 py-4">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center text-sm">
            <a href="#home" className="text-gray-500 hover:text-primary-700 transition-colors duration-300">HOME</a>
            <span className="mx-2 text-gray-400">/</span>
            <a href="#about" className="text-gray-500 hover:text-primary-700 transition-colors duration-300">ABOUT CHERY</a>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-primary-700 font-medium">FROM CEO</span>
          </div>
        </div>
      </div>

      {/* CEO Hero Banner - Improved with better gradient and layout */}
      <div className="relative">
        <div className="w-full h-96 md:h-[28rem] bg-gradient-to-r from-primary-900/90 to-primary-800/70 overflow-hidden">
          {/* Background texture overlay */}
          <div className="absolute inset-0 opacity-50 bg-[url('/images/about/ceo-bg.jpg')] bg-cover"></div>
          
          <div className="absolute inset-0 flex items-center">
            <div className="max-w-7xl mx-auto px-4 w-full">
              <div className="flex flex-col md:flex-row items-center md:items-start justify-between">
                <div className="text-white md:w-1/2 mb-8 md:mb-0 text-center md:text-left">
                  <h1 className="text-4xl md:text-5xl font-bold mb-4">Yin Tongyue</h1>
                  <div className="w-12 h-1 bg-primary-light mb-4 mx-auto md:mx-0"></div>
                  <p className="text-xl text-gray-200 mb-2">Chairman</p>
                  <p className="text-gray-300">Chery Automobile Co., Ltd.</p>
                </div>
                <div className="md:w-1/3">
                  {/* CEO Image with premium styling - NO BORDER RADIUS */}
                  <div className="relative w-64 h-80 md:w-72 md:h-96 mx-auto overflow-hidden">
                    <div className="absolute inset-0 bg-primary-light/20 transform -translate-x-4 -translate-y-4"></div>
                    <div className="relative h-full w-full overflow-hidden border-4 border-white shadow-lg">
                      <img 
                        src="/images/about/ceo.jpg"
                        alt="Yin Tongyue" 
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CEO Profile & Message - Improved layout and typography */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Message From The <span className="text-primary-900">Chairman</span>
          </h2>
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Yin Tongyue shares his vision for Chery's future and commitment to innovation in the global market.
          </p>
        </div>

        {/* CEO Message */}
        <div className="relative max-w-4xl mx-auto">
          <div className="text-8xl font-serif text-primary-light absolute -top-16 left-0">"</div>
          <div className="relative z-10 mb-16 px-4 md:px-12">
            <p className="text-gray-700 mb-6 leading-relaxed text-lg">
              Since it was founded, Chery has always taken adhering to technology-driven strategy, creating a vehicle brand with international 
              competitiveness and influence as its corporate vision.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Relying on the constant pursuit of technological innovation, Chery has become the first passenger vehicle enterprise in China to master 
              the core technology of engine, gearbox, chassis, platform and new energy, and also the first one in China to export vehicle, CKD parts, 
              engine and vehicle manufacturing technology and equipment to overseas market.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Chery has always focused on developing domestic and international markets. Chery has continuously deepened its globalization 
              through the implementation of product strategy, localization strategy and talent strategy. After more than 20 years of development, 
              Chery's sales and services network covers more than 100 countries and regions and has won the trust of 15 million consumers 
              worldwide.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              The global vehicle market is ushering in a new era of Electrification, Connection, Intelligence and Sharing, which will lead to major 
              changes once in a century. In 2019, Chery officially released the intelligent brand CHERY LION, marking an overall transformation to 
              intellectualization and it committed to providing an intelligent and interconnected lifestyle of new era for global consumers.
            </p>
            <p className="text-gray-700 mb-6 leading-relaxed">
              Meanwhile, Chery has carried out a variety of social contribution activities concerning green development, environmental protection, 
              social welfare, talent cultivation and other fields in the global market. We hope that our efforts will contribute to the society and make a 
              good impact.
            </p>
            <p className="text-gray-700 mb-12 leading-relaxed">
              Chery will always persist in technology-driven strategy, take the consumer experience as the core, and provide better products and 
              services to consumers around the world through continuous innovation and resources integration.
            </p>
          </div>
          <div className="text-8xl font-serif text-primary-light absolute -bottom-8 right-0">"</div>
        </div>

        {/* CEO Signature */}
        <div className="flex flex-col items-end max-w-4xl mx-auto px-8">
          {/* <div className="w-48 h-16 mb-2">
            <img 
              src="/api/placeholder/192/64" 
              alt="Yin Tongyue Signature" 
              className="w-full h-full object-contain"
            />
          </div> */}
          <p className="text-xl font-bold text-gray-900">Yin Tongyue</p>
          <p className="text-gray-600">Chairman, Chery Automobile Co., Ltd.</p>
        </div>
      </div>
      
      {/* Call to Action */}
      <div className="bg-gray-100 py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-8">Discover the Chery Difference</h3>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <a
              href="#explore-models"
              className="group inline-flex items-center px-8 py-4 bg-primary-700 text-white font-medium hover:bg-primary-900 transition-colors duration-300 shadow-md"
            >
              Explore Our Models
              <ArrowRight
                size={20}
                className="ml-2 group-hover:ml-3 transition-all duration-300"
              />
            </a>
            <a
              href="#about-company"
              className="inline-flex items-center justify-center bg-transparent border border-primary-700 text-primary-700 hover:text-primary-900 hover:border-primary-900 transition-all duration-300 px-8 py-4 font-medium"
            >
              About Our Company
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CEOPage;