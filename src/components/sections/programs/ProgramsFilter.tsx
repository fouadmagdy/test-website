import React, { SetStateAction, useState } from 'react';
import { Button, Input } from '@material-tailwind/react';
import { AiOutlineReload } from 'react-icons/ai';
import Image from 'next/image';
import { useAppSelector } from '@/store/types';
import { ImageProp } from '@/types/image.types';

interface Props {
  searchTerm: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => () => void;
  handleFilter: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  schools: string[];
  degrees: string[];
  handleResetFilters: () => void;

  selectedSchool: string;
  setSelectedSchool: (value: SetStateAction<string>) => void;

  selectedDegree: string;
  setSelectedDegree: (value: SetStateAction<string>) => void;
  title: string;
  image: ImageProp;
}

function ProgramsFilter({
  handleSearch,
  searchTerm,
  handleFilter,
  schools,
  degrees,
  handleResetFilters,
  selectedSchool,
  setSelectedSchool,
  selectedDegree,
  setSelectedDegree,
  title,
  image,
}: Props) {
  const [toogle, setToogle] = useState<boolean>(true);
  const locale = useAppSelector((state) => state.lang.locale);
  const handleToggle = () => {
    setToogle(!toogle);
    if (!toogle) {
      handleSearch({
        target: { value: '' },
      } as React.ChangeEvent<HTMLInputElement>);
    }
  };
  // console.log(image);
  //  Splitting the title into the first word and the rest of the words
  const titleArray = title.split(' ');
  const firstWord = titleArray[0];
  const restWords = titleArray.slice(1).join(' ');
  return (
    <div className="py-10 pb-1">
      <div className="px-6 sm:px-10 pt-8 sm:pt-14 pb-4 sm:pb-8 bg-gray-100 rounded-xl relative">
        <div className="absolute bottom-full transform translate-y-1/2">
          <h2>
            <span className="text-secondary">
              {locale === 'en' ? `${firstWord} ` : 'اعرف المزيد'}
            </span>
            {locale === 'en' ? `${restWords}` : 'عن برامج البكالوريوس'}
          </h2>
        </div>
        <div className="flex items-center gap-4 pb-8">
          <div className="relative">
            <button
              className={`flex items-center font-bold px-5 py-2 border-2 rounded-lg ${toogle ? 'bg-secondary text-white border-transparent' : 'bg-white text-primary border-primary'}`}
              onClick={handleToggle}
            >
              {locale === 'en' ? 'Filter' : 'تصفيه النتائج'}
            </button>
            <div
              className={`absolute h-[10px] w-[10px] left-1/2 transform -translate-x-1/2 -translate-y-1/2  rotate-45  opacity-100 ${toogle ? 'bg-secondary' : ''}`}
            ></div>
          </div>
          <div className="relative">
            <button
              className={`flex items-center font-bold px-5 py-2 border-2 rounded-lg ${!toogle ? 'bg-secondary text-white border-transparent' : 'bg-white text-primary border-primary'}`}
              onClick={handleToggle}
            >
              {locale === 'en' ? 'Search' : 'بحث'}
            </button>
            <div
              className={`absolute h-[10px] w-[10px] left-1/2 transform -translate-x-1/2 -translate-y-1/2  rotate-45 opacity-100 ${!toogle ? 'bg-secondary' : ''}`}
            ></div>
          </div>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-2 max-w-[40rem] pb-4">
          {toogle ? (
            <>
              <div className="relative flex-2">
                <select
                  name="school"
                  id="school"
                  defaultValue=""
                  value={selectedSchool}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    handleFilter(e);
                    setSelectedSchool(e.target.value);
                  }}
                >
                  {/* All Schools */}
                  <option value="" selected>
                    {locale === 'en' ? 'All Schools' : 'جميع الكليات'}
                  </option>
                  {Array.from(new Set(schools)).map((school, index) => (
                    <option key={index} className="py-8">
                      {school}
                    </option>
                  ))}
                </select>
              </div>
              <div className="relative flex-2">
                <select
                  name="degree"
                  id="degree"
                  defaultValue=""
                  value={selectedDegree}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={(e) => {
                    handleFilter(e);
                    setSelectedDegree(e.target.value);
                  }}
                >
                  <option value="" selected>
                    {locale === 'en' ? 'All Degrees' : 'جميع الدرجات العلمية'}
                  </option>
                  {Array.from(new Set(degrees)).map((degree, index) => (
                    <option key={index}>{degree}</option>
                  ))}
                </select>
              </div>
              <div className="relative flex-1">
                <Button
                  size="lg"
                  title="Reset Filters"
                  variant="filled"
                  className="flex items-center bg-secondary px-3 py-1" // Adjusted button width
                  onClick={handleResetFilters}
                >
                  <AiOutlineReload
                    strokeWidth={1}
                    className="h-8 w-20 text-white"
                  />
                </Button>
              </div>
            </>
          ) : (
            <>
              <div className="relative flex md:w-full max-w-[20rem] lg:max-w-[40rem] border-none">
                <Input
                  className="md:pr-20 py-4"
                  label="Search by Program Name..."
                  color="red"
                  variant="outlined"
                  value={searchTerm}
                  onChange={handleSearch}
                  containerProps={{
                    className: 'min-w-0',
                  }}
                />
              </div>
            </>
          )}
        </div>
        <div className="absolute bottom-0 end-0 hidden md:block">
          <Image
            // src={`${image?.data?.attributes?.url}`}
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image?.data?.attributes?.url}`}
            alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${image?.data?.attributes?.alternativeText}`}
            className="transition duration-1000 ease-in-out transform opacity-0"
            onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            width={250}
            height={350}
          />
        </div>
      </div>
    </div>
  );
}

export default ProgramsFilter;
