import React from "react";
import { Button } from "@/components/ui/button";

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
      <Button
        onClick={onCtaClick}
        className="font-semibold px-6 py-2 text-sm md:text-base shadow-md"
      >
        {ctaText}
      </Button>
    )}
  </section>
);

export default CalloutBanner;
