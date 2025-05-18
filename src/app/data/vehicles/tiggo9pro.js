// Tiggo 9 Pro PHEV power showcase data
export const tiggo9ProPowerData = {
  imageSrc: "/images/tiggo9pro/power.jpg",
  imageAlt: "Chery Tiggo 9 Pro PHEV with couple",
  overtitle: "POWER",
  title: "MASSIVE POWER",
  description: "Experience breathtaking acceleration and responsive handling with our advanced Chery Super Hybrid (CSH) powertrain technology.",
  specs: [
    {
      label: "Engine power",
      value: '115kw',
      unit: "/154hp",
      decimal: false,
      duration: 2
    },
    {
      label: "Triple Motor Power",
      value: '455kw',
      unit: "/920Nm",
      decimal: false,
      duration: 2.2
    },
    {
      label: "Engine",
      value: "1.5T",
      unit: "DHE",
      decimal: false,
      duration: 2.4
    },
    {
      label: "Transmission",
      value: "3DHT",
      unit: "",
      decimal: true,
      duration: 1.5
    }
  ]
};

// Cabin data
export const cabinCarData = {
  imageSrc: "/images/tiggo9pro/cabin-banner.jpg",
  imageAlt: "Tiggo 9 Pro PHEV intelligent cabin interior",
  overtitle: "INTELLIGENT CABIN",
  title: "INTELLIGENT CABIN",
  description: "Super wide body surround intelligent cabin. Super wide, super comfortable, super quiet, super healthy.",
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
      label: "Loudspeakers (Sony)",
      value: 14,
      unit: "",
      decimal: false,
      duration: 2.2
    },
    {
      label: "Front headroom",
      value: 1028,
      unit: "mm",
      decimal: false,
      duration: 2.4
    }
  ]
};

