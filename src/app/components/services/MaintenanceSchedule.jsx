'use client'

const MaintenanceSchedule = () => {
  const maintenanceItems = [
    { service: "Tire Rotation", interval: "10,000 KM", color: "text-red-800" },
    { service: "Brake Service", interval: "20,000 KM", color: "text-red-800" },
    { service: "Wheel Alignment", interval: "30,000 KM", color: "text-red-800" },
    { service: "Engine Flush", interval: "40,000 KM", color: "text-red-800" },
    { service: "Intake System Cleaning", interval: "50,000 KM", color: "text-red-800" },
    { service: "Brake Pad Inspection or Replace", interval: "40,000 KM", color: "text-red-800" },
    { service: "Battery Inspection or Replace", interval: "60,000 KM", color: "text-red-800" },
    { service: "Transmission Oil Service", interval: "60,000 KM", color: "text-red-800" },
    { service: "Spark Plug Replace", interval: "60,000 KM", color: "text-red-800" },
    { service: "Transmission Oil Replace", interval: "80,000 KM", color: "text-red-800" }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-4">
          Recommended Maintenance Schedule
        </h2>
        
        <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
          Keep your vehicle in optimal condition with our recommended maintenance schedule.
        </p>
        
        <div className="max-w-5xl mx-auto bg-white rounded shadow-sm border">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-8">
            {maintenanceItems.map((item, index) => (
              <div key={index} className="flex flex-col">
                <h3 className="font-medium text-gray-800 mb-2">{item.service}</h3>
                <div className="flex items-center mt-auto">
                  <div className="h-0.5 w-4 bg-gray-300 mr-2"></div>
                  <span className={`font-bold ${item.color}`}>{item.interval}</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-gray-50 p-6 text-center border-t">
            <p className="text-sm text-gray-500">
              Please note that your actual maintenance needs may vary based on driving conditions, climate, and vehicle usage. Consult your owner's manual or speak with our service advisors for personalized recommendations.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaintenanceSchedule;