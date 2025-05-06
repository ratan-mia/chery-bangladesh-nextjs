'use client';

import BrochureDownloadModal from '@/components/BrochureDownloadModal';

import { useModal } from '../contexts/ModalContext';

function BrochureModalWrapper() {
    const { brochureModalOpen, selectedModel, closeBrochureModal } = useModal();
    
    return (
      <BrochureDownloadModal 
        isOpen={brochureModalOpen} 
        onClose={closeBrochureModal} 
        defaultModel={selectedModel} 
      />
    );
  }

  export default BrochureModalWrapper;