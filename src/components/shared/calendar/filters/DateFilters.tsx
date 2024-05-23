// import { createQueryString } from '@/lib/QueryParams';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { format } from 'date-fns';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/types';
import { useEffect, useState } from 'react';
import { setCustomDateRange, setEventFilters, setSingleDateRange } from '@/store/eventSlice';
import { DateRange } from 'react-day-picker';


/**
 * Represents the properties of a DateFilter component.
 * @interface DateFilterProps
 * @property {Object} styles - The styles to apply to the component. It is an object with
 * key-value pairs where the key is a string representing the style property and the value
 * is a string representing the style value.
 */
interface DateFilterProps {
  styles: { [key: string]: string };
}

/**
 * A component that displays date filters and allows the user to select a date range.
 * @param {DateFilterProps} styles - The styles for the component.
 * @returns The DateFilters component.
 */
const DateFilters = ({ styles }: DateFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const locale = useAppSelector((state) => state.lang.locale);
  const dispatch = useDispatch();
  const customDateRange = useAppSelector(
    (state) => state.event.selectedCustomDateRange,
  );
  const eventFilters = useAppSelector((state) => state.event.eventFilters);

  const [selectedDateRangeRadio, setSelectedDateRangeRadio] = useState<string>(
    searchParams.get('rangeType') ?? '',
  );

  /**
   * A dictionary of functions that return a date or date range based on the specified key.
   * @type {Object}
   * @property {Function} day - Returns the current day as a date range from midnight to 11:59:59 PM.
   * @property {Function} week - Returns a date range for the current week, from today to one week later.
   * @property {Function} month - Returns a date range for the current month, from the first day to the last day.
   * @returns {Date | DateRange} The date or date range based on the specified key.
   */
  const filterDateRange: { [key: string]: () => Date | DateRange } = {
    day: () => {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const endOfDay = new Date(today);
      endOfDay.setHours(23, 59, 59, 999);

      const Day= today;
     
      dispatch(setSingleDateRange(Day));
      return Day;
    },
    week: () => {
      const today = new Date();
      const oneWeekLater = new Date(today);
      oneWeekLater.setDate(oneWeekLater.getDate() + 7);
      const newRange = { from: today, to: oneWeekLater };
      dispatch(
        setEventFilters({ ...eventFilters, selectedDateRange: newRange }),
      );

      return newRange;
    },
    month: () => {
      const today = new Date();
      const startOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
      const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      const newRange = { from: startOfMonth, to: endOfMonth };
      dispatch(
        setEventFilters({ ...eventFilters, selectedDateRange: newRange }),
      );

      return newRange;
    },
  };


  /**
   * Handles the change event for a range radio button in a React component.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event object.
   * @returns None
   */
  const handleRangeRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const filterChoice = event.target.value;
    // Update calendar
    setSelectedDateRangeRadio(filterChoice);
    const lowerCaseFilterChoice = filterChoice.toLowerCase();
    if (lowerCaseFilterChoice in filterDateRange) {
      const newRange = filterDateRange[lowerCaseFilterChoice]();
      if (filterChoice !== 'Day') {
      
        const rangeFrom = format(
          (newRange as DateRange)?.from ?? new Date(),
          'dd-MM-yyyy',
        );
        const rangeTo = format(
          (newRange as DateRange)?.to ?? new Date(),
          'dd-MM-yyyy',
        );

        const queryString = `?rangeType=${filterChoice}&from=${rangeFrom}&to=${rangeTo}`;

        router.replace(`${pathname}${queryString}`, { scroll: false });
      } else {
        const day = format(new Date(), 'dd-MM-yyyy');

        const queryString = `?rangeType=${filterChoice}&Day=${day}`;
        router.replace(`${pathname}${queryString}`, { scroll: false });
      }
    }
  };
  const handleCustomDateRangeChange = (
    newDate: string,
    rangePoint: 'from' | 'to',
  ) => {
    const newRange = { ...customDateRange, [rangePoint]: new Date(newDate) };
    dispatch(setCustomDateRange(newRange as DateRange));
    dispatch(setEventFilters({ ...eventFilters, selectedDateRange: newRange as DateRange}));

    const rangeFrom = format(newRange?.from ?? new Date(), 'dd-MM-yyyy');
    const rangeTo = format(newRange?.to ?? new Date(), 'dd-MM-yyyy');


    /**
     * Updates the URL query string and navigates to the new URL using the router.
     * @param {string} pathname - The current pathname of the URL.
     * @param {string} rangeFrom - The starting range value for the custom range.
     * @param {string} rangeTo - The ending range value for the custom range.
     * @param {object} router - The router object used for navigation.
     * @returns None
     */
    const queryString=`?rangeType=custom&from=${rangeFrom}&to=${rangeTo}`;
    router.push(`${pathname}${queryString}`, { scroll: false });
  };

  const dateRangeRadios = ['Day', 'Week', 'Month']

  /**
   * useEffect hook that updates the selected date range radio button when the customDateRange prop changes.
   * @param {function} setSelectedDateRangeRadio - The function to update the selected date range radio button.
   * @param {string} customDateRange - The custom date range prop.
   * @returns None
   */
  useEffect(() => {
    setSelectedDateRangeRadio('');
  }, [customDateRange]);

  return (
    <>
      <form
        className={`${styles.calendar__radios} flex flex-row justify-between w-full py-4`}
      >
        {dateRangeRadios.map((range) => (
          <label key={range} htmlFor={`calendar-radio-${range.toLowerCase()}`}  className='text-sm lg:text-sm flex items-center'>
            <input
              id={`calendar-radio-${range.toLowerCase()}`}
              type="radio"
              value={range}
              name={range.toLowerCase()}
              checked={selectedDateRangeRadio === range}
              onChange={handleRangeRadioChange}
              className='me-1'
            />
            {' '+range}
          </label>
        ))}
      </form>

      <form className="py-2">
        <div className="p-2 px-0">
          <label
            htmlFor="calendar-radio-custome-range"
            className="border-black text-sm"
          >
            {locale==='en'?'Custom Date Range':'تخصيص نطاق زمني محدد'}
          </label>
        </div>
        <input
          id="calendar-radio-range1"
          type="date"
          name="range1"
          placeholder=" "
          value={
            customDateRange?.from
              ? format(customDateRange.from, 'yyyy-MM-dd')
              : ''
          }
          onChange={(e) => handleCustomDateRangeChange(e.target.value, 'from')}
        />
        <label> to </label>
        <input
          id="calendar-radio-range2"
          type="date"
          name="range2"
          placeholder=" "
          value={
            customDateRange?.to ? format(customDateRange.to, 'yyyy-MM-dd') : ''
          }
          onChange={(e) => handleCustomDateRangeChange(e.target.value, 'to')}
        />
      </form>
    </>
  );
};

export default DateFilters;
