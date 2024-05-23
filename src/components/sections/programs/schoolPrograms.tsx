import { useEffect, useState, useMemo } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Title, { LineType } from '@/components/shared/Title';
import { Meta, SchoolProgramsTypes } from '@/types/school.programs.types';
import Link from 'next/link';
import Loading from '@/app/loading';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppSelector } from '@/store/types';

interface ProgramProps {
  content: {
    __component: string;
    title: string;
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
  inSidebar:boolean;
}

function SchoolPrograms({ content , inSidebar }: ProgramProps) {
  const locale = useAppSelector((state) => state.lang.locale);
  const [fetchedData, setFetchedData] = useState<SchoolProgramsTypes>();
  const route = usePathname();
  const schooldId = route.split('/')[route.split('/').length - 1];
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const pathName = usePathname();
  const pathArray = pathName.split('/');
  const routeWithoutLastItem = pathArray.slice(0, -1).join('/');
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (content.count.content.data.attributes.url) {
        try {
          let apiUrl = content.count.content.data.attributes.url;

          if (content.count.content.data.attributes.needToEdit) {
            apiUrl = apiUrl.replace('objId', schooldId as unknown as string);
            apiUrl = apiUrl.replace(
              'pagination[page]=1',
              `pagination[page]=${currentPage.toString()}`,
            );
            setIsLoading(true);
            const res = await axios.get<SchoolProgramsTypes>(apiUrl);
            setFetchedData(res.data);
            setIsLoading(false);
          }
        } catch (error) {}
      }
    };

    fetchData();
  }, [
    content.count.content.data.attributes.needToEdit,
    content.count.content.data.attributes.url,
    currentPage,
    schooldId,
  ]);

  // export default SchoolPrograms;
  const handlePaginationClick = (currentPage: number) => {
    setCurrentPage(currentPage);
    window.scrollTo({
      top: 0,
      behavior: 'smooth', // Use 'auto' for instant scroll
    });
  };
  const renderCards = useMemo(() => {
    if (!fetchedData || !fetchedData.data) {
      return (
        <p>{locale === 'en' ? 'No data available' : 'غير متوفر'}</p> // Consider showing a user-friendly message
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {fetchedData.data.map((program) => (
          <Link
            href={
              content.count.targetPage.data.attributes.slug !== undefined
                ? pathName === '/'
                  ? `/${content.count.targetPage.data.attributes.slug}/${program?.id}`
                  : `${routeWithoutLastItem}/${content.count.targetPage.data.attributes.slug}/${program?.id}`
                : ''
            }
            key={program.id}
            className="p-4 h-72 relative overflow-hidden hover:shadow-lg"
          >
            <div className="bg-white rounded-lg shadow-lg overflow-hidden">
              <div className="absolute inset-0">
                {isImageLoading && (
                  <Skeleton
                    className="w-full h-full"
                    baseColor="#fff"
                    highlightColor="#ccc"
                  />
                )}
                <Image
                  className="object-cover w-full h-full transition-opacity opacity-0 duration-100"
                  onLoadingComplete={(image) => {
                    image.classList.remove('opacity-0');
                    setIsImageLoading(false);
                  }}
                  loading="lazy"
                  fill={true}
                  alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${program.attributes.media.data.attributes.alternativeText}`}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${program.attributes.media.data.attributes.url}`}
                />
                <div
                  className="absolute inset-0 flex transition-all duration-300 ease-in-out"
                  style={{
                    background: `linear-gradient(0deg, ${fetchedData?.data[0].attributes.school.data.attributes.color}, transparent)`,
                  }}
                />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white text-xl font-bold">
                  {program.attributes.title}
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    );
  }, [
    content.count.targetPage.data.attributes.slug,
    fetchedData,
    isImageLoading,
    pathName,
    routeWithoutLastItem,
  ]);

  const renderPaginationBullets = useMemo(() => {
    if (!fetchedData || !fetchedData.meta) {
      return null;
    }

    const { pagination }: Meta = fetchedData.meta;
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
  }, [fetchedData, currentPage]);

  //  Check if fetchedData exists and has the necessary structure
  if (!fetchedData || !fetchedData.data || fetchedData.data.length === 0) {
    return null; // Return null if data is missing or empty
  }

  const schoolAttributes =
    fetchedData.data[0].attributes.school.data.attributes;
  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      {isLoading ? (
        <Loading />
      ) : (
        <>
          <div
            className={`mb-5 max-w-4 leading-10`}
            style={{
              color: `${schoolAttributes.color}`,
            }}
          >
            <Title
              text={`${content.title} `}
              textColor={`${schoolAttributes.color}`}
              fontSize={''}
              fontWeight={'font-bold'}
              line={LineType.Before}
              lineColor={'before:bg-secondary'}
              id="section-title"
              aria-labelledby="section-title"
            />
          </div>
          <>{renderCards}</>
          {renderPaginationBullets}
        </>
      )}
    </div>
  );
}

export default SchoolPrograms;
