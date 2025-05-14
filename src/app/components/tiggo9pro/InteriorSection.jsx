'use client';

import { motion } from 'framer-motion';
import React from 'react';

/**
 * Premium Car Interior Component showcasing comfort features
 * Fully responsive with Framer Motion animations
 * Following Chery Bangladesh design system guidelines
 */
const InteriorFeatures = () => {
    // Animation variants following the design guidelines
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                duration: 0.7,
            },
        },
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.5, ease: "easeOut" },
        },
    };

    const featureNumberVariants = {
        hidden: { scale: 0.8, opacity: 0 },
        visible: {
            scale: 1,
            opacity: 1,
            transition: { duration: 0.5, delay: 0.2 },
        },
    };

    return (
        <section className="py-12 md:py-16 lg:py-20 bg-gray-100 w-full">
            <div className="max-w-[1920px] mx-auto px-3 md:px-4 lg:px-6">
                {/* Heading Section with Animation */}
                <motion.div
                    className="mb-8 md:mb-10 lg:mb-16 ml-2 md:ml-4 lg:ml-6 max-w-[1920px] mx-auto"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    <motion.h2
                        className="text-2xl md:text-3xl font-bold text-primary-900 tracking-wide mb-1"
                        variants={itemVariants}
                    >
                        COMFORTABLE
                    </motion.h2>
                    <motion.h3
                        className="text-2xl md:text-3xl font-bold text-primary-900 tracking-wide"
                        variants={itemVariants}
                    >
                        QUIET AND GREEN CABIN
                    </motion.h3>
                    <motion.div
                        className="h-0.5 w-24 bg-primary-700 mt-4"
                        variants={itemVariants}
                    ></motion.div>
                </motion.div>

                {/* Main Content Grid - Responsive layout */}
                <motion.div
                    className="grid grid-cols-1 lg:grid-cols-12 gap-3 md:gap-4 lg:gap-6"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.1 }}
                    variants={containerVariants}
                >
                    {/* Left Side - Full Background */}
                    <motion.div
                        className="lg:col-span-7 relative h-[450px] sm:h-[550px] md:h-[600px] lg:h-[700px]"
                        variants={itemVariants}
                    >
                        <div
                            className="h-full w-full bg-cover bg-center bg-no-repeat relative rounded overflow-hidden"
                            style={{ backgroundImage: "url('/images/tiggo9pro/interior/1.jpg')" }}
                        >
                            {/* Dark overlay for text visibility - Adjusted opacity for better contrast */}
                            <div className="absolute inset-0 bg-primary-900/85 md:bg-primary-900/75 transition-all duration-500"></div>

                            {/* Text Content */}
                            <div className="absolute inset-0 p-6 md:p-10 lg:p-16">
                                <div className="flex flex-col md:flex-row space-y-8 md:space-y-0 md:space-x-12 lg:space-x-16">
                                    <motion.div
                                        className="w-32 md:w-36"
                                        variants={featureNumberVariants}
                                    >
                                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white">2</h2>
                                        <div className="h-0.5 w-full bg-white mt-2"></div>
                                        <p className="text-white text-sm font-medium mt-3 tracking-wider">DOUBLE-LAYER</p>
                                        <p className="text-white text-sm font-medium tracking-wider">SILENT GLASS</p>
                                    </motion.div>

                                    <motion.div
                                        className="w-32 md:w-48"
                                        variants={featureNumberVariants}
                                    >
                                        <h2 className="text-6xl md:text-7xl lg:text-8xl font-bold text-white">ENC</h2>
                                        <div className="h-0.5 w-full bg-white mt-2"></div>
                                        <p className="text-white text-sm font-medium mt-3 tracking-wider">ACTIVE NOISE REDUCTION</p>
                                    </motion.div>
                                </div>

                                <motion.div
                                    className="mt-10 md:mt-14 lg:mt-20"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.7, delay: 0.5 }}
                                >
                                    <p className="text-white text-sm md:text-base leading-relaxed max-w-lg">
                                        Experience a serene driving environment with advanced noise reduction technology and premium sound insulation, creating a sanctuary on wheels.
                                    </p>
                                </motion.div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Right Side - Feature Images */}
                    <div className="lg:col-span-5 flex flex-col gap-4 md:gap-6 h-[450px] sm:h-[550px] md:h-[600px] lg:h-[700px]">
                        {/* Top Image - Headrest Sound */}
                        <motion.div
                            className="relative h-1/2 overflow-hidden group rounded"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: "url('/images/tiggo9pro/interior/2.jpg')" }}
                                aria-label="Headrest with speakers embedded"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.7 }}
                            ></motion.div>
                            <div className="absolute top-0 right-0 bg-white py-2 px-4 z-10">
                                <span className="text-xs font-medium text-gray-900 tracking-wider">14 LOUDSPEAKERS+ HEADREST SOUND</span>
                            </div>
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 bg-primary-900/70 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"
                                initial={{ y: "100%" }}
                                whileHover={{ y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-white text-sm">Immersive audio experience with strategically placed speakers for studio-quality sound.</p>
                            </motion.div>
                        </motion.div>

                        {/* Bottom Image - Green Cabin Materials */}
                        <motion.div
                            className="relative h-1/2 overflow-hidden group rounded"
                            variants={itemVariants}
                        >
                            <motion.div
                                className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-700 group-hover:scale-105"
                                style={{ backgroundImage: "url('/images/tiggo9pro/interior/3.jpg')" }}
                                aria-label="Carbon fiber and eco-friendly interior materials"
                                whileHover={{ scale: 1.05 }}
                                transition={{ duration: 0.7 }}
                            ></motion.div>
                            <div className="absolute top-0 right-0 bg-white py-2 px-4 z-10">
                                <span className="text-xs font-medium text-gray-900 tracking-wider">C-PURE GREEN CABIN</span>
                            </div>
                            <motion.div
                                className="absolute bottom-0 left-0 right-0 bg-primary-900/70 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-in-out"
                                initial={{ y: "100%" }}
                                whileHover={{ y: 0 }}
                                transition={{ duration: 0.5 }}
                            >
                                <p className="text-white text-sm">Eco-friendly materials and sustainable design for a cleaner driving environment.</p>
                            </motion.div>
                        </motion.div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default InteriorFeatures;