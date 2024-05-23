import { IButton } from '@/types/button.types';
import { StrapiImage } from '@/types/StrapiImage';
import React from 'react';
import Title, { LineType } from '../shared/Title';
import LongParagraph from '../shared/LongParagraph';

import Link from 'next/link';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Represents a property with content that includes a title, description, image, and button.
 * @interface IProp
 * @property {object} content - The content of the property.
 * @property {string} content.title - The title of the property.
 * @property {string} content.description - The description of the property.
 * @property {StrapiImage} content.image - The image associated with the property.
 * @property {IButton} content.button - The button associated with the property.
 */
interface IProp {
  content: {
    title: string;
    description: string;
    image: StrapiImage;
    button: IButton;
  };
}
/**
 * A component that renders a detailed banner with an image, title, description, and optional button.
 * @param {IProp} props - The props object containing the content for the banner.
 * @returns The rendered detailed banner component.
 */
const DividedBanner = ({ content }: IProp) => {
  const [mobileView, setMobileView] = React.useState(false);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= 775);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="text-white relative">
      <div className="h-[70vh] image w-[100vw] relative">
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
          alt={content?.image?.data?.attributes?.alternativeText || ''}
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content?.image.data?.attributes?.url}`}
        />

        <div
          className={`overflow-y-scroll h-full z-3 end-0  top-0 w-100 md:w-[60vw] lg:w-[50vw] px-5 pt-10  md:pe-10 text-center bg-black bg-opacity-80  absolute ${
            mobileView ? '' : 'ps-[12vw]'
          } `}
          style={
            !mobileView
              ? { clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 100%)' }
              : {}
          }
        >
          <div
            className="py-10   flex  flex-col "
            style={{ justifyContent: 'space-between' }}
          >
            <div className="mx-auto">
              <Title
                text={content.title}
                textColor={'text-white'}
                fontSize={''}
                fontWeight={''}
                line={LineType.None}
                lineColor={'border-white'}
                className="font-bold  leading-12 "
              />
            </div>
            <p className="text-base tracking-wider mt-5 pb-5">
              <LongParagraph
                text={content.description}
                maxLines={mobileView ? 6 : 5}
              />
            </p>

            <Link
              className="py-1 w-fit mx-auto lg:py-3 px-6  text-xl font-thin   border-white border-2 text-white rounded-md transition hover:bg-secondary duration-300 hover:border-transparent"
              href={content?.button?.link?.target?.data?.attributes?.slug}
            >
              {content?.button?.link?.label}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DividedBanner;
