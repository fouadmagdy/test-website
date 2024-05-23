import { useAppSelector } from '@/store/types';
import React from 'react';

/**
 * Represents the props for a ProgramFilter component.
 * @interface IProgramFilterProps
 * @property {Program[]} programs - The list of programs.
 */
export interface IProgramFilterProps {
  programs: Program[];
}

/**
 * Represents a program.
 * @interface Program
 * @property {string} value - The value of the program.
 * @property {string} label - The label of the program.
 */
export interface Program {
  value: string;
  label: string;
}

/**
 * A functional component that renders a program filter.
 * @param {IProgramFilterProps} props - The props object containing the programs to render.
 * @returns The rendered program filter based on the props.
 */
export const ProgramFilter: React.FC<IProgramFilterProps> = ({ programs }) => {
  const locale = useAppSelector((state) => state.lang.locale);
  return (
    <form className="max-w-sm mx-auto">
      <label
        htmlFor="programs"
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {locale==='en'?'Program:':'البرنامج:'}{' '}
      </label>
      <select
        id="programs"
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option selected>{locale==='en'?'Choose a Program':'اختر برنامجًا'}</option>
        {programs.map((program, index) => {
          return <option key={index} value={program.value}>{program.label}</option>;
        })}
      </select>
    </form>
  );
};
