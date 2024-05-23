import { StrapiImage } from '@/types/StrapiImage';
import React from 'react';
import Title, { LineType } from '../shared/Title';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
/**
 * Represents a property with content that includes a title, description, image, and button.
 * @interface IProp
 * @property {object} content - The content of the property.
 * @property {StrapiImage} content.media - The image associated with the property.
 */
interface IProp {
  content: {
    title: string;
    card: {
      id: number;
      title: string;
      image: StrapiImage;
    }[];
  };
  inSidebar:boolean;
}
/**
 * A component that renders a detailed banner with an image, title, description, and optional button.
 * @param {IProp} props - The props object containing the content for the banner.
 * @returns The rendered detailed banner component.
 */
const MinCards = ({ content ,inSidebar }: IProp) => {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className={`${inSidebar?'':'sm:container'} px-1 sm:p-0`}>
      {content.title ? (
        <Title
          textColor={'text-primary'}
          lineColor={'before:bg-secondary'}
          text={`${content.title} `}
          fontSize={''}
          fontWeight={''}
          line={LineType.None}
          className={''}
          id="section-title"
          aria-labelledby="section-title"
        />
      ) : (
        ''
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto md:pt-6 gap-3 sm:gap-5 md:gap-7">
        {content.card.map((item) => (
          <div
            key={item.id}
            className="p-4 h-72 relative overflow-hidden group"
          >
            <div className="absolute inset-0 ">
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
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.image.data.attributes.url}`}
                alt={item.title}
              />
              {item.title ? (
                <h4 className="absolute inset-0 flex items-center justify-center transition-all duration-500 ease-in-out hover:bg-primary hover:bg-opacity-80 text-white">
                  <span className="opacity-0 transition-all duration-500 ease-in-out group-hover:opacity-100">
                    {item.title}
                  </span>
                </h4>
              ) : null}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinCards;
