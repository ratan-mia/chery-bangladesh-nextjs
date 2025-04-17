'use client'

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';

const ComingSoonPage = () => {
  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  // Form state
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  // Launch date - set to 30 days from now
  const launchDate = new Date();
  launchDate.setDate(launchDate.getDate() + 30);

  // Calculate time remaining
  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date();
      const difference = launchDate - now;
      
      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
        return;
      }
      
      const days = Math.floor(difference / (1000 * 60 * 60 * 24));
      const hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
      const minutes = Math.floor((difference / (1000 * 60)) % 60);
      const seconds = Math.floor((difference / 1000) % 60);
      
      setTimeLeft({ days, hours, minutes, seconds });
    }, 1000);
    
    return () => clearInterval(timer);
  }, [launchDate]);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple email validation
    if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    // Here you would typically send this to your backend/API
    console.log('Subscribing email:', email);
    
    // Show success state
    setSubmitted(true);
    setError('');
    setEmail('');
    
    // Reset success message after 5 seconds
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5 },
    },
  };

  // Time unit component for countdown
  const TimeUnit = ({ value, label }) => (
    <div className="flex flex-col items-center">
      <div className="w-16 h-16 md:w-24 md:h-24 bg-white/90 backdrop-blur-sm border-l-2 border-primary-700 flex items-center justify-center mb-2 shadow-sm">
        <span className="text-2xl md:text-4xl font-bold text-gray-900">{value}</span>
      </div>
      <span className="text-xs md:text-sm text-gray-600 uppercase tracking-wider">{label}</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-white relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary-light/20 via-white to-white z-0"></div>
      
      {/* Car silhouette background */}
      <div className="absolute bottom-0 right-0 w-full md:w-2/3 h-full opacity-5 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/api/placeholder/1200/800" 
            alt="Car silhouette"
            fill
            className="object-contain object-right-bottom"
          />
        </div>
      </div>
      
      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24 flex flex-col min-h-screen">
        <header className="mb-12 md:mb-20">
          <div className="flex justify-between items-center">
            {/* Logo */}
            <div className="w-40 md:w-48">
              <Image
                src="/api/placeholder/240/80" 
                alt="Chery Bangladesh"
                width={240}
                height={80}
                className="object-contain"
              />
            </div>
            
            {/* Social links */}
            <div className="flex space-x-4">
              {['facebook', 'instagram', 'twitter', 'youtube'].map((social) => (
                <a
                  key={social}
                  href={`https://${social}.com`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 border border-gray-200 flex items-center justify-center text-gray-600 hover:text-primary-900 hover:border-primary-700 transition-colors duration-300"
                  aria-label={`Follow us on ${social}`}
                >
                  <span className="sr-only">Follow us on {social}</span>
                  <div className="w-5 h-5 bg-gray-400"></div> {/* Placeholder for social icon */}
                </a>
              ))}
            </div>
          </div>
        </header>
        
        <motion.main 
          className="flex-grow flex flex-col justify-center py-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <div className="max-w-3xl">
            <motion.div variants={itemVariants}>
              <div className="bg-primary-700 h-1 w-24 mb-8"></div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
                Experience <span className="text-primary-900">Luxury</span> <br/>
                Coming Soon to Bangladesh
              </h1>
            </motion.div>
            
            <motion.p 
              className="text-gray-600 text-lg md:text-xl mb-12 max-w-2xl"
              variants={itemVariants}
            >
              We're preparing to bring Chery's premium vehicles to Bangladesh. 
              Sign up to be the first to know about our launch, exclusive events, and special offers.
            </motion.p>
            
            {/* Countdown timer */}
            <motion.div 
              className="mb-16"
              variants={itemVariants}
            >
              <p className="text-sm text-gray-500 uppercase tracking-wider mb-4">Launching in</p>
              <div className="flex space-x-4 md:space-x-6">
                <TimeUnit value={timeLeft.days} label="Days" />
                <TimeUnit value={timeLeft.hours} label="Hours" />
                <TimeUnit value={timeLeft.minutes} label="Minutes" />
                <TimeUnit value={timeLeft.seconds} label="Seconds" />
              </div>
            </motion.div>
            
            {/* Email signup form */}
            <motion.div variants={itemVariants}>
              <form onSubmit={handleSubmit} className="max-w-md">
                <p className="text-sm text-gray-600 mb-3">Get notified when we launch</p>
                <div className="flex flex-col sm:flex-row">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    className="flex-grow px-4 py-3 border border-gray-200 focus:border-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-700 focus:ring-opacity-20 mb-2 sm:mb-0 sm:mr-2"
                    aria-label="Your email address"
                  />
                  <button
                    type="submit"
                    className="group inline-flex items-center px-6 py-3 bg-primary-700 text-white font-medium hover:bg-primary-800 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-700"
                  >
                    Notify Me
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-2 group-hover:ml-3 transition-all duration-300">
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </button>
                </div>
                
                {/* Form feedback */}
                {error && <p className="mt-2 text-sm text-error-red">{error}</p>}
                {submitted && <p className="mt-2 text-sm text-success-green">Thank you! We'll be in touch soon.</p>}
              </form>
            </motion.div>
          </div>
        </motion.main>
        
        <footer className="pt-16 pb-8">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div className="mb-6 md:mb-0">
              <p className="text-sm text-gray-500">
                © {new Date().getFullYear()} Chery Bangladesh. All rights reserved.
              </p>
            </div>
            
            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
              <Link href="#privacy" className="hover:text-primary-900 transition-colors">Privacy Policy</Link>
              <Link href="#terms" className="hover:text-primary-900 transition-colors">Terms of Service</Link>
              <Link href="#contact" className="hover:text-primary-900 transition-colors">Contact Us</Link>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default ComingSoonPage;