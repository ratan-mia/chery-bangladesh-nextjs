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
    name: "Chery Bangladesh - Asian Motorspex Limited",
    address:
      "206/1-207/1 Bir Uttam Mir Shawkat Sarak, Tejgaon Gulshan Link Road, Dhaka",
    phone: "09639119977",
    email: "info@cherybd.com",
    hours: "Saturday - Friday: 10:00 AM - 8:00 PM",
    coordinates: "23.777319,90.412587",
    mapLocation:
      "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.359881323201!2d90.4075285758975!3d23.770195788015073!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c7876eb61d75%3A0x94d0fb4b26e08e86!2sChery%20Bangladesh%20-%20Asian%20Motorspex%20Ltd.!5e0!3m2!1sen!2sbd!4v1745841698011!5m2!1sen!2sbd",
  }

  // Vehicle models
  const models = [
    { value: "", label: "Select a model (optional)" },
    { value: "tiggo9", label: "Tiggo 9" },
    { value: "tiggo8pro", label: "Tiggo 8 Pro" },
    { value: "tiggo7pro", label: "Tiggo 7 Pro" },
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