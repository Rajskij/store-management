'use client';

import Link from 'next/link';

export default function Canceled() {
  return (
    <div className="min-h-screen bg-gradient-to-br flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Canceled</h1>
        
        <div className="mb-6">
          <div className="inline-flex">
            <div className="bg-red-500 text-white px-4 py-2 rounded-lg font-semibold">
              Transaction was canceled
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8">
          Your payment was not completed. No charges have been made to your account.
        </p>
        
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48">
            <img 
              src="https://media.giphy.com/media/l3q2K5jinAlChoCLS/giphy.gif" 
              alt="Canceled animation" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/"
            className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
          >
            Go Home
          </Link>
          <Link 
            href="/payment"
            className="flex-1 border border-secondary text-secondary hover:bg-purple-50 font-medium py-3 px-4 rounded-lg transition-colors text-center"
          >
            Back to Payment
          </Link>
        </div>
      </div>
    </div>
  );
}
