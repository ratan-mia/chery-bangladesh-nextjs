"use client";

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
import ServiceCenters from "@/components/services/ServiceCenters";
import ServiceProcess from "@/components/services/ServiceProcess";
import ServiceStickyNav from "@/components/services/ServiceStickyNav";
import WarrantySection from "@/components/services/WarrantySection";
import WhyChooseChery from "@/components/services/WhyChooseChery";
import ServiceFAQs from "../components/services/ServiceFAQs";

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
        <HeroSlider />
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

      <ServiceCenters />


      


      {/* Service Booking */}
      <section id="book-service">
        <BookServiceSection />
      </section>

      {/* Customer Reviews */}
      <section id="reviews">
        <CustomerReviews />
      </section>

       {/* Customer Reviews */}
       <section id="faqs">
        <ServiceFAQs />
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