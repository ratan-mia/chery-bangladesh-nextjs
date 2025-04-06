import { motion } from 'framer-motion';
import React, { useEffect, useRef, useState } from 'react';
import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

const CommunitySection = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const textRef = useRef(null);
  const [textHeight, setTextHeight] = useState(null);

  const images = [
    '/images/about/community/1.jpg',
    '/images/about/community/2.jpg',
    '/images/about/community/3.jpg',
  ];

  const handleSlideChange = (swiper) => {
    setActiveSlide(swiper.realIndex);
  };

  useEffect(() => {
    const resizeObserver = new ResizeObserver(() => {
      if (textRef.current) {
        setTextHeight(textRef.current.offsetHeight);
      }
    });

    if (textRef.current) {
      resizeObserver.observe(textRef.current);
    }

    return () => {
      if (textRef.current) {
        resizeObserver.unobserve(textRef.current);
      }
    };
  }, []);

  return (
    <section className="flex flex-col lg:flex-row px-6 lg:px-0">
      {/* Text Column */}
      <motion.div
        ref={textRef}
        className="lg:w-1/2 w-full px-6 lg:px-16 py-16 lg:py-24 bg-primary order-2 lg:order-1 flex flex-col justify-center"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl lg:text-4xl font-semibold text-white leading-snug mb-6">
          We consistently fulfill the mission and take on the responsibility of Chery towards community.
        </h2>
        <p className="text-base lg:text-lg text-white/90 leading-relaxed">
          Chery has been expanding globally for over 20 years, with operations in over 60 countries and regions worldwide.
          Practicing social responsibility is an essential part of Chery’s global strategy. We actively contribute to public welfare in green development,
          environmental protection, social welfare, and talent development.
        </p>
      </motion.div>

      {/* Image Column */}
      <motion.div
        className="lg:w-1/2 w-full order-1 lg:order-2 relative"
        style={{ height: textHeight ? `${textHeight}px` : 'auto' }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        viewport={{ once: true }}
      >
        <Swiper
          spaceBetween={16}
          slidesPerView={1}
          onSlideChange={handleSlideChange}
          loop
        >
          {images.map((image, index) => (
            <SwiperSlide key={index}>
              <img
                src={image}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination Lines - Inside Image */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center gap-2 z-10">
          {images.map((_, index) => (
            <span
              key={index}
              className={`h-0.5 w-8 transition-all duration-300 ${
                activeSlide === index ? 'bg-secondary' : 'bg-white/60'
              }`}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default CommunitySection;
