// import { createQueryString } from '@/lib/QueryParams';
import { useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { setYear, setAcademicYear,setCurrentAcademicYear,setCurrentYear,setFilterType } from '@/store/scheduleSlice';
import { IScheduleData, ScheduleData } from '@/types/ScheduleData';
import { useAppSelector } from '@/store/types';

/**
 * Represents the properties of a DateFilter component.
 * @interface DateFilterProps
 * @property {Object} styles - The styles to apply to the component. It is an object with
 * key-value pairs where the key is a string representing the style property and the value
 * is a string representing the style value.
 */
interface DateFilterProps {
  styles: { [key: string]: string };
  data: IScheduleData | undefined;
  content:{
    related: {
      id:number;
      link:string;
      mainTitle:string;
    }[];
  }
}

/**
 * A component that displays date filters and allows the user to select a date range.
 * @param {DateFilterProps} styles - The styles for the component.
 * @returns The DateFilters component.
 */
const AcademicCalenderFilter = ({ data , content }: DateFilterProps) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const [pastData, setPastData] = useState<ScheduleData[]>();
  const [futureData, setFutureData] = useState<ScheduleData[]>();
  const [currentDates, setCurrentDates] = useState<ScheduleData[]>();
  const dispatch = useDispatch();
  const year = useAppSelector((state) => state.schedule.year);
  const academicYear = useAppSelector((state) => state.schedule.academicYear);
  const filterDate = useAppSelector((state) => state.schedule.filterDate);
  useEffect(() => {
    const currentDate = new Date();
    const futureDates = data?.data.filter(item => {
      const academicYear = item.attributes.academicYear.split('-');
      const endYear = parseInt(academicYear[1]);
      return endYear > currentDate.getFullYear();
    });
    const currentDates = data?.data.filter(item => {
      const academicYear = item.attributes.academicYear.split('-');
      const currentYear = parseInt(academicYear[1]);
      return currentYear == currentDate.getFullYear();
    });
    const pastDates = data?.data.filter(item => {
      const academicYear = item.attributes.academicYear.split('-');
      const startYear = parseInt(academicYear[1]);
      return startYear < currentDate.getFullYear();
    });
    futureDates?.sort((a, b) => a.attributes.academicYear.localeCompare(b.attributes.academicYear));
    pastDates?.sort((a, b) => b.attributes.academicYear.localeCompare(a.attributes.academicYear));
    if(!academicYear){
      dispatch(setYear(currentDates? currentDates[0].attributes.academicYear: undefined))
      dispatch(setAcademicYear(currentDates ?currentDates[0].id: undefined))
      dispatch(setCurrentYear(currentDates? currentDates[0].attributes.academicYear: undefined))
      dispatch(setCurrentAcademicYear(currentDates ?currentDates[0].id: undefined))
    }
    setCurrentDates(currentDates? currentDates : undefined);
    setFutureData(futureDates ? futureDates : undefined);
    setPastData(pastDates ? pastDates : undefined);
  }, [academicYear, data, dispatch]); 
  
  const handleYearChange = (year: string,id:string | number) => {
    dispatch(setYear(year))
    dispatch(setAcademicYear(id))
    dispatch(setFilterType(''))
  };

  return (
      <div className="grid grid-row-3 md:gap-2">
        {futureData && futureData.length>0 && 
          <div>
            <h5 className="font-black">
              {locale==='en'?'Future Academic Calendars':'التقويمات الأكاديمية المستقبلية'}
            </h5>
            {futureData?.map(item=>(
              <div key={item.id}
              onClick={() => {
                handleYearChange(item.attributes.academicYear,item.id)
              }}>
                <span
                  className={`text-grey_dark underline italic cursor-pointer ${(!filterDate && year === item.attributes.academicYear) ? 'bg-primary text-white':''}`}
                >{item.attributes.academicYear}</span> 
              </div>
            ))}
          </div>
        }
        {currentDates && currentDates.length>0 && 
          <div>
            <h5 className="font-black">
            {locale==='en'?'Current Academic Calendars':'التقويمات الأكاديمية الحالية'}
            </h5>
            {currentDates?.map(item=>(
              <div key={item.id}
              onClick={() => {
                handleYearChange(item.attributes.academicYear,item.id)
              }}>
                <span
                  className={`text-grey_dark underline italic cursor-pointer ${(!filterDate && year === item.attributes.academicYear) ? 'bg-primary text-white':''}`}
                >{item.attributes.academicYear}</span> 
              </div>
            ))}
          </div>
        }
        {pastData && pastData.length>0 && 
          <div>
            <h5 className="font-black">
            {locale==='en'?'Past Academic Calendars':'التقويمات الأكاديمية السابقة'}
            </h5>
            {pastData?.map(item=>(
              <div key={item.id}
                onClick={() => {
                  handleYearChange(item.attributes.academicYear,item.id)
                }}>
                <span
                  className={`text-grey_dark underline italic cursor-pointer ${(!filterDate && year === item.attributes.academicYear) ? 'bg-primary text-white':''}`}
                >{item.attributes.academicYear}</span>
               </div>
            ))}
          </div>
        }
        {content.related &&
          <div>
            {content.related && 
              content.related?.map(item=>(
                <div key={item.id}>
                  <a href={item.link} target="_blank" className="text-grey_dark underline italic cursor-pointer">
                   {item.mainTitle}
                  </a>
              </div>
                ))
            }
          </div>
        }
      </div>
  );
};

export default AcademicCalenderFilter;