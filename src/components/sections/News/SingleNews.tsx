import React, { useEffect, useState } from 'react';
import { Related, SingleNewsTypes } from '@/types/singleNews.types';
import axios from 'axios';
import Title, { LineType } from '@/components/shared/Title';
import Image from 'next/image';
import { format, getMonth } from 'date-fns';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import LongParagraph from '@/components/shared/LongParagraph';
import { formatDate } from 'date-fns/format';
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import { useAppSelector } from '@/store/types';
// import Loading from '@/app/loading';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface Props {
  content: {
    id: number;
    __component: string;
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

function SingleNews({ content , inSidebar }: Props) {
  const [fetchedData, setFetchedData] = useState<SingleNewsTypes>();
  const pathname = usePathname();
  const locale = useAppSelector((state) => state.lang.locale);
  const newsId = pathname.split('/')[pathname.split('/').length - 1];
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (content.content.data.attributes.url) {
        try {
          let apiUrl = content.content.data.attributes.url;

          if (content.content.data.attributes.needToEdit) {
            apiUrl = apiUrl.replace('objId', newsId as unknown as string);
          }

          // Ensure apiUrl is not null before making the API call

          if (apiUrl) {
            const res = await axios.get<SingleNewsTypes>(apiUrl);
            setFetchedData(res.data);
          }
        } catch (error) {
          // Handle errors
          // console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [
    content.content.data.attributes.url,
    content.content.data.attributes.needToEdit,
    newsId,
  ]);
  const splitParagraph = (
    paragraph: string | undefined,
    wordCount: number,
  ): [string, string] => {
    const words = paragraph?.split(' ') ?? [];
    const firstPart = words.slice(0, wordCount).join(' ');
    const secondPart = words.slice(wordCount).join(' ');
    return [firstPart, secondPart];
  };

  const [firstParagraph, secondParagraph] = splitParagraph(
    fetchedData?.data.attributes.body,
    100,
  );
  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 py-10`}>
      {fetchedData && (
        <>
          <Title
            text={fetchedData.data.attributes.title}
            textColor="text-lightBlack"
            fontSize="h3"
            fontWeight="font-bold"
            line={LineType.None}
            lineColor="after:bg-secondary"
            className="tracking-wider"
          />
          <h6 className="max-w-full lg:max-w-[33%]  leading-loose">
            {formatDate(
              fetchedData?.data?.attributes?.createdAt,
              'MMMM d, yyyy',
            )}
          </h6>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-0">
            <div className="lg:order-last m-2">
              {isImageLoading && (
                <Skeleton
                  className="w-full h-full"
                  baseColor="#fff"
                  highlightColor="#ccc"
                />
              )}
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${fetchedData?.data?.attributes?.image?.data?.attributes?.url}`}
                alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${fetchedData?.data?.attributes?.image?.data?.attributes?.alternativeText}`}
                width={500}
                height={500}
                className="w-full h-[350px] lg:h-[450px] object-cover rounded-tr-[110px] transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                  setIsImageLoading(false);
                }}
                loading="lazy"
              />
            </div>
            <div className="lg:order-first">
              <p className="text-base pb-5  leading-loose">{firstParagraph}</p>
            </div>
          </div>
          <p className="text-base pb-5  leading-loose">
            <LongParagraph text={secondParagraph} />
          </p>
          {fetchedData?.data?.attributes?.related && (
            <>
              <h1 className="text-3xl font-bold">Related News</h1>
              <hr className="mb-5" />
              <div className="grid  grid-cols-1 md:grid-cols-2  lg:grid-cols-3 gap-10 lg:gap-x-20 mt-4">
                {fetchedData?.data?.attributes?.related.map(
                  (related: Related) => (
                    <div key={related.id} className="h-[500px] md:h-[480px]">
                      <div className="overflow-hidden h-[250px] relative">
                        {isImageLoading && (
                          <Skeleton
                            className="w-full h-full"
                            baseColor="#fff"
                            highlightColor="#ccc"
                          />
                        )}
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${related?.image?.url}`}
                          alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${related?.image?.id}`}
                          width={500}
                          height={500}
                          className="h-full object-cover ease-in-out group-hover:scale-110 transition-opacity opacity-0 duration-100"
                          onLoadingComplete={(image) => {
                            image.classList.remove('opacity-0');
                            setIsImageLoading(false);
                          }}
                          loading="lazy"
                        />
                        <div className="absolute bottom-0  left-0 bg-secondary h-16 w-16 text-white ">
                          <h6 className="grid grid-cols-1  items-center justify-items-center  ">
                            <span className=" ">
                              {format(new Date(related.date), 'dd')}
                            </span>
                            <span className="text-base">
                              {' '}
                              {format(
                                new Date(0, getMonth(new Date(related.date))),
                                'MMM',
                              )}
                            </span>
                          </h6>
                        </div>
                      </div>
                      <div className=" py-5 px-3 flex flex-col ">
                        <Title
                          text={related.title}
                          textColor="text-lightBlack"
                          fontSize="text-xs"
                          fontWeight="font-bold leading-5"
                          line={LineType.Under}
                          lineColor={'after:bg-secondary'}
                        />

                        <p className="text-xs my-5 leading-5 tracking-wide line-clamp-3">
                          {related.body}
                        </p>
                        <div
                          className={`text-white bg-primary text-sm rounded-full text-center flex gap-5 items-center max-w-fit px-4 py-1  hover:bg-secondary duration-500 ease-linear transition-transform transform hover:translate-x-1`}
                        >
                          <Link
                            // scroll={false}
                            href={`${related.id}`}
                            className="flex items-center"
                          >
                            <span className={`tracking-wide   `}>
                              {locale === 'en' ? 'Read More' : 'اقرأ المزيد'}
                            </span>
                            {locale === 'en' ? (
                              <MdOutlineKeyboardDoubleArrowRight size={20} />
                            ) : (
                              <MdOutlineKeyboardDoubleArrowLeft size={20} />
                            )}
                          </Link>
                        </div>
                      </div>
                    </div>
                  ),
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default SingleNews;
