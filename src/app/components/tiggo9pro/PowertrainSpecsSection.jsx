'use client';

import { animate, motion, useInView } from 'framer-motion';
import { useEffect, useRef, useState } from 'react';

// Refined counter component with clean, professional animation
const AnimatedCounter = ({ value, unit = '', duration = 2, decimal = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration: duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          if (decimal) {
            setDisplayValue(latest.toFixed(1));
          } else {
            setDisplayValue(Math.round(latest).toString());
          }
        }
      });

      return () => controls.stop();
    }
  }, [inView, value, duration, decimal]);

  return (
    <span ref={ref} className="tabular-nums flex items-baseline">
      <span className="text-4xl md:text-5xl font-bold text-primary-900">
        {displayValue}
      </span>
      <span className="text-2xl md:text-3xl font-medium text-primary-700">
        {unit}
      </span>
    </span>
  );
};

const PowertrainSpecsSection = () => {
  const containerRef = useRef(null);

  // Clean, subtle animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  };

  // Line animation variant
  const lineAnimation = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  };

  return (
    <section
      ref={containerRef}
      className="w-full bg-stone-100 py-16 md:py-20 overflow-hidden"
    >
      {/* Title Section */}
      <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8 mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary-900 tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          GALLOP INTO THE FUTURE<br />
          WITH BOUNDLESS POWER
        </motion.h2>
        <motion.div
          className="w-20 h-1 bg-primary-700 mt-4"
          initial={{ width: 0 }}
          whileInView={{ width: 80 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
        />
      </div>

      {/* Specs Grid */}
      <div className="max-w-[2000px] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT PANEL - ENGINE SPECS */}
          <motion.div
            className="bg-white"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
            style={{
              backgroundImage: "linear-gradient(to bottom, white 50%, transparent), url('/images/tiggo9pro/engine.jpg')",
              backgroundSize: "100%, cover",
              backgroundPosition: "top, center",
              backgroundRepeat: "no-repeat"
            }}
          >
            <div className="p-8 md:p-10 pb-56 md:pb-72">
              {/* Engine Type Header */}
              <motion.h3
                className="text-xl uppercase font-bold text-primary-700 mb-8"
                variants={fadeInUp}
              >
                1500cc Direct-Injection Turbo 4-Cylinder
              </motion.h3>

              {/* Engine Specs */}
              <div className="grid grid-cols-1 gap-8">
                {/* Engine Power */}
                <motion.div variants={fadeInUp}>
                  <div className="flex flex-col">
                    <div className="flex flex-row space-x-4">
                      <div className="mb-2">
                        <AnimatedCounter value={375} unit="kW" duration={2.2} />
                      </div>
                     
                      <div className="flex items-center">
                        <div className="w-1 h-4 bg-primary-700 mx-2" />
                      </div>

                      <div className="mb-2">
                        <AnimatedCounter value={502} unit="BHP" duration={2.2} />
                      </div>

                    </div>


                    <motion.div
                      className="w-full h-px bg-primary-700/20 mb-2"
                      variants={lineAnimation}
                    />
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      COMBINED ENGINE POWER
                    </span>
                  </div>
                </motion.div>

                {/* Engine Torque */}
                <motion.div variants={fadeInUp}>
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <AnimatedCounter value={750} unit="N·M" duration={2} />
                    </div>
                    <motion.div
                      className="w-full h-px bg-primary-700/20 mb-2"
                      variants={lineAnimation}
                    />
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      Combined Torque
                    </span>
                  </div>
                </motion.div>

                {/* Engine Displacement */}
                <motion.div variants={fadeInUp}>
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <AnimatedCounter value={1.5} unit="L" duration={1.6} decimal={true} />
                    </div>
                    <motion.div
                      className="w-full h-px bg-primary-700/20 mb-2"
                      variants={lineAnimation}
                    />
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      ENGINE DISPLACEMENT
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* RIGHT PANEL - MOTOR & PERFORMANCE */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={staggerContainer}
          >
            {/* Top Box - Motor Specs */}
            <motion.div
              className="bg-white"
              variants={fadeInUp}
              style={{
                backgroundImage: "linear-gradient(to bottom, white 60%, transparent), url('/images/tiggo9pro/motor.jpg')",
                backgroundSize: "100%, contain",
                backgroundPosition: "top, right",
                backgroundRepeat: "no-repeat"
              }}
            >
              <div className="p-8 md:p-10 pb-32">
                <h3 className="text-xl font-bold text-primary-700 mb-8">
                  ELECTRIC MOTOR SYSTEM
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Motor Comprehensive Power */}
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <AnimatedCounter value={455} unit="kW" duration={2.5} />
                    </div>
                    <motion.div
                      className="w-full h-px bg-primary-700/20 mb-2"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      MOTOR COMPREHENSIVE POWER
                    </span>
                  </div>

                  {/* Motor Comprehensive Torque */}
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <AnimatedCounter value={920} unit="N·M" duration={2.8} />
                    </div>
                    <motion.div
                      className="w-full h-px bg-primary-700/20 mb-2"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    />
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      MOTOR COMPREHENSIVE TORQUE
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Bottom Box - Performance & Range */}
            <motion.div
              className="bg-white"
              style={{
                backgroundImage: "linear-gradient(to bottom, white 50%, transparent), url('/images/tiggo9pro/performance.jpg')",
                backgroundSize: "100%, cover",
                backgroundPosition: "top, center",
                backgroundRepeat: "no-repeat"
              }}
              variants={fadeInUp}
            >
              <div className="p-8 md:p-10 pb-40 md:pb-56">
                {/* Performance Title */}
                <h3 className="text-xl font-bold text-primary-700 mb-6">
                  PERFORMANCE & EFFICIENCY
                </h3>

                {/* Performance Specs Grid */}
                <div className="grid grid-cols-2 gap-6 mb-6">
                  {/* 0-100 Acceleration */}
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <AnimatedCounter value={5.7} unit="s" duration={1.8} decimal={true} />
                    </div>
                    <motion.div
                      className="w-full h-px bg-primary-700/20 mb-2"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.3 }}
                    />
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      0-100 KM/H
                    </span>
                  </div>

                  {/* Fuel Consumption */}
                  <div className="flex flex-col">
                    <div className="mb-2">
                      <AnimatedCounter value={6.2} unit="" duration={1.5} decimal={true} />
                      <span className="text-2xl md:text-3xl font-medium text-primary-700">KM/L</span>
                    </div>
                    <motion.div
                      className="w-full h-px bg-primary-700/20 mb-2"
                      initial={{ width: 0 }}
                      whileInView={{ width: "100%" }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.4 }}
                    />
                    <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                      NEDC FUEL CONSUMPTION
                    </span>
                  </div>
                </div>

                {/* Range Information */}
                <motion.div
                  className="text-right mb-4"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <p className="text-base text-primary-900 font-medium">
                    RANGE: 1300KM (FUEL) + 170KM (BATTERY)
                  </p>
                </motion.div>

                {/* Battery Capacity */}
                <motion.div
                  className="text-right"
                  initial={{ opacity: 0, x: 10 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <p className="text-base text-primary-900 font-medium">
                    BATTERY CAPACITY: 33.46kWh
                  </p>
                </motion.div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Additional Specs Row */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
        >
          {/* 3DHT Transmission */}
          <motion.div
            className="bg-white p-8"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-bold text-primary-700 mb-6">
              3DHT TRANSMISSION
            </h3>
            <div className="flex flex-col">
              <div className="mb-2">
                <span className="text-4xl md:text-5xl font-bold text-primary-900">3DHT</span>
              </div>
              <motion.div
                className="w-full h-px bg-primary-700/20 mb-2"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
              />
              <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                HYBRID TRANSMISSION
              </span>
            </div>
          </motion.div>

          {/* 4WD System */}
          <motion.div
            className="bg-white p-8"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-bold text-primary-700 mb-6">
              INTELLIGENT 4WD
            </h3>
            <div className="text-base text-primary-900 font-medium space-y-2">
              <p>ECO + NORMAL + SPORT + OFFROAD</p>
              <motion.div
                className="w-full h-px bg-primary-700/20 my-4"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              />
              <p className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                FULL SCENE INTELLIGENT 4WD SYSTEM
              </p>
            </div>
          </motion.div>

          {/* Vehicle Weight */}
          <motion.div
            className="bg-white p-8"
            variants={fadeInUp}
          >
            <h3 className="text-xl font-bold text-primary-700 mb-6">
              VEHICLE SPECIFICATIONS
            </h3>
            <div className="space-y-4">
              <div className="flex flex-col">
                <div className="mb-2">
                  <AnimatedCounter value={2233} unit="kg" duration={2.2} />
                </div>
                <motion.div
                  className="w-full h-px bg-primary-700/20 mb-2"
                  initial={{ width: 0 }}
                  whileInView={{ width: "100%" }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 }}
                />
                <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
                  GROSS VEHICLE MASS (GVW)
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default PowertrainSpecsSection;