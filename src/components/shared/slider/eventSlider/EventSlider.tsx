import React, { useEffect, useState } from 'react';
import Image from '../../Image';
import { Autoplay, Pagination } from 'swiper/modules';
// import { GetApiUrl } from '@/lib/Networking';
import axios from 'axios';
import Loading from '@/app/loading';
import SectionHeader from '@/components/sections/SectionHeader';
import { EventSectionHeader } from '@/types/EventSectionHeader';
import { format, getMonth, getYear } from 'date-fns';
import { usePathname } from 'next/navigation';

import EventCard from './EventCard';
import { useAppSelector } from '@/store/types';

import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
// import Skeleton from 'react-loading-skeleton';
// import 'react-loading-skeleton/dist/skeleton.css';

interface SlideData {
  data: {
    id: number;
    attributes: {
      title: string;
      date: string;
      locale: string;
      description: string;
      slug: string;
      images: {
        data: [
          {
            id: number;
            attributes: {
              alternativeText: string;
              url: string;
            };
          },
        ];
      };
    };
  }[];
}

// const fetcher = async (locale: string) => {
//   const res = await axios.get(
//     GetApiUrl() + '/events?populate=deep&locale=' + locale,
//   );
//   return res.data;
// };

function EventSlider({ content }: EventSectionHeader) {
  const pathName = usePathname();
  // const [isImageLoading, setIsImageLoading] = React.useState(true);

  const locale = useAppSelector((state) => state.lang.locale);
  const [data, setData] = useState<SlideData>();
  const [oldEvents, setOldEvents] = useState<SlideData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = content?.content?.data?.attributes?.url;

        if (content?.content?.data?.attributes?.needToEdit) {
          apiUrl = apiUrl?.replace(
            'days',
            content?.daysRange as unknown as string,
          );
        }

        if (apiUrl) {
          const res = await axios.get<SlideData>(apiUrl);
          setData(res.data);
          setIsLoading(false);
        }
      } catch (error) {}
    };

    fetchData();
  }, [content]);

  useEffect(() => {
    const fetchOldEvents = async () => {
      const apiUrl = content?.oldEvents?.data?.attributes?.url;
      if (apiUrl) {
        const res = await axios.get<SlideData>(apiUrl);
        setOldEvents(res.data);
        setIsLoading(false);
      }
    };
    fetchOldEvents();
  }, [content?.oldEvents?.data?.attributes?.url]);

  return (
    <section className="md:py-32 overflow-hidden events-clipt bg-softBeige">
      <div className="sm:p-0 sm:container m-auto">
        <div className=" relative overflow-visible">
          <SectionHeader
            sectionTitle={content?.sectionHeader?.title}
            mainSectionLink={content?.sectionHeader?.button}
          />
          {isLoading ? (
            <Loading />
          ) : (
            <div className="grid grid-cols-12 gap-8">
              {data && (
                <div className="px-1 sm:p-0 col-span-12 lg:col-span-4 xl:border-e-4 border-primary  rounded xl:pe-8">
                  <h3 className=" text-start text-title mb-4 ">
                    {content?.subtitle}
                  </h3>
                  {data?.data.slice(0, 3).map((event) => {
                    return (
                      <EventCard
                        key={event.id}
                        {...event}
                        targetPage={content.targetPage.data.attributes.slug}
                      />
                    );
                  })}
                </div>
              )}
              <div
                className={`px-1 sm:p-0 col-span-12 ${
                  data ? 'lg:col-span-8' : ''
                }`}
              >
                <Swiper
                  spaceBetween={10}
                  autoplay={{
                    delay: 5000,
                    disableOnInteraction: true,
                  }}
                  breakpoints={{
                    640: {
                      slidesPerView: 2,
                      centeredSlides: false,
                      spaceBetween: 20,
                    },
                    768: {
                      slidesPerView: 3,
                      centeredSlides: false,
                      spaceBetween: 20,
                    },
                    1024: {
                      slidesPerView: 3,
                      spaceBetween: 20,
                    },
                  }}
                  navigation={true}
                  modules={[Autoplay, Pagination]}
                  className="mySwiper swipper h-full"
                >
                  {oldEvents?.data.map((slide) => (
                    <SwiperSlide key={slide.id} className="h-full">
                      <a
                        // scroll={false}
                        // href={
                        //   content.targetPage.data.attributes.slug !== undefined
                        //     ? `/${content?.targetPage?.data?.attributes?.slug}/${slide?.id}`
                        //     : ''
                        // }
                        href={
                          content.targetPage.data.attributes.slug !== undefined
                            ? pathName === '/'
                              ? `/${content?.targetPage?.data?.attributes?.slug}/${slide?.id}`
                              : `${pathName}/${content?.targetPage?.data?.attributes?.slug}/${slide?.id}`
                            : ''
                        }
                        className="h-full group"
                      >
                        {/* <div className="py-4 relative overflow-hidden tracking-widest font-semibold text-center text-black transition duration-1000 ease-linear bg-white sm:text-sm md:text-base lg:text-base xl:text-base sm:col-span-8 group-hover:text-white before:absolute before:bg-secondary before:w-full before:h-1 before:bottom-0 before:left-0   before:z-0"> */}

                        <div className="h-96">
                          {/* {isImageLoading && (
                            <Skeleton
                              className="w-full h-full"
                              baseColor="#fff"
                              highlightColor="#ccc"
                            />
                          )} */}
                          <Image
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${
                              slide?.attributes?.images?.data !== null
                                ? slide?.attributes?.images?.data[0]?.attributes
                                    ?.url
                                : ''
                            }`}
                            alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${
                              slide?.attributes?.images?.data !== null
                                ? slide?.attributes?.images?.data[0]?.attributes
                                    ?.alternativeText
                                : ''
                            }`}
                            fill
                            style={{
                              objectFit: 'contain',
                              backgroundColor: '#fff',
                            }}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="w-full object-cover h-full transition-opacity opacity-0 duration-100"
                            onLoadingComplete={(image) => {
                              image.classList.remove('opacity-0');
                              // setIsImageLoading(false);
                            }}
                            loading="lazy"
                            fallbackSrc="https://placehold.co/400"
                          />
                        </div>

                        <div className="flex bg-secondary bg-opacity-90 px-4 py-2 absolute top-2 right-2 flex-col text-white text-center z-10">
                          <div className="text-md font-bold">
                            {format(new Date(slide.attributes.date), 'dd')}
                          </div>
                          <div className="text-sm">
                            {format(
                              new Date(
                                0,
                                getMonth(new Date(slide.attributes.date)),
                              ),
                              'MMM',
                            )}
                          </div>
                          <div className="text-sm">
                            {format(
                              new Date(
                                getYear(new Date(slide.attributes.date)),
                                1,
                              ),
                              'yyyy',
                            )}
                          </div>
                        </div>
                        <div className="bg-lightBlack bg-opacity-90 h-full p-2 text-white absolute top-[calc(100%-5rem)]  group-hover:top-0 group-hover:justify-center w-full items-center flex flex-col transition-all duration-500 ease-in-out">
                          <h6 className="text-center mb-3 group-hover:mb-6 transition-all duration-500 ease-in-out line-clamp-2">
                            {slide.attributes.title}
                          </h6>
                          <span className="p-4 mt-4 transition-all duration-500 ease-in-out">
                            {' '}
                            {slide.attributes.description.length > 200
                              ? slide.attributes.description.slice(0, 200) +
                                '...'
                              : slide.attributes.description}{' '}
                          </span>
                          <div className="absolute bottom-4 right-4 flex items-end justify-end">
                            <p className=" flex items-center px-4 py-3 text-white border border-transparent hover:border-white duration-500 transition-all">
                              {locale === 'en' ? 'Read More' : 'اقرأ المزيد'}{' '}
                              {locale === 'en' ? (
                                <MdOutlineKeyboardDoubleArrowRight size={20} />
                              ) : (
                                <MdOutlineKeyboardDoubleArrowLeft size={20} />
                              )}
                            </p>
                          </div>
                        </div>
                      </a>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

export default EventSlider;
