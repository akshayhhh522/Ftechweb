import React from "react";

interface HeroSectionProps {
  title: string;
  subtitle: string;
  ctaText: string;
  onCtaClick?: () => void;
  children?: React.ReactNode;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  title,
  subtitle,
  ctaText,
  onCtaClick,
  children,
}) => {
  return (
    <section className="bg-lightCyan flex flex-col items-center justify-center min-h-[60vh] py-16 px-4 text-center">
      <h1 className="text-4xl md:text-6xl font-bold text-[#0A2E4D] mb-6">
        {title}
      </h1>
      <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
        {subtitle}
      </p>
      <button
        className="bg-[#0F66DD] text-white font-semibold text-sm md:text-base px-6 py-3 rounded shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 transition mb-4"
        onClick={onCtaClick}
      >
        {ctaText}
      </button>
      {children}
    </section>
  );
};

export default HeroSection;
