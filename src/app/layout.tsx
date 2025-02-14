import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar/navbar";
import { GlobalChat } from "@/components/GlobalChat";
import { AuthProvider } from '@/lib/auth-context';
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Quantmai",
  description: "Welcome to Quantmai, AI-powered platform revolutionizing the future of crowdfunding and fundraising",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
     

        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
           <AuthProvider>
          <Navbar />
          {children}
          <GlobalChat />
        
          <footer className="flex items-center border-t border-gray-200 bg-gray-800  fixed bottom-0  z-50 w-full">
            <div className="container  px-4">
              <div className="flex flex-col lg:flex-row items-center justify-between">
                <div className="text-center lg:text-left mb-4 lg:mb-0">
                  <div className="text-sm text-gray-400">
                    <a
                      href="#"
                      className="hover:text-gray-300 transition-colors duration-200"
                      data-bs-toggle="modal"
                      data-bs-target="#fwVersionInfo"
                    >
                      <i className="bi bi-exclamation-circle mr-1"></i>
                    </a>
                    <span className="mr-1">Powered By</span>
                    <a
                      href="http://keross.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover:text-gray-300 transition-colors duration-200"
                    >
                      <svg
                        id="ikonBottomLogo"
                        className="inline-block h-2.5 w-auto fill-current text-white"
                        viewBox="0 0 112 17"
                      >
                        {/* SVG paths here */}
                      </svg>
                    </a>
                    <span className="mx-2">|</span>
                    <span id="txtCopyrightYear" className="text-gray-400">
                      2025
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
          </AuthProvider>
          </body>

      
    </html>
  );
}
