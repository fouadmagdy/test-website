'use client';
import React, { useEffect } from 'react';
import Title, { LineType } from '../shared/Title';
import {
  MdKeyboardDoubleArrowRight,
  MdKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import ResearchSlider from '../shared/slider/ResearchSlider';
import { StrapiButtonV2 } from '@/types/StrapiData';
import axios from 'axios';
import { ImageProp } from '@/types/image.types';
import LongParagraph from '../shared/LongParagraph';
import { useAppSelector } from '@/store/types';

interface Iprop {
  content: {
    id: number;
    __component: string;
    title: string;
    description: string;
    targetPage: {
      data: {
        attributes: {
          title: string;
          slug: string;
        };
      };
    };
    button: StrapiButtonV2;
    content: {
      data: {
        id: number;
        attributes: {
          name: string;
          url: string;
        };
      };
    };
  };
  inSidebar:boolean;
}

// reserach caurosal interface
interface ResearchItem {
  data: {
    id: number;
    attributes: {
      title: string;
      date: Date;
      body: string;
      slug: string;
      image: ImageProp;
    };
  }[];
}

const ResearchSection = ({ content , inSidebar }: Iprop) => {
  const [researchData, setResearchData] = React.useState<ResearchItem>();
  const locale = useAppSelector((state) => state.lang.locale);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // const res = await axios.get(content.content.data.attributes?.url);
        const res = await axios.get<ResearchItem>(
          `${content.content.data?.attributes.url}`,
        );
        setResearchData(res.data);
      } catch (error) {}
    };

    fetchData();
  }, [content.content.data?.attributes.url]);
  if (!content) return;
  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <div className="  grid grid-cols-1 lg:grid-cols-3 gap-3 ">
        <div>
          <div className="xl:max-w-[20px] mb-10">
            <Title
              text={content?.title}
              textColor="text-primary"
              fontSize=""
              fontWeight=""
              line={LineType.Before}
              lineColor="md:before:bg-primary"
            />
          </div>
          <p className="text-base  my-5 md:my-10 md:text-xl font-thin leading-8 pr-12">
            <LongParagraph text={content?.description} />
          </p>
          <a
            href={`/${content?.button?.link?.target?.data?.attributes?.slug}`}
            className={`border-primary text-primary border-2 rounded-md text-center flex gap-2.5 items-center max-w-fit px-5 py-2  duration-300 ease-linear hover:border-secondary hover:bg-secondary transition hover:text-white`}
          >
            <span className={`text-md tracking-wide   `}>
              {content?.button?.link?.label}
            </span>
            {locale === 'en' ? (
              <MdKeyboardDoubleArrowRight size={25} />
            ) : (
              <MdKeyboardDoubleArrowLeft size={25} />
            )}
          </a>
        </div>
        {/* add check for the sidebarData length if it is empty then add pleace select Research Data  */}
        <div className="md:col-span-2">
          {!researchData?.data ? (
            locale === 'en' ? (
              'Please Select Research Data'
            ) : (
              'الرجاء تحديد بيانات البحث'
            )
          ) : (
            <>
              <ResearchSlider
                content={researchData?.data}
                targetPage={content?.targetPage?.data?.attributes?.slug}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ResearchSection;
