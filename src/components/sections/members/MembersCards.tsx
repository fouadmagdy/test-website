import { useState, useEffect, useMemo } from 'react';
import Title, { LineType } from '@/components/shared/Title';
import axios from 'axios';
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { boardMembersData } from '@/types/ContentData';
import Loading from '@/app/loading';
import { useAppSelector } from '@/store/types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { Input } from '@material-tailwind/react';
import { IoMdSearch } from 'react-icons/io';

interface IAppProps {
  content: {
    __component: string;
    title: string;
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
}
function MembersCards({ content }: IAppProps) {
  const [data, setData] = useState<boardMembersData>();
  const [dataLength, setDataLength] = useState<number>();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [perPage] = useState<number>(9);
  const totalPages = Math.ceil((dataLength || 0) / perPage);
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState<string>('');
  const locale = useAppSelector((state) => state.lang.locale);
  const pathName = usePathname();
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (content.content.data.attributes.url) {
        try {
          const apiUrl = new URL(content.content.data.attributes.url);
          setIsLoading(true);
          const res = await axios.get<boardMembersData>(apiUrl.toString());
          setData(res.data);
          setIsLoading(false);
        } catch (error) {
          // console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [
    content.content.data.attributes.needToEdit,
    content.content.data.attributes.url,
    currentPage,
  ]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);

    // Debounce the search term
    const debounceTimeout = setTimeout(() => {
      setDebouncedSearchTerm(value);
    }, 300);

    return () => clearTimeout(debounceTimeout);
  };

  const filteredMembers = useMemo(() => {
    if (!data) return [];

    let filteredData = data.data.sort((a, b) => a.attributes.name.localeCompare(b.attributes.name));
    if (debouncedSearchTerm) {
      filteredData = filteredData.filter((member) =>
        member.attributes.name
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()),
      );
    }
    setDataLength(filteredData.length);
    return filteredData;
  }, [data, debouncedSearchTerm]);
  const indexOfLastMember = currentPage * perPage;
  const indexOfFirstMember = indexOfLastMember - perPage;

  const currentMembers = useMemo(
    () => filteredMembers.slice(indexOfFirstMember, indexOfLastMember),
    [filteredMembers, indexOfFirstMember, indexOfLastMember]
  );


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
        <p>{locale === 'en' ? 'No data available' : 'غير متوفر'}</p> // Consider showing a user-friendly message
      );
    }

    return currentMembers.length === 0 ? (
      <div
        className="p-4 mb-4 h3 text-center text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 col-span-12 py-10"
        role="alert"
      >
        <span className="font-medium">
          {locale === 'en'
            ? 'No Member found'
            : 'لم يتم العثور على اشخاص'}
        </span>
      </div>
    ) : (
    currentMembers.map((member) => (
      <div
        key={member.id}
        className="group transition ease-linear duration-500 overflow-hidden shadow-md bg-[#F9F9F9]"
      >
        <div
          //   key={index}
          className={`relative bg-black overflow-hidden bg-cover bg-no-repeat`}
          data-te-ripple-init
          data-te-ripple-color="light"
        >
          <div className=" overflow-hidden h-[300px]">
            {isImageLoading && (
              <Skeleton
                className="w-full h-full"
                baseColor="#fff"
                highlightColor="#ccc"
              />
            )}
            <Image
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member?.attributes?.image?.data?.attributes?.url}`}
              alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member?.attributes?.image?.data?.attributes?.alternativeText}`}
              fill={true}
              className="w-full max-w-full object-cover ease-in-out hover:scale-110 transition-opacity opacity-0 duration-100"
              onLoadingComplete={(image) => {
                image.classList.remove('opacity-0');
                setIsImageLoading(false);
              }}
              loading="lazy"
            />
          </div>
        </div>

        <div className="px-5 pt-5">
          <div className="border-b-2 pb-2 flex justify-between">
            <Link
              className="font-bold text-lg  group-hover:underline transition ease-linear duration-500 cursor-pointer border-s-[3px] pt-1 border-s-secondary justify-center ps-2"
              href={
                content.targetPage.data.attributes.slug !== undefined
                  ? pathName === '/'
                    ? `/${content.targetPage.data.attributes.slug}/${member.id}`
                    : `${pathName.split('/')[0]}/${content.targetPage.data.attributes.slug}/${member.id}`
                  : ''
              }
            >
              {member.attributes.name}
            </Link>
            {locale === 'en' ? (
              <MdOutlineKeyboardDoubleArrowRight className=" text-secondary group-hover:translate-x-3 transition ease-linear duration-500 text-3xl" />
            ) : (
              <MdOutlineKeyboardDoubleArrowLeft className=" text-secondary group-hover:translate-x-3 transition ease-linear duration-500 text-3xl" />
            )}
          </div>
          <div className="pt-4 pb-4">
          <div className="h-auto">
              <p className="!leading-5 small-p line-clamp-3">
              {member.attributes.administrativePositionsTitle || 'Dean of Academic Affairs, Director of Physics of Universe Program, English Program and Humanities Program'}
              </p>
          </div>
          <div className="h-auto">
              <p className="!leading-5 small-p line-clamp-3">
              {member.attributes.rank || 'Professor, Physics of Universe Program'}
              </p>
          </div>
            <a
              href={`mailto:${member.attributes.email}`}
              className="text-primary text-sm"
            >
              {member.attributes.email}
            </a>
          </div>
        </div>
      </div>
    )));
  }, [content.targetPage.data.attributes.slug, currentMembers, data, isImageLoading, locale, pathName]);

  const renderPaginationBullets = useMemo(() => {
    if (!data || !data.meta) {
      return null;
    }

    const bullets = [];
    for (let i = 1; i <= totalPages; i++) {
      bullets.push(
        <button
          title={`show more news from page ${i}`}
          disabled={currentPage === i}
          key={i}
          className={`mx-1 w-4 h-4 rounded-full ${
            currentPage === i ? 'bg-secondary' : 'bg-primary hover:bg-secondary'
          }`}
          aria-label={`show more news from page ${i}`}
          onClick={() => handlePaginationClick(i)}
        />,
      );
    }
    return (
      <div className="flex justify-center items-center mt-4">{bullets}</div>
    );
  }, [data, currentPage, totalPages]);
  return (
    <div className="mb-6">
      <div className="px-1 sm:container mx-auto sm:px-12">
      <div className="grid gap-5 grid-rows-1 sm:grid-cols-2 my-5">
        <Title
          text={content.title}
          textColor={'text-primary'}
          fontSize={''}
          fontWeight={''}
          line={LineType.Before}
          lineColor={'border-black'}
          className="font-bold"
        />
        <Input
              onChange={handleSearch}
              value={searchTerm}
              icon={
                <IoMdSearch className="h-10 w-10 absolute font-bold text-3xl text-secondary" />
              }
              label={locale === 'en'? 'Name': 'الاسم'}
              className="bg-white p-0"
            />
        </div>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
              {renderCards}
            </div>
          </>
        )}
      </div>
      {renderPaginationBullets}
    </div>
  );
}

export default MembersCards;
