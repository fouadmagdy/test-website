import React from 'react';
import Title, { LineType } from '../shared/Title';
import ReadMoreBtn from '../shared/ReadMoreBtn';
import { StrapiLinkV2 } from '@/types/StrapiData';
import AdvancedRichText from './AdvancedRichText';
/**
 * Represents the props for the DetailedInfo component.
 * @property {object} content - The content object of the DetailedInfo component.
 * @property {number} content.id - The ID of the content.
 * @property {string} content.__component - The component type of the content.
 * @property {string} content.title - The title of the content.
 * @property {object[]} content.TitleAndDescription - An array of objects representing the title and description of the content.
 * @property {number} content.TitleAndDescription.id - The ID of the title and description.
 * @property {string} content.TitleAndDescription.Title - The title of the title and description.
 * @property {string} content.TitleAndDescription.Description
 */
interface TitleAndDesc_props {
  content: {
    id: number;
    __component: string;
    title: string;
    description: string;
    buttonLink: StrapiLinkV2;
  };
  inSidebar:boolean
}
/**
 * A React functional component that renders detailed information based on the provided content.
 * @param {TitleAndDesc_props} props - The props object containing the content to be rendered.
 * @returns The JSX elements representing the detailed information.
 */
const TitleAndDesc: React.FC<TitleAndDesc_props> = ({ content , inSidebar }) => {
  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <div className="lg:w-1/2">
        <Title
          text={content?.title}
          textColor={'text-primary'}
          fontSize={''}
          fontWeight={'font-bold'}
          line={LineType.Before}
          lineColor={'before:bg-secondary'}
          id="section-title"
          aria-labelledby="section-title"
          className=" leading-tight "
        />
      </div>
      <p className=" text-gray-900 inline ">
        {content.description ? (
          <AdvancedRichText
            content={{
              advancedRichText: content.description,
            }}
          />
        ) : null}
        {content?.buttonLink?.data?.attributes?.slug ? (
          <span>
            <ReadMoreBtn
              PageName={content?.buttonLink?.data?.attributes?.slug}
            />
          </span>
        ) : null}
      </p>
    </div>
  );
};

export default TitleAndDesc;
