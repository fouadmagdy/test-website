export interface ScheduleData{
    id: number;
    attributes: {
      academicYear:string;
      createdAt: string;
    }
}
export interface IScheduleData {
    data: ScheduleData[];
    meta?: Meta;
}

export interface TimeLineData{
    id: number;
    attributes: {
      title: string;
      Semester: string;
      description: string;
      date: string;
      endDate:string | null;
      createdAt: string;
      isEndDate?:boolean;
    }
}
export interface ITimeLineData {
    data: TimeLineData[];
    meta?: Meta;
}



