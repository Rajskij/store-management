import { Rubik } from 'next/font/google'
import "./globals.css";

import Navbar from './components/Navbar';
import { SocketProvider } from "./context/SocketProvider";

const rubik = Rubik({ 
  subsets: ['latin'],
  weight: ['300', '700']
})

export const metadata = {
  title: 'Store Management App',
  description: 'Manage stores, orders and payments',
  icons: {
    icon: '/favicon.png'
  }
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body className={rubik.className}
        // className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="container mx-auto md:px-0 px-4">
          <SocketProvider>
            {children}
          </SocketProvider>
        </div>
      </body>
    </html>
  );
}
