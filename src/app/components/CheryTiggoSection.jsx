'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/navigation'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

export default function CheryTiggoSection() {
  const [activeTabIndex, setActiveTabIndex] = useState(0)
  const swiperRef = useRef(null)

  // Sample data
  const models = [
    {
      name: 'Tiggo 9',
      link: '/models/tiggo/tiggo9',
      image: 'https://placehold.co/1200x600/008770/ffffff?text=Tiggo+9'
    },
    {
      name: 'Tiggo 8',
      link: '/models/tiggo/tiggo8',
      image: 'https://placehold.co/1200x600/1E5945/ffffff?text=Tiggo+8'
    },
    {
      name: 'Tiggo 7 Pro',
      link: '/models/tiggo/tiggo7-pro',
      image: 'https://placehold.co/1200x600/00A8E8/ffffff?text=Tiggo+7+Pro'
    },
    {
      name: 'Tiggo 4 Pro',
      link: '/models/tiggo/tiggo4-pro',
      image: 'https://placehold.co/1200x600/556B2F/ffffff?text=Tiggo+4+Pro'
    },
    {
      name: 'Tiggo 2 Pro',
      link: '/models/tiggo/tiggo2-pro',
      image: 'https://placehold.co/1200x600/C23B22/ffffff?text=Tiggo+2+Pro'
    }
  ]

  // Handle tab click
  const handleTabClick = (index) => {
    setActiveTabIndex(index)
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideTo(index)
    }
  }

  // Update active tab when swiper slides
  const handleSlideChange = (swiper) => {
    setActiveTabIndex(swiper.activeIndex)
  }

  return (
    <section className="w-full bg-gray-100 py-12">
      <div className="max-w-6xl mx-auto px-4">
        {/* Logo */}
        <div className="text-center mb-8">
          <svg width="160" height="50" viewBox="0 0 200 60" fill="none" xmlns="http://www.w3.org/2000/svg" className="mx-auto">
            <path d="M100 30C100 46.5685 86.5685 60 70 60C53.4315 60 40 46.5685 40 30C40 13.4315 53.4315 0 70 0C86.5685 0 100 13.4315 100 30Z" fill="#333333"/>
            <path d="M94 30C94 43.2548 83.2548 54 70 54C56.7452 54 46 43.2548 46 30C46 16.7452 56.7452 6 70 6C83.2548 6 94 16.7452 94 30Z" fill="#f5f5f5"/>
            <text x="110" y="36" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="#333333">TIGGO</text>
          </svg>
        </div>

        {/* Tabs */}
        <div className="flex justify-center gap-6 mb-8 overflow-x-auto">
          {models.map((model, index) => (
            <button
              key={index}
              className={`py-2 px-4 border-b-2 transition-colors ${
                activeTabIndex === index ? 'border-amber-700 font-medium text-gray-800' : 'border-transparent text-gray-500'
              }`}
              onClick={() => handleTabClick(index)}
            >
              {model.name}
            </button>
          ))}
        </div>

        {/* Slider */}
        <div className="relative mb-8">
          <Swiper
            ref={swiperRef}
            modules={[Navigation]}
            slidesPerView={1}
            onSlideChange={handleSlideChange}
            navigation={{
              prevEl: '.swiper-button-prev',
              nextEl: '.swiper-button-next',
            }}
          >
            {models.map((model, index) => (
              <SwiperSlide key={index}>
                <div className="text-center">
                  <Image
                    src={model.image}
                    alt={model.name}
                    width={1200}
                    height={600}
                    className="max-w-full h-auto mx-auto"
                    priority={index === 0}
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
          
          {/* Navigation buttons */}
          <button className="swiper-button-prev absolute top-1/2 left-2 z-10 bg-amber-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6"/>
            </svg>
          </button>
          <button className="swiper-button-next absolute top-1/2 right-2 z-10 bg-amber-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-md">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M9 18l6-6-6-6"/>
            </svg>
          </button>
        </div>
        
        {/* Explore Button */}
        <div className="text-center">
          <Link 
            href={models[activeTabIndex]?.link || '#'}
            className="inline-block py-3 px-12 bg-amber-700 text-white font-semibold rounded shadow-md hover:bg-amber-800 transition-colors"
          >
            EXPLORE
          </Link>
        </div>
      </div>
    </section>
  )
}