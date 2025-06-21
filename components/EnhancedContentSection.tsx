import Image from 'next/image';
import Link from 'next/link';

interface EnhancedContentSectionProps {
  imageSrc?: string;
  imageAlt?: string;
  icon?: React.ReactNode; // For SVG icon
  heading: React.ReactNode; // Allows for keyword highlighting
  paragraph: string;
  primaryCtaText: string;
  primaryCtaLink: string;
  secondaryCtaText?: string;
  secondaryCtaLink?: string;
  reverseColumn?: boolean;
  wrapTextInCard?: boolean;
}

const DecorativeShape = () => (
  <svg
    className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/4 opacity-10 text-[#A4C639] w-[500px] h-[500px] pointer-events-none"
    width="500"
    height="500"
    viewBox="0 0 200 200"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      fill="currentColor"
      d="M40.8,-70.1C53.1,-62.2,63.4,-51.6,69.9,-39.1C76.4,-26.6,79.1,-13.3,79.1,0C79.1,13.3,76.4,26.6,69.9,39.1C63.4,51.6,53.1,62.2,40.8,70.1C28.5,78,14.2,83.2,0,83.2C-14.2,83.2,-28.5,78,-40.8,70.1C-53.1,62.2,-63.4,51.6,-69.9,39.1C-76.4,26.6,-79.1,13.3,-79.1,0C-79.1,-13.3,-76.4,-26.6,-69.9,-39.1C-63.4,-51.6,-53.1,-62.2,-40.8,-70.1C-28.5,-78,-14.2,-83.2,0,-83.2C14.2,-83.2,28.5,-78,40.8,-70.1Z"
      transform="translate(100 100)"
    />
  </svg>
);

export default function EnhancedContentSection({
  imageSrc,
  imageAlt = 'Descriptive image',
  icon,
  heading,
  paragraph,
  primaryCtaText,
  primaryCtaLink,
  secondaryCtaText,
  secondaryCtaLink,
  reverseColumn = false,
  wrapTextInCard = false,
}: EnhancedContentSectionProps) {
  const textContent = (
    <div className={`space-y-6 ${wrapTextInCard ? 'bg-white p-8 md:p-10 rounded-xl shadow-md relative z-10' : ''}`}>
      <h2 className="text-3xl md:text-4xl font-semibold text-[#1B4D3E]">
        {heading}
      </h2>
      <p className="text-base text-gray-600 leading-relaxed">
        {paragraph}
      </p>
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        <Link
          href={primaryCtaLink}
          className="bg-[#1B4D3E] text-white px-6 py-3 rounded-full hover:bg-[#bada55] shadow-md transition-colors text-center text-sm font-medium"
        >
          {primaryCtaText}
        </Link>
        {secondaryCtaText && secondaryCtaLink && (
          <Link
            href={secondaryCtaLink}
            className="bg-white text-[#1B4D3E] border border-[#1B4D3E] px-6 py-3 rounded-full hover:bg-[#f0f2f5] transition-colors text-center text-sm font-medium"
          >
            {secondaryCtaText}
          </Link>
        )}
      </div>
    </div>
  );

  const imageContent = (
    <div className="relative flex justify-center items-center">
      {imageSrc ? (
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={500}
          height={400}
          className="object-contain rounded-lg shadow-lg w-full max-w-md"
        />
      ) : icon ? (
        <div className="bg-white p-6 rounded-lg shadow-lg w-auto h-auto flex items-center justify-center">
          {icon}
        </div>
      ) : (
        <div className="w-full max-w-md h-64 bg-gray-200 rounded-lg shadow-lg flex items-center justify-center">
          <span className="text-gray-500">Placeholder Image/Icon</span>
        </div>
      )}
    </div>
  );

  return (
    <section className="relative bg-[#f0f2f5] py-16 px-6 md:px-12 overflow-hidden">
      <DecorativeShape />
      <div className="max-w-7xl mx-auto relative z-10">
        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 items-center ${
            reverseColumn ? 'md:grid-flow-col-dense' : ''
          }`}
        >
          <div className={`${reverseColumn ? 'md:col-start-2' : ''}`}>
            {imageContent}
          </div>
          <div className={`${reverseColumn ? 'md:col-start-1' : ''}`}>
            {textContent}
          </div>
        </div>
      </div>
    </section>
  );
}

// Example of how to use keyword highlighting:
// heading={
//   <>
//     Achieve <span className="text-[#A4C639]">Financial Freedom</span> With Our Expert Guidance
//   </>
// }
