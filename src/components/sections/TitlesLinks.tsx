import React from 'react';
import Title, { LineType } from '../shared/Title';
import { StrapiLinkV2 } from '@/types/StrapiData';
import Link from 'next/link';
import { IoIosArrowDropright, IoIosArrowDropleft } from 'react-icons/io';
import AdvancedRichText from './AdvancedRichText';
import { useAppSelector } from '@/store/types';

/**
 * Represents a property with content that includes a title, description, image, and button.
 * @interface IProp
 * @property {object} content - The content of the property.
 * @property {StrapiImage} content.media - The image associated with the property.
 * @property {StrapiLinkV2} content.target - The image associated with the property.
 */
interface IProp {
  content: {
    title: string;
    description: string;
    subTitle: string;
    links: {
      label: string;
      target: StrapiLinkV2;
    }[];
  };
  inSidebar:boolean;
}
/**
 * A component that renders a detailed banner with an image, title, description, and optional button.
 * @param {IProp} props - The props object containing the content for the banner.
 * @returns The rendered detailed banner component.
 */
const TitlesLinks = ({ content , inSidebar }: IProp) => {
  const locale = useAppSelector((state) => state.lang.locale);
  return (
    <div className=" bg-gray-100 campus-life-clipt">
      <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
        <div className="pb-5 pt-5 md:pt-32 ps-2 md:ps-0">
          {content.title ? (
            <Title
              text={content.title}
              textColor={'text-primary'}
              fontSize={''}
              fontWeight={''}
              line={LineType.None}
              lineColor={'after:bg-primary'}
              className={'h3'}
            />
          ) : (
            ''
          )}

          {content.description ? (
            <AdvancedRichText
              content={{
                advancedRichText: content.description,
              }}
            />
          ) : null}
          <div>
            {content.subTitle ? (
              <Title
                text={content.subTitle}
                textColor={'text-black'}
                fontSize={''}
                fontWeight={''}
                line={LineType.None}
                lineColor={'after:bg-primary'}
                className="h3"
              />
            ) : (
              ''
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 mt-2 md:mt-4">
              <div className="grid grid-cols-1 md:grid-cols-2 ">
                {content.links.map((item, index) => (
                  <Link
                    href={`/${item?.target?.data?.attributes?.slug}`}
                    className="flex gap-1 my-1 items-center text-primary border-b-[1px] border-black pb-2 w-fit"
                    key={index}
                  >
                    <h5>{item.label}</h5>
                    {locale === 'en' ? (
                      <IoIosArrowDropright />
                    ) : (
                      <IoIosArrowDropleft />
                    )}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TitlesLinks;
