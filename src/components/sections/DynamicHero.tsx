import React, { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { IDynamicHero } from '@/types/dynamicHero.types';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface DynamicHeroProps {
  content: {
    id: number;
    __component: string;
    title: string;
    content: {
      data: {
        attributes: {
          url: string | undefined;
          needToEdit: boolean;
        };
      };
    };
    breadcrumbs: {
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

function DynamicHero({ content }: DynamicHeroProps) {
  const [fetchedData, setFetchedData] = useState<IDynamicHero>();
  const route = usePathname();
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  // const id = pathname.split('/')[pathname.split('/').length - 1];
  const programId = route.split('/')[route.split('/').length - 1];

  const pathname = usePathname();
  const pathItems = pathname.split('/').filter((item) => item !== ''); // Remove empty strings
  const currentPage = isNaN(Number(pathItems[pathItems.length - 1]))
    ? pathItems[pathItems.length - 1]
    : pathItems[pathItems.length - 2];

  // Create a new array with the updated data
  const updatedTargetPages = [
    ...content.breadcrumbs.data,
    {
      id: content.breadcrumbs.data.length + 1,
      attributes: { title: currentPage, slug: currentPage },
    },
  ];

  const [mobileView, setMobileView] = useState(false);

  const handleResize = useCallback(() => {
    setMobileView(window.innerWidth <= 620);
  }, []);

  useEffect(() => {
    handleResize();

    const resizeListener = () => {
      handleResize();
    };

    window.addEventListener('resize', resizeListener);

    return () => {
      window.removeEventListener('resize', resizeListener);
    };
  }, [handleResize]);
  useEffect(() => {
    const fetchData = async () => {
      if (content.content.data.attributes.url) {
        try {
          let apiUrl = content.content.data.attributes.url;

          if (content.content.data.attributes.needToEdit) {
            apiUrl = apiUrl.replace('objId', programId as unknown as string);
          }

          if (apiUrl) {
            const res = await axios.get<IDynamicHero>(apiUrl);
            setFetchedData(res.data);
          }
        } catch (error) {}
      }
    };

    fetchData();
  }, [
    content.content.data.attributes.url,
    content.content.data.attributes.needToEdit,
    programId,
  ]);
  return (
    <section className="">
      {fetchedData?.data.attributes ? (
        <div className="relative">
          <div className="h-[60vh] image">
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
              width={1200}
              height={1000}
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${
                fetchedData.data.attributes.banner.data.attributes.url || ''
              }`}
              alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${
                fetchedData.data.attributes.banner.data.attributes
                  .alternativeText || ''
              }`}
              style={
                !mobileView
                  ? {
                      clipPath:
                        'polygon(0 0, 100% 0, 100% 86%, 75% 100%, 38% 91%, 0 100%)',
                    }
                  : {}
              }
            />
          </div>
          <div
            id="hero-content"
            className="absolute   bg-black rounded-sm text-white bg-opacity-70 top-1/3 m-4 lg:ms-32 p-4 lg:p-8 border-s-2 lg:border-s-[7px] md:w-[40%]"
          >
            {content.title ? (
              <h1 className="text-2xl lg:text-5xl lg:leading-[4rem] mb-5 font-semibold">
                {content.title}
              </h1>
            ) : null}
          </div>
          <div className="hidden xl:block absolute -bottom-14 end-96 w-40 h-40 rounded-full">
            <Image
              className="object-cover w-full h-full transition-opacity opacity-0 duration-100"
              onLoadingComplete={(image) => image.classList.remove('opacity-0')}
              loading="lazy"
              width={1200}
              height={1000}
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${
                fetchedData.data.attributes.logo.data.attributes.url || ''
              }`}
              alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${
                fetchedData.data.attributes.logo.data.attributes
                  .alternativeText || ''
              }`}
            />
          </div>

          <div className="px-4 sm:container">
            <div className="relative">
              <nav
                className="absolute -bottom-3 bg-white py-2 px-4 border-2 border-red-500 rounded-full text-red-500 font-bold text-base"
                aria-label="Breadcrumb"
              >
                <ol className="flex flex-wrap items-center justify-center space-x-1 md:flex-row md:space-x-2 rtl:space-x-reverse">
                  {updatedTargetPages.map((item, index, array) => {
                    const removeSlash = index === array.length - 1;
                    return (
                      <li
                        key={index}
                        className="inline-block items-center py-1"
                      >
                        <Link
                          href={`/${item.attributes.slug}`}
                          className={`inline-block items-center text-base font-bold capitalize ${
                            index === array.length - 1
                              ? 'text-gray-500 pointer-events-none'
                              : 'text-red-500'
                          }`}
                        >
                          {item.attributes.title.replace(/-/g, ' ')}
                        </Link>
                        {!removeSlash && <span className="mx-1">/</span>}
                      </li>
                    );
                  })}
                </ol>
              </nav>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

export default DynamicHero;
