import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';

interface AdvancedRichTextProps {
  content: {
    advancedRichText: string;
  };
}

function DescriptionRichText({ content }: AdvancedRichTextProps) {
  return (
    <div className="px-5 sm:px-0 sm:container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rehypePlugins={[rehypeRaw] as any}
        components={{
          p: ({ children }) => (
            <p className="mb-3 !text-inherit text-lg">{children}</p>
          ),
        }}
      >
        {content?.advancedRichText}
      </ReactMarkdown>
    </div>
  );
}

export default DescriptionRichText;
