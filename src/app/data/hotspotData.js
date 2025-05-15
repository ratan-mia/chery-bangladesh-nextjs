/**
 * hotspotData.js
 * Contains the hotspot data and animation variants for the Hotspot Component
 */

// Animation variants - organized at the top for better code organization
export const animationVariants = {
    header: {
      visible: { opacity: 1, x: 0, transition: { duration: 0.7, ease: "easeOut" } },
      hidden: { opacity: 0, x: -20, transition: { duration: 0.5, ease: "easeIn" } }
    },
    content: {
      hidden: { opacity: 0, y: 20 },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    },
    stagger: {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: 0.1,
        },
      },
    },
    hotspot: {
      initial: { scale: 1 },
      hover: { scale: 1.15, transition: { duration: 0.3 } }
    },
    mobileFullscreen: {
      hidden: { opacity: 0, y: '100%' },
      visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
    },
    closeButton: {
      initial: { opacity: 0, scale: 0.8 },
      animate: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
      exit: { opacity: 0, scale: 0.8, transition: { duration: 0.3 } },
      hover: { backgroundColor: '#8c735d', color: '#fff', transition: { duration: 0.3 } }
    },
    detailImage: {
      hidden: { opacity: 0, scale: 0.95 },
      visible: { 
        opacity: 1, 
        scale: 1, 
        transition: { 
          duration: 0.7, 
          ease: [0.16, 1, 0.3, 1]  // Custom easing as per design guidelines
        } 
      }
    }
  };
  
  // Chery-specific hotspot data
  export const cheryHotspots = [
    {
      position: { top: '60%', left: '38%' },
      mobilePosition: { top: '55%', left: '35%' },
      title: 'Grille with tiger-like face',
      subtitle: 'Luxurious Design',
      description: 'The grille design mimics the face of a tiger, symbolizing power and elegance. The intricate pattern and chrome accents enhance the vehicle\'s luxurious appearance.',
      detailImageSrc: '/images/tiggo9pro/hotspot/1.jpg',
      detailImageAlt: 'Grille with tiger-like face',
    },
  
    {
      position: { top: '55%', left: '40%' },
      mobilePosition: { top: '55%', left: '35%' },
      title: 'Stereoscopic diamond-shaped embossed grille',
      subtitle: 'Luxurious Design',
      description: 'The stereoscopic diamond-shaped embossed grille adds a touch of sophistication and modernity to the vehicle\'s front fascia. The unique design enhances aerodynamics and visual appeal.',
      detailImageSrc: '/images/tiggo9pro/hotspot/2.jpg',
      detailImageAlt: 'Stereoscopic diamond-shaped embossed grille',
    },
  
    {
      position: { top: '45%', left: '80%' },
      mobilePosition: { top: '45%', left: '75%' },
      title: 'Matrix LED Headlights',
      subtitle: 'INTELLIGENT LIGHTING',
      description: 'Advanced Matrix LED technology provides exceptional illumination while automatically adjusting beam patterns to avoid dazzling other drivers.',
      features: [
        {
          title: 'Adaptive Beam Control',
          description: 'Individual LED control for precise light distribution'
        },
        {
          title: 'Dynamic Cornering',
          description: 'Follows steering input for enhanced visibility in turns'
        },
        {
          title: 'Weather Adaptation',
          description: 'Automatically adjusts for fog, rain, and snow conditions'
        }
      ],
      specifications: [
        { label: 'Light Output', value: '2,500 lumens' },
        { label: 'LED Count', value: '84 individual LEDs' },
        { label: 'Response Time', value: '< 1 millisecond' }
      ],
      detailImageSrc: '/images/headlights-detail.jpg',
      detailImageAlt: 'Matrix LED Headlights'
    },
  
    {
      position: { top: '35%', left: '60%' },
      mobilePosition: { top: '30%', left: '55%' },
      title: '1.5 TGDI Engine',
      subtitle: 'POWERFUL PERFORMANCE',
      description: 'Advanced 1.5 Turbo Gasoline Direct Injection (TGDI) engine delivering exceptional power and efficiency.',
      features: [
        {
          title: 'Turbo Technology',
          description: 'Enhanced power through turbocharging'
        },
        {
          title: 'Direct Injection',
          description: 'Precise fuel delivery for optimal combustion'
        },
        {
          title: 'Fuel Efficiency',
          description: 'Balanced performance and economy'
        }
      ],
      specifications: [
        { label: 'Engine Type', value: '1.5 TGDI' },
        { label: 'Max Power', value: '156 PS' },
        { label: 'Max Torque', value: '230 Nm' }
      ],
      detailImageSrc: '/images/engine-detail.jpg',
      detailImageAlt: '1.5 TGDI Engine'
    },
  
    {
      position: { top: '55%', left: '75%' },
      mobilePosition: { top: '55%', left: '65%' },
      title: 'LED Tail Lights',
      subtitle: 'DISTINCTIVE SIGNATURE',
      description: 'Full-width LED light bar creates a striking visual signature while providing superior visibility and safety in all conditions.',
      features: [
        {
          title: 'Sequential Indicators',
          description: 'Dynamic turn signals for clear communication'
        },
        {
          title: 'Adaptive Brightness',
          description: 'Automatically adjusts based on ambient light'
        },
        {
          title: '3D Light Design',
          description: 'Multi-dimensional light elements for depth'
        }
      ],
      specifications: [
        { label: 'LED Type', value: 'High-intensity OLED' },
        { label: 'Lifespan', value: '50,000 hours' },
        { label: 'Response Time', value: '0.2 seconds' }
      ],
      detailImageSrc: '/images/taillights-detail.jpg',
      detailImageAlt: 'LED tail lights'
    },
  
    {
      position: { top: '50%', left: '90%' },
      mobilePosition: { top: '50%', left: '85%' },
      title: 'Side Mirror Tech',
      subtitle: 'SMART VISIBILITY',
      description: 'Intelligent side mirrors with integrated technology ensure safe driving with blind spot monitoring, auto-dimming, and camera integration.',
      features: [
        {
          title: 'Blind Spot Alert',
          description: 'Visual and audible warnings for hidden vehicles'
        },
        {
          title: 'Auto-Folding',
          description: 'Automatically folds when parked for protection'
        },
        {
          title: '360° Camera',
          description: 'Integrated cameras for surround view system'
        }
      ],
      specifications: [
        { label: 'Mirror Type', value: 'Electrochromic' },
        { label: 'Camera Resolution', value: '1080p HD' },
        { label: 'Field of View', value: '180°' }
      ],
      detailImageSrc: '/images/mirrors-detail.jpg',
      detailImageAlt: 'Side mirror technology'
    }
  ];