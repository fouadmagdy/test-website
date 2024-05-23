import React from 'react';
import { TimeLineData } from '@/types/ScheduleData';
import { useAppSelector } from '@/store/types';

interface SeasonButtonProps {
season: 'Fall' | 'Spring' | 'Summer';
isActive: boolean;
hasData: TimeLineData[];
onClick: () => void;
year?: string; 
}
const SeasonButton: React.FC<SeasonButtonProps> = ({
season,
isActive,
hasData,
onClick,
year,
}) => {
    const filterDate = useAppSelector((state) => state.schedule.filterDate);
return (
    <div className="relative col-span-1">
    <button
        onClick={onClick}
        disabled={hasData?.length===0}
        className={`relative z-10 w-full font-extrabold leading-7 py-[10px] md:py-[15px] rounded-2xl ${
        isActive ? 'bg-secondary text-white' : 'border-primary border-2 text-primary'
        }`}
    >
        <h5>{season} {!filterDate && (year ? (season==='Fall'? year.split('-')[0]:year.split('-')[1]): '')}</h5>
    </button>
    <div
        className={`absolute bg-white w-6 sm:w-8 h-6 sm:h-8 transform top-0 right-0 -translate-y-1/2 border-2 rounded-full z-20 flex items-center justify-center ${
        isActive ? 'border-secondary text-secondary' : 'border-primary text-primary'
        }`}
    >
        {hasData?.length/2}
    </div>
    <div
        className={`absolute bg-secondary h-[15px] md:h-[20px] w-[15px] md:w-[20px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 rotate-45 ${
        isActive ? 'opacity-100' : 'opacity-0'
        }`}
    ></div>
    </div>
);
};
export default SeasonButton;