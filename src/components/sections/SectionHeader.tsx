import React from 'react';
import Title, { LineType } from '../shared/Title';
import Button from '../shared/Button';
// import { MainSectionLink } from '@/types/MainSectionLink';
// import { StrapiButton } from '@/types/StrapiData';

/**
 * Represents the properties for a section header component.
 * @interface SectionHeaderProps
 * @property {string} sectionTitle - The title of the section.
 * @property {StrapiButton} [mainSectionLink] - The main section link button.
 */
interface SectionHeaderProps {
  sectionTitle: string;
  mainSectionLink?: {
    id: number;
    theme: string;
    link: {
      id: number;
      label: string;
      target: {
        data: {
          attributes: {
            slug: string;
          };
        };
      };
    };
  };
}
/**
 * A functional component that renders a section header with a title and an optional button link.
 * @param {SectionHeaderProps} props - The props for the SectionHeader component.
 * @returns The rendered SectionHeader component.
 */
const SectionHeader: React.FC<SectionHeaderProps> = ({
  sectionTitle,
  mainSectionLink,
}) => {
  return (
    <div className=" grid grid-cols-1 md:grid-cols-2 items-center justify-between py-6 md:pt-0 md:pb-8">
      <div className="mx-auto mb-5 md:m-0">
        <Title
          text={sectionTitle}
          textColor="text-primary"
          fontSize=""
          fontWeight=""
          line={LineType.Beside} // Set the line type using the enum
          lineColor="md:after:bg-grey_dark"
        />
      </div>
      {mainSectionLink?.link?.label ? (
        <div className=" md:m-0 justify-self-center md:justify-self-end self-center items-center">
          {mainSectionLink?.link?.label ? (
            <a
              href={`/${mainSectionLink?.link?.target?.data?.attributes?.slug}`}
            >
              <Button
                text={mainSectionLink?.link?.label}
                backgroundColor="bg-primary"
                fontSize="text-lg md:text-xl"
              />
            </a>
          ) : (
            <Button
              text={mainSectionLink?.link?.label}
              backgroundColor="bg-primary"
              fontSize="text-lg md:text-xl"
            />
          )}
        </div>
      ) : (
        ''
      )}
    </div>
  );
};

export default SectionHeader;
