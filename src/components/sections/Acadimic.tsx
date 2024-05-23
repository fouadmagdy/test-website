import React from 'react';
import SectionHeader from './SectionHeader';
import Programs from '../shared/Programs';
// import SearchBar from '../shared/SearchBar';
// import { StrapiButton } from '@/types/StrapiData';
/**
 * Represents the interface for academic props.
 * @interface Acadimic_Props
 * @property {object} content - The content object.
 * @property {number} content.id - The ID of the content.
 * @property {string} content.__component - The component type of the content.
 * @property {string} content.text - The text content.
 * @property {string} content.title - The title of the content.
 * @property {StrapiButton} content.button - The button object.
 * @property {Array} content.photoLink - An array of photo link objects.
 * @property {number} content.photoLink.id - The ID of the photo link.
 * @property {string} content.photoLink.button
 */
interface Acadimic_Props {
  content: {
    id: number;
    __component: string;
    sectionHeader: {
      id: 1;
      title: string;
      button: {
        id: 9;
        theme: string;
        link: {
          id: number;
          label: string;
          isExternal: boolean;
          externalLink: string;
          target: {
            data: {
              attributes: {
                slug: string;
              };
            };
          };
        };
      };
    };
    photoLink: [
      {
        id: 1;
        buttonText: string;
        image: {
          data: {
            id: number;
            attributes: {
              alternativeText: string;

              url: string;
            };
          };
        };
        page?: {
          data?: {
            id: 30;
            attributes: {
              slug: 'home';
            };
          };
        };
      },
    ];
  };
  inSidebar:boolean;
}

/**
 * A functional component that renders an academic section.
 * @param {Acadimic_Props} props - The props object containing the content to be rendered.
 * @returns The rendered JSX elements.
 */
const Acadimic: React.FC<Acadimic_Props> = ({ content , inSidebar}) => {
  return (
    <>
      <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
        {content?.sectionHeader?.title ? (
          <SectionHeader
            sectionTitle={content?.sectionHeader?.title}
            mainSectionLink={content?.sectionHeader?.button}
          />
        ) : null}
      </div>
      <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
        <Programs photoLink={content.photoLink} />
      </div>
    </>
  );
};

export default Acadimic;
