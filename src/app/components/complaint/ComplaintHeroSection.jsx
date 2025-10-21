"use client";

import { motion } from "framer-motion";
import { ArrowRight, Clock, MessageSquareX, Shield } from "lucide-react";
import Image from "next/image";

const ComplaintHeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/services/hero-bg.jpg"
          alt="Chery Bangladesh Customer Service"
          fill
          sizes="100vw"
          className="object-cover"
          priority
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/90 via-primary-900/70 to-primary-800/60" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="text-white"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center bg-white/10 backdrop-blur-sm border border-white/20 px-4 py-2 rounded-full mb-6"
            >
              <MessageSquareX size={20} className="mr-2 text-primary-light" />
              <span className="text-sm font-medium">Customer Complaint Center</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6"
            >
              We're Here to{" "}
              <span className="text-primary-light">Listen</span> and{" "}
              <span className="text-primary-light">Resolve</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="text-lg md:text-xl text-gray-200 mb-8 leading-normal"
            >
              Your satisfaction is our priority. Submit your complaint and we'll work 
              with you to find the best solution. Our dedicated team is committed to 
              resolving issues quickly and professionally.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="grid grid-cols-3 gap-6 mb-8"
            >
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-light mb-1">24h</div>
                <div className="text-sm text-gray-300">Response Time</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-light mb-1">98%</div>
                <div className="text-sm text-gray-300">Resolution Rate</div>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary-light mb-1">5★</div>
                <div className="text-sm text-gray-300">Service Rating</div>
              </div>
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <a
                href="#file-complaint"
                className="group inline-flex items-center justify-center px-8 py-4 bg-primary-700 text-white font-medium hover:bg-primary-800 transition-all duration-300 text-center"
              >
                File a Complaint
                <ArrowRight
                  size={20}
                  className="ml-2 group-hover:ml-3 transition-all duration-300"
                />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center justify-center bg-transparent border border-white/30 text-white px-8 py-4 font-medium hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-center"
              >
                Contact Support
              </a>
            </motion.div>
          </motion.div>

          {/* Right Content - Service Features */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Feature Cards */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-light bg-opacity-20 flex items-center justify-center rounded-lg">
                  <Clock className="text-primary-light" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Quick Response</h3>
                  <p className="text-gray-200 text-sm">
                    We acknowledge all complaints within 4 hours and provide regular updates throughout the resolution process.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-light bg-opacity-20 flex items-center justify-center rounded-lg">
                  <Shield className="text-primary-light" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Professional Resolution</h3>
                  <p className="text-gray-200 text-sm">
                    Our experienced team works with authorized dealers and technical experts to ensure proper resolution.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="bg-white/10 backdrop-blur-sm border border-white/20 p-6 rounded-lg"
            >
              <div className="flex items-start space-x-4">
                <div className="w-12 h-12 bg-primary-light bg-opacity-20 flex items-center justify-center rounded-lg">
                  <MessageSquareX className="text-primary-light" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Transparent Process</h3>
                  <p className="text-gray-200 text-sm">
                    Track your complaint status and receive detailed updates at every step of the resolution process.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10"
      >
        <div className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default ComplaintHeroSection;