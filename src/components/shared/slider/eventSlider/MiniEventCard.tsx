// import { StrapiImage } from '@/types/StrapiImage';
import { format, getMonth, getYear } from 'date-fns';
import Link from 'next/link';
import Map from '@/components/icons/map';
import Clock from '@/components/icons/clock';
import { usePathname } from 'next/navigation';

export interface EventCardProps {
  id: number;
  attributes: {
    title: string;
    date: string;
    endDate: string;
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
const MiniEventCard = ({ id, attributes, targetPage }: EventCardProps) => {
  const pathName = usePathname();

  return (
    <Link
      href={
        targetPage !== undefined
          ? pathName === '/'
            ? `/${targetPage}/${id}`
            : `${pathName}/${targetPage}/${id}`
          : ''
      }
      className="flex flex-wrap md:flex-nowrap gap-y-3 md:gap-y-1 items-center p-2 bg-softBeige rounded-xl mb-2 px-1 hover:shadow-md"
    >
      <div className={`resposive-head flex basis-[100%] flex-row gap-1 items-center justify-center md:flex-col md:basis-auto  text-secondary px-3`}>
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
      <div className="flex flex-col gap-y-3 md:gap-y-1 px-4 border-solid border-primary md:border-s-2 border-t-2 md:border-t-0 py-3 md:py-0">
        <p className="text-gray-800 text-base text-sm font-semibold py-1">
          {attributes.title}
        </p>
        <p className="text-gray-600 text-sm text-start leading-4">
          {`${attributes.description.slice(0, 70)}...`}
        </p>
        <div className="flex gap-4">
          <div className="flex my-2 text-gray-700 font-bold text-sm gap-1">
            <Clock />
            {format(new Date(attributes.date), 'h:mm a')}
            {/* {' - '} */}
            {/* {format(new Date(attributes.endDate), 'h:mm a')} */}
          </div>
          <div className="flex my-2 text-gray-700 font-semibold text-sm gap-1">
            <Map />
            {attributes?.location?.locationName || 'Zewail City'}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default MiniEventCard;
