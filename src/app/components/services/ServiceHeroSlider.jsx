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
import React, { useState } from 'react';

// Note: In a real project, you would need to install these packages:
// npm install swiper framer-motion
// Import statement simulations below:
const motion = {
  div: (props) => <div {...props}>{props.children}</div>,
  button: (props) => <button {...props}>{props.children}</button>
};

const Swiper = ({ children, ...props }) => <div className="swiper-container">{children}</div>;
const SwiperSlide = ({ children }) => <div className="swiper-slide">{children}</div>;

const ServiceHeroSlider = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const totalSlides = 4;

  // Function to navigate to the next slide
  const nextSlide = () => {
    setActiveSlide((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
  };

  // Function to navigate to the previous slide
  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
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
    <div className="relative w-full h-screen overflow-hidden bg-gray-900">
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
      <div className="relative z-10 container mx-auto px-4 h-full flex items-center">
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
                <h3 className="inline-block mb-2 py-1 px-3 text-sm font-bold tracking-wider bg-primary-600 text-white rounded">
                  {slide.subtitle}
                </h3>
                
                {/* Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
                  {slide.title}
                </h1>
                
                {/* Description */}
                <p className="text-lg text-gray-200 mb-8 max-w-2xl">
                  {slide.description}
                </p>
                
                {/* Feature bullets */}
                <div className="mb-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {slide.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <div className="flex-shrink-0 mr-2 w-6 h-6 rounded-full bg-primary-600 flex items-center justify-center">
                        <Check size={14} className="text-white" />
                      </div>
                      <span className="text-white">{feature}</span>
                    </div>
                  ))}
                </div>
                
                {/* Action buttons */}
                <div className="flex flex-wrap gap-4">
                  <button className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white rounded-lg flex items-center transition-all duration-300 shadow-lg hover:shadow-primary-600/30">
                    {slide.icon}
                    {slide.actionText}
                  </button>
                  <button className="px-6 py-3 border-2 border-white/30 hover:border-white/60 text-white rounded-lg flex items-center transition-all duration-300">
                    <Phone className="mr-2" size={20} />
                    Call for Assistance
                  </button>
                </div>
              </div>
              
              {/* Info details */}
              <div className="mt-12 flex flex-col md:flex-row gap-6">
                {/* Locations */}
                <div className="flex items-center gap-3 text-white">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/30">
                    <MapPin size={18} className="text-primary-400" />
                  </div>
                  <span>100+ Service Centers Nationwide</span>
                </div>
                
                {/* Hours */}
                <div className="flex items-center gap-3 text-white">
                  <div className="flex items-center justify-center w-8 h-8 rounded-full bg-black/30">
                    <Clock size={18} className="text-primary-400" />
                  </div>
                  <span>Mon-Fri: 8AM-6PM | Sat: 9AM-3PM</span>
                </div>
              </div>
              
              {/* Ratings */}
              <div className="mt-6 flex items-center">
                <div className="flex -space-x-2 mr-4">
                  {[1, 2, 3, 4].map(i => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-gray-900 overflow-hidden">
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
                      <Star key={i} size={16} className="text-yellow-400" fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm">Trusted by <span className="font-semibold text-white">12,000+</span> customers</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Navigation buttons */}
      <div className="absolute z-20 bottom-12 right-12 flex items-center space-x-4">
        <button 
          onClick={prevSlide}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-all duration-300"
        >
          <ChevronLeft size={24} className="text-white" />
        </button>
        <button 
          onClick={nextSlide}
          className="w-12 h-12 rounded-full bg-white/10 hover:bg-primary-600 flex items-center justify-center transition-all duration-300"
        >
          <ChevronRight size={24} className="text-white" />
        </button>
      </div>

      {/* Line-style pagination */}
      <div className="absolute z-20 bottom-12 left-1/2 transform -translate-x-1/2 flex items-center space-x-2">
        {serviceSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-1 rounded-sm transition-all duration-300 ${
              activeSlide === index 
                ? 'w-10 bg-primary-600' 
                : 'w-5 bg-white/30 hover:bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Feature badge */}
      <div className="absolute z-20 top-8 left-8">
        <div className="flex items-center bg-primary-600/90 text-white px-4 py-2 rounded-full shadow-lg">
          <Wrench size={18} className="mr-2" />
          <span className="font-medium">Premium Auto Service</span>
        </div>
      </div>
    </div>
  );
};

export default ServiceHeroSlider;