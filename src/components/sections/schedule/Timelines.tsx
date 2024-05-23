import React from 'react';
import axios from 'axios';
import { useAppSelector } from '@/store/types';
import Loading from './../../../app/loading';
import { TimeLineData } from '@/types/ScheduleData';
import Timeline from './Timeline';
import SeasonButton from './SeasonButton';
import { IMonthNames, formattedDate, groupByMonth, monthNames } from '@/lib/GroupData';
interface ITimelinesProps {
  content: {
      data: {
        id: number;
        attributes:{
          name: string;
          url: string;
          locale:string;
          needToEdit: boolean;
          createdAt: string;
        }
      }
  };
}
// Function to add IsEndDate Property cuos when i duplicate date make it one for end and one for start and sort by date
const setEndDateProperty = (items: TimeLineData[],isStart?:boolean): TimeLineData[] => {
  return items.map((item) => {
    const endDate = (item.attributes.date && item.attributes.endDate) ? item.attributes.endDate : null;
    const date = (item.attributes.date && item.attributes.endDate && !isStart) ? item.attributes.endDate : item.attributes.date;
    return {
      ...item,
      attributes: {
        ...item.attributes,
        isEndDate:isStart?false:true,
        endDate,
        date,
      },
    };
  }).sort((a, b) => new Date(a.attributes.date).getTime() - new Date(b.attributes.date).getTime());
};

const fetcher = async (locale: string, dynamicUrl: string) => {
  const res = await axios.get(dynamicUrl + '&locale=' + locale);
  return res.data;
};

const Timelines: React.FunctionComponent<ITimelinesProps> = ({ content }) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const academicYear = useAppSelector((state) => state.schedule.academicYear);
  const singleDate = useAppSelector((state) => state.schedule.singleDate);
  const selectedDateRange = useAppSelector((state) => state.schedule.selectedDateRange);
  const year = useAppSelector((state) => state.schedule.year);
  const filterDate = useAppSelector((state) => state.schedule.filterDate);
  const filterType = useAppSelector((state) => state.schedule.filterType);
  const [activeView, setActiveView] = React.useState<'Fall' | 'Spring' | 'Summer' | ''>('Fall');
  const [fallData, setFallData] = React.useState<TimeLineData[]>([]);
  const [springData, setSpringData] = React.useState<TimeLineData[]>([]);
  const [summerData, setSummerData] = React.useState<TimeLineData[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(true);
  React.useEffect(() => {
    (async () => {
      setIsLoading(true)
      let apiUrl = content.data.attributes.url;
      
      if(!filterDate){
        if(content.data.attributes.needToEdit){
          apiUrl = apiUrl.replace('objId', academicYear as unknown as string);
        }
      }
      else{
        if(filterType==='Day'){
            const date = formattedDate(singleDate)
            const filterRange = `filters[$or][0][$and][0][$and][0][endDate][$null]=false&filters[$or][0][$and][0][$and][1][endDate][$gte]=${date}&filters[$or][0][$and][1][$and][0][endDate][$null]=false&filters[$or][0][$and][1][$and][1][date][$lte]=${date}&filters[$or][1][$and][0][endDate][$null]=true&filters[$or][1][$and][1][date][$gte]=${date}&filters[$or][1][$and][2][date][$lte]=${date}`
            apiUrl = apiUrl.replace('filters[schedule][id]=objId', filterRange as unknown as string);
        }else if (filterType!=='Day'){
            const from = formattedDate(selectedDateRange?.from)
            const to = formattedDate(selectedDateRange?.to)
            const filterRange = `filters[$or][0][$and][0][$and][0][endDate][$null]=false&filters[$or][0][$and][0][$and][1][endDate][$gte]=${from}&filters[$or][0][$and][1][$and][0][endDate][$null]=false&filters[$or][0][$and][1][$and][1][date][$lte]=${to}&filters[$or][1][$and][0][endDate][$null]=true&filters[$or][1][$and][1][date][$gte]=${from}&filters[$or][1][$and][2][date][$lte]=${to}`
            apiUrl = apiUrl.replace('filters[schedule][id]=objId', filterRange as unknown as string);
          }
      }
      const res = await fetcher(locale,apiUrl);
      if (res) {
        const fallData = res.data?.filter((item: TimeLineData) => item.attributes.Semester === 'Fall')
        const springData = res.data?.filter((item: TimeLineData) => item.attributes.Semester === 'Spring')
        const summerData = res.data?.filter((item: TimeLineData) => item.attributes.Semester === 'Summer')
        const fallItemsStart = setEndDateProperty(fallData,true)
        const fallItemsEnd = setEndDateProperty(fallData,false)
        const springItemsStart = setEndDateProperty(springData,true)
        const springItemsEnd = setEndDateProperty(springData,false)
        const summerItemsStart = setEndDateProperty(summerData,true)
        const summerItemsEnd = setEndDateProperty(summerData,false)
        setFallData([...fallItemsStart,...fallItemsEnd]);
        setSpringData([...springItemsStart,...springItemsEnd]);
        setSummerData([...summerItemsStart,...summerItemsEnd]);
      }
      setIsLoading(false);
    })();
  }, [locale, content, filterDate, academicYear, filterType, singleDate, selectedDateRange?.from, selectedDateRange?.to]);
  React.useEffect(()=>{
    if(fallData && fallData?.length>0){
      return setActiveView('Fall')
    }else if(springData && springData?.length>0){
      return setActiveView('Spring')
    }else if(summerData && summerData?.length>0){
      return setActiveView('Summer')
    }else{
      return setActiveView('')
    }
  },[fallData,springData,summerData])
  const groupedData = activeView === 'Fall' ? groupByMonth(fallData)
                    : activeView === 'Spring' ? groupByMonth(springData)
                    : groupByMonth(summerData);

  const sortedMonths = Object.keys(groupedData).sort((a, b) => parseInt(a) - parseInt(b));
  const Seasons: Array<'Fall' | 'Spring' | 'Summer'> = ['Fall', 'Spring', 'Summer'];
  return <div className="col-span-1 md:col-span-2 lg:col-span-3 border-indigo-300 px-1 py-4 sm:py-0">
    <div className="grid sm:grid-cols-1 gap-1 sm:gap-3 lg:ps-5">
      <div className="grid grid-cols-3 gap-2">
        {Seasons.map((season,index) => (
          <SeasonButton
            key={index}
            season={season}
            isActive={activeView === season}
            hasData={season === 'Fall'? fallData:(season==='Spring'?springData:summerData)}
            onClick={() => setActiveView(season)}
            year={year}
          />
        ))}
      </div>
      {isLoading ? (
        <Loading />
      ) : (
        sortedMonths.map((month) => {
          const Month = month as keyof IMonthNames;
          return (
            <div key={month}>
              <h5 className="font-extrabold leading-7 text-primary py-2 border-b-2 border-lightGray">
                {monthNames[Month]}
              </h5>
              <div className="grid grid-cols-1">
                {groupedData[Month].map((item, index) => (
                  <React.Fragment key={index}>
                    <Timeline data={item} index={index} />
                  </React.Fragment>
                ))}
              </div>
            </div>
          );
        })
      )}
    </div>
  </div>
};

export default Timelines;