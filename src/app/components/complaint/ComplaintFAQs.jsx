"use client";

import { motion } from "framer-motion";
import { ChevronDown, ChevronUp, HelpCircle } from "lucide-react";
import { useState } from "react";

const ComplaintFAQs = () => {
  const [openFAQ, setOpenFAQ] = useState(null);

  const faqs = [
    {
      question: "How long does it take to resolve a complaint?",
      answer: "Resolution time varies based on the complexity and priority of your complaint. Critical safety issues are handled within 24-48 hours, while general inquiries may take 7-10 business days. We provide regular updates throughout the process and will give you a more specific timeline once we assess your particular situation."
    },
    {
      question: "What information should I include in my complaint?",
      answer: "To help us resolve your complaint quickly, please provide: your vehicle details (model, year, VIN), purchase information, detailed description of the issue, any previous service history, photos or documents if relevant, and your contact information. The more details you provide, the faster we can work on a solution."
    },
    {
      question: "Can I track the status of my complaint?",
      answer: "Yes! When you submit a complaint, you'll receive a unique complaint ID via email. You can use this ID to check your complaint status by calling our customer service at 09639-119977 or emailing complaints@cherybd.com. We also provide regular updates via email and phone calls."
    },
    {
      question: "What if I'm not satisfied with the initial resolution?",
      answer: "If you're not satisfied with our initial response, you can request escalation to our senior complaint resolution team. We have a multi-tier review process, and if needed, we can involve regional management or manufacturer representatives to ensure a fair resolution."
    },
    {
      question: "Is there a cost for complaint resolution services?",
      answer: "No, filing a complaint and our complaint resolution services are completely free. However, if the resolution involves repairs or parts that are outside warranty coverage, those costs would be discussed with you before any work is performed."
    },
    {
      question: "Can I file a complaint on behalf of someone else?",
      answer: "You can file a complaint on behalf of a family member, but we'll need written authorization from the vehicle owner and their contact information for verification. For privacy and security reasons, we can only discuss complaint details with the authorized person."
    },
    {
      question: "What happens if my vehicle is still under warranty?",
      answer: "If your complaint involves a warranty-covered issue, we'll coordinate with the manufacturer and ensure all warranty terms are properly applied. Warranty claims often have faster resolution times and may involve different procedures than non-warranty complaints."
    },
    {
      question: "Do you handle complaints about dealer service?",
      answer: "Yes, we handle complaints about dealer service quality, staff behavior, service delays, and facility issues. We work closely with our dealer network to ensure consistent service standards and will address any service-related concerns promptly."
    },
    {
      question: "What if my complaint involves a safety issue?",
      answer: "Safety-related complaints receive the highest priority. Please contact us immediately at 09639-119977 or WhatsApp 014099-60306 if you have any safety concerns. Do not continue driving if you believe the vehicle is unsafe. We may arrange immediate inspection or towing if necessary."
    },
    {
      question: "Can I submit documents or photos with my complaint?",
      answer: "While the online form doesn't currently support file uploads, you can email documents, photos, or videos to complaints@cherybd.com with your complaint ID in the subject line. You can also bring physical documents to our office or send them via WhatsApp."
    }
  ];

  const toggleFAQ = (index) => {
    setOpenFAQ(openFAQ === index ? null : index);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 md:px-6">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Frequently Asked <span className="text-primary-900">Questions</span>
          </h2>
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg">
            Find quick answers to common questions about our complaint resolution process. 
            If you don't find what you're looking for, feel free to contact us directly.
          </p>
        </motion.div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.05 }}
              className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-50 transition-colors duration-200"
              >
                <div className="flex items-start">
                  <HelpCircle size={20} className="text-primary-700 mr-3 mt-0.5 flex-shrink-0" />
                  <h3 className="text-lg font-semibold text-gray-900 pr-4">
                    {faq.question}
                  </h3>
                </div>
                <div className="flex-shrink-0">
                  {openFAQ === index ? (
                    <ChevronUp size={20} className="text-gray-500" />
                  ) : (
                    <ChevronDown size={20} className="text-gray-500" />
                  )}
                </div>
              </button>
              
              <motion.div
                initial={false}
                animate={{ 
                  height: openFAQ === index ? "auto" : 0,
                  opacity: openFAQ === index ? 1 : 0
                }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="px-6 pb-4 pl-11">
                  <p className="text-gray-600 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Contact CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="text-center mt-16"
        >
          <div className="bg-white border border-gray-200 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Still Have Questions?
            </h3>
            <p className="text-gray-600 mb-6">
              Our complaint resolution team is here to help you understand the process 
              and guide you through filing your complaint.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:09639119977"
                className="inline-flex items-center px-6 py-3 bg-primary-700 text-white font-medium hover:bg-primary-800 transition-colors duration-300 rounded-md"
              >
                Call Us: 09639-119977
              </a>
              <a
                href="mailto:complaints@cherybd.com"
                className="inline-flex items-center px-6 py-3 border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors duration-300 rounded-md"
              >
                Email: complaints@cherybd.com
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplaintFAQs;