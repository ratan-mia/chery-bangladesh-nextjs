"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";

// Import components
import Footer from "@/components/Footer";
import AssistanceCTA from "@/components/services/AssistanceCTA";
import BookServiceSection from "@/components/services/BookServiceSection";
import CustomerReviews from "@/components/services/CustomerReviews";
import HeroSlider from "@/components/services/HeroSlider";
import MaintenanceSchedule from "@/components/services/MaintenanceSchedule";
import PremiumServices from "@/components/services/PremiumServices";
import RoadsideAssistance from "@/components/services/RoadsideAssistance";
import ServiceHero from "@/components/services/ServiceHero";
import ServiceHeroSlider from "@/components/services/ServiceHeroSlider";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceStickyNav from "@/components/services/ServiceStickyNav";
import WarrantySection from "@/components/services/WarrantySection";
import WhyChooseChery from "@/components/services/WhyChooseChery";

const ServicePage = () => {
  
  // Add CSS class to adjust scroll-margin-top for sections after component mounts
  useEffect(() => {
    // Adjust this value to match your main navigation height
    const mainNavHeight = 80; // Example height in pixels
    
    // Apply to all sections with IDs
    const sections = document.querySelectorAll('section[id]');
    sections.forEach(section => {
      section.style.scrollMarginTop = `${mainNavHeight + 70}px`; // main nav + sticky nav height
    });
  }, []);

  return (
    <main className="min-h-screen bg-white">
      {/* ===== Main Navigation would be in the layout component ===== */}
      
      {/* Hero Sections */}
      <div className="relative">
        <ServiceHeroSlider />
        <HeroSlider />
        <ServiceHero />
      </div>
      
      {/* Sticky Navigation - Positioned below main navigation */}
      <ServiceStickyNav />
      
      {/* ===== Main Content Sections with IDs ===== */}
      
      {/* Why Choose Chery for Service */}
      <section id="why-choose">
        <WhyChooseChery />
      </section>

      {/* Roadside Assistance Section */}
      <section id="assistance">
        <RoadsideAssistance />
      </section>
    
      {/* Emergency Assistance CTA */}
      <section id="emergency">
        <AssistanceCTA />
      </section>

      {/* Premium Services Showcase */}
      <section id="services">
        <PremiumServices />
      </section>

      {/* Service Process */}
      <section id="process">
        <ServiceProcess />
      </section>

      {/* Maintenance Schedule */}
      <section id="maintenance">
        <MaintenanceSchedule />
      </section>

      {/* Warranty Section */}
      <section id="warranty">
        <WarrantySection />
      </section>

      {/* Service Centers */}
      <section id="locations" className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-4">
            Our Service Centers
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Visit any of our state-of-the-art service centers across Bangladesh
            for professional care for your Chery vehicle.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Dhaka Service Center */}
            <div className="bg-white shadow-sm">
              <div className="relative h-48">
                <Image
                  src="/images/dhaka-center.jpg"
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
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-800 mr-2 mt-1"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">
                      +880 18XX-XXXXXX
                    </span>
                  </div>
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-800 mr-2 mt-1"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">
                      dhaka@cherybangladesh.com
                    </span>
                  </div>
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-800 mr-2 mt-1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">
                      8:00 AM - 8:00 PM (Everyday)
                    </span>
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
                  src="/images/ctg-center.jpg"
                  alt="Chattogram Service Center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  Chattogram Service Center
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Plot 456, CDA Avenue, GEC Circle, Chattogram 4000
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-800 mr-2 mt-1"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">
                      +880 18XX-XXXXXX
                    </span>
                  </div>
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-800 mr-2 mt-1"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">
                      ctg@cherybangladesh.com
                    </span>
                  </div>
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-800 mr-2 mt-1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">
                      8:00 AM - 8:00 PM (Everyday)
                    </span>
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
                  src="/images/khulna-center.jpg"
                  alt="Khulna Service Center"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">
                  Khulna Service Center
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  Plot 789, KDA Avenue, Sonadanga, Khulna 9100
                </p>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-800 mr-2 mt-1"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                    <span className="text-sm text-gray-600">
                      +880 18XX-XXXXXX
                    </span>
                  </div>
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-800 mr-2 mt-1"
                    >
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                      <polyline points="22,6 12,13 2,6"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">
                      khulna@cherybangladesh.com
                    </span>
                  </div>
                  <div className="flex items-start">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-red-800 mr-2 mt-1"
                    >
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                    <span className="text-sm text-gray-600">
                      9:00 AM - 7:00 PM (Everyday)
                    </span>
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
      <section id="book-service">
        <BookServiceSection />
      </section>

      {/* Customer Reviews */}
      <section id="reviews">
        <CustomerReviews />
      </section>

      {/* Call to Action */}
      <section id="cta" className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Experience Premium Service for Your Chery
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Book your service appointment today and enjoy the peace of mind that
            comes with expert care.
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