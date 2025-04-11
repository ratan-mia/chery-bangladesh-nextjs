'use client'

import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, Clock, Info } from 'lucide-react';
import { useState } from 'react';

const MaintenanceSchedule = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  
  const maintenanceItems = [
    { 
      service: "Tire Rotation", 
      interval: "10,000 KM", 
      category: "basic",
      description: "Ensures even tire wear and extends tire life while maintaining optimal handling and fuel efficiency."
    },
    { 
      service: "Brake Service", 
      interval: "20,000 KM", 
      category: "essential",
      description: "Comprehensive inspection and servicing of brake components to ensure safe and effective braking performance."
    },
    { 
      service: "Wheel Alignment", 
      interval: "30,000 KM", 
      category: "basic",
      description: "Adjusts the angles of your wheels to manufacturer specifications for optimal tire wear and vehicle handling."
    },
    { 
      service: "Engine Flush", 
      interval: "40,000 KM", 
      category: "major",
      description: "Removes sludge and deposits from your engine's internal components to maintain performance and extend engine life."
    },
    { 
      service: "Intake System Cleaning", 
      interval: "50,000 KM", 
      category: "major",
      description: "Cleans throttle body, intake manifold, and valves to restore proper airflow and improve fuel economy."
    },
    { 
      service: "Brake Pad Inspection or Replace", 
      interval: "40,000 KM", 
      category: "essential",
      description: "Ensures your vehicle's stopping power remains optimal by checking pad thickness and replacing worn components."
    },
    { 
      service: "Battery Inspection or Replace", 
      interval: "60,000 KM", 
      category: "basic",
      description: "Tests battery performance and charging system to prevent unexpected starting failures."
    },
    { 
      service: "Transmission Oil Service", 
      interval: "60,000 KM", 
      category: "major",
      description: "Extends transmission life and maintains shifting quality by replacing fluid and cleaning internal components."
    },
    { 
      service: "Spark Plug Replace", 
      interval: "60,000 KM", 
      category: "essential",
      description: "Restores ignition efficiency and power while improving fuel economy and reducing emissions."
    },
    { 
      service: "Transmission Oil Replace", 
      interval: "80,000 KM", 
      category: "major",
      description: "Complete replacement of transmission fluid to remove contaminants and restore optimal shifting performance."
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? maintenanceItems 
    : maintenanceItems.filter(item => item.category === activeCategory);

  // Category labels and colors
  const categories = [
    { id: 'all', label: 'All Services', icon: Info },
    { id: 'basic', label: 'Basic Maintenance', icon: Clock },
    { id: 'essential', label: 'Essential Services', icon: AlertTriangle },
    { id: 'major', label: 'Major Services', icon: Calendar }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Heading Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Recommended <span className="text-primary-600">Maintenance</span> Schedule
          </h2>
          
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Keep your Chery vehicle performing at its best with our factory-recommended 
            maintenance schedule, designed for optimal reliability and longevity.
          </p>
        </motion.div>
        
        {/* Category Filter Tabs */}
        <div className="flex flex-wrap justify-center mb-12 gap-3">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`px-5 py-2 rounded-sm flex items-center transition-colors duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-200 hover:border-primary-600'
              }`}
            >
              <category.icon size={16} className="mr-2" />
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Timeline View */}
          <motion.div 
            className="relative bg-white rounded-lg shadow-lg overflow-hidden border border-gray-100"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Header */}
            <div className="grid grid-cols-3 bg-gray-50 p-4 border-b border-gray-100">
              <div className="font-bold text-gray-700">Service</div>
              <div className="font-bold text-gray-700 text-center">Recommended Interval</div>
              <div className="font-bold text-gray-700 text-center">Details</div>
            </div>
            
            {/* Items */}
            <motion.div
              className="divide-y divide-gray-100"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {filteredItems.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="grid grid-cols-3 p-6 hover:bg-gray-50 transition-colors duration-300 group"
                >
                  <div className="pr-4">
                    <h3 className="font-bold text-gray-900 group-hover:text-primary-600 transition-colors duration-300">{item.service}</h3>
                    <div className="mt-2 flex items-center">
                      <span className={`px-2 py-0.5 text-xs font-medium rounded-sm ${
                        item.category === 'basic' ? 'bg-blue-100 text-blue-800' :
                        item.category === 'essential' ? 'bg-amber-100 text-amber-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {item.category.charAt(0).toUpperCase() + item.category.slice(1)}
                      </span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-center">
                    <div className="inline-flex items-center bg-primary-50 px-4 py-2 rounded-sm">
                      <div className="h-0.5 w-4 bg-primary-600 mr-2"></div>
                      <span className="font-bold text-primary-600">{item.interval}</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600 pl-4">
                    {item.description}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Footer */}
            <div className="bg-gray-50 p-6 border-t border-gray-100">
              <div className="flex items-start">
                <AlertTriangle size={20} className="text-amber-500 mr-3 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-gray-600">
                  Please note that your actual maintenance needs may vary based on driving conditions, 
                  climate, and vehicle usage. Consult your owner's manual or speak with our service 
                  advisors for personalized recommendations tailored to your specific vehicle model.
                </p>
              </div>
            </div>
          </motion.div>
          
          {/* CTA Section */}
          <motion.div 
            className="mt-12 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <a 
              href="#schedule-service" 
              className="inline-flex items-center px-8 py-4 bg-primary-600 text-white font-medium rounded-sm hover:bg-primary-700 transition-colors duration-300"
            >
              Schedule Your Service
              <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MaintenanceSchedule;