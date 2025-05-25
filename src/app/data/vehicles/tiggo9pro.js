// Tiggo 9 Pro power showcase data for 1.5TGDI variant - UPDATED WITH CORRECT SPECIFICATIONS
export const tiggo9ProPowerData = {
    imageSrc: "/images/tiggo9pro/power.jpg",
    imageAlt: "Chery Tiggo 9 Pro with couple",
    overtitle: "POWER",
    title: "MASSIVE POWER",
    description: "Experience breathtaking acceleration and responsive handling with our advanced powertrain technology.",
    specs: [
      {
        label: "Engine power",
        value: '115',
        unit: "kW",
        decimal: false,
        duration: 2
      },
      {
        label: "Motor Comprehensive Power",
        value: '455',
        unit: "kW",
        decimal: false,
        duration: 2.2
      },
      {
        label: "Engine Torque",
        value: "220",
        unit: "Nm",
        decimal: false,
        duration: 2.4
      },
      {
        label: "Motor Comprehensive Torque",
        value: "920",
        unit: "Nm",
        decimal: false,
        duration: 1.8
      },
      {
        label: "0-100 Acceleration",
        value: "5.7",
        unit: "sec",
        decimal: true,
        duration: 1.5
      },
      {
        label: "Engine Displacement",
        value: "1499",
        unit: "cc",
        decimal: false,
        duration: 1.6
      }
    ]
  };
  
  // Cabin data - UPDATED VALUES
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
        unit: "inch 2.5K",
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
        unit: "speakers",
        decimal: false,
        duration: 2.2
      },
      {
        label: "Qualcomm Chip",
        value: "8155",
        unit: "chip+",
        decimal: false,
        duration: 2.4
      }
    ]
  };
  
  // Comfort Data - UPDATED VALUES
  export const comfortShowcaseData = {
    imageSrc: "/images/tiggo9pro/comfort-banner.jpg",
    imageAlt: "Chery Tiggo 9 Pro with family at luxury beachfront residence",
    overtitle: "COMFORT AND QUIET",
    title: "COMFORT",
    description: "Experience unparalleled comfort with our spacious interior and advanced climate control technology.",
    specs: [
      {
        label: "Seating capacity",
        value: 7,
        unit: "seats (2+3+2)",
        decimal: false,
        duration: 2
      },
      {
        label: "Battery Capacity",
        value: "33.46",
        unit: "kWh",
        decimal: true,
        duration: 2.2
      },
      {
        label: "Range on Battery",
        value: "170",
        unit: "KM",
        decimal: false,
        duration: 2.4
      },
      {
        label: "Range on Fuel",
        value: "1300",
        unit: "KM",
        decimal: false,
        duration: 1.5
      }
    ]
  };
  
  // Updated vehicle specifications with exact provided values
  export const vehicleSpecs = {
    dimensions: {
      length: 4810, // mm
      width: 1925, // mm
      height: 1741, // mm
      wheelbase: 2800, // mm
      groundClearance: 147 // mm
    },
    powertrain: {
      engineDisplacement: 1499, // cc
      enginePower: 115, // kW
      engineTorque: 220, // Nm
      motorComprehensivePower: 455, // kW
      motorComprehensiveTorque: 920, // Nm
      acceleration0to100: 5.7, // seconds
      fuelConsumptionNEDC: 6.2, // KM/L
      rangeOnFuel: 1300, // KM
      rangeOnBatteryNEDC: 170, // KM
      batteryCapacity: 33.46, // kWh
      grossVehicleMass: 2233, // kg (GVW)
      fuelTankCapacity: 70 // L
    },
    exteriorFeatures: [
      "Tiger-eye and diamond-embedded grille",
      "Stereoscopic diamond-shaped embossed grille",
      "High-recognition through tail lights",
      "Simple and tough body lines combined with domineering front face design",
      "Tiger Pattern Loop-fog Lamp Area Decor",
      "Shield Shaped Protective Grille",
      "20-inch Alloy Rims",
      "LED headlights with automatic control",
      "LED daytime running lights",
      "Front and rear dynamic turn signals"
    ],
    interiorFeatures: [
      "15.6\" 2.5K HD Screen (90% Screen-to-Body)",
      "3D mesh suede dash + Multi-function center console",
      "TOM wood grain decorative panel",
      "W-HUD Virtual Reality Heads Up Display",
      "Driver seats with memory, ventilation, heating and massage",
      "One Click Zero Gravity Seat",
      "14 Loudspeakers audio system",
      "Qualcomm 8155 chip+",
      "Full leather coverage on contact areas",
      "Dual-zone automatic climate control",
      "Panoramic sunroof with motorized sunshade"
    ],
    colors: {
      exterior: ["Aurora Green", "White", "Black", "Matte Gray", "Gray"],
      interior: ["Black Brown", "Black"]
    },
    technology: {
      engine: "1.5TGDI+3DHT",
      driveSystem: "Full scene intelligent 4WD system",
      transmissionType: "3DHT (3-speed DHT)",
      drivingModes: ["ECO", "NORMAL", "SPORT", "OFFROAD"],
      remoteFeatures: [
        "Remote vehicle searching",
        "Remote engine start via mobile app",
        "Remote air conditioning control",
        "Remote seat heating/ventilation",
        "One click heating",
        "Mobile APP remote control",
        "FOTA (Firmware Over-The-Air) updates"
      ],
      connectivity: [
        "Lion LionSmartCloud system",
        "WiFi hotspot capability",
        "Online navigation",
        "Wireless/wired CarPlay + Android Auto with HiCar",
        "Bluetooth connectivity",
        "Intelligent voice assistant (IVA)"
      ],
      adasFunctions: [
        "Lane departure warning (LDW)",
        "Blind spot detection (BSD)",
        "Rear cross traffic alert (RCTA)",
        "Rear cross traffic braking",
        "Emergency lane keeping (ELK)",
        "Traffic jam assist (TJA)",
        "Adaptive cruise control (ACC)",
        "Automatic parking assistant (APA)",
        "Intelligent cruise assist (ICA)",
        "Autonomous emergency braking (AEB)",
        "Front collision warning (FCW)",
        "Door opening warning (DOW)",
        "Speed limit assist",
        "Intelligent headlamp control (IHC)",
        "360° HD panoramic camera system",
        "Reversing camera with dynamic auxiliary lines",
        "Front and rear parking radar",
        "Driver monitoring system (DMS)",
        "Tire pressure monitoring system (TPMS)"
      ]
    },
    safety: {
      airbags: 10,
      airbagsDetails: [
        "Dual front airbags",
        "Front side airbags", 
        "Side curtain airbags",
        "Knee airbags for main driver",
        "Second row side airbags",
        "Far-end airbags"
      ],
      structuralSafety: {
        highStrengthSteel: "85%",
        hotFormedSteel: "21%",
        frontAntiCollisionBeam: "140mm height with 85% coverage",
        sideCurtains: "2060mm traverse side air curtains"
      },
      brakingSystem: "Newest IPB drive-by-wire of Bosch",
      safetyStandard: "Global five-star security standard",
      additionalSafety: [
        "ABS anti-lock braking system",
        "EBD Electronic Brakeforce Distribution",
        "ESP brake force control system",
        "TCS Traction Control",
        "EBA Emergency Brake Assist",
        "HAC Hill Assist System",
        "HDC Downhill Assist System",
        "Electronic immobilizer",
        "Vehicle anti-theft alarm"
      ]
    },
    convenience: [
      "PEPS remote control key",
      "Touch keyless entry",
      "Sensorized power tailgate",
      "Motorized fuel filler cap",
      "Four-door window one-touch up with anti-pinch",
      "Power folding exterior mirrors",
      "Heated exterior mirrors",
      "Automatic anti-glare interior rearview mirror",
      "Inductive windshield wipers",
      "Steering wheel electric heating"
    ]
  };

  export const tiggo9ProFeatures = [
    {
      title: "Global five-star security standard",
      points: [
        "85% high-strength steel construction for maximum protection",
        "21% hot-formed steel for enhanced structural integrity",
        "140mm height front anti-collision beam with 85% coverage"
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
      title: "Advanced 10 airbags safety system",
      points: [
        "Comprehensive protection with far-end airbags",
        "2060mm traverse side air curtains for maximum coverage",
        "Newest IPB drive-by-wire braking system from Bosch"
      ],
      media: {
        type: 'image',
        src: "/images/tiggo9pro/safety/airbag-system.jpg",
        alt: "Car with deployed airbags showing comprehensive safety system"
      }
    },
    {
      title: "19 ADAS functions for intelligent driving",
      points: [
        "Lane departure warning & emergency lane keeping",
        "Adaptive cruise control with traffic jam assist",
        "Automatic parking assistant with 360° panoramic view"
      ],
      media: {
        type: 'video',
        src: "/videos/adas.mp4"
      },
      contentBgColor: "#ac8975",
      bulletColor: "white"
    },
    {
      title: "Advanced Internet of Vehicles (IoV)",
      points: [
        "Remote vehicle control via mobile app",
        "Online navigation with real-time traffic updates",
        "Over-the-air (FOTA) firmware updates",
        "Lion LionSmartCloud connectivity platform"
      ],
      media: {
        type: 'image',
        src: "/images/tiggo9pro/safety/adas.jpg",
        alt: "IoV system and connectivity features visualization"
      },
      contentBgColor: "#ac8975",
      bulletColor: "white"
    }
  ];

  // Service and warranty information from Asian MotorspeX
  export const serviceInfo = {
    warranty: {
      duration: "5 years",
      mileage: "100,000 KM",
      buyBackOption: "Available"
    },
    serviceLocations: [
      {
        city: "Dhaka (Main)",
        address: "277, Tejgaon I/A, Dhaka, Bangladesh"
      },
      {
        city: "Chittagong",
        address: "Service center available"
      },
      {
        city: "Khulna", 
        address: "Service center available"
      }
    ],
    contact: {
      phone: "09639-119977",
      whatsapp: "014099-60306",
      email: "info@cherybd.com",
      website: "www.cherybd.com",
      facebook: "fb.com/CheryBDofficial"
    },
    distributor: {
      name: "Asian MotorspeX Limited",
      parentCompany: "Asian Holdings",
      address: "206/1-207/1 Bir Uttam Mir Shawkat Sarak, Tejgaon Gulshan Link Road, Dhaka 1208, Bangladesh",
      experience: "Over 10 years in automobile industry of Bangladesh",
      expertise: [
        "Foreign experts available",
        "Reliable maintenance service", 
        "Latest diagnostic technologies",
        "Skilled technicians with rigorous training",
        "Emergency roadside assistance",
        "Genuine spare parts availability"
      ]
    },
    tagline: "ONE STEP AHEAD"
  };