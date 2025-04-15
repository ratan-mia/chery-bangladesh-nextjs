'use client'

import { useEffect } from 'react'
import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'
import FaqSection from '../components/contact/FaqSection'
import HeroSection from '../components/contact/HeroSection'
import MapSection from '../components/contact/MapSection'
import PartsAccessoriesSection from '../components/contact/PartsAccessoriesSection'

export default function ContactPage() {
  const officeInfo = {
    name: "Asian Motorspex Limited",
    address:
      "206/1-207/1 Bir Uttam Mir Shawkat Sarak, Tejgaon Gulshan Link Road, Dhaka",
    phone: "09639119977",
    email: "info@cherybd.com",
    hours: "Monday - Friday: 10:00 AM - 8:00 PM\nSaturday: 10:00 AM - 8:00 PM\nSunday: Closed",
    coordinates: "23.777319,90.412587",
    mapLocation:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.3042707244614!2d90.41258731496817!3d23.77731898458251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c77aaaaaaaa%3A0xbbbbbbbbbbbbbbbb!2sTejgaon%20Gulshan%20Link%20Road%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1648653723428!5m2!1sen!2sbd",
  }

  // Vehicle models
  const models = [
    { value: "", label: "Select a model (optional)" },
    { value: "tiggo9", label: "Tiggo 9" },
    { value: "tiggo8", label: "Tiggo 8" },
    { value: "tiggo7", label: "Tiggo 7" },
    { value: "tiggo4pro", label: "Tiggo 4 Pro" },
    { value: "tiggo2pro", label: "Tiggo 2 Pro" },
    { value: "arrizo8", label: "Arrizo 8" },
    { value: "arrizo7", label: "Arrizo 7" },
    { value: "arrizo5", label: "Arrizo 5" },
  ]

  // For smooth scrolling to sections when using anchor links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash
      if (hash) {
        const element = document.querySelector(hash)
        if (element) {
          element.scrollIntoView({ behavior: "smooth" })
        }
      }
    }

    // Handle initial load with hash in URL
    if (window.location.hash) {
      setTimeout(handleHashChange, 100)
    }

    // Add listener for hash changes
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return (
    <main className="min-h-screen bg-white">
      {/* Hero section */}
      <HeroSection />

      {/* Contact info and form section */}
      <section
        className="py-16 md:py-24 relative overflow-hidden bg-white border-t border-gray-100"
        id="contact-form"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Contact information */}
            <div className="w-full lg:w-1/3">
              <ContactInfo officeInfo={officeInfo} />
            </div>

            {/* Contact form */}
            <div className="w-full lg:w-2/3">
              <ContactForm models={models} />
            </div>
          </div>
        </div>
      </section>

      {/* Map section */}
      <MapSection
        mapSrc={officeInfo.mapLocation}
        location={{
          address: officeInfo.address,
          coordinates: officeInfo.coordinates,
        }}
      />
      
      {/* Parts & Accessories Section */}
      <PartsAccessoriesSection />
      
      {/* FAQ section */}
      <FaqSection />
    </main>
  )
}