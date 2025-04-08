"use client";

import { motion } from "framer-motion";
import React, { useEffect, useRef, useState } from "react";

const VehicleSpecs = ({
  title = "Dynamic/Energetic Appearance",
  subtitle = "See style, see grace",
  specs = [
    {
      name: "Length",
      value: "4720",
      unit: "mm",
      description: "Overall vehicle length from bumper to bumper",
    },
    {
      name: "Width",
      value: "1860",
      unit: "mm",
      description: "Maximum width including mirrors",
    },
    {
      name: "Height",
      value: "1705",
      unit: "mm",
      description: "Maximum height from ground to roof",
    },
    {
      name: "Wheelbase",
      value: "2710",
      unit: "mm",
      description: "Distance between front and rear wheel centers",
    },
  ],
  category = "Appearance",
  backgroundColor = "bg-gray-50",
  accentColor = "bg-primary",
  textColor = "text-gray-900",
  secondaryTextColor = "text-gray-600",
}) => {
  const [isInView, setIsInView] = useState(false);
  const [activeSpec, setActiveSpec] = useState(null);
  const sectionRef = useRef(null);

  // Check if section is in viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  const SpecCard = ({ spec, index }) => {
    const isActive = activeSpec === index;

    return (
      <motion.div
        variants={itemVariants}
        className={`py-6 ${
          index < specs.length - 1
            ? "border-b md:border-b-0 md:border-r border-gray-200"
            : "border-b md:border-b-0"
        }`}
        onMouseEnter={() => setActiveSpec(index)}
        onMouseLeave={() => setActiveSpec(null)}
      >
        <div
          className={`px-4 md:px-6 py-2 relative transition-all duration-300 h-full flex flex-col ${
            isActive ? "transform-gpu scale-105" : ""
          }`}
        >
          {/* Accent bar - only visible on hover/active */}
          <div
            className={`absolute top-0 left-0 w-1 h-0 ${accentColor} transition-all duration-300`}
            style={{
              height: isActive ? "100%" : "30%",
              opacity: isActive ? 1 : 0.5,
            }}
          ></div>

          <div className="pl-3">
            <h4 className={`${secondaryTextColor} text-lg font-medium mb-3`}>
              {spec.name}
            </h4>
            <p className="flex items-baseline mb-3">
              <span
                className={`${textColor} text-3xl font-bold mr-2 transition-all duration-300 ${
                  isActive ? "text-primary" : ""
                }`}
              >
                {spec.value}
              </span>
              {spec.unit && (
                <span className={`${secondaryTextColor} text-lg`}>
                  {spec.unit}
                </span>
              )}
            </p>

            {/* Description - only appears on hover */}
            {spec.description && (
              <div
                className={`text-sm ${secondaryTextColor} transition-all duration-300 ${
                  isActive
                    ? "opacity-100 max-h-20"
                    : "opacity-0 max-h-0 overflow-hidden"
                }`}
              >
                {spec.description}
              </div>
            )}
          </div>
        </div>
      </motion.div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className={`${backgroundColor} py-16 md:py-24 px-4 overflow-hidden`}
    >
      <div className="max-w-6xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          {/* Top accent line */}
          <motion.div
            variants={itemVariants}
            className={`w-16 h-1 ${accentColor} mb-6`}
          ></motion.div>

          {/* Category label */}
          {category && (
            <motion.div variants={itemVariants} className="mb-3">
              <h3
                className={`${secondaryTextColor} text-lg font-medium uppercase tracking-wider`}
              >
                {category}
              </h3>
            </motion.div>
          )}

          {/* Main title and subtitle */}
          <motion.div variants={itemVariants} className="mb-12">
            <h2 className={`${textColor} text-3xl md:text-4xl font-bold mb-2`}>
              {title}
            </h2>
            {subtitle && (
              <p
                className={`${secondaryTextColor} text-xl md:text-2xl font-medium`}
              >
                {subtitle}
              </p>
            )}
          </motion.div>

          {/* Specifications grid */}
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 border-t border-gray-200"
          >
            {specs.map((spec, index) => (
              <SpecCard key={index} spec={spec} index={index} />
            ))}
          </motion.div>

          {/* Visual indicator that there's more to see on hover */}
          <motion.div
            variants={itemVariants}
            className="flex justify-center mt-8"
          >
            <p className="text-sm text-gray-400">
              Hover over specifications for more details
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default VehicleSpecs;
