'use client'

import axios from 'axios';
import { motion } from 'framer-motion';
import { AlertTriangle, Car, Loader2, Mail, MapPin, Phone, Truck, User, Wrench } from 'lucide-react';
import { useEffect, useState } from 'react';

const EmergencyAssistance = () => {
  const [formData, setFormData] = useState({
    vehicleModel: '',
    assistanceType: '',
    location: '',
    contactNumber: '',
    name: '',
    email: '',
    vehicleRegNumber: '',
    description: ''
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [locationLoading, setLocationLoading] = useState(false);

  // Function to get current location
  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLocationLoading(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        
        // Use reverse geocoding to get address from coordinates
        axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`)
          .then(response => {
            const address = response.data.display_name;
            setFormData(prev => ({ ...prev, location: address }));
            setLocationLoading(false);
          })
          .catch(err => {
            setError('Failed to get your address. Please enter manually.');
            setLocationLoading(false);
          });
      },
      (error) => {
        setError('Unable to retrieve your location. Please enter manually.');
        setLocationLoading(false);
      }
    );
  };

  // Get location on component mount
  useEffect(() => {
    getCurrentLocation();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      // Send form data to your backend
      await axios.post('/api/emergency-assistance', {
        ...formData,
        // Add timestamp
        timestamp: new Date().toISOString(),
        // Send emails to specified addresses
        recipients: ['info@cherybd.com', 'ratan.mia@continental-motor.com', formData.email]
      });
      
      setSuccess(true);
      setLoading(false);
      
      // Reset form after successful submission
      setFormData({
        vehicleModel: '',
        assistanceType: '',
        location: '',
        contactNumber: '',
        name: '',
        email: '',
        vehicleRegNumber: '',
        description: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to submit your request. Please try calling our emergency number.');
      setLoading(false);
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

  const assistanceServices = [
    {
      title: "Vehicle Recovery",
      description: "Professional towing services available nationwide. Our team will transport your vehicle safely to the nearest service center.",
      icon: Truck
    },
    {
      title: "Emergency Repairs",
      description: "Our mobile technicians can perform quick roadside repairs to get you back on the road as quickly as possible.",
      icon: Wrench
    },
    {
      title: "24/7 Support",
      description: "Our dedicated call center is available round-the-clock to assist with any emergencies or inquiries you may have.",
      icon: Phone
    }
  ];

  return (
    <section className="py-24 relative" 
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
        {/* Heading Section */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
            24/7 <span className="text-primary-600">Premium</span> Roadside Assistance
          </h2>
          
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-8"></div>
          
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            Round-the-clock support for Chery owners across Bangladesh. Our certified technicians are ready to help you anytime, anywhere.
          </p>
        </motion.div>
        
        {/* Services Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {assistanceServices.map((service, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="border border-gray-800 p-8 bg-black bg-opacity-50 group hover:border-primary-600 transition-colors duration-300"
            >
              <div className="w-16 h-16 bg-primary-600 flex items-center justify-center mx-auto mb-6">
                <service.icon size={24} className="text-white" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-white text-center">{service.title}</h3>
              <p className="text-gray-400 text-center">
                {service.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 shadow-2xl">
          {/* Request Form */}
          <motion.div 
            className="lg:col-span-3 border-t-4 border-primary-600 p-8"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            style={{ background: 'rgba(15, 15, 15, 0.95)' }}
          >
            <h3 className="text-2xl font-bold text-white mb-6">Request Emergency Assistance</h3>
            
            {success && (
              <div className="mb-6 p-4 border border-green-600 bg-green-900/30 text-green-400">
                Your emergency request has been submitted. Our team will contact you shortly.
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 border border-red-600 bg-red-900/30 text-red-400 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Assistance Type</label>
                  <select 
                    name="assistanceType"
                    value={formData.assistanceType}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                    required
                  >
                    <option value="">Select Assistance Type</option>
                    <option value="towing">Vehicle Recovery/Towing</option>
                    <option value="flat-tire">Flat Tire</option>
                    <option value="battery">Battery Jump Start</option>
                    <option value="fuel">Fuel Delivery</option>
                    <option value="lockout">Lockout Assistance</option>
                    <option value="other">Other Emergency</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Your Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Current location or address"
                      className="w-full p-3 pl-10 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                      required
                    />
                    <button 
                      type="button" 
                      onClick={getCurrentLocation}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary-600 hover:text-primary-500 transition-colors"
                    >
                      {locationLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <span className="text-sm">Detect</span>
                      )}
                    </button>
                  </div>
                </div>
                
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
                    <option value="other">Other</option>
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
                  <label className="block text-sm font-medium text-gray-300">Problem Description</label>
                  <textarea
                    rows="3"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Please describe your situation and any relevant details that might help our assistance team"
                    className="w-full p-3 border border-gray-700 bg-gray-800 text-white focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                  ></textarea>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-primary-600 text-white py-3 px-4 font-medium transition-colors duration-300 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-700'}`}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Processing...
                    </>
                  ) : (
                    <>
                      Request Emergency Assistance
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
          
          {/* Emergency Contact Info */}
          <motion.div 
            className="lg:col-span-2 flex flex-col"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-primary-600 text-white p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Phone size={24} className="mr-3" />
                Emergency Hotline
              </h3>
              
              <div className="bg-black bg-opacity-20 p-6 mb-6">
                <p className="text-sm mb-2">For immediate assistance, call our 24/7 hotline:</p>
                <a href="tel:01XXXXXXXXX" className="text-2xl font-bold block text-center py-4">
                  09639119977
                </a>
                <p className="text-xs text-center">Toll-free for Chery owners</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black bg-opacity-20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 3a7 7 0 0 0-7 7c0 1.3.37 2.5 1 3.5l3 5.5 3-5.5c.63-1 1-2.2 1-3.5a3 3 0 0 0-6 0c0 1.3.37 2.5 1 3.5l3 5.5 3-5.5c.63-1 1-2.2 1-3.5a7 7 0 0 0-7-7z"></path>
                      <circle cx="12" cy="10" r="1"></circle>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Coverage Area</p>
                    <p className="text-xs opacity-80">All major cities and highways across Bangladesh</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black bg-opacity-20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Response Time</p>
                    <p className="text-xs opacity-80">Urban areas: 30-60 minutes<br/>Highways: 60-90 minutes</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-black bg-opacity-20 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M3 3v18h18"></path>
                      <path d="M18.4 9a6 6 0 1 0 0-6"></path>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Service Availability</p>
                    <p className="text-xs opacity-80">Available 24 hours, 7 days a week, including holidays</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-900 text-white p-8 flex-grow">
              <h3 className="text-xl font-bold mb-6">What to Expect</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary-600 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <p className="text-gray-300">Call our hotline or submit the form to request assistance</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary-600 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <p className="text-gray-300">Our team will assess your situation and dispatch appropriate help</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary-600 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <p className="text-gray-300">You'll receive SMS updates about the estimated arrival time</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary-600 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <p className="text-gray-300">Our technician will arrive and resolve your issue or arrange towing</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary-600 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                    <span className="text-xs font-bold">5</span>
                  </div>
                  <p className="text-gray-300">Follow-up to ensure your satisfaction with the service provided</p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default EmergencyAssistance;