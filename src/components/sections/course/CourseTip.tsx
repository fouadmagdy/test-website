'use client';

import React, {useState, MouseEvent, ReactNode} from 'react';
import type { ISingleCourseProps } from './types';
import { useAppSelector } from '@/store/types';

/**
 * Represents the props for a SingleCourse component.
 * @interface ICourseTipProps
 * @property {string} courseCode - The code of the course.
 * @property {string} courseName - The name of the course.
 * @property {number} noCredits - The number of credits for the course.
 * @property {string} year - The year of the course.
 * @property {string[]} coRequests - The co-requests of the course.
 * @property {string[]} prerequisites - The prerequisites of the course.
 * @property {string} description - The description of the course.
 */

export interface ICourseTipProps extends ISingleCourseProps {
  content: string | ReactNode;
}

/**
 * A functional component that renders a single course.
 * @param {ICourseTipProps} props - The props object containing the course details to render.
 * @returns The rendered course based on the props.
 */
const CourseTip: React.FC<ICourseTipProps> = (props: ICourseTipProps) => {
  return (
    <Tooltip content={props.content}>
      <CourseView {...props} />
    </Tooltip>
  );
};

const CourseView: React.FC<ICourseTipProps> = (props: ICourseTipProps) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const {
    code,
    title,
    credits,
    academicYear,
    corequisites,
    prerequisites,
    description,
  } = props.attributes;
  return (
    <div className="flex flex-col">
      <div className="flex justify-between py-4 px-12">
        <span className="font-bold text-xl h-auto border-b-2 border-black pb-4">
          {' '}
          {code} - {title} ({credits} cr.) - {academicYear}
        </span>
      </div>
      <div className="font-semibold py-2 px-12 text-xl">{locale==='en'?'CoRequests':'طلبات مشتركة'}</div>
      <div className="py-1 px-12">
        {corequisites ?? `${locale==='en'?'No CoRequests':'لا يوجد طلبات مشتركة متاح'}`}
      </div>
      <div className="font-semibold py-2 px-12 text-xl">{locale==='en'?'PreRequisites':'المتطلبات'}</div>
      <div className="py-1 px-12">
        {prerequisites ?? `${locale==='en'?'No PreRequisites':'لا يوجد متطلبات متاح'}`}
      </div>
      <div className="font-semibold py-2 px-12 text-xl">
        {locale==='en'?'Description':'الوصف'}
      </div>
      <div className="py-2 px-12">{description}</div>
    </div>
  );
};

interface TooltipProps {
  children: ReactNode;
  content: ReactNode;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children }) => {
  const [visible, setVisible] = useState(false);
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);

  const showTooltip = (e: MouseEvent) => {
    setVisible(true);
    setX(e.clientX);
    setY(e.clientY - 50);
  };

  const hideTooltip = () => {
    setVisible(false);
  };

  return (
    <div onClick={showTooltip} onMouseLeave={hideTooltip}>
      {content}
      {visible && (
        <div className="tooltip flex items-center justify-center w-[600px] p-3 text-gray-600 bg-white rounded-lg shadow-lg overflow-auto" style={{ top: y, left: x }}>
          {children}
        </div>
      )}
    </div>
  );
};

export default CourseTip;
