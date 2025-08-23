import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

import Navbar from './components/Navbar';
import { SocketProvider } from "./context/SocketProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: 'Store Management App',
  description: 'Manage stores, orders and payments',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <Navbar />
        <div className="container mx-auto">
          <SocketProvider>
            {children}
          </SocketProvider>
        </div>
      </body>
    </html>
  );
}
