import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import { useColor } from '@/context/color.context';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface AdvancedRichTextProps {
  content: {
    advancedRichText: string;
  };
}

function AdvancedRichText({ content }: AdvancedRichTextProps) {
  const { color } = useColor();
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className="px-5 sm:px-0 sm:container">
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        rehypePlugins={[rehypeRaw] as any}
        components={{
          table: ({ children }) => (
            // <table className="table-auto py-2 w-full">{children}</table>
            <div className="overflow-x-auto overflow-y-clip py-2 !text-inherit">
              <table className="w-full h-full">{children}</table>
            </div>
          ),
          h1: ({ children }) => <h1 className="h1">{children}</h1>,
          h2: ({ children }) => (
            <h2 className="h2" style={{ color: color ? color : '' }}>
              {children}
            </h2>
          ),
          h3: ({ children }) => (
            <h3
            // className="h3"
            >
              {children}
            </h3>
          ),
          h4: ({ children }) => <h4 className="h4">{children}</h4>,
          ul: ({ children }) => (
            <ul
              className="list-disc list-inside ps-4 py-2 text-justify "
              // style={{ color: color ? color : 'primary' }}
            >
              {children}
            </ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside ps-4 py-2 text-justify ">
              {children}
            </ol>
          ),
          li: ({ children }) => <li>{children}</li>,
          p: ({ children }) => (
            <p
              className="mb-3 !text-inherit"
              // className="block dark:text-gray-400 font-normal text-justify text-gray-900 py-3  text-xl  "
              // className="pb-1 text-justify"
            >
              {children}
            </p>
          ),
          a: ({ children, href }) => (
            <a
              className="text-primary underline"
              // style={{ color: color ? color : 'primary' }}
              href={href}
            >
              {children}
            </a>
          ),
          strong: ({ children }) => (
            <strong
            // className="font-bold"
            >
              {children}
            </strong>
          ),
          em: ({ children }) => (
            <em
            // style={{ color: color ? color : 'primary' }}
            // className="font-italic"
            >
              {children}
            </em>
          ),
          code: ({ children }) => (
            <code
            // style={{ color: color ? color : 'primary' }}
            // className="bg-gray-100 p-1 rounded"
            >
              {children}
            </code>
          ),
          img: ({ alt, src }) => (
            <div className="">
              {isImageLoading && (
                <Skeleton
                  className="w-full h-full"
                  baseColor="#fff"
                  highlightColor="#ccc"
                />
              )}
              <Image
                className="transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                  setIsImageLoading(false);
                }}
                loading="lazy"
                alt={alt || ''}
                width={500}
                height={300}
                src={src || ''}
              />
            </div>
          ),
          br: () => <br />,
          hr: () => <hr />,
          blockquote: ({ children }) => (
            <blockquote
            // className="border-l-4 border-blue-500 pl-4 italic"
            >
              {children}
            </blockquote>
          ),
        }}
      >
        {content?.advancedRichText}
      </ReactMarkdown>
    </div>
  );
}

export default AdvancedRichText;
