import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';
import type { Swiper as SwiperType } from 'swiper';
import { Autoplay, EffectFade, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-fade';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

interface FeatureHighlight {
  title: string;
  description: string;
  icon?: string;
}

interface Slide {
  id?: string;
  type: 'image' | 'video';
  src: string;
  modelName: string;
  tagline: string;
  description?: string;
  logoSrc?: string;
  brochureLink?: string;
  testDriveLink?: string;
  configureLink?: string;
  specs?: { [key: string]: string | number };
  featureHighlight?: FeatureHighlight;
  bgPosition?: string;
  color?: string;
  colorCode?: string;
  badge?: string;
  features?: string[];
}

const slidesData: Slide[] = [
  {
    id: 'exterior',
    type: 'image',
    src: '/images/tiggocross/hero/1.webp',
    modelName: 'TIGGO CROSS',
    tagline: 'FOR EVERY KIND OF YOU',
    color: 'silver',
    colorCode: 'bg-brown-400',
    badge: 'New Model',
    specs: {
      'Engine': '1.5L Turbo',
      'Power': '145 HP',
      'Torque': '210 Nm',
      '0-100 km/h': '9.9 sec'
    },
    features: [
      'Dynamic Styling',
      'LED Lighting',
      'Aerodynamic Design',
      '18" Alloy Wheels'
    ],
    brochureLink: '#',
    testDriveLink: '#'
  },
  {
    id: 'interior',
    type: 'image',
    src: '/images/tiggocross/hero/2.webp',
    modelName: 'TIGGO CROSS',
    tagline: 'COMFORT REDEFINED',
    color: 'blue',
    colorCode: 'bg-brown-700',
    badge: 'Premium Interior',
    specs: {
      'Seats': '5 Leather',
      'Display': '10.25" Touchscreen',
      'Sound': '8-Speaker System',
      'Panoramic Roof': 'Available'
    },
    features: [
      'Ambient Lighting',
      'Heated Seats',
      'Dual-Zone Climate',
      'Premium Materials'
    ],
    brochureLink: '#',
    testDriveLink: '#'
  },
  {
    id: 'technology',
    type: 'image',
    src: '/images/tiggocross/hero/1.webp',
    modelName: 'TIGGO CROSS',
    tagline: 'ADVANCED TECHNOLOGY',
    color: 'red',
    colorCode: 'bg-brown-900',
    badge: 'Smart Technology',
    specs: {
      'Safety': '6 Airbags',
      'ADAS': 'Level 2',
      'Connectivity': 'Wireless',
      'Drive Modes': '4 Options'
    },
    features: [
      'Lane Keep Assist',
      'Adaptive Cruise',
      'Wireless CarPlay',
      'Auto Emergency Braking'
    ],
    brochureLink: '#',
    testDriveLink: '#'
  }
];

interface CarShowcaseSliderProps {
  slides?: Slide[];
  height?: string;
  autoplaySpeed?: number;
  showIndicators?: boolean;
  showControls?: boolean;
  showSpecs?: boolean;
  className?: string;
}

const CarShowcaseSlider = ({
  slides = slidesData,
  height = 'h-[700px]',
  autoplaySpeed = 6000,
  showIndicators = true,
  showControls = true,
  showSpecs = true,
  className = '',
}: CarShowcaseSliderProps) => {
  const [mounted, setMounted] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isHovered, setIsHovered] = useState(false);
  const [swiperInstance, setSwiperInstance] = useState<SwiperType | null>(null);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  const handleSlideChange = useCallback((swiper: SwiperType) => {
    setActiveIndex(swiper.realIndex);
  }, []);

  const toggleAutoplay = useCallback(() => {
    if (swiperInstance) {
      if (isPlaying) {
        swiperInstance.autoplay.stop();
      } else {
        swiperInstance.autoplay.start();
      }
      setIsPlaying(!isPlaying);
    }
  }, [isPlaying, swiperInstance]);

  const goToSlide = useCallback((index: number) => {
    if (swiperInstance) {
      swiperInstance.slideToLoop(index);
    }
  }, [swiperInstance]);

  const goToPrevSlide = useCallback(() => {
    if (swiperInstance) {
      swiperInstance.slidePrev();
    }
  }, [swiperInstance]);

  const goToNextSlide = useCallback(() => {
    if (swiperInstance) {
      swiperInstance.slideNext();
    }
  }, [swiperInstance]);

  if (!slides || slides.length === 0) {
    return (
      <div className={`flex items-center justify-center ${height} bg-black text-white`}>
        <p className="text-xl font-light">No vehicles available to display</p>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full overflow-hidden bg-black ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-gray-900 h-1">
        {isPlaying && (
          <div
            className="h-full bg-white"
            style={{
              width: '100%',
              animation: `progressAnim ${autoplaySpeed}ms linear infinite`,
              animationPlayState: isHovered ? 'paused' : 'running'
            }}
          />
        )}
      </div>

      {/* Slide model indicators */}
      {showIndicators && (
        <div className="absolute top-0 left-0 right-0 z-40 flex justify-center gap-1 px-2 bg-black bg-opacity-80">
          {slides.map((slide, index) => (
            <button
              key={`indicator-${slide.id || index}`}
              onClick={() => goToSlide(index)}
              className={`py-3 px-4 transition-all duration-200 text-xs uppercase tracking-wider font-normal border-b-2 ${activeIndex === index
                  ? 'border-white text-white'
                  : 'border-transparent text-gray-400 hover:text-gray-200'
                }`}
              aria-label={`Go to slide ${index + 1}`}
            >
              {slide.tagline}
            </button>
          ))}
        </div>
      )}

      {mounted && (
        <Swiper
          onSwiper={setSwiperInstance}
          modules={[EffectFade, Navigation, Pagination, Autoplay]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          speed={800}
          slidesPerView={1}
          navigation={{
            nextEl: '.slider-button-next',
            prevEl: '.slider-button-prev',
          }}
          autoplay={isPlaying && slides.length > 1 ? {
            delay: autoplaySpeed,
            disableOnInteraction: false,
          } : false}
          loop={slides.length > 1}
          onSlideChange={handleSlideChange}
          className={`w-full ${height}`}
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={`slide-${slide.id || index}`} className="relative w-full h-full">
              {/* Background media */}
              <div className="absolute inset-0 w-full h-full">
                {slide.type === 'video' ? (
                  <video
                    className="w-full h-full object-cover"
                    style={{ objectPosition: slide.bgPosition || 'center' }}
                    autoPlay
                    loop
                    muted
                    playsInline
                  >
                    <source src={slide.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <Image
                    src={slide.src}
                    alt={`${slide.modelName} - ${slide.tagline}`}
                    className="object-cover"
                    style={{ objectPosition: slide.bgPosition || 'center' }}
                    fill
                    priority={index === 0 || index === 1}
                    quality={90}
                  />
                )}

                {/* Clean, flat overlay */}
                <div className="absolute inset-0 bg-gradient-to-r from-black from-40% to-transparent" />
              </div>

              {/* Main content */}
              <div className="relative h-full flex flex-col">
                <div className="flex-grow flex items-center px-8 md:px-16 z-20">
                  <div className="w-full md:w-5/12 animate-in">
                    <div className="space-y-5">
                      <div>
                        <h3 className="text-gray-400 text-base uppercase tracking-wide mb-1 font-light">
                          {slide.modelName}
                        </h3>
                        <h2 className="text-white text-3xl sm:text-4xl md:text-5xl font-light leading-tight">
                          {slide.tagline}
                        </h2>
                      </div>

                      {slide.description && (
                        <p className="text-gray-300 text-base font-light leading-relaxed max-w-lg">
                          {slide.description}
                        </p>
                      )}

                      {/* Call to action buttons */}
                      <div className="flex flex-wrap gap-4 pt-4">
                        {slide.brochureLink && (
                          <a
                            href={slide.brochureLink}
                            className="bg-white text-black px-6 py-3 transition-all flex items-center group"
                          >
                            <span>Discover More</span>
                            <svg className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M14 5L21 12M21 12L14 19M21 12H3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                          </a>
                        )}

                        {slide.testDriveLink && (
                          <a
                            href={slide.testDriveLink}
                            className="border border-white text-white px-6 py-3 transition-all hover:bg-white hover:text-black"
                          >
                            Test Drive
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Specifications */}
                {showSpecs && slide.specs && (
                  <div className="pb-16 px-8 md:px-16 z-20">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-4 w-full max-w-4xl">
                      {Object.entries(slide.specs).map(([key, value]) => (
                        <div key={key} className="border-l border-gray-500 pl-4">
                          <span className="block text-gray-400 text-xs uppercase tracking-wide mb-1">{key}</span>
                          <span className="block text-white text-xl font-light">{value}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      {/* Controls */}
      {showControls && (
        <>
          <button
            className="slider-button-prev absolute top-1/2 -translate-y-1/2 left-4 z-40 w-10 h-10 flex items-center justify-center bg-black bg-opacity-50 transition-all hover:bg-opacity-70"
            onClick={goToPrevSlide}
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M15 18L9 12L15 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            className="slider-button-next absolute top-1/2 -translate-y-1/2 right-4 z-40 w-10 h-10 flex items-center justify-center bg-black bg-opacity-50 transition-all hover:bg-opacity-70"
            onClick={goToNextSlide}
          >
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none">
              <path d="M9 6L15 12L9 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>

          <button
            onClick={toggleAutoplay}
            className="absolute bottom-6 right-6 z-40 w-10 h-10 flex items-center justify-center bg-black bg-opacity-50 transition-all hover:bg-opacity-70"
          >
            {isPlaying ? (
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                <rect x="7" y="6" width="3" height="12" rx="1" fill="currentColor" />
                <rect x="14" y="6" width="3" height="12" rx="1" fill="currentColor" />
              </svg>
            ) : (
              <svg className="w-5 h-5 text-white" viewBox="0 0 24 24" fill="none">
                <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
              </svg>
            )}
          </button>

          <div className="absolute bottom-6 left-6 z-40 bg-black bg-opacity-50 px-3 py-2">
            <p className="text-white text-sm font-light">
              <span className="text-lg">{activeIndex + 1}</span>
              <span className="mx-2 opacity-40">/</span>
              <span className="opacity-70">{slides.length}</span>
            </p>
          </div>
        </>
      )}

      <style jsx global>{`
        @keyframes progressAnim {
          0% { width: 0%; }
          100% { width: 100%; }
        }
        
        .swiper-slide-active .animate-in {
          animation: fadeInUp 0.8s ease forwards;
        }
        
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default CarShowcaseSlider;