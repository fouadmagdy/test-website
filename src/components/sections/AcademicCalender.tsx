import React from 'react';
import axios from 'axios';
import EmptyCalendar from '../shared/calendar/EmptyCalender';
import { useAppSelector } from '@/store/types';
import { ImageProp } from '@/types/image.types';
import Image from 'next/image';
import { IButton } from '../../types/button.types';
import Link from 'next/link';
import LongParagraph from '../shared/LongParagraph';
import Title, { LineType } from '../shared/Title';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Timeline from './schedule/Timeline';
import { TimeLineData } from '@/types/ScheduleData';
import Loading from '@/app/loading';
import { formattedDate } from '@/lib/GroupData';

/**
 * Represents the props for the AcademicCalendar component.
 * @property {object} content - The content of the academic calendar.
 * @property {number} content.id - The ID of the academic calendar.
 * @property {string} content.__component - The component type of the academic calendar.
 * @property {string} content.title - The title of the academic calendar.
 * @property {string} content.description - The description of the academic calendar.
 * @property {IButton} content.button - The props for the button component.
 * @property {boolean} content.viewCalender - Indicates whether the calendar should be displayed.
 * @property {object} content.image - The image data for the academic calendar.
 * @property {object
 */

interface IContent{
  data:{
    attributes:{
      title: string;
      description: string;
      name:string;
      needToEdit:boolean;
      url:string;
    }
  }
}
interface AcademicCalenderProps {
  content: {
    title: string;
    description: string;
    imageOrder: string;
    image: ImageProp;
    button: IButton;
    content: IContent
  };
  inSidebar:boolean;
}

/**
 * A functional component that renders an academic calendar.
 * @param {AcademicCalenderProps} content - The content to display in the academic calendar.
 * @returns The rendered academic calendar component.
 */

const fetcher = async (locale: string, dynamicUrl: string) => {
  const res = await axios.get(dynamicUrl + '&locale=' + locale);
  return res.data;
};
const AcademicCalender: React.FC<AcademicCalenderProps> = ({ content , inSidebar }) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const month = useAppSelector((state) => state.schedule.month);
  const [isImageLoading, setIsImageLoading] = React.useState<boolean>(true);
  const [isCalenderLoading, setIsCalenderLoading] = React.useState<boolean>(true);
  const [data, setData] = React.useState<TimeLineData[]>([]);
  const [startOfMonth, setStartOfMonth] = React.useState<string>('');
  const [endOfMonth, setEndOfMonth] = React.useState<string>('');
  
  React.useEffect(() => {
    const startMonth = formattedDate(new Date(month.getFullYear(), month.getMonth(), 1));
    const endMonth = formattedDate(new Date(month.getFullYear(), month.getMonth() + 1, 0));
      setStartOfMonth(startMonth)
      setEndOfMonth(endMonth)
  },[month])
  React.useEffect(() => {
    (async () => {
      setIsCalenderLoading(true)
      let apiUrl = content.content.data.attributes.url;
      let res
      if(content.content.data.attributes.needToEdit && apiUrl){
        if(startOfMonth || endOfMonth){
          apiUrl = apiUrl.replaceAll('StartValue', startOfMonth as unknown as string);
          apiUrl = apiUrl.replaceAll('EndValue', endOfMonth as unknown as string);
          res = await fetcher(locale,apiUrl);
        }
      }
      if (res) {
        setData(res.data)
      }
      setIsCalenderLoading(false)
    })();
  }, [content.content.data.attributes.needToEdit, content.content.data.attributes.url, endOfMonth, startOfMonth, month, locale]);
  const selectedDates = data && data.map(
    (item) => new Date(item.attributes.date),
  );

  return (
    <section className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 mx-auto`}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 justify-between">
          <div className="relative">
            <div className="relative h-full">
              {isImageLoading && (
                <Skeleton
                  className="w-full h-full"
                  baseColor="#fff"
                  highlightColor="#ccc"
                />
              )}
              {content.image.data && (
                <Image
                  className="object-cover w-full h-full transition-opacity opacity-0 duration-100"
                  onLoadingComplete={(image) => {
                    image.classList.remove('opacity-0');
                    setIsImageLoading(false);
                  }}
                  loading="lazy"
                  fill
                  alt={content.image.data.attributes.alternativeText || ''}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content?.image?.data?.attributes?.url}`}
                />
              )}
            </div>
            <div className="absolute mx-8 hidden lg:flex justify-center items-end bg-gray-100 p-2 inset-x-0 z-10 -bottom-1 shadow-md">
              <p className="text-gray-500 md:p-5 ">
                <LongParagraph text={content.description} />
                <br />

                <Link
                  className="text-white mt-4   rounded-sm text-center flex gap-5 items-center max-w-fit px-8 py-2  duration-300 ease-linear hover:bg-secondary transform bg-primary hover:shadow-lg"
                  href={content?.button?.link?.target?.data?.attributes?.slug}
                >
                  {`${content?.button?.link?.label}`}
                </Link>
              </p>
            </div>
          </div>
          <div className="">
            {content.title && (
              <div className="mb-5 w-1/2">
                <Title
                  text={content?.title}
                  textColor={'text-primary'}
                  fontSize={''}
                  fontWeight={'font-bold'}
                  line={LineType.Before}
                  lineColor={'before:bg-secondary'}
                  id="section-title"
                  aria-labelledby="section-title"
                  className=" leading-tight "
                />
              </div>
            )}
            {/* <div className=""></div> */}
            <div className="grid grid-cols-1 justify-between gap-4 bg-gray-100 rounded-lg sm:h-[585px] overflow-hidden">
              <div>
                {' '}
                <EmptyCalendar selectedDates={selectedDates} />
              </div>
              <div>
                <div className="grid grid-cols-1 gap-2">
                {isCalenderLoading?
                <Loading/>:(
                    data.length>0?data.slice(-3).map((item, index) => (
                      <React.Fragment key={index}>
                        <Timeline data={item} index={index} />
                      </React.Fragment>
                    )):
                    <h4 className="text-center">{locale === 'en' ? 'No data available' : 'غير متوفر'}</h4>
                  )}
                  </div>
              </div>
            </div>
          </div>
        </div>
    </section>
  );
};

export default AcademicCalender;
