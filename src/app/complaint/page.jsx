"use client";

import { useEffect } from "react";

// Import components
import ComplaintContactInfo from "@/components/complaint/ComplaintContactInfo";
import ComplaintFAQs from "@/components/complaint/ComplaintFAQs";
import ComplaintFormSection from "@/components/complaint/ComplaintFormSection";
import ComplaintHeroSection from "@/components/complaint/ComplaintHeroSection";
import ComplaintProcessSection from "@/components/complaint/ComplaintProcessSection";
import ComplaintResolutionSection from "@/components/complaint/ComplaintResolutionSection";
import ComplaintStickyNav from "@/components/complaint/ComplaintStickyNav";
import ComplaintTypesSection from "@/components/complaint/ComplaintTypesSection";

const ComplaintPage = () => {
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
      {/* Hero Section */}
      <div className="relative">
        <ComplaintHeroSection />
      </div>

      {/* Sticky Navigation - Positioned below main navigation */}
      <ComplaintStickyNav />

      {/* Main Content Sections with IDs */}

      {/* Complaint Types */}
      <section id="complaint-types">
        <ComplaintTypesSection />
      </section>

      {/* Complaint Process */}
      <section id="process">
        <ComplaintProcessSection />
      </section>

      {/* Resolution Timeline */}
      <section id="resolution">
        <ComplaintResolutionSection />
      </section>

      {/* File Complaint Form */}
      <section id="file-complaint">
        <ComplaintFormSection />
      </section>

      {/* Contact Information */}
      <section id="contact">
        <ComplaintContactInfo />
      </section>

      {/* FAQs */}
      <section id="faqs">
        <ComplaintFAQs />
      </section>
    </main>
  );
};

export default ComplaintPage;