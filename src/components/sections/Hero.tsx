import React from 'react';
import { ImageProp } from '@/types/image.types';
import Image from 'next/image';
import ChevronDouble from '../icons/chevron-double-right';
import ChevronSingle from '../icons/chevron-single-right.jsx';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Represents the properties of a hero component.
 * @typedef {Object} HeroProps
 * @property {Object} content - The content of the hero component.
 * @property {string} content.title - The title of the hero component.
 * @property {ImageProp} content.image - The image of the hero component.
 * @property {string} content.paragraph - The paragraph of the hero component.
 * @property {Object} content.first_btn - The first button of the hero component.
 * @property {string} content.first_btn.buttonText - The text of the first button.
 * @property {Object} content.first_btn.buttonLink - The link of the first button.
 * @property {Object} content.first_btn.button
 */
interface HeroProps {
  content: {
    title: string;
    image: ImageProp;
    paragraph: string;
    buttons: {
      id: number;
      theme: string;
      link: {
        id: number;
        label: string;
        target: {
          data: {
            id: number;
            attributes: {
              title: string;
              slug: string;
            };
          };
        };
        isExternal: boolean;
        externalLink: string;
      };
    }[];
  };
}

/**
 * A functional component that represents a hero section with dynamic content.
 * @param {HeroProps} props - The props object containing the content for the hero section.
 * @returns JSX element representing the hero section.
 */
const Hero: React.FC<HeroProps> = ({ content }) => {
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  return (
    <section id="hero" className="relative">
      <div className="h-[87vh] image">
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
            width={700}
            height={700}
            priority
            alt={content?.image?.data?.attributes?.alternativeText || ''}
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content?.image.data?.attributes.url}`}
          />
        )}

        {/* {content?.image.data?.attributes.url ? (
          isLoading?
            <Skeleton className='w-full h-full'/>
              :
              <Image
                className="object-cover w-full h-full transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0')
                  setIsImageLoading(false)
                } }
                loading="lazy"
                width={700}
                height={700}
                alt={content?.image?.data?.attributes?.alternativeText || ''}
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content?.image.data?.attributes.url}`}
                style={{
                  clipPath:
                    'polygon(50% 0%, 100% 0, 100% 35%, 100% 85%, 73% 100%, 27% 85%, 0 100%, 0% 35%, 0 0)',
                }}
              />
          
        ) : null} */}
      </div>
      <div
        id="hero-content"
        // p-4 xs:w-3/4 sm:w-2/4 xs:left-5 lg:left-9

        className="absolute bg-black rounded-sm text-white bg-opacity-70 top-1/4 m-4 lg:m-16 lg:ms-32 p-4 lg:p-6 border-s-2 lg:border-s-[7px] lg:w-[35%]"
      >
        {content?.title ? <h1 className="mb-4">{content.title}</h1> : null}
        {content?.paragraph ? (
          <p className="leading-snug text-base">{content?.paragraph}</p>
        ) : null}
        <div className="flex flex-col lg:flex-row items-start">
          {content?.buttons.map((button, index) => (
            <a
              key={index}
              role="button"
              target={button?.link?.isExternal ? '_blank' : '_self'}
              className="font-semibold bg-transparent border-2 rounded-3xl m-2 shadow-sm hover:shadow-2xl hover:bg-secondary hover:border-secondary hover:translate-x-1 ease-linear duration-500 flex items-center justify-between py-3 px-4 w-44 lg:w-fit"
              href={
                button?.link?.isExternal
                  ? button?.link?.externalLink
                  : button?.link?.target?.data?.attributes?.slug || ''
              }
            >
              <span>{button?.link?.label}</span>
              <span className="ms-auto lg:hidden">
                <ChevronDouble />
              </span>
              <span className="hidden lg:inline-block ms-3">
                <ChevronSingle />
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
