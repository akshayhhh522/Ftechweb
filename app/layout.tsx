import type React from "react";
import { Inter, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TrustpilotRating from "@/components/trustpilot-rating";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "@/components/mobile-menu";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react"; // Changed from Phone to MessageCircle for WhatsApp

// Initialize fonts
const inter = Inter({ subsets: ["latin"], variable: '--font-inter' });
const openSans = Open_Sans({ subsets: ["latin"], variable: '--font-open-sans' });
const poppins = Poppins({ subsets: ["latin"], weight: ['400', '600', '700'], variable: '--font-poppins' });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head />
      <body
        className={cn(
          "min-h-screen bg-[#f5f6fa] font-sans antialiased",
          openSans.variable
        )}
      >
        {/* Skip to main content link for accessibility */}
        <a href="#main-content" className="sr-only focus:not-sr-only absolute left-2 top-2 z-50 bg-heroButtonPrimary text-white px-4 py-2 rounded focus:outline-none focus:ring-2 focus:ring-primary">
          Skip to main content
        </a>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          {/* Header */}
          <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200 px-6 md:px-12 py-4" role="banner">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
              <div className="flex items-center gap-2">
                {/* Placeholder SVG Logo */}
                <svg
                  className="h-8 w-auto"
                  viewBox="0 0 100 40"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor" // Or a specific color like #10B981 (emerald-600)
                >
                  <rect width="100" height="40" rx="8" fill="#374151" /> {/* bg-gray-700 */}
                  <text x="50%" y="50%" dominantBaseline="middle" textAnchor="middle" fontSize="16" fill="white" fontWeight="bold">
                    LOGO
                  </text>
                  <title>Finovate</title>
                </svg>
              </div>
              <nav
                className="hidden md:flex gap-8 text-sm md:text-base font-medium text-gray-800"
                aria-label="Main navigation"
              >
                <Link
                  href="/#hero-main"
                  className="hover:text-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  Help with Debt
                </Link>
                <Link
                  href="/#about-us"
                  className="hover:text-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  About Us
                </Link>
                <Link
                  href="/#customer-stories"
                  className="hover:text-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  Customer Stories
                </Link>
                <Link
                  href="/#faq-section"
                  className="hover:text-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                >
                  Tips & Advice
                </Link>
                <Link
                  href="https://wa.me/916362966603?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
                  className="flex items-center hover:text-emerald-700 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500 rounded"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle className="mr-2 h-4 w-4" /> Contact Us
                </Link>
              </nav>
              <div className="hidden md:flex items-center gap-6">
                <div className="text-right">
                  <div className="font-bold text-gray-800">25K Reviews</div>
                  <a href="#" className="text-emerald-600 underline text-sm hover:text-emerald-800 transition-colors">
                    View on Trustpilot
                  </a>
                  <div className="flex justify-end mt-1">
                    {/* Star Icons - Placeholder SVGs. Replace with actual Heroicons or your preferred SVG icons */}
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 text-green-500 fill-current" viewBox="0 0 20 20">
                        <path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <button className="bg-emerald-700 text-white px-4 py-2 rounded-full hover:bg-emerald-800 shadow-md transition-colors text-sm font-medium">
                  Get Started
                </button>
              </div>
              <div className="md:hidden">
                <MobileMenu aria-label="Open navigation menu" />
              </div>
            </div>
          </header>
          {/* Everything else scrollable */}
          <div className="overflow-y-auto">
            <main
              id="main-content"
              tabIndex={-1} // Make it focusable for the skip link
              className="outline-none focus:ring-2 focus:ring-primary pt-0" // Added pt-0 to ensure hero section can control its own top padding
            >
              {children}
            </main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
