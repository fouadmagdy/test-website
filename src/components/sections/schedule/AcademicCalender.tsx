'use client';
import 'react-day-picker/dist/style.css';
import styles from '../../../styles/calendar.module.css';
import '../../../styles/calendarStyle.css';
import { DayPicker, ClassNames, DateFormatter} from 'react-day-picker/dist/index';
import React from 'react';
import { useAppDispatch, useAppSelector } from '@/store/types';
import { setSingleDateRange , setFilterType, setSelectedDateRange } from '@/store/scheduleSlice';
import AcademicDateFilter from './AcademicDateFilter';

/**
 * Interface representing the properties of a calendar component.
 * @interface ICalendarProps
 * @property {Object} content - The content of the calendar.
 * @property {string[]} content.uniqueCategories - An array of unique categories.
 * @property {filteredData[]} content.uniqueSeries - An array of unique series.
 * @property {filteredData[]} content.uniqueSponsor - An array of unique sponsors.
 * @property {filteredData[]} content.uniqueLocation - An array of unique locations.
 */

/**
 * A calendar component that displays events and allows users to select dates.
 * @param {ICalendarProps} content - The content to be displayed in the calendar.
 * @returns The Calendar component.
 */
const AcademicCalender = () => {
  // Setting default date range to be retrieved from search params, otherwise it is set to today
  // Retrieving redux state
  const dispatch = useAppDispatch();
  const singleDay = useAppSelector((state) => state.schedule.singleDate);
  const filterType = useAppSelector((state) => state.schedule.filterType);

  const today = new Date();
  const [monthCalender,setMonthCalender]= React.useState(today)
    React.useEffect(()=>{
      if(filterType==='Month'){
        const startMonth = new Date(monthCalender.getFullYear(), monthCalender.getMonth(), 1);
        const endMonth = new Date(monthCalender.getFullYear(), monthCalender.getMonth() + 1, 0);    
        const newRange = { from: startMonth, to: endMonth };
        dispatch(
          setSelectedDateRange(newRange),
        );
        }
  },[dispatch, filterType, monthCalender])

  const classNames: ClassNames = {
    ...styles,
    day_selected: styles.day_selected,
    day_today: styles.day_today,
    head: styles.academic_head,
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
    dispatch(setFilterType('Day'))
  };

  return (
    <div className={`${styles.calendar_wrapper} DayPicker`}>
      <DayPicker
        className="w-full DayPicker"
        classNames={classNames}
        selected={singleDay}
        onSelect={(newDate: Date | undefined) => handleDateRangeChange(newDate)}
        onMonthChange={setMonthCalender} 
        month={monthCalender}
        mode={'single'}
        showOutsideDays
        fixedWeeks
        formatters={{ formatWeekdayName }}
        // components={{
        //   Caption: CustomCaption,
        // }}
      />
      <AcademicDateFilter styles={styles} />
    </div>
  );
};

export default AcademicCalender;
