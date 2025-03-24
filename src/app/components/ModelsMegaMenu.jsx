'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function ModelsMegaMenu({ 
  id, 
  isOpen, 
  onClose,
  primaryBg = '#b29980', // Updated to match image color scheme
  primaryText = 'white',
  primaryHover = '#a38a73'
}) {
  const [activeCategory, setActiveCategory] = useState('tiggo')
  const [activeModel, setActiveModel] = useState('tiggo9')
  const [expandedSeries, setExpandedSeries] = useState({
    'tiggo9series': true // Default expanded
  })
  const menuRef = useRef(null)

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
  
  // Handle clicks outside menu to close it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {
        // Checking if the click is outside the menu but not on the toggle button
        if (!event.target.closest('button[aria-controls="' + id + '"]')) {
          onClose()
        }
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [isOpen, onClose, id])

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
    
    // Set default model for category
    if (category === 'tiggo') {
      setActiveModel('tiggo9')
    } else if (category === 'arrizo') {
      setActiveModel('arrizo8')
    }
  }
  
  const toggleSeries = (series) => {
    setExpandedSeries(prev => ({
      ...prev,
      [series]: !prev[series]
    }))
  }
  
  const handleModelClick = (model) => {
    setActiveModel(model)
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
  
  if (!isOpen) return null
  
  return (
    <div 
      id={id}
      ref={menuRef}
      className="fixed top-16 left-0 w-full bg-primary z-40 hidden md:block shadow-lg"
    >
      <div className="flex">
        {/* Left sidebar - Categories */}
        <div className="w-80 bg-gradient-to-b from-neutral-400 to-neutral-300 text-black flex flex-col">
          <div className="p-8">
            <h2 className="text-4xl font-light tracking-wide uppercase">
              {activeCategory}
            </h2>
          </div>
          
          <div className="flex">
            {/* Main categories */}
            <div className="w-full">
              <div 
                className={`px-8 py-4 cursor-pointer hover:bg-neutral-400/50 transition-colors ${activeCategory === 'tiggo' ? 'bg-neutral-400/50' : ''}`}
                onClick={() => handleCategoryClick('tiggo')}
              >
                <h3 className="text-2xl font-light tracking-wide uppercase">Tiggo</h3>
              </div>
              <div 
                className={`px-8 py-4 cursor-pointer hover:bg-neutral-400/50 transition-colors ${activeCategory === 'arrizo' ? 'bg-neutral-400/50' : ''}`}
                onClick={() => handleCategoryClick('arrizo')}
              >
                <h3 className="text-2xl font-light tracking-wide uppercase">Arrizo</h3>
              </div>
            </div>
          </div>
        </div>
        
        {/* Middle section - Series and Models */}
        <div className="w-72 bg-secondary overflow-y-auto">
          {getSeriesData().map((series) => (
            <div key={series.id} className="border-b border-gray-300">
              <div 
                className={`p-4 flex justify-between items-center cursor-pointer hover:bg-primary transition-colors
                          ${activeModel === series.id || (series.models.length > 0 && series.models.includes(activeModel)) ? 'bg-primary' : ''}`}
                onClick={() => {
                  if (series.models.length > 0) {
                    toggleSeries(series.id)
                  } else {
                    handleModelClick(series.id)
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
                <div className="bg-primary">
                  {series.models.map((model) => (
                    <div 
                      key={model}
                      className={`p-4 pl-10 cursor-pointer hover:bg-secondary transition-colors
                                ${activeModel === model ? 'bg-secondary' : ''}`}
                      onClick={() => handleModelClick(model)}
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
        <div className="flex-1 bg-secondary relative">
          {/* Background text watermark */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <h1 className="text-9xl font-bold text-neutral-200 opacity-40 select-none">
              {formatModelName(activeModel)}
            </h1>
          </div>
          
          {/* Car Image */}
          <div className="relative flex flex-col">
            <div className="flex items-center justify-center p-8 min-h-96">
              {/* This would be replaced with an actual car image */}
              <div className="relative w-full max-w-3xl">
                {/* Placeholder for car image */}
                <div className="aspect-[16/9] relative">
                  {/* In production, replace this with actual car image */}
                  <div className="w-full h-full bg-transparent flex items-center justify-center">
                    {/* Example car silhouette - replace with actual image in production */}
                    <svg className="w-full" viewBox="0 0 800 400" fill="none">
                      <path d="M120,280 C160,280 240,240 400,240 C560,240 640,280 680,280 C720,280 720,300 680,300 C640,300 560,310 400,310 C240,310 160,300 120,300 C80,300 80,280 120,280 Z" fill="#1E5945" opacity="0.8" />
                      <path d="M140,240 C140,240 160,180 200,160 C240,140 320,130 400,130 C480,130 560,140 600,160 C640,180 660,240 660,240" stroke="#1E5945" strokeWidth="8" fill="none" />
                      <circle cx="200" cy="280" r="40" fill="#333" />
                      <circle cx="200" cy="280" r="25" fill="#666" />
                      <circle cx="600" cy="280" r="40" fill="#333" />
                      <circle cx="600" cy="280" r="25" fill="#666" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Specs section at bottom */}
            <div className="p-8 bg-secondary border-t border-neutral-200">
              <div className="flex space-x-16">
                {/* Engine */}
                <div>
                  <div className="text-sm text-neutral-500">Engine</div>
                  <div className="text-5xl font-bold flex items-baseline mt-2 text-neutral-800">
                    {specs.engine}<span className="text-sm ml-1">T</span>
                  </div>
                </div>
                
                {/* Length */}
                <div>
                  <div className="text-sm text-neutral-500">Length</div>
                  <div className="text-5xl font-bold flex items-baseline mt-2 text-neutral-800">
                    {specs.length}<span className="text-sm ml-1">mm</span>
                  </div>
                </div>
                
                {/* Wheelbase */}
                <div>
                  <div className="text-sm text-neutral-500">Wheelbase</div>
                  <div className="text-5xl font-bold flex items-baseline mt-2 text-neutral-800">
                    {specs.wheelbase}<span className="text-sm ml-1">mm</span>
                  </div>
                </div>
              </div>
              
              {/* Action buttons */}
              <div className="mt-8">
                <Link 
                  href={`/models/${activeModel}`}
                  className="px-10 py-4 rounded text-center font-medium uppercase tracking-wider bg-tan-500 text-white text-sm hover:bg-tan-600 transition-colors"
                  style={{ backgroundColor: primaryBg, borderColor: primaryBg }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = primaryHover}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = primaryBg}
                >
                  Explore
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}