'use client';

import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import AboutModal from '../../components/AboutModal';

// Dynamically import RestaurantMap with SSR disabled
// This prevents hydration mismatches from Google Maps DOM manipulation
const RestaurantMap = dynamic(
  () => import('../../components/RestaurantMap'),
  {
    ssr: false,
    loading: () => (
      <div className="flex items-center justify-center h-screen bg-gray-50">
        <div className="text-xl text-gray-900">Loading map...</div>
      </div>
    ),
  }
);

export default function MapWrapper() {
  const [showAboutModal, setShowAboutModal] = useState(false);

  useEffect(() => {
    // Check if user has chosen to hide the modal
    const hideModal = localStorage.getItem('hideAboutModal');
    if (!hideModal) {
      setShowAboutModal(true);
    }
  }, []);

  return (
    <>
      <RestaurantMap onShowAbout={() => setShowAboutModal(true)} />
      <AboutModal
        isOpen={showAboutModal}
        onClose={() => setShowAboutModal(false)}
      />
    </>
  );
}
