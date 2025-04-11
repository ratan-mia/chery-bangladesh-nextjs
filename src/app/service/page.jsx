'use client'

import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

// Import components
import Footer from '@/components/Footer';
import AssistanceCTA from '@/components/services/AssistanceCTA';
import CustomerReviews from '@/components/services/CustomerReviews';
import EmergencyAssistance from '@/components/services/EmergencyAssistance';
import MaintenanceSchedule from '@/components/services/MaintenanceSchedule';
import PremiumServices from '@/components/services/PremiumServices';
import RoadsideAssistance from '@/components/services/RoadsideAssistance';
import ServiceProcess from '@/components/services/ServiceProcess';
import WarrantySection from '@/components/services/WarrantySection';
import WhyChooseChery from '@/components/services/WhyChooseChery';

// Custom Service Page Components

const ServicePage = () => {
  return (
    <main className="min-h-screen bg-white">
      {/* Navigation would typically be included via a layout component */}
      
      {/* Main Service Hero - Modified version of hero with service-specific content */}
      <section className="relative">
        <div className="w-full h-[50vh] md:h-[60vh] relative">
          <Image
            src="/images/service-center.jpg" // Replace with actual image path
            alt="Chery Bangladesh Service Center"
            fill
            className="object-cover"
            priority
          />
          {/* Overlay */}
          <div className="absolute inset-0 bg-black bg-opacity-60"></div>
          
          {/* Content */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Expert Service for Your Chery
              </h1>
              <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                Factory-trained technicians and genuine parts to keep your vehicle performing at its best
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Link 
                  href="#book-service" 
                  className="bg-primary-800 text-white px-8 py-3 font-medium hover:bg-red-900 transition-colors"
                >
                  BOOK A SERVICE
                </Link>
                <Link 
                  href="#service-packages" 
                  className="bg-white text-red-800 px-8 py-3 font-medium hover:bg-gray-100 transition-colors"
                >
                  VIEW PACKAGES
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Why Choose Chery for Service */}
      <WhyChooseChery />
      
      {/* Roadside Assistance Section */}
      <RoadsideAssistance />
      
      {/* Emergency Assistance CTA */}
      <AssistanceCTA />
      
      {/* Premium Services Showcase */}
      <PremiumServices />
      
      {/* Service Process */}
      <ServiceProcess />
      
      {/* Maintenance Schedule */}
      <MaintenanceSchedule />
      
      {/* Warranty Section */}
      <WarrantySection />
      
      {/* Service Centers */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Our Service Centers
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Visit any of our state-of-the-art service centers across Bangladesh for professional care for your Chery vehicle.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Dhaka Service Center */}
            <div className="bg-white shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/images/dhaka-center.jpg" // Replace with actual image path
                  alt="Dhaka Service Center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Dhaka Service Center</h3>
                <p className="text-gray-600 text-sm mb-4">
                  House 123, Road 12, Gulshan Avenue, Dhaka 1212
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">+880 18XX-XXXXXX</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">dhaka@cherybangladesh.com</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">8:00 AM - 8:00 PM (Everyday)</span>
                  </div>
                </div>
                <button className="w-full mt-4 border border-red-800 text-red-800 py-2 hover:bg-primary-800 hover:text-white transition-colors">
                  GET DIRECTIONS
                </button>
              </div>
            </div>
            
            {/* Chattogram Service Center */}
            <div className="bg-white shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/images/ctg-center.jpg" // Replace with actual image path
                  alt="Chattogram Service Center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Chattogram Service Center</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Plot 456, CDA Avenue, GEC Circle, Chattogram 4000
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">+880 18XX-XXXXXX</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">ctg@cherybangladesh.com</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">8:00 AM - 8:00 PM (Everyday)</span>
                  </div>
                </div>
                <button className="w-full mt-4 border border-red-800 text-red-800 py-2 hover:bg-primary-800 hover:text-white transition-colors">
                  GET DIRECTIONS
                </button>
              </div>
            </div>
            
            {/* Khulna Service Center */}
            <div className="bg-white shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/images/khulna-center.jpg" // Replace with actual image path
                  alt="Khulna Service Center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">Khulna Service Center</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Plot 789, KDA Avenue, Sonadanga, Khulna 9100
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">+880 18XX-XXXXXX</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">khulna@cherybangladesh.com</span>
                  </div>
                  <div className="flex items-start">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-800 mr-2 mt-1">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">9:00 AM - 7:00 PM (Everyday)</span>
                  </div>
                </div>
                <button className="w-full mt-4 border border-red-800 text-red-800 py-2 hover:bg-primary-800 hover:text-white transition-colors">
                  GET DIRECTIONS
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Service Booking */}
      <section id="book-service" className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-4">
              Book Your Service
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Schedule your service appointment online and our team will contact you to confirm the details.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Booking Form */}
              <div className="bg-gray-50 p-8">
                <form className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Vehicle Model</label>
                    <select className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800">
                      <option value="">Select Your Vehicle</option>
                      <option value="tiggo4pro">Tiggo 4 Pro</option>
                      <option value="tiggo7pro">Tiggo 7 Pro</option>
                      <option value="tiggo8pro">Tiggo 8 Pro</option>
                      <option value="arrizo6">Arrizo 6</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Service Type</label>
                    <select className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800">
                      <option value="">Select Service</option>
                      <option value="regular">Regular Maintenance</option>
                      <option value="major">Major Maintenance</option>
                      <option value="repair">Repair Service</option>
                      <option value="diagnostic">Diagnostic Check</option>
                      <option value="other">Other Service</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Preferred Date</label>
                    <input
                      type="date"
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800"
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Preferred Time</label>
                    <select className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800">
                      <option value="">Select Time</option>
                      <option value="morning">Morning (9:00 AM - 12:00 PM)</option>
                      <option value="afternoon">Afternoon (12:00 PM - 3:00 PM)</option>
                      <option value="evening">Evening (3:00 PM - 6:00 PM)</option>
                    </select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Your Name</label>
                    <input
                      type="text"
                      placeholder="Enter your full name"
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Contact Number</label>
                    <input
                      type="tel"
                      placeholder="Your contact number"
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                    <textarea
                      rows="3"
                      placeholder="Please provide any additional information about your service needs"
                      className="w-full p-3 border border-gray-300 focus:outline-none focus:border-red-800"
                    ></textarea>
                  </div>
                  
                  <div>
                    <button
                      type="submit"
                      className="w-full bg-primary-800 text-white py-3 font-medium hover:bg-red-900 transition-colors"
                    >
                      BOOK APPOINTMENT
                    </button>
                  </div>
                </form>
              </div>
              
              {/* Booking Information */}
              <div className="flex flex-col">
                <div className="bg-primary-800 text-white p-8">
                  <h3 className="text-xl font-bold mb-4">Service Hours</h3>
                  <ul className="space-y-3">
                    <li className="flex justify-between">
                      <span>Monday - Friday</span>
                      <span>8:00 AM - 8:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Saturday</span>
                      <span>9:00 AM - 7:00 PM</span>
                    </li>
                    <li className="flex justify-between">
                      <span>Sunday</span>
                      <span>10:00 AM - 6:00 PM</span>
                    </li>
                  </ul>
                  
                  <div className="mt-6 pt-6 border-t border-white/20">
                    <h4 className="font-bold mb-2">Emergency Service</h4>
                    <p className="text-sm">
                      24/7 Roadside assistance is available for all Chery owners.
                    </p>
                    <div className="mt-4 flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span className="font-bold">01XX-XXXXXX</span>
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 text-white p-8 flex-grow">
                  <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                  <ul className="space-y-4">
                    <li className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3 flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Confirmation call within 2 hours of booking</span>
                    </li>
                    <li className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3 flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Digital inspection report with photos</span>
                    </li>
                    <li className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3 flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Courtesy vehicle wash with every service</span>
                    </li>
                    <li className="flex">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-red-500 mr-3 flex-shrink-0 mt-1">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                      <span>Comfortable waiting lounge with refreshments</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Emergency Assistance Section */}
      <EmergencyAssistance />
      
      {/* Customer Reviews */}
      <CustomerReviews />
      
      {/* Call to Action */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Experience Premium Service for Your Chery
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Book your service appointment today and enjoy the peace of mind that comes with expert care.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link 
              href="#book-service" 
              className="bg-primary-800 text-white px-8 py-3 font-medium hover:bg-red-700 transition-colors"
            >
              SCHEDULE SERVICE
            </Link>
            <Link 
              href="/contact" 
              className="bg-transparent border border-white text-white px-8 py-3 font-medium hover:bg-white/10 transition-colors"
            >
              CONTACT US
            </Link>
          </div>
        </div>
      </section>
      
      {/* Footer Component */}
      <Footer />
    </main>
  );
};

export default ServicePage;