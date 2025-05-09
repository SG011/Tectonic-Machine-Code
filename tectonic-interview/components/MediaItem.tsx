
"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Media, Product } from '@/types';
import PlaceholderImage from './PlaceholderImage';
import PlaceholderVideo from './PlaceholderVideo';
import Annotation from './Annotation';
import { getProductById } from '@/data/mockData';
import { VolumeOffIcon, VolumeUpIcon } from './Icons';

interface MediaItemProps {
  media: Media;
  onComplete?: () => void;
  autoPlay?: boolean;
}

const MediaItem: React.FC<MediaItemProps> = ({ 
  media, 
  onComplete,
  autoPlay = false
}) => {
  const [containerWidth, setContainerWidth] = useState(0);
  const [containerHeight, setContainerHeight] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Set up container dimensions for annotation positioning
  useEffect(() => {
    if (containerRef.current) {
      setContainerWidth(containerRef.current.offsetWidth);
      setContainerHeight(containerRef.current.offsetHeight);
    }

    const handleResize = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.offsetWidth);
        setContainerHeight(containerRef.current.offsetHeight);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Handle progress bar for images (5 second timer)
  useEffect(() => {
    if (media.type === 'image' && autoPlay) {
      // Reset progress
      setProgress(0);
      
      // Clear any existing timer
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
      
      // Set up progress timer (update every 50ms)
      const duration = 5000; // 5 seconds
      const interval = 50; // 50ms
      const steps = duration / interval;
      let currentStep = 0;
      
      timerRef.current = setInterval(() => {
        currentStep++;
        const newProgress = (currentStep / steps) * 100;
        setProgress(newProgress);
        
        if (newProgress >= 100) {
          if (timerRef.current) clearInterval(timerRef.current);
          if (onComplete) onComplete();
        }
      }, interval);
      
      return () => {
        if (timerRef.current) clearInterval(timerRef.current);
      };
    }
  }, [media, autoPlay, onComplete]);

  // Handle video events
  const handleVideoEnded = () => {
    if (onComplete) onComplete();
  };

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted;
      setIsMuted(!isMuted);
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-full"
    >
      {/* Media content */}
      {media.type === 'image' ? (
        <PlaceholderImage 
          width={containerWidth || 300} 
          height={containerHeight || 400} 
          text={`Look Image ${media.id}`} 
          className="w-full h-full object-cover"
          imageSrc={media.src}
        />
      ) : (
        <div className="relative w-full h-full">
          <PlaceholderVideo 
            width={containerWidth || 300} 
            height={containerHeight || 400} 
            text={`Look Video ${media.id}`} 
            className="w-full h-full object-cover"
            autoPlay={autoPlay}
            muted={isMuted}
            onEnded={handleVideoEnded}
          />
          
          {/* Mute/unmute button for videos */}
          <button 
            className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-black/50 text-white flex items-center justify-center z-10"
            onClick={toggleMute}
            aria-label={isMuted ? "Unmute video" : "Mute video"}
          >
            {isMuted ? (
              <VolumeOffIcon />
            ) : (
              <VolumeUpIcon />
            )}
          </button>
        </div>
      )}

      {/* Progress bar for images */}
      {media.type === 'image' && autoPlay && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-300">
          <div 
            className="h-full bg-black transition-all duration-50 ease-linear" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
      )}

      {/* Annotations */}
      {media.annotations.map(annotation => {
        const product = getProductById(annotation.productId);
        if (!product) return null;
        
        return (
          <Annotation 
            key={annotation.id}
            annotation={annotation}
            product={product}
            containerWidth={containerWidth}
            containerHeight={containerHeight}
          />
        );
      })}
    </div>
  );
};

export default MediaItem;
