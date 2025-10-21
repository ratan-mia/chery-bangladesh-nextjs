"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { CheckCircle, Clock, Shield, Users } from "lucide-react";

const ComplaintBannerSection = () => {
  const features = [
    {
      icon: Clock,
      title: "24H Response",
      description: "Fast acknowledgment of your complaint"
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Dedicated specialists handle your case"
    },
    {
      icon: Shield,
      title: "Guaranteed Resolution",
      description: "We work until you're satisfied"
    },
    {
      icon: CheckCircle,
      title: "Transparent Process",
      description: "Track your complaint progress"
    }
  ];

  return (
    <section className="relative py-16 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-slider/header-image.jpg"
          alt="Chery Bangladesh Service Excellence"
          fill
          sizes="100vw"
          className="object-cover"
        />
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-primary-900/95 via-primary-800/90 to-primary-900/95" />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Your Voice Matters to Us
          </h2>
          <p className="text-primary-light text-lg max-w-2xl mx-auto">
            Experience our commitment to customer satisfaction through our comprehensive complaint resolution system
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 group-hover:bg-white/20 transition-colors duration-300">
                  <IconComponent size={32} className="text-primary-light" />
                </div>
                <h3 className="text-white font-semibold mb-2 text-lg">
                  {feature.title}
                </h3>
                <p className="text-primary-light text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};

export default ComplaintBannerSection;