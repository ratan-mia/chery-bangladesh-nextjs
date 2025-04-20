import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

// Import Swiper React components and styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const HeroSection = () => {
  // Workshop images - add more as needed
  const workshopImages = [
    '/images/services/workshop.webp',
    '/images/services/workshop-2.webp',
    '/images/services/workshop-3.webp',
    '/images/services/workshop-4.webp',
  ];

  // Add responsive state management
  const [isMobile, setIsMobile] = useState(false);

  // Add effect to check window size on mount and resize
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    // Check on first render
    checkMobile();
    // Add event listener
    window.addEventListener('resize', checkMobile);
    // Cleanup
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="relative w-full h-[100svh] overflow-hidden">
      {/* Full-width Swiper slider */}
      <div className="absolute inset-0 z-0">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade]}
          effect="fade"
          speed={1000}
          slidesPerView={1}
          navigation={{
            nextEl: '.swiper-button-next-custom',
            prevEl: '.swiper-button-prev-custom',
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination-custom',
          }}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          loop={true}
          className="w-full h-full"
        >
          {workshopImages.map((image, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${image})`,
                }}
              >
                {/* Overlay gradient - more pronounced on mobile for better text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/80 via-gray-900/60 to-gray-900/40 md:from-gray-900/70 md:via-gray-900/50 md:to-gray-900/30"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom navigation arrows - hidden on mobile, visible on tablets and up */}
      <div className="absolute z-20 w-full top-1/2 -translate-y-1/2 px-4 md:px-10 hidden md:flex justify-between pointer-events-none">
        <button className="swiper-button-prev-custom w-12 h-12 bg-white/20 backdrop-blur-sm text-white flex items-center justify-center border border-white/20 pointer-events-auto hover:bg-primary-700 transition-all duration-300">
          <ChevronLeft size={24} />
        </button>
        <button className="swiper-button-next-custom w-12 h-12 bg-white/20 backdrop-blur-sm text-white flex items-center justify-center border border-white/20 pointer-events-auto hover:bg-primary-700 transition-all duration-300">
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Custom pagination - adjusted position for mobile */}
      <div className="swiper-pagination-custom absolute bottom-4 md:bottom-8 left-0 right-0 z-20 flex justify-center gap-2"></div>

      {/* Main content overlay */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-full md:max-w-3xl">
            <motion.div
              className="space-y-4 md:space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <motion.span 
                className="inline-block bg-primary-light/30 text-gray-200 py-1 px-3 text-xs sm:text-sm font-medium backdrop-blur-sm border border-primary/30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Professional Services
              </motion.span>
              
              {/* Heading - responsive text sizes */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
              <span className="text-primary-700">Chery Service</span><br />
              Expert Auto Repair Services You Can Trust
              </h1>
              
              {/* Description - responsive text */}
              <p className="text-base sm:text-lg md:text-xl text-gray-200 max-w-full md:max-w-2xl">
                Our certified technicians provide comprehensive auto repair and maintenance services to keep your vehicle running smoothly and safely.
              </p>
              
              {/* Features - stacked on mobile, flex on larger screens */}
              <div className="flex flex-col sm:flex-row flex-wrap gap-y-2 sm:gap-y-3 gap-x-6 text-gray-200 text-sm md:text-base">
                <div className="flex items-center">
                  <ShieldCheck size={isMobile ? 16 : 18} className="text-primary-700 mr-2" />
                  <span>Certified Mechanics</span>
                </div>
                <div className="flex items-center">
                  <Check size={isMobile ? 16 : 18} className="text-primary-700 mr-2" />
                  <span>Transparent Pricing</span>
                </div>
                <div className="flex items-center">
                  <Check size={isMobile ? 16 : 18} className="text-primary-700 mr-2" />
                  <span>Warranty on Services</span>
                </div>
              </div>
              
              {/* CTA buttons - full width on mobile, auto on larger screens */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8 w-full">
                <Link href="#book-service" className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-primary-700 hover:bg-primary-900 text-white font-medium transition-all duration-300 flex items-center justify-center sm:justify-start group">
                  Book Appointment
                  <Calendar className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:ml-3 transition-all duration-300" />
                </Link>
                <Link href="#locations" className="w-full sm:w-auto px-4 sm:px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium border border-white/30 transition-all duration-300 flex items-center justify-center sm:justify-start group">
                  Find Us on Map
                  <MapPin className="ml-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:ml-3 transition-all duration-300" />
                </Link>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom Swiper styles - CSS for pagination lines */}
      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 20px;
          height: 3px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          border-radius: 0;
          transition: all 0.3s ease;
          margin: 0 3px;
          cursor: pointer;
        }
        
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          width: 30px;
          transition: all 0.3s ease;
          background: rgba(196, 177, 156, 1); /* primary-light color */
        }
        
        @media (min-width: 768px) {
          .swiper-pagination-custom .swiper-pagination-bullet {
            width: 30px;
            margin: 0 4px;
          }
          
          .swiper-pagination-custom .swiper-pagination-bullet-active {
            width: 40px;
          }
        }
      `}</style>
    </div>
  );
};

// Import icons
const Check = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <polyline points="20 6 9 17 4 12"></polyline>
  </svg>
);

const ShieldCheck = ({ size, className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
    <polyline points="9 12 11 14 15 10"></polyline>
  </svg>
);

export default HeroSection;