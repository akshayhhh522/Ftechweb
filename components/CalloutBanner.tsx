import React from "react";

interface CalloutBannerProps {
  title: string;
  description: string;
  ctaText?: string;
  onCtaClick?: () => void;
}

const CalloutBanner: React.FC<CalloutBannerProps> = ({
  title,
  description,
  ctaText,
  onCtaClick,
}) => (
  <section className="bg-softBeige rounded-xl px-6 py-8 mx-auto max-w-7xl flex flex-col items-center text-center space-y-4">
    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{title}</h2>
    <p className="text-base text-gray-600 leading-relaxed">{description}</p>
    {ctaText && (
      <button
        className="bg-emerald-700 text-white rounded px-6 py-2 font-semibold text-sm md:text-base hover:bg-emerald-800 focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-md transition"
        onClick={onCtaClick}
      >
        {ctaText}
      </button>
    )}
  </section>
);

export default CalloutBanner;
