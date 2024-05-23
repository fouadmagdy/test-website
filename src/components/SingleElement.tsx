'use client ';
import { SingleElementMap } from '@/lib/Constants';
import { EventData } from '@/types/EventData';
import { NewsData } from '@/types/NewsData';
import * as React from 'react';

/**
 * Represents the properties of a single element.
 * @interface ISingleElementProps
 * @property {string} parentName - The name of the parent element.
 * @property {EventData|NewsData|any} content - The content of the element, which can be of type EventData, NewsData, or any other type.
 */
interface ISingleElementProps {
  parentName: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: EventData | NewsData | any;
}

/**
 * A functional component that renders a single element based on the provided parent name.
 * @param {ISingleElementProps} props - The props object containing the parent name and content.
 * @returns The rendered component based on the parent name.
 */
const SingleElement: React.FunctionComponent<ISingleElementProps> = ({
  parentName,
  content,
}) => {
  const Component = SingleElementMap[parentName];

  if (Component) return <Component content={content} />;
};
export default SingleElement;
