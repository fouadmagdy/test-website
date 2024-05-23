// import { StrapiImage } from '@/types/StrapiImage';
import { format, getMonth, getYear } from 'date-fns';
import Map from '@/components/icons/map';
import Clock from '@/components/icons/clock';
import { usePathname } from 'next/navigation';

export interface EventCardProps {
  id: number;
  attributes: {
    title: string;
    date: string;
    locale: string;
    description: string;
    slug: string;
    location?: {
      locationName: string;
    };
    images: {
      data: [
        {
          id: number;
          attributes: {
            alternativeText: string;
            url: string;
          };
        },
      ];
    };
  };
  targetPage: string;
}
const EventCard = ({ id, attributes, targetPage }: EventCardProps) => {
  const pathName = usePathname();

  return (
    <a
      // scroll={false}
      // href={targetPage !== undefined ? `/${targetPage}/${id}` : ''}
      href={
        targetPage !== undefined
          ? pathName === '/'
            ? `/${targetPage}/${id}`
            : `${pathName}/${targetPage}/${id}`
          : ''
      }
      className="flex  items-center p-2 bg-white rounded-xl mb-2 px-1 hover:shadow-md"
    >
      <div className={`resposive-head flex  flex-col  text-secondary px-3`}>
        <p className="font-extrabold text-center text-3xl">
          {format(new Date(attributes.date), 'dd')}
        </p>
        <p className="text-sm font-bold">
          {format(new Date(0, getMonth(new Date(attributes.date))), 'MMM')}
        </p>
        <p className="text-sm">
          {format(new Date(getYear(new Date(attributes.date)), 1), 'yyyy')}
        </p>
      </div>
      <div className="px-4 border-solid border-primary border-s-2">
        <h6 className="text-gray-800 py-1">
          {attributes.title}
        </h6>
        <p className="text-gray-600 small-p text-start">
          {`${attributes.description.slice(0, 40)}...`}
        </p>
        <div className="flex gap-4">
          <div className="flex my-2 text-gray-400 text-sm gap-1">
            <Clock />
            {format(new Date(attributes.date), 'h:mm a')}
          </div>
          <div className="flex my-2 text-gray-400 text-sm gap-1">
            <Map />
            {attributes?.location?.locationName}
          </div>
        </div>
      </div>
    </a>
  );
};

export default EventCard;
