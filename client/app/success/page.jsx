'use client';

import Link from 'next/link';

export default function Success() {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full text-center">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-green-200 rounded-full flex items-center justify-center">
            <svg className="w-16 h-16 text-green-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        </div>
        
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Payment Successful!</h1>
        
        <div className="mb-6">
          <div className="inline-flex">
            <div className="bg-secondary-muted text-white px-4 py-2 rounded-lg font-semibold">
              Thank you for your purchase!
            </div>
          </div>
        </div>
        
        <p className="text-gray-600 mb-8">
          Your payment has been processed successfully.
        </p>
        
        <div className="flex justify-center mb-8">
          <div className="w-48 h-48">
            <img 
              src="https://media.giphy.com/media/v1.Y2lkPWVjZjA1ZTQ3OWljNm41Ymk1aWZ2d2Y5aWRzaXh4dndrOGprdjU4bmo3aWEyNzZicCZlcD12MV9naWZzX3JlbGF0ZWQmY3Q9Zw/3a53VvGpzUgh05qq7W/giphy.gif" 
              alt="Success animation" 
              className="w-full h-full object-contain"
            />
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link 
            href="/"
            className="flex-1 bg-secondary hover:bg-secondary-muted text-white font-medium py-3 px-4 rounded-lg transition-colors text-center"
          >
            Go Home
          </Link>
          <Link 
            href="/orders"
            className="flex-1 border border-secondary text-secondary hover:bg-purple-50 font-medium py-3 px-4 rounded-lg transition-colors text-center"
          >
            View Orders
          </Link>
        </div>
      </div>
    </div>
  );
}
