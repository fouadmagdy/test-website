import { useState, useEffect, useMemo } from 'react';
import Title, { LineType } from '@/components/shared/Title';
import axios from 'axios';
import { Datum, Meta, NewsData } from '@/types/NewsData';
import { format, getMonth, getYear } from 'date-fns';
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Loading from '@/app/loading';
import { Input } from '@material-tailwind/react';
import { IoMdSearch } from 'react-icons/io';
import { useAppSelector } from '@/store/types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface IAppProps {
  content: {
    __component: string;
    count: {
      id: number;
      content: {
        data: {
          attributes: {
            url: string | undefined;
            needToEdit: boolean;
          };
        };
      };
      targetPage: {
        data: {
          attributes: {
            title: string;
            slug: string;
          };
        };
      };
    };
  };
}

const AllNews: React.FunctionComponent<IAppProps> = ({ content }) => {
  const [data, setData] = useState<NewsData>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const route = usePathname();
  const locale = useAppSelector((state) => state.lang.locale);
  const programId = route.split('/')[route.split('/').length - 1];
  const pathName = usePathname();
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (content.count.content.data.attributes.url) {
        try {
          const apiUrl = new URL(content.count.content.data.attributes.url);

          if (content.count.content.data.attributes.needToEdit) {
            apiUrl.searchParams.set('objId', programId as unknown as string);
          }

          apiUrl.searchParams.set('pagination[page]', currentPage.toString());
          // apiUrl.searchParams.set('pagination[pageSize]', '9');

          setIsLoading(true);

          const res = await axios.get<NewsData>(apiUrl.toString());
          setData(res.data);
          setIsLoading(false);
        } catch (error) {
          // console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [
    content.count.content.data.attributes.needToEdit,
    content.count.content.data.attributes.url,
    currentPage,
    programId,
  ]);
  const handlePaginationClick = (currentPage: number) => {
    setCurrentPage(currentPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Use 'auto' for instant scroll
    });
  };

  const renderCards = useMemo(() => {
    if (!data || !data.data) {
      return (
        <p>{locale==='en'?'No data available':'غير متوفر'}</p> // Consider showing a user-friendly message
      );
    }

    return data.data.map((program: Datum) => (
      <div
        key={program.id}
        className="group min-h-[400px]  border-2 border-gray hover:shadow-md"
      >
        <div className="h-[500px] md:h-[480px]">
          <div className="overflow-hidden h-[250px] relative">
            {isImageLoading && (
              <Skeleton
                className="w-full h-full"
                baseColor="#fff"
                highlightColor="#ccc"
              />
            )}
            {program.attributes.image ? (
              <Image
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${program.attributes.image.data.attributes.url}`}
                alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${program.attributes.image.data.attributes.alternativeText}`}
                width={500}
                height={500}
                className="h-full object-cover transition duration-300 ease-in-out group-hover:scale-110 opacity-0"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                  setIsImageLoading(false);
                }}
                loading="lazy"
              />
            ) : (
              <></>
            )}
            <div className="absolute bottom-0  left-0 bg-secondary text-white ">
              <div className="flex  flex-col items-center justify-items-center px-4 py-1 ">
                <p className="font-extrabold text-center text-lg">
                  {format(new Date(program.attributes.date), 'dd')}
                </p>
                <p className="text-sm font-bold">
                  {format(
                    new Date(0, getMonth(new Date(program.attributes.date))),
                    'MMM',
                  )}
                </p>
                <p className="text-sm">
                  {format(
                    new Date(getYear(new Date(program.attributes.date)), 1),
                    'yyyy',
                  )}
                </p>
              </div>
            </div>
          </div>
          <div className=" py-5 px-3 flex flex-col ">
            <div className="basis-1/6">
              <Title
                text={
                  program.attributes.title.length > 30
                    ? program.attributes.title.slice(0, 30) + ' ...'
                    : program.attributes.title
                }
                textColor="text-lightBlack"
                fontSize="text-md"
                fontWeight="font-bold leading-5 line-clamp-1"
                line={LineType.Under}
                lineColor={'after:bg-secondary'}
              />
            </div>
            <p className="text-base my-2 xl:my-3 leading-5 tracking-wide line-clamp-5 basis-1/2">
              {program.attributes.body}
            </p>
            <div
              className={`basis-1/6 text-white group bg-primary text-sm rounded-full text-center flex gap-5 items-center max-w-fit px-4 py-2 hover:bg-secondary duration-300 ease-linear transform cursor-pointer`}
            >
              <Link
                scroll={false}
                href={
                  content?.count?.targetPage !== undefined
                    ? pathName === '/'
                      ? `/${content?.count?.targetPage?.data?.attributes?.slug}/${program?.id}`
                      : `${pathName}/${content?.count?.targetPage?.data?.attributes?.slug}/${program?.id}`
                    : ''
                }
                className="flex items-end"
              >
                <span className={`tracking-wide   pointer`}>{locale==='en'?'Read More':'اقرأ المزيد'}</span>
                {locale === 'en' ? (
                  <MdOutlineKeyboardDoubleArrowRight size={20} />
                ) : (
                  <MdOutlineKeyboardDoubleArrowLeft size={20} />
                )}
              </Link>
            </div>
          </div>
        </div>
      </div>
    ));
  }, [content?.count?.targetPage, data, isImageLoading, locale, pathName]);

  const renderPaginationBullets = useMemo(() => {
    if (!data || !data.meta) {
      return null;
    }

    const { pagination }: Meta = data.meta;
    const bullets = [];

    for (let i = 1; i <= pagination.pageCount; i++) {
      bullets.push(
        <button
          title={`show more news from page ${i}`}
          disabled={currentPage === i}
          key={i}
          className={`mx-1 w-4 h-4 rounded-full ${
            currentPage === i
              ? 'bg-secondary '
              : 'bg-primary hover:bg-secondary'
          }`}
          aria-label={`show more news from page ${i}`}
          onClick={() => handlePaginationClick(i)}
        />,
      );
    }

    return (
      <div className="flex justify-center items-center mt-4">{bullets}</div>
    );
  }, [data, currentPage]);
  return (
    <div className="px-1 pt-5 sm:container mx-auto sm:p-4">
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div className="grid gap-5 grid-rows-1 sm:grid-cols-2 my-5">
            <Title
              text={'All News'}
              textColor="text-primary"
              fontSize=""
              fontWeight="font-extrabold"
              line={LineType.Before} // Set the line type using the enum
              lineColor="md:after:bg-grey_dark"
            />
            <Input
              // onChange={handleSearchChange}
              // value={searchQuery}
              icon={
                <IoMdSearch className="h-10 w-10 absolute font-bold text-3xl text-secondary" />
              }
              label="Title"
              className="bg-white p-0"
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {renderCards}
          </div>
          {renderPaginationBullets}
        </>
      )}
    </div>
  );
};

export default AllNews;
