'use client'

import React, { useEffect, useRef, useState } from 'react';

const CountUp = ({ end, duration = 2000, decimals = 0, unit }) => {
  const [count, setCount] = useState(0);
  const countRef = useRef(null);
  const observer = useRef(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    observer.current = new IntersectionObserver((entries) => {
      const [entry] = entries;
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        
        const endValue = parseFloat(end);
        const startTime = performance.now();
        
        const updateCount = (currentTime) => {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          
          // Easing function for smoother animation
          const easeOutQuad = progress => progress * (2 - progress);
          const easedProgress = easeOutQuad(progress);
          
          const currentCount = Math.min(easedProgress * endValue, endValue);
          setCount(currentCount);
          
          if (progress < 1) {
            requestAnimationFrame(updateCount);
          }
        };
        
        requestAnimationFrame(updateCount);
      }
    }, { threshold: 0.1 });
    
    if (countRef.current) {
      observer.current.observe(countRef.current);
    }
    
    return () => {
      if (observer.current && countRef.current) {
        observer.current.unobserve(countRef.current);
      }
    };
  }, [end, duration, decimals]);
  
  const displayValue = decimals > 0 
    ? count.toFixed(decimals) 
    : Math.floor(count).toString();
    
  return (
    <p className="flex items-baseline" ref={countRef}>
      <span className="text-brown-700 text-xl sm:text-2xl md:text-3xl font-bold mr-1 sm:mr-2">
        {displayValue}
      </span>
      {unit && (
        <span className="text-brown-600 text-sm sm:text-base md:text-lg">{unit}</span>
      )}
    </p>
  );
};

const StaticValue = ({ value, unit }) => {
  return (
    <p className="flex items-baseline">
      <span className="text-brown-700 text-xl sm:text-2xl md:text-3xl font-bold mr-1 sm:mr-2">
        {value}
      </span>
      {unit && (
        <span className="text-brown-600 text-sm sm:text-base md:text-lg">{unit}</span>
      )}
    </p>
  );
};

const VehicleSpecs = ({ 
  title = "Dynamic/Energetic Appearance",
  subtitle = "See style, see grace",
  specs = [
    { name: "Length", value: "4720", unit: "mm" },
    { name: "Width", value: "1860", unit: "mm" },
    { name: "Height", value: "1705", unit: "mm" },
    { name: "Wheelbase", value: "2710", unit: "mm" }
  ],
  category = "Appearance",
  animationDuration = 2000
}) => {
  // Function to check if a value is numeric
  const isNumeric = (value) => {
    return !isNaN(parseFloat(value)) && isFinite(value.toString().replace(/,/g, ''));
  };

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
                {isNumeric(spec.value) ? (
                  <CountUp 
                    end={spec.value.toString().replace(/,/g, '')} 
                    duration={animationDuration} 
                    unit={spec.unit} 
                    decimals={spec.value.toString().includes('.') ? spec.value.toString().split('.')[1].length : 0}
                  />
                ) : (
                  <StaticValue value={spec.value} unit={spec.unit} />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default VehicleSpecs;