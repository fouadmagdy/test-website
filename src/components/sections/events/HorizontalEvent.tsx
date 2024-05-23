import Image from 'next/image';
import React, { useEffect } from 'react';
import { format, getMonth } from 'date-fns';
// import Calendar from '@/components/shared/calendar/Calendar';
import useSWR, { useSWRConfig } from 'swr';
import axios from 'axios';
import { EventData } from '@/types/EventData';
import Link from 'next/link';
import { useAppSelector } from '@/store/types';

/**
 * Fetches data from the specified URL using the axios library.
 * @param {string} url - The URL to fetch data from.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 */
const fetcher = async (url: string) => {
  const res = await axios.get(url);
  return res.data;
};
/**
 * Represents the properties of an event.
 * @interface EventProps
 * @property {object} content - The content of the event.
 * @property {object} content.collection_url - The collection URL of the event.
 * @property {object} content.collection_url.data - The data of the collection URL.
 * @property {number} content.collection_url.data.id - The ID of the event.
 * @property {object} content.collection_url.data.attributes - The attributes of the event.
 * @property {string} content.collection_url.data.attributes.name - The name of the event.
 * @property {string} content.collection_url.data.attributes.url - The URL of the event.
 */
interface EventProps {
  content: {
    collection_url: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
        };
      };
    };
  };
}
/**
 * A functional component that renders a horizontal event display.
 * @param {EventProps} content - The props containing the event data.
 * @returns The rendered JSX for the horizontal event display.
 */
const HorizontalEvent: React.FunctionComponent<EventProps> = ({ content }) => {
  const locale = useAppSelector((state) => state.lang.locale);
  /**
   * Retrieves event data using the useSWR hook and fetches the data from the specified URL.
   * @param {string} content - The content to fetch.
   * @returns None
   */
  const { mutate } = useSWRConfig();
  const { data } = useSWR(`EventData/event/${content}`, () =>
    fetcher(content.collection_url.data.attributes.url),
  );

  /**
   * Executes a side effect that triggers a mutation with the given event data.
   * @param {string} content - The content to be used in the mutation.
   * @returns None
   */
  useEffect(() => {
    mutate([`EventData/event/${content}`]);
  }, [mutate, content]);

  return (
    <div className="container px-10 lg:px-20">
      <div className="grid  grid-cols-1 lg:grid-cols-6 gap-5">
        {/* Calendar takes 1/3 of the page */}
        <div className="lg:col-span-2 md:col-span-2  "></div>
        {/* Content takes 2/3 of the page */}
        <div className="lg:col-span-4 lg:border-l-4 lg:border-secondary lg:ps-7 ">
          {data?.data.map((event: EventData, index: number) => (
            <div
              className="flex lg:flex-nowrap md:flex-nowrap shadow-md lg:shadow-none md:shadow-none flex-wrap  gap-8 mt-4 first:mt-0"
              key={index}
            >
              <div className="relative h-full w-full md:h-[200px] md:min-w-[200px] md:max-w-[250px] lg:h-[200px] lg:min-w-[200px] lg:max-w-[250px] overflow-hidden">
                <Image
                  src={`https://strapi.zcltsdev.com${event.attributes.images.data[0].attributes.url}`}
                  alt={
                    event.attributes.images.data[0].attributes.alternativeText
                  }
                  height={250}
                  width={250}
                  className="w-full object-cover h-full transition-opacity opacity-0 duration-100"
                  onLoadingComplete={(image) =>
                    image.classList.remove('opacity-0')
                  }
                />

                <div className="overlay w-14 h-14 bg-black bg-opacity-70 px-4 py-2 absolute top-2 right-2 flex flex-col items-center justify-center text-white text-center">
                  <div className=" text-base font-bold">
                    {format(new Date(event.attributes.date), 'dd')}
                  </div>
                  <div className="text-sm">
                    {format(
                      new Date(0, getMonth(new Date(event.attributes.date))),
                      'MMM',
                    )}
                  </div>
                </div>
              </div>
              <div className="p-4 lg:p-0 md:p-0">
                <h2 className="text-xl text-gray-700 font-bold pt-2">
                  <Link href={`events/${event.id}`}>
                    {event.attributes.title}
                  </Link>
                </h2>
                <p className="pt-4 text-sm text-gray-500 line-clamp-3">
                  {event.attributes.description}
                </p>
                <p className="mt-2 pb-5 text-sm text-gray-500">
                  At {format(new Date(event.attributes.date), 'HH:mm')}
                </p>
                <Link href={`events/${event.id}`}>
                  <div className="p-2 px-4 inline-block rounded bg-primary text-white text-sm font-bold hover:bg-secondary ">
                    {locale === 'en' ? 'Details' : 'التفاصيل'}
                  </div>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HorizontalEvent;
