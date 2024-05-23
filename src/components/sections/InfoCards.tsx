import { GetServerUrl } from '@/lib/Networking';
import { StrapiLinkV2 } from '@/types/StrapiData';
import { StrapiImage } from '@/types/StrapiImage';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import { useAppSelector } from '@/store/types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Represents a property object with a `content` property that contains an array of `infoCards`.
 * @interface IProp
 * @property {Object[]} content - The content object containing an array of `infoCards`.
 * @property {infoCards[]} content.infoCards - The array of `infoCards`.
 */
interface IProp {
  content: {
    infoCards: infoCards[];
  };
  inSidebar:boolean;
}
/**
 * Represents an information card with the following properties:
 * @property {number} id - The unique identifier of the card.
 * @property {string} title - The title of the card.
 * @property {string} description - The description of the card.
 * @property {StrapiImage} image - The image associated with the card.
 * @property {object} linkTo - The link to another page.
 *   @property {object} data - The data object containing the attributes of the link.
 *     @property {object} attributes - The attributes of the link.
 *       @property {string} PageName - The name of the page to link to.
 */
interface infoCards {
  id: number;
  title: string;
  description: string;
  image: StrapiImage;
  linkTo: StrapiLinkV2;
}
/**
 * Renders a grid of information cards based on the provided content.
 * @param {IProp} content - The content object containing the information cards data.
 * @returns JSX element representing the grid of information cards.
 */
const InfoCards = ({ content , inSidebar }: IProp) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {content?.infoCards?.map((item, index) => (
          <div key={index}>
            <Link href={item?.linkTo?.data?.attributes?.slug ?? ''}>
              <div className=" group overflow-hidden relative h-[350px] ease-linear  border-2 shadow-lg hover:shadow-2xl duration-100">
                {isImageLoading && (
                  <Skeleton
                    className="w-full h-full"
                    baseColor="#fff"
                    highlightColor="#ccc"
                  />
                )}
                <Image
                  src={
                    GetServerUrl() + item?.image?.data?.attributes?.url ?? ''
                  }
                  alt={item?.image?.data?.attributes?.alternativeText ?? ''}
                  fill
                  className="w-full overflow-hidden object-cover block h-auto transition ease-linear duration-500 opacity-0"
                  onLoadingComplete={(image) => {
                    image.classList.remove('opacity-0');
                    setIsImageLoading(false);
                  }}
                  loading="lazy"
                />
                <div className="group-hover:top-0 bg-opacity-90 transition-all ease-linear duration-300 h-full bottom-0 z-0 absolute top-[83%] left-0 text-center bg-lightBlack w-full text-white py-3">
                  <div className="p-3 h-full flex flex-col justify-center group-hover:pt-24">
                    <h3 className="resposive-paragraph group-hover:text-2xl group-hover:font-semibold pb-2 mt-[-0.3em]">
                      {item.title}
                    </h3>
                    <div className="flex flex-col justify-between h-full">
                      <p className="text-base line-clamp-3 my-2 w-3/4 text-center mx-auto">
                        {item.description}
                      </p>
                      <div className="flex px-4 py-3 border border-transparent hover:border-white duration-300 transition self-end w-fit">
                        <p className=" flex items-center">
                          {locale === 'en' ? 'Read More' : 'اقرأ المزيد'}{' '}
                          {locale === 'en' ? (
                            <MdOutlineKeyboardDoubleArrowRight size={20} />
                          ) : (
                            <MdOutlineKeyboardDoubleArrowLeft size={20} />
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoCards;
