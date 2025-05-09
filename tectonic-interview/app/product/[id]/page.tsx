import React from 'react';
import { getProductById } from '@/data/mockData';
import PlaceholderImage from '@/components/PlaceholderImage';
import Link from 'next/link';

type Props = {
  params: Promise<{
    id: string;
  }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export default async function ProductPage({ params }: Props) {
  const resolvedParams = await params;
  const product = getProductById(resolvedParams.id);

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
        <p className="mb-6">The product you&apos;re looking for doesn&apos;t exist.</p>
        <Link 
          href="/"
          className="bg-black text-white px-4 py-2 rounded-full hover:bg-gray-800 transition-colors"
        >
          Back to Lookbook
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-black text-white p-4 flex items-center">
        <Link 
          href="/"
          className="mr-4"
          aria-label="Back to Lookbook"
        >
          ←
        </Link>
        <h1 className="text-xl font-bold">Product Details</h1>
      </header>

      <div className="max-w-4xl mx-auto p-4 md:p-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product image */}
          <div className="w-full md:w-1/2">
          <PlaceholderImage 
            width={500} 
            height={600} 
            text={product.name} 
            className="w-full h-auto rounded-lg shadow-md"
            imageSrc={product.imageUrl}
          />
          </div>

          {/* Product details */}
          <div className="w-full md:w-1/2">
            <h2 className="text-2xl font-bold mb-2">{product.name}</h2>
            <p className="text-xl font-bold mb-4">${product.price.toFixed(2)}</p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            
            {/* Add to cart button */}
            <button className="w-full bg-black text-white py-3 px-6 rounded-full hover:bg-gray-800 transition-colors mb-4">
              Add to Cart
            </button>
            
            {/* Additional product details */}
            <div className="border-t border-gray-200 pt-6 mt-6">
              <h3 className="font-bold mb-2">Product Details</h3>
              <ul className="list-disc pl-5 text-gray-700">
                <li className="mb-1">High-quality materials</li>
                <li className="mb-1">Ethically manufactured</li>
                <li className="mb-1">Free shipping on orders over $50</li>
                <li className="mb-1">30-day return policy</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}