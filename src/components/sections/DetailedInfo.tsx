import React from 'react';
import Title, { LineType } from '../shared/Title';
import ReadMoreBtn from '../shared/ReadMoreBtn';
import LongParagraph from '../shared/LongParagraph';

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
interface DetailedInfo_props {
  content: {
    id: number;
    __component: string;
    title: string;
    TitleAndDescription: {
      id: number;
      Title: string;
      Description: string;
      buttonLink: {
        data: {
          attributes: {
            PageName: string;
          };
        };
      };
    }[];
  };
  inSidebar:boolean;
}
/**
 * A React functional component that renders detailed information based on the provided content.
 * @param {DetailedInfo_props} props - The props object containing the content to be rendered.
 * @returns The JSX elements representing the detailed information.
 */
const DetailedInfo: React.FC<DetailedInfo_props> = ({ content , inSidebar }) => {
  if (content.title)
    return (
      <div className=" px-1 sm:p-0 sm:container">
        <Title
          text={content.title}
          textColor={'text-primary'}
          fontSize={''}
          fontWeight={'font-bold'}
          line={LineType.None}
          lineColor={'before:bg-secondary'}
          id="section-title"
          aria-labelledby="section-title"
        />
        <div className="grid grid-cols-1 md:grid-cols-2">
          {content.TitleAndDescription.map((item, index) => (
            <div key={index} className="py-4 ">
              <h3 className="text-softBlack font-bold">{item.Title}</h3>
              <p className="text-sm text-softBlack py-5 inline">
                <LongParagraph text={item.Description} />{' '}
                {item.buttonLink.data ? (
                  <ReadMoreBtn
                    PageName={item.buttonLink.data.attributes.PageName}
                  />
                ) : (
                  <></>
                )}
              </p>
            </div>
          ))}
        </div>
      </div>
    );
  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <div className="pt-12">
        {content.TitleAndDescription.map((item, index) => (
          <div key={index} className="py-4 ">
            <div
              className={`mb-5 ${
                content.TitleAndDescription.length == 1 ? 'md:w-80' : ''
              }`}
            >
              {item.Title ? (
                <Title
                  text={item.Title}
                  textColor={'text-primary'}
                  fontSize={''}
                  fontWeight={'font-bold'}
                  line={LineType.Before}
                  lineColor={'before:bg-secondary'}
                  id="section-title"
                  aria-labelledby="section-title"
                />
              ) : (
                ''
              )}
            </div>
            <p className="text-sm text-gray-900 py-5 inline">
              <LongParagraph text={item.Description} />{' '}
              {item.buttonLink.data ? (
                <ReadMoreBtn
                  PageName={item.buttonLink.data.attributes.PageName}
                />
              ) : (
                <></>
              )}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailedInfo;