// Comfort Data
export const comfortShowcaseData = {
  imageSrc: "/images/tiggo9pro/comfort-banner.jpg",
  imageAlt: "Chery Tiggo 9 Pro PHEV with family at luxury beachfront residence",
  overtitle: "COMFORT AND QUIET",
  title: "COMFORT",
  description: "Experience unparalleled comfort with our spacious interior, zero gravity seats and advanced climate control technology.",
  specs: [
    {
      label: "Cargo space",
      value: 2.08,
      unit: "m²",
      decimal: true,
      duration: 2
    },
    {
      label: "Seat massage",
      value: "10-point",
      unit: "",
      decimal: false,
      duration: 2.2
    },
    {
      label: "Female exclusive passenger seat",
      value: "One-click",
      unit: "reclining",
      decimal: false,
      duration: 2.4
    },
    {
      label: "Room efficiency",
      value: 70.04,
      unit: "%",
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
    contentBgColor: "#918678",
    textColor: "white",
    bulletColor: "white"
  },
  {
    title: "10 safety airbags",
    points: [
      "Front, side, and traverse side air curtains",
      "Unique far-end airbag between driver and passenger",
      "Knee airbag at driver side"
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
      "Adaptive cruise control in full speed range",
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
    title: "Chery Super Hybrid System",
    points: [
      "1.5T DHE with 44.5% thermal efficiency",
      "3DHT dedicated hybrid transmission",
      "Ultra-low 1.4L/100km NEDC fuel consumption",
      "1400km+ combined range"
    ],
    media: {
      type: 'image',
      src: "/images/tiggo9pro/hybrid/engine.jpg",
      alt: "Hybrid system visualization"
    },
    contentBgColor: "#ac8975",
    bulletColor: "white"
  }
];

// Additional vehicle specifications
export const vehicleSpecs = {
  dimensions: {
    length: 4810,
    width: 1925,
    height: 1741,
    wheelbase: 2800
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
    "HD W-HUD (Heads-Up Display)",
    "Driver seats with memory, ventilation, heating and 10-point massage",
    "One-click EZE (Easy Entry) for third row access"
  ],
  colors: {
    exterior: ["Aurora Green", "White", "Black", "Gray"],
    interior: ["Black Brown", "Black"]
  },
  technology: {
    engine: "1.5T DHE (Dedicated Hybrid Engine)",
    thermalEfficiency: 44.5, // %
    driveSystem: "Full scene intelligent 4WD system",
    batteryOptions: [
      {
        variant: "2WD Luxury",
        capacity: 19.43, // kWh
        batteryType: "NCM",
        pureElectricRange: 90, // km
        combinedRange: 1400 // km
      },
      {
        variant: "4WD Prestige",
        capacity: 34.46, // kWh
        batteryType: "NCM", 
        pureElectricRange: 170, // km
        combinedRange: 1350 // km
      }
    ],
    remoteFeatures: [
      "Remote vehicle searching",
      "Remotely turn on/off the air conditioning",
      "Remote seat heating/ventilation",
      "One click heating"
    ],
    adasFunctions: [
      "Lane departure warning (LDW)",
      "Lane departure prevention (LDP)",
      "Emergency lane keep (ELK)",
      "Blind spot detection (BSD)",
      "Lane changing assistance (LCA)",
      "Front collision warning (FCW)",
      "Departure ahead inform (DAI)",
      "Rear collision warning (RCW)",
      "Intelligent evasion system (IES)",
      "Rear Cross Traffic Alert (RCTA)",
      "Rear cross traffic braking (RCTB)",
      "Door opening warning (DOW)",
      "Intelligent headlamp control (IHC)",
      "Adaptive cruise control (ACC) in full speed range",
      "Integrated cruise assistance (ICA)",
      "Traffic jam assistance (TJA)",
      "Automatic emergency braking (AEB)",
      "Following path-guided assistance (FPGA)",
      "Automatic parking assistant (APA)"
    ]
  },
  performance: {
    acceleration: {
      zeroToHundred4WD: 5.4, // 0-100km/h acceleration in seconds (4WD version)
      maxSpeed: 180 // km/h
    },
    efficiency: {
      fuelConsumptionLoss2WD: 5.5, // L/100km NEDC (power loss)
      fuelConsumptionLoss4WD: 6.2, // L/100km NEDC (power loss)
      comprehensiveFuel2WD: 1.5, // L/100km NEDC
      comprehensiveFuel4WD: 1.4, // L/100km NEDC
      externalDischargeFunction: 6.6 // kW
    },
    motorSpecifications: [
      {
        name: "Drive motor 1 (EM1/Generator)",
        power: 75, // kW
        torque: 170 // N·m
      },
      {
        name: "Drive motor 2 (EM2)",
        power: 90, // kW
        torque: 220 // N·m
      },
      {
        name: "Drive motor 3 (EM3) - 4WD version only",
        power: 175, // kW
        torque: 310 // N·m
      }
    ],
    transmissionEfficiency: {
      evEfficiency: 97.6, // %
      comprehensiveEfficiency: 90 // %
    }
  },
  safetyFeatures: {
    batteryProtection: {
      waterproofRating: "IP68",
      maxWadingDepth: 500, // mm
      bottomGuardPlate: "590Mpa high-strength steel"
    },
    monitoringSystem: "7*24h battery health monitoring",
    batteryStandards: [
      "Chinese standard GB 38031",
      "European standard ECE R100",
      "American standard UL2580"
    ],
    batterySafety: {
      frame: "6-series aerospace aluminum alloy frame",
      protection: "Double-layer protection inside and outside",
      soakTime: "48 hours in 1 meter deep water"
    }
  },
  drivingModes: [
    {
      name: "EV mode",
      powerSource: "Motor drive (engine does not work)",
      applicableScenarios: "Fixed charging equipment, short-distance driving",
      advantages: "No fuel usage, cost savings"
    },
    {
      name: "Parallel mode",
      powerSource: "Engine and motor drive together",
      applicableScenarios: "Hill climbing, rapid acceleration",
      advantages: "Strong power"
    },
    {
      name: "REEV series mode",
      powerSource: "Engine generates electricity, motor drive",
      applicableScenarios: "Mid to low speed driving, long distance driving",
      advantages: "Low fuel consumption, long endurance mileage"
    },
    {
      name: "Direct engine drive mode",
      powerSource: "Engine directly drives the vehicle",
      applicableScenarios: "Cruising at high speed",
      advantages: "Low energy consumption at high speed"
    },
    {
      name: "Energy recovery mode",
      powerSource: "Motor reverses to generate power",
      applicableScenarios: "Slowdown, braking, downhill",
      advantages: "Energy conservation, extended range"
    }
  ],
  chargingMethods: [
    {
      type: "Car charger",
      chargingTime: 8.5 // hours
    },
    {
      type: "Home charging pile",
      chargingTimeShortRange: 3, // hours
      chargingTimeLongRange: 5.5 // hours
    },
    {
      type: "Quick charging pile",
      chargingTime: 20, // minutes (30-80%)
      rangeAdded: 85 // km
    }
  ],
  comfortFeatures: {
    cabinSystem: {
      name: "C-PURE healthy cabin",
      components: [
        "Automotive-grade CN95 air-conditioner filter element",
        "Self-cleaning cabin",
        "Negative ion air purifier"
      ],
      functions: [
        "Automatic ventilation upon unlocking",
        "Intelligent air sweeping after locking",
        "Filtration efficiency >95% for particles ≥0.3μm"
      ]
    },
    seatingFeatures: [
      "12-way electric adjustment for driver seat with memory",
      "10-position seat massage",
      "Seats with ventilation and heating",
      "Female exclusive passenger seat with one-click reclining",
      "Second row with 260mm slide stroke"
    ],
    audioSystem: {
      brand: "Sony",
      speakers: 14,
      features: [
        "Driver-exclusive headrest sound",
        "Built-in power amplifier",
        "Golden ear master-level tuning"
      ]
    },
    intelligentDisplays: [
      {
        name: "HD W-HUD",
        features: [
          "Information displayed on front windshield",
          "Adjustable position and brightness",
          "Displaying driving status and navigation information"
        ]
      },
      {
        name: "540° panoramic image",
        components: [
          "360° bodywork monitoring",
          "180° transparent chassis"
        ]
      }
    ],
    petMode: {
      description: "Automatically turns on air conditioning when activated with locked doors and windows",
      activationCondition: "High voltage battery power above 30%"
    }
  }
};