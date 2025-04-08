"use client";

import ClimateChangeSection from "../components/environment/ClimateChangeSection";
import EnvironmentalParallax from "../components/environment/EnvironmentalParallax";


export default function Environment() {
  const climateContent = (
    <>
      <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light">
        Chery has strengthened carbon accounting and product carbon footprint
        management, completing calculations for{" "}
        <span className="font-medium text-white">72 versions</span> under the
        Technical Standard on Lifecycle Carbon Emission Accounting of Passenger
        Vehicles (ISO 14067:2018).
      </p>

      <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light">
        In 2023, Scope 1 and Scope 2 greenhouse gas emissions totaled{" "}
        <span className="font-medium text-white">503,467.9 tons</span> of CO
        <span className="text-xs align-sub">2</span> equivalent.
      </p>

      <p className="text-white/90 text-base sm:text-lg leading-relaxed font-light">
        We continue to advance our new energy strategy, expanding our portfolio
        with the
        <span className="font-medium text-white"> Super Hybrid Platform</span>,
        the
        <span className="font-medium text-white">
          {" "}
          E0X high-performance electric platform
        </span>
        , and
        <span className="font-medium text-white">
          {" "}
          135 related new technologies
        </span>
        .
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
        <div className="flex items-center gap-2 text-white/90 text-sm bg-white/5 px-4 py-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Carbon Footprint Reduction</span>
        </div>
        <div className="flex items-center gap-2 text-white/90 text-sm bg-white/5 px-4 py-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Renewable Energy Solutions</span>
        </div>
        <div className="flex items-center gap-2 text-white/90 text-sm bg-white/5 px-4 py-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Sustainable Manufacturing</span>
        </div>
        <div className="flex items-center gap-2 text-white/90 text-sm bg-white/5 px-4 py-2 rounded-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary flex-shrink-0"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg>
          <span>Electric Vehicle Technology</span>
        </div>
      </div>
    </>
  );
    // Stats for the climate section
    const climateStats = [
      { value: "72", label: "Versions Measured" },
      { value: "503K", label: "Tons CO₂ Tracked" },
      { value: "135", label: "New Technologies" }
    ];
  return (
    <main>
      <EnvironmentalParallax/>
      <ClimateChangeSection
        title="RESPONDING TO CLIMATE CHANGE"
        subtitle="Environmental Responsibility"
        content={climateContent}
        backgroundImage="/images/environment/climate-change.jpg"
        contentPosition="right"
        ctaText="Our Climate Initiatives"
        ctaLink="/sustainability/climate"
        secondaryCta="Sustainability Report"
        secondaryCtaLink="/reports/sustainability"
        overlayColor="bg-blue-950/75"
        accentColor="bg-primary"
        stats={climateStats}
      />
    </main>
  );
}
