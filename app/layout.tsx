import type React from "react";
import { Inter, Open_Sans, Poppins } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Link from "next/link";
import MobileMenu from "@/components/mobile-menu";
import { cn } from "@/lib/utils";
import { MessageCircle } from "lucide-react"; // Changed from Phone to MessageCircle for WhatsApp
import Logo from "@/components/ui/Logo"; // Import the new Logo component
import Image from "next/image"; // Import the Image component

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
                <Link href="/">
                  <Logo className="h-12 w-auto" /> {/* Use the new Logo component */}
                </Link>
              </div>
              <nav
                className="hidden md:flex items-center gap-8 text-sm md:text-base font-medium text-gray-800"
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
                <button className="bg-emerald-700 text-white px-4 py-5 rounded-full hover:bg-emerald-800 shadow-md transition-colors text-sm font-medium">
                  <a href="#debt-form">Get Started</a>
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
          {/* Floating WhatsApp Icon */}
          <Link
            href="https://wa.me/916362966603?text=Hello!%20I%20would%20like%20to%20know%20more%20about%20your%20services."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 shadow-lg hover:opacity-80 transition-opacity focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            aria-label="Chat on WhatsApp"
          >
            <Image
              src="/whatsapp-icon-png.png"
              alt="WhatsApp Icon"
              width={56}
              height={56}
              className="h-14 w-14"
            />
          </Link>
        </ThemeProvider>
      </body>
    </html>
  );
}
