'use client'

import Image from 'next/image';

const PremiumServices = () => {
  const services = [
    {
      title: "Engine Diagnostics",
      description: "Comprehensive engine diagnostics using advanced equipment to identify and resolve performance issues.",
      image: "/api/placeholder/600/400",
      price: "৳ 2,500"
    },
    {
      title: "Full Service Package",
      description: "Complete vehicle maintenance including oil change, filter replacement, and multi-point inspection.",
      image: "/api/placeholder/600/400",
      price: "৳ 7,500"
    },
    {
      title: "Brake Service",
      description: "Professional brake inspection, pad replacement, and complete brake system servicing for optimal safety.",
      image: "/api/placeholder/600/400",
      price: "৳ 4,000"
    },
    {
      title: "AC Service & Repair",
      description: "Climate control system diagnosis, refrigerant recharge, and component repair for maximum comfort.",
      image: "/api/placeholder/600/400",
      price: "৳ 3,500"
    },
    {
      title: "Transmission Service",
      description: "Complete transmission fluid change, filter replacement, and system inspection for smooth shifting.",
      image: "/api/placeholder/600/400",
      price: "৳ 6,000"
    },
    {
      title: "Premium Detailing",
      description: "Professional interior and exterior detailing to restore your vehicle's appearance to showroom quality.",
      image: "/api/placeholder/600/400",
      price: "৳ 8,500"
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Our Premium Services
        </h2>
        
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Expert care for your Chery vehicle with our specialized maintenance and repair services.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {services.map((service, index) => (
            <div key={index} className="bg-white border border-gray-100 shadow-sm overflow-hidden group">
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={service.image}
                  alt={service.title}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              
              {/* Service Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{service.title}</h3>
                <p className="text-gray-600 text-sm mb-4">
                  {service.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <span className="text-red-800 font-bold">{service.price}</span>
                  <button className="text-sm text-gray-700 border border-gray-300 px-3 py-1 hover:bg-gray-50 transition-colors">
                    Book Now
                  </button>
                </div>
              </div>
              
              {/* Bottom Line */}
              <div className="h-1 w-full bg-primary-800"></div>
            </div>
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-primary-800 text-white px-8 py-3 font-medium hover:bg-red-900 transition-colors inline-flex items-center">
            VIEW ALL SERVICES
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2">
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};

export default PremiumServices;