"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";

// Theme definitions
const themes = {
  // Earth-tone theme (default)
  dark: {
    primary: "#524336", // Deep brown - main background
    secondary: "#8c735d", // Medium brown - card backgrounds
    accent: "#c4b19c", // Warm tan - highlights and accents
    text: "#ffffff", // White - primary text
    textSecondary: "rgba(255, 255, 255, 0.8)", // White with opacity - secondary text
    textTertiary: "rgba(255, 255, 255, 0.6)", // White with more opacity - tertiary text
    buttonText: "#524336", // Button text color (primary)
    tagBg: "rgba(82, 67, 54, 0.6)", // Tag background (primary with opacity)
    cardBg: "rgba(140, 115, 93, 0.3)", // Card background (secondary with opacity)
    cardHoverBg: "rgba(140, 115, 93, 0.4)", // Card hover background
  },
  // Monochrome light theme
  light: {
    primary: "#ffffff", // White - main background
    secondary: "#f3f4f6", // Light gray - card backgrounds
    accent: "#c4b19c", // Deep blue - highlights and accents (changed from black)
    text: "#111827", // Nearly black - primary text
    textSecondary: "rgba(17, 24, 39, 0.8)", // Black with opacity - secondary text
    textTertiary: "rgba(17, 24, 39, 0.6)", // Black with more opacity - tertiary text
    buttonText: "#ffffff", // Button text color (white)
    tagBg: "rgba(26, 54, 93, 0.1)", // Tag background (accent with opacity)
    cardBg: "rgba(243, 244, 246, 1)", // Card background (solid)
    cardHoverBg: "rgba(229, 231, 235, 1)", // Card hover background (slightly darker)
  },
};

