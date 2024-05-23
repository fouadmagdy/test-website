'use client';
import Loading from '@/app/loading';
import { componentsMap } from '@/lib/Constants';
import { useAppSelector } from '@/store/types';
import { ContentData } from '@/types/ContentData';
import { PageData } from '@/types/PageData';
import { StrapiData } from '@/types/StrapiData';
import { useEffect, useState } from 'react';
// import SingleElement from './SingleElement';
import PaddingComponent from './shared/PaddingComponent';
import SideBar from './sections/tabsSections/SideBar';
import axios from 'axios';
// import NewNavbar from './shared/navbar/NewNavbar';

/**
 * Represents the properties of a page content component.
 * @interface PageContentProps
 * @property {string | undefined} parentName - The name of the parent component.
 * @property {Object.<string, StrapiData<PageData> | undefined>} data - The data object containing page data.
 */
interface PageContentProps {
  data?: {
    [key: string]: StrapiData<PageData>;
  };
}
/**
 * Renders the content of a page based on the provided props.
 * @param {PageContentProps} props - The props object containing the parent name and data.
 * @returns The rendered page content.
 */

export interface Sidebar {
  children?: Sidebar[];
  id: number;
  level: number;
  parentId: number;
  slug: string;
  title: string;
  showInSidebar:boolean|null;
  pageOrder:number;
}
[];

