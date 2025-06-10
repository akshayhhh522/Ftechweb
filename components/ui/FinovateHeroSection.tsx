import React from 'react';
import { Button } from "@/components/ui/button";
import Image from 'next/image';

const FinovateHeroSection = () => {
  return (
    <section className="relative bg-gradient-to-br from-heroBeigeFrom via-heroBeigeVia to-heroBeigeTo overflow-hidden">
      {/* Optional: Subtle background SVG/blur element */}
      <div className="absolute inset-0 opacity-10">
        {/* Example: A simple blurred circle. Replace with your desired SVG or element */}
        {/* You might need to adjust positioning and size */}
        <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 bg-heroAccent rounded-full filter blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-20 md:py-32 relative z-10"> {/* Increased padding */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center"> {/* Increased gap */}
          {/* Text Content */}
          <div className="space-y-8 text-center md:text-left"> {/* Increased space-y */}
            <h1 className="text-4xl md:text-5xl font-semibold text-heroHeadline">
              Unlock Your <span className="text-heroAccent">Financial</span> Freedom Today
            </h1>
            <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto md:mx-0">
              Discover personalized solutions and expert advice to help you navigate your financial journey with confidence. Take control of your future.
            </p>
            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
              <Button asChild className="bg-heroButtonPrimary text-white rounded-full px-6 py-3 shadow hover:bg-heroButtonPrimaryHover transition hover:scale-105">
                <a href="#debt-form">Get Started Now</a>
              </Button>
              <Button
                variant="outline" // Assuming your Button component can take a variant or you style directly
                className="bg-white border border-heroButtonSecondaryBorder text-heroButtonSecondaryText rounded-full px-6 py-3 shadow hover:bg-heroButtonSecondaryHoverBg transition hover:scale-105"
                // onClick={() => console.log("Secondary CTA clicked")} // Example action
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Image/Mockup Content */}
          <div className="flex justify-center items-center">
            {/* Replace with your actual image or mockup component */}
            <Image
              src="/final.jpg" // Replace with your desired image path
              alt="Financial Mockup" // Descriptive alt text
              loading="lazy"
              width={500}
              height={400}
              decoding="async"
              data-nimg={1}
              className="object-cover rounded-lg shadow-lg"
              style={{ color: "transparent" }}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default FinovateHeroSection;
