import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useColor } from '@/context/color.context';

interface Props {
  content: {
    targetPages: {
      data: {
        id: number;
        attributes: {
          title: string;
          slug: string;
        };
      }[];
    };
  };
}

function Breadcrump({ content }: Props) {
  // console.log(content)
  const { color } = useColor();

  const pathname = usePathname();
  const pathItems = pathname.split('/').filter((item) => item !== ''); // Remove empty strings
  const currentPage = isNaN(Number(pathItems[pathItems.length - 1]))
    ? pathItems[pathItems.length - 1]
    : pathItems[pathItems.length - 2];

  // Create a new array with the updated data
  const updatedTargetPages = [
    ...content.targetPages.data,
    {
      id: content.targetPages.data.length + 1,
      attributes: { title: currentPage, slug: currentPage },
    },
  ];
  // Remove duplicate entries
  const uniqueTargetPages = updatedTargetPages.filter((page, index, self) =>
    index === self.findIndex((p) => p.attributes.slug === page.attributes.slug)
  );
  console.log(`🚀 ~ file: breadcrump.tsx:38 ~ Breadcrump ~ updatedTargetPages:`, updatedTargetPages);
  // const updatedTargetPages= updatedTargetPages.map(item => item.replace(/-/g, ''));

  return (
    <nav
      className=" px-4 sm:container   py-5 sm:mt-52 md:mt-32 lg:mt-8  font-bold text-white   inline-flex  "
      aria-label="Breadcrumb"
    >
      <div
        className="p-3 sm:flex lg:inline-flex items-center content-center  flex-wrap border-2 border-red-500 rounded-full bg-white"
        style={{
          borderColor: color ? color : 'border-red-500',
        }}
      >
        <ul className="flex flex-col md:flex-row items-center content-center ">
          {uniqueTargetPages.map((link, index, array) => {
            const displayTitle = link.attributes.title.replace(/ust/gi, 'UST');

            // console.log(displayTitle);
            return (
              <li key={index} className="inline-flex items-center">
                <Link
                  href={link.attributes.slug}
                  className={`text-base font-bold capitalize ${index === array.length - 1 ? '!text-gray-500 pointer-events-none' : 'text-red-500'}`}
                  style={{
                    color: color ? color : '',
                  }}
                >
                  {displayTitle}
                </Link>
                {index !== array.length - 1 && (
                  <span className="mx-2 h-auto text-gray-400 font-medium">
                    /
                  </span>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
}

export default Breadcrump;
