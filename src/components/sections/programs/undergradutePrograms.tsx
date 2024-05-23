import { useState, useEffect, useMemo } from 'react';
import Image from 'next/image';
import Loading from '@/app/loading';
import { Datum, underGradProgram } from '@/types/underGradProgram.types';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import ProgramsFilter from './ProgramsFilter';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useAppSelector } from '@/store/types';
import { ImageProp } from '@/types/image.types';

interface UndergraduteProgramsProps {
  content: {
    __component: string;
    title: string;
    image : ImageProp;
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

function UndergradutePrograms({ content , inSidebar }: UndergraduteProgramsProps) {
  // console.log(content);
  const locale = useAppSelector((state) => state.lang.locale);
  const [data, setData] = useState<underGradProgram>();
  const [dataLength, setDataLength] = useState<number>();
  const [isImageLoading, setIsImageLoading] = useState(true);

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage] = useState<number>(6);
  const totalPages = Math.ceil((dataLength || 0) / perPage);
  const [searchTerm, setSearchTerm] = useState<string>('');

  const [selectedSchool, setSelectedSchool] = useState<string>('');
  const [selectedDegree, setSelectedDegree] = useState<string>('');
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<{ school: string; degree: string }>({
    school: selectedSchool,
    degree: selectedDegree,
  });
  const route = usePathname();

  const programId = route.split('/')[route.split('/').length - 1];
  const pathName = usePathname();
  useEffect(() => {
    const fetchData = async () => {
      if (content.count.content.data.attributes.url) {
        try {
          const apiUrl = new URL(content.count.content.data.attributes.url);

          if (content.count.content.data.attributes.needToEdit) {
            apiUrl.searchParams.set('objId', programId as unknown as string);
          }

          setIsLoading(true);

          const res = await axios.get<underGradProgram>(apiUrl.toString());
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
    programId,
  ]);

  const handleFilter = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilter((prevFilter) => ({ ...prevFilter, [name]: value }));
  };

  // filteredPrograms by title
  const filteredPrograms = useMemo(() => {
    if (!data) return [];

    let filteredData = data.data;

    // Apply search by title
    if (debouncedSearchTerm) {
      filteredData = filteredData.filter((program) =>
        program.attributes.title
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()),
      );
    }
    // Apply filtration
    if (Object.keys(filter).length > 0) {
      filteredData = filteredData.filter((program) => {
        const schoolMatch =
          !filter.school ||
          program.attributes.school.data?.attributes.title
            .toLowerCase()
            .includes(filter.school.toLowerCase());

        const degreeMatch =
          !filter.degree ||
          program.attributes.degree.toString().toLowerCase() ===
            filter.degree.toLowerCase();

        return schoolMatch && degreeMatch;
      });
    }
    setDataLength(filteredData.length);
    return filteredData;
  }, [data, debouncedSearchTerm, filter]);

  const handleResetFilters = () => {
    setFilter({
      school: '',
      degree: '',
    });
    setSelectedDegree('');
    setSelectedSchool('');
  };
  // Determine postsPerPage based on search
  // const programsPerPage = debouncedSearchTerm ? filteredPrograms.length : 9;

  // Pagination logic
  const indexOfLastProgram = currentPage * perPage;
const indexOfFirstProgram = indexOfLastProgram - perPage;

const currentPrograms = useMemo(
  () => filteredPrograms.slice(indexOfFirstProgram, indexOfLastProgram),
  [filteredPrograms, indexOfFirstProgram, indexOfLastProgram]
);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Debounce the search term
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(value);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  };

  const renderPaginationBullets = useMemo(() => {
    if (!data || !data.data || data.data.length === 0) {
      // Hide pagination bullets if no data is available
      return null;
    }

    const bullets = [];

    for (let i = 1; i <= totalPages; i++) {
      bullets.push(
        <button
          title={`show more programs from page ${i}`}
          disabled={currentPage === i}
          key={i}
          className={`mx-1 w-4 h-4 rounded-full ${
            currentPage === i ? 'bg-secondary' : 'bg-primary hover:bg-secondary'
          }`}
          aria-label={`show more programs from page ${i}`}
          onClick={() => setCurrentPage(i)}
        />,
      );
    }
    return (
      <div className="flex justify-center items-center mt-4">{bullets}</div>
    );
  }, [currentPage, data, totalPages]);

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 sm:mx-auto`}>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <ProgramsFilter
            setSelectedSchool={setSelectedSchool}
            selectedSchool={selectedSchool}
            setSelectedDegree={setSelectedDegree}
            selectedDegree={selectedDegree}
            handleResetFilters={handleResetFilters}
            handleSearch={handleSearch}
            searchTerm={searchTerm}
            handleFilter={handleFilter}
            title={content.title}
            image={content.image}
            schools={
              data?.data.map(
                (program) => program.attributes.school.data?.attributes.title,
              ) || []
            }
            degrees={
              data?.data.map((program) => program.attributes.degree) || []
            }
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {currentPrograms.length === 0 ? (
              // <div className="text-center text-lg p-8 text-secondary font-bold">No programs found</div>
              <div
                className="p-4 mb-4 h3 text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 col-span-12 py-10"
                role="alert"
              >
                <span className="font-medium">
                  {locale === 'en'
                    ? 'No programs found'
                    : 'لم يتم العثور على برامج'}
                </span>
              </div>
            ) : (
              currentPrograms.map((program: Datum) => (
                <Link
                  href={
                    content?.count?.targetPage !== undefined
                      ? pathName === '/'
                        ? `/${content?.count?.targetPage?.data?.attributes?.slug}/${program?.id}`
                        : `${pathName}/${content?.count?.targetPage?.data?.attributes?.slug}/${program?.id}`
                      : ''
                  }
                  key={program.id}
                  className="p-4 h-72 relative overflow-hidden hover:shadow-lg"
                >
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
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${program.attributes.media.data.attributes.url}`}
                      alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${program.attributes.media.data.attributes.alternativeText}`}
                    />
                    <div
                      className={`absolute inset-0 flex transition-all duration-300 ease-in-out bg-gradient-to-t from-gray-900 to-transparent`}
                    />
                    <h4 className="absolute bottom-4 text-white p-4">
                      {program.attributes.title}
                    </h4>
                  </div>
                </Link>
              ))
            )}
          </div>
          {/* {!searchTerm  ? renderPaginationBullets : null} */}
          {renderPaginationBullets}
        </div>
      )}
    </div>
  );
}

export default UndergradutePrograms;
