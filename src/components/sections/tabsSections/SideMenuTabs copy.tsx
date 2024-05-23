import React, { useState } from 'react';
import Image from 'next/image';
import { GetServerUrl } from '@/lib/Networking';
// import Title from '@/components/shared/Title';
import SectionHeader from '../SectionHeader';
import { IoIosArrowForward } from 'react-icons/io';
/**
 * Represents the props for a vertical tabs component.
 * @interface SideMenuTabsProps
 * @property {object[]} content - The content of the vertical tabs.
 * @property {number} content.id - The ID of the content.
 * @property {string} content.__component - The component type of the content.
 * @property {string} [content.Title] - The title of the content.
 * @property {object[]} content.Data - The data for each tab.
 * @property {number} content.Data.id - The ID of the tab data.
 * @property {string} content.Data.leftTitle - The title on the left side of the tab.
 * @property {string} content.Data.description - The description of the tab
 */
interface SideMenuTabsProps {
  content: {
    id: number;
    __component: string;
    Title?: string;
    Data: {
      id: number;
      leftTitle: string;
      description: string;
      rightTitle?: string;
      image: {
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
  };
}
/**
 * A React functional component that renders a vertical tab layout.
 * @param {SideMenuTabsProps} props - The props object containing the content to be displayed in the tabs.
 * @returns The rendered vertical tab layout.
 */
const SideMenuTabs: React.FC<SideMenuTabsProps> = ({ content }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="container mt-10">
      <div className="">
        {content.Title ? <SectionHeader sectionTitle={content.Title} /> : ''}
        <div className="grid grid-cols-1 md:grid-cols-7 ">
          <div className=" h-fit border-t-8 col-span-2 border-primary">
            {content.Data.map((section, index) => (
              <div
                key={section.id}
                className={`delay-75 font-semibold px-4 py-2 grid grid-flow-col-dense justify-between items-center ${
                  activeTab === index
                    ? 'bg-primary text-white '
                    : 'border-b-2 text-gray-700 hover:bg-primary hover:text-gray-100 hover:font-bold '
                }`}
                onClick={() => setActiveTab(index)}
              >
                <button className={`font-normal w-full text-start  `}>
                  {section.leftTitle}
                </button>
                <IoIosArrowForward />
              </div>
            ))}
          </div>

          <div className=" md:border-s-2 p-5 grid grid-cols-1 col-span-5 gap-8 lg:gap-8">
            <div className="">
              <div className="max-w-lg mx-auto lg:max-w-none">
                <div className="prose text-gray-500 ">
                  {content.Data[activeTab].rightTitle ? (
                    <h2 className=" text-lg md:text-2xl font-bold text-primary  ">
                      {content.Data[activeTab].rightTitle}
                    </h2>
                  ) : (
                    ''
                  )}

                  <p className="pt-5">
                    {content.Data[activeTab].description ?? ''}
                  </p>
                </div>
              </div>
            </div>
            <div className=" lg:mt-0">
              <div className="">
                {
                  content.Data[activeTab].image.data ? (
                    <Image
                      width={500}
                      height={500}
                      src={
                        GetServerUrl() +
                        content.Data[activeTab].image.data?.attributes.url
                      }
                      alt={
                        content.Data[activeTab].image.data?.attributes?.name ??
                        ''
                      }
                      className="rounded-b-lg w-full transition-opacity opacity-0 duration-100"
                      onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                    />
                  ) : null // You can also replace this with any other fallback JSX if needed
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideMenuTabs;
