import React, { useEffect, useRef, useState } from 'react';
import StatisticBox from './StatisticBox';
import LongParagraph from '@/components/shared/LongParagraph';

/**
 * Represents the props for the StatisticWrapper component.
 * @interface StatisticWrapperProps
 * @property {object} content - The content object containing the statistics data.
 * @property {number} content.id - The ID of the content.
 * @property {string} content.__component - The component type.
 * @property {string} content.title - The title of the content.
 * @property {string} content.description - The description of the content.
 * @property {StatisticItem[]} content.statistics - An array of StatisticItem objects representing the statistics.
 */
interface StatisticItem {
  id: number;
  intNumber: number;
  brief: string;
}
interface StatisticWrapperProps {
  content: {
    id: number;
    __component: string;
    title: string;
    description: string;
    statistics: StatisticItem[];
  };
}
/**
 * A React functional component that displays statistics.
 * @param {StatisticWrapperProps} content - The content to be displayed in the component.
 * @returns JSX element representing the statistics component.
 */
const Statistics: React.FC<StatisticWrapperProps> = ({ content }) => {
  const [ElementVisible, setElementVisible] = useState(false);
  const ElementRef = useRef<HTMLDivElement>(null);
  /**
   * Sets up an intersection observer to track the visibility of a specified element.
   * @param {Function} callback - The function to be called when the element's visibility changes.
   * @param {React.RefObject} elementRef - The reference to the element being observed.
   * @returns None
   */
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setElementVisible(entry.isIntersecting);
    });
    observer.observe(ElementRef.current!);
  }, []);
  return (
    <div
      ref={ElementRef}
      className="bg-primary text-center justify-center m-auto py-12 font-semibold"
    >
      <div className="grid grid-cols-1">
        {content.title ? (
          <div className="flex flex-col justify-center items-center">
            <h2 className="text-white">{content.title}</h2>
            <p className=" h-0.5 my-3 bg-gray-200 border-0 w-10 text-center"></p>
          </div>
        ) : null}
      </div>

      <p className="text-white font-bold text-xl"><LongParagraph text={content.description} /></p>
      <div className="max-w-fit grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 justify-center m-auto gap-3 ">
        {content.statistics.map((item: StatisticItem) => {
          return (
            <StatisticBox
              key={item.id}
              statisticValueNumber={Number(item.intNumber)}
              statisticValueText={item.brief}
              enableAnimation={ElementVisible}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Statistics;
