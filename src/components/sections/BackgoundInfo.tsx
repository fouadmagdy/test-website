import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import LongParagraph from '../shared/LongParagraph';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
/**
 * Represents the properties of a background info component.
 * @typedef {Object} BackgoundInfoProps
 * @property {Object} content - The content of the background info component.
 * @property {string} content.__component - The component type.
 * @property {string} content.title - The title of the background info.
 * @property {string} content.description - The description of the background info.
 * @property {Object} content.button - The button object.
 * @property {string} content.button.buttonText - The text of the button.
 * @property {Object} content.button.buttonLink - The link object of the button.
 * @property {Object} content.button.buttonLink.data - The data object of the
 */
interface BackgoundInfoProps {
  content: {
    __component: string;
    title: string;
    description: string;
    button: {
      buttonText: string;
      buttonLink: {
        data: {
          attributes: {
            PageName: string;
            url: string;
          };
        };
      };
    };
    backgroundImage: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}
/**
 * Renders a component that displays background information with an image, title, description, and button.
 * @param {BackgoundInfoProps} props - The props object containing the content to be displayed.
 * @returns The rendered component.
 */
const BackgoundInfo = ({ content }: BackgoundInfoProps) => {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  if (!content) return;
  return (
    <div className=" relative h-full overflow-hidden pb-72">
      {isImageLoading && (
        <Skeleton
          className="w-full h-full"
          baseColor="#fff"
          highlightColor="#ccc"
        />
      )}
      <Image
        src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content?.backgroundImage.data?.attributes?.url}`}
        className="w-screen max-h-[550px] object-cover transition-opacity opacity-0 duration-100"
        onLoadingComplete={(image) => {
          image.classList.remove('opacity-0');
          setIsImageLoading(false);
        }}
        loading="lazy"
        alt="Louvre"
        width={500}
        height={500}
      />
      <div
        className=" md:absolute relative md:-translate-y-60 -translate-y-12 z-10  w-[300px] md:w-[1000px] left-20 md:left-1/4"
        style={{ backgroundColor: 'rgba(238,236,236,1)' }}
      >
        <div className="shadow-sm p-10  text-center">
          <h2 className="text-4xl font-extrabold text-primary p-5">
            {content?.title}
          </h2>

          <p className="mb-4 mt-2 text-2xl p-3">
            <LongParagraph text={content?.description} />
          </p>

          <Link
            href={`/${content?.button?.buttonLink?.data?.attributes?.PageName}`}
          >
            <div className="w-fit px-16 py-5 m-auto bg-secondary text-white font-bold text-xl rounded">
              {content?.button?.buttonText}
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BackgoundInfo;
