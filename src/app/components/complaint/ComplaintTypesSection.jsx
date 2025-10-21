"use client";

import { motion } from "framer-motion";
import {
  ArrowRight,
  Car,
  CreditCard,
  FileText,
  Shield,
  Users,
  Wrench
} from "lucide-react";

const ComplaintTypesSection = () => {
  const complaintTypes = [
    {
      icon: Car,
      title: "Vehicle Quality Issues",
      description: "Manufacturing defects, paint issues, interior/exterior problems, or performance concerns.",
      examples: ["Paint defects", "Interior wear", "Unusual noises", "Performance issues"],
      priority: "High",
      timeline: "1-2 business days"
    },
    {
      icon: Wrench,
      title: "Service & Maintenance",
      description: "Poor service quality, delayed repairs, incorrect diagnosis, or parts availability issues.",
      examples: ["Service delays", "Poor workmanship", "Parts unavailability", "Incorrect repairs"],
      priority: "Medium",
      timeline: "3-5 business days"
    },
    {
      icon: Shield,
      title: "Warranty Claims",
      description: "Warranty disputes, claim rejections, coverage questions, or processing delays.",
      examples: ["Claim rejection", "Coverage disputes", "Processing delays", "Documentation issues"],
      priority: "High",
      timeline: "1-2 business days"
    },
    {
      icon: CreditCard,
      title: "Billing & Payment",
      description: "Incorrect charges, payment processing issues, invoice disputes, or financial concerns.",
      examples: ["Overcharging", "Payment errors", "Invoice disputes", "Refund delays"],
      priority: "Medium",
      timeline: "3-5 business days"
    },
    {
      icon: Users,
      title: "Customer Service",
      description: "Staff behavior, communication issues, appointment problems, or facility concerns.",
      examples: ["Staff attitude", "Communication gaps", "Appointment issues", "Facility problems"],
      priority: "Low",
      timeline: "7-10 business days"
    },
    {
      icon: FileText,
      title: "Documentation Issues",
      description: "Missing documents, registration problems, title issues, or paperwork errors.",
      examples: ["Missing paperwork", "Registration delays", "Title problems", "Document errors"],
      priority: "Medium",
      timeline: "3-5 business days"
    }
  ];

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
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6 },
    },
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'text-red-600 bg-red-50 border-red-200';
      case 'Medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'Low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <section className="py-20 bg-white relative">
      {/* Subtle Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url('/images/car-silhouette.png')`,
            backgroundSize: '200px',
            backgroundPosition: 'center right'
          }}
        ></div>
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
            Types of <span className="text-primary-900">Complaints</span>
          </h2>
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            We handle various types of complaints to ensure your complete satisfaction. 
            Select the category that best describes your concern for faster resolution.
          </p>
        </motion.div>

        {/* Complaint Types Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8"
        >
          {complaintTypes.map((type, index) => {
            const IconComponent = type.icon;
            return (
              <motion.div
                key={index}
                variants={itemVariants}
                className="relative border border-gray-200 bg-white shadow-sm overflow-hidden group hover:border-primary-700 transition-all duration-300"
              >
                {/* Top accent */}
                <div className="h-1 w-full bg-primary-800 opacity-40 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Content */}
                <div className="p-8">
                  <div className="w-16 h-16 bg-primary-light bg-opacity-40 flex items-center justify-center mb-6">
                    <IconComponent className="text-primary-900" size={28} />
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-primary-900 transition-colors duration-300">
                    {type.title}
                  </h3>
                  
                  <p className="text-gray-600 leading-normal mb-8">{type.description}</p>
                  <div className="flex items-center text-primary-700 font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span>File this complaint</span>
                    <ArrowRight
                      size={16}
                      className="ml-2 group-hover:ml-3 transition-all duration-300"
                    />
                  </div>
                </div>
                
                {/* Bottom accent line that fills on hover */}
                <div className="h-0.5 w-full bg-gray-200 mt-auto">
                  <div className="h-full bg-primary-700 w-0 group-hover:w-full transition-all duration-700 ease-out" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Call to Action following design system */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-white/90 backdrop-blur-sm border-l-2 border-primary-700 p-8 shadow-sm max-w-4xl mx-auto">
            <div className="flex items-center justify-center mb-4">
              <FileText className="h-6 w-6 text-primary-700 mr-2" />
              <span className="text-gray-900 font-medium">Custom Complaint</span>
            </div>
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
              Don't see your issue listed?
            </h3>
            <p className="text-gray-600 mb-8 max-w-2xl mx-auto">
              No problem! You can still file a complaint and our expert team will categorize it appropriately 
              to ensure you get the most effective support and resolution.
            </p>
            <a
              href="#file-complaint"
              className="group inline-flex items-center px-10 py-4 bg-primary-700 text-white font-medium hover:bg-primary-900 transition-colors duration-300"
            >
              File Your Complaint
              <ArrowRight
                size={20}
                className="ml-2 group-hover:ml-3 transition-all duration-300"
              />
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplaintTypesSection;