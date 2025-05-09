import React from 'react';
import Lookbook from '@/components/Lookbook';
import { looks } from '@/data/mockData';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-black text-white p-4">
        <h1 className="text-xl font-bold">Fashion Lookbook</h1>
      </header>

      {/* Main content */}
      <main className="flex-grow">
        <div className="h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)]">
          <Lookbook looks={looks} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-gray-100 p-4 text-center text-sm text-gray-600">
        <p>Fashion Lookbook Demo - Swipe up/down to navigate between looks</p>
      </footer>
    </div>
  );
}
