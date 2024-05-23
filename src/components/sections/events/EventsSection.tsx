import * as React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { format } from 'date-fns';
import Button from '@/components/shared/Button';
import { usePathname } from 'next/navigation';

import axios from 'axios';
import { useState, useEffect } from 'react';
import Loading from '@/app/loading';
import { useAppSelector } from '@/store/types';
import { EventData } from '@/types/EventData';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Calendar from '@/components/shared/calendar/Calendar';
import { GetControlsData } from '@/lib/ExtractData';
import { filteredData } from '@/types/CalendarEvent';
import { Meta } from '@/types/ContentData';
// import SectionHeader from '../SectionHeader';

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
    count: {
      component: string;
      content: {
        data: {
          attributes: {
            name: string;
            url: string;
          };
        };
      };
      targetPage: {
        data: {
          attributes: {
            slug: string;
          };
        };
      };
    };
  };
}

/**
 * Represents a data event that contains an array of event data.
 * @interface DataEvent
 * @property {EventData[]} data - An array of event data.
 */
interface DataEvent {
  data: EventData[];
  meta?: Meta;
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
 * @returns {Promise<any>} A promise that resolves to the fetched data.
 */
const fetcher = async (locale: string, dynamicUrl: URL) => {
  const res = await axios.get(dynamicUrl + '&locale=' + locale);
  return res.data;
};

/**
 * A functional component that renders the Events section of the application.
 * @param {IAppProps} content - The props object containing the content data.
 * @returns The rendered Events section.
 */
const EventsSection: React.FunctionComponent<IAppProps> = ({ content }) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const [data, setData] = useState<DataEvent>();
  const [filteredData, setFilteredData] = useState<DataEvent | undefined>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [calendarControls, setCalendarControls] = useState<CalendarData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const eventFilters = useAppSelector((state) => state.event.eventFilters);
  const selectedDate = useAppSelector((state) => state.event.singleDate);
  const pathName = usePathname();
  const [isImageLoading, setIsImageLoading] = useState(true);

  // ! Component cannot be a server component in the future unless we decouple the useEffect and useAppSelecter into a child client component
  // ! We need to decide if a component like this is planned to be a server component in the future
  /**
   * Executes an asynchronous function that fetches data from a specified URL and updates the state variables
   * with the fetched data.
   * @param {string} locale - The locale to use for the fetch request.
   * @param {string} url - The URL to fetch the data from.
   * @returns None
   */
  useEffect(() => {
    (async () => {
      const apiUrl = new URL(content.count.content.data.attributes.url);

      apiUrl.searchParams.set('pagination[page]', currentPage.toString());
      const res = await fetcher(locale, apiUrl);
      const controlledData = await GetControlsData(res);
      setCalendarControls(controlledData);
      setData(res);
      setIsLoading(false);
    })();
  }, [locale, content, currentPage]);
  /**
   * A useEffect hook that filters the data based on the provided event filters and selected date.
   * @param {Function} callback - The callback function to execute when the dependencies change.
   * @param {Array} dependencies - The dependencies that trigger the callback function.
   * @returns None
   */
  useEffect(() => {
    if (!data) return;
    const eventData = data?.data.filter((event: EventData) => {
      const isCategoryMatching =
        event.attributes.categories.data[0]?.attributes.name ===
        eventFilters.categories;

      const isSeriesMatching = event.attributes.series.some(
        (ser) => ser.seriesName === eventFilters.uniqueSeries,
      );

      const isSponsorMatching = event.attributes.sponsors.some(
        (spo) => spo.sponsorName === eventFilters.uniqueSponsor,
      );

      const isLocationMatching =
        event.attributes.location.locationName === eventFilters.uniqueLocation;

      const isSingleDateMatching =
        selectedDate &&
        format(new Date(selectedDate), 'dd-MM-yyyy') ===
          format(new Date(event.attributes.date), 'dd-MM-yyyy');

      const isDateRangeMatching =
        eventFilters.selectedDateRange?.from &&
        eventFilters.selectedDateRange?.to &&
        new Date(event.attributes.date) >=
          new Date(eventFilters.selectedDateRange.from) &&
        new Date(event.attributes.date) <=
          new Date(eventFilters.selectedDateRange.to);

      return (
        isCategoryMatching ||
        isSeriesMatching ||
        isSponsorMatching ||
        isLocationMatching ||
        isSingleDateMatching ||
        isDateRangeMatching
      );
    });

    setFilteredData((prevData) => ({
      data: eventData || prevData?.data || [],
    }));
  }, [eventFilters, isLoading, selectedDate, currentPage, data]);

