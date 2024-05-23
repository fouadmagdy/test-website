'use client';

import React, { useState } from 'react';
import { Program } from './Program';
import type { ICourses } from './types';
import { AiOutlineReload } from 'react-icons/ai';
import { useAppSelector } from '@/store/types';

/**
 * Represents the props for an Filter Criterias.
 * @interface FilterCriteria
 * @property {string} code - To filter by course code
 * @property {string} name - To filter by course title
 */

interface FilterCriteria {
  [key: string]: string | undefined;
  code?: string;
  name?: string;
}

/**
 * Represents the props for an CoursesFilter component.
 * @interface ICoursesFilterProps
 * @property {Program[]} programs - The list of programs.
 * @property {React.Dispatch<React.SetStateAction<ICourses>>} setCourses - To filter the courses
 * @property {ICourses} courses - The original courses to filter based on
 */
export interface ICoursesFilterProps {
  programs?: Program[];
  setCourses: React.Dispatch<React.SetStateAction<ICourses>>;
  courses: ICourses;
}

/**
 * A functional component that renders an Courses filter.
 * @param {ICoursesFilterProps} props - The props object containing the programs to render.
 * @returns The rendered Courses filter based on the props.
 */

const CoursesFilter: React.FC<ICoursesFilterProps> = ({
  setCourses,
  courses,
}) => {

  const suggestionSize = 5;

  const [criteria, setCriteria] = useState<FilterCriteria>({
    code: '',
    name: '',
  });

  const [suggestions, setSuggestions] = useState<ICourses>([]);
  const locale = useAppSelector((state) => state.lang.locale);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newCriteria = { ...criteria, [e.target.name]: e.target.value };
    setCriteria(newCriteria);
    handleFilter(newCriteria);
    setSuggestions(filterCourses(courses, newCriteria));
  };

  const handleFilter = (fields?: FilterCriteria) => {
    setCourses(filterCourses(courses, fields ?? criteria));
  };

  const filterCourses = (
    courses: ICourses,
    criteria: FilterCriteria,
  ): ICourses => {
    return courses.filter((course) =>
      Object.keys(criteria).every((field: string) => {
        if (!criteria[field]) {
          return true;
        }
        if (criteria[field] !== undefined) {
          const str: string = criteria[field] as string;
          return course.attributes[field]
            .toLowerCase()
            .includes(str.toLocaleLowerCase());
        }
        return false;
      }),
    );
  };
  const handleResetFilters = ()=>{
    setCriteria({ 
      code: '',
      name: '',
      title:''
    });
    setSuggestions([]);
    setCourses(courses);
  }
  return (
    <div className="grid w-fit mt-6 mb-12">
      <div className="">
        <div className="text-black flex justify-start gap-x-4 py-4 px-12 bg-pearl flex-col gap-y-2 md:flex-row rounded-2xl">
          <div className="rounded-xl">
            <label htmlFor="code" className="block text-sm text-gray-500">
              {locale==='en'?'Course Code':'كود الماده'}
            </label>
            <input
              list="code-suggestions"
              name="code"
              type="text"
              placeholder="CIE 555"
              className="block  mt-2 w-full placeholder-gray-400/70 dark:placeholder-gray-500 rounded-lg border border-gray-200 bg-white px-12 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              onChange={handleInputChange}
              value={criteria.code}
            />
            <datalist id="code-suggestions">
              {suggestions.slice(0, suggestionSize).map((suggestion, index) => (
                <option key={index} value={suggestion.attributes.code} />
              ))}
            </datalist>
          </div>
          <div className="">
            <label htmlFor="title" className="block text-sm text-gray-500">
              {locale==='en'?'Course Title':'عنوان الماده'}
            </label>
            <input
              list="title-suggestions"
              name="title"
              type="text"
              placeholder="Deep Learning"
              className="block mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-12 py-2.5 text-gray-700 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40"
              onChange={handleInputChange}
              value={criteria.title}
            />
            <datalist id="title-suggestions">
              {suggestions.slice(0, suggestionSize).map((suggestion, index) => (
                <option key={index} value={suggestion.attributes.title} />
              ))}
            </datalist>
          </div>
          {/* <div>
            <label htmlFor="keyword" className="block text-sm text-gray-500">
              Key Words
            </label>
            <input
              name="keyword"
              type="text"
              placeholder="Algorithms"
              className="block  mt-2 w-full placeholder-gray-400/70 rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-gray-700 focus:border-primary focus:outline-none focus:ring focus:ring-primary focus:ring-opacity-40"
            />
          </div> */}
            <button
            onClick={() => handleResetFilters()}
            className="self-end flex items-center max-h-12 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-primary rounded-lg hover:bg-secondary focus:outline-none"
          >
            <span className="mx-1">
            <AiOutlineReload
                strokeWidth={1}
                className="text-white w-5 h-7"
              />
            </span>
          </button>
         
        </div>
      </div>
    </div>
  );
};

export default CoursesFilter;
