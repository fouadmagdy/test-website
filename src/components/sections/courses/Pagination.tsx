'use client';

import React, { ReactNode, useState, useEffect } from 'react';
import type { ICourses } from './types';
import { useAppSelector } from '@/store/types';

/**
 * Represents the props for a Pagination component.
 * @interface IPaginationProps
 * @property {ICourses} courses - The list of courses to paginate.
 * @property {number} pageSize - The number of courses per page.
 */
export interface IPaginationProps {
  courses: ICourses;
  setCourses: React.Dispatch<React.SetStateAction<ICourses>>;
  pageSize?: number;
  children?: ReactNode;
}

/**
 * A functional component that renders a pagination control.
 * @param {IPaginationProps} props - The props object containing the courses and page size.
 * @returns The rendered pagination control based on the props.
 */

const PaginationComponent: React.FC<IPaginationProps> = ({
  courses,
  setCourses,
  pageSize = 50,
  children,
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const locale = useAppSelector((state) => state.lang.locale);

  const pages: ICourses[] = [];
  for (let i = 0; i < courses.length; i += pageSize) {
    pages.push(courses.slice(i, i + pageSize));
  }

  const handlePageChange =
    (page: number) => () => {
      if (page < 0 || page >= pages.length) {
        return;
      }
      setCurrentPage(page);
      setCourses(pages[page]);
    };

  useEffect(() => {
    setCurrentPage(0);
    setCourses(pages[0]);
  }, [courses]);

  return (
    <div>
      {children}

      {/* Pagination controls */}
      <div className="mt-12">
        <button
          disabled={currentPage === 0}
          onClick={handlePageChange(currentPage - 1)}
          className={`px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md ${
            currentPage === 0 ? '' : 'hover:bg-blue-500 hover:text-white'
          }`}
        >
          {locale==='en'?'Previous':'السابق'}
        </button>

        {pages.map((_, index) => {
          if (index < 3 || index > pages.length - 4 || Math.abs(currentPage - index) <= 1) {
            return (
              <button
                key={index}
                onClick={handlePageChange(index)}
                className={`hidden px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md sm:inline ${currentPage === index ? 'text-primary' : 'hover:bg-blue-500 hover:text-white'}`}
              >
                {index + 1}
              </button>
            );
          } else if (index === 3 && currentPage > 4) {
            return <span key={index} className="px-4 py-2 mx-1">...</span>;
          } else if (index === pages.length - 4 && currentPage < pages.length - 5) {
            return <span key={index} className="px-4 py-2 mx-1">...</span>;
          }
        })}

        <button
          disabled={currentPage === pages.length - 1}
          onClick={handlePageChange(currentPage + 1)}
          className={`px-4 py-2 mx-1 text-gray-700 transition-colors duration-300 transform bg-white rounded-md ${
            currentPage === pages.length - 1
              ? ''
              : 'hover:bg-blue-500 hover:text-white'
          }`}
        >
          {locale==='en'?'Next':'التالي'}
        </button>
      </div>
    </div>
  );
};

export default PaginationComponent;
