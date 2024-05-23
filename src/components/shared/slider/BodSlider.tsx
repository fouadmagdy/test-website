'use client';
import React from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { GetServerUrl } from '@/lib/Networking';
import SectionHeader from '@/components/sections/SectionHeader';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Content {
  id: number;
  __component: string;
  data: {
    id: number;
    buttonText: string;
    mainTitle: string;
  };
  carusolItems: SlideData[];
}
interface SlideData {
  id: number;
  title?: string;
  description: string;
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
}

interface SliderProps {
  content: Content;
  inSidebar:boolean;
}

function BodSlider({ content , inSidebar }: SliderProps) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <SectionHeader
        sectionTitle={content.data.mainTitle}
        // mainSectionLink={content.data}
      />
      <Swiper
        modules={[Navigation, Pagination, A11y]}
        spaceBetween={30}
        slidesPerView={1}
        breakpoints={{
          // when window width is >= 640px
          640: {
            width: 640,
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            width: 768,
            slidesPerView: 2,
          },
        }}
        navigation
        pagination={{ clickable: true }}
        scrollbar={{ draggable: true }}
        className="flex justify-between"
      >
        {content.carusolItems.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className="flex relative w-[370px] h-[350px]   border-2 shadow-lg hover:shadow-2xl">
              {isImageLoading && (
                <Skeleton
                  className="w-full h-full"
                  baseColor="#fff"
                  highlightColor="#ccc"
                />
              )}
              <Image
                src={GetServerUrl() + slide.image.data.attributes?.url}
                alt={slide.image.data.attributes?.alternativeText || ''}
                height={400}
                width={400}
                className="max-w-full overflow-hidden object-cover block h-auto opacity-0 transition ease-linear duration-500 hover:opacity-100"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                  setIsImageLoading(false);
                }}
                loading="lazy"
              />
              <div className="overlay flex flex-col justify-between absolute top-0 left-0 opacity-0 transition ease-linear duration-500 p-4 w-full h-full text-white text-center bg-primary hover:opacity-100 hover:bg-opacity-50">
                <h3 className="h-1 font-bold resposive-head">
                  {slide.title ? slide.title : ''}
                </h3>
                <p className="resposive-paragraph">{slide.description}</p>
                <div className="hover:opacity-100"></div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default BodSlider;
