'use client'

const AssistanceCTA = () => {
  return (
    <section className="bg-primary-800 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto bg-gray-100 p-6 md:p-8">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-6">
            Need Immediate Assistance?
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mb-6">
            <button className="bg-primary-800 text-white px-6 py-3 font-medium hover:bg-red-900 transition-colors w-full md:w-auto">
              CALL HOTLINE
            </button>
            
            <div className="text-gray-700 text-center md:text-left">
              Available 24 hours / 7 days
            </div>
            
            <a href="tel:+8801XXX000000" className="bg-primary-800 text-white px-6 py-3 font-medium hover:bg-red-900 transition-colors w-full md:w-auto inline-block text-center">
              <span className="hidden md:inline">CALL NOW: </span>016XX-XXXXXX
            </a>
          </div>
          
          <p className="text-xs text-center text-gray-500">
            We are available 24/7 to attend to your vehicle maintenance, towing and any emergency needs.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AssistanceCTA;