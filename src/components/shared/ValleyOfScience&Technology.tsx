import React from 'react';
import Image from 'next/image';
import { GetServerUrl } from '@/lib/Networking';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
/**
 * Represents the props for the ValleyOfScienceAndTechnology component.
 * @interface ValleyOfScienceAndTechnologyProps
 * @property {object} content - The content object for the component.
 * @property {number} content.id - The ID of the component.
 * @property {string} content.__component - The component type.
 * @property {string} content.title - The title of the component.
 * @property {string} content.description - The description of the component.
 * @property {object} content.image - The image object for the component.
 * @property {ImageComponent[]} content.image.data - The data for the image component.
 * @property {object} content.pageLink - The page link object for the component.
 */
interface ValleyOfScienceAndTechnologyProps {
  content: {
    id: number;
    __component: string;
    title: string;
    description: string;
    image: {
      data: ImageComponent[];
    };
    pageLink: {
      buttonText: string;
      pageHyperlink: {
        data: {
          id: number;
          attributes: {
            PageName: string;
            url: string;
          };
        };
      };
    };
  };
}

/**
 * Represents an image component with its attributes.
 * @interface ImageComponent
 * @property {object} attributes - The attributes of the image component.
 * @property {string} attributes.alternativeText - The alternative text for the image.
 * @property {string} attributes.url - The URL of the image.
 * @property {number} attributes.width - The width of the image.
 * @property {number} attributes.height - The height of the image.
 */
interface ImageComponent {
  attributes: {
    alternativeText: string;
    url: string;
    width: number;
    height: number;
  };
}
/**
 * A React functional component that renders the Valley of Science and Technology section.
 * @param {ValleyOfScienceAndTechnologyProps} props - The component props.
 * @returns The rendered JSX elements.
 */
const ValleyOfScienceAndTechnology: React.FC<
  ValleyOfScienceAndTechnologyProps
> = ({ content }) => {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  if (!content) return;
  return (
    <section
      id="Valley Of Science And Technology"
      className="container mx-auto px-10 lg:px-20"
    >
      <div className="flex flex-col md:grid md:grid-cols-12 ">
        {/* left side */}
        <div className="min-[320px]:col-span-12 md:col-span-6 md:mt-28">
          <h2 className="min-[320px]:text-center md:text-start text-justify px-2 ps-8  my-3 text-3xl font-semibold text-primary border-s-4 border-secondary   leading-snug	">
            {content?.title}
          </h2>
          <p className="min-[320px]:text-center md:text-start text-justify resposive-paragraph my-5 mb-8 font-medium   leading-relaxed">
            {content?.description}
          </p>
          <div className="min-[320px]:text-center md:text-start text-justify">
            {/* <button className="  bg-secondary hover:bg-secondary_light px-14 py-3 rounded text-white font-semibold mb-5">
              {content.pageLink.buttonText}
            </button> */}
          </div>
        </div>

        {/* image grid */}
        <div className="min-[320px]:col-span-12 md:col-span-6">
          {/* left side */}
          <div className="flex flex-row justify-between py-8 my-3 gap-x-5 xl:gap-2 mx-12">
            <div className="min-[320px]:col-span-12 md:col-span-6 md:pt-16">
              <div className="image-container overflow-hidden my-5 md:my-7 lg:my-10">
                {isImageLoading && (
                  <Skeleton
                    className="w-full h-full"
                    baseColor="#fff"
                    highlightColor="#ccc"
                  />
                )}
                <Image
                  src={
                    GetServerUrl() + content?.image?.data[0]?.attributes?.url
                  }
                  alt={content?.image?.data[0]?.attributes?.alternativeText}
                  width={270}
                  height={370}
                  className="mx-auto ease-linear hover:scale-125 transition-opacity opacity-0 duration-100"
                  onLoadingComplete={(image) => {
                    image.classList.remove('opacity-0');
                    setIsImageLoading(false);
                  }}
                  loading="lazy"
                />
              </div>
              <div className="image-container overflow-hidden my-5 md:my-7 lg:my-10">
                {isImageLoading && (
                  <Skeleton
                    className="w-full h-full"
                    baseColor="#fff"
                    highlightColor="#ccc"
                  />
                )}
                <Image
                  src={
                    GetServerUrl() + content?.image?.data[1]?.attributes?.url
                  }
                  alt={content?.image?.data[1]?.attributes?.alternativeText}
                  width={270}
                  height={370}
                  className="mx-auto ease-linear hover:scale-125 transition-opacity opacity-0 duration-100"
                  onLoadingComplete={(image) => {
                    image.classList.remove('opacity-0');
                    setIsImageLoading(false);
                  }}
                  loading="lazy"
                />
              </div>
            </div>
            {/* right side */}
            <div className="min-[320px]:col-span-12 md:col-span-6">
              <div className="image-container overflow-hidden my-5 md:my-7 lg:my-10">
                {isImageLoading && (
                  <Skeleton
                    className="w-full h-full"
                    baseColor="#fff"
                    highlightColor="#ccc"
                  />
                )}
                <Image
                  src={
                    GetServerUrl() + content?.image?.data[2]?.attributes?.url
                  }
                  alt={content?.image?.data[2]?.attributes?.alternativeText}
                  width={270}
                  height={370}
                  className="mx-auto ease-linear hover:scale-125 transition-opacity opacity-0 duration-100"
                  onLoadingComplete={(image) => {
                    image.classList.remove('opacity-0');
                    setIsImageLoading(false);
                  }}
                  loading="lazy"
                />
              </div>
              <div className="image-container overflow-hidden my-5 md:my-7 lg:my-10">
                {isImageLoading && (
                  <Skeleton
                    className="w-full h-full"
                    baseColor="#fff"
                    highlightColor="#ccc"
                  />
                )}
                <Image
                  src={
                    GetServerUrl() + content?.image?.data[3]?.attributes?.url
                  }
                  alt={content?.image?.data[3]?.attributes?.alternativeText}
                  width={270}
                  height={370}
                  className="mx-auto ease-linear hover:scale-125 transition-opacity opacity-0 duration-100"
                  onLoadingComplete={(image) => {
                    image.classList.remove('opacity-0');
                    setIsImageLoading(false);
                  }}
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ValleyOfScienceAndTechnology;
