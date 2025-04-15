"use client";

import ClimateChangeSection from "../components/environment/ClimateChangeSection";
import EnvironmentalParallax from "../components/environment/EnvironmentalParallax";
import EnvironmentNewsSection from "../components/environment/EnvironmentNewsSection";
import {
  climateData,
  lowCarbonData,
  natureData,
} from "../data/environmentData";

export default function Environment() {
  const renderClimateContent = (ContentData) => {
    if (Array.isArray(ContentData.content)) {
      return (
        <>
          {ContentData.content.map((paragraph, index) => (
            <p
              key={index}
              className="text-white/90 text-base sm:text-lg leading-relaxed font-light"
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
        </>
      );
    }

    // Handle string-based content
    return (
      <p
        className="text-white/90 text-base sm:text-lg leading-relaxed font-light"
        dangerouslySetInnerHTML={{ __html: ContentData.content }}
      />
    );
  };

  return (
    <main>
      <EnvironmentalParallax />

      <ClimateChangeSection
        title={natureData.title}
        subtitle={natureData.subtitle}
        content={renderClimateContent(natureData)}
        backgroundImage={natureData.backgroundImage}
        contentPosition={natureData.contentPosition}
        ctaText={natureData.ctaText}
        ctaLink={natureData.ctaLink}
        secondaryCta={natureData.secondaryCta}
        overlayColor={natureData.overlayColor}
        stats={natureData.stats}
      />

      <ClimateChangeSection
        title={lowCarbonData.title}
        subtitle={lowCarbonData.subtitle}
        content={renderClimateContent(lowCarbonData)}
        backgroundImage={lowCarbonData.backgroundImage}
        contentPosition={lowCarbonData.contentPosition}
        ctaText={lowCarbonData.ctaText}
        ctaLink={lowCarbonData.ctaLink}
        secondaryCta={lowCarbonData.secondaryCta}
        overlayColor={lowCarbonData.overlayColor}
        stats={lowCarbonData.stats}
      />

      <ClimateChangeSection
        title={climateData.title}
        subtitle={climateData.subtitle}
        content={renderClimateContent(climateData)}
        backgroundImage={climateData.backgroundImage}
        contentPosition={climateData.contentPosition}
        ctaText={climateData.ctaText}
        ctaLink={climateData.ctaLink}
        secondaryCta={climateData.secondaryCta}
        overlayColor={climateData.overlayColor}
        stats={climateData.stats}
      />

      <EnvironmentNewsSection themeVariant="light" />
    </main>
  );
}
