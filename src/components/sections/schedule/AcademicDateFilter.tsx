// import { createQueryString } from '@/lib/QueryParams';
import { useRouter, usePathname } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '@/store/types';
import { setSingleDateRange,setSelectedDateRange, setFilterType, setAcademicYear,setYear } from '@/store/scheduleSlice';
import { DateRange } from 'react-day-picker';
import { Button } from '@material-tailwind/react';
import { AiOutlineReload } from 'react-icons/ai';


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
const AcademicDateFilter = ({ styles }: DateFilterProps) => {
  const router = useRouter();
  const pathname = usePathname();
  const currentAcademicYear = useAppSelector((state) => state.schedule.currentAcademicYear);
  const currentYear = useAppSelector((state) => state.schedule.currentYear);
  const filterType = useAppSelector((state) => state.schedule.filterType);
  const dispatch = useDispatch();

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
        setSelectedDateRange(newRange),
      );

      return newRange;
    },
  };


  /**
   * Handles the change schedule for a range radio button in a React component.
   * @param {React.ChangeEvent<HTMLInputElement>} schedule - The change schedule object.
   * @returns None
   */
  const handleRangeRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const filterChoice = event.target.value;

    // Update calendar
    dispatch(setFilterType(filterChoice))
    const lowerCaseFilterChoice = filterChoice.toLowerCase();
    if (lowerCaseFilterChoice in filterDateRange) {
      filterDateRange[lowerCaseFilterChoice]();
    }
  };
  const handleResetFilters = ()=>{
    dispatch(setAcademicYear(currentAcademicYear))
    dispatch(setYear(currentYear))
    router.replace(`${pathname}`,{ scroll: false })
    dispatch(setFilterType(''))
  }
  const dateRangeRadios = ['Day', 'Week', 'Month']

  return (
    <div className="flex justify-between pe-10">
      <form
        className={`${styles.calendar__radios} flex flex-row gap-5 py-2`}
      >
        {dateRangeRadios.map((range) => (
          <label key={range} htmlFor={`calendar-radio-${range.toLowerCase()}`}  className='text-sm lg:text-sm flex items-center'>
            <input
              id={`calendar-radio-${range.toLowerCase()}`}
              type="radio"
              value={range}
              name={range.toLowerCase()}
              checked={filterType === range}
              onChange={handleRangeRadioChange}
              className='me-1'
            />
            {' '+range}
          </label>
        ))}
      </form>
      <Button
        size="md"
        title="Reset Filters"
        variant="filled"
        className="flex items-center bg-secondary px-2 py-1"
        onClick={handleResetFilters}
      >
        <AiOutlineReload
          strokeWidth={1}
          className="w-4 h-full text-white"
        />
      </Button>
    </div>
  );
};

export default AcademicDateFilter;