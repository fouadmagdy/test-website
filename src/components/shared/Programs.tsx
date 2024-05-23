// import { GetServerUrl } from '@/lib/Networking';
import Image from 'next/image';
import React from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
/**
 * Interface representing the props for a component that displays a list of cards.
 * @interface Props
 * @property {Array} cardData - An array of objects representing the data for each card.
 * Each object has the following properties:
 *   - id: number - The unique identifier for the card.
 *   - buttonText: string - The text to display on the button of the card.
 *   - image: object - An object representing the image data for the card. It has the following properties:
 *     - data: object - An object representing the attributes of the image. It has the following properties:
 *       - name: string - The name of the image.
 *       - alternativeText: string - The alternative text
 */
interface ProgramProps {
  photoLink: {
    id: 1;
    buttonText: string;
    image: {
      data: {
        id: number;
        attributes: {
          alternativeText: string;

          url: string;
        };
      };
    };
    page?: {
      data?: {
        id: 30;
        attributes: {
          slug: 'home';
        };
      };
    };
  }[];
}
/**
 * Renders a list of program cards.
 * @param {Props} photoLink - The data for the program cards.
 * @returns The rendered program cards.
 */
function Programs({ photoLink }: ProgramProps) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className="mx-0">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {photoLink.map((card, index) => (
          <a
            role="button"
            aria-label={card?.buttonText}
            title={card?.buttonText}
            className="relative overflow-hidden group card  "
            key={index}
            href={card.page?.data?.attributes?.slug || ''}
            type="button"
          >
            <div className="overflow-hidden h-80 relative">
              {isImageLoading && (
                <Skeleton
                  className="w-full h-full"
                  baseColor="#fff"
                  highlightColor="#ccc"
                />
              )}
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${card?.image?.data?.attributes?.url}`}
                alt={card?.image?.data?.attributes?.alternativeText}
                fill={true}
                // width={100}
                // height={100}
                sizes="(max-width: 600px) 100vw, (max-width: 1200px) 50vw, 33vw"  
                className="w-full max-w-full object-cover transition duration-300 ease-in-out hover:scale-110 opacity-0"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                  setIsImageLoading(false);
                }}
                loading="lazy"
              />
            </div>
            <div className="absolute grid w-full sm:grid-cols-12 -bottom-0">
              <div className="sm:col-span-2"></div>
              <div className="py-3 relative overflow-hidden tracking-widest font-semibold text-center text-black transition duration-1000 ease-linear bg-white sm:text-sm md:text-base lg:text-base xl:text-base sm:col-span-8 group-hover:text-white before:absolute before:bg-secondary before:w-full before:h-1 before:bottom-0 before:left-0 group-hover:before:h-60 before:transition-all before:duration-[1000ms] before:ease-in-out  before:z-0">
                <span className="relative z-10 text-xl font-extrabold">{card.buttonText}</span>
              </div>
              <div className="sm:col-span-2"></div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

export default Programs;
