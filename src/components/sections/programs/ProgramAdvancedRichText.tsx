import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import Image from 'next/image';
import { useColor } from '@/context/color.context';
import { Accordion } from 'flowbite-react';
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel';
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle';
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface AdvancedRichTextProps {
  content: {
    advancedRichText: {
      textHeader: string;
      remainingText: string;
    };
  };
}

function ProgramAdvancedRichText({ content }: AdvancedRichTextProps) {
  const { color } = useColor();
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className="sm:container mb-4 !ps-0">
      <Accordion className="w-full" collapseAll>
        <AccordionPanel>
        <AccordionTitle className='py-1 text-black'>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              rehypePlugins={[rehypeRaw] as any}
              components={{
                h1: ({ children }) => (
                  <p className="p font-semibold">{children}</p>
                ),
                h2: ({ children }) => (
                  <p className="p font-semibold">{children}</p>
                ),
                h3: ({ children }) => (
                  <p className="p font-semibold">{children}</p>
                ),
                h4: ({ children }) => (
                  <p className="p font-semibold">{children}</p>
                ),
              }}
            >
              {content?.advancedRichText?.textHeader}
            </ReactMarkdown>
          </AccordionTitle>
          <AccordionContent>
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              rehypePlugins={[rehypeRaw] as any}
              components={{
                table: ({ children }) => (
                  // <table className="table-auto py-2 w-full">{children}</table>
                  <div className="overflow-x-auto overflow-y-clip py-2">
                    <table className="w-full h-full">{children}</table>
                  </div>
                ),
                h1: ({ children }) => (
                  <h1 style={{ color: color ? color : '' }}>{children}</h1>
                ),
                h2: ({ children }) => (
                  <h2 style={{ color: color ? color : '' }}>{children}</h2>
                ),
                h3: ({ children }) => <h3>{children}</h3>,
                h4: ({ children }) => <h4>{children}</h4>,
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
                  className="!text-inherit"
                  >
                    {children}
                  </p>
                ),
                a: ({ children, href }) => (
                  <a
                    // className="text-primary underline"
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
                  <div>
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
              {content?.advancedRichText?.remainingText}
            </ReactMarkdown>
          </AccordionContent>
        </AccordionPanel>
      </Accordion>
    </div>
  );
}

export default ProgramAdvancedRichText;
