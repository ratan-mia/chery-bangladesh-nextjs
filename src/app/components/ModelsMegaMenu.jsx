'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function ModelsMegaMenu({ isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('tiggo')
  const [activeModel, setActiveModel] = useState('tiggo9')
  const [openSubmenus, setOpenSubmenus] = useState({})

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

  const handleCategoryClick = (category) => {
    setActiveCategory(category)
    
    // Set default model for category
    if (category === 'tiggo') {
      setActiveModel('tiggo9')
    } else if (category === 'arrizo') {
      setActiveModel('arrizo8')
    }
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
      'tiggo9': { engine: '2.0', length: '4810', wheelbase: '2800' },
      'tiggo9plus': { engine: '2.0', length: '4820', wheelbase: '2850' },
      'tiggo8': { engine: '1.8', length: '4700', wheelbase: '2710' },
      'tiggo8plus': { engine: '1.8', length: '4720', wheelbase: '2720' },
      'tiggo8pro': { engine: '1.8', length: '4745', wheelbase: '2710' },
      'tiggo7': { engine: '1.5', length: '4500', wheelbase: '2670' },
      'tiggo7pro': { engine: '1.5', length: '4520', wheelbase: '2675' },
      'tiggo4pro': { engine: '1.5', length: '4318', wheelbase: '2610' },
      'tiggo2pro': { engine: '1.5', length: '4200', wheelbase: '2555' },
      'arrizo8': { engine: '1.6', length: '4780', wheelbase: '2780' },
      'arrizo8plus': { engine: '1.6', length: '4795', wheelbase: '2790' },
      'arrizo6': { engine: '1.5', length: '4630', wheelbase: '2670' },
      'arrizo5plus': { engine: '1.5', length: '4530', wheelbase: '2610' }
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
    <div className="fixed top-16 left-0 w-full bg-white shadow-lg z-40 hidden md:block">
      <div className="container mx-auto flex">
        {/* Categories sidebar */}
        <div className="w-64 bg-cherySidebar text-white py-6">
          <ul className="list-none">
            <li 
              className={`py-3 px-6 text-lg uppercase tracking-wider cursor-pointer transition-colors hover:bg-white hover:bg-opacity-10 ${activeCategory === 'tiggo' ? 'bg-white bg-opacity-20' : ''}`}
              onClick={() => handleCategoryClick('tiggo')}
            >
              Tiggo
            </li>
            <li 
              className={`py-3 px-6 text-lg uppercase tracking-wider cursor-pointer transition-colors hover:bg-white hover:bg-opacity-10 ${activeCategory === 'arrizo' ? 'bg-white bg-opacity-20' : ''}`}
              onClick={() => handleCategoryClick('arrizo')}
            >
              Arrizo
            </li>
          </ul>
        </div>
        
        {/* Models dropdown */}
        <div className="w-64 bg-cheryDropdown">
          <ul className="list-none">
            {getModelList().map((model) => (
              <div key={model.id}>
                <li 
                  className={`py-3 px-6 flex justify-between items-center text-white cursor-pointer transition-colors hover:bg-white hover:bg-opacity-10 ${activeModel === model.id ? 'bg-white bg-opacity-20' : ''}`}
                  onClick={() => model.hasSubmenu ? toggleSubmenu(model.id) : handleModelClick(model.id)}
                >
                  {model.name}
                  {model.hasSubmenu && (
                    <span className="text-xl cursor-pointer">
                      {openSubmenus[model.id] ? '−' : '+'}
                    </span>
                  )}
                </li>
                
                {/* Submenu */}
                {model.hasSubmenu && openSubmenus[model.id] && (
                  <ul className="list-none bg-cherySubmenu">
                    {getSubmenuItems(model.id).map((subItem) => (
                      <li 
                        key={subItem.id}
                        className={`py-3 pl-10 pr-6 flex justify-between items-center text-white cursor-pointer transition-colors hover:bg-white hover:bg-opacity-10 ${activeModel === subItem.id ? 'bg-white bg-opacity-20' : ''}`}
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
        <div className="flex-1 p-6 bg-gray-100">
          <div className="flex">
            {/* Car image */}
            <div className="w-1/2">
              <div className="h-48 w-full" style={{ backgroundColor: carColor, position: 'relative' }}>
                <div className="absolute inset-0 flex items-center justify-center text-white text-3xl font-bold">
                  {formatModelName(activeModel)}
                </div>
              </div>
            </div>
            
            {/* Car specs */}
            <div className="w-1/2 pl-8">
              <h3 className="text-2xl font-bold mb-4">{formatModelName(activeModel)}</h3>
              
              <div className="grid grid-cols-3 gap-4 mb-6">
                <div>
                  <div className="text-sm text-gray-600">Engine</div>
                  <div className="text-2xl text-gray-800 font-bold">
                    {specs.engine}<span className="text-sm text-gray-500 align-super">T</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Length</div>
                  <div className="text-2xl text-gray-800 font-bold">
                    {specs.length}<span className="text-sm text-gray-500 align-super">mm</span>
                  </div>
                </div>
                
                <div>
                  <div className="text-sm text-gray-600">Wheelbase</div>
                  <div className="text-2xl text-gray-800 font-bold">
                    {specs.wheelbase}<span className="text-sm text-gray-500 align-super">mm</span>
                  </div>
                </div>
              </div>
              
              <Link href={`/models/${activeModel}`}>
                <button className="bg-cheryButton text-white border-none py-3 px-8 text-sm uppercase cursor-pointer hover:bg-cheryButtonHover transition-colors">
                  Explore
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}