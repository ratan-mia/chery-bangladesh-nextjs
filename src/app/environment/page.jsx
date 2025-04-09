"use client";

import ClimateChangeSection from "../components/environment/ClimateChangeSection";
import EnvironmentalParallax from "../components/environment/EnvironmentalParallax";
import EnvironmentNewsSection from "../components/environment/EnvironmentNewsSection";
import { climateData, lowCarbonData } from "../data/environmentData";

export default function Environment() {
  // Render paragraph content from the data file with proper HTML formatting
  const renderClimateContent = () => {
    return (
      <>
        {climateData.content.map((paragraph, index) => (
          <p 
            key={index} 
            className="text-white/90 text-base sm:text-lg leading-relaxed font-light"
            dangerouslySetInnerHTML={{ __html: paragraph }}
          />
        ))}
      </>
    );
  };

  return (
    <main>
      <EnvironmentalParallax />
      <ClimateChangeSection
        title={climateData.title}
        subtitle={climateData.subtitle}
        content={renderClimateContent()}
        backgroundImage={climateData.backgroundImage}
        contentPosition={climateData.contentPosition}
        ctaText={climateData.ctaText}
        ctaLink={climateData.ctaLink}
        secondaryCta={climateData.secondaryCta}
        overlayColor={climateData.overlayColor}
        stats={climateData.stats}
      />
        <ClimateChangeSection
        title={lowCarbonData.title}
        subtitle={lowCarbonData.subtitle}
        content={renderClimateContent()}
        backgroundImage={lowCarbonData.backgroundImage}
        contentPosition={lowCarbonData.contentPosition}
        ctaText={lowCarbonData.ctaText}
        ctaLink={lowCarbonData.ctaLink}
        secondaryCta={lowCarbonData.secondaryCta}
        overlayColor={lowCarbonData.overlayColor}
        stats={lowCarbonData.stats}
      
      />
      <EnvironmentNewsSection themeVariant="light" />
    </main>
  );
}