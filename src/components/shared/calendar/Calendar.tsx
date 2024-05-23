'use client';
import 'react-day-picker/dist/style.css';
import styles from '../../../styles/calendar.module.css';
import '../../../styles/calendarStyle.css';
import {
  DayPicker,
  ClassNames,
  DateFormatter,
  DateRange,
} from 'react-day-picker/dist/index';
import EventFilters from './filters/EventFilters';
import { filteredData } from '@/types/CalendarEvent';
import React, { useEffect } from 'react';
// import CustomCaption from './CalendarCustomCaption';
import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import { parse, format } from 'date-fns';
// import { createQueryString } from '@/lib/QueryParams';
import { useAppDispatch, useAppSelector } from '@/store/types';
import {
  setCustomDateRange,
  setEventFilters,
  setSingleDateRange,
} from '@/store/eventSlice';
import { eventPropertyLabel } from './filters/eventPropertyLabels';
import DateFilters from './filters/DateFilters';

/**
 * Interface representing the properties of a calendar component.
 * @interface ICalendarProps
 * @property {Object} content - The content of the calendar.
 * @property {string[]} content.uniqueCategories - An array of unique categories.
 * @property {filteredData[]} content.uniqueSeries - An array of unique series.
 * @property {filteredData[]} content.uniqueSponsor - An array of unique sponsors.
 * @property {filteredData[]} content.uniqueLocation - An array of unique locations.
 */
interface ICalendarProps {
  content: {
    uniqueCategories: string[];
    uniqueSeries: filteredData[];
    uniqueSponsor: filteredData[];
    uniqueLocation: filteredData[];
  };
}

/**
 * A calendar component that displays events and allows users to select dates.
 * @param {ICalendarProps} content - The content to be displayed in the calendar.
 * @returns The Calendar component.
 */
const Calendar = ({ content }: ICalendarProps) => {
  // Using these variables to manipulate the url search params
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  // const searchArrayParams = Array.from(searchParams.entries());

  // Setting default date range to be retrieved from search params, otherwise it is set to today
  let defaultDateRange: DateRange;
  const urlStringStartDate = searchParams.get('from');
  const urlStringEndDate = searchParams.get('to');
  if (!urlStringStartDate || !urlStringEndDate) {
    defaultDateRange = { from: undefined, to: undefined };
  } else {
    const parsedDateFrom = parse(urlStringStartDate, 'dd-MM-yyyy', new Date());
    const parsedDateTo = parse(urlStringEndDate, 'dd-MM-yyyy', new Date());
    defaultDateRange = { from: parsedDateFrom, to: parsedDateTo };
  }
  let singleDate: Date | undefined;
  const urlStringSelectedDate = searchParams.get('day');
  if (!urlStringSelectedDate) singleDate = undefined;
  else singleDate = parse(urlStringSelectedDate, 'dd-MM-yyyy', new Date());

  // Retrieving redux state
  const dispatch = useAppDispatch();
  const eventFilters = useAppSelector((state) => state.event.eventFilters);
  const singleday = useAppSelector((state) => state.event.singleDate);

  // React Day Picker allows for nested components class name modification through passing this object as a prop
  const classNames: ClassNames = {
    ...styles,
    day_selected: styles.day_selected,
    day_today: styles.day_today,
    head: styles.head,
    head_cell: styles.head_cell,
    button: styles.button,
    cell: styles.cell,
    day_outside: styles.day_outside,

    root: styles.rdp,
  };

  const formatWeekdayName: DateFormatter = (date) => {
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const dayName = days[date.getDay()];
    return dayName.slice(0, 3);
  };

  /**
   * Handles the change of a date range.
   * @param {Date | undefined} newDate - The new date selected for the range. If undefined, the current date is used.
   * @returns None
   */
  const handleDateRangeChange = (newDate?: Date) => {
    dispatch(setSingleDateRange(newDate));

    const selectedDay = format(newDate ?? new Date(), 'dd-MM-yyyy');
    // Passing multiple arrays of key-value pairs to adjust search params through the custom made function createQueryString
    const queryString = `?filterType=Day&Day=${selectedDay}`;
    // const query = createQueryString(searchArrayParams, ['rangeType', 'custom'], ['day', selectedDay]);
    router.replace(`${pathname}${queryString}`, { scroll: false });
  };

  /**
   * Executes the provided callback function after the component has been rendered.
   * It dispatches multiple actions to set the custom date range, event filters, and single date range.
   * @param {Function} callback - The callback function to execute.
   * @returns None
   */
  useEffect(() => {
    dispatch(setCustomDateRange(defaultDateRange));
    dispatch(
      setEventFilters({
        ...eventFilters,
        selectedDateRange: defaultDateRange,
        categories: searchParams.get('eventType') ?? 'All Events',
        uniqueSeries: searchParams.get(eventPropertyLabel['uniqueSeries']) ?? 'All Series',
        uniqueSponsor: searchParams.get(eventPropertyLabel['uniqueSponsor']) ?? 'All Sponsors',
        uniqueLocation: searchParams.get(eventPropertyLabel['uniqueLocation']) ?? 'All Locations',
      }),
    );
    dispatch(setSingleDateRange(singleDate));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className={` w-full block sm:flex gap-4 lg:block`}>
        <>
          <div className={`${styles.calendar_wrapper} DayPicker`}>
            <DayPicker
              className="w-full DayPicker"
              classNames={classNames}
              selected={singleday}
              onSelect={(newDate: Date | undefined) =>
                handleDateRangeChange(newDate)
              }
              mode={'single'}
              showOutsideDays
              fixedWeeks
              formatters={{ formatWeekdayName }}
              // components={{
                //   Caption: CustomCaption,
                // }}
              />
            <DateFilters styles={styles} />
          </div>
          <EventFilters content={content} />
        </>
      </div>
    </>
  );
};

export default Calendar;
