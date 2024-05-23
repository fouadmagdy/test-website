import React from 'react';
import Image from 'next/image';
import Title, { LineType } from '../shared/Title';
import LongParagraph from '../shared/LongParagraph';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface IProp {
  content: {
    header: {
      title: string;
      description: string;
    };
    images: {
      id: number;
      title: string;
      media: {
        data: {
          attributes: {
            alternativeText: string | null;
            url: string;
          };
        };
      };
      page: {
        data: {
          id: number;
          attributes: {
            slug: string | null | undefined;
          };
        };
      };
    }[];
  };
  inSidebar:boolean;
}
function MiniFeatured({ content , inSidebar}: IProp) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      {content.header ? (
        <Title
          text={content.header.title}
          textColor={'text-primary'}
          fontSize={''}
          fontWeight={''}
          line={LineType.Before}
          lineColor={'after:bg-primary'}
          className="max-w-2xl"
        />
      ) : null}
      {content.header.description && (
        <p className="mb-4 my-4 text-justify text-gray-700 pb-5 ">
          <LongParagraph text={content.header.description} />
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 m-auto pt-6 gap-7">
        {content.images.map((image) => (
          <Link
            key={image.id}
            href={
              image?.page?.data?.attributes?.slug !== undefined
                ? `/${image?.page?.data?.attributes?.slug}`
                : '#'
            }
            className="p-4 h-[400px] relative overflow-hidden hover:shadow-lg"
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
                className="w-full max-w-full object-cover transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                  setIsImageLoading(false);
                }}
                loading="lazy"
                fill={true}
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.media.data.attributes.url}`}
                alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image.media.data.attributes.alternativeText}`}
              />
              <div
                className={`absolute inset-0 flex transition-all duration-300 ease-in-out `}
                style={{
                  background: `linear-gradient(0deg, rgba(0,0,0,1) , transparent)`,
                }}
              />
              <h4 className="absolute bottom-4 text-white p-4">
                {image?.title}
              </h4>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default MiniFeatured;
