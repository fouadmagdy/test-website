import React from 'react';
import Title, { LineType } from '../shared/Title';
import VideoSlider from '../shared/slider/VideoSlider';
import Button from '../shared/Button';
import PaddingComponent from '../shared/PaddingComponent';

/**
 * Represents the props for a VideoCarousel component.
 * @interface VideoCarousel_Props
 * @property {object} content - The content of the video carousel.
 * @property {number} content.id - The ID of the video carousel.
 * @property {string} content.__component - The component type of the video carousel.
 * @property {string} content.title - The title of the video carousel.
 * @property {string} content.description - The description of the video carousel.
 * @property {object} [content.button] - The button object of the video carousel.
 * @property {number} content.button.id - The ID of the button.
 * @property {string} [content.button.buttonText] - The text
 */
interface VideoCarousel_Props {
  content: {
    id: number;
    __component: string;
    title: string;
    description: string;
    button?: {
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
    mediaLinks: [
      {
        id: number;
        link: string;
        image: {
          data: {
            attributes: {
              name: string;
              alternativeText: string;
              url: string;
            };
          };
        };
      },
    ];
  };
  inSidebar:boolean;
}

/**
 * A functional component that renders a video carousel.
 * @param {VideoCarousel_Props} props - The props for the VideoCarousel component.
 * @returns The rendered video carousel component.
 */
const VideoCarousel: React.FC<VideoCarousel_Props> = ({ content , inSidebar }) => {
  if (!content) return;
  return (
    <div>
      <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 mx-auto`}>
        <div className="m-auto text-center ">
          <Title
            text={content?.title}
            textColor={'text-primary'}
            fontSize={''}
            fontWeight={'font-bold'}
            line={LineType.Center}
            lineColor={'after:bg-gray-100'}
            className="m-auto"
          />
          <p className="py-5 md:py-10  md:text-grey_dark font-bold w-full lg:w-1/2 m-auto text-md lg:text-lg">
            {content?.description}
          </p>
        </div>
        <VideoSlider
          sliderData={content?.mediaLinks}
          classNames={'mt-6 mx-3 lg:mx-0'}
        />
        <a
          href={`${content?.button?.link?.target?.data?.attributes?.slug}`}
          className="flex justify-center mt-12"
        >
          <Button
            text={content?.button?.link?.label as string}
            backgroundColor="bg-primary"
            fontSize="text-xl"
          />
        </a>
      </div>
      <PaddingComponent/>
    </div>
  );
};

export default VideoCarousel;
