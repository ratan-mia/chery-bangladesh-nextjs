'use client'

import axios from 'axios';
import { motion } from 'framer-motion';
import { AlertTriangle, Calendar, Car, Clock, Loader2, Mail, MapPin, Phone, User } from 'lucide-react';
import { useEffect, useState } from 'react';

const TestDriveBooking = () => {
  const [formData, setFormData] = useState({
    vehicleModel: '',
    preferredDate: '',
    preferredTime: '',
    location: '',
    contactNumber: '',
    name: '',
    email: '',
    drivingExperience: '',
    specificRequests: ''
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
      const response = await axios.post('/api/test-drive', {
        ...formData,
        timestamp: new Date().toISOString()
      });
      
      if (response.data.success) {
        setSuccess(true);
        
        // Reset form after successful submission
        setFormData({
          vehicleModel: '',
          preferredDate: '',
          preferredTime: '',
          location: '',
          contactNumber: '',
          name: '',
          email: '',
          drivingExperience: '',
          specificRequests: ''
        });
        
        // Reset success message after 5 seconds
        setTimeout(() => setSuccess(false), 5000);
      } else {
        setError(response.data.message || 'Something went wrong. Please try again.');
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to submit your request. Please try calling our customer support.');
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

  const testDriveFeatures = [
    {
      title: "Personalized Experience",
      description: "Our product specialists will guide you through all features and help you experience the full capabilities of your chosen Chery model.",
      icon: User
    },
    {
      title: "Flexible Scheduling",
      description: "Choose a date and time that works best for you. We offer test drives seven days a week at all our dealership locations.",
      icon: Calendar
    },
    {
      title: "Multiple Models Available",
      description: "Test drive our latest models including the Tiggo 4 Pro, Tiggo 7 Pro, Tiggo 8 Pro, and more to find your perfect match.",
      icon: Car
    }
  ];

  // Calculate min date (tomorrow)
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const minDate = tomorrow.toISOString().split('T')[0];

  // Calculate max date (3 months from now)
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 3);
  const maxDateString = maxDate.toISOString().split('T')[0];

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
            Experience <span className="text-primary-900">Premium</span> Performance
          </h2>
          
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
          
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Schedule a test drive today and discover the exceptional comfort, performance, and innovation that makes Chery stand out in Bangladesh.
          </p>
        </motion.div>
        
        {/* Features Section */}
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {testDriveFeatures.map((feature, index) => (
            <motion.div 
              key={index}
              variants={itemVariants}
              className="border border-gray-200 p-8 bg-white shadow-sm group hover:border-primary-700 transition-colors duration-300"
            >
              <div className="w-16 h-16 bg-primary-light bg-opacity-40 flex items-center justify-center mx-auto mb-6 group-hover:bg-opacity-60 transition-colors duration-300">
                <feature.icon size={24} className="text-primary-900" />
              </div>
              <h3 className="text-xl font-bold mb-4 text-gray-900 text-center">{feature.title}</h3>
              <p className="text-gray-600 text-center">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
        
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 shadow-lg">
          {/* Booking Form */}
          <motion.div 
            className="lg:col-span-3 border-t-4 border-primary-700 p-8 bg-white"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Book Your Test Drive</h3>
            
            {success && (
              <div className="mb-6 p-4 border border-green-600 bg-green-50 text-green-700">
                Your test drive request has been submitted successfully. Our team will contact you shortly to confirm your appointment.
              </div>
            )}
            
            {error && (
              <div className="mb-6 p-4 border border-red-300 bg-red-50 text-red-700 flex items-center">
                <AlertTriangle className="w-5 h-5 mr-2 flex-shrink-0" />
                <span>{error}</span>
              </div>
            )}
            
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
                  <select 
                    name="vehicleModel"
                    value={formData.vehicleModel}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
                    required
                  >
                    <option value="">Select Vehicle Model</option>
                    <option value="tiggo4pro">Tiggo 4 Pro</option>
                    <option value="tiggo7pro">Tiggo 7 Pro</option>
                    <option value="tiggo8pro">Tiggo 8 Pro</option>
                    <option value="arrizo6">Arrizo 6</option>
                    <option value="omoda">Omoda</option>
                    <option value="jaccoo">Jaccoo</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Preferred Dealership Location</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <MapPin size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="text"
                      name="location"
                      value={formData.location}
                      onChange={handleChange}
                      placeholder="Enter dealership location"
                      className="w-full p-3 pl-10 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
                      required
                    />
                    <button 
                      type="button" 
                      onClick={getCurrentLocation}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-primary-700 hover:text-primary-900 transition-colors"
                    >
                      {locationLoading ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <span className="text-sm">Nearby</span>
                      )}
                    </button>
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Calendar size={18} className="text-gray-500" />
                    </div>
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      min={minDate}
                      max={maxDateString}
                      className="w-full p-3 pl-10 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">Preferred Time</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <Clock size={18} className="text-gray-500" />
                    </div>
                    <select
                      name="preferredTime"
                      value={formData.preferredTime}
                      onChange={handleChange}
                      className="w-full p-3 pl-10 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
                      required
                    >
                      <option value="">Select Time</option>
                      <option value="10:00 AM">10:00 AM</option>
                      <option value="11:00 AM">11:00 AM</option>
                      <option value="12:00 PM">12:00 PM</option>
                      <option value="01:00 PM">01:00 PM</option>
                      <option value="02:00 PM">02:00 PM</option>
                      <option value="03:00 PM">03:00 PM</option>
                      <option value="04:00 PM">04:00 PM</option>
                      <option value="05:00 PM">05:00 PM</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-bold text-gray-900 mb-6">Personal Information</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Full Name</label>
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
                        className="w-full p-3 pl-10 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
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
                        className="w-full p-3 pl-10 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Email Address</label>
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
                        className="w-full p-3 pl-10 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Driving Experience</label>
                    <select
                      name="drivingExperience"
                      value={formData.drivingExperience}
                      onChange={handleChange}
                      className="w-full p-3 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
                    >
                      <option value="">Select Experience</option>
                      <option value="Beginner (0-2 years)">Beginner (0-2 years)</option>
                      <option value="Intermediate (3-5 years)">Intermediate (3-5 years)</option>
                      <option value="Experienced (5+ years)">Experienced (5+ years)</option>
                    </select>
                  </div>
                </div>
                
                <div className="space-y-2 mt-6">
                  <label className="block text-sm font-medium text-gray-700">Specific Requests or Questions</label>
                  <textarea
                    rows="3"
                    name="specificRequests"
                    value={formData.specificRequests}
                    onChange={handleChange}
                    placeholder="Any specific features you'd like to experience or questions you have about the vehicle"
                    className="w-full p-3 border border-gray-300 bg-white text-gray-700 focus:outline-none focus:border-primary-700 focus:ring-1 focus:ring-primary-700"
                  ></textarea>
                </div>
              </div>
              
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full bg-primary-700 text-white py-3 px-4 font-medium transition-colors duration-300 flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : 'hover:bg-primary-900'}`}
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
                      Book Your Test Drive
                    </>
                  )}
                </button>
              </div>
            </form>
          </motion.div>
          
          {/* Information Sidebar */}
          <motion.div 
            className="lg:col-span-2 flex flex-col"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className="bg-primary-700 text-white p-8">
              <h3 className="text-xl font-bold mb-6 flex items-center">
                <Car size={24} className="mr-3" />
                Test Drive Information
              </h3>
              
              <div className="bg-white text-gray-600 bg-opacity-10 p-6 mb-6">
                <p className="text-sm mb-2">For immediate assistance, call our hotline:</p>
                <a href="tel:09639119977" className="text-2xl font-bold block text-center py-4">
                  09639119977
                </a>
                <p className="text-xs text-center">Available seven days a week</p>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white text-primary bg-opacity-10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Test Drive Duration</p>
                    <p className="text-xs opacity-80">Approximately 30-45 minutes per vehicle</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white text-primary bg-opacity-10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="8 12 12 16 16 12"></polyline>
                      <line x1="12" y1="8" x2="12" y2="16"></line>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Documents Required</p>
                    <p className="text-xs opacity-80">Valid driving license<br/>National ID card</p>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <div className="w-10 h-10 bg-white text-primary bg-opacity-10 flex items-center justify-center mr-3">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"></polygon>
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-medium">Test Drive Routes</p>
                    <p className="text-xs opacity-80">Urban and highway routes available around each dealership</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-50 border border-gray-200 text-gray-900 p-8 flex-grow">
              <h3 className="text-xl font-bold mb-6">What to Expect</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary-700 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 text-white">
                    <span className="text-xs font-bold">1</span>
                  </div>
                  <p className="text-gray-600">Submit this form to book your preferred time slot</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary-700 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 text-white">
                    <span className="text-xs font-bold">2</span>
                  </div>
                  <p className="text-gray-600">Receive confirmation via email and SMS within 24 hours</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary-700 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 text-white">
                    <span className="text-xs font-bold">3</span>
                  </div>
                  <p className="text-gray-600">Arrive at the dealership with required documents</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary-700 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 text-white">
                    <span className="text-xs font-bold">4</span>
                  </div>
                  <p className="text-gray-600">Meet with our product specialist for a vehicle walkthrough</p>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-primary-700 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0 text-white">
                    <span className="text-xs font-bold">5</span>
                  </div>
                  <p className="text-gray-600">Enjoy your test drive and get answers to all your questions</p>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default TestDriveBooking;