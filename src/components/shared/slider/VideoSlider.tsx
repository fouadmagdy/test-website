'use client';
import React, { useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, A11y, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import '@/styles/customSwiperStyles.css';
import 'swiper/css/navigation';
import Image from 'next/image';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
interface SlideData {
  id: number;
  image: {
    data: {
      attributes: {
        name: string;
        alternativeText: string;
        url: string;
      };
    };
  };
  link: string;
}

// interface socialLink {
//   id: number;
//   link: string;
// }

interface SliderProps {
  sliderData: SlideData[];
  classNames: string;
  // sliderData: [
  //   {
  //     id: number;
  //     attributes: {
  //       name: string;
  //       alternativeText: string;
  //       url: string;
  //     };
  //   },
  // ]
  // | [{id:number , Link:string}]
}

function VideoSlider({ sliderData, classNames }: SliderProps) {
  // console.log('🚀 ~ VideoSlider ~ sliderData:', sliderData);
  const [playingIndex, setPlayingIndex] = useState(-1);
  const [isImageLoading, setIsImageLoading] = useState(true);

  const handleClick = (index: number) => {
    setPlayingIndex(index);
  };
  return (
    <div className={`beProudZewailian ${classNames}`}>
      <Swiper
        centeredSlides={true}
        slideToClickedSlide={true}
        effect={'coverflow'}
        modules={[EffectCoverflow, Navigation, A11y]}
        coverflowEffect={{
          rotate: 0,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        // spaceBetween={50}
        loop
        navigation
        breakpoints={{
          640: {
            slidesPerView: 'auto',
            // spaceBetween: 10,
            navigation: true,
          },
          768: {
            slidesPerView: 'auto',
            // spaceBetween: 10,
            navigation: true,
          },
          1024: {
            slidesPerView: 3,
            // spaceBetween: 50,
          },
        }}
      >
        {sliderData.map((slide, index) => (
          <SwiperSlide
            key={index}
            className="w-3/4 md:w-full h-full rounded-md shadow-md"
          >
            <div
              className={`w-full flex justify-center items-center iframe h-80 relative ${
                index === playingIndex ? 'md:h-[30rem]' : 'md:h-96'
              } `}
            >
              {isImageLoading && (
                <Skeleton
                  className="w-full h-full"
                  baseColor="#fff"
                  highlightColor="#ccc"
                />
              )}
              {playingIndex !== index && (
                <Image
                  width={500}
                  height={500}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${slide.image.data.attributes.url}`}
                  alt="Video Thumbnail"
                  className="absolute w-full h-full object-cover cursor-pointer transition-opacity opacity-0 duration-100"
                  onLoadingComplete={(image) => {
                    image.classList.remove('opacity-0');
                    setIsImageLoading(false);
                  }}
                  loading="lazy"
                  onClick={() => handleClick(index)}
                />
              )}
              <iframe
                loading="lazy"
                className="w-3/4 md:w-full h-full"
                src={playingIndex === index ? slide.link : ''}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
              {playingIndex !== index && (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="#c40d3c"
                  className="w-16 h-16 absolute z-5 top-[calc(50%-1.5rem)] left-[(50%-1.5rem)]"
                  onClick={() => handleClick(index)}
                >
                  <path
                    fillRule="evenodd"
                    d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                    clipRule="evenodd"
                  />
                </svg>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}

export default VideoSlider;
