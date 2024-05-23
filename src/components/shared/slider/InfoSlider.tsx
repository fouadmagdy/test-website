'use client';
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { GetServerUrl } from '@/lib/Networking';
import SectionHeader from '@/components/sections/SectionHeader';
// import { StrapiButton } from '@/types/StrapiData';
import Link from 'next/link';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Content {
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
  // Title: string,
  // button: StrapiButton,
  carusolitems: SlideData[];
}
interface SlideData {
  id: number;
  title: string;
  description?: string;
  image: {
    data: {
      id: number;
      attributes?: {
        name: string;
        alternativeText: string;
        caption: string;
        width: number;
        height: number;
        url: string;
      };
    };
  };
  buttonLink: {
    data: {
      attributes: {
        PageName: string;
      };
    };
  };
}

interface InfoSliderProps {
  content: Content;
  inSidebar:boolean;
}

function InfoSlider({ content , inSidebar }: InfoSliderProps) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <SectionHeader
        sectionTitle={content?.sectionHeader?.title}
        mainSectionLink={content?.sectionHeader?.button}
      />
      <Swiper
        modules={[Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          640: {
            width: 640,
            slidesPerView: 1,
          },
          768: {
            width: 768,
            slidesPerView: 2,
          },
        }}
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="flex justify-between "
      >
        {content.carusolitems.map((slide, index) => (
          <SwiperSlide key={index} className="pb-20">
            <Link href={slide?.buttonLink?.data?.attributes?.PageName}>
              <div className=" group flex relative w-[370px] h-[350px]   border-2 shadow-lg hover:shadow-2xl">
                {isImageLoading && (
                  <Skeleton
                    className="w-full h-full"
                    baseColor="#fff"
                    highlightColor="#ccc"
                  />
                )}
                <Image
                  src={
                    GetServerUrl() + slide?.image?.data?.attributes?.url ?? ''
                  }
                  alt={slide?.image?.data?.attributes?.alternativeText ?? ''}
                  height={400}
                  width={400}
                  className="max-w-full overflow-hidden object-cover block h-auto ease-linear transition-opacity opacity-0 duration-100"
                  onLoadingComplete={(image) => {
                    image.classList.remove('opacity-0');
                    setIsImageLoading(false);
                  }}
                  loading="lazy"
                />
                <div className="group-hover:top-0 bg-opacity-70 group-hover:items-center justify-center flex flex-col transition ease-linear duration-500 group-hover:h-full bottom-0 absolute left-0 text-center bg-black w-full text-white py-3">
                  <p className="resposive-paragraph">{slide.title}</p>
                  <p className="text-sm group-hover:block hidden">
                    {slide.description}
                  </p>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default InfoSlider;
