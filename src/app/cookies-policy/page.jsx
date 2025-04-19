"use client";

import CookieSettingsButton from "@components/CookieSettingsButton";
import Link from "next/link";
import { useState } from "react";

const CookiesPolicy = () => {
  // State for accordion functionality
  const [openSection, setOpenSection] = useState("what-are-cookies");

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero section */}
      <div className="bg-[#f5f5f5] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Cookies Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            This Cookies Policy explains how Chery Bangladesh uses cookies and
            similar technologies to recognize and understand how you interact
            with our website.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="text-gray-700 mb-4">Last updated: April 13, 2025</p>
            <p className="text-gray-700 mb-4">
              This Cookies Policy explains how Chery Automobiles Bangladesh
              ("we", "us", "our") uses cookies and similar technologies when you
              visit our website at{" "}
              <Link href="/" className="text-primary-600 hover:underline">
                www.cherybd.com
              </Link>
              , and any other websites that we own and operate.
            </p>
            <p className="text-gray-700 mb-4">
              By using our website, you consent to the use of cookies in
              accordance with this Cookies Policy. If you do not consent to our
              use of cookies, you should set your browser settings accordingly
              or not use our website.
            </p>
          </div>

          {/* Accordion sections */}
          <div className="space-y-4">
            {/* What are cookies section */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("what-are-cookies")}
              >
                <span>What are cookies?</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "what-are-cookies" ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {openSection === "what-are-cookies" && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700 mb-3">
                    Cookies are small text files that are placed on your
                    computer or mobile device when you visit a website. They are
                    widely used to make websites work more efficiently and
                    provide information to the website owners.
                  </p>
                  <p className="text-gray-700 mb-3">
                    Cookies help us recognize your device and remember certain
                    information about your visit, such as your preferences and
                    the pages you visited. This can make your next visit easier
                    and the site more useful to you.
                  </p>
                  <p className="text-gray-700">
                    Most web browsers automatically accept cookies, but you can
                    usually modify your browser settings to decline cookies if
                    you prefer. This may prevent you from taking full advantage
                    of our website.
                  </p>
                </div>
              )}
            </div>

            {/* Types of cookies we use */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("types-of-cookies")}
              >
                <span>Types of cookies we use</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "types-of-cookies" ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {openSection === "types-of-cookies" && (
                <div className="p-4 bg-white">
                  <h3 className="font-medium text-gray-800 mb-2">
                    1. Necessary Cookies
                  </h3>
                  <p className="text-gray-700 mb-3 pl-4">
                    These cookies are essential for you to browse our website
                    and use its features. They enable core functionality such as
                    security, network management, and account access. You cannot
                    opt out of these cookies.
                  </p>

                  <h3 className="font-medium text-gray-800 mb-2">
                    2. Functional Cookies
                  </h3>
                  <p className="text-gray-700 mb-3 pl-4">
                    These cookies enable us to provide enhanced functionality
                    and personalization. They may be set by us or by third-party
                    providers whose services we have added to our pages. If you
                    disable these cookies, some or all of these services may not
                    function properly.
                  </p>

                  <h3 className="font-medium text-gray-800 mb-2">
                    3. Analytics Cookies
                  </h3>
                  <p className="text-gray-700 mb-3 pl-4">
                    These cookies allow us to count visits and traffic sources
                    so we can measure and improve the performance of our site.
                    They help us know which pages are the most and least popular
                    and see how visitors move around the site. All information
                    these cookies collect is aggregated.
                  </p>

                  <h3 className="font-medium text-gray-800 mb-2">
                    4. Advertising Cookies
                  </h3>
                  <p className="text-gray-700 pl-4">
                    These cookies may be set through our site by our advertising
                    partners. They may be used by those companies to build a
                    profile of your interests and show you relevant
                    advertisements on other sites. They do not store directly
                    personal information but are based on uniquely identifying
                    your browser and internet device.
                  </p>
                </div>
              )}
            </div>

            {/* How to manage cookies */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("manage-cookies")}
              >
                <span>How to manage cookies</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "manage-cookies" ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {openSection === "manage-cookies" && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700 mb-3">
                    You can manage your cookies preferences in two ways:
                  </p>

                  <h3 className="font-medium text-gray-800 mb-2">
                    1. Using our Cookie Settings
                  </h3>
                  <p className="text-gray-700 mb-3 pl-4">
                    When you first visit our website, you will be presented with
                    a cookie banner that allows you to accept or reject cookies.
                    You can also access these settings at any time by clicking
                    on the "Cookie Settings" link in the footer of our website.
                  </p>

                  <h3 className="font-medium text-gray-800 mb-2">
                    2. Through your browser settings
                  </h3>
                  <p className="text-gray-700 mb-3 pl-4">
                    Most web browsers allow you to control cookies through their
                    settings preferences. Here's how to manage cookies in common
                    browsers:
                  </p>

                  <ul className="list-disc pl-8 text-gray-700 mb-3">
                    <li className="mb-1">
                      Google Chrome: Settings {">"} Privacy and security {">"}{" "}
                      Cookies and other site data
                    </li>
                    <li className="mb-1">
                      Microsoft Edge: Settings {">"} Cookies and site
                      permissions {">"} Manage and delete cookies and site data
                    </li>
                    <li className="mb-1">
                      Safari: Preferences {">"} Privacy {">"} Cookies and
                      website data
                    </li>
                    <li className="mb-1">
                      Firefox: Options {">"} Privacy & Security {">"} Cookies
                      and Site Data
                    </li>
                  </ul>

                  <p className="text-gray-700">
                    Please note that restricting cookies may impact your
                    experience on our website and limit the functionality we can
                    provide.
                  </p>
                </div>
              )}
            </div>

            {/* Third-party cookies */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("third-party-cookies")}
              >
                <span>Third-party cookies</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "third-party-cookies" ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {openSection === "third-party-cookies" && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700 mb-3">
                    Our website may use third-party services that set their own
                    cookies, such as:
                  </p>

                  <ul className="list-disc pl-4 text-gray-700 mb-3">
                    <li className="mb-1">
                      Google Analytics – for website traffic analysis
                    </li>
                    <li className="mb-1">
                      Google Ads – for advertising and remarketing
                    </li>
                    <li className="mb-1">
                      Facebook Pixel – for advertising and conversion tracking
                    </li>
                    <li className="mb-1">YouTube – for video embedding</li>
                    <li className="mb-1">
                      Hotjar – for website usage analysis
                    </li>
                  </ul>

                  <p className="text-gray-700">
                    These third parties may use cookies, web beacons, and
                    similar technologies to collect or receive information from
                    our website and elsewhere on the internet. They use this
                    information to provide measurement services, target
                    advertisements, and track user journeys across multiple
                    websites.
                  </p>
                </div>
              )}
            </div>

            {/* Policy Changes */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("policy-changes")}
              >
                <span>Changes to this Cookies Policy</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "policy-changes" ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {openSection === "policy-changes" && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700 mb-3">
                    We may update this Cookies Policy from time to time to
                    reflect changes in technology, regulation, or our business
                    practices. Any changes will be posted on this page, and if
                    the changes are significant, we will provide a more
                    prominent notice.
                  </p>
                  <p className="text-gray-700">
                    We encourage you to check this page periodically to stay
                    informed about our use of cookies. Your continued use of our
                    website after any changes to this Cookies Policy will
                    constitute your acceptance of such changes.
                  </p>
                </div>
              )}
            </div>

            {/* Contact Us */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("contact-us")}
              >
                <span>Contact Us</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "contact-us" ? "rotate-180" : ""
                  }`}
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </button>
              {openSection === "contact-us" && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700 mb-3">
                    If you have any questions about our Cookies Policy or our
                    use of cookies, please contact us at:
                  </p>
                  <div className="pl-4">
                    <p className="text-gray-700 mb-1">
                      <strong>Chery Bangladesh</strong>
                    </p>
                    <p className="text-gray-700 mb-1">
                      206/1-207/1 Bir Uttam Mir
                    </p>
                    <p className="text-gray-700 mb-1">
                      Shawkat Sarak Tejgaon Gulshan Link Road, Dhaka
                    </p>
                    <p className="text-gray-700 mb-1">
                      Email: info@cherybd.com
                    </p>
                    <p className="text-gray-700">Phone: 09639119977</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Call to action */}
          <div className="mt-12 bg-[#f8f8f8] p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-medium text-gray-800 mb-3">
              Manage Your Cookie Preferences
            </h3>
            <p className="text-gray-700 mb-4">
              You can adjust your cookie preferences at any time by clicking the
              button below.
            </p>
            <CookieSettingsButton className="bg-[#d7b997] hover:bg-[#c9aa87] text-gray-800 font-medium py-2 px-6">
            Cookie Settings
            </CookieSettingsButton>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CookiesPolicy;
