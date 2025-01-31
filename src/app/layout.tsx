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
      <AuthProvider>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >

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
                        className="inline-block h-4 w-auto fill-current text-white"
                        viewBox="0 0 112 17"
                      >
                        <path
                          className="cls-1"
                          d="M3,16a4.19,4.19,0,0,1-1.8-.2A2,2,0,0,1,.1,14.7,6.7,6.7,0,0,1,0,13V1a4.19,4.19,0,0,1,1.8.2A2,2,0,0,1,2.9,2.3,6.7,6.7,0,0,1,3,4Z"
                        ></path>
                        <path
                          className="cls-2"
                          d="M5,7c1.7-1.2,9-6,9-6l.6.7A2.2,2.2,0,0,1,15,3c0,1.2-1.4,2-3,3S7.5,9,7.5,9l8,5.5a3.07,3.07,0,0,1-2.41,1.68A3.86,3.86,0,0,1,11,15.23C9.8,14.3,6.22,11.69,5.3,11S4,9.9,4,9A2.12,2.12,0,0,1,5,7Z"
                        ></path>
                        <path
                          className="cls-1"
                          d="M35,1a4.19,4.19,0,0,1-.2,1.8,2,2,0,0,1-1.1,1.1A6.7,6.7,0,0,1,32,4H20a4.19,4.19,0,0,1,.2-1.8,2,2,0,0,1,1.1-1.1A6.7,6.7,0,0,1,23,1Z"
                        ></path>
                        <path
                          className="cls-1"
                          d="M35,7a4.19,4.19,0,0,1-.2,1.8,2,2,0,0,1-1.1,1.1A6.7,6.7,0,0,1,32,10H20a4.19,4.19,0,0,1,.2-1.8,2,2,0,0,1,1.1-1.1A6.7,6.7,0,0,1,23,7Z"
                        ></path>
                        <path
                          className="cls-1"
                          d="M35,13a4.19,4.19,0,0,1-.2,1.8,2,2,0,0,1-1.1,1.1A6.7,6.7,0,0,1,32,16H20a4.19,4.19,0,0,1,.2-1.8,2,2,0,0,1,1.1-1.1A6.7,6.7,0,0,1,23,13Z"
                        ></path>
                        <path
                          className="cls-2"
                          d="M55,12c0-4-1-5-6-5H40v6a6.7,6.7,0,0,0,.1,1.7,2,2,0,0,0,1.1,1.1A4.19,4.19,0,0,0,43,16V10h7a1.75,1.75,0,0,1,2,2v2a1.75,1.75,0,0,0,2,2h2S55,15.4,55,12Z"
                        ></path>
                        <path
                          className="cls-2"
                          d="M50,4H40c0-2,.7-3,3-3h8c2.5,0,4,.6,4,3,0,1.4-1.1,2-3,2C52,4.6,51.6,4,50,4Z"
                        ></path>
                        <path
                          className="cls-2"
                          d="M82,9.26c-2.82-.53-3.2-1.84-3.2-4,0-3,2.2-4.5,7.2-4.5,3.9,0,6.6,1.4,6.6,3a2.3,2.3,0,0,1-.6,1.5,14.32,14.32,0,0,0-6.5-1.5C83,3.76,82,4,82,5.26c0,.87.23,1.2,1.4,1.6s2.6.7,2.6,2.4V10S84.82,9.8,82,9.26Z"
                        ></path>
                        <path
                          className="cls-2"
                          d="M90.1,8c2.5.6,3.1,2.1,3.1,3.8,0,3-2.2,4.5-7.2,4.5s-7.5-1-7.5-2.9A2.49,2.49,0,0,1,79,12c.9.6,4.71,1.31,7.51,1.31,2.5,0,3.5-.2,3.5-1.5,0-1-.4-1.3-1.4-1.6S87,9.61,87,8.31v-1A23.81,23.81,0,0,1,90.1,8Z"
                        ></path>
                        <path
                          className="cls-2"
                          d="M100.29,9.26c-2.82-.53-3.2-1.84-3.2-4,0-3,2.2-4.5,7.2-4.5,3.9,0,6.6,1.4,6.6,3a2.3,2.3,0,0,1-.6,1.5,14.32,14.32,0,0,0-6.5-1.5c-2.5,0-3.5.2-3.5,1.5,0,.87.23,1.2,1.4,1.6s2.6.7,2.6,2.4V10S103.1,9.8,100.29,9.26Z"
                        ></path>
                        <path
                          className="cls-2"
                          d="M108.39,8c2.5.6,3.1,2.1,3.1,3.8,0,3-2.2,4.5-7.2,4.5s-7.5-1-7.5-2.9A2.49,2.49,0,0,1,97.28,12c.9.6,4.71,1.31,7.51,1.31,2.5,0,3.5-.2,3.5-1.5,0-1-.4-1.3-1.4-1.6s-1.6-.6-1.6-1.9v-1A23.81,23.81,0,0,1,108.39,8Z"
                        ></path>
                        <path
                          className="cls-1"
                          d="M59,9c0-3.5,1.81-5,3.33-5a3.44,3.44,0,0,1,1.4.3S62,4.5,62,8s1.33,5.5,4.83,5.5,4.5,1.5,4.5,1.5a7.45,7.45,0,0,1-4.49,1.3C62,16.3,59,14.23,59,9Z"
                        ></path>
                        <path
                          className="cls-1"
                          d="M75,8.06c0,3.5-1.81,5-3.33,5a3.44,3.44,0,0,1-1.4-.3S72,12.56,72,9.06s-1.34-5.5-4.84-5.5-4.5-1.5-4.5-1.5a7.5,7.5,0,0,1,4.5-1.3C72,.76,75,2.83,75,8.06Z"
                        ></path>
                      </svg>
                    </a>
                    <span className="mx-2">|</span>
                    <span id="txtCopyrightYear" className="text-gray-400">2025</span>
                  </div>
                </div>
              </div>
            </div>
          </footer>
        </body>

      </AuthProvider>
    </html>
  );
}
