'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Car series and models data configuration
const CAR_DATA = {
  // You can easily add/remove entire series here
  series: [
    {
      id: 'tiggo',
      name: 'Tiggo',
      // Default model to show when the series is selected
      defaultModel: 'tiggo9pro',
      // Series categories
      categories: [
        {
          id: 'tiggo9pro',
          name: 'TIGGO 9 PRO',
          models: [],
          defaultExpanded: false
        },
        {
          id: 'tiggo8pro',
          name: 'TIGGO 8 PRO',
          models: [],
          defaultExpanded: false
        },
        {
          id: 'tiggocross',
          name: 'TIGGO CROSS',
          models: [],
          defaultExpanded: false
        },
      ]
    },
    // To add Arrizo back, just uncomment this section
    /*
    {
      id: 'arrizo',
      name: 'Arrizo',
      defaultModel: 'arrizo8',
      categories: [
        { id: 'arrizo8', name: 'ARRIZO 8', models: [] },
        { id: 'arrizo7', name: 'ARRIZO 7', models: [] },
        { id: 'arrizo5', name: 'ARRIZO 5', models: [] }
      ]
    }
    */
  ],
  // Car specifications data
  specs: {
    'tiggo9pro': { engine: '1.5TGDI+3DHT', length: '4810', wheelbase: '2800', power: '455', torque: '920' },
    'tiggo8': { engine: '1.8', length: '4700', wheelbase: '2710', power: '187', torque: '300' },
    'tiggo8pro': { engine: '1.6', length: '4722', wheelbase: '2710', power: '195', torque: '290' },
    'tiggo7': { engine: '1.5', length: '4500', wheelbase: '2670', power: '156', torque: '230' },
    'tiggocross': { engine: '1.5', length: '4318', wheelbase: '2610', power: '145', torque: '210' },
    'tiggo2pro': { engine: '1.5', length: '4200', wheelbase: '2555', power: '126', torque: '180' },
    'arrizo8': { engine: '1.6', length: '4780', wheelbase: '2780', power: '197', torque: '290' },
    'arrizo7': { engine: '1.5', length: '4650', wheelbase: '2700', power: '156', torque: '230' },
    'arrizo5': { engine: '1.5', length: '4530', wheelbase: '2610', power: '147', torque: '210' }
  },
  // Car image paths
  imagePaths: {
    'tiggo9pro': '/images/cars/tiggo9pro.png',
    'tiggo8': '/images/cars/tiggo8.png',
    'tiggo8pro': '/images/cars/tiggo8pro.webp',
    'tiggo7': '/images/cars/tiggo7.png',
    'tiggocross': '/images/cars/tiggocross2025.png',
    'tiggo2pro': '/images/cars/tiggo2pro.png',
    'arrizo8': '/images/cars/arrizo8.png',
    'arrizo7': '/images/cars/arrizo7.png',
    'arrizo5': '/images/cars/arrizo5.png'
  }
}

// Component for animating number counting
const AnimatedCounter = ({ value, suffix, duration = 1000 }) => {
  const [displayValue, setDisplayValue] = useState(0);
  const counterRef = useRef(null);
  const initialValue = useRef(0);
  
  // Check if value is a string or contains non-numeric characters
  const isString = isNaN(parseFloat(value)) || typeof value === 'string' && !/^\d*\.?\d+$/.test(value.trim());
  const targetValue = isString ? value : parseFloat(value);

  useEffect(() => {
    // If it's a string, just set the display value directly
    if (isString) {
      setDisplayValue(value);
      return;
    }

    let startTime;
    let frameId;

    const animateValue = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);

      // Easing function for smooth animation
      const easedProgress = 1 - Math.pow(1 - progress, 3); // Cubic ease-out

      const currentValue = Math.floor(initialValue.current + (targetValue - initialValue.current) * easedProgress);
      setDisplayValue(currentValue);

      if (progress < 1) {
        frameId = requestAnimationFrame(animateValue);
      } else {
        setDisplayValue(targetValue);
      }
    };

    // Start the animation for numeric values
    initialValue.current = typeof displayValue === 'number' ? displayValue : 0;
    frameId = requestAnimationFrame(animateValue);

    return () => {
      if (frameId) {
        cancelAnimationFrame(frameId);
      }
    };
  }, [targetValue, duration, isString, value]);

  return (
    <div className="text-4xl font-bold flex items-baseline mt-2 text-neutral-800">
      {displayValue}<span className="text-sm ml-1">{suffix}</span>
    </div>
  );
};

