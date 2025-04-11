'use client'

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
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Our Service Process
        </h2>
        
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Experienced seamless and efficient service process, designed to provide you with exceptional care and convenience.
        </p>
        
        {/* Process Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center text-center mb-8 md:mb-0">
                {/* Step Number */}
                <div className="w-14 h-14 bg-red-800 text-white rounded-full flex items-center justify-center text-xl font-bold mb-4">
                  {step.number}
                </div>
                
                {/* Step Content */}
                <h3 className="text-lg font-bold mb-2">{step.title}</h3>
                <p className="text-gray-600 text-sm max-w-xs">
                  {step.description}
                </p>
                
                {/* Connector Line - Only for steps before the last one */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute left-0 right-0">
                    <div className="border-t-2 border-dashed border-gray-300 w-full absolute top-7 z-0"></div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          {/* Line connecting steps - visible on desktop */}
          <div className="hidden md:block relative h-0.5 bg-gray-200 w-3/4 mx-auto mt-7 -translate-y-36 z-0">
            <div className="absolute inset-0 w-full h-full flex justify-between items-center">
              {steps.slice(0, -1).map((_, index) => (
                <div key={index} className="relative flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800">
                    <polyline points="9 18 15 12 9 6"></polyline>
                  </svg>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceProcess;