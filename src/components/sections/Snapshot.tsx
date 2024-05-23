import React from 'react';
import ChevronSingle from '@/components/icons/chevron-single-right';
import ChevronDouble from '@/components/icons/chevron-double-right';
import Image from 'next/image';
import Link from 'next/link';
import { IButton } from '@/types/button.types';
import { ImageProp } from '@/types/image.types';
import { useColor } from '@/context/color.context';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SnapshotProps {
  content: {
    title: string;
    description: string;
    image: ImageProp;
    button: IButton;
  };
  inSidebar:boolean;
}

function Snapshot({ content , inSidebar }: SnapshotProps) {
  const { color } = useColor();
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 py-12`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 sm:mb-4">
        <div
          className="flex gap-5 flex-col justify-start items-center lg:items-start sm:p-8 py-6"
          style={{
            backgroundColor: color ? color : '',
          }}
        >
          <h2 className="sm:px-8">
            {/* Research */}
            {content.title}
          </h2>
          <h5 className="sm:px-8  !font-thin ">{content.description}</h5>
          <div className="sm:px-8">
            <Link
              // key={i}
              href={content?.button?.link?.target?.data?.attributes?.slug || ''}
              role="button"
              tabIndex={0}
              className="bg-transparent border-2 rounded-xl shadow-sm hover:shadow-2xl hover:bg-secondary hover:border-secondary hover:translate-x-1 ease-linear duration-500 flex items-center justify-between py-2 px-4 lg:w-fit hover:text-white text-secondary"
            >
              <span className="">{content.button.link.label}</span>
              <span className="ml-auto lg:hidden" aria-hidden>
                <ChevronDouble />
              </span>
              <span className="ml-3 hidden lg:inline-block" aria-hidden>
                <ChevronSingle />
              </span>
            </Link>
          </div>
        </div>
        <div>
          {isImageLoading && (
            <Skeleton
              className="w-full h-full"
              baseColor="#fff"
              highlightColor="#ccc"
            />
          )}
          <Image
            className=" w-full h-full transition-opacity opacity-0 duration-100"
            alt={content?.image?.data?.attributes?.alternativeText || ''}
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${
              content?.image?.data?.attributes?.url ||
              'https://placehold.jp/500x350.png'
            }`}
            objectFit="cover"
            width={600}
            height={500}
            onLoadingComplete={(image) => {
              image.classList.remove('opacity-0');
              setIsImageLoading(false);
            }}
            loading="lazy"
          />
        </div>
      </div>
    </div>
  );
}

export default Snapshot;
