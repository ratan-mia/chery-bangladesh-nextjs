"use client";

import CarFeaturesSlider from "../components/CarFeaturesSlider";
import CarColorSwitcher from "../components/tiggo8pro/CarColorSwitcher";
import FeatureSlider from "../components/tiggo8pro/FeatureSlider";
import VehicleSpecs from "../components/VehicleSpecs";



export default function Home() {
    const myFeatures = [
        {
          id: 1,
          image: "/images/my-feature1.jpg",
          title: "Premium Alloy Wheels",
          description: "18-inch diamond-cut alloy wheels with premium finish"
        },
        {
          id: 2,
          image: "/images/my-feature2.jpg",
          title: "Panoramic Sunroof",
          description: "Full-length glass roof with electric sunshade"
        }
      ];
  return (
    <main>
      <FeatureSlider/>
      <CarColorSwitcher />
      <VehicleSpecs 
        category="Appearance"
        title="Dynamic/Energetic Appearance"
        subtitle="See style, see grace"
        specs={[
            { name: "Length", value: "4720", unit: "mm" },
            { name: "Width", value: "1860", unit: "mm" },
            { name: "Height", value: "1705", unit: "mm" },
            { name: "Wheelbase", value: "2710", unit: "mm" }
        ]}
        />
        <CarFeaturesSlider 
      title="Premium Exterior Features" 
      subtitle="Discover our range of elegant design elements that enhance both style and performance"
      features={myFeatures}
    />
    </main>
  );
}
