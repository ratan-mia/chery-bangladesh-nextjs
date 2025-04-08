
import Image from 'next/image';
import React, { useCallback, useRef, useState } from 'react';
import { A11y, Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const CarSafetySection = () => {
  // Example tech slides data
  const techSlides = [
    {
      id: 1,
      title: "Adaptive Cruise Control",
      description: "Automatically adjusts speed to maintain a safe distance from vehicles ahead",
      mediaType: "image",
      image: "/api/placeholder/800/500"
    },
    {
      id: 2,
      title: "Lane Keeping Assist",
      description: "Helps prevent unintentional lane departures with gentle steering corrections",
      mediaType: "image",
      image: "/api/placeholder/800/500"
    },
    {
      id: 3,
      title: "Blind Spot Detection",
      description: "Alerts drivers to vehicles in their blind spots for safer lane changes",
      mediaType: "image",
      image: "/api/placeholder/800/500"
    },
    {
      id: 4,
      title: "Automatic Emergency Braking",
      description: "Detects potential collisions and applies brakes to prevent or reduce impact",
      mediaType: "video",
      videoUrl: "#", // Replace with actual video URL
      videoPoster: "/api/placeholder/800/500"
    },
    {
      id: 5,
      title: "360° Camera System",
      description: "Provides a bird's-eye view for easier parking and maneuvering in tight spaces",
      mediaType: "image",
      image: "/api/placeholder/800/500"
    }
  ];

  const [swiperInstance, setSwiperInstance] = useState(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  const onSwiperInit = useCallback((swiper) => {
    setSwiperInstance(swiper);
    if (prevRef.current && nextRef.current) {
      swiper.params.navigation.prevEl = prevRef.current;
      swiper.params.navigation.nextEl = nextRef.current;
      swiper.navigation.init();
      swiper.navigation.update();
    }
  }, []);

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4 max-w-7xl">
        <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          Advanced Safety Technology
        </h2>
        
        <div className="relative">
          <Swiper
            onSwiper={onSwiperInit}
            modules={[Navigation, Pagination, A11y, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            pagination={{ 
              clickable: true,
              bulletActiveClass: 'bg-blue-600 w-3 h-3',
              bulletClass: 'inline-block w-3 h-3 bg-gray-300 rounded-full mx-1 transition-all duration-200'
            }}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false
            }}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24
              }
            }}
            className="py-8"
          >
            {techSlides.map((slide) => (
              <SwiperSlide key={slide.id}>
                <div className="bg-white rounded-lg overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md h-full flex flex-col">
                  <div className="relative aspect-[4/3]">
                    {slide.mediaType === 'image' ? (
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                        <svg className="w-12 h-12 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                          <polygon points="5 3 19 12 5 21 5 3" fill="currentColor" />
                        </svg>
                      </div>
                    )}
                  </div>
                  <div className="p-5 flex-grow">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">{slide.title}</h3>
                    <p className="text-gray-600 text-sm">{slide.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="flex justify-center mt-6 gap-4">
            <button 
              ref={prevRef}
              className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-gray-800 border border-gray-200 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Previous slide"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 19L8 12L15 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <button 
              ref={nextRef}
              className="w-10 h-10 rounded-full bg-white shadow flex items-center justify-center text-gray-800 border border-gray-200 hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Next slide"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CarSafetySection;