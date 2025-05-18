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

export const cheryHotspots = [
  {
    position: { top: '60%', left: '38%' },
    mobilePosition: { top: '55%', left: '35%' },
    title: 'Grille with tiger-like face',
    subtitle: 'Luxurious Design',
    description: 'The grille design mimics the face of a tiger, symbolizing power and elegance. The intricate pattern and chrome accents enhance the vehicle\'s luxurious appearance.',
    features: [
      {
        title: 'Tiger-shaped Design',
        description: 'Domineering front face inspired by tiger features for a powerful presence'
      },
      {
        title: 'Premium Materials',
        description: 'Chrome accents and high-quality finishes for a luxury appearance'
      },
      {
        title: 'Integrated Lighting',
        description: 'Seamlessly connects with headlights for a cohesive front fascia'
      }
    ],
    specifications: [
      { label: 'Material', value: 'High-grade chrome-plated finish' },
      { label: 'Pattern', value: 'Tiger-eye diamond pattern' },
      { label: 'Integration', value: 'Connected with LED daytime running lights' }
    ],
    detailImageSrc: '/images/tiggo9pro/hotspot/1.jpg',
    detailImageAlt: 'Grille with tiger-like face',
  },

  {
    position: { top: '55%', left: '40%' },
    mobilePosition: { top: '55%', left: '35%' },
    title: 'Stereoscopic diamond-shaped embossed grille',
    subtitle: 'Luxurious Design',
    description: 'The stereoscopic diamond-shaped embossed grille adds a touch of sophistication and modernity to the vehicle\'s front fascia. The unique design enhances aerodynamics and visual appeal.',
    features: [
      {
        title: '3D Diamond Pattern',
        description: 'Multi-dimensional diamond elements create depth and visual interest'
      },
      {
        title: 'Shield-shaped Structure',
        description: 'Protective grille design emphasizes safety and stability'
      },
      {
        title: 'Aerodynamic Enhancement',
        description: 'Pattern designed to optimize airflow while maintaining striking appearance'
      }
    ],
    specifications: [
      { label: 'Design Type', value: 'Stereoscopic diamond-pattern' },
      { label: 'Material', value: 'Diamond-embedded premium finish' },
      { label: 'Structure', value: 'Shield-shaped protective design' }
    ],
    detailImageSrc: '/images/tiggo9pro/hotspot/2.jpg',
    detailImageAlt: 'Stereoscopic diamond-shaped embossed grille',
  },

  {
    position: { top: '55%', left: '55%' },
    mobilePosition: { top: '55%', left: '35%' },
    title: 'Golden Ratio bodywork',
    subtitle: 'Luxurious Design',
    description: 'The golden ratio bodywork design ensures perfect proportions and balance, enhancing the vehicle\'s aesthetic appeal. The sleek lines and curves create a dynamic and elegant silhouette.',
    features: [
      {
        title: 'Classic Proportions',
        description: 'World\'s classic golden section design philosophy for visual harmony'
      },
      {
        title: 'Balanced Silhouette',
        description: 'Perfect proportions between length, width, and height'
      },
      {
        title: 'Artistic Beauty',
        description: 'Mathematically precise design creates a naturally pleasing aesthetic'
      }
    ],
    specifications: [
      { label: 'Length', value: '4810mm' },
      { label: 'Width', value: '1905mm' },
      { label: 'Height', value: '1711mm' },
      { label: 'Wheelbase', value: '2900mm' }
    ],
    detailImageSrc: '/images/tiggo9pro/hotspot/3.jpg',
    detailImageAlt: 'Golden Ratio bodywork',
  },

  {
    position: { top: '55%', left: '75%' },
    mobilePosition: { top: '55%', left: '35%' },
    title: 'Through taillights with high recognizability',
    subtitle: 'Luxurious Design',
    description: 'The through taillights feature a unique design that enhances visibility and safety. The high recognizability ensures that the vehicle stands out on the road, even in low-light conditions.',
    features: [
      {
        title: 'Connected Light Bar',
        description: 'Full-width taillight design creates distinctive brand signature'
      },
      {
        title: 'High Visibility',
        description: 'Enhanced illumination for improved safety in all conditions'
      },
      {
        title: 'Distinctive Signature',
        description: 'Unique light pattern increases vehicle recognition from a distance'
      }
    ],
    specifications: [
      { label: 'Light Type', value: 'LED through-design' },
      { label: 'Recognition Distance', value: 'Up to 200m at night' },
      { label: 'Pattern', value: 'Connected light bar with dynamic elements' }
    ],
    detailImageSrc: '/images/tiggo9pro/hotspot/7.jpg',
    detailImageAlt: 'Through taillights with high recognizability',
  },

  {
    position: { top: '38%', left: '60%' },
    mobilePosition: { top: '55%', left: '35%' },
    title: 'Retractable panoramic sunroof with electric sunshade',
    subtitle: 'Luxurious Design',
    description: 'The retractable panoramic sunroof with electric sunshade allows for an open-air experience while providing shade and UV protection. The large glass area enhances the cabin\'s spaciousness and brightness.',
    features: [
      {
        title: 'Expansive Glass Area',
        description: 'Extra-large panoramic view with one-touch operation'
      },
      {
        title: 'Electric Sunshade',
        description: 'Adjustable UV and heat protection with silent operation'
      },
      {
        title: 'Enhanced Spaciousness',
        description: 'Increases perceived cabin size and natural light'
      }
    ],
    specifications: [
      { label: 'Glass Type', value: 'Heat-insulating panoramic glass' },
      { label: 'Coverage', value: '90% of roof area' },
      { label: 'Operation', value: 'One-touch electric control' },
      { label: 'UV Protection', value: '99% UV filtering' }
    ],
    detailImageSrc: '/images/tiggo9pro/hotspot/5.jpg',
    detailImageAlt: 'Retractable panoramic sunroof with electric sunshade',
  },

];