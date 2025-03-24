'use client'

import CheryTiggoSection from './components/CheryTiggoSection'
import Header from './components/Header'
import HeroSlider from './components/HeroSlider'

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSlider />
      <CheryTiggoSection />
      <footer className="bg-gray-800 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between">
            <div className="mb-6 md:mb-0">
              <h3 className="text-xl font-bold mb-4">Chery Bangladesh</h3>
              <p className="max-w-md">
                Official distributor of Chery vehicles in Bangladesh.
              </p>
            </div>

            <div>
              <h4 className="text-lg font-bold mb-3">Quick Links</h4>
              <ul>
                <li className="mb-2"><a href="#" className="hover:text-gray-300">Models</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gray-300">News</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gray-300">About Us</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gray-300">Contact</a></li>
                <li className="mb-2"><a href="#" className="hover:text-gray-300">Service</a></li>
              </ul>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-700 text-center">
            <p>&copy; {new Date().getFullYear()} Chery Bangladesh. All Rights Reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}