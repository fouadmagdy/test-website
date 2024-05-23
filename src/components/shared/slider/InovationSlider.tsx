'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { EventCardProps } from './eventSlider/EventCard';
import axios from 'axios';
import { GetApiUrl, GetServerUrl } from '@/lib/Networking';
import { format, getMonth } from 'date-fns';

import { EventSectionHeader } from '@/types/EventSectionHeader';
import Loading from '@/app/loading';
import SectionHeader from '@/components/sections/SectionHeader';
import { useAppSelector } from '@/store/types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SlideData {
  data: EventCardProps[];
}

const fetcher = async (locale: string) => {
  const res = await axios.get(
    GetApiUrl() + '/events?populate=deep&locale=' + locale,
  );
  return res.data;
};
function InovationSlider({ content }: EventSectionHeader) {
  const locale = useAppSelector((state) => state.lang.locale);

  const [data, setData] = useState<SlideData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  React.useEffect(() => {
    (async () => {
      const res = await fetcher(locale);
      setData(res);
      setIsLoading(false);
    })();
  }, [locale]);
  return (
    <section className="container mx-auto">
      <div className="container m-auto  px-10 lg:px-20">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <SectionHeader
              sectionTitle={content?.sectionHeader?.title}
              mainSectionLink={content?.sectionHeader?.button}
            />
            <Swiper
              className="m-9 my-0"
              modules={[Navigation, Pagination, A11y]}
              spaceBetween={60}
              breakpoints={{
                0: {
                  slidesPerView: 1,
                },
                700: {
                  slidesPerView: 2,
                },
                1282: {
                  slidesPerView: 3,
                },
              }}
              navigation
              // pagination={{ clickable: true }}
              scrollbar={{ draggable: true }}
            >
              {data?.data.map((slide) => (
                <SwiperSlide key={slide.id} className=" !h-auto">
                  {/*  shadow-lg hover:shadow-2xl */}
                  <div className=" h-full  ">
                    <div className="relative overflow-hidden">
                      {isImageLoading && (
                        <Skeleton
                          className="w-full h-full"
                          baseColor="#fff"
                          highlightColor="#ccc"
                        />
                      )}
                      <Image
                        src={
                          GetServerUrl() +
                          slide.attributes.images.data[0].attributes.url
                        }
                        alt={
                          GetServerUrl() +
                          slide.attributes.images.data[0].attributes
                            .alternativeText
                        }
                        height={800}
                        width={400}
                        className="relative w-full h-[370px] object-cover ease-linear hover:scale-125 transition-opacity opacity-0 duration-100"
                        onLoadingComplete={(image) => {
                          image.classList.remove('opacity-0');
                          setIsImageLoading(false);
                        }}
                        loading="lazy"
                      />
                      <div className="overlay flex flex-col justify-between absolute bottom-0 left-0   text-white text-center ">
                        <div className=""></div>
                        <div className=""></div>
                        <div className="flex resposive-paragraph font-bold">
                          <div className="bg-primary px-5 py-3">
                            <div className="text-xl">
                              {format(new Date(slide.attributes.date), 'dd')}
                            </div>
                            <div>
                              {format(
                                new Date(
                                  0,
                                  getMonth(new Date(slide.attributes.date)),
                                ),
                                'MMM',
                              )}
                            </div>
                          </div>
                          <div></div>
                          <div></div>
                        </div>
                      </div>
                    </div>
                    <div className=" p-4 mt-2">
                      <h3 className="h3 resposive-head font-bold ">
                        {slide.attributes.title}
                      </h3>
                      <div className="flex items-center my-2 mt-1">
                        <div className="bg-secondary h-1 w-1/3"></div>
                        <div className="bg-secondary h-1 w-1/3"></div>
                        <div className=""></div>
                      </div>
                      <p className="resposive-paragraph text-gray-500 text-sm line-clamp-3">
                        {slide.attributes.description}
                      </p>
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </>
        )}
      </div>
    </section>
  );
}

export default InovationSlider;
