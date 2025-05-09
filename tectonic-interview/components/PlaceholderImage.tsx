"use client";

import React from 'react';
import Image from 'next/image';

interface PlaceholderImageProps {
  width: number;
  height: number;
  text?: string;
  className?: string;
  imageSrc?: string;
}

const PlaceholderImage: React.FC<PlaceholderImageProps> = ({ 
  width, 
  height, 
  text = 'Placeholder', 
  className = '',
  imageSrc
}) => {
  // Generate a random background color based on the text
  const getColorFromText = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 80%)`;
  };

  const bgColor = getColorFromText(text);
  
  if (imageSrc) {
    return (
      <div 
        className={`relative overflow-hidden ${className}`}
        style={{ 
          width: `${width}px`, 
          height: `${height}px`,
        }}
      >
        <Image
          src={imageSrc}
          alt={text}
          fill
          className="object-cover"
          sizes={`${Math.max(width, height)}px`}
        />
      </div>
    );
  }
  
  return (
    <div 
      className={`flex items-center justify-center ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`, 
        backgroundColor: bgColor,
        color: '#333',
        fontSize: '14px',
        fontWeight: 'bold',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div className="text-center p-2">
        {text}
      </div>
    </div>
  );
};

export default PlaceholderImage;
