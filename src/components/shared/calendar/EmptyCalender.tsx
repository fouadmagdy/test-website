import React from 'react';
import { DayPicker } from 'react-day-picker';
import { useDispatch } from 'react-redux';
import 'react-day-picker/dist/style.css';
import styles from '../../../styles/calendar.module.css';
import { setMonth } from '@/store/scheduleSlice';

/**
 * Represents the props for an empty calendar component.
 * @typedef {Object} EmptyCalendarProps
 * @property {Date[]} selectedDates - An array of selected dates.
 */
type EmptyCalendarProps = {
  selectedDates: Date[];
};

/**
 * Renders an empty calendar component with the provided selected dates.
 * @param {EmptyCalendarProps} selectedDates - The selected dates for the calendar.
 * @returns {JSX.Element} - The rendered empty calendar component.
 */
export default function EmptyCalendar({ selectedDates }: EmptyCalendarProps) {
  const dispatch = useDispatch();
  const today = new Date();
  const [monthCalender,setMonthCalender]= React.useState(today)
  React.useEffect(()=>{
    dispatch(setMonth(monthCalender));
},[dispatch, monthCalender])
  // No need to use state for selected dates if you want to disable selection
  const classNames = {
    ...styles,
    day_selected: styles.day_selected_academic,
    day_today: styles.day_today,
    head: styles.academic_head,
    head_cell: styles.head_cell,
    button: styles.button,
    cell: styles.academic_cell,
    day_outside: styles.day_outside,
    root: styles.rdp_academic,
  };

  return (
    <div className={`${styles.calendar_wrapper_academic} flex justify-center`}>
      <DayPicker
        onMonthChange={setMonthCalender} 
        month={monthCalender}
        mode="multiple"
        className="DayPicker"
        classNames={classNames}
        selected={selectedDates} // Show the provided selected dates
      />
    </div>
  );
}
