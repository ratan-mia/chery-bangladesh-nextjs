import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const KeyAwardsSlider = () => {
  const swiperRef = useRef(null);
  const [mounted, setMounted] = useState(false);

  // Set mounted state to true after component mounts to avoid hydration issues
  useEffect(() => {
    setMounted(true);
  }, []);

  // Award data
  const awards = [
    {
      id: 1,
      year: "2024",
      title: "CHERY GROUP",
      subtitle: "ACHIEVES FIRST-TIME ENTRY INTO FORTUNE GLOBAL 500, RANKING 385TH",
      image: "/images/hero-slider/header-image.jpg",
      logo: "/images/awards/fortune-logo.png",
    },
    {
      id: 2,
      year: "2024",
      title: "CHERY WINS",
      subtitle: "BRANDZ PIONEERING CHINESE GLOBAL BRAND",
      image: "/images/hero-slider/slider2.jpg",
      additionalText: "AWARD AS THE SOLE WINNER IN THE AUTOMOTIVE INDUSTRY",
      organization: "KANTAR BRANDZ"
    },
    {
      id: 3,
      year: "2024",
      title: "CHERY RANKED",
      subtitle: "THE BEST PERFORMING GLOBAL BRAND IN CHINA",
      image: "/images/awards/china-brand.jpg",
      additionalText: "CHINESE GLOBAL BRAND TOP 14",
      organization: "KANTAR BRANDZ"
    },
    {
      id: 4,
      year: "2023",
      title: "CHERY TIGGO 7 PRO MAX",
      subtitle: "AWARDED BEST COMPACT SUV",
      image: "/images/awards/tiggo-award.jpg",
      additionalText: "MIDDLE EAST CAR OF THE YEAR AWARDS",
      organization: "MECOTY"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <h2 className="text-brown-900 text-3xl font-bold tracking-tight mb-6 md:mb-0">
            KEY AWARDS
          </h2>
          
          {/* Navigation buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-10 h-10 flex items-center justify-center text-brown-700 hover:text-primary transition-colors"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button 
              onClick={() => swiperRef.current?.slideNext()}
              className="w-10 h-10 flex items-center justify-center text-brown-700 hover:text-primary transition-colors"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>
          </div>
        </div>
        
        {mounted && (
          <Swiper
            onSwiper={(swiper) => {
              swiperRef.current = swiper;
            }}
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={24}
            slidesPerView={1}
            centeredSlides={false}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: '!w-4 !bg-primary'
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.5,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
              1280: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            className="pb-12"
          >
            {awards.map((award) => (
              <SwiperSlide key={award.id} className="h-auto">
                <div className="bg-white border border-brown-100 rounded-lg overflow-hidden h-full flex flex-col transition-all">
                  <div className="relative aspect-[16/9] overflow-hidden">
                    {/* Year tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <div className="bg-white px-3 py-1 text-xs font-medium text-brown-800">
                        {award.year}
                      </div>
                    </div>
                    
                    {/* Organization tag */}
                    {award.organization && (
                      <div className="absolute top-4 right-4 z-10">
                        <div className="bg-primary px-3 py-1">
                          <span className="text-xs font-medium text-white">{award.organization}</span>
                        </div>
                      </div>
                    )}
                    
                    {/* Image */}
                    <div className="relative w-full h-full">
                      <Image
                        src={award.image}
                        alt={award.title}
                        fill
                        className="object-cover"
                      />
                    </div>
                  </div>
                  
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="text-brown-900 text-lg font-bold mb-2">{award.title}</h3>
                    <p className="text-brown-700 text-sm mb-4">{award.subtitle}</p>
                    
                    {award.additionalText && (
                      <div className="mt-auto pt-3 border-t border-brown-100">
                        <p className="text-xs text-brown-600">
                          {award.additionalText}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        
        {/* View all link */}
        <div className="flex justify-center mt-6">
          <a href="#" className="text-primary font-medium hover:underline">
            View all awards
          </a>
        </div>
      </div>
    </section>
  );
};

export default KeyAwardsSlider;