export default function ModelsMegaMenu({
  id,
  isOpen,
  onClose,
  // Color settings with sensible defaults
  primaryBg = '#b29980',
  primaryText = 'black',
  primaryHover = '#a38a73',
  // You can pass a custom dataset if needed
  customData = null
}) {
  // Use either custom data passed as prop or default data
  const data = customData || CAR_DATA;

  // Initialize state with first series and its default model
  const initialSeries = data.series[0];

  const [activeCategory, setActiveCategory] = useState(initialSeries?.id || '');
  const [activeModel, setActiveModel] = useState(initialSeries?.defaultModel || '');

  // Initialize expanded series state based on defaultExpanded flags
  const initialExpandedState = {};
  data.series.forEach(series => {
    series.categories.forEach(category => {
      if (category.defaultExpanded) {
        initialExpandedState[category.id] = true;
      }
    });
  });

  const [expandedSeries, setExpandedSeries] = useState(initialExpandedState);
  const [hoveredModel, setHoveredModel] = useState(null);
  const [isSpecVisible, setIsSpecVisible] = useState(false);

  const menuRef = useRef(null);
  const timeoutRef = useRef(null);

  // Reset active model when switching categories
  useEffect(() => {
    const activeSeries = data.series.find(series => series.id === activeCategory);
    if (activeSeries) {
      setActiveModel(activeSeries.defaultModel);
    }
  }, [activeCategory, data.series]);

  // Trigger spec animation when model changes
  useEffect(() => {
    setIsSpecVisible(false);
    const timer = setTimeout(() => {
      setIsSpecVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, [activeModel]);

  // Close menu on ESC key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscKey);
    return () => window.removeEventListener('keydown', handleEscKey);
  }, [isOpen, onClose]);

  // Handle clicks outside menu to close it
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target) && isOpen) {
        onClose();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen, onClose]);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  // Handle clicks inside menu to prevent propagation to document
  const handleMenuClick = (e) => {
    e.stopPropagation();
  };

  const handleCategoryClick = (category) => {
    setActiveCategory(category);

    // Find and set default model for selected category
    const selectedSeries = data.series.find(series => series.id === category);
    if (selectedSeries) {
      setActiveModel(selectedSeries.defaultModel);
    }
  };

  const handleCategoryHover = (category) => {
    // Only respond to hover on desktop
    if (window.innerWidth >= 768) {
      setActiveCategory(category);

      // Find and set default model for hovered category
      const selectedSeries = data.series.find(series => series.id === category);
      if (selectedSeries) {
        setActiveModel(selectedSeries.defaultModel);
      }
    }
  };

  const toggleSeries = (series) => {
    setExpandedSeries(prev => ({
      ...prev,
      [series]: !prev[series]
    }));
  };

  const handleSeriesHover = (series) => {
    // Only respond to hover on desktop
    if (window.innerWidth >= 768) {
      // Use timeout to prevent flickering when moving between items
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setExpandedSeries(prev => ({
          ...prev,
          [series]: true
        }));
      }, 200);
    }
  };

  const handleModelClick = (model, shouldNavigate = false) => {
    setActiveModel(model);

    // If shouldNavigate is true, navigate to the model page instead of closing the menu
    if (!shouldNavigate) {
      // Close the menu after selecting a model
      onClose();
    }
  };

  const handleModelHover = (model) => {
    // Only respond to hover on desktop
    if (window.innerWidth >= 768) {
      setHoveredModel(model);

      // Use timeout to prevent flickering when moving between items
      if (timeoutRef.current) clearTimeout(timeoutRef.current);

      timeoutRef.current = setTimeout(() => {
        setActiveModel(model);
        setHoveredModel(null);
      }, 200);
    }
  };

  // Get car specs based on model
  const getModelSpecs = (model) => {
    return data.specs[model] || data.specs[data.series[0]?.defaultModel];
  };

  // Get car image path based on model
  const getCarImagePath = (model) => {
    return data.imagePaths[model] || '/images/cars/placeholder.png';
  };

  // Get series display data for the active category
  const getSeriesData = () => {
    const activeSeries = data.series.find(series => series.id === activeCategory);
    return activeSeries ? activeSeries.categories : [];
  };

  // Format model name for display
  const formatModelName = (model) => {
    if (!model) return '';
    return model.replace(/([a-z])([0-9])/i, '$1 $2').toUpperCase();
  };

  // Get all visible specs
  const specs = getModelSpecs(activeModel);
  const carImagePath = getCarImagePath(activeModel);

  if (!isOpen) return null;

  // Styling
  const sidebarGradient = '#a8a098';
  const secondaryColor = '#1E5945'; // Darker green

  return (
    <div
      id={id}
      ref={menuRef}
      className="fixed top-16 md:top-20 left-0 w-full z-40 hidden md:block shadow-lg max-h-[90vh] overflow-auto"
      style={{ backgroundColor: '#ffffff' }}
      aria-modal="true"
      role="dialog"
      aria-label="Models navigation"
      onClick={handleMenuClick}
    >
      <div className="flex">
        {/* Left sidebar - Categories */}
        <div className="w-80 text-black flex flex-col" style={{ background: sidebarGradient }}>
          <div className="p-8">
            <h2 className="text-4xl font-light tracking-wide uppercase">
              {activeCategory}
            </h2>
          </div>

          <div className="flex">
            {/* Main categories */}
            <div className="w-full">
              {data.series.map(series => (
                <div
                  key={series.id}
                  className={`px-8 py-4 cursor-pointer transition-colors ${activeCategory === series.id ? 'bg-black/10' : 'hover:bg-black/5'}`}
                  onClick={() => handleCategoryClick(series.id)}
                  onMouseEnter={() => handleCategoryHover(series.id)}
                  role="tab"
                  aria-selected={activeCategory === series.id}
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick(series.id)}
                >
                  <h3 className="text-2xl font-light tracking-wide uppercase">{series.name}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Middle section - Series and Models */}
        <div className="w-72 overflow-y-auto bg-[#aaa49e]">
          {getSeriesData().map((series) => (
            <div key={series.id} className="border-b border-gray-300">
              <div
                className={`p-4 flex justify-between items-center cursor-pointer transition-colors ${activeModel === series.id ||
                  (series.models.length > 0 && series.models.includes(activeModel))
                  ? '' : 'text-gray-800 hover:bg-gray-200'
                  }`}
                style={
                  activeModel === series.id ||
                    (series.models.length > 0 && series.models.includes(activeModel))
                    ? { backgroundColor: primaryBg, color: primaryText }
                    : {}
                }
                onClick={() => {
                  if (series.models.length > 0) {
                    toggleSeries(series.id);
                  } else {
                    handleModelClick(series.id);
                  }
                }}
                onMouseEnter={() => {
                  if (series.models.length > 0) {
                    handleSeriesHover(series.id);
                  } else {
                    handleModelHover(series.id);
                  }
                }}
                role={series.models.length > 0 ? "button" : "link"}
                aria-expanded={series.models.length > 0 ? expandedSeries[series.id] : undefined}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (series.models.length > 0) {
                      toggleSeries(series.id);
                    } else {
                      handleModelClick(series.id);
                    }
                  }
                }}
              >
                {/* <span className="font-medium">{series.name}</span> */}
                <Link href={`/models/${activeModel}`}>
                  <span className="font-medium">{series.name}</span>
                </Link>

                {series.models.length > 0 && (
                  <span className="text-xl mr-2">
                    {expandedSeries[series.id] ? '−' : '+'}
                  </span>
                )}
              </div>

              {/* Submenu for series with multiple models */}
              {expandedSeries[series.id] && series.models.length > 0 && (
                <div style={{ backgroundColor: primaryBg }}>
                  {series.models.map((model) => (
                    <div
                      key={model}
                      className="p-4 pl-10 cursor-pointer transition-colors"
                      style={{
                        backgroundColor: (activeModel === model || hoveredModel === model) ? primaryHover : primaryBg,
                        color: primaryText === 'black' ? 'white' : primaryText
                      }}
                      onClick={() => handleModelClick(model)}
                      onMouseEnter={() => handleModelHover(model)}
                      role="link"
                      tabIndex={0}
                      onKeyDown={(e) => e.key === 'Enter' && handleModelClick(model)}
                    >
                      {formatModelName(model)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Right section - Model Display */}
        <div className="flex-1 relative bg-gray-50">
          {/* Background text watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <h1 className="text-9xl font-bold text-neutral-200 opacity-40 select-none">
              {formatModelName(activeModel)}
            </h1>
          </div>

          {/* Car Image */}
          <div className="relative flex flex-col">
            <div className="flex items-center justify-center p-8 min-h-64">
              {/* This would be replaced with an actual car image */}
              <div className="relative w-full max-w-3xl">
                {/* Placeholder for car image */}
                <div className="aspect-[16/9] relative">
                  {/* Dynamic car image */}
                  <div className="w-full h-full bg-transparent flex items-center justify-center">
                    <div className="relative w-full h-full">
                      <Image
                        src={carImagePath}
                        alt={`${formatModelName(activeModel)} vehicle`}
                        fill
                        className="object-contain"
                        sizes="(max-width: 1200px) 100vw, 1200px"
                        priority
                        onError={(e) => {
                          // If image fails to load, render fallback SVG
                          e.currentTarget.style.display = 'none';
                          document.getElementById(`fallback-svg-${activeModel}`).style.display = 'block';
                        }}
                      />

                      {/* Fallback SVG (hidden by default) */}
                      <svg
                        id={`fallback-svg-${activeModel}`}
                        className="w-full hidden"
                        viewBox="0 0 800 400"
                        fill="none"
                        style={{ position: 'absolute', top: 0, left: 0 }}
                      >
                        <path d="M120,280 C160,280 240,240 400,240 C560,240 640,280 680,280 C720,280 720,300 680,300 C640,300 560,310 400,310 C240,310 160,300 120,300 C80,300 80,280 120,280 Z" fill={secondaryColor} opacity="0.8" />
                        <path d="M140,240 C140,240 160,180 200,160 C240,140 320,130 400,130 C480,130 560,140 600,160 C640,180 660,240 660,240" stroke={secondaryColor} strokeWidth="8" fill="none" />
                        <circle cx="200" cy="280" r="40" fill="#333" />
                        <circle cx="200" cy="280" r="25" fill="#666" />
                        <circle cx="600" cy="280" r="40" fill="#333" />
                        <circle cx="600" cy="280" r="25" fill="#666" />
                        <text x="400" y="200" textAnchor="middle" fill={secondaryColor} fontWeight="bold" fontSize="28px">
                          {formatModelName(activeModel)}
                        </text>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specs section at bottom with animated numbers */}
            <div className="p-8 border-t border-neutral-200 bg-gray-100">
              <div className="flex flex-wrap gap-8">
                {/* Engine */}
                <div>
                  <div className="text-sm text-neutral-500">Engine</div>
                  {isSpecVisible && specs && (
                    <AnimatedCounter value={specs.engine} suffix="T" />
                  )}
                </div>

                {/* Length */}
                <div>
                  <div className="text-sm text-neutral-500">Length</div>
                  {isSpecVisible && specs && (
                    <AnimatedCounter value={specs.length} suffix="mm" />
                  )}
                </div>

                {/* Wheelbase */}
                <div>
                  <div className="text-sm text-neutral-500">Wheelbase</div>
                  {isSpecVisible && specs && (
                    <AnimatedCounter value={specs.wheelbase} suffix="mm" />
                  )}
                </div>

                {/* Power */}
                <div>
                  <div className="text-sm text-neutral-500">Power</div>
                  {isSpecVisible && specs && (
                    <AnimatedCounter value={specs.power} suffix="hp" />
                  )}
                </div>

                {/* Torque */}
                <div>
                  <div className="text-sm text-neutral-500">Torque</div>
                  {isSpecVisible && specs && (
                    <AnimatedCounter value={specs.torque} suffix="Nm" />
                  )}
                </div>
              </div>

              {/* Action buttons */}
              <div className="mt-8 flex gap-4">
                <Link href={`/models/${activeModel}`} onClick={() => onClose()}>
                  <button
                    className="px-10 py-4 cursor-pointer text-center font-medium uppercase tracking-wider text-sm inline-block transition-colors"
                    style={{
                      backgroundColor: primaryBg,
                      color: 'white',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = primaryHover}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = primaryBg}
                  >
                    Explore
                  </button>
                </Link>

                <Link href="/contact" onClick={() => onClose()}>
                  <button
                    className="px-10 py-4 cursor-pointer text-center font-medium uppercase tracking-wider text-sm inline-block transition-colors border-2"
                    style={{
                      borderColor: primaryBg,
                      color: 'black',
                      boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                    }}
                    onMouseOver={(e) => {
                      e.currentTarget.style.backgroundColor = primaryBg;
                      e.currentTarget.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                      e.currentTarget.style.color = 'black';
                    }}
                  >
                    Contact Us
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}