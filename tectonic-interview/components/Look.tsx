"use client";

import React, { useState, useRef } from 'react';
import { Look as LookType } from '@/types';
import MediaItem from './MediaItem';
// import MediaPreview from './MediaPreview';
import MediaPreview from './MediaPreview';
import { ArrowLeftIcon, ArrowRightIcon } from './Icons';

interface LookProps {
  look: LookType;
  onNext?: () => void;
  onPrevious?: () => void;
}

const Look: React.FC<LookProps> = ({ look, onNext, onPrevious }) => {
  const [currentMediaIndex, setCurrentMediaIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const mediaContainerRef = useRef<HTMLDivElement>(null);

  const currentMedia = look.media[currentMediaIndex];

  const handleNext = () => {
    if (currentMediaIndex < look.media.length - 1) {
      setCurrentMediaIndex(currentMediaIndex + 1);
    } else if (onNext) {
      onNext();
    }
  };

  const handlePrevious = () => {
    if (currentMediaIndex > 0) {
      setCurrentMediaIndex(currentMediaIndex - 1);
    } else if (onPrevious) {
      onPrevious();
    }
  };

  const handleMediaComplete = () => {
    if (isAutoPlaying) {
      handleNext();
    }
  };

  const handlePreviewClick = (index: number) => {
    setCurrentMediaIndex(index);
    // Pause autoplay when manually selecting media
    setIsAutoPlaying(false);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  // Handle touch events for horizontal swiping
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    
    const touchX = e.touches[0].clientX;
    const diff = touchStartX - touchX;
    
    // If the user has swiped more than 50px, consider it a swipe
    if (Math.abs(diff) > 50) {
      setIsSwiping(true);
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX === null) return;
    
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;
    
    // If swiping and the difference is significant
    if (isSwiping) {
      if (diff > 50) {
        // Swipe left - next media
        handleNext();
      } else if (diff < -50) {
        // Swipe right - previous media
        handlePrevious();
      }
    }
    
    // Reset touch state
    setTouchStartX(null);
    setIsSwiping(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Look title */}
      <div className="p-4 bg-black text-white">
        <h2 className="text-xl font-bold">{look.title}</h2>
      </div>

      {/* Main media display */}
      <div 
        ref={mediaContainerRef}
        className="relative flex-grow"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <MediaItem 
          media={currentMedia} 
          onComplete={handleMediaComplete}
          autoPlay={isAutoPlaying}
        />

        {/* Navigation buttons */}
        <button 
          className="absolute left-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center z-10"
          onClick={handlePrevious}
          aria-label="Previous media"
        >
          <ArrowLeftIcon />
        </button>
        <button 
          className="absolute right-2 top-1/2 transform -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center z-10"
          onClick={handleNext}
          aria-label="Next media"
        >
          <ArrowRightIcon />
        </button>

        {/* Swipe instruction */}
        {look.media.length > 1 && (
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-xs text-center text-white bg-black/50 px-2 py-1 rounded-full">
            Swipe left/right to navigate between media
          </div>
        )}
      </div>

      {/* Media previews */}
      <div className="p-2 bg-gray-100">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-bold">Previews</h3>
          <button 
            className={`text-xs px-2 py-1 rounded ${isAutoPlaying ? 'bg-black text-white' : 'bg-gray-300 text-black'}`}
            onClick={toggleAutoPlay}
          >
            {isAutoPlaying ? 'Auto-playing' : 'Manual'}
          </button>
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2">
          {look.media.map((media, index) => (
            <MediaPreview 
              key={media.id}
              media={media}
              isActive={index === currentMediaIndex}
              onClick={() => handlePreviewClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Look;
