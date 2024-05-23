import React from 'react';
import Counter from '../Counters';

/**
 * Represents the properties for a StatisticBox component.
 * @interface StatisticBoxProps
 * @property {number} statisticValueNumber - The numeric value of the statistic.
 * @property {string} statisticValueText - The text description of the statistic.
 * @property {boolean} enableAnimation - Indicates whether animation is enabled for the component.
 */
interface StatisticBoxProps {
  statisticValueNumber: number;
  statisticValueText: string;

  enableAnimation: boolean;
  IsParentage?: boolean;
}

/**
 * A functional component that represents a statistic box.
 * @param {StatisticBoxProps} props - The props for the StatisticBox component.
 * @param {number} props.statisticValueNumber - The numeric value of the statistic.
 * @param {string} props.statisticValueText - The text description of the statistic.
 * @param {boolean} props.enableAnimation - Whether to enable animation for the statistic.
 * @returns The rendered StatisticBox component.
 */
const StatisticBox: React.FC<StatisticBoxProps> = ({
  statisticValueNumber,
  statisticValueText,
  enableAnimation,
  IsParentage,
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-4">
      <h3>
        <Counter n={statisticValueNumber} enabled={enableAnimation} />
        {IsParentage ? '%' : ''}
      </h3>
      <hr className="h-0.5 my-3 bg-gray-200 border-0 text-center w-full" />
      <h5 className="text-white">{statisticValueText}</h5>
    </div>
  );
};

export default StatisticBox;
