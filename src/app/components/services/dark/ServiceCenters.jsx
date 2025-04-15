"use client";

import { motion } from "framer-motion";
import {
  Calendar,
  Check,
  Clock,
  Mail,
  MapPin,
  Navigation,
  Phone,
} from "lucide-react";
import Image from "next/image";

const ServiceCenter = () => {
  // Single service center info
  const center = {
    name: "Chery Bangladesh Service Center",
    address:
      "206/1-207/1 Bir Uttam Mir Shawkat Sarak, Tejgaon Gulshan Link Road, Dhaka",
    phone: "09639119977",
    email: "info@cherybd.com",
    hours: "8:00 AM - 8:00 PM (Everyday)",
    features: [
      "24/7 Emergency Support",
      "Advanced Diagnostics",
      "Express Service",
      "Genuine Parts Center",
      "Body & Paint Shop",
      "Warranty Service",
    ],
    image: "/images/services/service-center.jpg",
    mapUrl:
      "https://maps.google.com/?q=206/1-207/1+Bir+Uttam+Mir+Shawkat+Sarak+Tejgaon+Gulshan+Link+Road+Dhaka",
  };

  {
    /* Dark gradient overlay */
  }
  <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950 to-black opacity-90"></div>;

  return (
    <section className="py-24 relative bg-gradient-to-b from-black via-[#0a0a0a] to-black"
    >
      {/* Background texture */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.15'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }}
      ></div>
      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-950 via-gray-950 to-black opacity-90"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Heading Section */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
            Our <span className="text-primary-600">Service</span> Center
          </h2>

          <div className="w-24 h-1 bg-primary-600 mx-auto mb-6"></div>

          <p className="text-gray-300 text-lg max-w-3xl mx-auto leading-relaxed">
            Visit our state-of-the-art service center for professional care for
            your Chery vehicle.
          </p>
        </motion.div>

        {/* Quick Contact Banner */}
        <motion.div
          className="max-w-6xl mx-auto mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.7 }}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-[#0f0f0f] border border-gray-800 p-6 flex items-center">
              <div className="w-12 h-12 bg-primary-600 flex items-center justify-center mr-4 shadow-lg">
                <Phone size={24} className="text-white" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Need assistance?</p>
                <a
                  href="tel:09639119977"
                  className="text-white text-lg font-medium hover:text-primary-600 transition-colors"
                >
                  09639119977
                </a>
              </div>
            </div>

            <div className="bg-[#0f0f0f] border border-gray-800 p-6 flex items-center">
              <div className="w-12 h-12 bg-black border border-gray-800 flex items-center justify-center mr-4">
                <Mail size={24} className="text-primary-600" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Email us at</p>
                <a
                  href="mailto:info@cherybd.com"
                  className="text-white text-lg font-medium hover:text-primary-600 transition-colors"
                >
                  info@cherybd.com
                </a>
              </div>
            </div>

            <div className="bg-[#0f0f0f] border border-gray-800 p-6 flex items-center">
              <div className="w-12 h-12 bg-black border border-gray-800 flex items-center justify-center mr-4">
                <Calendar size={24} className="text-primary-600" />
              </div>
              <div>
                <p className="text-gray-400 text-sm">Book a service</p>
                <a
                  href="#book-appointment"
                  className="text-white text-lg font-medium hover:text-primary-600 transition-colors"
                >
                  Schedule Online
                </a>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Service Center and Map Two-Column Layout */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
            {/* Service Center Info */}
            <motion.div
              className="bg-[#0f0f0f] border border-gray-800 shadow-2xl overflow-hidden"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Center Image with Overlay */}
              <div className="relative h-64 overflow-hidden">
                <div className="absolute inset-0 bg-black/40 z-10 group-hover:bg-opacity-20 transition-all duration-300"></div>
                <Image
                  src={center.image}
                  alt={center.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-0 left-0 bg-primary-600 text-white py-1 px-3 text-sm font-medium z-20">
                  AUTHORIZED CENTER
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-2xl font-bold mb-4 text-white">
                  {center.name}
                </h3>

                <div className="flex items-start mb-6">
                  <MapPin
                    size={18}
                    className="text-primary-600 mr-3 mt-1 flex-shrink-0"
                  />
                  <p className="text-gray-300 leading-relaxed">
                    {center.address}
                  </p>
                </div>

                <div className="space-y-4 mb-6 border-t border-gray-800 pt-4">
                  <div className="flex items-start">
                    <Phone
                      size={16}
                      className="text-primary-600 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <a
                      href={`tel:${center.phone}`}
                      className="text-gray-300 hover:text-primary-600 transition-colors"
                    >
                      {center.phone}
                    </a>
                  </div>
                  <div className="flex items-start">
                    <Mail
                      size={16}
                      className="text-primary-600 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <a
                      href={`mailto:${center.email}`}
                      className="text-gray-300 hover:text-primary-600 transition-colors"
                    >
                      {center.email}
                    </a>
                  </div>
                  <div className="flex items-start">
                    <Clock
                      size={16}
                      className="text-primary-600 mr-3 mt-0.5 flex-shrink-0"
                    />
                    <span className="text-gray-300">{center.hours}</span>
                  </div>
                </div>

                <h4 className="text-white font-medium mb-3">Our Services</h4>
                <div className="grid grid-cols-2 gap-2 mb-6">
                  {center.features.map((feature, i) => (
                    <div key={i} className="flex items-center">
                      <div className="w-4 h-4 rounded-full bg-black border border-primary-600 flex items-center justify-center mr-2 flex-shrink-0">
                        <Check size={10} className="text-primary-600" />
                      </div>
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex gap-2">
                  <a
                    href={center.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center border-2 border-primary-600 text-primary-600 py-3 font-medium hover:bg-primary-600 hover:text-white transition-colors duration-300"
                  >
                    <Navigation size={16} className="mr-2" />
                    GET DIRECTIONS
                  </a>

                  <a
                    href="#book-appointment"
                    className="flex-1 flex items-center justify-center bg-primary-600 text-white py-3 font-medium hover:bg-transparent hover:text-primary-600 border-2 border-primary-600 transition-colors duration-300"
                  >
                    <Calendar size={16} className="mr-2" />
                    BOOK SERVICE
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Map Section */}
            <motion.div
              className="h-full"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              <div className="bg-[#0f0f0f] border border-gray-800 h-full flex flex-col shadow-2xl">
                <div className="p-6 border-b border-gray-800">
                  <h3 className="text-xl font-bold text-white flex items-center">
                    <MapPin size={20} className="text-primary-600 mr-2" />
                    Location Map
                  </h3>
                </div>

                <div className="flex-grow relative min-h-[400px]">
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.8872559347437!2d90.41250227609233!3d23.7614267937581!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b88c060ee28d%3A0x5edd747595ad35b3!2s206%2F1-207%2F1%20Bir%20Uttam%20Mir%20Shawkat%20Sarak%2C%20Tejgaon%20-%20Gulshan%20Link%20Rd%2C%20Dhaka%2C%20Bangladesh!5e0!3m2!1sen!2sus!4v1712940325293!5m2!1sen!2sus"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    title="Chery Bangladesh Service Center Location"
                    className="absolute inset-0"
                  ></iframe>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Business Hours and Booking CTA */}
        <motion.div
          className="max-w-6xl mx-auto mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.5 }}
          viewport={{ once: true }}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Business Hours */}
            <div className="bg-[#0f0f0f] border border-gray-800 p-6">
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-black border border-gray-800 flex items-center justify-center mr-4">
                  <Clock size={24} className="text-primary-600" />
                </div>
                <h3 className="text-xl font-bold text-white">Business Hours</h3>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-300">Monday - Friday</span>
                  <span className="text-white">8:00 AM - 8:00 PM</span>
                </div>
                <div className="flex justify-between py-3 border-b border-gray-800">
                  <span className="text-gray-300">Saturday - Sunday</span>
                  <span className="text-white">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between py-3">
                  <span className="text-gray-300">Holidays</span>
                  <span className="text-white">10:00 AM - 4:00 PM</span>
                </div>
              </div>
            </div>

            {/* Booking CTA */}
            <div className="bg-black bg-opacity-70 border border-gray-800 p-6 border-t-4 border-t-primary-600">
              <h3 className="text-xl font-bold text-white mb-4">
                Ready to Schedule Your Service?
              </h3>
              <p className="text-gray-300 mb-6">
                Our factory-trained technicians use advanced diagnostic tools
                and genuine parts to keep your vehicle in optimal condition.
              </p>

              <div className="space-y-3">
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-black border border-primary-600 flex items-center justify-center">
                    <Check size={14} className="text-primary-600" />
                  </div>
                  <span className="text-gray-300">
                    Free multi-point inspection with every service
                  </span>
                </div>
                <div className="flex items-start">
                  <div className="flex-shrink-0 mr-3 w-6 h-6 rounded-full bg-black border border-primary-600 flex items-center justify-center">
                    <Check size={14} className="text-primary-600" />
                  </div>
                  <span className="text-gray-300">
                    Transparent pricing with no hidden charges
                  </span>
                </div>
              </div>

              <div className="mt-6">
                <a
                  href="#book-service"
                  className="block w-full text-center px-6 py-3 bg-primary-600 text-white font-medium border-2 border-primary-600 hover:bg-transparent hover:text-primary-600 transition-colors duration-300"
                >
                  Book Your Appointment Now
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServiceCenter;
