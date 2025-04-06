import { motion } from "framer-motion";
import React, { useState } from "react";

const AwardsSection = ({
  sectionTitle = "OUR HONOR",
  awards = [
    {
      id: 1,
      title:
        "In the Kantar Brandz Top 50 Chinese Brand Builders 2024 report, Chery retains top in the automotive category",
      description:
        'Chery has held the position of China\'s top passenger car exporter for 21 consecutive years and has received the title of "Top 20 Best Overseas Image Enterprises" in five consecutive selections by the SASAC (State-owned Assets Supervision and Administration Commission) and the CICC (China International Communications Group). In the Kantar Brandz Top 50 Chinese Brand Builders 2024 report, Chery retains top in the automotive category.',
      bgColor: "bg-[#a39277]",
      textColor: "text-white",
    },
    {
      id: 2,
      title: "J.D. POWER",
      subtitle:
        "In 2023, CHERY RANKS FIRST IN THE INITIAL QUALITY STUDY (IQS) AMONG CHINESE DOMESTIC BRANDS.",
      description:
        "According to J.D. Power's various automotive index studies for 2023, Chery holds the top position in the IQS (Initial Quality Study) among China's domestic brands. Additionally, its vehicle series, including the TIGGO 8, TIGGO 7 and TIGGO 4 have each achieved first place in their segments.",
      bgColor: "bg-[#e9e2d8]",
      textColor: "text-neutral-800",
    },
  ],
  actionButton = {
    id: 3,
    text: "Explore More",
    url: "/awards",
    bgColor: "bg-[#7a6852]",
    textColor: "text-white",
  },
}) => {
  const [expandedSection, setExpandedSection] = useState(null);

  return (
    <section className="relative w-full h-full overflow-hidden">
      <div className="w-full h-full bg-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          {/* Section Title */}
          <h2 className="text-4xl md:text-5xl font-bold text-[#6B5A44] mb-8">
            {sectionTitle}
          </h2>

          {/* Expandable Slider - Horizontal Only */}
          <div className="relative flex flex-row w-full overflow-hidden">
            {awards.map((award) => (
              <motion.div
                key={award.id}
                className={`${award.bgColor} relative overflow-hidden cursor-pointer min-h-[300px]`}
                animate={{
                  flex: expandedSection === award.id ? 2 : 1,
                }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                onClick={() =>
                  setExpandedSection(
                    expandedSection === award.id ? null : award.id
                  )
                }
              >
                <div className="p-8 md:p-10 lg:p-12 h-full flex flex-col justify-center">
                  <h3
                    className={`text-2xl md:text-3xl font-bold ${award.textColor} mb-6`}
                  >
                    {award.title}
                  </h3>
                  {award.subtitle && (
                    <h4
                      className={`text-xl md:text-2xl font-semibold ${award.textColor} mb-6`}
                    >
                      {award.subtitle}
                    </h4>
                  )}
                  <motion.div
                    className="overflow-hidden"
                    animate={{
                      height: expandedSection === award.id ? "auto" : "0",
                      opacity: expandedSection === award.id ? 1 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <p
                      className={`${award.textColor}/90 text-base md:text-lg leading-relaxed`}
                    >
                      {award.description}
                    </p>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Action Button Panel - Now Expandable */}
            <motion.div
              className={`${actionButton.bgColor} relative overflow-hidden cursor-pointer min-h-[300px]`}
              animate={{
                flex: expandedSection === actionButton.id ? 2 : 0.5,
              }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
              onClick={() =>
                setExpandedSection(
                  expandedSection === actionButton.id ? null : actionButton.id
                )
              }
            >
              <div className="p-8 h-full w-full flex flex-col justify-center items-center">
                {/* Always visible content */}
                <a
                  href={actionButton.url}
                  className="flex flex-col items-center text-white hover:text-white/80 transition-colors no-underline group"
                  onClick={(e) => e.stopPropagation()} // Prevent triggering panel expansion when clicking the link
                >
                  <span className="relative text-xl md:text-2xl font-medium mb-3">
                    {actionButton.text}
                  </span>
                  <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    animate={{ y: [0, 5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 14l-7 7m0 0l-7-7m7 7V3"
                    />
                  </motion.svg>
                </a>

                {/* Expanded content */}
                <motion.div
                  className="mt-8 w-full overflow-hidden"
                  animate={{
                    height: expandedSection === actionButton.id ? "auto" : "0",
                    opacity: expandedSection === actionButton.id ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className={`${actionButton.textColor}/90 text-base md:text-lg leading-relaxed`}
                  >
                    <p className="mb-4">
                      Discover more about our achievements and recognition in
                      the automotive industry.
                    </p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>Multiple awards for innovation and design</li>
                      <li>Recognition for customer satisfaction</li>
                      <li>Industry-leading quality standards</li>
                    </ul>
                  </div>
                </motion.div>

                {/* Vertical text */}
                <div className="absolute right-8 top-0 bottom-0 h-full">
                  <div className="h-full flex items-center">
                    <p
                      className={`${actionButton.textColor}/30 text-xl transform -rotate-90 whitespace-nowrap`}
                    >
                      Explore More
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AwardsSection;
