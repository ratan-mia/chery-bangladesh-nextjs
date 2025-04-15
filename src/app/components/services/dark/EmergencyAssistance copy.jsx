'use client'

import axios from 'axios';
import { AlertTriangle, Loader2, MapPin, Phone } from 'lucide-react';
import { useEffect, useState } from 'react';

const EmergencyAssistance = () => {
  const [formData, setFormData] = useState({
    vehicleModel: '',
    assistanceType: '',
    location: '',
    contactNumber: '',
    name: '',
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
        email: ''
      });
      
      // Reset success message after 5 seconds
      setTimeout(() => setSuccess(false), 5000);
    } catch (err) {
      setError('Failed to submit your request. Please try calling our emergency number.');
      setLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-black via-[#0a0a0a] to-black relative">
      {/* Subtle texture overlay */}
      <div className="absolute inset-0 bg-[url('/textures/dot-pattern.svg')] opacity-5 pointer-events-none"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            24/7 <span className="text-primary-600">Premium</span> Roadside Assistance
          </h2>
          
          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>
          
          <p className="text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Round-the-clock support for Chery owners across Bangladesh. Our certified technicians are ready to help you anytime, anywhere.
          </p>
        </div>
        
        {/* Emergency Support Number */}
        <div className="max-w-3xl mx-auto mb-16">
          <div className="flex flex-col items-center bg-[rgba(15,15,15,0.95)] p-8 border border-gray-800 shadow-lg rounded">
            <p className="text-gray-300 mb-4 text-lg">24/7 Emergency Support:</p>
            <div className="flex items-center">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center mr-4">
                <Phone className="text-white w-6 h-6" />
              </div>
              <span className="text-2xl md:text-3xl font-bold text-primary-600">09639119977</span>
            </div>
          </div>
        </div>
        
        {/* Emergency Assistance Request Form */}
        <div className="max-w-4xl mx-auto bg-[rgba(15,15,15,0.95)] p-8 border border-gray-800 shadow-2xl rounded-md border-t-4 border-t-primary-600">
          <h3 className="text-2xl font-bold text-white text-center mb-8">
            Request Emergency Assistance
          </h3>
          
          {success && (
            <div className="mb-8 bg-[rgba(0,0,0,0.4)] border border-green-700 p-4 text-green-400 text-center rounded">
              Your emergency request has been submitted. Our team will contact you shortly.
            </div>
          )}
          
          {error && (
            <div className="mb-8 bg-[rgba(0,0,0,0.4)] border border-primary-600 p-4 text-primary-600 text-center rounded flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              {error}
            </div>
          )}
          
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Vehicle Model*</label>
              <select 
                name="vehicleModel"
                value={formData.vehicleModel}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
              >
                <option value="">Select Your Vehicle</option>
                <option value="tiggo4pro">Tiggo 4 Pro</option>
                <option value="tiggo7pro">Tiggo 7 Pro</option>
                <option value="tiggo8pro">Tiggo 8 Pro</option>
                <option value="arrizo6">Arrizo 6</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Assistance Type*</label>
              <select 
                name="assistanceType"
                value={formData.assistanceType}
                onChange={handleChange}
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
              >
                <option value="">Select Service</option>
                <option value="towing">Towing Service</option>
                <option value="flat-tire">Flat Tire</option>
                <option value="battery">Battery Jump Start</option>
                <option value="lockout">Vehicle Lockout</option>
                <option value="fuel">Fuel Delivery</option>
                <option value="other">Other Emergency</option>
              </select>
            </div>
            
            <div className="space-y-2 md:col-span-2 relative">
              <label className="block text-sm font-medium text-gray-300">Your Location*</label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your current location"
                  required
                  className="w-full p-3 pl-10 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <MapPin className="h-5 w-5 text-gray-400" />
                </div>
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
              <label className="block text-sm font-medium text-gray-300">Contact Number*</label>
              <input
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Your contact number"
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
              />
            </div>
            
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-300">Your Name*</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
              />
            </div>
            
            <div className="space-y-2 md:col-span-2">
              <label className="block text-sm font-medium text-gray-300">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your email address"
                className="w-full p-3 bg-gray-800 border border-gray-700 text-white rounded focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600"
              />
              <p className="text-sm text-gray-400 mt-1">We'll send confirmation to this email</p>
            </div>
            
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-primary-600 hover:bg-primary-700 text-white py-4 px-8 font-medium transition-colors rounded group flex items-center justify-center ${loading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {loading ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    PROCESSING REQUEST...
                  </>
                ) : (
                  <>
                    REQUEST EMERGENCY ASSISTANCE
                    <AlertTriangle className="ml-2 w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default EmergencyAssistance;