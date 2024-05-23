import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { format, getMonth, getYear } from 'date-fns';

import 'swiper/css';
import 'swiper/css/pagination';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { GetServerUrl } from '@/lib/Networking';
import Title, { LineType } from '../Title';
import { ImageProp } from '@/types/image.types';
import { useAppSelector } from '@/store/types';
import Link from 'next/link';
interface ResearchItem {
  targetPage: string;
  content:
    | {
        id: number;
        attributes: {
          title: string;
          date: Date;
          body: string;
          slug: string;
          image: ImageProp;
        };
      }[]
    | undefined;
}
export default function ResearchSlider({ content, targetPage }: ResearchItem) {
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  const locale = useAppSelector((state) => state.lang.locale);

  if (!content || content.length === 0) {
    return <p>{locale === 'en' ? 'No data available' : 'غير متوفر'}</p>;
  }
  return (
    <div className="">
      <Swiper
        autoplay={{
          delay: 5000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          640: {
            slidesPerView: 1,
            centeredSlides: false,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            centeredSlides: false,

            spaceBetween: 10,
          },
          1024: {
            slidesPerView: 3,
            spaceBetween: 10,
          },
        }}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper h-full "
      >
        {content?.map((item, index) => (
          <SwiperSlide
            key={index}
            className="group min-h-[420px] md:min-h-[430px]  border-2 border-gray hover:shadow-md"
          >
            <div className="min-h-[420px] md:h-[430px]">
              <div className="overflow-hidden h-[250px] relative">
                {isImageLoading && (
                  <Skeleton
                    className="w-full h-full"
                    baseColor="#fff"
                    highlightColor="#ccc"
                  />
                )}
                {item.attributes.image ? (
                  <Image
                    src={`${
                      GetServerUrl() +
                      item?.attributes?.image?.data?.attributes.url
                    }`}
                    alt={
                      item?.attributes?.image?.data?.attributes
                        .alternativeText || ''
                    }
                    width={500}
                    height={500}
                    className="h-full object-cover ease-in-out group-hover:scale-110 transition opacity-0 duration-opacity-100 duration-scale-1000"
                    onLoadingComplete={(image) => {
                      image.classList.remove('opacity-0');
                      setIsImageLoading(false);
                    }}
                    loading="lazy"
                  />
                ) : (
                  <></>
                )}
                <div className="absolute bottom-0 left-0 bg-secondary text-white px-4 py-2">
                  <div className="grid grid-cols-1  items-center justify-items-center  ">
                    <span className="font-bold text-md">
                      {format(new Date(item.attributes.date), 'dd')}
                    </span>
                    <span className="text-sm">
                      {' '}
                      {format(
                        new Date(0, getMonth(new Date(item.attributes.date))),
                        'MMM',
                      )}
                    </span>
                    <span className="text-sm">
                      {' '}
                      {format(
                        new Date(getYear(new Date(item.attributes.date)), 1),
                        'yyyy',
                      )}
                    </span>
                  </div>
                </div>
              </div>
              <div className="py-3 lg:py-5 px-1 lg:px-3 flex flex-col">
                <div className="basis-1/6">
                  <Title
                    text={
                      item.attributes.title.length > 28
                        ? item.attributes.title.slice(0, 28) + ' ...'
                        : item.attributes.title
                    }
                    textColor="text-lightBlack "
                    fontSize="text-md"
                    fontWeight="font-bold leading-5 line-clamp-1"
                    line={LineType.Under}
                    lineColor={'after:bg-secondary'}
                  />
                </div>
                <p className="text-base my-2 xl:my-3 leading-5 tracking-wide line-clamp-3 basis-1/2">
                  {item.attributes.body}
                </p>
                <div
                  className={`basis-1/6 text-white group bg-primary text-sm rounded-full text-center flex gap-5 items-center max-w-fit px-4 py-2 hover:bg-secondary duration-300 ease-linear transform cursor-pointer`}
                >
                  {/* /${item.id} */}
                  <Link
                    
                    scroll={false}
                    href={
                      targetPage !== undefined
                        ? `/${targetPage}/${item?.id}`
                        : ''
                    }
                  >
                    <span className={`tracking-wide   pointer`}>
                      {locale === 'en' ? 'Read More' : 'اقرأ المزيد'}
                    </span>
                  </Link>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
