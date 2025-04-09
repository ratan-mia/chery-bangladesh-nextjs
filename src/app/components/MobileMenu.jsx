'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

// Color classes for consistent styling
const COLORS = {
  primaryBg: 'bg-amber-700',
  primaryText: 'text-white',
  primaryHover: 'hover:bg-amber-800',
  primaryActive: 'active:bg-amber-900',
  primarySubBg: 'bg-amber-800',
  primarySubHover: 'hover:bg-amber-700',
  primaryLight: 'bg-amber-100',
  modelActiveBg: 'bg-white bg-opacity-20',
  modelHoverBg: 'hover:bg-white hover:bg-opacity-10',
  subItemHover: 'hover:bg-amber-700 hover:bg-opacity-10',
  subItemActive: 'bg-amber-700 bg-opacity-20',
  overlay: 'bg-black bg-opacity-50',
  carNameText: 'text-white text-2xl font-bold',
  carCard: 'w-full h-32 sm:h-40 mb-5 rounded shadow-md flex items-center justify-center',
  exploreBtn: 'bg-amber-700 text-white py-2 sm:py-3 px-6 sm:px-8 text-sm uppercase hover:bg-amber-800 active:bg-amber-900 transition-colors mt-4 sm:mt-6 rounded shadow-sm'
}

