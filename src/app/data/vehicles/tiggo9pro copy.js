
// Tiggo 9 Pro power showcase data
export const tiggo9ProPowerData = {
    imageSrc: "/images/tiggo9pro/power.jpg",
    imageAlt: "Chery Tiggo 9 Pro with couple",
    overtitle: "POWER",
    title: "MASSIVE POWER",
    description: "Experience breathtaking acceleration and responsive handling with our advanced powertrain technology.",
    specs: [
      {
        label: "Maximum power",
        value: 187,
        unit: "kW",
        decimal: false,
        duration: 2
      },
      {
        label: "Maximum output torque",
        value: 390,
        unit: "N·m",
        decimal: false,
        duration: 2.2
      },
      {
        label: "Maximum input torque",
        value: 470,
        unit: "N·m",
        decimal: false,
        duration: 2.4
      },
      {
        label: "0-100km acceleration",
        value: 8,
        unit: "s",
        decimal: true,
        duration: 1.5
      }
    ]
  };
  
  // Example of another vehicle data object
  export const cabinCarData = {
    imageSrc: "/images/tiggo9pro/cabin-banner.jpg",
    imageAlt: "My Next Car performance image",
    overtitle: "INTELLIGENT CABIN",
    title: "INTELLIGENT CABIN",
    description: "Experience the future of driving with our advanced cabin technology, designed for comfort and connectivity.",
    specs: [
      {
        label: "Lateral acceleration",
        value: 0.9,
        unit: "g",
        decimal: true,
        duration: 1.8
      },
      {
        label: "Braking distance",
        value: 36,
        unit: "m",
        decimal: false,
        duration: 2
      },
      {
        label: "Turning radius",
        value: 5.2,
        unit: "m",
        decimal: true,
        duration: 2.2
      },
      {
        label: "Top speed",
        value: 240,
        unit: "km/h",
        decimal: false,
        duration: 2.4
      }
    ]
  };
  
  // Comfort Data
  export const comfortShowcaseData = {
    imageSrc: "/images/tiggo9pro/comfort-banner.jpg",
    imageAlt: "Chery Tiggo 9 Pro with family at luxury beachfront residence",
    overtitle: "COMFORT",
    title: "COMFORT",
    description: "Experience unparalleled comfort with our spacious interior and advanced climate control technology.",
    specs: [
      {
        label: "Fuel consumption",
        value: 5.6,
        unit: "L/100km",
        decimal: true,
        duration: 2
      },
      {
        label: "CO₂ emissions",
        value: 128,
        unit: "g/km",
        decimal: false,
        duration: 2.2
      },
      {
        label: "Range",
        value: 800,
        unit: "km",
        decimal: false,
        duration: 2.4
      },
      {
        label: "Regenerative braking",
        value: 4.8,
        unit: "kW",
        decimal: true,
        duration: 1.5
      }
    ]
  };



  export const tiggo9ProFeatures = [
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