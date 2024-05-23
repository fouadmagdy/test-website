import React from 'react';
import type { ISingleCourseProps } from './types';
import { useAppSelector } from '@/store/types';
import Transformer from './Transfomer'

/**
 * A functional component that renders a single course.
 * @param {ISingleCourseProps} props - The props object containing the course details to render.
 * @returns The rendered course based on the props.
 */
const SingleCourse: React.FC<ISingleCourseProps> = (
  props: ISingleCourseProps,
) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const {
    code,
    title,
    credits,
    academicYear,
    corequisites,
    prerequisites,
    description,
    lectureHours,
    practiceHours
  } = props.attributes;
  return (
    <div className="grid grid-rows-none gap-y-2 w-1/2 mx-auto mt-12 mb-12">
      <div className="row-start-1 h-8 bg-black text-white flex justify-between py-4 px-12 bg-darkHeader rounded-t-lg h-auto">
        <span className="font-bold text-xl h-auto">
          {' '}
          {code} - {title}{' '}
        </span>
        <span className="font-bold text-xl h-auto">
          {' '}
          {academicYear}{' '}
        </span>
      </div>
      <div className="grid md:grid-cols-12 grid-cols-1 grid-rows-6 md:grid-rows-none md:gap-y-1 gap-y-0 gap-x-1">
        <div className="bg-darkCyan col-span-1 md:col-span-4 text-white font-semibold py-4 px-6 text-md">
          {locale==='en'?'Credit Hours':'الساعات المعتمدة'}
        </div>
        <div className="col-start-1 md:col-span-8 col-span-1 bg-lightCyan py-4 px-6 border-l-4 md:border-l-0 border-darkCyan">
          {credits ? `${credits} Hour${credits !== 1 ? 's' : ''}` : '-'}
        </div>
        <div className="bg-darkCyan col-span-1 md:col-span-4 text-white font-semibold py-4 px-6 text-md mt-2 md:mt-0">
          {locale==='en'?'Lecture Hours':'ساعات المحاضرة'}
        </div>
        <div className="col-start-1 md:col-span-8 col-span-1 bg-lightCyan py-4 px-6 border-l-4 md:border-l-0 border-darkCyan">
          {lectureHours ? `${lectureHours} Hour${lectureHours !== 1 ? 's' : ''}` : '-'}
        </div>
        <div className="bg-darkCyan col-span-1 md:col-span-4 text-white font-semibold py-4 px-6 text-md mt-2 md:mt-0">
          {locale==='en'?'Practice / Lab Hours':'ساعات التدريب / المعمل'}
        </div>
        <div className="col-start-1 md:col-span-8 col-span-1 bg-lightCyan py-4 px-6 border-l-4 md:border-l-0 border-darkCyan">
          {practiceHours ? `${practiceHours} Hour${practiceHours !== 1 ? 's' : ''}` : '-'}
        </div>
        <div className="bg-darkCyan col-span-1 md:col-span-4 text-white font-semibold py-4 px-6 text-md mt-2 md:mt-0">
          {locale==='en'?'Co-Requests':'طلبات مشتركة'}
        </div>
        <div className="col-start-1 md:col-span-8 col-span-1 bg-lightCyan py-4 px-6 border-l-4 md:border-l-0 border-darkCyan">
          {(corequisites && corequisites !== '') ? <Transformer text={corequisites}/>  : `${locale==='en'?'No Co-Requests':'لا يوجد طلبات مشتركة متاح'}`}
        </div>
        <div className="bg-darkCyan col-span-1 md:col-span-4 text-white font-semibold py-4 px-6 text-md mt-2 md:mt-0">
          {locale==='en'?'Pre-Requisites':'المتطلبات'}
          {' '}
        </div>
        <div className="col-start-1 md:col-span-8 col-span-1 bg-lightCyan py-4 px-6 border-l-4 md:border-l-0 border-darkCyan">
          {(prerequisites && prerequisites !== '') ? <Transformer text={prerequisites}/> : `${locale==='en'?'No Pre-Requisites':'لا يوجد متطلبات متاح'}`}
        </div>
        <div className="bg-darkCyan col-span-1 md:col-span-4 text-white font-semibold py-4 px-6 text-md mt-2 md:mt-0 row-auto md:row-span-2">
          {locale==='en'?'Description':'الوصف'}
           {' '}
        </div>
        <div className="col-start-1 md:col-span-8 col-span-1 bg-lightCyan py-4 px-6 border-l-4 md:border-l-0 border-darkCyan row-auto md:row-span-2">
          {description !== '' ? description : `${locale==='en'?'No Description Avaliable':'لا يوجد وصف متاح'}`}
        </div>
      </div>
    </div>
  );
};

export default SingleCourse;
