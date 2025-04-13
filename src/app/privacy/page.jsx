"use client";

import Link from "next/link";
import { useState } from "react";

const PrivacyPolicy = () => {
  // State for accordion functionality
  const [openSection, setOpenSection] = useState("information-we-collect");

  const toggleSection = (sectionId) => {
    setOpenSection(openSection === sectionId ? null : sectionId);
  };

  return (
    <div className="bg-white min-h-screen">
      {/* Hero section */}
      <div className="bg-[#f5f5f5] py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 mb-4">
            Privacy Policy
          </h1>
          <p className="text-lg text-gray-600 max-w-3xl">
            At Chery Bangladesh, we are committed to protecting your privacy and
            ensuring the security of your personal information.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <p className="text-gray-700 mb-4">Last updated: April 13, 2025</p>
            <p className="text-gray-700 mb-4">
              This Privacy Policy describes how Chery Automobiles Bangladesh
              ("we", "us", "our") collects, uses, and discloses your personal
              information when you visit our website at{" "}
              <Link href="/" className="text-primary-600 hover:underline">
                www.cherybangladesh.com
              </Link>
              , use our services, or interact with us in any way.
            </p>
            <p className="text-gray-700 mb-4">
              We respect your privacy and are committed to protecting your
              personal data. This privacy policy will inform you about how we
              look after your personal data and tell you about your privacy
              rights and how the law protects you.
            </p>
            <p className="text-gray-700 mb-4">
              Please read this privacy policy carefully before using our
              services or submitting any personal information to us.
            </p>
          </div>

          {/* Accordion sections */}
          <div className="space-y-4">
            {/* Information We Collect */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("information-we-collect")}
              >
                <span>Information We Collect</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "information-we-collect" ? "rotate-180" : ""
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
              {openSection === "information-we-collect" && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700 mb-3">
                    We collect several types of information from and about users
                    of our website, including:
                  </p>

                  <h3 className="font-medium text-gray-800 mb-2">
                    Personal Information
                  </h3>
                  <ul className="list-disc pl-8 text-gray-700 mb-3">
                    <li className="mb-1">
                      Contact information (name, email address, phone number,
                      and postal address)
                    </li>
                    <li className="mb-1">
                      Demographic information (such as your age, gender,
                      nationality)
                    </li>
                    <li className="mb-1">
                      Identification information (national ID, passport number,
                      driver's license)
                    </li>
                    <li className="mb-1">
                      Financial information (payment details, bank account
                      information)
                    </li>
                    <li className="mb-1">
                      Vehicle information (make, model, year, VIN, registration
                      details)
                    </li>
                  </ul>

                  <h3 className="font-medium text-gray-800 mb-2">
                    Non-Personal Information
                  </h3>
                  <ul className="list-disc pl-8 text-gray-700 mb-3">
                    <li className="mb-1">
                      Technical information (IP address, browser type and
                      version, operating system)
                    </li>
                    <li className="mb-1">
                      Usage data (pages visited, time spent on pages, links
                      clicked)
                    </li>
                    <li className="mb-1">
                      Location data (country, city, GPS location if permitted)
                    </li>
                    <li className="mb-1">
                      Device information (device type, screen resolution)
                    </li>
                  </ul>

                  <p className="text-gray-700">
                    We collect this information directly from you when you
                    provide it to us, automatically as you navigate through the
                    site, and from third parties such as business partners and
                    service providers.
                  </p>
                </div>
              )}
            </div>

            {/* How We Use Your Information */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("how-we-use")}
              >
                <span>How We Use Your Information</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "how-we-use" ? "rotate-180" : ""
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
              {openSection === "how-we-use" && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700 mb-3">
                    We use the information we collect about you for various
                    purposes, including:
                  </p>

                  <ul className="list-disc pl-8 text-gray-700 mb-3">
                    <li className="mb-1">
                      To provide, maintain, and improve our products and
                      services
                    </li>
                    <li className="mb-1">
                      To process and fulfill your requests, orders, and
                      transactions
                    </li>
                    <li className="mb-1">
                      To communicate with you about products, services,
                      promotions, events, and other news
                    </li>
                    <li className="mb-1">
                      To personalize your experience and deliver content
                      relevant to your interests
                    </li>
                    <li className="mb-1">
                      To provide customer support and respond to your inquiries
                    </li>
                    <li className="mb-1">
                      To analyze and improve the security, functionality, and
                      performance of our website
                    </li>
                    <li className="mb-1">
                      To comply with legal obligations and enforce our terms and
                      policies
                    </li>
                    <li className="mb-1">
                      To detect, prevent, and address fraud, security breaches,
                      and other harmful activity
                    </li>
                  </ul>

                  <p className="text-gray-700">
                    We will only use your personal information for the purposes
                    for which we collected it, unless we reasonably consider
                    that we need to use it for another reason and that reason is
                    compatible with the original purpose.
                  </p>
                </div>
              )}
            </div>

            {/* Information Sharing and Disclosure */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("information-sharing")}
              >
                <span>Information Sharing and Disclosure</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "information-sharing" ? "rotate-180" : ""
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
              {openSection === "information-sharing" && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700 mb-3">
                    We may share your personal information with:
                  </p>

                  <h3 className="font-medium text-gray-800 mb-2">
                    Affiliated Companies
                  </h3>
                  <p className="text-gray-700 mb-3 pl-4">
                    We may share your information with our parent company,
                    subsidiaries, and affiliates for purposes consistent with
                    this Privacy Policy.
                  </p>

                  <h3 className="font-medium text-gray-800 mb-2">
                    Service Providers
                  </h3>
                  <p className="text-gray-700 mb-3 pl-4">
                    We work with third-party service providers who help us
                    operate our business, provide services on our behalf, or
                    assist us in analyzing how our services are used. These
                    providers have access to your personal information only to
                    perform specific tasks on our behalf and are obligated not
                    to disclose or use it for any other purpose.
                  </p>

                  <h3 className="font-medium text-gray-800 mb-2">
                    Business Partners
                  </h3>
                  <p className="text-gray-700 mb-3 pl-4">
                    We may share your information with our authorized dealers,
                    financial institutions, and other business partners to
                    fulfill services, provide customer support, or conduct
                    marketing and joint promotional activities.
                  </p>

                  <h3 className="font-medium text-gray-800 mb-2">
                    Legal Requirements
                  </h3>
                  <p className="text-gray-700 mb-3 pl-4">
                    We may disclose your information if required to do so by law
                    or in response to valid requests by public authorities
                    (e.g., a court or government agency).
                  </p>

                  <h3 className="font-medium text-gray-800 mb-2">
                    Business Transfers
                  </h3>
                  <p className="text-gray-700 pl-4">
                    If we are involved in a merger, acquisition, or sale of all
                    or a portion of our assets, your information may be
                    transferred as part of that transaction. We will notify you
                    via email and/or a prominent notice on our website of any
                    change in ownership or uses of your personal information.
                  </p>
                </div>
              )}
            </div>

            {/* Your Rights and Choices */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("your-rights")}
              >
                <span>Your Rights and Choices</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "your-rights" ? "rotate-180" : ""
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
              {openSection === "your-rights" && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700 mb-3">
                    Depending on your location, you may have certain rights
                    regarding your personal information, including:
                  </p>

                  <ul className="list-disc pl-8 text-gray-700 mb-3">
                    <li className="mb-1">
                      <strong>Access:</strong> You can request copies of your
                      personal information that we hold.
                    </li>
                    <li className="mb-1">
                      <strong>Correction:</strong> You can ask us to correct any
                      information you believe is inaccurate or incomplete.
                    </li>
                    <li className="mb-1">
                      <strong>Deletion:</strong> You can ask us to delete your
                      personal information in certain circumstances.
                    </li>
                    <li className="mb-1">
                      <strong>Restriction:</strong> You can ask us to restrict
                      the processing of your information in certain
                      circumstances.
                    </li>
                    <li className="mb-1">
                      <strong>Data Portability:</strong> You can ask us to
                      transfer the information you provided to us to another
                      organization or directly to you.
                    </li>
                    <li className="mb-1">
                      <strong>Objection:</strong> You can object to our
                      processing of your personal information in certain
                      circumstances.
                    </li>
                  </ul>

                  <p className="text-gray-700 mb-3">
                    To exercise any of these rights, please contact us using the
                    details provided in the "Contact Us" section below. We may
                    need to verify your identity before responding to your
                    request.
                  </p>

                  <h3 className="font-medium text-gray-800 mb-2">
                    Marketing Communications
                  </h3>
                  <p className="text-gray-700">
                    You can opt out of receiving promotional emails from us by
                    following the unsubscribe instructions included in each
                    email or by contacting us directly. Even if you opt out of
                    marketing communications, we will still send you
                    transactional messages related to your purchases, account,
                    or business relationship with us.
                  </p>
                </div>
              )}
            </div>

            {/* Data Security */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("data-security")}
              >
                <span>Data Security</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "data-security" ? "rotate-180" : ""
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
              {openSection === "data-security" && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700 mb-3">
                    We implement appropriate technical and organizational
                    measures to protect your personal information against
                    unauthorized access, accidental loss, disclosure, or
                    destruction.
                  </p>

                  <p className="text-gray-700 mb-3">
                    These security measures include:
                  </p>

                  <ul className="list-disc pl-8 text-gray-700 mb-3">
                    <li className="mb-1">
                      Encryption of sensitive information
                    </li>
                    <li className="mb-1">Secure networks and servers</li>
                    <li className="mb-1">
                      Regular security assessments and audits
                    </li>
                    <li className="mb-1">
                      Access controls and authentication procedures
                    </li>
                    <li className="mb-1">
                      Employee training on data protection
                    </li>
                  </ul>

                  <p className="text-gray-700">
                    While we strive to use commercially acceptable means to
                    protect your personal information, no method of transmission
                    over the Internet or electronic storage is 100% secure.
                    Therefore, we cannot guarantee its absolute security.
                  </p>
                </div>
              )}
            </div>

            {/* International Data Transfers */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("international-transfers")}
              >
                <span>International Data Transfers</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "international-transfers"
                      ? "rotate-180"
                      : ""
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
              {openSection === "international-transfers" && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700 mb-3">
                    Your personal information may be transferred to and
                    processed in countries other than the country in which you
                    reside. These countries may have data protection laws that
                    are different from the laws of your country.
                  </p>

                  <p className="text-gray-700 mb-3">
                    Specifically, our website servers and some of our service
                    providers are located in various countries around the world,
                    including China and other countries where Chery Automobiles
                    operates. This means that when we collect your personal
                    information, we may process it in any of these countries.
                  </p>

                  <p className="text-gray-700">
                    We have implemented appropriate safeguards to ensure your
                    personal information remains protected in accordance with
                    this Privacy Policy when transferred internationally,
                    including using standard contractual clauses approved by
                    relevant regulatory authorities.
                  </p>
                </div>
              )}
            </div>

            {/* Children's Privacy */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("childrens-privacy")}
              >
                <span>Children's Privacy</span>
                <svg
                  className={`w-5 h-5 transform transition-transform ${
                    openSection === "childrens-privacy" ? "rotate-180" : ""
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
              {openSection === "childrens-privacy" && (
                <div className="p-4 bg-white">
                  <p className="text-gray-700 mb-3">
                    Our services are not directed to individuals under the age
                    of 18. We do not knowingly collect personal information from
                    children under 18. If we become aware that a child under 18
                    has provided us with personal information, we will take
                    steps to delete such information.
                  </p>

                  <p className="text-gray-700">
                    If you are a parent or guardian and you are aware that your
                    child has provided us with personal information, please
                    contact us so that we can take necessary actions.
                  </p>
                </div>
              )}
            </div>

            {/* Changes to This Privacy Policy */}
            <div className="border border-gray-200 rounded-md overflow-hidden">
              <button
                className="w-full flex justify-between items-center p-4 bg-[#f8f8f8] text-left font-medium text-gray-800"
                onClick={() => toggleSection("policy-changes")}
              >
                <span>Changes to This Privacy Policy</span>
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
                    We may update our Privacy Policy from time to time to
                    reflect changes in our practices, technology, legal
                    requirements, and other factors. When we make changes, we
                    will update the "Last updated" date at the top of this
                    Privacy Policy.
                  </p>

                  <p className="text-gray-700 mb-3">
                    We will notify you of any material changes by posting the
                    new Privacy Policy on this page and, where appropriate,
                    sending you a notification via email or displaying a
                    prominent notice on our website.
                  </p>

                  <p className="text-gray-700">
                    We encourage you to review our Privacy Policy periodically
                    to stay informed about our data practices and your choices.
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
                    If you have any questions, concerns, or requests regarding
                    this Privacy Policy or our data practices, please contact us
                    at:
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

          {/* Privacy rights request form */}
          <div className="mt-12 bg-[#f8f8f8] p-6 rounded-lg border border-gray-200">
            <h3 className="text-xl font-medium text-gray-800 mb-3">
              Exercise Your Privacy Rights
            </h3>
            <p className="text-gray-700 mb-4">
              If you would like to exercise any of your privacy rights (access,
              correction, deletion, etc.), please fill out our privacy request
              form or contact us directly.
            </p>
            <Link href="/contact"
              className="bg-[#d7b997] hover:bg-[#c9aa87] text-gray-800 font-medium py-3 px-6"
            >
             Contact Us
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
