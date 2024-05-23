'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { ICourses } from './types';
import { useAppSelector } from '@/store/types';
/**
 * Represents the props for an AcademicYearFilter component.
 * @interface IAcademicYearFilterProps
 * @property {Year[]} years - The list of academic years.
 */
export interface IAcademicYearFilterProps {
  yearsURL: string;
  coursesURL: string;
  setCourses: (courses: ICourses) => void;
}

/**
 * Represents an academic year.
 * @interface Year
 * @property {string} academicYear - Array of academic years
 */

type Year = string;

/**
 * A functional component that renders an academic year filter.
 * @param {IAcademicYearFilterProps} props - The props object containing the years to render.
 * @returns The rendered academic year filter based on the props.
 */

const AcademicYearFilter: React.FC<IAcademicYearFilterProps> = ({
  yearsURL,
  coursesURL,
  setCourses,
}) => {
  const [years, setYears] = useState<Year[]>([]);
  const [selectedYear, setSelectedYear] = useState<string>('');
  const locale = useAppSelector((state) => state.lang.locale);

  const getYears = async () => {
    const res = await axios.get(yearsURL);
    if (res.data) {
      const sortedYears = res.data.academicYears.sort();

      const currentDate = new Date();
      const currentYear = currentDate.getFullYear();
      const currentMonth = currentDate.getMonth();

      let selectedYear;
      for (const year of sortedYears) {
        const [startYear, endYear] = year.split('-').map(Number);
        if (startYear <= currentYear && endYear >= currentYear) {
          if (currentMonth < 8 && startYear === currentYear) {
            continue;
          }
          selectedYear = year;
          break;
        }
      }

      if (!selectedYear) {
        selectedYear = sortedYears[0];
      }

      setYears(sortedYears);
      setSelectedYear(selectedYear);

      const url = coursesURL.replace('objYear', selectedYear);
      const coursesRes = await axios.get(url);
      if (coursesRes.data) {
        setCourses(coursesRes.data?.data);
      }
    } else {
      return;
    }
  };

  const handleSelectChange = async (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedYear(event.target.value);
    const url = coursesURL.replace('objYear', event.target.value);
    const res = await axios.get(url);
    if (res.data) {
      setCourses(res.data?.data);
    }
  };

  useEffect(() => {
    getYears();
  }, []);

  return (
    <form className="max-w-sm mt-1">
      <span className="font-bold text-xl text-title"> Academic Year </span>
      <select
        id="years"
        value={selectedYear}
        onChange={handleSelectChange}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        style={{
          backgroundImage: `url('data:image/svg+xml,%3Csvg%20fill%3D%22%2300B4D1%22%20width%3D%22512px%22%20height%3D%22512px%22%20viewBox%3D%220%200%2024%2024%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20stroke%3D%22%2300B4D1%22%3E%3Cg%20id%3D%22SVGRepo_bgCarrier%22%20stroke-width%3D%220%22%3E%3C%2Fg%3E%3Cg%20id%3D%22SVGRepo_tracerCarrier%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%3E%3C%2Fg%3E%3Cg%20id%3D%22SVGRepo_iconCarrier%22%3E%3Cpath%20d%3D%22M11.178%2019.569a.998.998%200%200%200%201.644%200l9-13A.999.999%200%200%200%2021%205H3a1.002%201.002%200%200%200-.822%201.569l9%2013z%22%3E%3C%2Fpath%3E%3C%2Fg%3E%3C%2Fsvg%3E')`,
          backgroundSize: '0.9rem'
        }}                
      >
        <option value="">{locale==='en'?'Choose an Academic Year':'اختر سنة دراسية'}</option>
        {years?.map((year) => {
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
    </form>
  );
};

export default AcademicYearFilter;
