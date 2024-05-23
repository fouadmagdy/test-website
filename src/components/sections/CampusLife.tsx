import Image from 'next/image';
import React, { useCallback, useState } from 'react';
import SectionHeader from './SectionHeader';

// import { useAppSelector } from '@/store/types';
import { ImageProp } from '@/types/image.types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
/**
 * Represents the properties of a CampusLife component.
 * @interface CampusLife_Props
 * @property {object} content - The content of the CampusLife component.
 * @property {string} content.title - The title of the CampusLife component.
 * @property {object} content.button - The button object of the CampusLife component.
 * @property {number} content.button.id - The ID of the button.
 * @property {string} content.button.buttonText - The text of the button.
 * @property {object} content.button.buttonLink - The button link object of the CampusLife component.
 * @property {object} content.button.buttonLink.data - The data object of the button link.
 * @property {object}
 */
interface CampusLife_Props {
  content: {
    id: number;
    __component: string;
    sectionHeader: {
      id: 1;
      title: string;
      button: {
        id: 9;
        theme: string;
        link: {
          id: number;
          label: string;
          target: {
            data: {
              attributes: {
                slug: string;
              };
            };
          };
        };
      };
    };

    facilities: {
      id: number;
      button: {
        id: number;
        link: {
          label: string;
          target: {
            data: {
              attributes: {
                slug: string;
              };
            };
          };
        };
      };
      image: ImageProp;
    }[];
  };
}

/**
 * A functional component that renders the CampusLife section.
 * @param {CampusLife_Props} props - The props object containing the content for the section.
 * @returns The rendered CampusLife section.
 */
const CampusLife: React.FC<CampusLife_Props> = ({ content }) => {
  const [currentImage, setCurrentImage] = useState<ImageProp>(
    content.facilities[0].image,
  );
  const [hoveredButton, setHoveredButton] = useState<number | null>(null);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  const handleButtonHover = useCallback((image: ImageProp, id: number) => {
    setCurrentImage(image);
    setHoveredButton(id);
  }, []);

  return (
    <section className="md:pt-40 overflow-hidden campus-life-clipt bg-softBeige">
      <div className="sm:p-0 sm:container m-auto">
      <div className=" relative overflow-visible">

        <SectionHeader
          sectionTitle={content?.sectionHeader?.title}
          mainSectionLink={content?.sectionHeader?.button}
        />
      <div
        id="mobile_view"
        className="flex flex-col justify-center items-center"
      >
        <div className="sm:hidden">
          {content.facilities.map((facility) => (
            <div key={facility?.id} className="relative mb-4">
              {isImageLoading && (
                <Skeleton
                  className="w-full h-full"
                  baseColor="#fff"
                  highlightColor="#ccc"
                />
              )}
              <Image
                className="w-full transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                  setIsImageLoading(false);
                }}
                loading="lazy"
                alt={facility?.image?.data?.attributes?.alternativeText || ''}
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${facility?.image?.data?.attributes?.url}`}
                width={500}
                height={300}
              />
              <a
                href={`/${facility?.button?.link?.target?.data?.attributes?.slug}`}
                className="absolute py-3  w-full bottom-0 text-center   text-white hover:text-secondary bg-secondary hover:bg-cyan-400 "
              >
                {facility?.button?.link?.label}
              </a>
            </div>
          ))}
        </div>
      </div>

      {/* Large Screen View */}
      <div className="hidden container sm:flex pb-[35rem] relative my-auto">
        <div className=" flex-1 absolute left-0 right-0 bottom-0 top-0 md:top-10 z-20 w-1/2 items-center">
          <div className="h-96 rounded-xl shadow-md relative">
            <div className="flex">
              <Image
                className="rounded-xl shadow-md transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) =>
                  image.classList.remove('opacity-0')
                }
                alt={currentImage?.data?.attributes?.alternativeText || ''}
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${currentImage?.data?.attributes?.url}`}
                fill={true}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </div>
        </div>
        <div className=" flex-1 absolute top-0 end-0 bottom-0 w-[55%] ms-10">
          <div className="flex flex-col bg-white ps-16 p-10 lg:p-20 gap-6 ms-10 rounded-2xl">
            {content.facilities.map((facility) => (
              <a
                key={facility?.id}
                href={`/${facility?.button?.link?.target?.data?.attributes?.slug}`}
                className={`whitespace-nowrap sm:px-2 md:px-6 lg:px-20 py-4 lg:mx-2 rounded-md text-gray-900 hover:text-secondary text-base font-semibold border-2 border-transparent hover:border-secondary ${
                  hoveredButton === facility?.id ? 'bg-white' : ' bg-gray-100'
                }`}
                onMouseEnter={() =>
                  handleButtonHover(facility?.image, facility?.id)
                }
                onMouseLeave={() => setHoveredButton(null)}
              >
                {facility?.button?.link?.label}
              </a>
            ))}
          </div>
        </div>
      </div>
      </div>
    </div>
  </section>
  );
};

export default CampusLife;
