// Tiggo 9 Pro power showcase data for 1.5TGDI variant
export const tiggo9ProPowerData = {
    imageSrc: "/images/tiggo9pro/power.jpg",
    imageAlt: "Chery Tiggo 9 Pro with couple",
    overtitle: "POWER",
    title: "MASSIVE POWER",
    description: "Experience breathtaking acceleration and responsive handling with our advanced powertrain technology.",
    specs: [
      {
        label: "Maximum power",
        value: 145,
        unit: "kW",
        decimal: false,
        duration: 2
      },
      {
        label: "Maximum torque",
        value: 290,
        unit: "N·m",
        decimal: false,
        duration: 2.2
      },
      {
        label: "Engine",
        value: "1.5TGDI+3DHT",
        unit: "",
        decimal: false,
        duration: 2.4
      },
      {
        label: "0-100km acceleration",
        value: 8.9,
        unit: "s",
        decimal: true,
        duration: 1.5
      }
    ]
  };
  
  // Cabin data
  export const cabinCarData = {
    imageSrc: "/images/tiggo9pro/cabin-banner.jpg",
    imageAlt: "Tiggo 9 Pro intelligent cabin interior",
    overtitle: "INTELLIGENT CABIN",
    title: "INTELLIGENT CABIN",
    description: "Super wide body surround intelligent cabin. Super wide body, super comfortable, super quiet, super healthy.",
    specs: [
      {
        label: "HD screen",
        value: 15.6,
        unit: "inch",
        decimal: true,
        duration: 1.8
      },
      {
        label: "Screen-to-body ratio",
        value: 90,
        unit: "%",
        decimal: false,
        duration: 2
      },
      {
        label: "Loudspeakers",
        value: 14,
        unit: "",
        decimal: false,
        duration: 2.2
      },
      {
        label: "Seat adjustment",
        value: "6-way",
        unit: "",
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
        label: "Cargo space",
        value: 2.08,
        unit: "m²",
        decimal: true,
        duration: 2
      },
      {
        label: "Seat features",
        value: "Zero gravity",
        unit: "",
        decimal: false,
        duration: 2.2
      },
      {
        label: "Headrest",
        value: "Audio system",
        unit: "",
        decimal: false,
        duration: 2.4
      },
      {
        label: "Seat material",
        value: "Full leather",
        unit: "",
        decimal: false,
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
      title: "19 ADAS functions",
      points: [
        "Lane departure warning & prevention",
        "Adaptive cruise control",
        "Automatic parking assistant (APA)"
      ],
      media: {
        type: 'video',
        src: "/videos/adas.mp4"
      },
      contentBgColor: "#ac8975",
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
        alt: "ADAS system visualization"
      },
      contentBgColor: "#ac8975",
      bulletColor: "white"
    }
  ];
  
  // Additional vehicle specifications
  export const vehicleSpecs = {
    dimensions: {
      length: 4810,
      width: 1890,
      height: 1671,
      wheelbase: 2820
    },
    exteriorFeatures: [
      "Tiger-eye and diamond-embedded grille",
      "Stereoscopic diamond-shaped embossed grille",
      "High-recognition through tail lights",
      "Simple and tough body lines combined with domineering front face design"
    ],
    interiorFeatures: [
      "3D mesh suede dash + Multi-function center console",
      "TOM wood grain decorative panel",
      "HUD (Heads-Up Display)",
      "Driver seats with memory, ventilation, heating and massage",
      "2-3 row backseats fold in seconds for a 2.08 m² bed"
    ],
    colors: {
      exterior: ["Aurora Green", "White", "Black", "Gray"],
      interior: ["Black Brown", "Black"]
    },
    technology: {
      engine: "1.5TGDI+3DHT",
      driveSystem: "Full scene intelligent 4WD system",
      remoteFeatures: [
        "Remote vehicle searching",
        "Remotely turn on/off the air conditioning",
        "Remote seat heating/ventilation",
        "One click heating"
      ],
      adasFunctions: [
        "Lane departure warning",
        "Blind spot detection",
        "Rear cross traffic alert",
        "Rear cross traffic braking",
        "Following path guided assistance",
        "Rear collision warning",
        "Emergency lane keeping",
        "Traffic jam assist",
        "Adaptive cruise control",
        "Automatic parking assistant",
        "Lane changing assistance",
        "Intelligent evasion system",
        "Intelligent headlamp control",
        "Front collision warning",
        "Integrated steering assist",
        "Speed Limit Assist",
        "Autonomous emergency braking",
        "Door opening warning",
        "Departure ahead inform"
      ]
    }
  };