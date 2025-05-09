"use client";

import React, { useState } from 'react';
import { Annotation as AnnotationType, Product } from '@/types';
import ProductCard from './ProductCard';

interface AnnotationProps {
  annotation: AnnotationType;
  product: Product;
  containerWidth: number;
  containerHeight: number;
}

const Annotation: React.FC<AnnotationProps> = ({ 
  annotation, 
  product,
  containerWidth,
  containerHeight
}) => {
  const [showProductCard, setShowProductCard] = useState(false);

  const toggleProductCard = () => {
    setShowProductCard(!showProductCard);
  };

  // Calculate position based on percentages
  const positionStyle = {
    left: `${annotation.x}%`,
    top: `${annotation.y}%`,
  };

  return (
    <div 
      className="absolute"
      style={positionStyle}
    >
      {/* Annotation dot */}
      <button 
        className="w-6 h-6 rounded-full bg-white border-2 border-black flex items-center justify-center cursor-pointer shadow-md transform hover:scale-110 transition-transform z-10"
        onClick={toggleProductCard}
        aria-label={`View ${product.name} details`}
      >
        <span className="w-3 h-3 rounded-full bg-black"></span>
      </button>

      {/* Product card */}
      {showProductCard && (
        <div className="absolute z-20" style={{
          // Position the card based on where the annotation is
          // If annotation is on the right side, show card to the left
          // If annotation is on the bottom, show card above
          left: annotation.x > 50 ? '-240px' : '20px',
          top: annotation.y > 50 ? '-120px' : '20px',
        }}>
          <ProductCard 
            product={product} 
            onClose={toggleProductCard}
          />
        </div>
      )}
    </div>
  );
};

export default Annotation;
