import React from 'react';
import { TimeLineData } from '@/types/ScheduleData';

interface IAppProps {
  data: TimeLineData;
  index: number;
}

const Timeline: React.FunctionComponent<IAppProps> = ({ data, index }) => {
  // convert date to this (day-name, month. day-number, year) from '30/09/2024' to 'Monday, Sep. 30, 2024'
  const formatDate = (myDate: string) => {
    const date = new Date(myDate);
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];
    const months = [
      'Jan.',
      'Feb.',
      'Mar.',
      'Apr.',
      'May',
      'Jun.',
      'Jul.',
      'Aug.',
      'Sep.',
      'Oct.',
      'Nov.',
      'Dec.',
    ];

    const dayOfWeek = days[date.getDay()];
    const month = months[date.getMonth()];
    const dayOfMonth = date.getDate();
    const year = date.getFullYear();

    return `${dayOfWeek}, ${month} ${dayOfMonth}, ${year}`;
  };
  if((data.attributes.date && data.attributes.endDate && data.attributes.isEndDate)||(data.attributes.date && !data.attributes.isEndDate))
  return (
    <div
      key={data.id}
      className={`flex justify-between p-2 lg:p-3 ${
        index % 2 == 0 ? '' : 'bg-softBeige'
      }`}
    >
      <p className="small-p">
        {data.attributes.title.length > 80
          ? data.attributes.title.slice(0, 80) + '...'
          : data.attributes.title} {(data.attributes.isEndDate && data.attributes.date && data.attributes.endDate) && 'Ends'}{(!data.attributes.isEndDate && data.attributes.date && data.attributes.endDate) && 'Starts'}{(data.attributes.date && !data.attributes.isEndDate && '')}
      </p>
      <p className="small-p">
        {data.attributes.isEndDate?formatDate(data.attributes.date):formatDate(data.attributes.date)}
      </p>
    </div>
  );
};

export default Timeline;
