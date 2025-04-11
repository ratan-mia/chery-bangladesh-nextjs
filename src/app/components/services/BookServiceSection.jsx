'use client'

import axios from 'axios';
import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, Car, CheckSquare, Clock, Mail, Phone, User } from 'lucide-react';
import { useState } from 'react';

const BookServiceSection = () => {
  const [formData, setFormData] = useState({
    vehicleModel: '',
    serviceType: '',
    preferredDate: '',
    preferredTime: '',
    name: '',
    email: '',
    contactNumber: '',
    vehicleRegNumber: '',
    notes: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ type: '', message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ type: '', message: '' });

    try {
      // Replace this with your actual API endpoint
      const response = await axios.post('/api/book-service', {
        ...formData,
        adminEmail1: 'info@cherybd.com',
        adminEmail2: 'ratan.mia@continental-motor.com',
        customerEmail: formData.email
      });
      
      setSubmitStatus({
        type: 'success',
        message: 'Your service has been booked successfully! You will receive a confirmation email shortly.'
      });
      
      // Reset form after successful submission
      setFormData({
        vehicleModel: '',
        serviceType: '',
        preferredDate: '',
        preferredTime: '',
        name: '',
        email: '',
        contactNumber: '',
        vehicleRegNumber: '',
        notes: ''
      });
    } catch (error) {
      console.error('Booking error:', error);
      setSubmitStatus({
        type: 'error',
        message: 'There was an error booking your service. Please try again or contact us directly.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

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
    <section id="book-service" className="py-24 relative" 
      style={{
        background: 'linear-gradient(180deg, #000000 0%, #0a0a0a 50%, #000000 100%)',
      }}>
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 opacity-5" 
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23ffffff' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`,
        }}
      ></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            Book Your <span className="text-primary-600">Service</span>
          </h2>
          
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Schedule your service appointment online and our team will contact you 
            to confirm the details. Experience premium automotive care with our 
            factory-trained technicians.
          </p>
        </motion.div>
        
        <motion.div 
          className="max-w-6xl mx-auto"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 shadow-2xl">
            {/* Booking Form */}
            <motion.div 
              className="lg:col-span-3 border-t-4 border-primary-600 p-8"
              variants={itemVariants}
              style={{ background: 'rgba(15, 15, 15, 0.95)' }}
            >
              <h3 className="text-2xl font-bold text-white mb-6">Service Details</h3>
              
              {submitStatus.message && (
                <div className={`mb-6 p-4 border ${submitStatus.type === 'success' ? 'border-green-600 bg-green-900/30 text-green-400' : 'border-red-600 bg-red-900/30 text-red-400'}`}>
                  {submitStatus.message}
                </div>
              )}
              
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Vehicle Model</label>
                    <select 
                      name="vehicleModel"
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                      required
                    >
                      <option value="">Select Your Vehicle</option>
                      <option value="tiggo4pro">Tiggo 4 Pro</option>
                      <option value="tiggo7pro">Tiggo 7 Pro</option>
                      <option value="tiggo8pro">Tiggo 8 Pro</option>
                      <option value="arrizo6">Arrizo 6</option>
                      <option value="omoda">Omoda</option>
                      <option value="jaccoo">Jaccoo</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Vehicle Reg. Number</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Car size={18} className="text-gray-500" />
                      </div>
                      <input
                        type="text"
                        name="vehicleRegNumber"
                        value={formData.vehicleRegNumber}
                        onChange={handleChange}
                        placeholder="E.g., DHK GA 11-1111"
                        className="w-full p-3 pl-10 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Service Type</label>
                    <select 
                      name="serviceType"
                      value={formData.serviceType}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                      required
                    >
                      <option value="">Select Service</option>
                      <option value="Regular Maintenance">Regular Maintenance</option>
                      <option value="Major Maintenance">Major Maintenance</option>
                      <option value="Repair Service">Repair Service</option>
                      <option value="Diagnostic Check">Diagnostic Check</option>
                      <option value="Oil Change">Oil Change</option>
                      <option value="Brake Service">Brake Service</option>
                      <option value="AC Service">AC Service</option>
                      <option value="Other Service">Other Service</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Preferred Date</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Calendar size={18} className="text-gray-500" />
                      </div>
                      <input
                        type="date"
                        name="preferredDate"
                        value={formData.preferredDate}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                        min={new Date().toISOString().split('T')[0]}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Preferred Time</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                        <Clock size={18} className="text-gray-500" />
                      </div>
                      <select 
                        name="preferredTime"
                        value={formData.preferredTime}
                        onChange={handleChange}
                        className="w-full p-3 pl-10 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                        required
                      >
                        <option value="">Select Time</option>
                        <option value="Morning (9:00 AM - 12:00 PM)">Morning (9:00 AM - 12:00 PM)</option>
                        <option value="Afternoon (12:00 PM - 3:00 PM)">Afternoon (12:00 PM - 3:00 PM)</option>
                        <option value="Evening (3:00 PM - 6:00 PM)">Evening (3:00 PM - 6:00 PM)</option>
                      </select>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-700 pt-6">
                  <h3 className="text-lg font-bold text-white mb-6">Contact Information</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">Your Name</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <User size={18} className="text-gray-500" />
                        </div>
                        <input
                          type="text"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          placeholder="Enter your full name"
                          className="w-full p-3 pl-10 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-300">Email Address</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Mail size={18} className="text-gray-500" />
                        </div>
                        <input
                          type="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          placeholder="Your email address"
                          className="w-full p-3 pl-10 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                          required
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <label className="block text-sm font-medium text-gray-300">Contact Number</label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                          <Phone size={18} className="text-gray-500" />
                        </div>
                        <input
                          type="tel"
                          name="contactNumber"
                          value={formData.contactNumber}
                          onChange={handleChange}
                          placeholder="Your contact number"
                          className="w-full p-3 pl-10 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 mt-6">
                    <label className="block text-sm font-medium text-gray-300">Additional Notes</label>
                    <textarea
                      rows="3"
                      name="notes"
                      value={formData.notes}
                      onChange={handleChange}
                      placeholder="Please provide any additional information about your service needs"
                      className="w-full p-3 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                    ></textarea>
                  </div>
                </div>
                
                <div className="pt-4">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-primary-600 text-white py-3 px-4 font-medium transition-colors duration-300 flex items-center justify-center ${isSubmitting ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-700'}`}
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Processing...
                      </>
                    ) : (
                      <>
                        Book Appointment
                        <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                        </svg>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </motion.div>
            
            {/* Booking Information */}
            <motion.div 
              className="lg:col-span-2 flex flex-col"
              variants={itemVariants}
            >
              <div className="bg-primary-600 text-white p-8">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <Clock size={24} className="mr-3" />
                  Service Hours
                </h3>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span>Monday - Friday</span>
                    <span className="font-medium">8:00 AM - 8:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center pb-3 border-b border-white/20">
                    <span>Saturday</span>
                    <span className="font-medium">9:00 AM - 7:00 PM</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <span>Sunday</span>
                    <span className="font-medium">10:00 AM - 6:00 PM</span>
                  </li>
                </ul>
                
                <div className="mt-8 pt-6 border-t border-white/20">
                  <div className="flex items-start">
                    <AlertTriangle size={24} className="mr-3 mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-bold mb-2">Emergency Service</h4>
                      <p className="text-sm">
                        24/7 Roadside assistance is available for all Chery owners.
                      </p>
                      <div className="mt-4 flex items-center">
                        <Phone size={20} className="mr-2" />
                        <span className="font-bold">01XX-XXXXXX</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-gray-900 text-white p-8 flex-grow">
                <h3 className="text-xl font-bold mb-6 flex items-center">
                  <CheckSquare size={24} className="mr-3" />
                  What to Expect
                </h3>
                <ul className="space-y-5">
                  <li className="flex">
                    <div className="h-6 w-6 bg-primary-600 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Confirmation email immediately after booking</span>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 bg-primary-600 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Follow-up call within 2 hours of booking</span>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 bg-primary-600 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Digital inspection report with photos</span>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 bg-primary-600 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Courtesy vehicle wash with every service</span>
                  </li>
                  <li className="flex">
                    <div className="h-6 w-6 bg-primary-600 flex items-center justify-center mr-4 mt-0.5 flex-shrink-0">
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    </div>
                    <span>Factory-trained technicians using OEM parts</span>
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BookServiceSection;