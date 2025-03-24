'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

export default function MobileMenu({ isOpen, closeMenu }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const [activeModelCategory, setActiveModelCategory] = useState('tiggo')
  const [activeModel, setActiveModel] = useState('tiggo9')
  const [openModelSubmenus, setOpenModelSubmenus] = useState({})
  
  // Close mobile menu when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && !e.target.closest('.mobile-menu-container') && !e.target.closest('.menu-toggle')) {
        closeMenu()
      }
    }
    
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [isOpen, closeMenu])
  
  const toggleMainSubmenu = (submenu) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu)
    
    // Reset model submenu state when toggling main menu
    if (activeSubmenu !== submenu) {
      setOpenModelSubmenus({})
    }
  }
  
  const handleCategoryClick = (category) => {
    setActiveModelCategory(category)
    setOpenModelSubmenus({})
  }
  
  const toggleModelSubmenu = (model) => {
    setOpenModelSubmenus(prev => ({
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
      'tiggo7': { engine: '1.5', length: '4500', wheelbase: '2670' },
      'tiggo4pro': { engine: '1.5', length: '4318', wheelbase: '2610' },
      'tiggo2pro': { engine: '1.5', length: '4200', wheelbase: '2555' },
      'arrizo8': { engine: '1.6', length: '4780', wheelbase: '2780' },
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
    if (activeModelCategory === 'tiggo') {
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
    if (activeModelCategory === 'tiggo' && !activeModel) {
      setActiveModel('tiggo9')
    } else if (activeModelCategory === 'arrizo' && !activeModel) {
      setActiveModel('arrizo8')
    }
  }, [activeModelCategory, activeModel])
  
  const specs = getModelSpecs(activeModel || 'tiggo9')
  const carColor = getCarColor(activeModel)
  
  return (
    <div 
      className={`fixed top-0 left-0 w-full h-full bg-white z-30 overflow-y-auto transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} pt-16 md:hidden`}
    >
      <div className="mobile-menu-container">
        <nav className="mb-5">
          <ul className="list-none border-b border-gray-200">
            <li className="border-b border-gray-100">
              <button 
                className="text-gray-800 w-full text-left text-base px-5 py-4 block uppercase flex justify-between items-center"
                onClick={() => toggleMainSubmenu('models')}
              >
                Models
                <span>{activeSubmenu === 'models' ? '−' : '+'}</span>
              </button>
              
              {/* Models submenu */}
              {activeSubmenu === 'models' && (
                <div>
                  <div className="bg-cherySidebar text-white">
                    <ul className="list-none flex">
                      <li 
                        className={`flex-1 py-4 px-5 text-base uppercase cursor-pointer text-center ${activeModelCategory === 'tiggo' ? 'bg-white bg-opacity-20' : ''}`}
                        onClick={() => handleCategoryClick('tiggo')}
                      >
                        Tiggo
                      </li>
                      <li 
                        className={`flex-1 py-4 px-5 text-base uppercase cursor-pointer text-center ${activeModelCategory === 'arrizo' ? 'bg-white bg-opacity-20' : ''}`}
                        onClick={() => handleCategoryClick('arrizo')}
                      >
                        Arrizo
                      </li>
                    </ul>
                  </div>
                  
                  <div className="bg-cheryDropdown overflow-hidden transition-all duration-300 max-h-full">
                    <ul className="list-none">
                      {getModelList().map((model) => (
                        <div key={model.id}>
                          <li 
                            className={`py-3 px-8 flex justify-between items-center text-white cursor-pointer border-b border-white border-opacity-10 ${activeModel === model.id ? 'bg-white bg-opacity-20' : ''}`}
                            onClick={() => model.hasSubmenu ? toggleModelSubmenu(model.id) : handleModelClick(model.id)}
                          >
                            {model.name}
                            {model.hasSubmenu && (
                              <span className="text-2xl cursor-pointer">
                                {openModelSubmenus[model.id] ? '−' : '+'}
                              </span>
                            )}
                          </li>
                          
                          {model.hasSubmenu && openModelSubmenus[model.id] && (
                            <ul className="list-none bg-cherySubmenu overflow-hidden transition-all duration-300">
                              {getSubmenuItems(model.id).map((subItem) => (
                                <li 
                                  key={subItem.id}
                                  className={`py-3 pl-12 pr-8 flex justify-between items-center text-white cursor-pointer border-b border-white border-opacity-10 ${activeModel === subItem.id ? 'bg-white bg-opacity-20' : ''}`}
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
                  
                  {/* Car display for selected model */}
                  <div className="p-5 text-center bg-white">
                    <div className="w-full h-40 relative mb-5">
                      <div style={{ 
                        backgroundColor: carColor, 
                        width: '100%', 
                        height: '100%', 
                        position: 'relative',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center' 
                      }}>
                        <div className="text-white text-2xl font-bold">
                          {formatModelName(activeModel)}
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-around flex-wrap">
                      <div className="text-center p-2">
                        <div className="text-sm text-gray-600 mb-2">Engine</div>
                        <div className="text-3xl text-gray-800 font-bold">
                          {specs.engine}<span className="text-sm text-gray-500 align-super">T</span>
                        </div>
                      </div>
                      
                      <div className="text-center p-2">
                        <div className="text-sm text-gray-600 mb-2">Length</div>
                        <div className="text-3xl text-gray-800 font-bold">
                          {specs.length}<span className="text-sm text-gray-500 align-super">mm</span>
                        </div>
                      </div>
                      
                      <div className="text-center p-2">
                        <div className="text-sm text-gray-600 mb-2">Wheelbase</div>
                        <div className="text-3xl text-gray-800 font-bold">
                          {specs.wheelbase}<span className="text-sm text-gray-500 align-super">mm</span>
                        </div>
                      </div>
                    </div>
                    
                    <Link href={`/models/${activeModel}`}>
                      <button className="bg-cheryButton text-white border-none py-3 px-8 text-sm uppercase cursor-pointer hover:bg-cheryButtonHover transition-colors mt-6">
                        Explore
                      </button>
                    </Link>
                  </div>
                </div>
              )}
            </li>
            <li className="border-b border-gray-100">
              <Link href="#" className="text-gray-800 no-underline text-base px-5 py-4 block uppercase" onClick={closeMenu}>
                News
              </Link>
            </li>
            <li className="border-b border-gray-100">
              <Link href="#" className="text-gray-800 no-underline text-base px-5 py-4 block uppercase" onClick={closeMenu}>
                About Chery
              </Link>
            </li>
            <li className="border-b border-gray-100">
              <Link href="#" className="text-gray-800 no-underline text-base px-5 py-4 block uppercase" onClick={closeMenu}>
                Contact Us
              </Link>
            </li>
            <li className="border-b border-gray-100">
              <Link href="#" className="text-gray-800 no-underline text-base px-5 py-4 block uppercase" onClick={closeMenu}>
                Service
              </Link>
            </li>
          </ul>
        </nav>
        
        <div className="flex justify-between px-5 py-4">
          <Link href="#" className="text-gray-800 text-xl" onClick={closeMenu}>🔍</Link>
          <Link href="#" className="text-gray-800 text-xl" onClick={closeMenu}>🌐</Link>
        </div>
      </div>
    </div>
  )
}