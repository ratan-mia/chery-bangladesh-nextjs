'use client';

import { createContext, useContext, useState } from 'react';

const ModalContext = createContext();

export function ModalProvider({ children }) {
  const [brochureModalOpen, setBrochureModalOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState(null);

  const openBrochureModal = (model = null) => {
    setSelectedModel(model);
    setBrochureModalOpen(true);
  };

  const closeBrochureModal = () => {
    setBrochureModalOpen(false);
  };

  return (
    <ModalContext.Provider value={{
      brochureModalOpen,
      selectedModel,
      openBrochureModal,
      closeBrochureModal
    }}>
      {children}
    </ModalContext.Provider>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (context === undefined) {
    throw new Error('useModal must be used within a ModalProvider');
  }
  return context;
}