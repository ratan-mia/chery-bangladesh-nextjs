"use client";

import { motion } from "framer-motion";
import { Clock, Headphones, Mail, MapPin, MessageSquare, Phone } from "lucide-react";

const ComplaintContactInfo = () => {
  const contactMethods = [
    {
      icon: Phone,
      title: "Phone Support",
      description: "Speak directly with our complaint resolution team",
      contact: "09639-119977",
      availability: "Mon-Sat: 9:00 AM - 6:00 PM",
      action: "tel:09639119977",
      primary: true
    },
    {
      icon: MessageSquare,
      title: "WhatsApp",
      description: "Quick messaging for urgent complaints",
      contact: "014099-60306",
      availability: "24/7 Available",
      action: "https://wa.me/8801409960306",
      primary: false
    },
    {
      icon: Mail,
      title: "Email Support",
      description: "Detailed complaint submissions with attachments",
      contact: "complaints@cherybd.com",
      availability: "Response within 24 hours",
      action: "mailto:complaints@cherybd.com",
      primary: false
    },
    {
      icon: Headphones,
      title: "Customer Service",
      description: "General inquiries and complaint status",
      contact: "info@cherybd.com",
      availability: "Response within 4-6 hours",
      action: "mailto:info@cherybd.com",
      primary: false
    }
  ];

  const officeInfo = {
    name: "Asian MotorspeX Limited",
    address: "206/1-207/1 Bir Uttam Mir Shawkat Sarak, Tejgaon Gulshan Link Road, Dhaka 1208, Bangladesh",
    hours: [
      { day: "Monday - Thursday", time: "9:00 AM - 6:00 PM" },
      { day: "Friday", time: "9:00 AM - 5:00 PM" },
      { day: "Saturday", time: "9:00 AM - 4:00 PM" },
      { day: "Sunday", time: "Closed" }
    ]
  };

  return (
    <section className="py-20 bg-white relative">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/contact/contact-hero.jpg')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center'
          }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-white via-white/80 to-white/60"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Additional <span className="text-primary-900">Contact Options</span>
          </h2>
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Need immediate assistance or prefer to speak with someone directly? 
            Here are all the ways you can reach our complaint resolution team.
          </p>
        </motion.div>

        {/* Contact Methods Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {contactMethods.map((method, index) => {
            const IconComponent = method.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`relative group ${
                  method.primary 
                    ? 'bg-primary-700 text-white' 
                    : 'bg-white border border-gray-200 hover:border-primary-700'
                } rounded-lg p-6 transition-all duration-300`}
              >
                {method.primary && (
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary-900 text-white text-xs font-semibold px-3 py-1 rounded-full">
                      Recommended
                    </span>
                  </div>
                )}
                
                <div className={`w-16 h-16 ${
                  method.primary 
                    ? 'bg-white/20' 
                    : 'bg-primary-100 group-hover:bg-primary-200'
                } rounded-full flex items-center justify-center mx-auto mb-4 transition-colors duration-300`}>
                  <IconComponent 
                    className={method.primary ? 'text-white' : 'text-primary-700'} 
                    size={28} 
                  />
                </div>
                
                <h3 className={`text-lg font-bold mb-2 ${
                  method.primary ? 'text-white' : 'text-gray-900'
                }`}>
                  {method.title}
                </h3>
                
                <p className={`text-sm mb-4 ${
                  method.primary ? 'text-white/90' : 'text-gray-600'
                }`}>
                  {method.description}
                </p>
                
                <div className="space-y-2">
                  <a
                    href={method.action}
                    className={`block font-semibold ${
                      method.primary 
                        ? 'text-white hover:text-primary-200' 
                        : 'text-primary-700 hover:text-primary-900'
                    } transition-colors duration-300`}
                  >
                    {method.contact}
                  </a>
                  <div className={`flex items-center text-xs ${
                    method.primary ? 'text-white/80' : 'text-gray-500'
                  }`}>
                    <Clock size={12} className="mr-1" />
                    {method.availability}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Office Information */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="bg-gray-50 border border-gray-200 rounded-lg p-8"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Office Details */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <MapPin size={24} className="mr-3 text-primary-700" />
                Visit Our Office
              </h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-1">{officeInfo.name}</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {officeInfo.address}
                  </p>
                </div>
                
                <div className="flex flex-col sm:flex-row gap-4">
                  <a
                    href="https://maps.google.com/?q=Asian+MotorspeX+Limited+Dhaka"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center px-4 py-2 bg-primary-700 text-white font-medium hover:bg-primary-800 transition-colors duration-300 rounded-md text-center"
                  >
                    <MapPin size={16} className="mr-2" />
                    Get Directions
                  </a>
                  <a
                    href="tel:09639119977"
                    className="inline-flex items-center px-4 py-2 border border-primary-700 text-primary-700 font-medium hover:bg-primary-50 transition-colors duration-300 rounded-md text-center"
                  >
                    <Phone size={16} className="mr-2" />
                    Call Office
                  </a>
                </div>
              </div>
            </div>

            {/* Office Hours */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <Clock size={24} className="mr-3 text-primary-700" />
                Office Hours
              </h3>
              
              <div className="space-y-3">
                {officeInfo.hours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0">
                    <span className="font-medium text-gray-700">{schedule.day}</span>
                    <span className="text-gray-600">{schedule.time}</span>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 p-4 bg-primary-50 border border-primary-200 rounded-lg">
                <h4 className="font-semibold text-primary-900 mb-2">
                  Emergency Support
                </h4>
                <p className="text-primary-800 text-sm">
                  For urgent safety concerns outside office hours, 
                  contact our 24/7 WhatsApp support at 014099-60306
                </p>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Additional Help */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-white border border-gray-200 rounded-lg p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Need Help?
            </h3>
            <p className="text-gray-600 mb-6">
              If you're unsure about the best way to contact us or need guidance 
              on how to file your complaint, our customer service team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="#file-complaint"
                className="inline-flex items-center px-6 py-3 bg-primary-700 text-white font-medium hover:bg-primary-800 transition-colors duration-300 rounded-md"
              >
                File Complaint Online
              </a>
              <a
                href="tel:09639119977"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-300 rounded-md"
              >
                <Phone size={16} className="mr-2" />
                Speak to Representative
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplaintContactInfo;