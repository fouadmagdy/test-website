import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { SingleEventTypes } from '@/types/singleEvent.types';
import Title, { LineType } from '@/components/shared/Title';
import Button from '@/components/shared/Button';
import { formatDate } from 'date-fns/format';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppSelector } from '@/store/types';

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

function SingleEvent({ content , inSidebar }: Props) {
  const locale = useAppSelector((state) => state.lang.locale);
  const [fetchedData, setFetchedData] = useState<SingleEventTypes>();
  const pathname = usePathname();
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

          if (apiUrl) {
            const res = await axios.get<SingleEventTypes>(apiUrl);
            setFetchedData(res.data);
          }
        } catch (error) {}
      }
    };

    fetchData();
  }, [
    content.content.data.attributes.url,
    content.content.data.attributes.needToEdit,
    newsId,
  ]);
  return (
    <>
      {fetchedData && (
        <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 py-10`}>
          <div className=" grid grid-cols-1  md:grid-cols-2 lg:grid-cols-6 gap-5  justify-center">
            <div className="lg:col-span-2">
              {isImageLoading && (
                <Skeleton
                  className="w-full h-full"
                  baseColor="#fff"
                  highlightColor="#ccc"
                />
              )}
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${fetchedData?.data.attributes.images.data[0].attributes.url}`}
                alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${fetchedData?.data.attributes.images.data[0].attributes.alternativeText}`}
                height={500}
                width={500}
                className="w-full h-[300px] object-cover rounded-tl-[120px] transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                  setIsImageLoading(false);
                }}
                loading="lazy"
              />
            </div>
            <div className="lg:col-span-4 px-1 mt-2 flex flex-col gap-4">
              <Title
                text={fetchedData?.data.attributes.title as string}
                textColor="text-black"
                fontSize="h3"
                fontWeight="font-bold"
                line={LineType.None}
                lineColor=""
              />
              {fetchedData?.data.attributes.date && (
                <h6 className="max-w-full lg:max-w-[33%]  leading-loose">
                  {formatDate(
                    fetchedData?.data.attributes.date,
                    'MMMM d, yyyy',
                  )}
                </h6>
              )}
              <div className="flex gap-4 font-light leading-loose">
                <p className="font-bold">{locale === 'en' ? 'PHONE:' : 'هاتف:'}</p>
                <p className=" leading-loose">
                  {fetchedData?.data.attributes.contactNumber}
                </p>
              </div>
              <div className="flex gap-4 font-light leading-loose">
                <p className="font-bold">{locale === 'en' ? 'EMAIL:' : 'بريد إلكتروني:'}</p>
                <p>{fetchedData?.data.attributes.contactEmail}</p>
              </div>
              <div>
                <Button
                  text="Join This Event"
                  backgroundColor="bg-primary"
                  fontSize="text-md"
                />
              </div>
            </div>
          </div>
          <div className="pt-4">
            <h4 className="tracking-widest  border-b-2 pb-1  leading-loose">
              {locale === 'en' ? 'Details' : 'التفاصيل'}
            </h4>
            <p className="text-base leading-loose">
              {fetchedData?.data.attributes.description}
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default SingleEvent;
