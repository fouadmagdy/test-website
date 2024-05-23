import React from 'react';
import LongParagraph from '../shared/LongParagraph';
// import DOMPurify from 'dompurify';

interface Props {
  content: {
    description: string;
  };
}
export default function Info({ content }: Props) {
  // const sanitizedContent = DOMPurify.sanitize(content.description);
  return (
    // <div
    //   className="container pt-5"
    //   dangerouslySetInnerHTML={{ __html: sanitizedContent }}
    // />
    <LongParagraph text={content?.description} />
  );
}
