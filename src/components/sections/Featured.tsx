import { StrapiImage } from '@/types/StrapiImage';
import React from 'react';
import { GetServerUrl } from '@/lib/Networking';
import Image from 'next/image';
import { StrapiButtonV2 } from '@/types/StrapiData';
import Link from 'next/link';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import Title, { LineType } from '../shared/Title';
import LongParagraph from '../shared/LongParagraph';
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
    title: string;
    description: string;
    button: StrapiButtonV2;
    item: {
      title: string;
      image: StrapiImage;
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
/**
 * A component that renders a detailed banner with an image, title, description, and optional button.
 * @param {IProp} props - The props object containing the content for the banner.
 * @returns The rendered detailed banner component.
 */
const Featured = ({ content , inSidebar }: IProp) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 ">
        <div
          className="sm:h-[63vh] flex flex-col content-between"
          style={{ justifyContent: 'flex-end' }}
        >
          <div className="mb-5">
            <Title
              text={content.title}
              textColor={'text-primary'}
              line={LineType.None}
              lineColor={'after:bg-primary'}
              className=""
              fontSize=""
              fontWeight=""
            />
            <p className="py-2">
              <LongParagraph text={content.description} />
            </p>
            <Link
              href={`/${content?.button?.link?.target?.data?.attributes?.slug}`}
              className="px-4 py-2 text-primary md:text-lg  border-2 rounded-md flex gap-3 items-center w-fit border-primary"
            >
              {content.button.link.label}{' '}
              {locale === 'en' ? (
                <MdKeyboardDoubleArrowRight />
              ) : (
                <MdKeyboardDoubleArrowLeft />
              )}
            </Link>
          </div>
          <Link
            href={`/${content?.item[0]?.page?.data?.attributes?.slug}`}
            className={`relative overflow-hidden bg-cover bg-no-repeat`}
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <div className="overflow-hidden h-[25vh]  ">
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
                  content?.item[0]?.image?.data[0]?.attributes?.url
                }
                className="w-full max-w-full h-[20vh] object-cover ease-in-out hover:scale-110 transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                  setIsImageLoading(false);
                }}
                loading="lazy"
                fill={true}
                alt={
                  content?.item[0]?.image?.data[0]?.attributes?.alternativeText
                }
              />
            </div>

            <div className="absolute bottom-0 left-2 right-2  overflow-hidden flex  p-3 items-center">
              <p className=" border-b-2 border-white text-white text-xl font-semibold">
                {content?.item[0]?.title}
              </p>
            </div>
          </Link>
        </div>
        <Link
          href={`/${content?.item[1]?.page?.data?.attributes?.slug}`}
          className="min-h-[65vh] "
        >
          <div
            className={`relative h-auto  overflow-hidden bg-cover bg-no-repeat pt-[23vh]`}
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            <div className="overflow-hidden m-auto min-h-100 h-[40vh]  ">
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
                  content?.item[1]?.image?.data[0]?.attributes?.url
                }
                className="w-full max-w-full  object-cover ease-in-out hover:scale-110 transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                  setIsImageLoading(false);
                }}
                loading="lazy"
                fill={true}
                alt={
                  content?.item[1]?.image?.data[0]?.attributes?.alternativeText
                }
                // width={500}
                // height={500}
              />
            </div>

            <div className="absolute bottom-0 left-2 right-2  overflow-hidden flex  p-3 items-center">
              <p className="border-b-2 border-white text-white text-xl font-semibold">
                {content.item[0].title}
              </p>
            </div>
          </div>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <Link
          href={`/${content?.item[2]?.page?.data?.attributes?.slug}`}
          className={`relative bg-black overflow-hidden bg-cover bg-no-repeat `}
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <div className="overflow-hidden h-[25vh]  ">
            {isImageLoading && (
              <Skeleton
                className="w-full h-full"
                baseColor="#fff"
                highlightColor="#ccc"
              />
            )}
            <Image
              src={
                GetServerUrl() + content.item[2].image.data[0].attributes.url
              }
              fill={true}
              alt={
                content?.item[2]?.image?.data[0]?.attributes?.alternativeText
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
            <p className="border-b-2 w-fit border-white ">
              {content.item[2].title}
            </p>
          </div>
        </Link>
        <Link
          href={`/${content?.item[3]?.page?.data?.attributes?.slug}`}
          className={`relative bg-black overflow-hidden bg-cover bg-no-repeat `}
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <div className="overflow-hidden h-[25vh]  ">
            {isImageLoading && (
              <Skeleton
                className="w-full h-full"
                baseColor="#fff"
                highlightColor="#ccc"
              />
            )}
            <Image
              src={
                GetServerUrl() + content.item[3].image.data[0].attributes.url
              }
              fill={true}
              alt={
                content?.item[3]?.image?.data[0]?.attributes?.alternativeText
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
            <p className=" border-b-2 w-fit border-white text-xl font-semibold">
              {content.item[3].title}
            </p>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Featured;
