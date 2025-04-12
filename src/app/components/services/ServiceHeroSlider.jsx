'use client'

import {
  Car,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Phone,
  Settings,
  Wrench
} from 'lucide-react';
import { useEffect, useState } from 'react';

const ServiceHeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const totalSlides = 4;

  // Auto rotation for slides
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isAnimating) {
        handleNextSlide();
      }
    }, 7000);
    
    return () => clearInterval(interval);
  }, [activeSlide, isAnimating]);

  // Function to navigate to the next slide
  const handleNextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  // Function to navigate to the previous slide
  const handlePrevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  // Function to directly select a slide
  const goToSlide = (index) => {
    if (isAnimating || index === activeSlide) return;
    
    setIsAnimating(true);
    setActiveSlide(index);
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 700);
  };

  // Service center slides with content
  const serviceSlides = [
    {
      image: 'https://images.unsplash.com/photo-1625047509248-ec889cbff17f?q=80&w=1920&auto=format&fit=crop',
      title: 'Professional Auto Service',
      subtitle: 'CERTIFIED TECHNICIANS',
      description: 'State-of-the-art diagnostic equipment and trained technicians to keep your vehicle running at peak performance.',
      actionText: 'Schedule Service',
      icon: <Wrench className="mr-2" size={20} />,
      features: [
        'ASE-Certified Technicians',
        'Comprehensive Diagnostics',
        'Factory-Trained Staff'
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1487754180451-c456f719a1fc?q=80&w=1920&auto=format&fit=crop',
      title: 'Genuine Parts Guarantee',
      subtitle: 'FACTORY AUTHORIZED',
      description: 'We use only genuine manufacturer parts to ensure the quality, reliability, and longevity of your vehicle.',
      actionText: 'Browse Parts',
      icon: <Settings className="mr-2" size={20} />,
      features: [
        'OEM Quality Parts',
        'Extended Warranties',
        'Perfect Fitment Guarantee'
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1600259828526-77f8617ceec9?q=80&w=1920&auto=format&fit=crop',
      title: 'Express Maintenance',
      subtitle: 'QUICK SERVICE',
      description: 'Get your vehicle serviced quickly with our express maintenance program. Oil changes, tire rotations, and more in under an hour.',
      actionText: 'Quick Appointment',
      icon: <Clock className="mr-2" size={20} />,
      features: [
        'Service in 60 Minutes or Less',
        'No Appointment Necessary',
        'Complimentary Multi-Point Inspection'
      ]
    },
    {
      image: 'https://images.unsplash.com/photo-1493238792000-8113da705763?q=80&w=1920&auto=format&fit=crop',
      title: 'Complete Vehicle Care',
      subtitle: 'COMPREHENSIVE SERVICE',
      description: 'From routine maintenance to major repairs, our service centers provide comprehensive care for all your vehicle needs.',
      actionText: 'View Services',
      icon: <Car className="mr-2" size={20} />,
      features: [
        'Full-Service Maintenance',
        'Advanced Repair Capabilities',
        'Multi-Vehicle Expertise'
      ]
    }
  ];

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/texture-dots.svg')] opacity-5 pointer-events-none z-10"></div>
      
      {/* Background slides */}
      <div className="absolute inset-0 z-0">
        {serviceSlides.map((slide, index) => (
          <div 
            key={index}
            className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${
              activeSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
            style={{
              backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.75)), url(${slide.image})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-20 container mx-auto px-4 h-full flex items-center">
        <div className="w-full">
          {/* Slide content */}
          {serviceSlides.map((slide, index) => (
            <div 
              key={index}
              className={`transition-all duration-700 ${
                activeSlide === index 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-8 absolute'
              }`}
              style={{ pointerEvents: activeSlide === index ? 'auto' : 'none' }}
            >
              <div className="max-w-3xl">
                {/* Subtitle */}
                <div className="inline-block mb-4 py-1 px-3 border-l-4 border-primary-600 bg-black bg-opacity-50">
                  <span className="text-sm font-medium tracking-wider text-primary-600">
                    {slide.subtitle}
                  </span>
                </div>
                
                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                  {slide.title}
                </h1>
                
                <div className="w-24 h-1 bg-primary-600 mb-6"></div>
                
                {/* Description */}
                <p className="text-lg text-gray-300 mb-8 max-w-2xl leading-relaxed">
                  {slide.description}
                </p>
                
                {/* Feature bullets */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {slide.features.map((feature, i) => (
                    <div key={i} className="flex items-center group">
                      <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-black border border-primary-600 flex items-center justify-center group-hover:bg-primary-600 transition-colors duration-300">
                        <Check size={14} className="text-primary-600 group-hover:text-white transition-colors duration-300" />
                      </div>
                      <span className="text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="px-8 py-3 bg-primary-600 text-white hover:bg-transparent hover:text-primary-600 border-2 border-primary-600 transition-colors duration-300 font-medium flex items-center">
                    {slide.icon}
                    {slide.actionText}
                  </button>
                  <button className="px-8 py-3 border-2 border-gray-800 text-white hover:border-primary-600 hover:text-primary-600 transition-colors duration-300 font-medium flex items-center">
                    <Phone className="mr-2" size={20} />
                    Call for Assistance
                  </button>
                </div>
              </div>
              
              {/* Info details */}
              <div className="mt-12 flex flex-col md:flex-row gap-6">
                {/* Locations */}
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black border border-gray-800">
                    <MapPin size={18} className="text-primary-600" />
                  </div>
                  <span>100+ Service Centers Nationwide</span>
                </div>
                
                {/* Hours */}
                <div className="flex items-center gap-3 text-gray-300">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black border border-gray-800">
                    <Clock size={18} className="text-primary-600" />
                  </div>
                  <span>Mon-Fri: 8AM-6PM | Sat: 9AM-3PM</span>
                </div>
              </div>
              
              {/* Ratings */}
              <div className="mt-8 p-4 bg-black bg-opacity-50 border border-gray-800 inline-block">
                <div className="flex items-center">
                  <div className="flex -space-x-2 mr-4">
                    {[1, 2, 3, 4].map(i => (
                      <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-800 overflow-hidden">
                        <img 
                          src={`https://randomuser.me/api/portraits/men/${i + 10}.jpg`} 
                          alt="Customer" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className="flex items-center">
                      {[1, 2, 3, 4, 5].map(i => (
                        <div key={i} className="text-primary-600">
                          <svg 
                            xmlns="http://www.w3.org/2000/svg" 
                            width="16" 
                            height="16" 
                            viewBox="0 0 24 24" 
                            fill="currentColor" 
                            stroke="currentColor" 
                            strokeWidth="1" 
                            strokeLinecap="round" 
                            strokeLinejoin="round"
                          >
                            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                          </svg>
                        </div>
                      ))}
                    </div>
                    <p className="text-gray-300 text-sm">Trusted by <span className="font-semibold text-white">12,000+</span> customers</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute z-20 bottom-12 right-12 flex items-center space-x-4">
        <button 
          onClick={handlePrevSlide}
          disabled={isAnimating}
          className="w-12 h-12 rounded-full border border-gray-800 hover:border-primary-600 flex items-center justify-center transition-colors duration-300"
        >
          <ChevronLeft size={24} className="text-white hover:text-primary-600" />
        </button>
        <button 
          onClick={handleNextSlide}
          disabled={isAnimating}
          className="w-12 h-12 rounded-full border border-gray-800 hover:border-primary-600 flex items-center justify-center transition-colors duration-300"
        >
          <ChevronRight size={24} className="text-white hover:text-primary-600" />
        </button>
      </div>

      {/* Line-style pagination */}
      <div className="absolute z-20 bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
        {serviceSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            disabled={isAnimating}
            className={`h-1 rounded-sm transition-all duration-300 ${
              activeSlide === index 
                ? 'w-12 bg-primary-600' 
                : 'w-6 bg-gray-800 hover:bg-gray-700'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Feature badge */}
      <div className="absolute z-20 top-8 left-8">
        <div className="bg-black bg-opacity-50 border border-gray-800 border-t-4 border-t-primary-600 text-white px-6 py-3 shadow-2xl">
          <div className="flex items-center">
            <Wrench size={18} className="mr-2 text-primary-600" />
            <span className="font-medium">Chery Premium Auto Service</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceHeroSlider;