import type React from "react";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import TrustpilotRating from "@/components/trustpilot-rating";
import Link from "next/link";
import Image from "next/image";
import MobileMenu from "@/components/mobile-menu";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
          disableTransitionOnChange
        >
          <div className="sticky top-0 z-50">
            {/* Top bar - Use theme colors */}
            <div className="bg-primary text-primary-foreground py-2">
              <div className="container mx-auto px-4 flex justify-between items-center">
                <div className="flex-1"></div>
                <div className="flex-1 flex justify-end"></div>
              </div>
            </div>

            {/* Header */}
            <header className="bg-background py-4 border-b">
              <div className="container mx-auto px-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <Image src="/logo.png" alt="Creditfix" width={150} height={40} className="h-8 md:h-10 w-auto" />
                  </div>
                  <nav className="hidden md:flex flex-wrap justify-center gap-4 md:gap-8">
                    <Link href="#" className="text-foreground hover:text-primary font-medium">
                      Help with Debt
                    </Link>
                    <Link href="#" className="text-foreground hover:text-primary font-medium">
                      About Us
                    </Link>
                    <Link href="#" className="text-foreground hover:text-primary font-medium">
                      Customer Stories
                    </Link>
                    <Link href="#" className="text-foreground hover:text-primary font-medium">
                      Tips & Advice
                    </Link>
                    <Link href="#" className="text-foreground hover:text-primary font-medium">
                      Contact Us
                    </Link>
                  </nav>
                  <div className="hidden md:block">
                    <div className="p-2 rounded-md text-center">
                      <div className="text-xl lg:text-2xl font-bold text-foreground">25K</div>
                      <div className="text-xs text-muted-foreground">Reviews</div>
                      <div className="flex justify-center mt-1">
                        <TrustpilotRating small />
                      </div>
                    </div>
                  </div>
                  <div className="md:hidden">
                    <MobileMenu />
                  </div>
                </div>
              </div>
            </header>
          </div>

          {/* Everything else scrollable */}
          <div className="overflow-y-auto">
            {children}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
