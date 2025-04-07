import { motion } from 'framer-motion';
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
    <section className="relative py-20 bg-white">
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-full h-64 bg-gradient-to-b from-brown-50 to-white"></div>
      <div className="absolute -top-10 right-0 w-64 h-64 rounded-full bg-primary/5 blur-3xl"></div>
      <div className="absolute top-40 left-10 w-32 h-32 rounded-full bg-brown-200/20 blur-xl"></div>
      
      <div className="container relative mx-auto px-4 md:px-8 z-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-10">
          <div className="mb-6 md:mb-0">
            <motion.div 
              className="w-20 h-1 bg-primary mb-4 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: 80 }}
              transition={{ duration: 0.6 }}
            />
            <motion.h2 
              className="text-brown-900 text-4xl md:text-5xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              KEY AWARDS
            </motion.h2>
            <motion.p
              className="text-brown-600 mt-2 max-w-md"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Recognition of our commitment to excellence and innovation in the automotive industry
            </motion.p>
          </div>
          
          {/* Custom navigation buttons */}
          <div className="flex gap-3">
            <button 
              onClick={() => swiperRef.current?.slidePrev()}
              className="w-12 h-12 rounded-full border-2 border-brown-200 flex items-center justify-center text-brown-700 hover:bg-brown-50 hover:border-primary/40 hover:text-primary transition-all duration-300 group"
              aria-label="Previous slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:-translate-x-0.5 transition-transform">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>
            <button 
              onClick={() => swiperRef.current?.slideNext()}
              className="w-12 h-12 rounded-full border-2 border-brown-200 flex items-center justify-center text-brown-700 hover:bg-brown-50 hover:border-primary/40 hover:text-primary transition-all duration-300 group"
              aria-label="Next slide"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-0.5 transition-transform">
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
            spaceBetween={28}
            slidesPerView={1}
            centeredSlides={false}
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
            }}
            pagination={{
              clickable: true,
              bulletActiveClass: '!w-6 !bg-primary'
            }}
            breakpoints={{
              640: {
                slidesPerView: 1.2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 2,
                spaceBetween: 24,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 28,
              },
              1280: {
                slidesPerView: 3.5,
                spaceBetween: 32,
              },
            }}
            className="overflow-visible pb-16"
          >
            {awards.map((award) => (
              <SwiperSlide key={award.id} className="h-auto group">
                <motion.div 
                  className="bg-white rounded-3xl overflow-hidden h-full flex flex-col shadow-lg shadow-brown-200/20 hover:shadow-xl hover:shadow-brown-200/30 transition-all duration-500 border border-brown-100"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="relative aspect-[4/3] overflow-hidden">
                    {/* Overlay gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent z-10 opacity-60 group-hover:opacity-40 transition-opacity duration-500"></div>
                    
                    {/* Award badge */}
                    <div className="absolute top-4 left-4 z-20">
                      <div className="bg-white/90 backdrop-blur-sm pl-3 pr-4 py-1.5 rounded-full flex items-center gap-2 shadow-lg border border-white/80">
                        <div className="w-5 h-5 bg-primary rounded-full flex items-center justify-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="white" className="w-3 h-3">
                            <path fillRule="evenodd" d="M5.166 2.621v.858c-1.035.148-2.059.33-3.071.543a.75.75 0 00-.584.859 6.753 6.753 0 006.138 5.6 6.73 6.73 0 002.743-.356l1.918-.56a.75.75 0 00.453-.358l1.034-2a.75.75 0 00-.15-.850l-2.627-2.596a.75.75 0 00-.452-.223 49.421 49.421 0 00-3.401-.182v-1.86A.75.75 0 006.5 1.5H5.25a.75.75 0 00-.75.75v.371zm3.75 3.773v1.298c0 .369.203.707.528.882l.528.185c1.195.419 2.263.997 3.18 1.68l.204.15 1.516-1.5c.026-.025.065-.05.11-.05A48.7 48.7 0 0018 11.5v2.293a.75.75 0 01-1.5 0v-2.06a47.738 47.738 0 00-2.98-.298 48.05 48.05 0 00-2.491.212 48.38 48.38 0 00-4.67.813v.505a.75.75 0 01-1.5 0v-.63c0-.385.264-.716.644-.804 1.603-.392 3.282-.69 5.034-.86a.75.75 0 00.51-.249l1.526-1.776a.75.75 0 00-.11-1.04 10.295 10.295 0 00-3.539-1.897l-.284-.1a.75.75 0 01-.492-.68v-1.765a.75.75 0 00-.75-.75h-1a.75.75 0 00-.75.75v1.27c-1.516.114-3.01.327-4.468.642a.75.75 0 00-.559.731v.302a.75.75 0 001.5 0v-.085a47.75 47.75 0 013.528-.476z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span className="text-xs font-bold text-brown-800">{award.year} Award</span>
                      </div>
                    </div>
                    
                    {/* Organization tag */}
                    {award.organization && (
                      <div className="absolute top-4 right-4 z-20">
                        <div className="bg-brown-800/80 backdrop-blur-sm px-3 py-1.5 rounded-full">
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
                        className="object-cover transition-transform duration-1000 group-hover:scale-110"
                      />
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow">
                    <h3 className="text-brown-900 text-xl md:text-2xl font-bold mb-2 group-hover:text-primary transition-colors duration-300">{award.title}</h3>
                    <p className="text-brown-700 text-sm leading-relaxed mb-4">{award.subtitle}</p>
                    
                    {award.additionalText && (
                      <div className="mt-auto pt-4 border-t border-brown-100">
                        <p className="text-xs text-brown-600 font-medium">
                          {award.additionalText}
                        </p>
                      </div>
                    )}
                    
                    {/* Read more link */}
                    <div className="mt-4 pt-2">
                      <a href="#" className="inline-flex items-center text-sm font-medium text-primary group/link">
                        <span>View details</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 group-hover/link:translate-x-1 transition-transform">
                          <path d="M5 12h14"></path>
                          <path d="M12 5l7 7-7 7"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
        
        {/* View all awards button */}
        <div className="flex justify-center mt-8">
          <a href="#" className="inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-primary text-primary hover:bg-primary hover:text-white font-semibold rounded-full transition-all duration-300 group">
            <span>View All Awards</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="group-hover:translate-x-1 transition-transform">
              <path d="M5 12h14"></path>
              <path d="M12 5l7 7-7 7"></path>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
};

export default KeyAwardsSlider;