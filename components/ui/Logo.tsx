// components/ui/Logo.tsx
import React from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  return (
    <div className={`text-2xl font-bold tracking-tight ${className}`}>
      <span style={{ color: '#1B4D3E' }} className="dark:text-emerald-700">Debt</span>
      <span style={{ color: '#A4C639' }} className="dark:text-[#A4C639]">Plus</span>
    </div>
  );
}
