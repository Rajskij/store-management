import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-[90vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white/10 backdrop-blur-md rounded-2xl shadow-xl border border-white/20">
        <div className="p-8 text-center">
          <div className="mb-6">
            <div className="w-32 h-32 mx-auto relative">
              <div className="absolute inset-0 bg-white/20 rounded-full animate-pulse"></div>
              <svg 
                className="w-full h-full relative z-10" 
                viewBox="0 0 100 100" 
                fill="none" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M50 10V50M50 90H50.1M90 50H50" stroke="currentColor" strokeWidth="8" strokeLinecap="round"/>
                <circle cx="50" cy="50" r="45" stroke="currentColor" strokeWidth="4" strokeDasharray="280" strokeDashoffset="140" className="animate-dash"/>
              </svg>
            </div>
          </div>
          
          <h1 className="text-6xl font-bold mb-2">404</h1>
          <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
          <p className="mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          
          <Link 
            href="/"
            className="inline-flex items-center px-6 py-3 text-indigo-900 rounded-lg bg-indigo-100 hover:bg-indigo-200"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
