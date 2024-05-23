import React, { useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Title, { LineType } from '@/components/shared/Title';
import { IProgramNews } from '@/types/program.news.types';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import Link from 'next/link';
import axios from 'axios';
import { StrapiButtonV2 } from '@/types/StrapiData';
import { Swiper, SwiperSlide } from 'swiper/react';
import { format, getMonth } from 'date-fns';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { GetServerUrl } from '@/lib/Networking';
import LongParagraph from '@/components/shared/LongParagraph';
import { useColor } from '@/context/color.context';
import { useAppSelector } from '@/store/types';
import 'swiper/css';
import 'swiper/css/pagination';

import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SingleProgramTypes {
  content: {
    __component: string;
    title: string;
    description: string;
    targetPage: {
      data: {
        attributes: {
          slug: string;
        };
      };
    };
    button: StrapiButtonV2;
    content: {
      data: {
        attributes: {
          url: string | undefined;
          needToEdit: boolean;
        };
      };
    };
  };
  inSidebar:boolean;
}
function ProgramNews({ content , inSidebar }: SingleProgramTypes) {
  const [fetchedData, setFetchedData] = useState<IProgramNews | undefined>();
  const locale = useAppSelector((state) => state.lang.locale);
  const route = usePathname();
  const programId = route.split('/')[route.split('/').length - 1];
  const { color } = useColor();
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  const pathName = usePathname();
  const pathArray = pathName.split('/');
  const routeWithoutLastItem = pathArray.slice(0, -1).join('/');
  useEffect(() => {
    const fetchData = async () => {
      if (content.content.data.attributes.url) {
        try {
          let apiUrl = content.content.data.attributes.url;

          if (content.content.data.attributes.needToEdit) {
            apiUrl = apiUrl.replace('objId', programId as unknown as string);
          }

          if (apiUrl) {
            const res = await axios.get<IProgramNews>(apiUrl);
            setFetchedData(res.data);
          }
        } catch (error) {}
      }
    };

    fetchData();
  }, [
    content.content.data.attributes.needToEdit,
    content.content.data.attributes.url,
    programId,
  ]);
  // Check if fetchedData exists and has the necessary structure
  if (!fetchedData || !fetchedData.data) {
    return null; // Return null if data is missing or empty
  }
  return (
    // <></>
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <div className="  grid grid-cols-1 lg:grid-cols-3 gap-3 ">
        <div>
          <div className="max-w-[20px] mb-10">
            <Title
              text={content?.title}
              textColor="text-primary"
              fontSize=""
              fontWeight="font-bold"
              line={LineType.Before}
              lineColor="md:before:bg-primary"
            />
          </div>
          <p className="text-xl  my-5 md:my-10 md:text-xl font-thin leading-8 pr-12">
            <LongParagraph text={content?.description} />
          </p>
          <Link
            href={`/${content?.button?.link?.target?.data?.attributes?.slug}`}
            className={`border-primary text-primary border-2 rounded-md text-center flex gap-2.5 items-center max-w-fit p-4  duration-300 ease-linear hover:border-secondary hover:bg-secondary transition hover:text-white`}
            style={{
              borderColor: color ? color : `border-primary`,
              color: color ? color : `text-primary`,
            }}
          >
            <span className={`text-xl tracking-wide   `}>
              {content?.button?.link?.label}
            </span>
            {locale === 'en' ? (
              <MdKeyboardDoubleArrowRight size={30} />
            ) : (
              <MdKeyboardDoubleArrowLeft size={30} />
            )}
          </Link>
        </div>
        {/* add check for the sidebarData length if it is empty then add pleace select Research Data  */}
        <div className="md:col-span-2">
          {!fetchedData ||
          !fetchedData?.data ||
          !fetchedData?.data?.attributes?.news ||
          fetchedData?.data?.attributes?.news?.data.length === 0 ? (
            locale === 'en' ? (
              'Please Select Research Data'
            ) : (
              'الرجاء تحديد بيانات البحث'
            )
          ) : (
            <>
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
                  {fetchedData.data.attributes.news.data?.map((item, index) => (
                    <SwiperSlide
                      key={index}
                      className="group min-h-[450px]  border-2 border-gray hover:shadow-md"
                    >
                      <div className="h-[450px]">
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
                              className="h-full object-cover ease-in-out group-hover:scale-110 transition-opacity opacity-0 duration-100"
                              onLoadingComplete={(image) => {
                                image.classList.remove('opacity-0');
                                setIsImageLoading(false);
                              }}
                              loading="lazy"
                            />
                          ) : (
                            <></>
                          )}
                          <div className="absolute bottom-0 left-0 bg-secondary h-16 w-16 text-white ">
                            <div className="grid grid-cols-1  items-center justify-items-center  ">
                              <span className="font-bold text-2xl ">
                                {format(new Date(item.attributes.date), 'dd')}
                              </span>
                              <span className="text-base">
                                {' '}
                                {format(
                                  new Date(
                                    0,
                                    getMonth(new Date(item.attributes.date)),
                                  ),
                                  'MMM',
                                )}
                              </span>
                            </div>
                          </div>
                        </div>
                        <div className="py-5 px-3 flex flex-col h-[200px]">
                          <div className="basis-1/6">
                            <Title
                              text={`${item.attributes.title.slice(0, 38)}`}
                              textColor="text-lightBlack "
                              fontSize="text-xs"
                              fontWeight="font-bold leading-5"
                              line={LineType.Under}
                              lineColor={'after:bg-secondary'}
                            />
                          </div>
                          <p className="text-xs my-4 leading-5 tracking-wide line-clamp-2 basis-1/2">
                            {`${item.attributes.body.slice(0, 130)} ...`}
                          </p>
                          <div
                            className={`basis-1/6 text-white group bg-primary text-sm rounded-full text-center flex gap-5 items-center max-w-fit px-4 py-2 hover:bg-secondary duration-300 ease-linear transform cursor-pointer`}
                          >
                            <Link
                              href={
                                content.targetPage.data.attributes.slug !==
                                undefined
                                  ? pathName === '/'
                                    ? `/${content.targetPage.data.attributes.slug}/${item?.id}`
                                    : `${routeWithoutLastItem}/${content.targetPage.data.attributes.slug}/${item?.id}`
                                  : ''
                              }
                            >
                              <span className={`tracking-wide   pointer`}>
                                {content?.button?.link?.label}
                              </span>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProgramNews;
