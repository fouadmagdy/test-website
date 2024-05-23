import React from 'react';
import './FlippingCards.css';
import Image from 'next/image';
import { GetServerUrl } from '@/lib/Networking';
import Title, { LineType } from '@/components/shared/Title';
import Link from 'next/link';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Interface representing the props for a flipping cards component.
 * @interface FlippingCards_props
 * @property {object[]} content - The content of the flipping cards component.
 * @property {number} content.id - The ID of the flipping cards component.
 * @property {string} content.__component - The component type of the flipping cards component.
 * @property {object[]} content.cardItem - The individual card items within the flipping cards component.
 * @property {number} content.cardItem.id - The ID of the card item.
 * @property {string} content.cardItem.title - The title of the card item.
 * @property {object} content.cardItem.titleLink - The link associated with the title of the card item
 */
interface FlippingCards_props {
  content: {
    id: number;
    __component: string;
    cardItem: {
      id: number;
      title: string;
      titleLink: {
        data: {
          id: number;
          attributes: {
            PageName: string;
            url: string;
          };
        };
      };
      image: {
        data: {
          id: number;
          attributes: {
            name: string;
            alternativeText?: string;
            caption: string;
            width: 512;
            height: 512;
            url: string;
          };
        };
      };
    }[];
  };
  inSidebar:boolean;
}
/**
 * A React functional component that renders a set of flipping cards.
 * @param {FlippingCards_props} props - The component props.
 * @returns The rendered JSX elements.
 */
const FlippingCards: React.FC<FlippingCards_props> = ({ content , inSidebar }) => {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <div className="">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {content.cardItem.map((item, index) => (
            <div
              className=" min-h-[150px] md:min-h-[200px] flip-card "
              key={index}
            >
              <Link href={item?.titleLink?.data?.attributes?.PageName ?? ''}>
                <div className="flip-card-inner text-white ">
                  <div className="flip-card-front bg-secondary flex justify-center items-center  text-2xl">
                    <Title
                      text={item.title}
                      textColor={'text-white'}
                      fontSize={''}
                      fontWeight={'font-bold'}
                      line={LineType.Under}
                      lineColor={'after:bg-white'}
                    />
                  </div>
                  <div className="flip-card-back  bg-primary flex items-center justify-center">
                    {isImageLoading && (
                      <Skeleton
                        className="w-full h-full"
                        baseColor="#fff"
                        highlightColor="#ccc"
                      />
                    )}
                    {item?.image && item?.image?.data && (
                      <Image
                        src={
                          GetServerUrl() + item?.image?.data?.attributes?.url
                        }
                        alt={
                          item?.image?.data?.attributes?.alternativeText ?? ''
                        }
                        width={150}
                        height={150}
                        className="transition-opacity opacity-0 duration-100"
                        onLoadingComplete={(image) => {
                          image.classList.remove('opacity-0');
                          setIsImageLoading(false);
                        }}
                        loading="lazy"
                      />
                    )}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlippingCards;
