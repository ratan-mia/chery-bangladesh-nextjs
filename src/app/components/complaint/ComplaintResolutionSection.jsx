"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Clock, Shield, TrendingUp } from "lucide-react";

const ComplaintResolutionSection = () => {
  const resolutionTimelines = [
    {
      priority: "Critical",
      icon: AlertTriangle,
      timeframe: "24-48 Hours",
      description: "Safety concerns or vehicle completely unusable",
      color: "bg-red-500",
      bgColor: "bg-red-50",
      borderColor: "border-red-200",
      textColor: "text-red-800"
    },
    {
      priority: "High",
      icon: Shield,
      timeframe: "1-2 Business Days",
      description: "Significant impact on vehicle use or major inconvenience",
      color: "bg-orange-500",
      bgColor: "bg-orange-50",
      borderColor: "border-orange-200",
      textColor: "text-orange-800"
    },
    {
      priority: "Medium",
      icon: TrendingUp,
      timeframe: "3-5 Business Days",
      description: "Moderate impact on vehicle use or service issues",
      color: "bg-yellow-500",
      bgColor: "bg-yellow-50",
      borderColor: "border-yellow-200",
      textColor: "text-yellow-800"
    },
    {
      priority: "Low",
      icon: Clock,
      timeframe: "7-10 Business Days",
      description: "General inquiries or minor issues",
      color: "bg-green-500",
      bgColor: "bg-green-50",
      borderColor: "border-green-200",
      textColor: "text-green-800"
    }
  ];

  return (
    <section className="py-20 bg-gray-50 relative">
      {/* Background Image */}
      <div className="absolute inset-0 opacity-8">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-fixed"
          style={{
            backgroundImage: `url('/images/services/service-working2.jpg')`
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/96 via-gray-50/98 to-gray-50/96"></div>
      </div>
      <div className="max-w-7xl mx-auto px-4 md:px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6">
            Resolution <span className="text-primary-900">Timeline</span>
          </h2>
          <div className="w-24 h-1 bg-primary-700 mx-auto mb-8"></div>
          <p className="text-gray-600 text-lg max-w-3xl mx-auto">
            Our resolution timelines vary based on the priority and complexity of your complaint. 
            Here's what you can expect for different types of issues.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {resolutionTimelines.map((item, index) => {
            const IconComponent = item.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`${item.bgColor} ${item.borderColor} border rounded-lg p-6 text-center hover:shadow-md transition-shadow duration-300`}
              >
                <div className={`w-16 h-16 ${item.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <IconComponent className="text-white" size={28} />
                </div>
                <h3 className={`text-xl font-bold ${item.textColor} mb-2`}>
                  {item.priority} Priority
                </h3>
                <div className="text-2xl font-bold text-gray-900 mb-3">
                  {item.timeframe}
                </div>
                <p className="text-gray-600 text-sm">
                  {item.description}
                </p>
              </motion.div>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="mt-12 bg-white border border-gray-200 rounded-lg p-8"
        >
          <h3 className="text-2xl font-bold text-gray-900 text-center mb-8">
            What Affects Resolution Time?
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-700 font-bold">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Issue Complexity</h4>
              <p className="text-gray-600 text-sm">
                Technical issues may require investigation with manufacturers or specialists
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-700 font-bold">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Information Availability</h4>
              <p className="text-gray-600 text-sm">
                Complete vehicle history and documentation speeds up the process
              </p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-primary-700 font-bold">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Parts & Service</h4>
              <p className="text-gray-600 text-sm">
                Availability of required parts or specialized service appointments
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComplaintResolutionSection;