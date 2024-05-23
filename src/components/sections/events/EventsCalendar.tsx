import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format, getMonth } from 'date-fns';
import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from '@/app/loading';
import { useAppSelector } from '@/store/types';
import { EventData } from '@/types/EventData';
// import { GetServerUrl } from '@/lib/Networking';
import SectionHeader from '../SectionHeader';
import Calendar from '@/components/shared/calendar/Calendar';
import { GetControlsData } from '@/lib/ExtractData';
import { filteredData } from '@/types/CalendarEvent';

/**
 * Interface representing the props for the App component.
 * @interface IAppProps
 * @property {object} content - The content object.
 * @property {object} content.collection_url - The collection_url object.
 * @property {object} content.collection_url.data - The data object.
 * @property {number} content.collection_url.data.id - The ID of the collection.
 * @property {object} content.collection_url.data.attributes - The attributes object.
 * @property {string} content.collection_url.data.attributes.name - The name of the collection.
 * @property {string} content.collection_url.data.attributes.url - The URL of the collection.
 */
interface IAppProps {
  content: {
    content: {
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
 * Represents a data event that contains an array of event data.
 */
interface DataEvent {
  data: EventData[];
}
/**
 * Represents the data structure for calendar data.
 * @interface CalendarData
 * @property {string[]} uniqueCategories - An array of unique categories.
 * @property {filteredData[]} uniqueSeries - An array of unique series.
 * @property {filteredData[]} uniqueSponsor - An array of unique sponsors.
 * @property {filteredData[]} uniqueLocation - An array of unique locations.
 */
interface CalendarData {
  uniqueCategories: string[];
  uniqueSeries: filteredData[];
  uniqueSponsor: filteredData[];
  uniqueLocation: filteredData[];
}

/**
 * Fetches data from a dynamic URL with the specified locale.
 * @param {string} locale - The locale to use for the request.
 * @param {string} dynamicUrl - The dynamic URL to fetch data from.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 */
const fetcher = async (locale: string, dynamicUrl: string) => {
  const res = await axios.get(dynamicUrl + '&locale=' + locale);
  return res.data;
};

/**
 * A functional component that renders an events calendar.
 * @param {IAppProps} content - The props object containing the content data.
 * @returns The rendered events calendar component.
 */
const EventsCalendar: React.FunctionComponent<IAppProps> = ({ content }) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const [data, setData] = useState<DataEvent>();

  const [filteredData, setFilteredData] = useState<DataEvent>();
  const [calendarControls, setCalendarControls] = useState<CalendarData>();

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const eventFilters = useAppSelector((state) => state.event.eventFilters);
  const selectedDate = useAppSelector((state) => state.event.singleDate);

  // ! Component cannot be a server component in the future unless we decouple the useEffect and useAppSelecter into a child client component
  // ! We need to decide if a component like this is planned to be a server component in the future
  /**
   * useEffect hook that fetches data from the specified URL based on the given locale and
   * updates the state variables accordingly.
   * @param {string} locale - The locale to use for fetching the data.
   * @param {string} content.collection_url.data.attributes.url - The URL to fetch the data from.
   * @returns None
   */
  useEffect(() => {
    (async () => {
      const res = await fetcher(
        locale,
        content?.content?.data?.attributes?.url,
      );

      const controlledData = await GetControlsData(res);

      setCalendarControls(controlledData);
      setData(res);
      setIsLoading(false);
    })();
  }, [locale, content]);

  /**
   * useEffect hook that filters the data based on the provided event filters and selected date.
   * @param {object} eventFilters - The event filters object containing category, unique series, unique sponsor, unique location, and selected date range.
   * @param {boolean} isLoading - A boolean indicating whether the data is still loading.
   * @param {string} selectedDate - The selected date in string format.
   * @param {object} data - The data object containing the events data.
   * @returns None
   */
  useEffect(() => {
    if (!data) return;

    const eventData = data?.data.filter(() => {
      const isCategoryMatching = true;
      const isDateRangeMatching = true;
      const isSingleDateMatching = true;
      const isLocationMatching = true;
      const isSeriesMatching = true;
      const isSponsorMatching = true;

      // if (eventFilters.categories !== 'All Events')
      //   if (eventFilters.uniqueSeries !== 'All Series') {
      //     // isCategoryMatching =
      //     //   event.attributes.category === eventFilters.category;

      //     isSeriesMatching = event.attributes.series.some(
      //       (ser) => ser.seriesName === eventFilters.uniqueSeries,
      //     );
      //   }

      // if (eventFilters.uniqueSponsor !== 'All Sponsors') {
      //   isSponsorMatching = event.attributes.sponsors.some(
      //     (spo) => spo.sponsorName === eventFilters.uniqueSponsor,
      //   );
      // }

      // if (eventFilters.uniqueLocation !== 'All Locations') {
      //   isLocationMatching =
      //     event.attributes.location.locationName ===
      //     eventFilters.uniqueLocation;
      //   // isLocationMatching = event.attributes.location.some(
      //   //   (loc) => loc.locationName === eventFilters.uniqueLocation,
      //   // );
      // }

      // if (selectedDate) {
      //   isSingleDateMatching =
      //     format(new Date(selectedDate), 'dd-MM-yyyy') ===
      //     format(new Date(event.attributes.date), 'dd-MM-yyyy');
      // }

      // if (
      //   eventFilters.selectedDateRange?.from &&
      //   eventFilters.selectedDateRange?.to
      // ) {
      //   isDateRangeMatching =
      //     new Date(event.attributes.date) >=
      //       new Date(eventFilters.selectedDateRange.from) &&
      //     new Date(event.attributes.date) <=
      //       new Date(eventFilters.selectedDateRange.to);
      // }

      // If date range is not defined (not selected in the calendar for example) we apply no filter based on date
      return (
        isCategoryMatching &&
        isDateRangeMatching &&
        isSingleDateMatching &&
        isLocationMatching &&
        isSponsorMatching &&
        isSeriesMatching
      );
    });

    setFilteredData({ ...data, data: eventData });
  }, [eventFilters, isLoading, selectedDate, data]);

  return (
    <section className="w-full relative">
      {calendarControls !== undefined ? (
        <div className="w-full px-10 md:px-10 lg:px-20 py-10">
          <SectionHeader sectionTitle={'Events'} />

          <div className="grid grid-cols-1 lg:grid-cols-6 gap-5">
            <div className="lg:col-span-2 md:col-span-2">
              <Calendar content={calendarControls!} />
            </div>

            {/* event block */}
            {isLoading ? (
              <Loading />
            ) : (
              // <div className="col-span-1  lg:col-span-2   border-indigo-300 px-1">
              <div className="lg:col-span-4 lg:border-l-4 lg:border-secondary lg:ps-7 ">
                {filteredData?.data.map((event: EventData, index: number) => {
                  return (
                    <div
                      className="flex lg:flex-nowrap md:flex-nowrap shadow-md lg:shadow-none md:shadow-none flex-wrap  gap-8 mt-4 first:mt-0"
                      key={index}
                    >
                      <div className="relative h-full w-full md:h-[200px] md:min-w-[200px] md:max-w-[250px] lg:h-[200px] lg:w-[250px] overflow-hidden">
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${event?.attributes?.images?.data[0]?.attributes?.url}`}
                          alt={
                            event?.attributes?.images?.data[0]?.attributes
                              ?.alternativeText
                          }
                          height={250}
                          width={250}
                          className="w-full object-cover h-full transition-opacity opacity-0 duration-100"
                          onLoadingComplete={(image) =>
                            image.classList.remove('blur-lg')
                          }
                        />

                        <div className="overlay w-14 h-14 bg-black bg-opacity-70 px-4 py-2 absolute top-2 right-2 flex flex-col items-center justify-center text-white text-center">
                          <div className=" text-base font-bold">
                            {format(new Date(event?.attributes?.date), 'dd')}
                          </div>
                          <div className="text-sm">
                            {format(
                              new Date(
                                0,
                                getMonth(new Date(event?.attributes?.date)),
                              ),
                              'MMM',
                            )}
                          </div>
                        </div>
                      </div>
                      <div className="p-4 lg:p-0 md:p-0">
                        <h2 className="text-xl text-gray-700 font-bold pt-2">
                          <Link href={`events/${event?.attributes?.slug}`}>
                            {event.attributes.title}
                          </Link>
                        </h2>
                        <p className="pt-4 text-sm text-gray-500 line-clamp-3">
                          {event.attributes.description}
                        </p>
                        <p className="mt-2 pb-5 text-sm text-gray-500">
                          At{' '}
                          {format(new Date(event?.attributes?.date), 'HH:mm')}
                        </p>
                        <Link href={`events/${event?.attributes?.slug}`}>
                          <div className="p-2 px-4 inline-block rounded bg-primary text-white text-sm font-bold hover:bg-secondary ">
                            {locale === 'en' ? 'Details' : 'التفاصيل'}
                          </div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
              </div>
              // </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default EventsCalendar;
