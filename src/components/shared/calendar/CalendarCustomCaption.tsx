import React from 'react';
import { format } from 'date-fns';
import { CaptionProps, useNavigation } from 'react-day-picker/dist';

// This component overrides the default caption inside of react-day-picker calendar (You can check it inside of DayPicker component props )
/**
 * A custom caption component for a calendar.
 * @param {CaptionProps} props - The props for the caption component.
 * @returns The JSX element representing the custom caption.
 */
const CustomCaption = (props: CaptionProps) => {
  const { goToMonth, nextMonth, previousMonth } = useNavigation();
  return (
    <div className="flex items-center flex-row justify-between pb-4 px-5">
      <button
        disabled={!previousMonth}
        onClick={() => previousMonth && goToMonth(previousMonth)}
      >
        ArrowL
      </button>
      <h2 className="text-2xl font-bold ">
        {format(props.displayMonth, 'LLLL')}
      </h2>
      <button
        disabled={!nextMonth}
        onClick={() => nextMonth && goToMonth(nextMonth)}
      >
        ArrowR
      </button>
    </div>
  );
};

export default CustomCaption;
