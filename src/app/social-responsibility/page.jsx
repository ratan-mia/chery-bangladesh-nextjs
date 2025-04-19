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
        title="ENVIRONMENTAL INITIATIVES" 
        description="Our commitment to sustainability extends beyond our vehicles. Through reforestation programs, clean water projects, and renewable energy investments, we're working to create a greener future for generations to come."
        imageSrc="/images/environment-project.jpg"
        imageAlt="Environmental conservation project"
        contentPosition="right"
        overlayColor="rgba(34, 120, 85, 0.8)"
        showCta={true}
        ctaText="Explore Our Impact"
        ctaLink="#environmental-impact"
      />
      
      {/* Example with different styling */}
      <SocialResponsibility 
        title="EDUCATION FOR ALL" 
        description="We believe that education is a fundamental right. Our global scholarship programs and school building initiatives aim to provide quality education to children in underserved communities around the world."
        imageSrc="/images/education-program.jpg"
        imageAlt="Children in classroom"
        contentPosition="left"
        overlayColor="rgba(25, 55, 109, 0.8)"
        height="h-[600px]"
        showCta={true}
      />
    </div>
  );
}