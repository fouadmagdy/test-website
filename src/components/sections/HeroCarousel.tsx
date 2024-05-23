import { Navigation, Autoplay, Pagination, A11y } from 'swiper/modules';

import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import React from 'react';
import { GetServerUrl } from '@/lib/Networking';
import Link from 'next/link';
/**
 * Interface representing the props for a Hero Carousel component.
 */
interface IHeroCarouselProps {
  content: {
    id: number;
    __component: string;
    carouselItem: {
      id: number;
      title: string;
      description: string;
      image: {
        data: {
          id: number;
          attributes: {
            name: string;
            alternativeText: string;
            caption: null;
            width: number;
            height: number;
            url: string;
          };
        };
      };
      button?: {
        id: 4;
        buttonText: string;
        buttonLink: {
          data: {
            attributes?: {
              PageName: string;
              url: string;
            };
          };
        };
      };
    }[];
  };
}
/**
 * A React functional component that renders a hero carousel with the given content.
 * @param {IHeroCarouselProps} content - The content object containing the carousel items.
 * @returns The rendered hero carousel component.
 */
const HeroCarousel: React.FC<IHeroCarouselProps> = ({ content }) => {
  return (
    <div className="">
      <>
        <Swiper
          modules={[Navigation, Autoplay, Pagination, A11y]}
          spaceBetween={50}
          slidesPerView={1}
          navigation
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: true,
          }}
          pagination={{ clickable: true }}
          scrollbar={{ draggable: true }}
        >
          {content.carouselItem.map((item, index) => (
            <SwiperSlide
              key={index}
              className={`min-h-[calc(100vh-150px)] w-100  bg-no-repeat bg-cover transition-opacity opacity-0 duration-100`}
              style={{
                backgroundImage: `url("${
                  GetServerUrl() + item.image.data.attributes.url
                }")`,
              }}
            >
              <div className="min-h-[calc(100vh-150px)] flex justify-center md:justify-start items-center md:ps-36 gap-y-6 ">
                <div className="bg-black p-5 md:py-10 md:pe-32 bg-opacity-40 md:ps-10   text-center md:text-start">
                  <h1
                    className="text-white font-bold md:text-7xl text-xl
                   my-4"
                  >
                    {item.title}
                  </h1>
                  <p className="text-white text-sm w-[50%] my-4 m-auto md:mx-0 ">
                    {item.description}
                  </p>
                  {item.button ? (
                    <div className="block w-fit border-2 border-white px-5 py-3 rounded-lg hover:border-secondary hover:px-10 transition-all hover:text-secondary text-white m-auto md:mx-0 ">
                      <Link
                        href={
                          item?.button?.buttonLink?.data?.attributes
                            ?.PageName ?? ''
                        }
                      >
                        {item.button.buttonText}
                      </Link>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    </div>
  );
};

export default HeroCarousel;
