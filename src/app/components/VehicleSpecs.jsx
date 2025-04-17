'use client'

import React from 'react';

const VehicleSpecs = ({ 
  title = "Dynamic/Energetic Appearance",
  subtitle = "See style, see grace",
  specs = [
    { name: "Length", value: "4720", unit: "mm" },
    { name: "Width", value: "1860", unit: "mm" },
    { name: "Height", value: "1705", unit: "mm" },
    { name: "Wheelbase", value: "2710", unit: "mm" }
  ],
  category = "Appearance"
}) => {
  return (
    <div className="bg-gray-50 py-8 sm:py-12 md:py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Category label */}
        {category && (
          <div className="mb-3 sm:mb-4">
            <h3 className="text-brown-600 text-base sm:text-lg font-medium">{category}</h3>
          </div>
        )}
        
        {/* Main title and subtitle */}
        <div className="mb-8 sm:mb-10 md:mb-12">
          <h2 className="text-brown-700 text-2xl sm:text-3xl md:text-4xl font-bold mb-1 sm:mb-2">{title}</h2>
          {subtitle && (
            <p className="text-brown-600 text-lg sm:text-xl md:text-2xl font-medium">{subtitle}</p>
          )}
        </div>
        
        {/* Specifications grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 sm:gap-0">
          {specs.map((spec, index) => (
            <div 
              key={index} 
              className={`py-4 sm:py-6 md:py-8 border-t border-gray-200 
                ${index % 2 === 0 ? 'pr-2 sm:pr-4' : 'pl-2 sm:pl-4'} 
                ${index < specs.length - 2 || (index < specs.length - 1 && specs.length % 2 === 0) ? 
                  'sm:border-r sm:border-gray-200' : ''}
                ${index < specs.length - 1 && specs.length <= 2 ? 'sm:border-r sm:border-gray-200' : ''}
                ${index < specs.length - (specs.length % 4 || 4) ? 'md:border-r md:border-gray-200' : ''}`
              }
            >
              <div className="px-0 sm:px-2 md:px-6">
                <h4 className="text-brown-600 text-base sm:text-lg font-medium mb-1 sm:mb-2 md:mb-3">{spec.name}</h4>
                <p className="flex items-baseline">
                  <span className="text-brown-700 text-xl sm:text-2xl md:text-3xl font-bold mr-1 sm:mr-2">{spec.value}</span>
                  {spec.unit && (
                    <span className="text-brown-600 text-sm sm:text-base md:text-lg">{spec.unit}</span>
                  )}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecs;