'use client'

import { ChevronRight } from 'lucide-react';

const ServiceProcess = () => {
  const steps = [
    {
      number: 1,
      title: "Book Appointment",
      description: "Schedule your service appointment online or by phone at your preferred date and time."
    },
    {
      number: 2,
      title: "Vehicle Drop-off",
      description: "Bring your vehicle to our service center where our staff will collect relevant information and requirements."
    },
    {
      number: 3,
      title: "Service & Updates",
      description: "Our technicians perform the required service while keeping you updated throughout the process."
    },
    {
      number: 4,
      title: "Quality Check",
      description: "A comprehensive inspection ensures all work meets our stringent quality standards before delivery."
    }
  ];

  return (
    <section className="py-16 bg-white" aria-labelledby="service-process-title">
      <div className="container mx-auto px-4">
        <h2 id="service-process-title" className="text-3xl md:text-4xl font-bold text-center mb-3">
          Our Service Process
        </h2>
        
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-16">
          Experience our seamless and efficient service process, designed to provide you with exceptional care and convenience.
        </p>
        
        {/* Process Steps */}
        <div className="relative max-w-5xl mx-auto">
          {/* Horizontal connector line (desktop only) */}
          <div className="hidden md:block absolute top-7 left-0 right-0 h-0.5 bg-gray-200 w-3/4 mx-auto z-0" 
               aria-hidden="true" />
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center relative">
                {/* Step Number */}
                <div 
                  className="w-14 h-14 bg-primary-800 text-white flex items-center justify-center text-xl font-bold mb-4 z-10"
                  aria-label={`Step ${step.number}`}
                >
                  {step.number}
                </div>
                
                {/* Step Content */}
                <h3 className="text-lg font-bold mb-3">{step.title}</h3>
                <p className="text-gray-600 text-sm mx-auto max-w-xs">
                  {step.description}
                </p>
                
                {/* Arrow connector (desktop only) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:flex absolute top-7 left-full -translate-x-1/2 z-10" aria-hidden="true">
                    <ChevronRight className="text-red-800 w-6 h-6" />
                  </div>
                )}
                
                {/* Mobile arrow connector (visible only on mobile) */}
                {index < steps.length - 1 && (
                  <div className="md:hidden flex justify-center mt-4" aria-hidden="true">
                    <svg className="w-6 h-6 text-red-800 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        
        {/* Call to Action */}
        <div className="text-center mt-16">
          <button 
            className="px-6 py-3 bg-primary-800 text-white font-medium focus:outline-none"
            aria-label="Book your appointment now"
          >
            Book Your Appointment Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;