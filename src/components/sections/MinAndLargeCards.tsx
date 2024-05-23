import { StrapiImage } from '@/types/StrapiImage';
import React from 'react';
import { GetServerUrl } from '@/lib/Networking';
import Image from 'next/image';
import { StrapiButtonV2 } from '@/types/StrapiData';
import SectionHeader from './SectionHeader';
import Link from 'next/link';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import { useAppSelector } from '@/store/types';
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
    sectionHeader: {
      title: string;
      button: StrapiButtonV2;
    };
    events: {
      data: {
        id: number;
        attributes: {
          title: string;
          description: string;
          slug: string;
          images: StrapiImage;
        };
      }[];
    };
    targetPage: {
      data: {
        attributes: {
          title: string;
          slug: string;
        };
      };
    };
  };
  inSidebar: boolean;
}
/**
 * A component that renders a detailed banner with an image, title, description, and optional button.
 * @param {IProp} props - The props object containing the content for the banner.
 * @returns The rendered detailed banner component.
 */
const MinAndLargeCards = ({ content, inSidebar }: IProp) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <SectionHeader
        sectionTitle={content.sectionHeader.title}
        mainSectionLink={content.sectionHeader.button}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto gap-7">
        {content.events.data.map((item, index) => (
          <div
            key={index}
            className={`relative bg-black overflow-hidden bg-cover bg-no-repeat ${
              index % 3 !== 0 ? 'md:col-span-2' : ''
            }`}
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <div className="overflow-hidden h-[40vh]  ">
              {isImageLoading && (
                <Skeleton
                  className="w-full h-full"
                  baseColor="#fff"
                  highlightColor="#ccc"
                />
              )}
              <Image
                src={
                  GetServerUrl() +
                  item.attributes?.images?.data[0]?.attributes?.url
                }
                fill={true}
                alt={
                  item.attributes?.images?.data[0]?.attributes?.alternativeText
                }
                // width={800}
                // height={500}
                className="w-full max-w-full object-cover ease-in-out hover:scale-110 transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                  setIsImageLoading(false);
                }}
                loading="lazy"
              />
            </div>
            <div className="absolute bottom-0 left-2 right-1 text-white overflow-hidden  py-3 items-center">
              <h4>{item.attributes.title}</h4>
              <p className="line-clamp-2 my-2">{item.attributes.description}</p>
              <Link
                href={
                  content?.targetPage?.data?.attributes?.slug !== undefined
                    ? `/${content?.targetPage?.data?.attributes?.slug}/${item?.id}`
                    : ''
                }
                // className="p-3 text-sm border-2 rounded-full flex gap-3 items-center w-fit border-white"
                className={`basis-1/6 text-white group bg-transparent border-2 border-white text-sm rounded-full text-center flex gap-5 items-center max-w-fit px-4 py-2 hover:bg-secondary duration-500 ease-linear transition-transform transform hover:translate-x-1`}
              >
                {locale === 'en' ? 'Read more' : 'اقرأ المزيد'}{' '}
                {locale === 'en' ? (
                  <MdKeyboardDoubleArrowRight />
                ) : (
                  <MdKeyboardDoubleArrowLeft />
                )}
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MinAndLargeCards;