const EnvironmentNewsSection = ({
  themeVariant = "dark", // Default to dark (earth-tone) theme
  customTheme = null, // Option for custom theme
}) => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Select theme based on props
  const theme = customTheme || themes[themeVariant] || themes.dark;

  const newsItems = [
    {
      id: 1,
      isFeature: true,
      image: "/images/environment/news/signing-ceremony.jpg",
      title:
        "Chery and IUCN Launch Global Partnership, Ushering in a New Chapter of Green Development Worldwide",
      date: "October 20, 2024",
      category: "GLOBAL PARTNERSHIP",
      excerpt:
        'On October 20th, the 2024 Chery International User Summit, themed "FOR US·FOR FUTURE," was grandly held in Wuhu, Anhui. The event attracted Chery users, media friends, and partners from around the world to witness another important milestone in Chery\'s globalization journey',
      tags: ["Partnership", "IUCN", "Sustainability"],
      link: "/news/partnership-with-iucn",
    },
    {
      id: 2,
      image: "/images/environment/news/animals.jpg",
      title:
        "Together, we are driving impactful change for communities, animals, and the planet.",
      date: "Sep 30,2024",
      category: "CorporateResponsibility",
      excerpt: `We are thrilled to welcome Megan Harvey, CEO of the Society for Animals in Distress at the Chery User Global Summit! Megan's dedication to animal welfare and her leadership in advocating for sustainable practices align perfectly with Chery's commitment to corporate social responsibility and environmental stewardship. Together, we are driving impactful change for communities, animals, and the planet.`,
      tags: [
        "CheryGlobalUserSummit2024",
        "Sustainability",
        "CorporateResponsibility",
        "AnimalWelfare",
        "ForUsForFuture",
      ],
      link: "/news/environmental-innovation",
    },
    {
      id: 3,
      image: "/images/environment/news/esg-report.jpg",
      title:
        "2023 Chery ESG Report Highlights Record Environmental Achievements",
      date: "July 30, 2024",
      category: "ESG REPORT",
      excerpt:
        "In 2023, Chery's annual charitable contributions reached 46.849 million yuan. Through a series of public welfare projects, Chery actively gave back to society, achieving significant results especially in the areas of child development, environmental protection, and disaster relief.",
      tags: ["ESG", "Philanthropy", "Report"],
      link: "/news/esg-report-2023",
    },
    {
      id: 4,
      image: "/images/environment/news/dual-carbon.jpg",
      title:
        "Electric Vehicle Charging Network Expansion Reaches 1,000 Stations",
      date: "June 15, 2024",
      category: "INFRASTRUCTURE",
      excerpt:
        "Expanding our EV charging infrastructure across 12 countries to support sustainable transportation and reduce range anxiety for electric vehicle owners.",
      tags: ["Electric Vehicles", "Infrastructure"],
      link: "/news/ev-charging-expansion",
    },
    {
      id: 5,
      image: "/images/environment/news/chery-eco.jpg",
      title: "Green Supply Chain Initiative Reduces Packaging Waste by 60%",
      date: "Jan 07,2024",
      category: "Ecology",
      excerpt:
        "The sight of different generations joining hands for sustainability was nothing short of awe-inspiring. Grandparents, parents, and children all geared up with smiles, united by a common goal. Our heartfelt gratitude extends to every participant, irrespective of age or background, for being the driving force behind this remarkable event. Your diverse presence turned the Eco Run into a celebration of unity.",
      tags: ["Sustainability", "Packaging", "Waste Reduction"],
      link: "/news/packaging-waste-reduction",
    },
    {
      id: 6,
      image: "/images/environment/news/recycle.jpg",
      title: "Solar Panel Installation Completed at Three Manufacturing Plants",
      date: "April 12, 2024",
      category: "RENEWABLE ENERGY",
      excerpt:
        "The completion of our solar energy project marks a significant milestone in our journey toward carbon neutrality by 2030.",
      tags: ["Renewable Energy", "Manufacturing"],
      link: "/news/solar-panel-installation",
    },
    {
      id: 7,
      image: "/images/environment/news/plantation.jpg",
      title: "Tree Planting Campaign Reaches 1 Million Trees Planted",
      date: "March 15, 2024",
      category: "COMMUNITY ENGAGEMENT",
      excerpt:
        "Our tree planting initiative has successfully planted over 1 million trees in partnership with local communities and NGOs.",
      tags: ["Community", "Reforestation"],
      link: "/news/tree-planting-campaign",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ backgroundColor: theme.primary, color: theme.text }}
      aria-label="Sustainability News"
    >
      {/* Background pattern overlay */}
      <div className="absolute inset-0 z-10 mix-blend-soft-light opacity-5">
        <div className="w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzRjMC0yLjIwOS0xLjc5MS00LTQtNHMtNCAxLjc5MS00IDQgMS43OTEgNCA0IDQgNC0xLjc5MSA0LTRoMnptMC0xMnYyYzMuODYgMCA3IDMuMTQgNyA3IDAgMy44NTktMy4xNCA3LTcgN2gtMnYySDE4di0yaC0yYy0zLjg2IDAtNy0zLjE0MS03LTcgMC0zLjg2IDMuMTQtNyA3LTdoMnYtMmgyMHptLTExLjA3MSA3LjkyOWMtLjM5MS0uMzkxLTEuMDQ3LS4zOTEtMS40MjkgMGMtLjM5MS4zODItLjM5MSAxLjAzNyAwIDEuNDI5bDIuNSAyLjVjLjM4Mi4zOTEgMS4wMzcuMzkxIDEuNDI5IDBsMi41LTIuNWMuMzkxLS4zOTEuMzkxLTEuMDQ3IDAtMS40MjljLS4zODItLjM5MS0xLjAzNy0uMzkxLTEuNDI5IDBsLTEuNzg1IDEuNzg1TDI0LjkyOSAyOS45M3oiLz48L2c+PC9nPjwvc3ZnPg==')]"></div>
      </div>

      {/* Header section */}
      <div className="relative z-20 w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7 }}
          className="text-center max-w-4xl mx-auto mb-16 sm:mb-24"
        >
          <div
            className="w-20 h-1 mx-auto mb-6"
            style={{ backgroundColor: theme.accent }}
          ></div>

          <h2
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6 leading-tight"
            style={{ color: theme.text }}
          >
            We are in action
          </h2>

          <p
            className="text-lg sm:text-xl"
            style={{ color: theme.textSecondary }}
          >
            Discover our latest initiatives and achievements in environmental
            stewardship and sustainable development
          </p>
        </motion.div>

        {/* Grid layout */}
        <div className="w-full max-w-[2000px] mx-auto px-4 md:px-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {newsItems.map((item, index) => (
              <NewsCard
                key={item.id}
                item={item}
                index={index}
                isInView={isInView}
                isFeature={item.isFeature}
                theme={theme}
                themeVariant={themeVariant}
              />
            ))}
          </div>
        </div>

        {/* "View All" Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          className="mt-16 text-center"
        >
          <a
            href="/news"
            className="inline-flex items-center justify-center px-8 py-3 font-medium transition-all duration-300 group focus:outline-none focus:ring-2 shadow-md hover:shadow-lg"
            style={{
              backgroundColor: theme.accent,
              color: theme.buttonText,
              borderColor: theme.accent,
              // Light theme gets a subtle shadow
              boxShadow:
                themeVariant === "light"
                  ? "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)"
                  : "none",
            }}
          >
            View All News
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 ml-2 transform group-hover:translate-x-1 transition-transform duration-300"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

// NewsCard component remains the same as in the previous version
const NewsCard = ({
  item,
  index,
  isInView,
  isFeature,
  theme,
  themeVariant,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.7, delay: 0.1 * index }}
      className={`h-full ${isFeature ? "md:col-span-2" : ""}`}
    >
      <div
        className="h-full backdrop-blur-sm border  overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-md"
        style={{
          backgroundColor: theme.cardBg,
          borderColor: `${theme.accent}1A`, // 10% opacity
        }}
      >
        {/* Image Container */}
        <div className="relative overflow-hidden aspect-video">
          <div
            className="absolute inset-0 mix-blend-multiply opacity-30 z-10"
            style={{
              backgroundColor:
                themeVariant === "dark" ? theme.primary : "rgba(0,0,0,0.3)",
            }}
          ></div>
          <div className="relative h-full w-full transition-transform duration-700 group-hover:scale-105">
            <img
              src={item.image}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute top-4 left-4 z-20">
            <span
              className="text-xs font-semibold px-3 py-1.5 tracking-wider "
              style={{
                backgroundColor: theme.accent,
                color: theme.buttonText,
              }}
            >
              {item.category}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 lg:p-7">
          <div className="space-y-4">
            <h3
              className="text-xl lg:text-2xl font-bold transition-colors duration-300"
              style={{
                color: theme.text,
              }}
            >
              {item.title}
            </h3>

            <p style={{ color: theme.textSecondary }} className="line-clamp-3">
              {item.excerpt}
            </p>

            <div className="flex flex-wrap gap-2 mt-4">
              {item.tags.map((tag, i) => (
                <span
                  key={i}
                  className="text-xs px-3 py-1 "
                  style={{
                    backgroundColor: theme.tagBg,
                    color: theme.accent,
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>

            <div
              className="flex items-center justify-between pt-4 border-t"
              style={{ borderColor: `${theme.accent}33` }}
            >
              <span style={{ color: theme.textTertiary }} className="text-sm">
                {item.date}
              </span>
              <a
                href={item.link}
                className="inline-flex items-center text-sm font-medium transition-colors duration-300 group/link"
                style={{
                  color: theme.accent,
                }}
                aria-label={`Read more about ${item.title}`}
              >
                Read more
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2 transform group-hover/link:translate-x-1 transition-transform duration-300"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

// ThemeSwitcher component for easy theme toggling
const ThemeSwitcher = ({ currentTheme, setTheme }) => {
  return (
    <div className="flex gap-2 items-center">
      <button
        onClick={() => setTheme("dark")}
        className={`w-10 h-10  flex items-center justify-center ${
          currentTheme === "dark" ? "ring-2 ring-[#c4b19c]" : ""
        }`}
        style={{ backgroundColor: "#524336" }}
        aria-label="Switch to Earth-tone Theme"
      >
        <span className="sr-only">Earth-tone Theme</span>
      </button>
      <button
        onClick={() => setTheme("light")}
        className={`w-10 h-10  flex items-center justify-center ${
          currentTheme === "light" ? "ring-2 ring-[#1a365d]" : ""
        }`}
        style={{ backgroundColor: "#ffffff", border: "1px solid #e5e7eb" }}
        aria-label="Switch to Light Theme"
      >
        <span className="sr-only">Light Theme</span>
      </button>
    </div>
  );
};

// Example usage:
// <EnvironmentNewsSection themeVariant="dark" /> <!-- Earth-tone theme -->
// <EnvironmentNewsSection themeVariant="light" /> <!-- Black and white theme -->
// <EnvironmentNewsSection customTheme={{
//   primary: '#0a2342',     // Dark blue
//   secondary: '#2c5282',   // Medium blue
//   accent: '#63b3ed',      // Light blue
//   text: '#ffffff',        // White
//   textSecondary: 'rgba(255, 255, 255, 0.8)',
//   textTertiary: 'rgba(255, 255, 255, 0.6)',
//   buttonText: '#0a2342',  // Button text color
//   tagBg: 'rgba(44, 82, 130, 0.3)', // Tag background
//   cardBg: 'rgba(10, 35, 66, 0.8)', // Card background
//   cardHoverBg: 'rgba(10, 35, 66, 0.9)' // Card hover background
// }} />

export default EnvironmentNewsSection;