import React from 'react';

import FeatureShowcase from '@/components/tiggo9pro/FeatureShowcase';
import HeroBanner from '@/components/tiggo9pro/HeroBanner';
import HotspotComponent from '@/components/tiggo9pro/HotspotComponent';
import PowertrainSpecsSection from '@/components/tiggo9pro/PowertrainSpecsSection';
import VehicleSpecsShowcase from '@/components/tiggo9pro/VehicleSpecsShowcase';
import ComfortableSeatsSlider from '@components/tiggo9pro/ComfortableSeatsSlider';
import InteriorSection from '@components/tiggo9pro/InteriorSection';
import InteriorShowcase from '@components/tiggo9pro/InteriorShowcase';
import SafetyScrollingSection from '@components/tiggo9pro/SafetyScrollingSection';







export default function Page() {
    const features = [
        {
            title: "Global five-star security standard",
            points: [
                "85% high-strength steel",
                "21% hot-formed steel",
                "140mm height of front anti-collision beam with 85% coverage"
            ],
            media: {
                type: 'image',
                src: "/images/tiggo9pro/safety/chassis-structure.jpg",
                alt: "Colored chassis structure showing different types of steel"
            },
            // Optional per-feature customization
            contentBgColor: "#918678",
            textColor: "white",
            bulletColor: "white"
        },
        {
            title: "10 safety airbags",
            points: [
                "With far-end airbags",
                "2060mm traverse side air curtains",
                "Newest IPB drive-by-wire of Bosch"
            ],
            media: {
                type: 'image',
                src: "/images/tiggo9pro/safety/airbag-system.jpg",
                alt: "Car with deployed airbags showing safety system"
            }
        },
        {
            title: "Harness the future and guide the world wisely",
            points: [
                "19 ADAS functions",
                "540° panoramic image",
                "Automatic parking assistant (APA)"
            ],
            media: {
                type: 'video',
                src: "/videos/adas.mp4"
            },
            contentBgColor: "#ac8975",// Custom background for this feature only
            bulletColor: "white"
        },
        {
            title: "Internet of Vehicles (IoV) function",
            points: [
                "Remote vehicle control",
                "On-line navigation",
                "On-line recreation",
                "OTA upgrade"

            ],
            media: {
                type: 'image',
                src: "/images/tiggo9pro/safety/adas.jpg",
                alt: "Colored chassis structure showing different types of steel"
            },
            contentBgColor: "#ac8975", // Different background color
            bulletColor: "white"
        }
    ];

    return (
        <main>
            <HeroBanner />
            <HotspotComponent />
            <InteriorShowcase />
            <VehicleSpecsShowcase />

            <FeatureShowcase features={features.slice(0, 2)} />

            <PowertrainSpecsSection />
            <FeatureShowcase
                features={features.slice(2, 4)}
                bgColor="#F7FAFC"
                contentBgColor="#2A4365"
                textColor="#F7FAFC"
                bulletColor="#63B3ED"
                height={36} // Taller media containers
            />
            
            <InteriorSection/>
            <SafetyScrollingSection />
            <ComfortableSeatsSlider />
        </main>
    )
}