  const handlePaginationClick = (currentPage: number) => {
    setCurrentPage(currentPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Use 'auto' for instant scroll
    });
  };
  const renderPaginationBullets = React.useMemo(() => {
    if (!data || !data?.meta) {
      return null;
    }

    const { pagination }: Meta = data?.meta;
    const bullets = [];

    for (let i = 1; i <= pagination.pageCount; i++) {
      bullets.push(
        <button
          title={`show more news from page ${i}`}
          disabled={currentPage === i}
          key={i}
          className={`mx-1 w-4 h-4 rounded-full ${
            currentPage === i
              ? 'bg-secondary '
              : 'bg-primary hover:bg-secondary'
          }`}
          aria-label={`show more news from page ${i}`}
          onClick={() => handlePaginationClick(i)}
        />,
      );
    }

    return (
      <div className="flex justify-center items-center mt-4">{bullets}</div>
    );
  }, [data, currentPage]);

  return (
    <section className="w-full relative">
      {calendarControls !== undefined ? (
        <div className="w-full px-5 md:px-10 lg:px-20">
          <div className="grid grid-flow-row-dense ps-0 sm:grid-cols-1 lg:grid-cols-4">
            <div className=" lg:border-r-4 lg:border-r-gray-200  xxl:px-20 lg:pe-4">
              <Calendar content={calendarControls} />
            </div>

            {/* event block */}
            {isLoading ? (
              <Loading />
            ) : (
              <div className="col-span-1 md:col-span-2 lg:col-span-3 border-indigo-300 px-1 py-4">
                <div className="grid sm:grid-cols-1   gap-5 md:ps-5 lg:ps-5">
                  {filteredData?.data && filteredData.data.length > 0
                    ? // If there are filtered data, render the filtered events
                      filteredData.data.map((event: EventData) => (
                        <div className=" p-0" key={event.id}>
                          <div className="grid grid-cols-3 gap-8">
                            <div className="col-span-1 h-60 mb-4">
                              <Link
                                href={
                                  content.count.targetPage.data.attributes
                                    .slug !== undefined
                                    ? pathName === '/'
                                      ? `/${content.count.targetPage.data.attributes.slug}/${event?.id}`
                                      : `${pathName}/${content.count.targetPage.data.attributes.slug}/${event?.id}`
                                    : ''
                                }
                                className="inline"
                              >
                                {isImageLoading && (
                                  <Skeleton
                                    className="w-full h-full"
                                    baseColor="#fff"
                                    highlightColor="#ccc"
                                  />
                                )}
                                <Image
                                  alt={
                                    event.attributes.images.data[0].attributes
                                      .alternativeText || ''
                                  }
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${event.attributes.images.data[0].attributes.url}`}
                                  height={500}
                                  width={500}
                                  className="w-full h-full object-cover transition-opacity opacity-0 duration-100"
                                  onLoadingComplete={(image) => {
                                    image.classList.remove('opacity-0');
                                    setIsImageLoading(false);
                                  }}
                                  loading="lazy"
                                />
                              </Link>
                            </div>

                            <div className="col-span-2">
                              <h2 className="text-2xl font-bold mb-2">
                                <Link
                                  href={
                                    content.count.targetPage.data.attributes
                                      .slug !== undefined
                                      ? pathName === '/'
                                        ? `/${content.count.targetPage.data.attributes.slug}/${event?.id}`
                                        : `${pathName}/${content.count.targetPage.data.attributes.slug}/${event?.id}`
                                      : ''
                                  }
                                >
                                  {event.attributes.title}
                                </Link>
                              </h2>
                              <p className="text-sm text-gray-500 mb-2">
                                {event.attributes.description.slice(0, 300)}
                              </p>
                              <p className="text-sm text-gray-500 mb-2">
                                {format(
                                  new Date(event.attributes.date),
                                  `'At' h:mm a`,
                                )}
                              </p>
                              <Link
                                href={
                                  content.count.targetPage.data.attributes
                                    .slug !== undefined
                                    ? pathName === '/'
                                      ? `/${content.count.targetPage.data.attributes.slug}/${event?.id}`
                                      : `${pathName}/${content.count.targetPage.data.attributes.slug}/${event?.id}`
                                    : ''
                                }
                                className="inline"
                              >
                                <Button
                                  text="Details"
                                  backgroundColor="bg-primary"
                                  fontSize="text-sm"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))
                    : // If there are no filters, render all events
                      data?.data.map((event: EventData) => (
                        <div className=" p-0" key={event.id}>
                          <div className="grid grid-cols-3 gap-8">
                            <div className="col-span-1 h-60 mb-4">
                              <Link
                                href={
                                  content.count.targetPage.data.attributes
                                    .slug !== undefined
                                    ? pathName === '/'
                                      ? `/${content.count.targetPage.data.attributes.slug}/${event?.id}`
                                      : `${pathName}/${content.count.targetPage.data.attributes.slug}/${event?.id}`
                                    : ''
                                }
                                className="inline"
                              >
                                {isImageLoading && (
                                  <Skeleton
                                    className="w-full h-full"
                                    baseColor="#fff"
                                    highlightColor="#ccc"
                                  />
                                )}
                                <Image
                                  alt={
                                    event.attributes.images.data[0].attributes
                                      .alternativeText || ''
                                  }
                                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${event.attributes.images.data[0].attributes.url}`}
                                  height={500}
                                  width={500}
                                  className="w-full h-full object-cover transition-opacity opacity-0 duration-100"
                                  onLoadingComplete={(image) => {
                                    image.classList.remove('opacity-0');
                                    setIsImageLoading(false);
                                  }}
                                  loading="lazy"
                                />
                              </Link>
                            </div>

                            <div className="col-span-2 flex flex-col">
                              <h3 className=" mb-2 basis-2/12">
                                <Link
                                  href={
                                    content.count.targetPage.data.attributes
                                      .slug !== undefined
                                      ? pathName === '/'
                                        ? `/${content.count.targetPage.data.attributes.slug}/${event?.id}`
                                        : `${pathName}/${content.count.targetPage.data.attributes.slug}/${event?.id}`
                                      : ''
                                  }
                                >
                                  {event.attributes.title}
                                </Link>
                              </h3>
                              <p className="text-gray-500  basis-5/12 line-clamp-3">
                                {event.attributes.description.slice(0, 250)}
                              </p>
                              <p className="text-gray-500 mb-2 basis-1/12">
                                {format(
                                  new Date(event.attributes.date),
                                  `'At' h:mm a`,
                                )}
                              </p>
                              <Link
                                // href={`event/${event.id}`}
                                href={
                                  content.count.targetPage.data.attributes
                                    .slug !== undefined
                                    ? pathName === '/'
                                      ? `/${content.count.targetPage.data.attributes.slug}/${event?.id}`
                                      : `${pathName}/${content.count.targetPage.data.attributes.slug}/${event?.id}`
                                    : ''
                                }
                                className="inline basis-4/12"
                              >
                                <Button
                                  text="Details"
                                  backgroundColor="bg-primary"
                                  fontSize="text-lg"
                                />
                              </Link>
                            </div>
                          </div>
                        </div>
                      ))}
                  {renderPaginationBullets}
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <Loading />
      )}
    </section>
  );
};

export default EventsSection;
