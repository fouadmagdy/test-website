'use client';
import React, { useState } from 'react';
import Title, { LineType } from '../../shared/Title';
import CoursesList from './CoursesList';
import CoursesFilter from './CoursesFilter';
import AcademicYearFilter from './AcademicYear';
import Pagination from './Pagination';
import { CoursesItemData, ICourse, ICourses } from './types';
/**
 * Represents the properties of a courses component.
 * @interface CoursesProps
 * @property {CoursesItemData} content - The data of the courses item.
 */
interface CoursesProps {
  content: CoursesItemData;
  inSidebar: boolean;
}
/**
 * A functional component that renders a courses section with multiple courses articles.
 * @param {CoursesProps} content - The props containing the courses content to display.
 * @returns The rendered courses section component.
 */

const Courses: React.FC<CoursesProps> = ({content,inSidebar}) => {
  const [courses, setCourses] = useState<ICourses>([] as ICourses);
  const [filteredCourses, setFilteredCourses] = useState<ICourses>([] as ICourses);
  const [paginatedCourses, setPaginatedCourses] = useState<ICourses>([] as ICourses);

  const getCourses = (courses: ICourse[]) => {
    setCourses(courses);
    setFilteredCourses(courses);
  }

  return (
    <div className={`${inSidebar ? '' : 'sm:container'} ml-8 mb-8 px-1 sm:p-0`}>
      <div className="lg:w-1/2">
        <Title
          text={'Course Catalog'}
          textColor={'text-primary'}
          fontSize={''}
          fontWeight={'font-bold'}
          line={LineType.Before}
          lineColor={'before:bg-secondary'}
          id="section-title"
          aria-labelledby="section-title"
          className=" leading-tight mb-4"
        />
      </div>
      <AcademicYearFilter yearsURL={content?.academicYears.data.attributes.url} coursesURL={content?.yearCourses.data.attributes.url} setCourses={getCourses}/>
      <CoursesFilter setCourses={setFilteredCourses} courses={courses} />
      <Pagination courses={filteredCourses} setCourses={setPaginatedCourses} pageSize={20}>
        <CoursesList courses={paginatedCourses} targetPage={content?.targetPage.data.attributes.slug}/>
      </Pagination>
    </div>
  );
};

export default Courses;
