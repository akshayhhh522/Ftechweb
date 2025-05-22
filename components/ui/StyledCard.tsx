import React from 'react';

interface CardProps {
  icon?: React.ReactNode; // Optional icon
  title: string;
  children: React.ReactNode;
  className?: string;
}

const Card: React.FC<CardProps> = ({ icon, title, children, className }) => {
  return (
    <article
      className={`bg-white rounded-xl shadow-md p-6 md:p-8 hover:shadow-lg transition-shadow duration-300 ease-in-out ${className}`}
    >
      {icon && <div className="mb-4 text-emerald-700">{icon}</div>}
      <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-3">{title}</h3>
      <div className="text-base text-gray-600 leading-relaxed">
        {children}
      </div>
    </article>
  );
};

export default Card;
