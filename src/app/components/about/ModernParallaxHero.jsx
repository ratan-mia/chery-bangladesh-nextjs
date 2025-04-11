'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

const ModernParallaxHero = () => {
  const [activeSection, setActiveSection] = useState(0)
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  
  const heroRef = useRef(null)
  const requestRef = useRef(null)
  const totalSections = 3
  
  // Optimized mouse movement handler with throttling
  const handleMouseMove = useCallback((e) => {
    // Don't capture every mouse event - improves performance
    if (requestRef.current) return
    
    requestRef.current = window.requestAnimationFrame(() => {
      const { clientX, clientY } = e
      const { innerWidth, innerHeight } = window
      
      // Calculate mouse position as percentage from center (-50 to 50)
      const x = ((clientX / innerWidth) - 0.5) * 2
      const y = ((clientY / innerHeight) - 0.5) * 2
      
      setMousePosition({ x, y })
      requestRef.current = null
    })
  }, [])

  // Optimized scroll handler with improved calculations
  const handleScroll = useCallback(() => {
    if (requestRef.current !== null) {
      window.cancelAnimationFrame(requestRef.current)
    }
    
    requestRef.current = window.requestAnimationFrame(() => {
      if (!heroRef.current) return

      const scrollPosition = window.scrollY
      const viewportHeight = window.innerHeight
      const totalScrollHeight = viewportHeight * (totalSections - 0.5)
      
      // Calculate scroll progress (0 to 1)
      const progress = Math.min(scrollPosition / totalScrollHeight, 1)
      setScrollProgress(progress)
      
      // Determine active section based on scroll position with better thresholds
      const threshold = viewportHeight * 0.6
      const newActiveSection = Math.min(
        Math.floor(scrollPosition / threshold),
        totalSections - 1
      )
      
      if (newActiveSection !== activeSection) {
        setActiveSection(newActiveSection)
      }
      
      requestRef.current = null
    })
  }, [activeSection])

  // Setup event listeners and cleanup
  useEffect(() => {
    // Initial check
    handleScroll()
    
    // Add event listeners with passive option for performance
    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('mousemove', handleMouseMove, { passive: true })
    
    // Handle keyboard navigation
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowDown' || e.key === 'PageDown') {
        scrollToSection(Math.min(activeSection + 1, totalSections - 1))
      } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
        scrollToSection(Math.max(activeSection - 1, 0))
      }
    }
    
    window.addEventListener('keydown', handleKeyDown)

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('keydown', handleKeyDown)
      
      if (requestRef.current) {
        window.cancelAnimationFrame(requestRef.current)
      }
    }
  }, [handleScroll, handleMouseMove, activeSection])

  // Smoothly scroll to section
  const scrollToSection = (index) => {
    const yOffset = index * window.innerHeight * 0.6
    window.scrollTo({ 
      top: yOffset, 
      behavior: 'smooth' 
    })
  }

  // Get transform style for parallax effect
  const getParallaxStyle = (depth = 1) => {
    const moveX = mousePosition.x * 10 * depth
    const moveY = mousePosition.y * 10 * depth
    return {
      transform: `translate3d(${moveX}px, ${moveY}px, 0)`,
      transition: 'transform 0.2s ease-out',
    }
  }

  // Section transition styles with performance optimizations
  const getSectionStyles = (index) => {
    const isActive = activeSection === index
    
    const baseStyles = {
      opacity: isActive ? 1 : 0,
      pointerEvents: isActive ? 'auto' : 'none',
      visibility: isActive || Math.abs(activeSection - index) <= 1 ? 'visible' : 'hidden',
    }
    
    // Add different transition effects for each section
    if (index === 0) {
      return {
        ...baseStyles,
        transform: isActive ? 'translateY(0)' : 'translateY(-3rem)',
      }
    } else if (index === 1) {
      return {
        ...baseStyles,
        transform: isActive ? 'scale(1)' : 'scale(1.05)',
      }
    } else {
      return {
        ...baseStyles,
        transform: isActive ? 'translateY(0)' : 'translateY(3rem)',
      }
    }
  }

  return (
    <div className="relative w-full overflow-hidden" ref={heroRef}>
      {/* Scroll progress indicator */}
      <div className="fixed top-0 left-0 w-full h-1 z-50 bg-gray-800/30">
        <div 
          className="h-full bg-primary transition-all duration-300 ease-out"
          style={{ width: `${scrollProgress * 100}%` }}
        />
      </div>

      {/* Section 1: Welcome */}
      <div
        className="fixed top-0 left-0 w-full h-screen transition-all duration-700 ease-out"
        style={getSectionStyles(0)}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/about/hero.jpg')",
            ...getParallaxStyle(0.5),
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 max-w-7xl mx-auto">
          <div className="space-y-6">
            <p className="text-sm md:text-base text-primary font-medium tracking-wider animate-fade-in opacity-0" 
               style={{ animationDelay: '0.2s', animationFillMode: 'forwards' }}>
              WELCOME TO CHERY
            </p>
            
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white animate-fade-in opacity-0" 
                style={{ animationDelay: '0.4s', animationFillMode: 'forwards' }}>
              DRIVING INNOVATION
            </h1>
            
            <p className="text-base md:text-lg text-white/90 max-w-3xl mx-auto animate-fade-in opacity-0" 
               style={{ animationDelay: '0.6s', animationFillMode: 'forwards' }}>
              COMMITTED TO BEING A DIVERSIFIED ENTERPRISE WITH GLOBAL INFLUENCE AND COMPETITIVENESS
            </p>
            
            <div className="flex flex-col sm:flex-row justify-center gap-4 pt-4 animate-fade-in opacity-0" 
                 style={{ animationDelay: '0.8s', animationFillMode: 'forwards' }}>
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 transition-colors duration-300 uppercase tracking-wide">
                Discover More
              </button>
              <button className="border-2 border-white hover:bg-white/10 text-white px-6 py-3 transition-colors duration-300 uppercase tracking-wide">
                Our Legacy
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section 2: Global Journey */}
      <div
        className="fixed top-0 left-0 w-full h-screen transition-all duration-700 ease-out"
        style={getSectionStyles(1)}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/about/hero.jpg')",
            ...getParallaxStyle(0.3),
          }}
        />
        <div className="absolute inset-0 bg-black/70" />
        
        <div className="relative h-full flex items-center justify-center py-8 px-4">
          <div className="flex flex-col lg:flex-row max-w-7xl w-full mx-auto gap-12">
            <div className="w-full lg:w-1/2">
              <div className={`transition-all duration-700 delay-200 ${activeSection === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-8'}`}>
                <h2 className="text-3xl md:text-5xl font-bold text-white mb-6">OUR GLOBAL JOURNEY</h2>
                <div className="w-20 h-1 bg-primary mb-8" />
                <p className="text-base md:text-lg text-white/90 mb-6">
                  Since its establishment in 1997, Chery Holding has made significant strides in the automotive industry.
                </p>
                <p className="text-base md:text-lg text-white/90 mb-8">
                  Its subsidiary, Chery Automobile, holds the distinction of being the first Chinese automobile brand to exceed one million domestic sales. Additionally Chery Automobile has been a trailblazer in expanding into international markets.
                </p>
                <button className="border-2 border-primary hover:bg-primary text-white px-6 py-3 transition-all duration-300 uppercase tracking-wide">
                  Our Journey
                </button>
              </div>
            </div>
            
            <div className="w-full lg:w-1/2">
              <div className={`bg-black/30 backdrop-blur-sm border-l-4 border-primary p-6 md:p-8 transition-all duration-700 delay-400 ${activeSection === 1 ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-8'}`}>
                <div className="grid grid-cols-2 gap-8">
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl font-bold text-primary mb-2">10M+</div>
                    <div className="text-sm text-white/80 uppercase tracking-wider">Vehicles Sold</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl font-bold text-primary mb-2">80+</div>
                    <div className="text-sm text-white/80 uppercase tracking-wider">Countries</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl font-bold text-primary mb-2">1,500+</div>
                    <div className="text-sm text-white/80 uppercase tracking-wider">Patents</div>
                  </div>
                  <div className="text-center">
                    <div className="text-3xl md:text-5xl font-bold text-primary mb-2">5</div>
                    <div className="text-sm text-white/80 uppercase tracking-wider">R&D Centers</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Section 3: Vision */}
      <div
        className="fixed top-0 left-0 w-full h-screen transition-all duration-700 ease-out"
        style={getSectionStyles(2)}
      >
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/about/hero.jpg')",
            ...getParallaxStyle(0.4),
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-black/90" />
        
        <div className="relative h-full flex flex-col items-center justify-center text-center px-4 py-8">
          <div className="max-w-6xl mx-auto w-full">
            <div className={`mb-12 transition-all duration-700 delay-200 ${activeSection === 2 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-6">FUTURE DRIVEN VISION</h2>
              <div className="w-20 h-1 bg-primary mx-auto" />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 mb-12">
              {[
                { 
                  title: "Electrification", 
                  icon: "⚡", 
                  description: "Leading the charge in global electric vehicle technology and innovation." 
                },
                { 
                  title: "Connectivity", 
                  icon: "🔗", 
                  description: "Creating seamless integration between vehicles and digital ecosystems." 
                },
                { 
                  title: "Sustainability", 
                  icon: "🌿", 
                  description: "Committed to reducing carbon footprint and sustainable manufacturing." 
                }
              ].map((item, index) => (
                <div 
                  key={index}
                  className={`
                    bg-black/30 border-t-2 border-primary p-6 md:p-8 backdrop-blur-sm
                    transition-all duration-700 shadow-lg
                    ${activeSection === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}
                  `}
                  style={{ transitionDelay: `${400 + index * 100}ms` }}
                >
                  <div className="text-3xl md:text-4xl mb-4">{item.icon}</div>
                  <h3 className="text-xl font-semibold text-white mb-3">{item.title}</h3>
                  <p className="text-white/80">{item.description}</p>
                </div>
              ))}
            </div>
            
            <div className={`transition-all duration-700 delay-700 ${activeSection === 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
              <button className="bg-primary hover:bg-primary/90 text-white px-6 py-3 transition-colors duration-300 uppercase tracking-wide">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Section navigation indicators */}
      <div className="fixed right-2 md:right-5 top-1/2 transform -translate-y-1/2 z-10">
        <div className="flex flex-col space-y-4">
          {[0, 1, 2].map((index) => (
            <button
              key={index}
              aria-label={`Go to section ${index + 1}`}
              className="group relative"
              onClick={() => scrollToSection(index)}
            >
              <div className={`
                w-1 md:w-1 h-8 md:h-10 rounded-full
                transition-all duration-300 ease-in-out
                ${activeSection === index ? 'bg-primary' : 'bg-white/30 group-hover:bg-white/50'}
              `}/>
              <div className={`
                absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-full pr-4
                opacity-0 group-hover:opacity-100
                transition-opacity duration-300
                pointer-events-none
                hidden md:block
              `}>
                <div className="bg-black/80 text-white text-xs uppercase tracking-wider px-3 py-2 whitespace-nowrap rounded">
                  {index === 0 ? 'Home' : index === 1 ? 'About Us' : 'Vision'}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Scroll indicator with enhanced animation */}
      <div className={`
        fixed bottom-8 left-1/2 transform -translate-x-1/2 
        transition-all duration-500 ease-in-out
        ${activeSection === 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'}
        z-10
      `}>
        <div className="flex flex-col items-center cursor-pointer" onClick={() => scrollToSection(1)}>
          <p className="text-white text-sm mb-2">Scroll down</p>
          <div className="w-6 h-10 rounded-full border-2 border-white flex justify-center items-start p-1">
            <div className="w-1.5 h-3 rounded-full bg-primary animate-bounce" />
          </div>
        </div>
      </div>

      {/* Spacer div to enable scrolling */}
      <div style={{ height: '300vh' }} aria-hidden="true" />
      
      {/* Custom animations */}
      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.7s ease-out forwards;
        }
      `}</style>
    </div>
  )
}

export default ModernParallaxHero