const PageContent = ({ data }: PageContentProps) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const [isClient, setIsClient] = useState(false);
  const [indexSlice, setIndexSlice] = useState<number | undefined>(2);
  // const [isLoading, setIsLoading] = useState<boolean>(true);
  const [sidebarData, setSidebarData] = useState<Sidebar[] | undefined>();
  /**
   * useEffect hook that sets the value of isClient to true when the component mounts.
   * @returns None
   */
  useEffect(() => {
    setIsClient(true);
  }, []);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!data) return;
        // setIsLoading(true);
        const res = await axios.get(
          // ${data[locale]?.data[0].id}
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages/getsidebar/${data[locale]?.data[0].id}}}`,
        );
        setSidebarData(res.data.Sidebar);
        const FullWidthComponent = data[
          locale
        ]?.data[0]?.attributes.Content.find(
          (component) =>
            component.__component === 'pcomp.member-gallery' ||
            component.__component === 'pcomp.statistics' ||
            component.__component === 'pcomp.banner' ||
            component.__component === 'pcomp.academic-section',
        );
        const index = FullWidthComponent
          ? data[locale]?.data[0]?.attributes.Content.indexOf(FullWidthComponent)
          : 100;
        setIndexSlice(index);
        // setIsLoading(false);
      } catch (error) {}
    };
    fetchData();
  }, [data, locale]);
  return (
    <>
      <div>
        {isClient ? (
          !data ? null : (
            <div dir={locale == 'ar' ? 'rtl' : 'ltr'}>
              <>
                {!data[locale]?.data[0]?.attributes.sidebar ? (
                  <div>
                    {data[locale]?.data[0]?.attributes.Content.map(
                      (item: ContentData, index: number,array: ContentData[]) => {
                        const Component = componentsMap[item.__component];
                        if (Component){
                          const isLastElement = index === array.length - 1;
                          return (
                            <div key={index}>
                              <Component
                                inSidebar={false}
                                content={item}
                                sliderData={item.sliderdata}
                                reverse={index % 2 !== 0}
                              />
                              {!isLastElement && <PaddingComponent />}                             
                            </div>
                          );
                        }
                      },
                    )}
                  </div>
                ) : (
                  <>
                    {data[locale]?.data[0]?.attributes.Content &&
                    data[locale]?.data[0]?.attributes.Content.length &&
                    (data[locale]?.data[0]?.attributes.Content[0].__component ==
                      'pcomp.dynamic-hero' ||
                      data[locale]?.data[0]?.attributes.Content[0].__component ==
                        'pcomp.hero' ||
                      data[locale]?.data[0]?.attributes.Content[0].__component ==
                        'pcomp.breadcrumbs' ||
                      data[locale]?.data[0]?.attributes.Content[0].__component ==
                        'pcomp.inner-hero') ? (
                      <>
                        {/* show first item  */}
                        {data[locale]?.data[0]?.attributes.Content.slice(
                          0,
                          1,
                        ).map((item: ContentData, index: number,array: ContentData[]) => {
                          const Component = componentsMap[item.__component];
                          if (Component) {
                            const isLastElement = index === array.length - 1;
                            return (
                              <div key={index}>
                                <Component
                                  inSidebar={true}
                                  content={item}
                                  sliderData={item.sliderdata}
                                />
                                <PaddingComponent />
                                {!isLastElement && <PaddingComponent />}
                              </div>
                            );
                          }
                          return null; // Or any other fallback or empty rendering if needed
                        })}
                        <div className="grid grid-cols-12">
                          <div className="col-span-12 lg:col-span-2 ms-3 self-start lg:sticky lg:top-16 lg:z-40">
                            <div className="max-h-[90vh] overflow-y-auto overflow-x-hidden mt-2 ">
                              <SideBar SidebarData={sidebarData} pageId={data[locale]?.data[0].id} />
                            </div>
                          </div>
                          <div className="col-span-12 lg:col-span-10 px-2 sm:px-5">
                            {data[locale]?.data[0]?.attributes.Content.slice(
                              1,
                              indexSlice,
                            ).map((item: ContentData, index: number,array: ContentData[]) => {
                              const Component = componentsMap[item.__component];
                              if (Component) {
                                const isLastElement = index === array.length - 1;
                                return ( 
                                  <div key={index}>
                                    <Component
                                      inSidebar={true}
                                      content={item}
                                      sliderData={item.sliderdata}
                                    />
                                    {!isLastElement && <PaddingComponent />}
                                  </div>
                                );
                              }
                              return null; // Or any other fallback or empty rendering if needed
                            })}
                            {/* map on all items expt the fist item  */}
                          </div>
                        </div>
                        {data[locale]?.data[0]?.attributes.Content.slice(
                          indexSlice,
                        ).map((item: ContentData, index: number,array: ContentData[]) => {
                          const Component = componentsMap[item.__component];
                          if (Component) {
                            const isLastElement = index === array.length - 1;
                            return (
                              <div key={index}>
                                <Component
                                  inSidebar={false}
                                  content={item}
                                  sliderData={item.sliderdata}
                                  reverse={index % 2 !== 0}
                                />
                                {!isLastElement && <PaddingComponent />}
                              </div>
                            );
                          }
                          return null; // Or any other fallback or empty rendering if needed
                        })}
                      </>
                    ) : (
                      <>
                        <div className="grid grid-cols-12">
                          <div className="col-span-12 lg:col-span-2 ms-3 self-start lg:sticky lg:top-16 lg:z-40">
                            <div className="max-h-[90vh] overflow-y-auto overflow-x-hidden mt-5">
                              <SideBar SidebarData={sidebarData} pageId={data[locale]?.data[0].id} />
                            </div>
                          </div>
                          <div className="col-span-12 lg:col-span-10 px-2 sm:px-5 mt-9">
                            {data[locale]?.data[0]?.attributes.Content.map(
                              (item: ContentData, index: number,array: ContentData[]) => {
                                const Component =
                                  componentsMap[item.__component];
                                // const notContaineredComponents = ['page-components.hero', 'page-components.statistics-card'];
                                // className={`${!notContaineredComponents.includes(item.__component) ? 'container' : ''}`}
                                if (Component){
                                  const isLastElement = index === array.length - 1;
                                  return (
                                    <div key={index}>
                                      <Component
                                        content={item}
                                        sliderData={item.sliderdata}
                                        reverse={index % 2 !== 0}
                                      />
                                    {!isLastElement && <PaddingComponent />}
                                    </div>
                                  );
                                }
                              },
                            )}
                          </div>
                        </div>
                      </>
                    )}
                  </>
                )}
              </>
            </div>
          )
        ) : (
          <Loading />
        )}
      </div>
    </>
  );
};

export default PageContent;
