import { IButton } from '@/types/button.types';
import Link from 'next/link';
import axios from 'axios';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { UnderGraduate } from '@/types/underGraduate.types';
import Loading from '@/app/loading';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
/**
 * Interface representing the structure of content in SchoolsCount component.
 */
interface SchoolsCount {
  content: {
    title: string;
    targetPage: {
      data: {
        attributes: {
          slug: string;
        };
      };
    };
    button: IButton;
    content: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
  inSidebar:boolean;
}

/**
 * React functional component representing SchoolsCount.
 * Displays school-related information based on props.
 * @param {SchoolsCountProps} props - Props containing school-related content.
 * @returns {JSX.Element} - React component
 */
function SchoolsCount({ content , inSidebar }: SchoolsCount) {
  // State variables for managing loading state and data retrieval
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [data, setData] = useState<UnderGraduate[]>();
  const pathName = usePathname();
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  /**
   * useEffect to fetch data based on the URL from content.
   */
  useEffect(() => {
    (async () => {
      if (content.content.data?.attributes.url) {
        try {
          const res = await axios.get(content.content.data.attributes.url);
          setIsLoading(true);
          setData(res.data.data);
          setIsLoading(false);
        } catch (error) {}
      }
    })();
  }, [content.content.data?.attributes.url]);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 py-8`}>
      <div className="flex flex-wrap flex-col justify-center gap-5">
          <h2 className="h1 mb-3">{content.title}</h2>
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        

        {isLoading ? (
          <Loading />
        ) : (
          data?.map((school) => (
            <Link
              // href={`/${content?.targetPage?.data?.attributes?.slug}/${school?.id}`}
              href={
                content?.targetPage?.data?.attributes?.slug !== undefined
                  ? pathName === '/'
                    ? `/${content?.targetPage?.data?.attributes?.slug}/${school?.id}`
                    : `${pathName}/${content?.targetPage?.data?.attributes?.slug}/${school?.id}`
                  : ''
              }
              key={school.id}
              className="p-4 h-72 relative overflow-hidden hover:shadow-lg cursor-pointer"
            >
              <div className="absolute inset-0">
                {isImageLoading && (
                  <Skeleton
                    className="w-full h-full"
                    baseColor="#fff"
                    highlightColor="#ccc"
                  />
                )}
                <Image
                  className="object-cover w-full h-full transition-opacity opacity-0 duration-100"
                  onLoadingComplete={(image) => {
                    image.classList.remove('opacity-0');
                    setIsImageLoading(false);
                  }}
                  loading="lazy"
                  fill={true}
                  alt={
                    school?.attributes?.image?.data?.attributes?.alternativeText
                  }
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${school?.attributes?.image?.data?.attributes?.url}`}
                />
                <div
                  className={`absolute inset-0 flex transition-all duration-300 ease-in-out `}
                  style={{
                    background: `linear-gradient(0deg, ${school.attributes.color}, transparent)`,
                  }}
                />
                <h4 className="absolute bottom-4 text-white  p-4">
                  {school.attributes.title}
                </h4>
              </div>
            </Link>
          ))
        )}
      </div>
    </div>
  );
}

export default SchoolsCount;
