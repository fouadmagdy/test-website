// import Cookies from 'js-cookie';
import { TimeLineData } from '@/types/ScheduleData';
interface GroupedData {
    [key: string]: TimeLineData[];
  }
  export interface IMonthNames {
    '01': string;
    '02': string;
    '03': string;
    '04': string;
    '05': string;
    '06': string;
    '07': string;
    '08': string;
    '09': string;
    '10': string;
    '11': string;
    '12': string;
  }
  // const locale = Cookies.get('locale');

export const groupByMonth = (data: TimeLineData[]): GroupedData => {
    const groups: GroupedData = {};
    data.forEach((item) => {
      const month = item.attributes.date.split('-')[1];
      if (!['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'].includes(month)) {
        throw new Error(`Invalid month: ${month}`);
      }
      if (!groups[month]) {
        groups[month] = [];
      }
      groups[month].push(item);
    });
    return groups;
};
  
// export const monthNames: IMonthNames = {
//     '01': locale === 'en' ? 'January' : 'يناير',
//     '02': locale === 'en' ? 'February' : 'فبراير',
//     '03': locale === 'en' ? 'March' : 'مارس',
//     '04': locale === 'en' ? 'April' : 'أبريل',
//     '05': locale === 'en' ? 'May' : 'مايو',
//     '06': locale === 'en' ? 'June' : 'يونيو',
//     '07': locale === 'en' ? 'July' : 'يوليو',
//     '08': locale === 'en' ? 'August' : 'أغسطس',
//     '09': locale === 'en' ? 'September' : 'سبتمبر',
//     '10': locale === 'en' ? 'October' : 'أكتوبر',
//     '11': locale === 'en' ? 'November' : 'نوفمبر',
//     '12': locale === 'en' ? 'December' : 'ديسمبر',
// };
export const monthNames: IMonthNames = {
    '01': 'January',
    '02': 'February',
    '03': 'March',
    '04': 'April',
    '05': 'May',
    '06': 'June',
    '07': 'July',
    '08': 'August',
    '09': 'September',
    '10': 'October',
    '11': 'November',
    '12': 'December'
};

export function formattedDate (myDate:Date | undefined):string {
  const date = new Date(myDate ?? new Date());
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = date.getDate().toString().padStart(2, '0');
  const formattedDate = year + '-' + month + '-' + day;
  return formattedDate
}
