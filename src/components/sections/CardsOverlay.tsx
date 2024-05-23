import React from 'react';
import Image from 'next/image';
import Title, { LineType } from '../shared/Title';
import { GetServerUrl } from '@/lib/Networking';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
/**
 * Represents the props for the CardsOverlay component.
 * @interface CardsOverlayProps
 * @property {object} content - The content of the overlay.
 * @property {number} content.id - The ID of the content.
 * @property {string} content.__component - The component type of the content.
 * @property {string} content.title - The title of the content.
 * @property {object[]} content.cardItem - An array of card items.
 * @property {number} content.cardItem.id - The ID of the card item.
 * @property {string} content.cardItem.title - The title of the card item.
 * @property {object} content.cardItem.titleLink - The title link of the card item
 */
interface CardsOverlayProps {
  content: {
    id: number;
    __component: string;
    title: string;
    cardItem: {
      id: number;
      title: string;
      titleLink: {
        data?: {
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
            alternativeText: string;
            width: number;
            height: number;
            url: string;
          };
        };
      };
    }[];
  };
  inSidebar:boolean;
}
/**
 * A functional component that renders a cards overlay with a title and a grid of card items.
 * @param {CardsOverlayProps} props - The component props.
 * @returns The rendered cards overlay component.
 */
const CardsOverlay: React.FC<CardsOverlayProps> = ({ content, inSidebar }) => {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      {content.title ? (
        <Title
          text={content.title}
          textColor={'text-primary'}
          fontSize={''}
          fontWeight={'font-bold'}
          line={LineType.Under}
          lineColor={'after:bg-primary'}
        />
      ) : (
        ''
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-auto pt-6  gap-7">
        {content.cardItem.map((item, index) => (
          <div
            key={index}
            className="relative max-w-md overflow-hidden bg-cover bg-no-repeat"
            data-te-ripple-init
            data-te-ripple-color="light"
          >
            {isImageLoading && (
              <Skeleton
                className="w-full h-full"
                baseColor="#fff"
                highlightColor="#ccc"
              />
            )}
            <Image
              src={GetServerUrl() + item.image.data.attributes.url}
              className="max-w-md h-[300px] transition-opacity opacity-0 duration-100"
              onLoadingComplete={(image) => {
                image.classList.remove('opacity-0');
                setIsImageLoading(false);
              }}
              loading="lazy"
              alt="Louvre"
              width={500}
              height={500}
            />
            <a href={item.titleLink.data?.attributes.PageName}>
              <div className="absolute bottom-2 left-2 right-2 top-2  overflow-hidden bg-primary bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-100 hover:bg-opacity-50 flex justify-center items-center">
                <p className="text-white text-xl font-semibold">{item.title}</p>
              </div>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CardsOverlay;
