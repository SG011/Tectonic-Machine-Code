"use client";

import React from 'react';
import { Media } from '@/types';
import PlaceholderImage from './PlaceholderImage';
import PlaceholderVideo from './PlaceholderVideo';

interface MediaPreviewProps {
  media: Media;
  isActive: boolean;
  onClick: () => void;
}

const MediaPreview: React.FC<MediaPreviewProps> = ({ 
  media, 
  isActive,
  onClick 
}) => {
  return (
    <button 
      className={`relative w-16 h-16 flex-shrink-0 overflow-hidden rounded ${isActive ? 'ring-2 ring-black' : 'opacity-70'}`}
      onClick={onClick}
      aria-label={`Preview ${media.type} ${media.id}`}
      aria-pressed={isActive}
    >
      {media.type === 'image' ? (
        <PlaceholderImage 
          width={64} 
          height={64} 
          text="" 
          className="w-full h-full object-cover"
          imageSrc={media.src}
        />
      ) : (
        <div className="relative w-full h-full">
          <PlaceholderVideo 
            width={64} 
            height={64} 
            text="" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-6 h-6 rounded-full bg-black/30 flex items-center justify-center">
              <div className="w-0 h-0 border-t-4 border-t-transparent border-l-6 border-l-white border-b-4 border-b-transparent ml-0.5"></div>
            </div>
          </div>
        </div>
      )}
      
      {/* Type indicator */}
      <div className="absolute bottom-0 right-0 bg-black text-white text-[8px] px-1">
        {media.type === 'image' ? 'IMG' : 'VID'}
      </div>
    </button>
  );
};

export default MediaPreview;
