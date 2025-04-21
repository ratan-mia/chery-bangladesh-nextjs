'use client'

import { motion } from 'framer-motion';
import { AlertTriangle, ArrowRight, Calendar, ChevronRight, Clock, Info, Wrench } from 'lucide-react';
import { useState } from 'react';

const MaintenanceSchedule = () => {
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedItem, setExpandedItem] = useState(null);
  
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

  // Category labels, icons and colors - updated to match new design system
  const categories = [
    { id: 'all', label: 'All Services', icon: Info },
    { id: 'basic', label: 'Basic Maintenance', icon: Clock, color: '#c4b19c' }, // primary-light
    { id: 'essential', label: 'Essential Services', icon: AlertTriangle, color: '#8c735d' }, // primary-700
    { id: 'major', label: 'Major Services', icon: Wrench, color: '#524336' }  // primary-900
  ];

  const getCategoryColor = (categoryId) => {
    const category = categories.find(cat => cat.id === categoryId);
    return category ? category.color : '#c4b19c'; // Default to primary-light
  };

  const toggleExpandItem = (index) => {
    if (expandedItem === index) {
      setExpandedItem(null);
    } else {
      setExpandedItem(index);
    }
  };

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
    <section className="py-20 relative bg-gray-100">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23000000' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10 max-w-7xl">
        {/* Heading Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Recommended <span className="text-primary-900">Maintenance</span> Schedule
          </h2>
          
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
          
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
              className={`px-5 py-2 flex items-center transition-colors duration-300 ${
                activeCategory === category.id
                  ? 'bg-primary-700 text-white'
                  : 'bg-white bg-opacity-90 text-gray-700 border border-gray-200 hover:border-primary-700 shadow-sm'
              }`}
            >
              <category.icon size={16} className="mr-2" />
              <span className="font-medium">{category.label}</span>
            </button>
          ))}
        </div>
        
        <div className="max-w-6xl mx-auto">
          {/* Maintenance Timeline View */}
          <motion.div 
            className="relative border border-gray-200 bg-white overflow-hidden shadow-md rounded-sm"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-gray-200 flex flex-col md:flex-row justify-between items-center bg-gray-50">
              <h3 className="text-2xl font-bold text-gray-900 mb-4 md:mb-0">Service Schedule</h3>
              
              <div className="flex space-x-6">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#c4b19c' }}></div>
                  <span className="text-gray-700 text-sm">Basic</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#8c735d' }}></div>
                  <span className="text-gray-700 text-sm">Essential</span>
                </div>
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full mr-2" style={{ backgroundColor: '#524336' }}></div>
                  <span className="text-gray-700 text-sm">Major</span>
                </div>
              </div>
            </div>
            
            {/* Timeline Items */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="divide-y divide-gray-200"
            >
              {filteredItems.map((item, index) => (
                <motion.div 
                  key={index}
                  variants={itemVariants}
                  className="transition-colors duration-300 hover:bg-gray-50 group"
                >
                  <div 
                    className="p-6 cursor-pointer"
                    onClick={() => toggleExpandItem(index)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center">
                        <div 
                          className="w-10 h-10 flex items-center justify-center mr-4 flex-shrink-0"
                          style={{ backgroundColor: `${getCategoryColor(item.category)}20` }} // Using color with 20% opacity
                        >
                          <div 
                            className="w-4 h-4 rounded-full" 
                            style={{ backgroundColor: getCategoryColor(item.category) }}
                          ></div>
                        </div>
                        
                        <div>
                          <h3 className="font-bold text-gray-900 group-hover:text-primary-900 transition-colors duration-300">{item.service}</h3>
                          <div className="text-gray-600 text-sm mt-1">{item.interval}</div>
                        </div>
                      </div>
                      
                      <div className="flex items-center">
                        <div 
                          className="hidden md:inline-block text-gray-600 text-sm mr-4 max-w-md truncate"
                        >
                          {item.description}
                        </div>
                        
                        <ChevronRight 
                          size={20} 
                          className={`text-primary-700 transition-transform duration-300 ${expandedItem === index ? 'rotate-90' : ''}`} 
                        />
                      </div>
                    </div>
                    
                    {/* Expanded Content */}
                    {expandedItem === index && (
                      <motion.div 
                        className="mt-6 pl-14 text-gray-600"
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        transition={{ duration: 0.3 }}
                      >
                        <div className="p-4 border-l-2 border-primary-800">
                          <h4 className="text-lg font-medium text-gray-900 mb-2">Service Details</h4>
                          <p className="mb-4">{item.description}</p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="bg-gray-50 p-4 border border-gray-200">
                              <h5 className="text-sm font-medium text-primary-900 mb-2">What's Included</h5>
                              <ul className="space-y-2">
                                <li className="flex items-start">
                                  <div className="w-5 h-5 bg-primary-light bg-opacity-30 flex items-center justify-center mr-2 mt-0.5">
                                    <ArrowRight size={12} className="text-primary-900" />
                                  </div>
                                  <span className="text-sm text-gray-700">Professional inspection</span>
                                </li>
                                <li className="flex items-start">
                                  <div className="w-5 h-5 bg-primary-light bg-opacity-30 flex items-center justify-center mr-2 mt-0.5">
                                    <ArrowRight size={12} className="text-primary-900" />
                                  </div>
                                  <span className="text-sm text-gray-700">Genuine Chery parts</span>
                                </li>
                                <li className="flex items-start">
                                  <div className="w-5 h-5 bg-primary-light bg-opacity-30 flex items-center justify-center mr-2 mt-0.5">
                                    <ArrowRight size={12} className="text-primary-900" />
                                  </div>
                                  <span className="text-sm text-gray-700">Digital service record</span>
                                </li>
                              </ul>
                            </div>
                            <div className="bg-gray-50 p-4 border border-gray-200">
                              <h5 className="text-sm font-medium text-primary-900 mb-2">Recommended At</h5>
                              <div className="flex items-center mb-2">
                                <Calendar size={14} className="text-gray-600 mr-2" />
                                <span className="text-sm text-gray-700">Every {item.interval}</span>
                              </div>
                              <div className="flex items-center">
                                <Clock size={14} className="text-gray-600 mr-2" />
                                <span className="text-sm text-gray-700">Service time: Approx. 1 hour</span>
                              </div>
                            </div>
                          </div>
                          
                          <div className="mt-4 flex justify-end">
                            <button className="px-4 py-2 bg-primary-700 text-white flex items-center hover:bg-primary-900 transition-colors duration-300">
                              Book This Service
                              <ArrowRight size={14} className="ml-2" />
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Footer */}
            <div className="p-6 border-t border-gray-200 bg-gray-50">
              <div className="flex items-start">
                <AlertTriangle size={20} className="text-primary-700 mr-3 mt-0.5 flex-shrink-0" />
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
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.7 }}
            viewport={{ once: true }}
          >
            <a 
              href="#schedule-service" 
              className="inline-flex items-center px-10 py-4 bg-primary-700 text-white font-medium hover:bg-primary-900 transition-colors duration-300"
            >
              Schedule Your Service
              <ArrowRight size={20} className="ml-2" />
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MaintenanceSchedule;