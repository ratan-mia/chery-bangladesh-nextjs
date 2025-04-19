'use client';

import SocialResponsibility from '@components/social-responsibility/SocialResponsibility';

export default function Page() {
    return (
        <div className="space-y-12">
            {/* Example with content on the left (default) */}
            <SocialResponsibility
                title="GATHERING FORCES FOR GOOD"
                description="Chery actively fulfills its global corporate citizenship responsibilities, focusing on child development, environmental protection, and charitable aid. We give back to society with sincerity and warmth through meaningful action."
                imageSrc="/images/responsibility/1.jpg"
                imageAlt="Child smiling during social initiative"
                contentPosition="left"
                overlayColor="rgba(98, 58, 94, 0.8)"
            />

            {/* Example with content on the right */}
            <SocialResponsibility
                title="BUILDING A HAPPY CHERY"
                description="Chery focuses on enhancing employees' happiness in four areas: spiritual,
                            material, work, and life.
                            Chery invests 78.46 million RMB annually in employee development.
                            Chery has ensured zero cases of occupational diseases and 100%
                            coverage for health and safety training.
                            The Chery Care Fund has 99.9% employee participation, assisting
                            six individuals in need.
                            The `Happy Chery` platform serves 38,613 employees with inclusive services.
                            In 2023, Chery was recognized as a `Pilot Unit for improving Employees' Quality
                            of Life` in China."


                imageSrc="/images/responsibility/happy-chery.jpg"
                imageAlt="Environmental conservation project"
                contentPosition="right"
                overlayColor="rgba(34, 120, 85, 0.8)"
                showCta={true}
                ctaText="Explore Our Impact"
                ctaLink="#environmental-impact"
            />

            {/* Example with different styling */}
            <SocialResponsibility
                title="GATHERING FORCES FOR GOOD"
                description="Chery actively fulfills its global corporate citizenship responsibilities,
focusing on child development, environmental protection, and
charitable aid. We give back to society with sincerity and warmth
through meaningful action."
                imageSrc="/images/responsibility/child-development.jpg"
                imageAlt="Children in classroom"
                contentPosition="left"
                overlayColor="rgba(25, 55, 109, 0.8)"
                height="h-[600px]"
                showCta={true}
            />
        </div>
    );
}