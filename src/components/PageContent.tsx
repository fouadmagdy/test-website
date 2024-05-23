'use client';

import Loading from '@/app/loading';
import { componentsMap } from '@/lib/Constants';
import { useAppSelector } from '@/store/types';
import { ContentData } from '@/types/ContentData';
import { PageData } from '@/types/PageData';
import { StrapiData } from '@/types/StrapiData';
import { useEffect, useState } from 'react';
import PaddingComponent from './shared/PaddingComponent';
import SideBar from './sections/tabsSections/SideBar';
import axios from 'axios';

interface PageContentProps {
  data?: {
    [key: string]: StrapiData<PageData>;
  };
}

export interface Sidebar {
  children?: Sidebar[];
  id: number;
  level: number;
  parentId: number;
  slug: string;
  title: string;
  showInSidebar: boolean | null;
  pageOrder: number;
}

const PageContent = ({ data }: PageContentProps) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const [isClient, setIsClient] = useState(false);
  const [indexSlice, setIndexSlice] = useState<number | undefined>(2);
  const [sidebarData, setSidebarData] = useState<Sidebar[] | undefined>();

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      if (!data || !data[locale]) return;

      try {
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages/getsidebar/${data[locale]?.data[0].id}`,
        );
        setSidebarData(res.data.Sidebar);

        const fullWidthComponent = data[
          locale
        ]?.data[0]?.attributes.Content.find((component) =>
          [
            'pcomp.member-gallery',
            'pcomp.statistics',
            'pcomp.banner',
            'pcomp.academic-section',
          ].includes(component.__component),
        );

        const index = fullWidthComponent
          ? data[locale]?.data[0]?.attributes.Content.indexOf(
              fullWidthComponent,
            )
          : 100;
        setIndexSlice(index);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [data, locale]);

  const renderContent = (
    content: ContentData[],
    startIndex: number = 0,
    endIndex?: number,
  ) => {
    return content.slice(startIndex, endIndex).map((item, index) => {
      const Component = componentsMap[item.__component];
      return Component ? (
        <div key={index}>
          <Component
            inSidebar={false}
            content={item}
            sliderData={item.sliderdata}
            reverse={index % 2 !== 0}
          />
          {index < content.length - 1 && <PaddingComponent />}
        </div>
      ) : null;
    });
  };

  const renderSidebarAndContent = (content: ContentData[]) => {
    const hasDynamicHero = [
      'pcomp.dynamic-hero',
      'pcomp.hero',
      'pcomp.breadcrumbs',
      'pcomp.inner-hero',
    ].includes(content[0]?.__component);

    return hasDynamicHero ? (
      <>
        {renderContent(content, 0, 1)}
        <div className="grid grid-cols-12">
          <div className="col-span-12 lg:col-span-2 ms-3 self-start lg:sticky lg:top-16 lg:z-40">
            <div className="max-h-[90vh] overflow-y-auto overflow-x-hidden mt-2">
              <SideBar
                SidebarData={sidebarData}
                pageId={data?.[locale]?.data[0].id}
              />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-10 px-2 sm:px-5">
            {renderContent(content, 1, indexSlice)}
          </div>
        </div>
        {renderContent(content, indexSlice)}
      </>
    ) : (
      <div className="grid grid-cols-12">
        <div className="col-span-12 lg:col-span-2 ms-3 self-start lg:sticky lg:top-16 lg:z-40">
          <div className="max-h-[90vh] overflow-y-auto overflow-x-hidden mt-2">
            <SideBar
              SidebarData={sidebarData}
              pageId={data?.[locale]?.data[0].id}
            />
          </div>
        </div>
        <div className="col-span-12 lg:col-span-10 px-2 sm:px-5 mt-5">
          {renderContent(content)}
        </div>
      </div>
    );
  };

  if (!isClient) {
    return <Loading />;
  }

  if (!data || !data[locale] || !data[locale].data.length) {
    return <Loading />;
  }

  const content = data[locale]?.data[0]?.attributes.Content;

  return (
    <div dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {content?.length
        ? !data[locale]?.data[0]?.attributes.sidebar
          ? renderContent(content)
          : renderSidebarAndContent(content)
        : null}
    </div>
  );
};

export default PageContent;
