'use client';

import AcademicCalender from '@/components/sections/schedule/AcademicCalender';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAppSelector } from '@/store/types';
import { IScheduleData } from '@/types/ScheduleData';
import Loading from '@/app/loading';
import AcademicCalenderFilter from './AcademicCalenderFilter';
import styles from '../../../styles/calendar.module.css';
import Timelines from './Timelines';

interface IAppProps {
  content: {
      id: number;
      __component: string;
      academicYears: {
          data: {
              id:number
              attributes: {
                  name: string;
                  url: string;
                  locale: string;
                  needToEdit: boolean;
                  createdAt: string;
              };
          };
      };
      timeline: {
          data: {
              id: number;
              attributes: {
                  name: string;
                  url: string;
                  locale: string;
                  needToEdit: boolean;
                  createdAt: string;
              };
          };
      };
      related: {
        id:number;
        link:string;
        mainTitle:string;
      }[];
  };
}

const fetcher = async (locale: string, dynamicUrl: URL) => {
  const res = await axios.get(dynamicUrl + '&locale=' + locale);
  return res.data;
};

  const Schedule: React.FunctionComponent<IAppProps> = ({ content }) => {
    const locale = useAppSelector((state) => state.lang.locale);
    const [data, setData] = useState<IScheduleData>();
    const [isLoading, setIsLoading] = useState<boolean>(true);
    useEffect(() => {
      (async () => {
        const apiUrl = new URL(content.academicYears.data.attributes.url);
        const res = await fetcher(locale, apiUrl);
        setData(res);
        setIsLoading(false);
      })();
    }, [locale, content]);
  return (
      <section className="w-full relative">
        <div className="w-full">
          <div className="grid grid-flow-row-dense ps-0 sm:grid-cols-1 lg:grid-cols-4">
            <div className=" lg:border-e-4 border-e-gray-200">
              <div className='w-full block sm:flex  lg:block'>
                <AcademicCalender />
                <AcademicCalenderFilter content={content} data={data} styles={styles} />
              </div>
            </div>
            {isLoading ? (
              <Loading />
            ):(
            <Timelines content={content.timeline}/>
          )}
          </div>
        </div>
      </section>
  );
}

export default Schedule;