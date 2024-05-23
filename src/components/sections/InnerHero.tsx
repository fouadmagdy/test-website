import React from 'react';
import { ImageProp } from '@/types/image.types';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Breadcrump from '../breadcrump';

interface InnerHeroProps {
  content: {
    title: string | null;
    image: ImageProp;
    logo: ImageProp;
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

function InnerHero({ content }: InnerHeroProps) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  const pathname = usePathname();
  const pathItems = pathname.split('/').filter((item) => item !== '');
  const currentPage = isNaN(Number(pathItems[pathItems.length - 1]))
    ? pathItems[pathItems.length - 1]
    : pathItems[pathItems.length - 2];

  const updatedTargetPages = [
    ...content.breadcrumbs.data,
    {
      id: content.breadcrumbs.data.length + 1,
      attributes: { title: currentPage, slug: currentPage },
    },
  ];
  // Remove duplicate entries
  const uniqueTargetPages = updatedTargetPages.filter((page, index, self) =>
    index === self.findIndex((p) => p.attributes.slug === page.attributes.slug)
  );
// console.log(currentPage)
  return (
    <section id="hero" className="relative">
      <div className="h-[70vh] image">
        {isImageLoading && (
          <Skeleton
            className="w-full h-full"
            baseColor="#fff"
            highlightColor="#ccc"
          />
        )}
        {content?.image.data?.attributes.url && (
          <Image
            className="object-cover w-full h-full transition-opacity opacity-0 duration-100 hero-clipt"
            onLoadingComplete={(image) => {
              image.classList.remove('opacity-0');
              setIsImageLoading(false);
            }}
            loading="lazy"
            width={700}
            height={700}
            alt={content?.image?.data?.attributes?.alternativeText || ''}
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content?.image.data?.attributes.url}`}
          />
        )}
      </div>
      <div className="px-4 sm:p-0 sm:container">
        <div
          id="hero-content"
          className="absolute bg-blue-gray-900 rounded-sm text-white bg-opacity-70 top-1/4 p-4 lg:p-8 border-s-2 lg:border-s-[7px] lg:w-[30%]"
        >
          {content.title ? (
            <h1 className="mb-4">
              {content.title}
              <div className="bg-red flex gap-2 mt-2">
                <span className="w-10 h-1 lg:w-20 lg:h-2 bg-white"></span>
                <span className="w-5 h-1 lg:w-10 lg:h-2 bg-white"></span>
                <span className="w-2 h-1 lg:w-4 lg:h-2 bg-white"></span>
              </div>
            </h1>
          ) : null}
        </div>
        <div className="relative">
          <div className="absolute -bottom-1">
            <Breadcrump
              content={{ targetPages: { data: uniqueTargetPages } }}
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default InnerHero;
