'use client'

import { motion } from 'framer-motion';
import { Clock, ExternalLink, Mail, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';

const ServiceCenters = () => {
  const centers = [
    {
      name: "Dhaka Service Center",
      address: "House 123, Road 12, Gulshan Avenue, Dhaka 1212",
      phone: "+880 18XX-XXXXXX",
      email: "dhaka@cherybangladesh.com",
      hours: "8:00 AM - 8:00 PM (Everyday)",
      image: "/images/dhaka-center.jpg",
      mapUrl: "https://maps.google.com/?q=House+123,+Road+12,+Gulshan+Avenue,+Dhaka+1212"
    },
    {
      name: "Chattogram Service Center",
      address: "Plot 456, CDA Avenue, GEC Circle, Chattogram 4000",
      phone: "+880 18XX-XXXXXX",
      email: "ctg@cherybangladesh.com",
      hours: "8:00 AM - 8:00 PM (Everyday)",
      image: "/images/ctg-center.jpg",
      mapUrl: "https://maps.google.com/?q=Plot+456,+CDA+Avenue,+GEC+Circle,+Chattogram+4000"
    },
    {
      name: "Khulna Service Center",
      address: "Plot 789, KDA Avenue, Sonadanga, Khulna 9100",
      phone: "+880 18XX-XXXXXX",
      email: "khulna@cherybangladesh.com",
      hours: "9:00 AM - 7:00 PM (Everyday)",
      image: "/images/khulna-center.jpg",
      mapUrl: "https://maps.google.com/?q=Plot+789,+KDA+Avenue,+Sonadanga,+Khulna+9100"
    }
  ];

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="locations" className="py-24 relative">
      {/* Black gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-black to-gray-950"></div>
      
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Our <span className="text-primary-600">Service</span> Centers
          </h2>
          
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Visit any of our state-of-the-art service centers across Bangladesh
            for professional care for your Chery vehicle.
          </p>
        </motion.div>
        
        {/* Service Centers Grid */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {centers.map((center, index) => (
            <motion.div 
              key={index}
              className="bg-gray-900 border border-gray-800 group overflow-hidden"
              variants={itemVariants}
            >
              {/* Center Image with Overlay */}
              <div className="relative h-48 overflow-hidden">
                <div className="absolute inset-0 bg-black bg-opacity-40 z-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <Image
                  src={center.image}
                  alt={center.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute top-0 left-0 bg-primary-600 text-white py-1 px-3 font-medium z-20">
                  {index === 0 ? "Main Center" : `Branch ${index}`}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-white group-hover:text-primary-600 transition-colors duration-300">
                  {center.name}
                </h3>
                <p className="text-gray-400 text-sm mb-6 border-l-2 border-primary-600 pl-3">
                  {center.address}
                </p>
                
                <div className="space-y-3 mb-6">
                  <div className="flex items-start">
                    <Phone size={16} className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">
                      {center.phone}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <Mail size={16} className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">
                      {center.email}
                    </span>
                  </div>
                  <div className="flex items-start">
                    <Clock size={16} className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">
                      {center.hours}
                    </span>
                  </div>
                </div>
                
                <a 
                  href={center.mapUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full border border-primary-600 text-primary-600 py-3 font-medium group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300"
                >
                  <MapPin size={16} className="mr-2" />
                  GET DIRECTIONS
                  <ExternalLink size={14} className="ml-2" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Map Section */}
        <motion.div 
          className="mt-16 max-w-6xl mx-auto border border-gray-800 bg-gray-900 bg-opacity-60 overflow-hidden"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="p-6 border-b border-gray-800">
            <h3 className="text-xl font-bold text-white flex items-center">
              <MapPin size={20} className="text-primary-600 mr-2" />
              Service Center Network
            </h3>
          </div>
          
          <div className="p-6">
            <div className="aspect-video relative bg-gray-800 flex items-center justify-center">
              {/* Replace with your actual map component */}
              <div className="text-center text-gray-400">
                <MapPin size={48} className="text-primary-600 mx-auto mb-4 opacity-40" />
                <p className="max-w-md mx-auto">
                  Interactive map showing all service center locations. 
                  Find the nearest service center to your location for convenient vehicle maintenance.
                </p>
                
                <button className="mt-4 px-6 py-2 bg-primary-600 text-white flex items-center mx-auto">
                  <MapPin size={16} className="mr-2" />
                  View Full Map
                </button>
              </div>
              
              {/* Optional: Add an iframe with Google Maps or your custom map */}
              {/* <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!..."
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe> */}
            </div>
          </div>
        </motion.div>
        
        {/* Contact Banner */}
        <motion.div 
          className="mt-12 max-w-4xl mx-auto bg-primary-600 bg-opacity-20 border border-primary-600 p-6 text-center"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold text-white mb-2">Need Help Finding a Service Center?</h3>
          <p className="text-gray-300 mb-4">
            Our customer service team is ready to assist you in finding the nearest service center for your Chery vehicle.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="tel:+8801XXXXXXXX" className="flex items-center px-6 py-2 bg-primary-600 text-white">
              <Phone size={16} className="mr-2" />
              Call Hotline
            </a>
            <a href="#book-service" className="flex items-center px-6 py-2 border border-white text-white hover:bg-white hover:text-primary-600 transition-colors duration-300">
              Book Online
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCenters;