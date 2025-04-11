'use client'

import Image from 'next/image';
import Link from 'next/link';

const HeroSection = () => {
  return (
    <div className="w-full flex flex-col md:flex-row">
      {/* Left side - Image */}
      <div className="w-full md:w-1/2 h-[400px] md:h-[600px] relative">
        <Image
          src="/images/services/workshop.webp"
          alt="Chery Bangladesh Showroom"
          fill
          className="object-cover"
          priority
        />
      
      </div>
      
      {/* Right side - Content */}
      <div className="w-full md:w-1/2 bg-primary-800 flex items-center justify-center p-8 md:p-12">
        <div className="max-w-md mx-auto text-center">
          <h1 className="text-2xl md:text-3xl font-bold text-white mb-4">
            WELCOME TO CHERY BANGLADESH
          </h1>
          <p className="text-white/90 mb-8">
            Experience innovation at its finest with our range of premium vehicles designed to exceed your expectations. Visit our showroom today.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link href="/schedule-visit" className="bg-white text-red-800 px-6 py-3 font-medium hover:bg-gray-100 transition-colors">
              SCHEDULE VISIT
            </Link>
            <Link href="/contact" className="bg-transparent border border-white text-white px-6 py-3 font-medium hover:bg-white/10 transition-colors">
              CONTACT US
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;