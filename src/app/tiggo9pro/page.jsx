import React from 'react';

import HotspotComponent from '@/components/tiggo9pro/HotspotComponent';
import VehicleSpecsShowcase from '@/components/tiggo9pro/VehicleSpecsShowcase';
import InteriorShowcase from '@components/tiggo9pro/InteriorShowcase';


export default function Page() {
    return (
        <main>
            <HotspotComponent />
            <InteriorShowcase/>
            <VehicleSpecsShowcase />
        </main>
    )
}
