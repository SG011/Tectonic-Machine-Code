"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Look as LookType } from '@/types';
import Look from './Look';

interface LookbookProps {
  looks: LookType[];
}

const Lookbook: React.FC<LookbookProps> = ({ looks }) => {
  const [currentLookIndex, setCurrentLookIndex] = useState(0);
  const [touchStartY, setTouchStartY] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentLook = looks[currentLookIndex];

  const handleNextLook = () => {
    if (currentLookIndex < looks.length - 1) {
      setCurrentLookIndex(currentLookIndex + 1);
    }
  };

  const handlePreviousLook = () => {
    if (currentLookIndex > 0) {
      setCurrentLookIndex(currentLookIndex - 1);
    }
  };

  // Handle touch events for vertical swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartY(e.touches[0].clientY);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    
    const touchY = e.touches[0].clientY;
    const diff = touchStartY - touchY;
    
    // If the user has swiped more than 50px, consider it a swipe
    if (Math.abs(diff) > 50) {
      setIsSwiping(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartY === null) return;
    
    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;
    
    // If swiping and the difference is significant
    if (isSwiping) {
      if (diff > 50) {
        // Swipe up - next look
        handleNextLook();
      } else if (diff < -50) {
        // Swipe down - previous look
        handlePreviousLook();
      }
    }
    
    // Reset touch state
    setTouchStartY(null);
    setIsSwiping(false);
  };

  // Add keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowUp':
          handlePreviousLook();
          break;
        case 'ArrowDown':
          handleNextLook();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [currentLookIndex]);

  return (
    <div 
      ref={containerRef}
      className="h-full w-full overflow-hidden bg-white"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Current look */}
      <Look 
        look={currentLook} 
        onNext={handleNextLook}
        onPrevious={handlePreviousLook}
      />

      {/* Look navigation indicators */}
      <div className="absolute right-4 top-1/2 transform -translate-y-1/2 flex flex-col gap-2">
        {looks.map((look, index) => (
          <button 
            key={look.id}
            className={`w-2 h-2 rounded-full ${index === currentLookIndex ? 'bg-black' : 'bg-gray-300'}`}
            onClick={() => setCurrentLookIndex(index)}
            aria-label={`Go to look ${index + 1}`}
            aria-current={index === currentLookIndex}
          />
        ))}
      </div>

      {/* Instructions */}
      <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 text-xs text-center text-gray-500 bg-white/80 px-2 py-1 rounded-full">
        Swipe up/down to navigate between looks
      </div>
    </div>
  );
};

export default Lookbook;
