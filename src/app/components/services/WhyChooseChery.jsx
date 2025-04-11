'use client'

import Image from 'next/image';

const WhyChooseChery = () => {
  const reasons = [
    {
      title: "Factory Trained Technicians",
      description: "Our certified technicians receive extensive training directly from Chery International to provide expert service for your vehicle.",
      icon: "/api/placeholder/120/120" // Replace with actual icon path
    },
    {
      title: "State-of-the-Art Diagnostics",
      description: "Advanced diagnostic equipment specifically designed for Chery vehicles, ensuring accurate problem identification and efficient repairs.",
      icon: "/api/placeholder/120/120" // Replace with actual icon path
    },
    {
      title: "Genuine OEM Parts",
      description: "We exclusively use genuine Chery parts that meet the highest quality standards, maintaining your vehicle's performance and value.",
      icon: "/api/placeholder/120/120" // Replace with actual icon path
    },
    {
      title: "Digital Service Records",
      description: "Complete digital maintenance history for your vehicle, accessible anytime to help maintain warranty coverage and resale value.",
      icon: "/api/placeholder/120/120" // Replace with actual icon path
    },
    {
      title: "Warranty Protection",
      description: "Our certified service ensures your warranty remains valid, protecting your investment for the full warranty period.",
      icon: "/api/placeholder/120/120" // Replace with actual icon path
    },
    {
      title: "Premium Customer Care",
      description: "Personalized service approach with dedicated advisors who understand your vehicle needs and preferences.",
      icon: "/api/placeholder/120/120" // Replace with actual icon path
    }
  ];

  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">
          Why Choose Chery Bangladesh
        </h2>
        
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Experience premium automotive care with the confidence that comes from choosing an authorized service provider.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {reasons.map((reason, index) => (
            <div key={index} className="bg-white p-6 shadow-sm border border-gray-100 flex flex-col">
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 mr-4 relative flex-shrink-0">
                  <Image
                    src={reason.icon}
                    alt={reason.title}
                    width={48}
                    height={48}
                    className="object-contain"
                  />
                </div>
                <h3 className="text-lg font-bold text-gray-900">{reason.title}</h3>
              </div>
              <p className="text-gray-600 text-sm flex-grow">
                {reason.description}
              </p>
              <div className="mt-4 flex justify-start">
                <div className="h-0.5 w-12 bg-red-800"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyChooseChery;