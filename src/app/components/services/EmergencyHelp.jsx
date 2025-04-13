'use client'

const EmergencyAssistance = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-4">
          24/7 Premium Roadside Assistance
        </h2>
        
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Round-the-clock support for Chery owners across Bangladesh. Our certified technicians are ready to help you anytime, anywhere.
        </p>
        
        {/* Emergency Support Number */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex flex-col items-center">
            <p className="text-gray-600 mb-3">24/7 Emergency Support:</p>
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
              </svg>
              <span className="text-2xl md:text-3xl font-bold text-red-800">09639119977</span>
            </div>
          </div>
        </div>
        
        {/* Emergency Assistance Request Form */}
        <div className="max-w-4xl mx-auto bg-white p-8 border border-gray-200 shadow-sm">
          <h3 className="text-2xl font-bold text-center mb-6">
            Request Emergency Assistance
          </h3>
          
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
              <select className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800">
                <option value="">Select Your Vehicle</option>
                <option value="tiggo4pro">Tiggo 4 Pro</option>
                <option value="tiggo7pro">Tiggo 7 Pro</option>
                <option value="tiggo8pro">Tiggo 8 Pro</option>
                <option value="arrizo6">Arrizo 6</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Assistance Type</label>
              <select className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800">
                <option value="">Select Service</option>
                <option value="towing">Towing Service</option>
                <option value="flat-tire">Flat Tire</option>
                <option value="battery">Battery Jump Start</option>
                <option value="lockout">Vehicle Lockout</option>
                <option value="fuel">Fuel Delivery</option>
                <option value="other">Other Emergency</option>
              </select>
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-700">Your Location</label>
              <input
                type="text"
                placeholder="Enter your current location"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Contact Number</label>
              <input
                type="text"
                placeholder="Your contact number"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">Your Name</label>
              <input
                type="text"
                placeholder="Enter your name"
                className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800"
              />
            </div>
            
            <div className="md:col-span-2">
              <button
                type="submit"
                className="w-full bg-primary-800 text-white py-4 px-6 font-medium hover:bg-red-900 transition-colors uppercase"
              >
                REQUEST EMERGENCY ASSISTANCE
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmergencyAssistance;