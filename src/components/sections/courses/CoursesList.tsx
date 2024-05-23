'use client';

import React from 'react';
import type { ICourses } from './types';

interface IProps {
  courses: ICourses;
  targetPage: string
}

const CoursesList: React.FC<IProps> = ({ courses, targetPage }) => {

  const handleOpenCourse = (data: number) => (event:React.MouseEvent<HTMLLIElement, MouseEvent>) : boolean => {
    event.preventDefault();
    window.open(
      `/${targetPage}?coID=${data}`,
      'newwindow',
      'width=1280,height=720',
    );
    return false;
  }

  return (
    <div className="w-1/2 mt-12">
      <ul className="mb-4">
        {courses?.map((course) => {
          const { attributes: courseData } = course;
          return (
              
                  <li
                    key={course.id}
                    className="text-title hover:text-secondary hover:underline cursor-pointer mb-1"
                    onClick={handleOpenCourse(course.id)}
                  >
                    {courseData.code} - {courseData.title} ( {courseData.credits} Credits )
                  </li>
          );
        })}
      </ul>
    </div>
  );
};

export default CoursesList;
