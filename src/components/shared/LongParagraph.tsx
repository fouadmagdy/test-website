'use client'
import { useAppSelector } from '@/store/types';
import React, { useState, useEffect, useRef } from 'react';

interface LongParagraphProps {
  text: string | undefined;
  maxLines?: number | undefined;
}

const LongParagraph: React.FC<LongParagraphProps> = ({ text ,maxLines}) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const [showAll, setShowAll] = useState(false);
  const [hasMore, setHasMore] = useState(false);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  useEffect(() => {
    if (paragraphRef.current) {
      const lineHeight = parseInt(window.getComputedStyle(paragraphRef.current).lineHeight || '18', 10);
      const maxHeight = lineHeight * (maxLines?maxLines:3);
      if (paragraphRef.current.scrollHeight > maxHeight) {
        setHasMore(true);
      }
    }
  }, [text,maxLines]);

  const toggleLines = () => {
    setShowAll(!showAll);
  };

  return <>
      <span ref={paragraphRef} className={!showAll ? `${maxLines?`line-clamp-${maxLines}`:'line-clamp-3'}` : ''}>
        {text}
      </span>
      {hasMore && (
        <p className={`text-primary cursor-pointer`} onClick={toggleLines}>
          {showAll ? `${locale==='en'?'see less':'أقرأ أقل'}` : `${locale==='en'?'...see more':'اقرأ المزيد...'}`}
        </p>
      )}
    </>
};

export default LongParagraph;
