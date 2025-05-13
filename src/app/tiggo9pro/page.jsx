import React from 'react';

import HeroBanner from '@/components/tiggo9pro/HeroBanner';
import HotspotComponent from '@/components/tiggo9pro/HotspotComponent';
import PowertrainSpecsSection from '@/components/tiggo9pro/PowertrainSpecsSection';
import SafetyFeatureShowcase from '@/components/tiggo9pro/SafetyFeatureShowcase';
import VehicleSpecsShowcase from '@/components/tiggo9pro/VehicleSpecsShowcase';
import InteriorShowcase from '@components/tiggo9pro/InteriorShowcase';


export default function Page() {
    return (
        <main>
            <HeroBanner />
            <HotspotComponent />
            <InteriorShowcase/>
            <VehicleSpecsShowcase />
            <SafetyFeatureShowcase/>
            <PowertrainSpecsSection />
        </main>
    )
}
