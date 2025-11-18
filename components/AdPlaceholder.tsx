import React from 'react';

interface AdProps {
  format?: 'banner' | 'sidebar' | 'inline';
  className?: string;
}

const AdPlaceholder: React.FC<AdProps> = ({ format = 'banner', className = '' }) => {
  let dimensions = 'h-24 w-full'; // banner default

  if (format === 'sidebar') {
    dimensions = 'h-64 w-full';
  } else if (format === 'inline') {
    dimensions = 'h-64 w-full md:w-1/2 mx-auto my-6';
  }

  return (
    <div className={`bg-gray-100 border border-gray-300 flex flex-col items-center justify-center text-gray-400 text-xs uppercase tracking-widest ${dimensions} ${className}`}>
      <span className="font-semibold mb-1">Advertisement</span>
      <span className="text-[10px] opacity-60">AdSpace</span>
    </div>
  );
};

export default AdPlaceholder;
