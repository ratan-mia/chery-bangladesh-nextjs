'use client'

import Image from 'next/image';

const RoadsideAssistance = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-2">24/7 Roadside Assistance</h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          Peace of mind on every journey. Our expert team is always ready to help you, anytime it&#39;s required.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Vehicle Recovery */}
          <div className="text-center">
            <div className="bg-red-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <circle cx="9" cy="19" r="2"></circle>
                <circle cx="18" cy="19" r="2"></circle>
                <path d="M12 19h3"></path>
                <path d="M9 19v-6h5.5a3.5 3.5 0 0 1 0 7h-2.5"></path>
                <path d="M6 12V7a2 2 0 0 1 2-2h3l4 4h3a2 2 0 0 1 2 2v1"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Vehicle Recovery</h3>
            <p className="text-gray-600">
              Professional towing services available nationwide. Our team will transport your vehicle safely to the nearest service center.
            </p>
          </div>
          
          {/* Emergency Repairs */}
          <div className="text-center">
            <div className="bg-red-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">Emergency Repairs</h3>
            <p className="text-gray-600">
              Our mobile technicians can perform quick roadside repairs to get you back on the road as quickly as possible.
            </p>
          </div>
          
          {/* 24/7 Support */}
          <div className="text-center">
            <div className="bg-red-800 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
            </div>
            <h3 className="text-xl font-bold mb-2">24/7 Support</h3>
            <p className="text-gray-600">
              Our dedicated call center is available round-the-clock to assist with any emergencies or inquiries you may have.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RoadsideAssistance;