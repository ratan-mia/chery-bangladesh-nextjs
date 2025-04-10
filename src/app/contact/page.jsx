'use client'

import { useEffect } from 'react'
import ContactForm from '../components/contact/ContactForm'
import ContactInfo from '../components/contact/ContactInfo'
import FaqSection from '../components/contact/FaqSection'
import HeroSection from '../components/contact/HeroSection'
import MapSection from '../components/contact/MapSection'

export default function ContactPage() {
  // Theme configuration based on the climate design system
  const theme = {
    accent: '#e2cdb8',
    text: '#ffffff',
    textSecondary: 'rgba(255, 255, 255, 0.95)',
    buttonBg: '#e2cdb8',
    buttonText: '#111827',
    accentLine: '#e2cdb8',
    contentBg: 'rgba(17, 24, 39, 0.85)'
  }
  
  const officeInfo = {
    name: 'Chery Bangladesh',
    address: '206/1-207/1 Bir Uttam Mir Shawkat Sarak Tejgaon Gulshan Link Road, Dhaka',
    phone: '09639119977',
    email: 'info@cherybd.com',
    hours: 'Mon-Fri: 9:00 AM - 6:00 PM, Sat: 10:00 AM - 4:00 PM',
    coordinates: '23.777319,90.412587',
    mapLocation: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.3042707244614!2d90.41258731496817!3d23.77731898458251!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c77aaaaaaaa%3A0xbbbbbbbbbbbbbbbb!2sTejgaon%20Gulshan%20Link%20Road%2C%20Dhaka!5e0!3m2!1sen!2sbd!4v1648653723428!5m2!1sen!2sbd'
  }

  // Vehicle models
  const models = [
    { value: 'tiggo9', label: 'Tiggo 9' },
    { value: 'tiggo8', label: 'Tiggo 8' },
    { value: 'tiggo7', label: 'Tiggo 7' },
    { value: 'tiggo4pro', label: 'Tiggo 4 Pro' },
    { value: 'tiggo2pro', label: 'Tiggo 2 Pro' },
    { value: 'arrizo8', label: 'Arrizo 8' },
    { value: 'arrizo7', label: 'Arrizo 7' },
    { value: 'arrizo5', label: 'Arrizo 5' }
  ]

  // For smooth scrolling to sections when using anchor links
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash) {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };

    // Handle initial load with hash in URL
    if (window.location.hash) {
      setTimeout(handleHashChange, 100);
    }

    // Add listener for hash changes
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  return (
    <main className="min-h-screen" style={{ backgroundColor: '#111827' }}>
      {/* Hero section */}
      <HeroSection />

      {/* Contact info and form section */}
      <section className="py-20 sm:py-28 relative overflow-hidden" id="contact-form">
        {/* Background gradient */}
        <div className="absolute inset-0 z-0">
          <div
            className="absolute inset-0 z-0"
            style={{
              background: 'linear-gradient(to bottom, rgba(17, 24, 39, 0.98), rgba(17, 24, 39, 0.95))'
            }}
          />
        </div>
        
        {/* Subtle pattern overlay */}
        <div 
          className="absolute inset-0 z-0 opacity-5"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
          aria-hidden="true"
        />
        
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row gap-12 max-w-7xl mx-auto">
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
        
        {/* Decorative element */}
        <div 
          className="absolute right-0 top-1/4 -mr-20 w-80 h-80 blur-3xl opacity-10 z-0"
          style={{
            background: `radial-gradient(circle at center, ${theme.accent}66 0%, transparent 70%)`
          }}
          aria-hidden="true"
        />
      </section>

      {/* Map section */}
      <MapSection 
        mapSrc={officeInfo.mapLocation} 
        location={{
          address: officeInfo.address,
          coordinates: officeInfo.coordinates
        }}
      />

      {/* FAQ section */}
      <FaqSection />
    </main>
  )
}