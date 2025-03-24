'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/navigation'
import { Autoplay, EffectFade, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function CheryTiggoSection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const [isInView, setIsInView] = useState(false)
  const swiperRef = useRef(null)
  const sectionRef = useRef(null)

  // Enhanced sample data with more details
  const models = [
    {
      name: 'Tiggo 9',
      subtitle: 'Luxury Flagship SUV',
      link: '/models/tiggo/tiggo9',
      image: 'https://placehold.co/1200x600/008770/ffffff?text=Tiggo+9',
      color: '#008770',
      specs: {
        engine: '2.0T',
        power: '254 HP',
        torque: '390 Nm',
        transmission: '7-DCT'
      }
    },
    {
      name: 'Tiggo 8',
      subtitle: 'Premium 7-Seater SUV',
      link: '/models/tiggo/tiggo8',
      image: 'https://placehold.co/1200x600/1E5945/ffffff?text=Tiggo+8',
      color: '#1E5945',
      specs: {
        engine: '1.6T',
        power: '197 HP',
        torque: '290 Nm',
        transmission: '7-DCT'
      }
    },
    {
      name: 'Tiggo 7 Pro',
      subtitle: 'Stylish Compact SUV',
      link: '/models/tiggo/tiggo7-pro',
      image: 'https://placehold.co/1200x600/00A8E8/ffffff?text=Tiggo+7+Pro',
      color: '#00A8E8',
      specs: {
        engine: '1.5T',
        power: '156 HP',
        torque: '230 Nm',
        transmission: 'CVT'
      }
    },
    {
      name: 'Tiggo 4 Pro',
      subtitle: 'Urban Crossover',
      link: '/models/tiggo/tiggo4-pro',
      image: 'https://placehold.co/1200x600/556B2F/ffffff?text=Tiggo+4+Pro',
      color: '#556B2F',
      specs: {
        engine: '1.5L',
        power: '145 HP',
        torque: '210 Nm',
        transmission: 'CVT'
      }
    },
    {
      name: 'Tiggo 2 Pro',
      subtitle: 'Compact City SUV',
      link: '/models/tiggo/tiggo2-pro',
      image: 'https://placehold.co/1200x600/C23B22/ffffff?text=Tiggo+2+Pro',
      color: '#C23B22',
      specs: {
        engine: '1.5L',
        power: '126 HP',
        torque: '143 Nm',
        transmission: '5MT/CVT'
      }
    }
  ]

  // Intersection Observer to trigger animations when section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle tab click
  const handleTabClick = (index) => {
    setActiveTabIndex(index)
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(index)
    }
    
    // Scroll tab into view on mobile
    if (typeof window !== 'undefined' && window.innerWidth <= 768) {
      const tabElement = document.getElementById(`tiggo-tab-${index}`)
      if (tabElement) {
        tabElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'center'
        })
      }
    }
  }

  // Update active tab when swiper slides
  const handleSlideChange = (swiper) => {
    setActiveTabIndex(swiper.activeIndex)
  }

  return (
    <section 
      ref={sectionRef}
      className="w-full bg-gradient-to-b from-gray-50 to-gray-100 py-16 md:py-24 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo with Animation */}
        <div className={`text-center mb-12 transform transition-all duration-1000 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="inline-block relative">
            <svg width="180" height="60" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
              <path d="M100 30C100 46.5685 86.5685 60 70 60C53.4315 60 40 46.5685 40 30C40 13.4315 53.4315 0 70 0C86.5685 0 100 13.4315 100 30Z" fill="#333333"/>
              <path d="M94 30C94 43.2548 83.2548 54 70 54C56.7452 54 46 43.2548 46 30C46 16.7452 56.7452 6 70 6C83.2548 6 94 16.7452 94 30Z" fill="#f5f5f5"/>
              <text x="110" y="38" fontFamily="Arial, sans-serif" fontSize="26" fontWeight="bold" fill="#333333">TIGGO</text>
            </svg>
            <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-32 h-0.5 bg-amber-700"></div>
          </div>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Experience the perfect blend of innovation, style, and performance</p>
        </div>

        {/* Tabs with Animation */}
        <div className={`flex justify-center mb-12 transition-all duration-1000 delay-300 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <div className="relative flex gap-1 md:gap-2 p-1 bg-gray-200/80 backdrop-blur-sm rounded-full shadow-inner overflow-x-auto max-w-full md:max-w-3xl scrollbar-hide">
            {models.map((model, index) => (
              <button
                key={index}
                id={`tiggo-tab-${index}`}
                className={`py-2 md:py-3 px-4 md:px-6 rounded-full transition-all duration-300 whitespace-nowrap text-sm md:text-base ${
                  activeTabIndex === index 
                    ? 'bg-white text-gray-900 font-medium shadow-md transform -translate-y-0.5' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-700'
                }`}
                onClick={() => handleTabClick(index)}
                style={{ 
                  boxShadow: activeTabIndex === index ? `0 4px 6px rgba(0, 0, 0, 0.1), 0 2px 0 ${models[activeTabIndex].color}` : 'none'
                }}
              >
                {model.name}
              </button>
            ))}
          </div>
        </div>

        {/* Slider with Enhanced Visual Effects */}
        <div className={`relative mb-12 transition-all duration-1000 delay-600 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Swiper
            ref={swiperRef}
            modules={[Navigation, EffectFade, Autoplay]}
            effect="fade"
            speed={800}
            slidesPerView={1}
            loop={false}
            autoplay={{
              delay: 5000,
              disableOnInteraction: true,
              pauseOnMouseEnter: true
            }}
            onSlideChange={handleSlideChange}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
            className="rounded-2xl shadow-xl overflow-hidden group"
          >
            {models.map((model, index) => (
              <SwiperSlide key={index} className="bg-white">
                <div className="relative">
                  {/* Model name overlay */}
                  <div className="hidden md:block absolute top-6 left-6 z-10 bg-black/60 backdrop-blur-sm rounded-lg p-4 transform transition-all duration-500 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                    <h3 className="text-2xl font-bold text-white">{model.name}</h3>
                    <p className="text-gray-300">{model.subtitle}</p>
                  </div>
                  
                  {/* Main car image */}
                  <div className="h-[300px] md:h-[400px] lg:h-[500px] relative" style={{ backgroundColor: `${model.color}20` }}>
                    <Image
                      src={model.image}
                      alt={model.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 1200px"
                      className="object-contain"
                      priority={index === 0}
                    />
                  </div>
                  
                  {/* Car specs bottom bar */}
                  <div className="flex flex-wrap justify-center md:justify-between items-center p-4 bg-gray-900 text-white">
                    <div className="md:order-1 w-full md:w-auto text-center md:text-left mb-3 md:mb-0">
                      <h3 className="text-lg md:text-xl font-bold">{model.name}</h3>
                      <p className="text-sm text-gray-400">{model.subtitle}</p>
                    </div>
                    
                    <div className="flex justify-center md:justify-end space-x-6 md:space-x-8 md:order-2 w-full md:w-auto">
                      {Object.entries(model.specs).map(([key, value]) => (
                        <div key={key} className="text-center">
                          <p className="text-xs text-gray-400 uppercase">{key}</p>
                          <p className="text-sm md:text-base font-semibold">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Custom navigation buttons */}
          <button className="swiper-button-prev !w-12 !h-12 md:!w-14 md:!h-14 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm !text-transparent before:content-[''] after:content-[''] transition-all duration-300 bg-white/70 hover:bg-white group/btn">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-800 group-hover/btn:text-amber-700 transition-colors duration-300"
            >
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className="swiper-button-next !w-12 !h-12 md:!w-14 md:!h-14 rounded-full flex items-center justify-center shadow-lg backdrop-blur-sm !text-transparent before:content-[''] after:content-[''] transition-all duration-300 bg-white/70 hover:bg-white group/btn">
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              width="24" 
              height="24" 
              viewBox="0 0 24 24" 
              fill="none" 
              stroke="currentColor" 
              strokeWidth="2.5" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              className="text-gray-800 group-hover/btn:text-amber-700 transition-colors duration-300"
            >
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
          
          {/* Slider progress indicators */}
          <div className="flex justify-center space-x-2 mt-4">
            {models.map((_, index) => (
              <button 
                key={index}
                onClick={() => handleTabClick(index)}
                className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                  activeTabIndex === index 
                    ? 'w-8 bg-amber-700' 
                    : 'bg-gray-300 hover:bg-gray-400'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
        
        {/* Explore Button with Animation */}
        <div className={`text-center transition-all duration-1000 delay-900 ${isInView ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
          <Link 
            href={models[activeTabIndex]?.link || '#'}
            className="group relative inline-flex items-center justify-center overflow-hidden rounded-lg bg-amber-700 px-8 py-4 font-bold text-white shadow-md transition-all duration-300 hover:bg-amber-800"
          >
            <span className="absolute inset-0 flex h-full w-full -translate-x-full transform items-center justify-center bg-amber-800 text-white transition-all duration-500 group-hover:translate-x-0">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </span>
            <span className="absolute flex h-full w-full transform items-center justify-center text-white transition-all duration-500 group-hover:translate-x-full">EXPLORE {models[activeTabIndex]?.name.toUpperCase()}</span>
            <span className="invisible relative">EXPLORE {models[activeTabIndex]?.name.toUpperCase()}</span>
          </Link>
          
          {/* Additional call to action */}
          <div className="mt-4 flex justify-center space-x-6">
            <button className="text-gray-600 hover:text-amber-700 text-sm flex items-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4z" />
                <path fillRule="evenodd" d="M18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" clipRule="evenodd" />
              </svg>
              Request Brochure
            </button>
            <button className="text-gray-600 hover:text-amber-700 text-sm flex items-center transition-colors">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              Compare Models
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}