export default function MobileMenu({ isOpen, closeMenu }) {
  const [activeSubmenu, setActiveSubmenu] = useState(null)
  const [activeModelCategory, setActiveModelCategory] = useState('tiggo')
  const [activeModel, setActiveModel] = useState('tiggo9')
  const [openModelSubmenus, setOpenModelSubmenus] = useState({})
  const menuRef = useRef(null)

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target) && !e.target.closest('.menu-toggle')) {
        closeMenu()
      }
    }
    document.addEventListener('click', handleOutsideClick)
    return () => document.removeEventListener('click', handleOutsideClick)
  }, [isOpen, closeMenu])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  const toggleMainSubmenu = (submenu) => {
    setActiveSubmenu(activeSubmenu === submenu ? null : submenu)
    if (activeSubmenu !== submenu) setOpenModelSubmenus({})
  }

  const handleCategoryClick = (category) => {
    setActiveModelCategory(category)
    setOpenModelSubmenus({})
  }

  const toggleModelSubmenu = (model) => {
    setOpenModelSubmenus(prev => ({ ...prev, [model]: !prev[model] }))
  }

  const handleModelClick = (model) => {
    setActiveModel(model)
  }

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

  const getCarColor = (model) => {
    if (model?.includes('tiggo9')) return '#008770'
    if (model?.includes('tiggo8')) return '#1E5945'
    if (model?.includes('tiggo7')) return '#00A8E8'
    if (model?.includes('tiggo4')) return '#556B2F'
    if (model?.includes('tiggo2')) return '#C23B22'
    if (model?.includes('arrizo8')) return '#003F5C'
    if (model?.includes('arrizo6')) return '#444444'
    if (model?.includes('arrizo5')) return '#8A2BE2'
    return '#008770'
  }

  const formatModelName = (model) => {
    return model?.replace(/([a-z])([0-9])/i, '$1 $2').replace(/^([a-z])/, match => match.toUpperCase()) || ''
  }

  const getModelList = () => {
    return activeModelCategory === 'tiggo'
      ? [
          { id: 'tiggo9series', name: 'Tiggo 9 Series', hasSubmenu: true },
          { id: 'tiggo9', name: 'Tiggo 9', hasSubmenu: false },
          { id: 'tiggo8series', name: 'Tiggo 8 Series', hasSubmenu: true },
          { id: 'tiggo7series', name: 'Tiggo 7 Series', hasSubmenu: true },
          { id: 'tiggo4pro', name: 'Tiggo 4 Pro', hasSubmenu: false },
          { id: 'tiggo2pro', name: 'Tiggo 2 Pro', hasSubmenu: false }
        ]
      : [
          { id: 'arrizo8', name: 'Arrizo 8', hasSubmenu: true },
          { id: 'arrizo6', name: 'Arrizo 6', hasSubmenu: false },
          { id: 'arrizo5plus', name: 'Arrizo 5 Plus', hasSubmenu: false }
        ]
  }

  const getSubmenuItems = (modelId) => {
    const map = {
      'tiggo9series': [
        { id: 'tiggo9', name: 'Tiggo 9' },
        { id: 'tiggo9plus', name: 'Tiggo 9 Plus' }
      ],
      'tiggo8series': [
        { id: 'tiggo8', name: 'Tiggo 8' },
        { id: 'tiggo8plus', name: 'Tiggo 8 Plus' },
        { id: 'tiggo8pro', name: 'Tiggo 8 Pro' }
      ],
      'tiggo7series': [
        { id: 'tiggo7', name: 'Tiggo 7' },
        { id: 'tiggo7pro', name: 'Tiggo 7 Pro' }
      ],
      'arrizo8': [
        { id: 'arrizo8', name: 'Arrizo 8' },
        { id: 'arrizo8plus', name: 'Arrizo 8 Plus' }
      ]
    }
    return map[modelId] || []
  }

  useEffect(() => {
    if (!activeModel) {
      setActiveModel(activeModelCategory === 'tiggo' ? 'tiggo9' : 'arrizo8')
    }
  }, [activeModelCategory, activeModel])

  const specs = getModelSpecs(activeModel)
  const carColor = getCarColor(activeModel)

  return (
    <>
      <div 
        className={`fixed inset-0 ${COLORS.overlay} z-20 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={closeMenu}
      />

      <div 
        ref={menuRef}
        className={`fixed top-0 right-0 w-full sm:w-4/5 md:w-3/5 h-full bg-white z-30 overflow-y-auto transition-transform duration-300 transform ${isOpen ? 'translate-x-0' : 'translate-x-full'} pt-16 max-h-screen`}
      >
        <div className="h-full flex flex-col">
          {/* Close Button */}
          <button 
            className="absolute top-4 right-4 text-gray-800 w-8 h-8 flex items-center justify-center"
            onClick={closeMenu}
            aria-label="Close menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Navigation */}
          <nav className="mb-5 flex-grow">
            <ul className="list-none border-b border-gray-200">
              <li className="border-b border-gray-100">
                <button 
                  className="text-gray-800 w-full text-left text-base px-5 py-4 block uppercase flex justify-between items-center"
                  onClick={() => toggleMainSubmenu('models')}
                >
                  Models
                  <span className="text-2xl">{activeSubmenu === 'models' ? '−' : '+'}</span>
                </button>

                {activeSubmenu === 'models' && (
                  <div className="transition-all duration-300 ease-in-out">
                    <div className={`${COLORS.primaryBg} ${COLORS.primaryText}`}>
                      <ul className="flex">
                        {['tiggo', 'arrizo'].map(cat => (
                          <li 
                            key={cat}
                            className={`flex-1 py-4 px-5 text-base uppercase text-center cursor-pointer transition-colors ${
                              activeModelCategory === cat ? 'bg-amber-800 bg-opacity-50' : 'hover:bg-white hover:bg-opacity-10'
                            }`}
                            onClick={() => handleCategoryClick(cat)}
                          >
                            {cat}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className={COLORS.primarySubBg}>
                      <ul>
                        {getModelList().map(model => (
                          <div key={model.id}>
                            <li 
                              className={`py-3 px-5 sm:px-8 flex justify-between items-center ${COLORS.primaryText} cursor-pointer border-b border-white border-opacity-10 transition-colors ${
                                activeModel === model.id ? COLORS.modelActiveBg : COLORS.modelHoverBg
                              }`}
                              onClick={() => model.hasSubmenu ? toggleModelSubmenu(model.id) : handleModelClick(model.id)}
                            >
                              {model.name}
                              {model.hasSubmenu && <span className="text-xl px-2">{openModelSubmenus[model.id] ? '−' : '+'}</span>}
                            </li>

                            {/* Submenu */}
                            {model.hasSubmenu && (
                              <ul 
                                className={`bg-amber-900 transition-all duration-300 ${
                                  openModelSubmenus[model.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
                                }`}
                              >
                                {getSubmenuItems(model.id).map(subItem => (
                                  <li 
                                    key={subItem.id}
                                    className={`py-3 pl-8 sm:pl-12 pr-5 sm:pr-8 ${COLORS.primaryText} cursor-pointer border-b border-white border-opacity-10 transition-colors ${
                                      activeModel === subItem.id ? COLORS.subItemActive : COLORS.subItemHover
                                    }`}
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

                    {/* Car Preview */}
                    <div className="p-5 text-center bg-white">
                      <div className={COLORS.carCard} style={{ backgroundColor: carColor }}>
                        <div className={COLORS.carNameText}>{formatModelName(activeModel)}</div>
                      </div>
                      <div className="flex justify-around flex-wrap">
                        {['engine', 'length', 'wheelbase'].map((key) => (
                          <div key={key} className="text-center p-2">
                            <div className="text-xs sm:text-sm text-gray-600 mb-1">{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                            <div className="text-2xl sm:text-3xl text-gray-800 font-bold">
                              {specs[key]}<span className="text-xs sm:text-sm text-gray-500 align-super">{key === 'engine' ? 'T' : 'mm'}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                      <Link href={`/models/${activeModel}`}>
                        <button className={COLORS.exploreBtn}>
                          Explore
                        </button>
                      </Link>
                    </div>
                  </div>
                )}
              </li>

              {/* Static Menu Items */}
              {['News', 'About Chery', 'Contact Us', 'Service'].map((item) => (
                <li key={item} className="border-b border-gray-100">
                  <Link href="#" className="text-gray-800 no-underline text-base px-5 py-4 block uppercase hover:bg-gray-100 transition-colors" onClick={closeMenu}>
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="flex justify-between items-center px-5 py-4 border-t border-gray-200 mt-auto">
            {['Search', 'Language'].map((label) => (
              <Link key={label} href="#" className="text-gray-800 hover:text-amber-700 transition-colors" onClick={closeMenu} aria-label={label}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {label === 'Search' ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  )}
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </>
  )
}
