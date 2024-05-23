import React from 'react';
import { useAppSelector } from '@/store/types';

const ChevronDouble = () => {
  const locale = useAppSelector((state) => state.lang.locale);
  return locale === 'en' ? (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M11.25 4.5l7.5 7.5-7.5 7.5m-6-15l7.5 7.5-7.5 7.5"
      />
    </svg>
  ) : (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="w-6 h-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12.75 4.5l-7.5 7.5 7.5 7.5m6-15l-7.5 7.5 7.5 7.5"
      />
    </svg>
  );
};

export default ChevronDouble;
