'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function ModelsMegaMenu({ 
  id, 
  isOpen, 
  onClose,
  // Color settings
  primaryBg = '#b29980', 
  primaryText = 'black',
  primaryHover = '#a38a73'
}) {
  const [activeCategory, setActiveCategory] = useState('tiggo')
  const [activeModel, setActiveModel] = useState('tiggo9')
  const [expandedSeries, setExpandedSeries] = useState({
    'tiggo9series': true // Default expanded
  })
  const [hoveredModel, setHoveredModel] = useState(null)
  const menuRef = useRef(null)
  const timeoutRef = useRef(null)

  // Close menu on ESC key
  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    }
    
    window.addEventListener('keydown', handleEscKey)
    return () => window.removeEventListener('keydown', handleEscKey)
  }, [isOpen, onClose])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])
  
  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    }
  }, []);
  
  // Handle clicks inside menu to prevent propagation to document
  const handleMenuClick = (e) => {
    // Prevent click from reaching the backdrop
    e.stopPropagation()
  }

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
    
    // Set default model for category
    if (category === 'tiggo') {
      setActiveModel('tiggo9')
    } else if (category === 'arrizo') {
      setActiveModel('arrizo8')
    }
  }
  
  const handleCategoryHover = (category) => {
    // Only respond to hover on desktop
    if (window.innerWidth >= 768) {
      setActiveCategory(category)
      
      // Set default model for category
      if (category === 'tiggo') {
        setActiveModel('tiggo9')
      } else if (category === 'arrizo') {
        setActiveModel('arrizo8')
      }
    }
  }
  
  const toggleSeries = (series) => {
    setExpandedSeries(prev => ({
      ...prev,
      [series]: !prev[series]
    }))
  }
  
  const handleSeriesHover = (series) => {
    // Only respond to hover on desktop
    if (window.innerWidth >= 768) {
      // Use timeout to prevent flickering when moving between items
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        setExpandedSeries(prev => ({
          ...prev,
          [series]: true
        }))
      }, 200);
    }
  }
  
  const handleModelClick = (model) => {
    setActiveModel(model)
  }
  
  const handleModelHover = (model) => {
    // Only respond to hover on desktop
    if (window.innerWidth >= 768) {
      setHoveredModel(model);
      
      // Use timeout to prevent flickering when moving between items
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      
      timeoutRef.current = setTimeout(() => {
        setActiveModel(model)
        setHoveredModel(null);
      }, 200);
    }
  }
  
  // Get car specs based on model
  const getModelSpecs = (model) => {
    const specs = {
      'tiggo9': { engine: '2.0', length: '4810', wheelbase: '2800', power: '254', torque: '390' },
      'tiggo8': { engine: '1.8', length: '4700', wheelbase: '2710', power: '187', torque: '300' },
      'tiggo7': { engine: '1.5', length: '4500', wheelbase: '2670', power: '156', torque: '230' },
      'tiggo4pro': { engine: '1.5', length: '4318', wheelbase: '2610', power: '145', torque: '210' },
      'tiggo2pro': { engine: '1.5', length: '4200', wheelbase: '2555', power: '126', torque: '180' },
      'arrizo8': { engine: '1.6', length: '4780', wheelbase: '2780', power: '197', torque: '290' },
      'arrizo7': { engine: '1.5', length: '4650', wheelbase: '2700', power: '156', torque: '230' },
      'arrizo5': { engine: '1.5', length: '4530', wheelbase: '2610', power: '147', torque: '210' }
    }
    
    return specs[model] || specs['tiggo9']
  }
  
  // Get car image path based on model
  const getCarImagePath = (model) => {
    const imagePaths = {
      'tiggo9': '/images/cars/tiggo9.png',
      'tiggo8': '/images/cars/tiggo8.png',
      'tiggo7': '/images/cars/tiggo7.png',
      'tiggo4pro': '/images/cars/tiggo4pro.png',
      'tiggo2pro': '/images/cars/tiggo2pro.png',
      'arrizo8': '/images/cars/arrizo8.png',
      'arrizo7': '/images/cars/arrizo7.png',
      'arrizo5': '/images/cars/arrizo5.png'
    }
    
    return imagePaths[model] || '/images/cars/placeholder.png'
  }
  
  // Get series display data
  const getSeriesData = () => {
    if (activeCategory === 'tiggo') {
      return [
        { id: 'tiggo9series', name: 'TIGGO 9 SERIES', models: ['tiggo9'] },
        { id: 'tiggo8series', name: 'TIGGO 8 SERIES', models: ['tiggo8'] },
        { id: 'tiggo7series', name: 'TIGGO 7 SERIES', models: ['tiggo7'] },
        { id: 'tiggo4pro', name: 'TIGGO 4 PRO', models: [] },
        { id: 'tiggo2pro', name: 'TIGGO 2 PRO', models: [] }
      ]
    } else {
      return [
        { id: 'arrizo8', name: 'ARRIZO 8', models: [] },
        { id: 'arrizo7', name: 'ARRIZO 7', models: [] },
        { id: 'arrizo5', name: 'ARRIZO 5', models: [] }
      ]
    }
  }
  
  // Format model name for display
  const formatModelName = (model) => {
    if (!model) return ''
    return model.replace(/([a-z])([0-9])/i, '$1 $2').toUpperCase()
  }
  
  const specs = getModelSpecs(activeModel)
  const carImagePath = getCarImagePath(activeModel)
  
  if (!isOpen) return null
  
  // Styling
  const sidebarGradient = 'linear-gradient(to bottom, #d1d5db, #9ca3af)'
  const secondaryColor = '#1E5945' // Darker green
  
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
              <div 
                className={`px-8 py-4 cursor-pointer transition-colors ${activeCategory === 'tiggo' ? 'bg-black/10' : 'hover:bg-black/5'}`}
                onClick={() => handleCategoryClick('tiggo')}
                onMouseEnter={() => handleCategoryHover('tiggo')}
                role="tab"
                aria-selected={activeCategory === 'tiggo'}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick('tiggo')}
              >
                <h3 className="text-2xl font-light tracking-wide uppercase">Tiggo</h3>
              </div>
              <div 
                className={`px-8 py-4 cursor-pointer transition-colors ${activeCategory === 'arrizo' ? 'bg-black/10' : 'hover:bg-black/5'}`}
                onClick={() => handleCategoryClick('arrizo')}
                onMouseEnter={() => handleCategoryHover('arrizo')}
                role="tab"
                aria-selected={activeCategory === 'arrizo'}
                tabIndex={0}
                onKeyDown={(e) => e.key === 'Enter' && handleCategoryClick('arrizo')}
              >
                <h3 className="text-2xl font-light tracking-wide uppercase">Arrizo</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle section - Series and Models */}
        <div className="w-72 overflow-y-auto bg-gray-100">
          {getSeriesData().map((series) => (
            <div key={series.id} className="border-b border-gray-300">
              <div 
                className={`p-4 flex justify-between items-center cursor-pointer transition-colors ${
                  activeModel === series.id || 
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
                    toggleSeries(series.id)
                  } else {
                    handleModelClick(series.id)
                  }
                }}
                onMouseEnter={() => {
                  if (series.models.length > 0) {
                    handleSeriesHover(series.id)
                  } else {
                    handleModelHover(series.id)
                  }
                }}
                role={series.models.length > 0 ? "button" : "link"}
                aria-expanded={series.models.length > 0 ? expandedSeries[series.id] : undefined}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    if (series.models.length > 0) {
                      toggleSeries(series.id)
                    } else {
                      handleModelClick(series.id)
                    }
                  }
                }}
              >
                <span className="font-medium">{series.name}</span>
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
                        style={{position: 'absolute', top: 0, left: 0}}
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
            
            {/* Specs section at bottom */}
            <div className="p-8 border-t border-neutral-200 bg-gray-100">
              <div className="flex flex-wrap gap-8">
                {/* Engine */}
                <div>
                  <div className="text-sm text-neutral-500">Engine</div>
                  <div className="text-4xl font-bold flex items-baseline mt-2 text-neutral-800">
                    {specs.engine}<span className="text-sm ml-1">T</span>
                  </div>
                </div>
                
                {/* Length */}
                <div>
                  <div className="text-sm text-neutral-500">Length</div>
                  <div className="text-4xl font-bold flex items-baseline mt-2 text-neutral-800">
                    {specs.length}<span className="text-sm ml-1">mm</span>
                  </div>
                </div>
                
                {/* Wheelbase */}
                <div>
                  <div className="text-sm text-neutral-500">Wheelbase</div>
                  <div className="text-4xl font-bold flex items-baseline mt-2 text-neutral-800">
                    {specs.wheelbase}<span className="text-sm ml-1">mm</span>
                  </div>
                </div>
                
                {/* Power */}
                <div>
                  <div className="text-sm text-neutral-500">Power</div>
                  <div className="text-4xl font-bold flex items-baseline mt-2 text-neutral-800">
                    {specs.power}<span className="text-sm ml-1">hp</span>
                  </div>
                </div>
                
                {/* Torque */}
                <div>
                  <div className="text-sm text-neutral-500">Torque</div>
                  <div className="text-4xl font-bold flex items-baseline mt-2 text-neutral-800">
                    {specs.torque}<span className="text-sm ml-1">Nm</span>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="mt-8 flex gap-4">
                <Link href={`/models/${activeModel}`}>
                  <button
                    className="px-10 py-4 rounded text-center font-medium uppercase tracking-wider text-sm inline-block transition-colors"
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
                
                <Link href={`/models/${activeModel}/configure`}>
                  <button
                    className="px-10 py-4 rounded text-center font-medium uppercase tracking-wider text-sm inline-block transition-colors border-2"
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
                    Order Now
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