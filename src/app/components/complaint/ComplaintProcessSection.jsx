"use client";

import { motion } from "framer-motion";
import {
    CheckCircle,
    Clock,
    FileText,
    MessageSquare,
    Search,
    Settings,
    Star,
    Users
} from "lucide-react";

const ComplaintProcessSection = () => {
  const processSteps = [
    {
      icon: FileText,
      title: "Submit Complaint",
      description: "Fill out our comprehensive complaint form with detailed information about your concern.",
      duration: "2-5 minutes",
      status: "immediate"
    },
    {
      icon: CheckCircle,
      title: "Acknowledgment",
      description: "You'll receive an email confirmation with your complaint ID within 4 hours of submission.",
      duration: "Within 4 hours",
      status: "automated"
    },
    {
      icon: Users,
      title: "Team Assignment",
      description: "Your complaint is assigned to the appropriate specialist team based on the issue type.",
      duration: "Within 24 hours",
      status: "manual"
    },
    {
      icon: Search,
      title: "Investigation",
      description: "Our team investigates the issue, reviews vehicle history, and contacts relevant parties.",
      duration: "1-5 business days",
      status: "ongoing"
    },
    {
      icon: MessageSquare,
      title: "Communication",
      description: "We'll contact you for additional information if needed and provide regular updates.",
      duration: "Throughout process",
      status: "interactive"
    },
    {
      icon: Settings,
      title: "Resolution",
      description: "We implement the agreed solution, coordinate repairs, or provide appropriate compensation.",
      duration: "Varies by issue",
      status: "solution"
    },
    {
      icon: Star,
      title: "Follow-up",
      description: "We follow up to ensure your satisfaction and that the issue has been fully resolved.",
      duration: "1-2 weeks later",
      status: "closure"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { x: -50, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'immediate': return 'bg-green-100 text-green-800 border-green-200';
      case 'automated': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'manual': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'ongoing': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'interactive': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'solution': return 'bg-primary-100 text-primary-800 border-primary-200';
      case 'closure': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 opacity-8">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('/images/services/service-working.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-white/95 via-white/97 to-white/95"></div>
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
            Our Complaint <span className="text-primary-900">Resolution Process</span>
          </h2>
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We follow a structured, transparent process to ensure every complaint is handled 
            professionally and resolved to your satisfaction. Here's how we work with you 
            every step of the way.
          </p>
        </motion.div>

        {/* Process Timeline */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="relative"
        >
          {/* Timeline Line */}
          <div className="absolute left-8 top-8 bottom-8 w-0.5 bg-gradient-to-b from-primary-700 via-primary-500 to-primary-300 hidden md:block"></div>

          <div className="space-y-8">
            {processSteps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <motion.div
                  key={index}
                  variants={itemVariants}
                  className="relative flex items-start"
                >
                  {/* Step Number and Icon */}
                  <div className="flex-shrink-0 relative">
                    <div className="w-16 h-16 bg-primary-700 rounded-full flex items-center justify-center shadow-lg">
                      <div className="absolute -top-2 -right-2 w-6 h-6 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className="text-xs font-bold text-primary-900">{index + 1}</span>
                      </div>
                      <IconComponent className="text-white" size={24} />
                    </div>
                  </div>

                  {/* Content */}
                  <div className="ml-6 flex-1">
                    <div className="bg-white border border-gray-200 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-900 mb-2 md:mb-0">
                          {step.title}
                        </h3>
                        <div className="flex flex-col md:flex-row md:items-center gap-2">
                          <span className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(step.status)}`}>
                            {step.status.charAt(0).toUpperCase() + step.status.slice(1)}
                          </span>
                          <div className="flex items-center text-gray-500 text-sm">
                            <Clock size={14} className="mr-1" />
                            {step.duration}
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-600 leading-normal">
                        {step.description}
                      </p>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Key Principles */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-20"
        >
          <h3 className="text-2xl md:text-3xl font-bold text-gray-900 text-center mb-12">
            Our Commitment to You
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-primary-700" size={28} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Timely Response</h4>
              <p className="text-gray-600 text-sm">
                We acknowledge every complaint within 4 hours and provide regular updates throughout the process.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <MessageSquare className="text-primary-700" size={28} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Clear Communication</h4>
              <p className="text-gray-600 text-sm">
                We keep you informed at every step with clear, honest communication about progress and next steps.
              </p>
            </div>

            <div className="text-center p-6 bg-gray-50 rounded-lg">
              <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="text-primary-700" size={28} />
              </div>
              <h4 className="text-lg font-bold text-gray-900 mb-2">Fair Resolution</h4>
              <p className="text-gray-600 text-sm">
                We work towards solutions that are fair, reasonable, and focused on your satisfaction.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Emergency Note */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="mt-12 bg-primary-50 border border-primary-200 rounded-lg p-6"
        >
          <div className="flex items-start">
            <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mr-4 flex-shrink-0">
              <Clock className="text-primary-700" size={20} />
            </div>
            <div>
              <h4 className="text-lg font-bold text-primary-900 mb-2">
                Urgent or Safety-Related Issues?
              </h4>
              <p className="text-primary-800 mb-4">
                If your complaint involves a safety concern or your vehicle is unsafe to drive, 
                please contact us immediately rather than waiting for the online process.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="tel:09639119977"
                  className="inline-flex items-center px-4 py-2 bg-primary-700 text-white font-medium hover:bg-primary-800 transition-colors duration-300 rounded-md text-center"
                >
                  Call Now: 09639-119977
                </a>
                <a
                  href="https://wa.me/8801409960306"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 border border-primary-700 text-primary-700 font-medium hover:bg-primary-50 transition-colors duration-300 rounded-md text-center"
                >
                  WhatsApp: 014099-60306
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplaintProcessSection;