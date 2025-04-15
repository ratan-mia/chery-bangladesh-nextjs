import { motion } from 'framer-motion';
import { Calendar, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import Link from 'next/link';
import React from 'react';

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

  return (
    <div className="relative w-full h-screen overflow-hidden">
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
                {/* Overlay gradient for better text visibility - updated for light theme but still ensuring text readability */}
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900/70 via-gray-900/50 to-gray-900/30"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom navigation arrows */}
      <div className="absolute z-20 w-full top-1/2 -translate-y-1/2 px-4 md:px-10 flex justify-between pointer-events-none">
        <button className="swiper-button-prev-custom w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center border border-white/20 pointer-events-auto hover:bg-primary-700 transition-all duration-300">
          <ChevronLeft size={24} />
        </button>
        <button className="swiper-button-next-custom w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm text-white flex items-center justify-center border border-white/20 pointer-events-auto hover:bg-primary-700 transition-all duration-300">
          <ChevronRight size={24} />
        </button>
      </div>
      
      {/* Custom pagination */}
      <div className="swiper-pagination-custom absolute bottom-8 left-0 right-0 z-20 flex justify-center gap-2"></div>

      {/* Main content overlay */}
      <div className="relative z-10 w-full h-full flex items-center">
        <div className="container mx-auto px-4 md:px-6 lg:px-8">
          <div className="max-w-3xl">
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Badge */}
              <motion.span 
                className="inline-block bg-primary-light/30 text-gray-200 py-1 px-3 rounded-full text-sm font-medium backdrop-blur-sm border border-primary/30"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
              >
                Professional Services
              </motion.span>
              
              {/* Heading */}
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight">
                Expert Auto <span className="text-primary-700">Repair Services</span> You Can Trust
              </h1>
              
              {/* Description */}
              <p className="text-lg md:text-xl text-gray-200 max-w-2xl">
                Our certified technicians provide comprehensive auto repair and maintenance services to keep your vehicle running smoothly and safely.
              </p>
              
              {/* Features */}
              <div className="flex flex-wrap gap-y-3 gap-x-6 text-gray-200 text-sm md:text-base">
                <div className="flex items-center">
                  <ShieldCheck size={18} className="text-primary-700 mr-2" />
                  <span>Certified Mechanics</span>
                </div>
                <div className="flex items-center">
                  <Check size={18} className="text-primary-700 mr-2" />
                  <span>Transparent Pricing</span>
                </div>
                <div className="flex items-center">
                  <Check size={18} className="text-primary-700 mr-2" />
                  <span>Warranty on Services</span>
                </div>
              </div>
              
              {/* CTA buttons */}
              <div className="flex flex-wrap gap-4 mt-8">
                <Link href="#book-service" className="px-6 py-3 bg-primary-700 hover:bg-primary-900 text-white font-medium transition-all duration-300 flex items-center group">
                  Book Appointment
                  <Calendar className="ml-2 w-5 h-5 group-hover:ml-3 transition-all duration-300" />
                </Link>
                <Link href="#locations" className="px-6 py-3 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white font-medium border border-white/30 transition-all duration-300 flex items-center group">
                  Find Us
                  <MapPin className="ml-2 w-5 h-5 group-hover:ml-3 transition-all duration-300" />
                </Link>
              </div>

              {/* Social proof */}
              <motion.div 
                className="mt-12 flex items-center"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1, duration: 0.7 }}
              >
                <div className="flex -space-x-2 mr-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-primary-light bg-gray-200"></div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(i => (
                      <svg key={i} className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-200 text-sm">Trusted by <span className="font-semibold text-white">4,000+</span> satisfied customers</p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom Swiper styles - CSS for pagination lines */}
      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 30px;
          height: 3px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          border-radius: 0;
          transition: all 0.3s ease;
          margin: 0 4px;
          cursor: pointer;
        }
        
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          width: 40px;
          transition: all 0.3s ease;
          background: rgba(196, 177, 156, 1); /* primary-light color */
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