"use client";

import React from 'react';
import { Product } from '@/types';
import PlaceholderImage from './PlaceholderImage';
import Link from 'next/link';
import { CloseIcon } from './Icons';

interface ProductCardProps {
  product: Product;
  onClose?: () => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onClose }) => {
  return (
    <div className="w-60 bg-white rounded-lg shadow-lg overflow-hidden border border-gray-200">
      {/* Close button if onClose is provided */}
      {onClose && (
        <button 
          className="absolute top-1 right-1 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center"
          onClick={onClose}
          aria-label="Close product card"
        >
          <CloseIcon className="w-4 h-4" />
        </button>
      )}
      
      {/* Product image */}
      <div className="w-full h-40 relative">
        <PlaceholderImage 
          width={240} 
          height={160} 
          text={product.name} 
          className="w-full h-full object-cover"
          imageSrc={product.imageUrl}
        />
      </div>
      
      {/* Product details */}
      <div className="p-3">
        <h3 className="font-bold text-sm mb-1 truncate">{product.name}</h3>
        <p className="text-gray-600 text-xs mb-2 line-clamp-2 h-8">{product.description}</p>
        <div className="flex justify-between items-center">
          <span className="font-bold text-sm">${product.price.toFixed(2)}</span>
          <Link 
            href={`/product/${product.id}`}
            className="bg-black text-white text-xs py-1 px-3 rounded-full hover:bg-gray-800 transition-colors"
          >
            Shop
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
