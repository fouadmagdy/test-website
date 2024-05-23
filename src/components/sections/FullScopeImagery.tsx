import React from 'react';
import Image from 'next/image';
import Title, { LineType } from '../shared/Title';
import { ImageProp } from '@/types/image.types';
import LongParagraph from '../shared/LongParagraph';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface IProp {
  content: {
    title: string;
    description: string;
    media: ImageProp;
  };
  inSidebar:boolean;
}
function FullScopeImagery({ content , inSidebar }: IProp) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      {/* <div className="my-5 max-w-4 leading-10"> */}

      {content.title ? (
        <Title
          text={content.title}
          textColor={'text-primary'}
          fontSize={''}
          fontWeight={'font-bold'}
          line={LineType.Before}
          lineColor={'after:bg-primary'}
          className="max-w-2xl  "
        />
      ) : null}
      {/* </div> */}
      {content.description && (
        <p className="font-normal mb-4 my-4 text-justify text-gray-700 text-base pb-5  leading-loose">
          <LongParagraph text={content.description} />
        </p>
      )}
      <div className="overflow-hidden  my-8">
        {isImageLoading && (
          <Skeleton
            className="w-full h-full"
            baseColor="#fff"
            highlightColor="#ccc"
          />
        )}
        <Image
          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content.media.data?.attributes?.url}`}
          // fill={true}
          alt={content.media.data?.attributes?.alternativeText || ''}
          width={900}
          height={500}
          // object-cover transition duration-300 ease-in-out hover:scale-110
          className="object-cover h-[500px] w-[900px] m-auto ease-in-out hover:scale-110 hover:shadow-2xl hover:shadow-gray-500 hover:rounded-lg transition-opacity opacity-0 duration-100"
          onLoadingComplete={(image) => {
            image.classList.remove('opacity-0');
            setIsImageLoading(false);
          }}
          loading="lazy"
        />
      </div>
    </div>
  );
}

export default FullScopeImagery;
