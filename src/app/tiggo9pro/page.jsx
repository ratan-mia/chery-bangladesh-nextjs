import React from 'react';

// Import components
import ContactBanner from '@/components/tiggo9pro/ContactBanner';
import FeatureShowcase from '@/components/tiggo9pro/FeatureShowcase';
import HeroBanner from '@/components/tiggo9pro/HeroBanner';
import HotspotComponent from '@/components/tiggo9pro/HotspotComponent';
import InteriorSection from '@/components/tiggo9pro/InteriorSection';
import InteriorShowcase from '@/components/tiggo9pro/InteriorShowcase';
import PowertrainSpecsSection from '@/components/tiggo9pro/PowertrainSpecsSection';
import SafetyScrollingSection from '@/components/tiggo9pro/SafetyScrollingSection';
import VehicleSpecsShowcase from '@/components/tiggo9pro/VehicleSpecsShowcase';
import ComfortableSeatsSlider from '@components/tiggo9pro/ComfortableSeatsSlider';


// Import data
import {
    cabinCarData,
    comfortShowcaseData,
    tiggo9ProFeatures,
    tiggo9ProPowerData
} from "@/data/vehicles/tiggo9pro";

export default function Page() {
    // Split features into logical groups for better organization
    const exteriorFeatures = tiggo9ProFeatures.slice(0, 2);
    const interiorFeatures = tiggo9ProFeatures.slice(2, 4);

    return (
        <main>
            {/* Introduction Section */}
            <section id="introduction">
                <HeroBanner />
                <HotspotComponent />
            </section>

            {/* Exterior & Performance Section */}
            <section id="exterior-performance">
                <section id="power-showcase">
                    <VehicleSpecsShowcase data={tiggo9ProPowerData} />
                </section>
                <PowertrainSpecsSection />
                <section id="economy-showcase">
                    <VehicleSpecsShowcase data={comfortShowcaseData} />
                </section>
                <FeatureShowcase features={exteriorFeatures} />
            </section>

            {/* Interior & Comfort Section */}
            <section id="interior-comfort">
                <InteriorShowcase />
                <InteriorSection />
                <ComfortableSeatsSlider />
                <section id="handling-showcase">
                    <VehicleSpecsShowcase data={cabinCarData} />
                </section>
                <FeatureShowcase
                    features={interiorFeatures}
                    bgColor="#F7FAFC"
                    contentBgColor="#2A4365"
                    textColor="#F7FAFC"
                    bulletColor="#63B3ED"
                    height={36} // Taller media containers
                />
            </section>

            {/* Safety Section */}
            <section id="safety">
                <SafetyScrollingSection />
            </section>

                 {/* Contact Section */}
              <section id="contact">
                <ContactBanner />
            </section>

            

        </main>
    );
}