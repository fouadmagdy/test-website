import React from 'react';
import Link from 'next/link';
import { ImageProp } from '@/types/image.types';
import Image from 'next/image';
import { IButton } from '@/types/button.types';
import ChevronDouble from '../icons/chevron-double-right';
import ChevronSingle from '../icons/chevron-single-right';
import LongParagraph from '../shared/LongParagraph';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Represents the properties of a banner component.
 * @interface BannerProps
 * @property {object} content - The content of the banner.
 * @property {string | null} content.title - The title of the banner. Can be null.
 * @property {string} content.description - The description of the banner.
 * @property {ImageProp} content.image - The image of the banner.
 * @property {IButton[]} content.button - An array of button properties for the banner.
 */
interface BannerProps {
  content: {
    title: string | null;
    description: string;
    image: ImageProp;
    buttons: IButton[];
  };
}

/**
 * A functional component that renders a banner section with dynamic content.
 * @param {BannerProps} props - The props object containing the content for the banner.
 * @returns The rendered banner section.
 */

function Banner({ content }: BannerProps) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className="relative h-[400px] lg:h-[450px] xl:h-[500px]">
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
        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content?.image?.data?.attributes?.url}`}
        alt={content?.image?.data?.attributes?.alternativeText || ''}
        height={100}
        width={500}
      />
      <div className="absolute inset-0 bg-lightBlack bg-opacity-90 text-white flex flex-col justify-center items-center px-1 sm:px-20 overflow-auto">
        <p className="h6 text-center px-5 sm:px-10 lg:px-20 mt-4">
          <LongParagraph text={content.description} />
        </p>
        <div
          className="grid grid-col lg:flex lg:flex-row gap-1 items-center content-center"
          aria-hidden
        >
          {content.buttons.map((btn, i) => (
            <Link
              key={i}
              href={btn?.link?.target?.data?.attributes?.slug || ''}
              role="button"
              tabIndex={0}
              aria-label={btn?.link?.target?.data?.attributes?.title}
              className="h4 bg-transparent border-2 rounded-xl shadow-sm hover:shadow-2xl hover:bg-secondary hover:border-secondary hover:translate-x-1 ease-linear duration-500 flex items-center justify-between py-3 px-8 sm:w-fit lg:w-fit "
            >
              <span>{btn.link.label}</span>
              <span className="ml-auto lg:hidden" aria-hidden>
                <ChevronDouble />
              </span>
              <span className="ml-3 hidden lg:inline-block" aria-hidden>
                <ChevronSingle />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Banner;
