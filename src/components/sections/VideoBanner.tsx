import { StrapiImage } from '@/types/StrapiImage';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import React from 'react';
import Title, { LineType } from '../shared/Title';
/**
 * Represents a property with content that includes a title, description, image, and button.
 * @interface IProp
 * @property {object} content - The content of the property.
 * @property {StrapiImage} content.media - The image associated with the property.
 */
interface IProp {
  content: {
    media: StrapiImage;
    link: string;
    title: string;
  };
  inSidebar:boolean;
}
/**
 * A component that renders a detailed banner with an image, title, description, and optional button.
 * @param {IProp} props - The props object containing the content for the banner.
 * @returns The rendered detailed banner component.
 */
const VideoBanner = ({ content , inSidebar }: IProp) => {
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      {content.title && 
        <Title
        text={content.title}
        textColor={'text-primary'}
        fontSize={''}
        fontWeight={''}
        line={LineType.Before}
        lineColor={'border-black'}
        className="font-bold"
      />
      }
      {content.media.data &&
        <div className={`w-full h-[600px] flex justify-center items-center relative mt-4`}>
          {isImageLoading && (
            <Skeleton
              className="w-full h-full"
              baseColor="#fff"
              highlightColor="#ccc"
            />
          )}
          <Image
          width={744}
          height={388}
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content.media.data.attributes.url}`}
          alt={content.media.data.attributes.alternativeText?content.media.data.attributes.alternativeText:''}
          className="absolute w-full h-full object-cover transition-opacity opacity-0 duration-100"
          onLoadingComplete={(image) => {
            image.classList.remove('opacity-0');
            setIsImageLoading(false);
          }}
          loading="lazy"
          />
        </div>
      }
      {content.link &&
      <div className={`w-full flex justify-center items-center iframe relative mt-4`}>
        <video width="100%" controls preload="none">
          <source
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content.link}`}
            type="video/mp4"
          />
        </video>
      </div>
      }       
    </div>
  );
};

export default VideoBanner;
