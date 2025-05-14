'use client';

import { animate, motion, useInView } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';

// Animation variants extracted for reuse
const animations = {
  fadeInUp: {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" }
    }
  },
  staggerContainer: {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
      }
    }
  },
  lineAnimation: {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: { duration: 0.5, ease: "easeInOut" }
    }
  }
};

// Extracted AnimatedCounter as a memoized component
const AnimatedCounter = React.memo(({ value, unit = '', duration = 2, decimal = false }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [displayValue, setDisplayValue] = useState("0");

  useEffect(() => {
    if (inView) {
      const controls = animate(0, value, {
        duration,
        ease: "easeOut",
        onUpdate: (latest) => {
          setDisplayValue(decimal ? latest.toFixed(1) : Math.round(latest).toString());
        }
      });

      return () => controls.stop();
    }
  }, [inView, value, duration, decimal]);

  return (
    <span ref={ref} className="tabular-nums flex items-baseline">
      <span className="text-4xl md:text-5xl font-bold text-primary-900" aria-hidden="true">
        {displayValue}
      </span>
      <span className="text-2xl md:text-3xl font-medium text-primary-900/80">
        {unit}
      </span>
      {/* Hidden element for screen readers */}
      <span className="sr-only">{value} {unit}</span>
    </span>
  );
});

AnimatedCounter.displayName = 'AnimatedCounter';

// Extracted StatCard as a reusable component
const StatCard = ({ value, unit, label, decimal = false, duration = 2 }) => {
  return (
    <motion.div variants={animations.fadeInUp}>
      <div className="flex flex-col">
        <div className="mb-2">
          <AnimatedCounter value={value} unit={unit} duration={duration} decimal={decimal} />
        </div>
        <motion.div
          className="w-full h-px bg-primary-700/20 mb-2"
          variants={animations.lineAnimation}
        />
        <span className="text-sm font-medium text-gray-600 uppercase tracking-wide">
          {label}
        </span>
      </div>
    </motion.div>
  );
};

// Image-backed panel component for DRY code
const SpecPanel = ({ title, children, imagePath, style = {} }) => {
  return (
    <motion.div
      className="bg-white"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-50px" }}
      variants={animations.staggerContainer}
      style={{
        backgroundImage: `linear-gradient(to bottom, white 50%, transparent), url('${imagePath}')`,
        backgroundSize: "100%, cover",
        backgroundPosition: "top, center",
        backgroundRepeat: "no-repeat",
        ...style
      }}
    >
      <div className={`p-8 md:p-10 ${style.padding || 'pb-56 md:pb-72'}`}>
        <motion.h3
          className="text-xl font-bold text-primary-700 mb-8"
          variants={animations.fadeInUp}
          id={title.toLowerCase().replace(/\s+/g, '-')}
        >
          {title}
        </motion.h3>
        {children}
      </div>
    </motion.div>
  );
};

const PowertrainSpecsSection = () => {
  // Central data store for specs
  const specs = {
    engine: {
      title: "2.0T GDI EFFICIENT ENGINE",
      image: "/images/tiggo9pro/engine.jpg",
      stats: [
        { label: "MAXIMUM POWER", value: 187, unit: "kW", duration: 1.8 },
        { label: "MAXIMUM OUTPUT TORQUE", value: 390, unit: "N·M", duration: 2 },
        { label: "DRIVING EFFICIENCY", value: 44.5, unit: "%", duration: 1.6, decimal: true }
      ]
    },
    transmission: {
      title: "8AT TRANSMISSION",
      image: "/images/tiggo9pro/transmission.jpg",
      stats: [
        { label: "DRIVING EFFICIENCY", value: 96, unit: "%", duration: 1.7 },
        { label: "MAXIMUM INPUT TORQUE", value: 470, unit: "N·M", duration: 2.1 }
      ]
    },
    fourWD: {
      title: "FULL SCENE INTELLIGENT 4WD SYSTEM",
      image: "/images/tiggo9pro/chassis.jpg",
      modes: ["ECONOMIC", "STANDARD", "SPORTS"],
      terrains: ["SANDY ROAD", "MUDDY GROUND", "SNOWFIELD", "OFF-ROAD"]
    }
  };

  return (
    <section
      className="w-full bg-stone-100 py-16 md:py-24 lg:py-28 overflow-hidden"
      aria-labelledby="powertrain-title"
    >
      {/* Title Section */}
      <div className="max-w-[95%] mx-auto px-4 md:px-6 lg:px-8 mb-12">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-primary-900 tracking-tight"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          id="powertrain-title"
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
          aria-hidden="true"
        />
      </div>

      {/* Specs Grid */}
      <div className="max-w-[95%] mx-auto px-4 md:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* LEFT PANEL - ENGINE SPECS */}
          <SpecPanel title={specs.engine.title} imagePath={specs.engine.image}>
            <div className="grid grid-cols-1 gap-8">
              {specs.engine.stats.map((stat, index) => (
                <StatCard
                  key={`engine-stat-${index}`}
                  value={stat.value}
                  unit={stat.unit}
                  label={stat.label}
                  duration={stat.duration}
                  decimal={stat.decimal}
                />
              ))}
            </div>
          </SpecPanel>

          {/* RIGHT PANEL - TRANSMISSION & 4WD */}
          <motion.div
            className="flex flex-col gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            variants={animations.staggerContainer}
          >
            {/* Top Box - Transmission */}
            <SpecPanel 
              title={specs.transmission.title} 
              imagePath={specs.transmission.image}
              style={{ padding: 'pb-32' }}
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {specs.transmission.stats.map((stat, index) => (
                  <StatCard
                    key={`transmission-stat-${index}`}
                    value={stat.value}
                    unit={stat.unit}
                    label={stat.label}
                    duration={stat.duration}
                    decimal={stat.decimal}
                  />
                ))}
              </div>
            </SpecPanel>

            {/* Bottom Box - 4WD System */}
            <SpecPanel 
              title={specs.fourWD.title} 
              imagePath={specs.fourWD.image}
              style={{ padding: 'pb-40 md:pb-56' }}
            >
              {/* Divider Line */}
              <motion.div
                className="w-full h-px bg-gray-200 mb-8"
                initial={{ width: 0 }}
                whileInView={{ width: "100%" }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.3 }}
                aria-hidden="true"
              />

              {/* Driving Modes */}
              <motion.div
                className="text-right mb-6"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <p className="text-base text-primary-900 font-medium">
                  {specs.fourWD.modes.join(' + ')}
                </p>
              </motion.div>

              {/* Terrain Types */}
              <motion.div
                className="text-right mb-8"
                initial={{ opacity: 0, x: 10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <p className="text-base text-primary-900 font-medium">
                  {specs.fourWD.terrains.slice(0, 2).join(' + ')}<br />
                  {specs.fourWD.terrains.slice(2).join(' + ')}
                </p>
              </motion.div>
            </SpecPanel>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PowertrainSpecsSection;