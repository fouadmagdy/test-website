import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import { ISingleSchool } from '@/types/school.types';
import Title, { LineType } from '@/components/shared/Title';
import { useColor } from '@/context/color.context';
import { IButton } from '@/types/button.types';
import Link from 'next/link';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import LongParagraph from '@/components/shared/LongParagraph';
import { useAppSelector } from '@/store/types';
import Loading from '@/app/loading';

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
    button: IButton;
  };
  inSidebar:boolean;
}

function SingleSchool({ content , inSidebar }: Props) {
  const locale = useAppSelector((state) => state.lang.locale);
  const [fetchedData, setFetchedData] = useState<ISingleSchool>();
  const pathName = usePathname();
  const schoolId = pathName.split('/')[pathName.split('/').length - 1];
  const { color, setColor } = useColor(); // Consume the color from the context
  const pathArray = pathName.split('/');
  const routeWithoutLastItem = pathArray.slice(0, -1).join('/');
  useEffect(() => {
    const fetchData = async () => {
      if (content.content.data.attributes.url) {
        try {
          let apiUrl = content.content.data.attributes.url;

          if (content.content.data.attributes.needToEdit) {
            apiUrl = apiUrl.replace('objId', schoolId as unknown as string);
          }

          if (apiUrl) {
            const res = await axios.get<ISingleSchool>(apiUrl);
            setFetchedData(res.data);
          }
        } catch (error) {}
      }
    };

    fetchData();
  }, [
    content.content.data.attributes.url,
    content.content.data.attributes.needToEdit,
    schoolId,
  ]);
  // set the color of the title based on the school's color
  useEffect(() => {
    if (fetchedData) {
      setColor(fetchedData.data.attributes.color);
    }
  }, [fetchedData, setColor]);

  if (!fetchedData || !fetchedData.data) {
    return <Loading />; // Return null if data is missing or empty
  }

  return (
    <div
      id="SchoolDetails"
      className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}
    >
      <div className=" p-5 grid grid-cols-1 col-span-5 gap-8 lg:gap-8">
        <div className="max-w-lg mx-auto lg:max-w-none">
          <div>
            {fetchedData ? (
              <div
                style={{ color: color }}
                className="flex gap-y-8 flex-row flex-wrap items-center justify-between"
              >
                <Title
                  text={`${fetchedData.data.attributes.title}`}
                  textColor={`inherit`}
                  fontSize={''}
                  fontWeight={'font-bold'}
                  line={LineType.Before}
                  lineColor={'before:bg-secondary'}
                  id="section-title"
                  aria-labelledby="section-title"
                  className="w-1/2"
                />
                {content?.button?.link ? (
                  <Link
                    style={{
                      backgroundColor: color ? color : '',
                    }}
                    id="call-to-action"
                    aria-labelledby="call-to-action"
                    href={
                      content?.button?.link?.target?.data?.attributes?.slug !==
                      undefined
                        ? pathName === '/'
                          ? `/${content?.button?.link?.target?.data?.attributes?.slug}/${fetchedData?.data?.id}`
                          : `${routeWithoutLastItem}/${content?.button?.link?.target?.data?.attributes?.slug}/${fetchedData?.data?.id}`
                        : ''
                    }
                    className="text-white rounded-md text-center flex gap-5 items-center max-w-fit px-8 py-4  duration-500 ease-linear hover:bg-secondary transition-transform transform hover:translate-x-1 bg-primary"
                  >
                    {content?.button?.link?.label}
                    {locale === 'en' ? (
                      <MdKeyboardDoubleArrowRight
                        className="transition-transform transform group-hover:translate-x-1 duration-500 ease-linear"
                        size={26}
                      />
                    ) : (
                      <MdKeyboardDoubleArrowLeft
                        className="transition-transform transform group-hover:translate-x-1 duration-500 ease-linear"
                        size={26}
                      />
                    )}
                  </Link>
                ) : (
                  ''
                )}
              </div>
            ) : null}
            <p className="pt-5  leading-loose">
              <LongParagraph text={fetchedData?.data.attributes.description} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SingleSchool;
