import React, { useState } from 'react';
import Image from 'next/image';
import { GetServerUrl } from '@/lib/Networking';
import Title, { LineType } from '@/components/shared/Title';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * Represents the props for a horizontal tabs component.
 * @interface HorizontalTabsProps
 * @property {Object[]} content - The content of the horizontal tabs.
 * @property {number} content.id - The ID of the content.
 * @property {string} content.__component - The component type of the content.
 * @property {Object[]} content.sectionTap - The sections of the horizontal tabs.
 * @property {number} content.sectionTap.id - The ID of the section.
 * @property {string} content.sectionTap.title - The title of the section.
 * @property {string} content.sectionTap.description - The description of the section.
 * @property {Object} [content.sectionTap.image] - The image of the
 */
interface HorizontalTabsProps {
  content: {
    id: number;
    __component: string;
    sectionTap: {
      id: number;
      title: string;
      description: string;
      image?: {
        data?: {
          id: number;
          attributes: {
            name: string;
            alternativeText: string;
            caption: string;
            url: string;
          };
        };
      };
    }[];
    componentHeader?: {
      id: number;
      title: string;
      description: string;
    };
  };
}
/**
 * A horizontal tabs component that displays content based on the selected tab.
 * @param {HorizontalTabsProps} content - The content to be displayed in the tabs.
 * @returns A React functional component that renders the horizontal tabs.
 */
const HorizontalTabs: React.FC<HorizontalTabsProps> = ({ content }) => {
  const [activeTab, setActiveTab] = useState(0);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  return (
    <div className="w-full max-w-screen-2xl mx-auto px-10 lg:px-20">
      {content.componentHeader ? (
        <>
          <Title
            text={content.componentHeader.title}
            textColor={'text-primary'}
            fontSize={''}
            fontWeight={'font-bold'}
            line={LineType.Beside}
            lineColor={'after:bg-primary'}
          />
          <p className="py-8 text-lg font-medium">
            {content.componentHeader.description}
          </p>
        </>
      ) : (
        ''
      )}
      <div className="grid grid-flow-col bg-biege text-lg ">
        {content.sectionTap.map((section, index) => (
          <button
            key={section.id}
            onClick={() => setActiveTab(index)}
            className={`font-semibold  ${
              activeTab === index
                ? 'bg-secondary text-white'
                : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
            } px-4 py-3 `}
          >
            {section.title}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-8 py-10">
        <div className="lg:col-span-2">
          <div className="max-w-lg mx-auto lg:max-w-none">
            <div className="mb-6"></div>
            <div className="prose text-gray-500 border-s-4 border-secondary p-3">
              <p className="leading-6">
                {content.sectionTap[activeTab].description}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-12 lg:mt-0">
          <div className="mt-6">
            {isImageLoading && (
              <Skeleton
                className="w-full h-full"
                baseColor="#fff"
                highlightColor="#ccc"
              />
            )}
            {content.sectionTap[activeTab].image?.data ? (
              <Image
                width={500}
                height={500}
                src={
                  GetServerUrl() +
                  content.sectionTap[activeTab].image?.data?.attributes.url
                }
                alt={
                  content.sectionTap[activeTab].image?.data?.attributes
                    .alternativeText || ''
                }
                className="rounded-b-lg transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) => {
                  image.classList.remove('opacity-0');
                  setIsImageLoading(false);
                }}
                loading="lazy"
              />
            ) : (
              ''
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HorizontalTabs;
