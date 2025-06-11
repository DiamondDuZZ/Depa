import React, { useState } from 'react';
import Registain from '../components/Careerpath/registain'; // นำเข้า Component Registain

export default function MainMenu() {
  const [showPopup, setShowPopup] = useState(false); // สร้าง state สำหรับควบคุม popup

  const handleOpenPopup = () => {
    setShowPopup(true); // เปิด popup
  };

  const handleClosePopup = () => {
    setShowPopup(false); // ปิด popup
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-blue-600 text-white py-4">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold">My Tailwind React App</h1>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-4xl font-bold mb-4">Welcome to My App</h2>
          <p className="text-lg text-gray-700 mb-8">24</p>
          <button
            onClick={handleOpenPopup}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            Get Started
          </button>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-800 text-gray-300 py-4">
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} My App. All rights reserved.</p>
        </div>
      </footer>

      {/* Popup */}
      <Registain isOpen={showPopup} onClose={handleClosePopup} />
    </div>
  );
}
