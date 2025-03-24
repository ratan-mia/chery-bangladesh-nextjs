'use client'

import { useEffect, useState } from 'react'

export default function DropdownMenu({ category, onModelSelect, activeModel }) {
  const [submenuVisible, setSubmenuVisible] = useState(null)
  
  useEffect(() => {
    // Reset submenu when category changes
    setSubmenuVisible(null)
  }, [category])
  
  const toggleSubmenu = (model) => {
    if (submenuVisible === model) {
      setSubmenuVisible(null)
    } else {
      setSubmenuVisible(model)
    }
  }
  
  const handleModelClick = (model) => {
    onModelSelect(model)
  }
  
  // Generate menu items based on category
  const getMenuItems = () => {
    if (category === 'tiggo') {
      return [
        { id: 'tiggo9series', name: 'Tiggo 9 Series', hasSubmenu: true },
        { id: 'tiggo9', name: 'Tiggo 9', hasSubmenu: false },
        { id: 'tiggo8series', name: 'Tiggo 8 Series', hasSubmenu: true },
        { id: 'tiggo7series', name: 'Tiggo 7 Series', hasSubmenu: true },
        { id: 'tiggo4pro', name: 'Tiggo 4 Pro', hasSubmenu: false },
        { id: 'tiggo2pro', name: 'Tiggo 2 Pro', hasSubmenu: false }
      ]
    } else if (category === 'arrizo') {
      return [
        { id: 'arrizo8', name: 'Arrizo 8', hasSubmenu: true },
        { id: 'arrizo6', name: 'Arrizo 6', hasSubmenu: false },
        { id: 'arrizo5plus', name: 'Arrizo 5 Plus', hasSubmenu: false }
      ]
    }
    return []
  }
  
  // Generate submenu items
  const getSubmenuItems = (model) => {
    if (model === 'tiggo9series') {
      return [
        { id: 'tiggo9', name: 'Tiggo 9' },
        { id: 'tiggo9plus', name: 'Tiggo 9 Plus' }
      ]
    } else if (model === 'tiggo8series') {
      return [
        { id: 'tiggo8', name: 'Tiggo 8' },
        { id: 'tiggo8plus', name: 'Tiggo 8 Plus' },
        { id: 'tiggo8pro', name: 'Tiggo 8 Pro' }
      ]
    } else if (model === 'tiggo7series') {
      return [
        { id: 'tiggo7', name: 'Tiggo 7' },
        { id: 'tiggo7pro', name: 'Tiggo 7 Pro' }
      ]
    } else if (model === 'arrizo8') {
      return [
        { id: 'arrizo8', name: 'Arrizo 8' },
        { id: 'arrizo8plus', name: 'Arrizo 8 Plus' }
      ]
    }
    return []
  }
  
  return (
    <div className="absolute top-0 left-0 w-64 lg:w-72 bg-cheryDropdown h-full z-10 py-10 transition-all duration-300">
      <ul className="list-none">
        {getMenuItems().map((item) => (
          <div key={item.id}>
            <li 
              className={`py-4 px-8 flex justify-between items-center text-white cursor-pointer transition-colors hover:bg-white hover:bg-opacity-10 ${activeModel === item.id ? 'bg-white bg-opacity-20' : ''}`}
              onClick={() => item.hasSubmenu ? toggleSubmenu(item.id) : handleModelClick(item.id)}
            >
              {item.name}
              {item.hasSubmenu && (
                <span className="text-2xl cursor-pointer">
                  {submenuVisible === item.id ? '−' : '+'}
                </span>
              )}
            </li>
            
            {/* Submenu */}
            {item.hasSubmenu && submenuVisible === item.id && (
              <ul className="list-none bg-cherySubmenu">
                {getSubmenuItems(item.id).map((subItem) => (
                  <li 
                    key={subItem.id}
                    className={`py-4 pl-12 pr-8 flex justify-between items-center text-white cursor-pointer transition-colors hover:bg-white hover:bg-opacity-10 ${activeModel === subItem.id ? 'bg-white bg-opacity-20' : ''}`}
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
  )
}