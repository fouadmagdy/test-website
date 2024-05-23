import { componentsMap } from '@/lib/Constants';
import * as React from 'react';

/**
 * Represents the props for a dynamic container component.
 * @interface IDynamicContainerProps
 * @property {object} content - The content of the dynamic container.
 * @property {string} content.component - The component to render inside the container.
 * @property {object} content.collection_url - The collection URL data.
 * @property {number} content.collection_url.data.id - The ID of the collection.
 * @property {object} content.collection_url.data.attributes - The attributes of the collection.
 * @property {string} content.collection_url.data.attributes.name - The name of the collection.
 * @property {string} content.collection_url.data.attributes.url - The URL of the collection.
 */
interface IDynamicContainerProps {
  content: {
    component: string;
    collection_url: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
        };
      };
    };
  };
}
/**
 * A functional component that dynamically renders a component based on the content's component type.
 * @param {IDynamicContainerProps} props - The props object containing the content to render.
 * @returns The rendered component based on the content's component type.
 */
const DynamicContainer: React.FunctionComponent<IDynamicContainerProps> = ({
  content,
}) => {
  const Component = componentsMap[content.component];
  if (Component) return <Component content={content} />;
};

export default DynamicContainer;
