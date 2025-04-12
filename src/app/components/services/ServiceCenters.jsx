'use client'

import { motion } from 'framer-motion';
import { Calendar, Check, ChevronRight, Clock, Mail, MapPin, Navigation, Phone } from 'lucide-react';
import Image from 'next/image';

const ServiceCenters = () => {
  const centers = [
    {
      name: "Dhaka Service Center (Headquarters)",
      address: "206/1-207/1 Bir Uttam Mir Shawkat Sarak, Tejgaon Gulshan Link Road, Dhaka",
      phone: "09639119977",
      email: "info@cherybd.com",
      hours: "8:00 AM - 8:00 PM (Everyday)",
      features: ["24/7 Emergency Support", "Advanced Diagnostics", "Express Service"],
      image: "/images/dhaka-center.jpg",
      mapUrl: "https://maps.google.com/?q=206/1-207/1+Bir+Uttam+Mir+Shawkat+Sarak+Tejgaon+Gulshan+Link+Road+Dhaka"
    },
    {
      name: "Chattogram Service Center",
      address: "Plot 456, CDA Avenue, GEC Circle, Chattogram 4000",
      phone: "09639119977",
      email: "info@cherybd.com",
      hours: "8:00 AM - 8:00 PM (Everyday)",
      features: ["Genuine Parts Center", "Body & Paint Shop", "Warranty Service"],
      image: "/images/ctg-center.jpg",
      mapUrl: "https://maps.google.com/?q=Plot+456,+CDA+Avenue,+GEC+Circle,+Chattogram+4000"
    },
    {
      name: "Khulna Service Center",
      address: "Plot 789, KDA Avenue, Sonadanga, Khulna 9100",
      phone: "09639119977",
      email: "info@cherybd.com",
      hours: "9:00 AM - 7:00 PM (Everyday)",
      features: ["Multi-Point Inspection", "Air Conditioning Service", "Battery Service"],
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
    <section id="locations" className="py-24 relative bg-gradient-to-b from-black via-[#0a0a0a] to-black">
      {/* Background texture */}
      <div className="absolute inset-0 bg-[url('/texture-dots.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        {/* Heading Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our <span className="text-primary-600">Service</span> Centers
          </h2>
          
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          
          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Visit any of our state-of-the-art service centers across Bangladesh
            for professional care for your Chery vehicle.
          </p>
        </motion.div>
        
        {/* Quick Contact Banner */}
        <motion.div 
          className="max-w-6xl mx-auto mb-12 p-6 bg-[#0f0f0f] border border-gray-800"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 bg-primary-600 flex items-center justify-center mr-4 shadow-lg">
                <Phone size={24} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Need immediate assistance?</p>
                <a href="tel:09639119977" className="text-white text-lg font-medium hover:text-primary-600 transition-colors">
                  09639119977
                </a>
              </div>
            </div>
            
            <div className="h-12 border-l border-gray-800 mx-4 hidden md:block"></div>
            
            <div className="flex items-center mb-4 md:mb-0">
              <div className="w-12 h-12 bg-black border border-gray-800 flex items-center justify-center mr-4">
                <Mail size={24} className="text-primary-600" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email us at</p>
                <a href="mailto:info@cherybd.com" className="text-white text-lg font-medium hover:text-primary-600 transition-colors">
                  info@cherybd.com
                </a>
              </div>
            </div>
            
            <div className="h-12 border-l border-gray-800 mx-4 hidden md:block"></div>
            
            <div className="flex items-center">
              <div className="w-12 h-12 bg-black border border-gray-800 flex items-center justify-center mr-4">
                <Calendar size={24} className="text-primary-600" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Book a service</p>
                <a href="#book-appointment" className="text-white text-lg font-medium hover:text-primary-600 transition-colors">
                  Schedule Online
                </a>
              </div>
            </div>
          </div>
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
              className="bg-[#0f0f0f] border border-gray-800 group overflow-hidden shadow-2xl"
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
                <div className="absolute top-0 left-0 bg-primary-600 text-white py-1 px-3 text-sm font-medium z-20">
                  {index === 0 ? "HEADQUARTERS" : `BRANCH ${index}`}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold mb-3 text-white group-hover:text-primary-600 transition-colors duration-300">
                  {center.name}
                </h3>
                
                <div className="flex items-start mb-4">
                  <MapPin size={18} className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {center.address}
                  </p>
                </div>
                
                <div className="space-y-3 mb-6 border-t border-gray-800 pt-4">
                  <div className="flex items-start">
                    <Phone size={16} className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <a href={`tel:${center.phone}`} className="text-sm text-gray-300 hover:text-primary-600 transition-colors">
                      {center.phone}
                    </a>
                  </div>
                  <div className="flex items-start">
                    <Mail size={16} className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <a href={`mailto:${center.email}`} className="text-sm text-gray-300 hover:text-primary-600 transition-colors">
                      {center.email}
                    </a>
                  </div>
                  <div className="flex items-start">
                    <Clock size={16} className="text-primary-600 mr-3 mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-gray-300">
                      {center.hours}
                    </span>
                  </div>
                </div>
                
                {/* Feature badges */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {center.features.map((feature, i) => (
                    <span key={i} className="text-xs bg-black border border-gray-800 text-gray-300 px-2 py-1">
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex gap-2">
                  <a 
                    href={center.mapUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center border-2 border-primary-600 text-primary-600 py-3 font-medium hover:bg-primary-600 hover:text-white transition-colors duration-300"
                  >
                    <Navigation size={16} className="mr-2" />
                    DIRECTIONS
                  </a>
                  
                  <a 
                    href="#book-appointment" 
                    className="flex-1 flex items-center justify-center bg-primary-600 text-white py-3 font-medium hover:bg-transparent hover:text-primary-600 border-2 border-primary-600 transition-colors duration-300"
                  >
                    <Calendar size={16} className="mr-2" />
                    BOOK SERVICE
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Map Section */}
        <motion.div 
          className="mt-16 max-w-6xl mx-auto border border-gray-800 bg-[#0f0f0f] overflow-hidden shadow-2xl"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.7 }}
          viewport={{ once: true }}
        >
          <div className="p-6 border-b border-gray-800 flex items-center justify-between">
            <h3 className="text-xl font-bold text-white flex items-center">
              <MapPin size={20} className="text-primary-600 mr-2" />
              Nationwide Service Network
            </h3>
            <span className="text-gray-400 text-sm">3 Locations & Growing</span>
          </div>
          
          <div className="p-6">
            <div className="aspect-video relative bg-black border border-gray-800 flex items-center justify-center">
              {/* Replace with your actual map component */}
              <div className="text-center text-gray-400 p-8">
                <MapPin size={48} className="text-primary-600 mx-auto mb-4 opacity-40" />
                <h4 className="text-white text-xl font-medium mb-2">Find Your Nearest Service Center</h4>
                <p className="max-w-lg mx-auto mb-6 text-gray-300">
                  Our comprehensive network of service centers ensures expert Chery maintenance is always nearby. 
                  Each location is equipped with advanced diagnostic tools and genuine parts for optimal service.
                </p>
                
                <button className="px-8 py-3 bg-primary-600 text-white flex items-center mx-auto border-2 border-primary-600 hover:bg-transparent hover:text-primary-600 transition-colors">
                  <MapPin size={18} className="mr-2" />
                  Open Interactive Map
                  <ChevronRight size={18} className="ml-2" />
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
        
        {/* Expanded Contact Information */}
        <motion.div 
          className="mt-16 max-w-6xl mx-auto"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Contact Information */}
            <div className="bg-[#0f0f0f] border border-gray-800 p-6 h-full">
              <h3 className="text-xl font-bold text-white mb-6 flex items-center">
                <Phone size={20} className="text-primary-600 mr-2" />
                Contact Information
              </h3>
              
              <div className="space-y-6">
                <div>
                  <h4 className="text-white font-medium mb-2">Customer Service</h4>
                  <div className="flex items-center mb-2">
                    <Phone size={16} className="text-primary-600 mr-3 flex-shrink-0" />
                    <a href="tel:09639119977" className="text-gray-300 hover:text-primary-600 transition-colors">
                      09639119977
                    </a>
                  </div>
                  <div className="flex items-center">
                    <Mail size={16} className="text-primary-600 mr-3 flex-shrink-0" />
                    <a href="mailto:info@cherybd.com" className="text-gray-300 hover:text-primary-600 transition-colors">
                      info@cherybd.com
                    </a>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Emergency Roadside Assistance</h4>
                  <div className="flex items-center">
                    <Phone size={16} className="text-primary-600 mr-3 flex-shrink-0" />
                    <a href="tel:09639119977" className="text-gray-300 hover:text-primary-600 transition-colors">
                      09639119977 (24/7)
                    </a>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Head Office Address</h4>
                  <div className="flex items-start">
                    <MapPin size={16} className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                    <p className="text-gray-300">
                      206/1-207/1 Bir Uttam Mir Shawkat Sarak<br />
                      Tejgaon Gulshan Link Road, Dhaka<br />
                      Bangladesh
                    </p>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-white font-medium mb-2">Business Hours</h4>
                  <div className="flex items-start">
                    <Clock size={16} className="text-primary-600 mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <p className="text-gray-300">Monday - Friday: 8:00 AM - 8:00 PM</p>
                      <p className="text-gray-300">Saturday - Sunday: 9:00 AM - 6:00 PM</p>
                      <p className="text-gray-300">Holidays: 10:00 AM - 4:00 PM</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Call to Action for Service Booking */}
            <div className="bg-black bg-opacity-50 border border-gray-800 p-8 border-t-4 border-t-primary-600">
              <h3 className="text-2xl font-bold text-white mb-4">Schedule Your Service Today</h3>
              <p className="text-gray-300 mb-6 leading-relaxed">
                Experience the premium service that your Chery deserves. Our factory-trained technicians use advanced diagnostic tools and genuine parts to keep your vehicle in optimal condition.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-black border border-primary-600 flex items-center justify-center">
                    <Check size={14} className="text-primary-600" />
                  </div>
                  <span className="text-gray-300">Convenient online booking system</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-black border border-primary-600 flex items-center justify-center">
                    <Check size={14} className="text-primary-600" />
                  </div>
                  <span className="text-gray-300">Real-time service status updates</span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-black border border-primary-600 flex items-center justify-center">
                    <Check size={14} className="text-primary-600" />
                  </div>
                  <span className="text-gray-300">Transparent pricing with no hidden charges</span>
                </div>
              </div>
              
              <div className="flex flex-col space-y-3">
                <a 
                  href="#book-service" 
                  className="flex items-center justify-center px-8 py-3 bg-primary-600 text-white font-medium border-2 border-primary-600 hover:bg-transparent hover:text-primary-600 transition-colors duration-300"
                >
                  <Calendar size={18} className="mr-2" />
                  Book Online Appointment
                </a>
                <a 
                  href="tel:09639119977" 
                  className="flex items-center justify-center px-8 py-3 border-2 border-gray-800 text-white font-medium hover:border-primary-600 hover:text-primary-600 transition-colors duration-300"
                >
                  <Phone size={18} className="mr-2" />
                  Call 09639119977 to Book
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCenters;