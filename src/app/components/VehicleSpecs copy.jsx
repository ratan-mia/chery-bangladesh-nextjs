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
    <div className="bg-gray-50 py-16 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Category label */}
        {category && (
          <div className="mb-4">
            <h3 className="text-brown-600 text-lg font-medium">{category}</h3>
          </div>
        )}
        
        {/* Main title and subtitle */}
        <div className="mb-12">
          <h2 className="text-brown-700 text-4xl font-bold mb-2">{title}</h2>
          {subtitle && (
            <p className="text-brown-600 text-2xl font-medium">{subtitle}</p>
          )}
        </div>
        
        {/* Specifications grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-gray-200">
          {specs.map((spec, index) => (
            <div 
              key={index} 
              className={`py-8 ${index < specs.length - 1 ? 'border-r border-gray-200' : ''}`}
            >
              <div className="px-6">
                <h4 className="text-brown-600 text-lg font-medium mb-3">{spec.name}</h4>
                <p className="flex items-baseline">
                  <span className="text-brown-700 text-3xl font-bold mr-2">{spec.value}</span>
                  {spec.unit && (
                    <span className="text-brown-600 text-lg">{spec.unit}</span>
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