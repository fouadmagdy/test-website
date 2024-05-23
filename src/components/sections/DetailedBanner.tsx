import { IButton } from '@/types/button.types';
import { StrapiImage } from '@/types/StrapiImage';
import React from 'react';
import Title, { LineType } from '../shared/Title';
import Link from 'next/link';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
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
const DetailedBanner = ({ content }: IProp) => {
  const [mobileView, setMobileView] = React.useState(false);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  React.useEffect(() => {
    const handleResize = () => {
      setMobileView(window.innerWidth <= 620);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <div className="text-white relative h-[86vh]">
      <div className="md:py-[13vh] md:pt-[13vh]">
        <div className="h-[86vh] md:h-[60vh] image w-[100vw]">
          {isImageLoading && (
            <Skeleton
              className="w-full h-full"
              baseColor="#fff"
              highlightColor="#ccc"
            />
          )}
          {content?.image.data?.attributes.url ? (
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
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content?.image.data?.attributes.url}`}
            />
          ) : null}
        </div>
      </div>
      <div
        className="h-[86vh] px-10 z-3 start-0 md:start-[7%] top-0 w-full md:w-[816px] flex justify-between content-evenly items-center xl:w-[35vw] bg-lightBlack bg-opacity-90  md:px-10 py-16 md:py-5  lg:py-[4em] absolute "
        style={
          !mobileView
            ? { clipPath: 'polygon(0 0, 100% 15%, 100% 100%, 0 85%)' }
            : {}
        }
      >
        <div className="   ">
          <Title
            text={content.title}
            textColor={'text-white'}
            fontSize={''}
            fontWeight={''}
            line={LineType.Before}
            lineColor={'border-white'}
            className="font-bold"
          />

          <h5 className="font-thin  xl:tracking-wider my-4  ">
            {' '}
            <ReactMarkdown>{content?.description}</ReactMarkdown>
          </h5>

          <Link
            className="py-2 px-4 w-fit mx-auto border-white border-2 text-white rounded-lg font-thin transition duration-300 hover:border-secondary hover:bg-secondary"
            href={content?.button?.link?.target?.data?.attributes?.slug ?? ''}
          >
            {content?.button?.link?.label}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DetailedBanner;
