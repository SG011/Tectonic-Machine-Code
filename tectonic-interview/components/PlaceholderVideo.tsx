"use client";

import React from 'react';

interface PlaceholderVideoProps {
  width: number;
  height: number;
  text?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  onEnded?: () => void;
}

const PlaceholderVideo: React.FC<PlaceholderVideoProps> = ({ 
  width, 
  height, 
  text = 'Video Placeholder', 
  className = '',
  autoPlay = false,
  muted = true,
  onEnded
}) => {
  // Generate a random background color based on the text
  const getColorFromText = (text: string) => {
    let hash = 0;
    for (let i = 0; i < text.length; i++) {
      hash = text.charCodeAt(i) + ((hash << 5) - hash);
    }
    
    const hue = hash % 360;
    return `hsl(${hue}, 70%, 60%)`;
  };

  const bgColor = getColorFromText(text);
  
  return (
    <div 
      className={`flex flex-col items-center justify-center ${className}`}
      style={{ 
        width: `${width}px`, 
        height: `${height}px`, 
        backgroundColor: bgColor,
        color: '#fff',
        fontSize: '14px',
        fontWeight: 'bold',
        overflow: 'hidden',
        position: 'relative'
      }}
    >
      <div className="text-center p-2">
        {text}
      </div>
      <div className="mt-2 flex items-center justify-center">
        <div className="w-12 h-12 rounded-full bg-white/30 flex items-center justify-center">
          <div className="w-0 h-0 border-t-8 border-t-transparent border-l-16 border-l-white border-b-8 border-b-transparent ml-1"></div>
        </div>
      </div>
      {/* Hidden video element to simulate video behavior */}
      <video 
        className="hidden"
        width={width}
        height={height}
        autoPlay={autoPlay}
        muted={muted}
        onEnded={onEnded}
        loop={!onEnded}
      >
        <source src="data:video/mp4;base64,AAAAIGZ0eXBpc29tAAACAGlzb21pc28yYXZjMW1wNDEAAAAIZnJlZQAAA7RtZGF0AAACrQYF//+p3EXpvebZSLeWLNgg2SPu73gyNjQgLSBjb3JlIDE1MiByMjg1NCBlOWE1OTAzIC0gSC4yNjQvTVBFRy00IEFWQyBjb2RlYyAtIENvcHlsZWZ0IDIwMDMtMjAxNyAtIGh0dHA6Ly93d3cudmlkZW9sYW4ub3JnL3gyNjQuaHRtbCAtIG9wdGlvbnM6IGNhYmFjPTEgcmVmPTMgZGVibG9jaz0xOjA6MCBhbmFseXNlPTB4MzoweDExMyBtZT1oZXggc3VibWU9NyBwc3k9MSBwc3lfcmQ9MS4wMDowLjAwIG1peGVkX3JlZj0xIG1lX3JhbmdlPTE2IGNocm9tYV9tZT0xIHRyZWxsaXM9MSA4eDhkY3Q9MSBjcW09MCBkZWFkem9uZT0yMSwxMSBmYXN0X3Bza2lwPTEgY2hyb21hX3FwX29mZnNldD0tMiB0aHJlYWRzPTMgbG9va2FoZWFkX3RocmVhZHM9MSBzbGljZWRfdGhyZWFkcz0wIG5yPTAgZGVjaW1hdGU9MSBpbnRlcmxhY2VkPTAgYmx1cmF5X2NvbXBhdD0wIGNvbnN0cmFpbmVkX2ludHJhPTAgYmZyYW1lcz0zIGJfcHlyYW1pZD0yIGJfYWRhcHQ9MSBiX2JpYXM9MCBkaXJlY3Q9MSB3ZWlnaHRiPTEgb3Blbl9nb3A9MCB3ZWlnaHRwPTIga2V5aW50PTI1MCBrZXlpbnRfbWluPTEgc2NlbmVjdXQ9NDAgaW50cmFfcmVmcmVzaD0wIHJjX2xvb2thaGVhZD00MCByYz1jcmYgbWJ0cmVlPTEgY3JmPTIzLjAgcWNvbXA9MC42MCBxcG1pbj0wIHFwbWF4PTY5IHFwc3RlcD00IGlwX3JhdGlvPTEuNDAgYXE9MToxLjAwAIAAAAAwZYiEAD//8m+P5OXfBeLGOfKE3xQN0L4QGgSgCAD0I+YmgAAbGGAABqxgAAMAAA+A/4AFGj4AA+gAAAMAAAMAAJeYABM=" type="video/mp4" />
      </video>
    </div>
  );
};

export default PlaceholderVideo;
