import { motion } from 'framer-motion';
import {
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Settings,
  Star,
  Wrench
} from 'lucide-react';
import React from 'react';

// Import Swiper React components and styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const ServiceHeroSlider = () => {
  // Service center slides with content
  const serviceSlides = [
    {
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=1920&auto=format&fit=crop',
      title: 'Professional Auto Service',
      subtitle: 'CERTIFIED TECHNICIANS',
      description: 'State-of-the-art diagnostic equipment and trained technicians to keep your vehicle running at peak performance.',
      actionText: 'Schedule Service',
      icon: <Wrench className="mr-2" size={20} />
    },
    {
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1920&auto=format&fit=crop',
      title: 'Genuine Parts Guarantee',
      subtitle: 'FACTORY AUTHORIZED',
      description: 'We use only genuine manufacturer parts to ensure the quality, reliability, and longevity of your vehicle.',
      actionText: 'Browse Parts',
      icon: <Settings className="mr-2" size={20} />
    },
    {
      image: 'https://images.unsplash.com/photo-1600259828526-77f8617ceec9?q=80&w=1920&auto=format&fit=crop',
      title: 'Express Maintenance',
      subtitle: 'QUICK SERVICE',
      description: 'Get your vehicle serviced quickly with our express maintenance program. Oil changes, tire rotations, and more in under an hour.',
      actionText: 'Quick Appointment',
      icon: <Clock className="mr-2" size={20} />
    },
    {
      image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1920&auto=format&fit=crop',
      title: 'Complete Vehicle Care',
      subtitle: 'COMPREHENSIVE SERVICE',
      description: 'From routine maintenance to major repairs, our service centers provide comprehensive care for all your vehicle needs.',
      actionText: 'View Services',
      icon: <Car className="mr-2" size={20} />
    }
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
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
          {serviceSlides.map((slide, index) => (
            <SwiperSlide key={index} className="w-full h-full">
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{ 
                  backgroundImage: `url(${slide.image})`,
                }}
              >
                {/* Overlay for better text visibility */}
                <div className="absolute inset-0 bg-black/50"></div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom navigation arrows */}
      <div className="absolute inset-0 z-10 flex items-center justify-between px-4 md:px-8">
        <button className="swiper-button-prev-custom w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-sm hover:bg-primary transition duration-300">
          <ChevronLeft size={24} />
        </button>
        <button className="swiper-button-next-custom w-10 h-10 rounded-full bg-black/30 text-white flex items-center justify-center backdrop-blur-sm hover:bg-primary transition duration-300">
          <ChevronRight size={24} />
        </button>
      </div>

      {/* Custom pagination */}
      <div className="swiper-pagination-custom absolute bottom-8 left-0 right-0 z-10 flex justify-center"></div>

      {/* Content overlay */}
      <div className="absolute inset-0 z-10 flex items-center">
        <div className="container mx-auto px-4 md:px-8 py-12">
          <div className="w-full md:w-9/12 lg:w-7/12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.7 }}
            >
              {serviceSlides.map((slide, index) => (
                <div key={index} className={`swiper-slide-content ${index === 0 ? 'block' : 'hidden'}`}>
                  <h3 className="uppercase text-primary tracking-wider font-medium text-sm md:text-base mb-2">
                    {slide.subtitle}
                  </h3>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                    {slide.title}
                  </h1>
                  <p className="text-gray-200 text-base md:text-lg mb-8 max-w-xl">
                    {slide.description}
                  </p>
                  
                  {/* Service features */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary mr-3">
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="text-white">Factory-Trained Technicians</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary mr-3">
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="text-white">Genuine Parts & Accessories</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary mr-3">
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="text-white">Digital Vehicle Inspection</span>
                    </div>
                    <div className="flex items-center">
                      <div className="flex items-center justify-center w-6 h-6 rounded-full bg-primary mr-3">
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="text-white">Service Warranty Included</span>
                    </div>
                  </div>
                  
                  {/* Action buttons */}
                  <div className="flex flex-wrap gap-4">
                    <button className="flex items-center px-6 py-3 bg-primary hover:bg-primary/90 text-white font-medium rounded-full transition duration-300">
                      {slide.icon}
                      {slide.actionText}
                    </button>
                    <button className="flex items-center px-6 py-3 border border-white/50 hover:bg-white/10 text-white font-medium rounded-full transition duration-300">
                      <Phone size={20} className="mr-2" />
                      Call for Assistance
                    </button>
                  </div>
                </div>
              ))}
            </motion.div>
            
            <motion.div 
              className="mt-10"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Location */}
                <div className="flex items-center gap-3 text-white">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/30">
                    <MapPin size={18} className="text-primary" />
                  </div>
                  <span>100+ Service Centers Nationwide</span>
                </div>
                
                {/* Hours */}
                <div className="flex items-center gap-3 text-white">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/30">
                    <Clock size={18} className="text-primary" />
                  </div>
                  <span>Mon-Fri: 8AM-6PM | Sat: 9AM-3PM</span>
                </div>
              </div>
                
              {/* Ratings */}
              <div className="mt-6 flex items-center">
                <div className="flex -space-x-2 mr-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 bg-gray-600"></div>
                  ))}
                </div>
                <div>
                  <div className="flex items-center">
                    {[1, 2, 3, 4, 5].map(i => (
                      <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm">Trusted by <span className="font-semibold text-white">12,000+</span> customers</p>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Custom Swiper styles - CSS for pagination bullets */}
      <style jsx global>{`
        .swiper-pagination-custom .swiper-pagination-bullet {
          width: 10px;
          height: 10px;
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
          transition: all 0.3s ease;
          margin: 0 4px;
          cursor: pointer;
        }
        .swiper-pagination-custom .swiper-pagination-bullet-active {
          width: 30px;
          border-radius: 5px;
          background: var(--color-primary);
        }
      `}</style>
    </div>
  );
};

export default ServiceHeroSlider;