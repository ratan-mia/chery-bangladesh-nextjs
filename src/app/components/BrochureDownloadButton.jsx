// components/BrochureDownloadButton.js
"use client";

import { useState } from 'react';
import BrochureDownloadModal from './BrochureDownloadModal';

const BrochureDownloadButton = ({ 
  brochureUrl, 
  brochureName, 
  buttonText = "Download Brochure",
  buttonClassName = "inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleButtonClick = (e) => {
    e.preventDefault();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button
        onClick={handleButtonClick}
        className={buttonClassName}
      >
        {buttonText}
      </button>

      <BrochureDownloadModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        brochureUrl={brochureUrl}
        brochureName={brochureName}
      />
    </>
  );
};

export default BrochureDownloadButton;