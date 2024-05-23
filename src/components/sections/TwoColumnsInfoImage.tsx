import React from 'react';
import Image from 'next/image';
import Title, { LineType } from '../shared/Title';
import Link from 'next/link';
import { IButton } from '../../types/button.types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Represents the props for the TwoColumnsInfoImage component.
 * @typedef {Object} TwoColumnsInfoImage_Props
 * @property {Object} content - The content of the component.
 * @property {number} content.id - The ID of the content.
 * @property {string} content.__component - The component type.
 * @property {string} content.firstParagraph - The first paragraph of the content.
 * @property {string} [content.title] - The title of the content (optional).
 * @property {Object} [content.image] - The image object.
 * @property {Object} content.image.data - The data of the image.
 * @property {Object} content.image.data.attributes - The attributes of
 */
interface TwoColumnsInfoImage_Props {
  content: {
    id: number;
    __component: string;
    firstParagraph: string;
    title?: string;
    image?: {
      data: {
        attributes: {
          url: string;
          hash: string;
        };
      };
    };
    button: IButton;
  };
  reverse?: boolean;
  inSidebar:boolean;
}

/**
 * A React functional component that renders a two-column layout with information and an image.
 * @param {TwoColumnsInfoImage_Props} props - The component props.
 * @param {string} props.content - The content to display in the component.
 * @param {boolean} props.reverse - Determines if the order of the columns should be reversed.
 * @returns The rendered component.
 */
const TwoColumnsInfoImage: React.FC<TwoColumnsInfoImage_Props> = ({
  content,
  reverse,
  inSidebar
}) => {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <div className="grid justify-end grid-cols-1 gap-24 lg:grid-cols-2">
        <header className={reverse ? 'order-2' : ''}>
          {content?.title ? (
            <Title
              text={content?.title}
              textColor={'text-primary'}
              fontSize={''}
              fontWeight={'font-bold'}
              line={LineType.Before}
              lineColor={'before:bg-secondary'}
              id="section-title"
              aria-labelledby="section-title"
            />
          ) : (
            ''
          )}
          <article className="py-5 ">{content?.firstParagraph}</article>
          {content?.button?.link ? (
            <Link
              id="call-to-action"
              aria-labelledby="call-to-action"
              href={content.button?.link?.target?.data?.attributes?.slug}
              className="text-white   rounded-md text-center flex gap-5 items-center max-w-fit px-8 py-4  duration-500 ease-linear hover:bg-secondary transition-transform transform hover:translate-x-1 bg-primary"
            >
              {content?.button?.link?.label}
            </Link>
          ) : (
            ''
          )}
        </header>
        <div
          className={`text-center overflow-hidden  ${
            reverse ? 'order-1 ' : ''
          }`}
        >
          {isImageLoading && (
            <Skeleton
              className="w-full h-full"
              baseColor="#fff"
              highlightColor="#ccc"
            />
          )}
          <Image
            className="w-full transition duration-500 ease-linear hover:scale-125 rounded-lt-[110px] opacity-0"
            onLoadingComplete={(image) => {
              image.classList.remove('opacity-0');
              setIsImageLoading(false);
            }}
            alt={`Image of ${content.title}`}
            loading="lazy"
            src={`https://strapi.zcltsdev.com${content?.image?.data?.attributes?.url}`}
            width={500}
            height={500}
          />
        </div>
      </div>
    </div>
  );
};

export default TwoColumnsInfoImage;
