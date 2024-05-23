import React, { useState, useEffect, useMemo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import Loading from '@/app/loading';
import SectionHeader from '../SectionHeader';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import { Members } from '@/types/members.types';
import { Navigation, Autoplay, A11y } from 'swiper/modules';
import { useAppSelector } from '@/store/types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import AdvancedRichText from '../AdvancedRichText';

interface MempersProps {
  content: {
    __component: string;
    sectionHeader: {
      title: string;
      button: {
        id: number;
        theme: string;
        link: {
          id: number;
          label: string;
          target: {
            data: {
              attributes: {
                slug: string;
                title: string;
              };
            };
          };
        };
      };
    };
    targetPage: {
      data: {
        attributes: {
          title: string;
          slug: string;
        };
      };
    };
    content: {
      data: {
        id: number;
        attributes: {
          url: string | undefined;
          needToEdit: boolean;
        };
      };
    };
  };
  inSidebar:boolean;
}

// SwiperCore.use([Navigation, Pagination]);

function MemberGallery({ content , inSidebar }: MempersProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [fetchedData, setFetchedData] = useState<Members>();
  const pathname = usePathname();
  const programId = pathname.split('/')[pathname.split('/').length - 1];
  const pathName = usePathname();
  const pathArray = pathName.split('/');
  const routeWithoutLastItem = pathArray.slice(0, -1).join('/');
  const locale = useAppSelector((state) => state.lang.locale);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (content.content.data?.attributes.url) {
        try {
          setIsLoading(true);
          let apiUrl = content.content.data.attributes.url;

          if (content.content.data.attributes.needToEdit) {
            apiUrl = apiUrl.replace('objId', programId as unknown as string);
          }

          if (apiUrl) {
            const res = await axios.get<Members>(apiUrl);
            setFetchedData(res.data);
            setIsLoading(false);
          }
        } catch (error) {}
      }
    };

    fetchData();
  }, [
    content.content.data?.attributes.needToEdit,
    content.content.data?.attributes.url,
    programId,
  ]);
  const renderCards = useMemo(() => {
    if (!fetchedData || !fetchedData.data || fetchedData.data.length === 0) {
      return null;
    }

    return fetchedData.data.map((member, index: number) => (
      <SwiperSlide key={index}>
        <div className="">
          <span>
            <div className=" group overflow-hidden relative h-[400px] transition ease-linear duration-500  border-2 shadow-lg hover:shadow-2xl">
              {isImageLoading && (
                <Skeleton
                  className="w-full h-full"
                  baseColor="#fff"
                  highlightColor="#ccc"
                />
              )}
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.attributes.image.data.attributes.url}`}
                alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member.attributes.image.data.attributes.alternativeText}`}
                fill
                className="w-full overflow-hidden object-cover block h-auto ease-linear transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                  setIsImageLoading(false);
                }}
                loading="lazy"
              />
              <div className="group-hover:top-0 bg-opacity-70 transition-all ease-linear duration-300 h-full bottom-0 z-0 absolute top-[83%] left-0 text-center bg-black w-full text-white py-3">
                <div className="p-3 h-full flex flex-col justify-center group-hover:pt-24">
                  <p className="resposive-paragraph group-hover:text-lg group-hover:font-semibold pb-2">
                    {member.attributes.name}
                  </p>
                  <div className="flex flex-col justify-between h-full">
                    <p className="text-base line-clamp-3 my-2 w-3/4 text-center">
                      <AdvancedRichText content={{advancedRichText:member.attributes.biography}} />
                    </p>
                    <div className="   flex items-end justify-end hover:text-secondary duration-300 transition">
                      <Link
                        // href={
                        //   content?.targetPage?.data?.attributes?.slug !==
                        //   undefined
                        //     ? `/${content?.targetPage?.data?.attributes?.slug}/${member.id}`
                        //     : ''
                        // }
                        href={
                          content?.targetPage?.data?.attributes?.slug !==
                          undefined
                            ? pathName === '/'
                              ? `/${content?.targetPage?.data?.attributes?.slug}/${member?.id}`
                              : `${routeWithoutLastItem}/${content?.targetPage?.data?.attributes?.slug}/${member?.id}`
                            : ''
                        }
                        className=" flex items-center"
                      >
                        {locale === 'en' ? 'Read More' : 'اقرأ المزيد'}{' '}
                        {locale === 'en' ? (
                          <MdOutlineKeyboardDoubleArrowRight size={20} />
                        ) : (
                          <MdOutlineKeyboardDoubleArrowLeft size={20} />
                        )}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </span>
        </div>
      </SwiperSlide>
    ));
  }, [content?.targetPage?.data?.attributes?.slug, fetchedData, isImageLoading, locale, pathName, routeWithoutLastItem]);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 mx-auto md:px-12`}>
      {content?.sectionHeader?.title ? (
        <SectionHeader
          sectionTitle={content?.sectionHeader?.title}
          mainSectionLink={content?.sectionHeader?.button}
        />
      ) : null}
      {isLoading ? (
        <Loading />
      ) : (
        <Swiper
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
          modules={[Navigation, Autoplay, A11y]}
          pagination={{ clickable: true }}
        >
          {renderCards}
        </Swiper>
      )}
    </div>
  );
}

export default MemberGallery;
