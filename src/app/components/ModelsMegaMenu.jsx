'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function ModelsMegaMenu({ 
  id, 
  isOpen, 
  onClose,
  primaryBg = 'var(--chery-button)',
  primaryText = 'white',
  primaryHover = 'var(--chery-button-hover)'
}) {
  const [activeCategory, setActiveCategory] = useState('tiggo')
  const [activeModel, setActiveModel] = useState('tiggo9')
  const [openSubmenus, setOpenSubmenus] = useState({})
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
    
    // Reset open submenus
    setOpenSubmenus({})
  }
  
  const toggleSubmenu = (model) => {
    setOpenSubmenus(prev => ({
      ...prev,
      [model]: !prev[model]
    }))
  }
  
  const handleModelClick = (model) => {
    setActiveModel(model)
  }
  
  // Get car specs based on model
  const getModelSpecs = (model) => {
    const specs = {
      'tiggo9': { engine: '2.0', length: '4810', wheelbase: '2800', power: '254', torque: '390' },
      'tiggo9plus': { engine: '2.0', length: '4820', wheelbase: '2850', power: '261', torque: '400' },
      'tiggo8': { engine: '1.8', length: '4700', wheelbase: '2710', power: '187', torque: '300' },
      'tiggo8plus': { engine: '1.8', length: '4720', wheelbase: '2720', power: '195', torque: '320' },
      'tiggo8pro': { engine: '1.8', length: '4745', wheelbase: '2710', power: '197', torque: '320' },
      'tiggo7': { engine: '1.5', length: '4500', wheelbase: '2670', power: '156', torque: '230' },
      'tiggo7pro': { engine: '1.5', length: '4520', wheelbase: '2675', power: '162', torque: '240' },
      'tiggo4pro': { engine: '1.5', length: '4318', wheelbase: '2610', power: '145', torque: '210' },
      'tiggo2pro': { engine: '1.5', length: '4200', wheelbase: '2555', power: '126', torque: '180' },
      'arrizo8': { engine: '1.6', length: '4780', wheelbase: '2780', power: '197', torque: '290' },
      'arrizo8plus': { engine: '1.6', length: '4795', wheelbase: '2790', power: '205', torque: '300' },
      'arrizo6': { engine: '1.5', length: '4630', wheelbase: '2670', power: '156', torque: '230' },
      'arrizo5plus': { engine: '1.5', length: '4530', wheelbase: '2610', power: '147', torque: '210' }
    }
    
    return specs[model] || specs['tiggo9']
  }
  
  // Get car color for display
  const getCarColor = (model) => {
    if (model?.includes('tiggo9')) return '#008770' // Teal
    if (model?.includes('tiggo8')) return '#1E5945' // Dark green  
    if (model?.includes('tiggo7')) return '#00A8E8' // Blue
    if (model?.includes('tiggo4')) return '#556B2F' // Olive
    if (model?.includes('tiggo2')) return '#C23B22' // Red
    if (model?.includes('arrizo8')) return '#003F5C' // Navy
    if (model?.includes('arrizo6')) return '#444444' // Dark gray
    if (model?.includes('arrizo5')) return '#8A2BE2' // Purple
    return '#008770' // Default teal
  }
  
  // Format model name for display
  const formatModelName = (model) => {
    if (!model) return ''
    return model.replace(/([a-z])([0-9])/i, '$1 $2').replace(/^([a-z])/, match => match.toUpperCase())
  }
  
  // Get model lists based on category
  const getModelList = () => {
    if (activeCategory === 'tiggo') {
      return [
        { id: 'tiggo9series', name: 'Tiggo 9 Series', hasSubmenu: true },
        { id: 'tiggo9', name: 'Tiggo 9', hasSubmenu: false },
        { id: 'tiggo8series', name: 'Tiggo 8 Series', hasSubmenu: true },
        { id: 'tiggo7series', name: 'Tiggo 7 Series', hasSubmenu: true },
        { id: 'tiggo4pro', name: 'Tiggo 4 Pro', hasSubmenu: false },
        { id: 'tiggo2pro', name: 'Tiggo 2 Pro', hasSubmenu: false }
      ]
    } else {
      return [
        { id: 'arrizo8', name: 'Arrizo 8', hasSubmenu: true },
        { id: 'arrizo6', name: 'Arrizo 6', hasSubmenu: false },
        { id: 'arrizo5plus', name: 'Arrizo 5 Plus', hasSubmenu: false }
      ]
    }
  }
  
  // Get submenu items
  const getSubmenuItems = (modelId) => {
    if (modelId === 'tiggo9series') {
      return [
        { id: 'tiggo9', name: 'Tiggo 9' },
        { id: 'tiggo9plus', name: 'Tiggo 9 Plus' }
      ]
    } else if (modelId === 'tiggo8series') {
      return [
        { id: 'tiggo8', name: 'Tiggo 8' },
        { id: 'tiggo8plus', name: 'Tiggo 8 Plus' },
        { id: 'tiggo8pro', name: 'Tiggo 8 Pro' }
      ]
    } else if (modelId === 'tiggo7series') {
      return [
        { id: 'tiggo7', name: 'Tiggo 7' },
        { id: 'tiggo7pro', name: 'Tiggo 7 Pro' }
      ]
    } else if (modelId === 'arrizo8') {
      return [
        { id: 'arrizo8', name: 'Arrizo 8' },
        { id: 'arrizo8plus', name: 'Arrizo 8 Plus' }
      ]
    }
    return []
  }
  
  // Set default model if not selected
  useEffect(() => {
    if (activeCategory === 'tiggo' && !activeModel) {
      setActiveModel('tiggo9')
    } else if (activeCategory === 'arrizo' && !activeModel) {
      setActiveModel('arrizo8')
    }
  }, [activeCategory, activeModel])
  
  const specs = getModelSpecs(activeModel || 'tiggo9')
  const carColor = getCarColor(activeModel)
  
  if (!isOpen) return null
  
  return (
    <div 
      id={id}
      ref={menuRef}
      className="fixed top-16 left-0 w-full bg-white shadow-lg z-40 hidden md:block transition-all duration-500"
      style={{ transform: isOpen ? 'translateY(0)' : 'translateY(-100%)', opacity: isOpen ? 1 : 0 }}
    >
      <div className="max-w-7xl mx-auto flex border-t border-gray-100">
        {/* Categories sidebar */}
        <div className="w-56" style={{ backgroundColor: primaryBg }}>
          <ul className="list-none py-6">
            <li 
              className={`py-3 px-6 text-lg uppercase tracking-wider cursor-pointer transition-colors hover:bg-opacity-80
                         ${activeCategory === 'tiggo' ? 'bg-black bg-opacity-20' : ''}`}
              style={{ color: primaryText }}
              onClick={() => handleCategoryClick('tiggo')}
            >
              Tiggo
            </li>
            <li 
              className={`py-3 px-6 text-lg uppercase tracking-wider cursor-pointer transition-colors hover:bg-opacity-80
                         ${activeCategory === 'arrizo' ? 'bg-black bg-opacity-20' : ''}`}
              style={{ color: primaryText }}
              onClick={() => handleCategoryClick('arrizo')}
            >
              Arrizo
            </li>
          </ul>
        </div>
        
        {/* Models dropdown */}
        <div className="w-64 bg-gray-800">
          <ul className="list-none">
            {getModelList().map((model) => (
              <div key={model.id}>
                <li 
                  className={`py-3 px-6 flex justify-between items-center text-white cursor-pointer transition-colors 
                             hover:bg-gray-700 ${activeModel === model.id ? 'bg-gray-700' : ''}`}
                  onClick={() => model.hasSubmenu ? toggleSubmenu(model.id) : handleModelClick(model.id)}
                >
                  <span>{model.name}</span>
                  {model.hasSubmenu && (
                    <span className="text-xl transition-transform duration-300" 
                          style={{ transform: openSubmenus[model.id] ? 'rotate(180deg)' : 'rotate(0deg)' }}>
                      ▼
                    </span>
                  )}
                </li>
                
                {/* Submenu */}
                {model.hasSubmenu && openSubmenus[model.id] && (
                  <ul className="list-none bg-gray-900 overflow-hidden animate-fadeIn">
                    {getSubmenuItems(model.id).map((subItem) => (
                      <li 
                        key={subItem.id}
                        className={`py-3 pl-10 pr-6 flex justify-between items-center text-white cursor-pointer 
                                   transition-colors hover:bg-gray-800 ${activeModel === subItem.id ? 'bg-gray-800' : ''}`}
                        onClick={() => handleModelClick(subItem.id)}
                      >
                        {subItem.name}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </ul>
        </div>
        
        {/* Car display */}
        <div className="flex-1 p-8 bg-gray-50">
          <div className="flex flex-col lg:flex-row">
            {/* Car image */}
            <div className="w-full lg:w-1/2 mb-6 lg:mb-0">
              <div className="relative h-60 lg:h-80 rounded-lg overflow-hidden shadow-lg" 
                   style={{ backgroundColor: carColor }}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <h2 className="text-white text-4xl font-bold tracking-wide drop-shadow-md">
                    {formatModelName(activeModel)}
                  </h2>
                </div>
                
                {/* Sample car silhouette */}
                <svg className="absolute bottom-0 left-1/2 transform -translate-x-1/2" width="80%" height="60%" viewBox="0 0 400 160" fill="none">
                  <path d="M30,120 L60,120 L80,100 L320,100 L340,120 L370,120 L380,110 L380,130 L20,130 L20,110 L30,120" fill="rgba(0,0,0,0.3)" />
                  <path d="M80,100 L100,60 L300,60 L320,100" fill="rgba(0,0,0,0.2)" />
                  <ellipse cx="100" cy="120" rx="20" ry="20" fill="rgba(0,0,0,0.3)" />
                  <ellipse cx="300" cy="120" rx="20" ry="20" fill="rgba(0,0,0,0.3)" />
                </svg>
              </div>
            </div>
            
            {/* Car specs */}
            <div className="w-full lg:w-1/2 lg:pl-8">
              <h3 className="text-2xl font-bold mb-2 text-gray-800">{formatModelName(activeModel)}</h3>
              <p className="text-gray-500 mb-6">Experience power and elegance in perfect harmony</p>
              
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-xs text-gray-500 uppercase">Engine</div>
                  <div className="text-xl text-gray-800 font-bold flex items-baseline">
                    {specs.engine}<span className="text-xs text-gray-500 ml-1">T</span>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-xs text-gray-500 uppercase">Power</div>
                  <div className="text-xl text-gray-800 font-bold flex items-baseline">
                    {specs.power}<span className="text-xs text-gray-500 ml-1">HP</span>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-xs text-gray-500 uppercase">Torque</div>
                  <div className="text-xl text-gray-800 font-bold flex items-baseline">
                    {specs.torque}<span className="text-xs text-gray-500 ml-1">Nm</span>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-xs text-gray-500 uppercase">Length</div>
                  <div className="text-xl text-gray-800 font-bold flex items-baseline">
                    {specs.length}<span className="text-xs text-gray-500 ml-1">mm</span>
                  </div>
                </div>
                
                <div className="bg-white p-3 rounded-lg shadow-sm">
                  <div className="text-xs text-gray-500 uppercase">Wheelbase</div>
                  <div className="text-xl text-gray-800 font-bold flex items-baseline">
                    {specs.wheelbase}<span className="text-xs text-gray-500 ml-1">mm</span>
                  </div>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <Link 
                  href={`/models/${activeModel}`}
                  className="px-6 py-3 rounded-md text-sm uppercase tracking-wider transition-colors font-medium"
                  style={{ 
                    backgroundColor: primaryBg, 
                    color: primaryText,
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
                  }}
                  onMouseOver={(e) => e.currentTarget.style.backgroundColor = primaryHover}
                  onMouseOut={(e) => e.currentTarget.style.backgroundColor = primaryBg}
                >
                  Explore
                </Link>
                
                <Link 
                  href={`/test-drive/${activeModel}`}
                  className="px-6 py-3 rounded-md text-sm uppercase tracking-wider transition-colors font-medium bg-white text-gray-800 border border-gray-200 hover:bg-gray-100"
                >
                  Book Test Drive
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom section with all models */}
      <div className="bg-gray-100 py-4 px-8 border-t border-gray-200">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center">
            <h4 className="text-sm text-gray-500">Browse All Models</h4>
            <Link href="/models" className="text-sm font-medium" style={{ color: primaryBg }}>
              View All →
            </Link>
          </div>
          
          <div className="mt-2 flex flex-wrap gap-4">
            {['Tiggo 9', 'Tiggo 8', 'Tiggo 7 Pro', 'Tiggo 4 Pro', 'Arrizo 8'].map((model) => (
              <Link key={model} href={`/models/${model.toLowerCase().replace(' ', '-')}`} 
                    className="text-xs text-gray-700 bg-white px-3 py-1 rounded-full border border-gray-200 hover:border-gray-400 transition-colors">
                {model}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}