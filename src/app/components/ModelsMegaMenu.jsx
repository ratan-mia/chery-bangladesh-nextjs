'use client'

import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'

export default function ModelsMegaMenu({ id, isOpen, onClose }) {
  const [activeCategory, setActiveCategory] = useState('tiggo')
  const [activeModel, setActiveModel] = useState('tiggo9')
  const [expandedSeries, setExpandedSeries] = useState({ 'tiggo9series': true })
  const menuRef = useRef(null)

  // Color scheme
  const primaryBg = 'bg-amber-700'
  const primaryText = 'text-white'
  const primaryHover = 'hover:bg-amber-800'
  const secondaryBg = 'bg-amber-50'
  const secondaryText = 'text-amber-900'
  const divider = 'border-amber-200'
  const labelColor = 'text-amber-600'
  const accent = 'text-amber-500'

  useEffect(() => {
    const handleEscKey = (e) => {
      if (e.key === 'Escape' && isOpen) onClose()
    }
    window.addEventListener('keydown', handleEscKey)
    return () => window.removeEventListener('keydown', handleEscKey)
  }, [isOpen, onClose])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && isOpen) {
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
    setActiveModel(category === 'tiggo' ? 'tiggo9' : 'arrizo8')
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

  const getSeriesData = () => {
    return activeCategory === 'tiggo'
      ? [
          { id: 'tiggo9series', name: 'TIGGO 9 SERIES', models: ['tiggo9'] },
          { id: 'tiggo8series', name: 'TIGGO 8 SERIES', models: ['tiggo8'] },
          { id: 'tiggo7series', name: 'TIGGO 7 SERIES', models: ['tiggo7'] },
          { id: 'tiggo4pro', name: 'TIGGO 4 PRO', models: [] },
          { id: 'tiggo2pro', name: 'TIGGO 2 PRO', models: [] }
        ]
      : [
          { id: 'arrizo8', name: 'ARRIZO 8', models: [] },
          { id: 'arrizo7', name: 'ARRIZO 7', models: [] },
          { id: 'arrizo5', name: 'ARRIZO 5', models: [] }
        ]
  }

  const formatModelName = (model) => model.replace(/([a-z])([0-9])/i, '$1 $2').toUpperCase()

  const specs = getModelSpecs(activeModel)

  if (!isOpen) return null

  return (
    <div id={id} ref={menuRef} className="fixed top-16 left-0 w-full z-40 hidden md:block shadow-xl max-h-[90vh] overflow-auto bg-white">
      <div className="flex">

        {/* Sidebar */}
        <div className={`${primaryBg} w-80 text-white`}>
          <div className="p-8">
            <h2 className="text-4xl font-light tracking-wide uppercase">{activeCategory}</h2>
          </div>

          <div className="flex flex-col">
            {['tiggo', 'arrizo'].map(category => (
              <div
                key={category}
                onClick={() => handleCategoryClick(category)}
                className={`px-8 py-4 cursor-pointer transition-colors ${
                  activeCategory === category ? 'bg-amber-800' : primaryHover
                }`}
              >
                <h3 className="text-2xl font-light tracking-wide uppercase">{category}</h3>
              </div>
            ))}
          </div>
        </div>

        {/* Models list */}
        <div className={`w-72 overflow-y-auto ${secondaryBg}`}>
          {getSeriesData().map(series => (
            <div key={series.id} className={`border-b ${divider}`}>
              <div
                onClick={() => series.models.length ? toggleSeries(series.id) : handleModelClick(series.id)}
                className={`p-4 flex justify-between items-center cursor-pointer transition-colors ${
                  series.models.includes(activeModel) || activeModel === series.id
                    ? `${primaryBg} ${primaryText}`
                    : `${secondaryText} hover:bg-amber-100`
                }`}
              >
                <span className="font-medium">{series.name}</span>
                {series.models.length > 0 && (
                  <span className="text-xl">{expandedSeries[series.id] ? '−' : '+'}</span>
                )}
              </div>

              {expandedSeries[series.id] && series.models.length > 0 && (
                <div className={primaryBg}>
                  {series.models.map(model => (
                    <div
                      key={model}
                      onClick={() => handleModelClick(model)}
                      className={`p-4 pl-10 cursor-pointer transition-colors ${primaryText} ${
                        activeModel === model ? 'bg-amber-900' : primaryHover
                      }`}
                    >
                      {formatModelName(model)}
                    </div>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Main preview */}
        <div className="flex-1 relative bg-white">
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
            <h1 className="text-9xl font-bold text-amber-100 opacity-30 select-none">
              {formatModelName(activeModel)}
            </h1>
          </div>

          <div className="relative flex flex-col">
            <div className="flex items-center justify-center p-8 min-h-64">
              <div className="w-full max-w-3xl">
                <div className="aspect-[16/9] bg-transparent flex items-center justify-center">
                  <svg className="w-full" viewBox="0 0 800 400" fill="none">
                    <path d="M120,280 C160,280 240,240 400,240 C560,240 640,280 680,280 C720,280 720,300 680,300 C640,300 560,310 400,310 C240,310 160,300 120,300 C80,300 80,280 120,280 Z" fill="#92400e" opacity="0.8" />
                    <path d="M140,240 C140,240 160,180 200,160 C240,140 320,130 400,130 C480,130 560,140 600,160 C640,180 660,240 660,240" stroke="#92400e" strokeWidth="8" fill="none" />
                    <circle cx="200" cy="280" r="40" fill="#333" />
                    <circle cx="200" cy="280" r="25" fill="#666" />
                    <circle cx="600" cy="280" r="40" fill="#333" />
                    <circle cx="600" cy="280" r="25" fill="#666" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className={`p-8 border-t ${divider} ${secondaryBg}`}>
              <div className="flex flex-wrap gap-8">
                {['engine', 'length', 'wheelbase'].map(key => (
                  <div key={key}>
                    <div className={`text-sm ${labelColor}`}>{key.charAt(0).toUpperCase() + key.slice(1)}</div>
                    <div className={`text-4xl font-bold flex items-baseline mt-2 ${secondaryText}`}>
                      {specs[key]}<span className="text-sm ml-1">{key === 'engine' ? 'T' : 'mm'}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8">
                <Link
                  href={`/models/${activeModel}`}
                  className={`px-10 py-4 rounded text-center font-medium uppercase tracking-wider text-sm inline-block ${primaryBg} ${primaryText} ${primaryHover} transition`}
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
