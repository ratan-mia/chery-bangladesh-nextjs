"use client";

import { useEffect } from "react";

// Import components
import AssistanceCTA from "@/components/services/AssistanceCTA";
import BookServiceSection from "@/components/services/BookServiceSection";
import CustomerReviews from "@/components/services/CustomerReviews";
import EmergencyAssistance from "@/components/services/EmergencyAssistance";
import HeroSlider from "@/components/services/HeroSlider";
import MaintenanceSchedule from "@/components/services/MaintenanceSchedule";
import PremiumServices from "@/components/services/PremiumServices";
import ServiceCenters from "@/components/services/ServiceCenters";
import ServiceCTA from "@/components/services/ServiceCTA";
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
        <EmergencyAssistance />
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

      <section id="locations">
        <ServiceCenters />
      </section>
      {/* Service Centers */}


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
      <section id="call-to-action">
        <ServiceCTA />
      </section>


      {/* Emergency Footer */}
      <section id="emergency-footer">
        {/* <EmergencyFooter /> */}
      </section>

    </main>
  );
};

export default ServicePage;