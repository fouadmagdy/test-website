import { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import Title, { LineType } from '@/components/shared/Title';
import { SingleProgram as SingleProgramType } from '@/types/single.program.types';
import AdvancedRichText from '../AdvancedRichText';
import { useColor } from '@/context/color.context';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeRaw from 'rehype-raw';
import { Accordion } from 'flowbite-react';
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel';
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle';
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent';
// import Collapse from '../collapse';
import ProgramAdvancedRichText from './ProgramAdvancedRichText';
import Loading from '@/app/loading';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import React from 'react';
import DescriptionRichText from '../DescriptionRichText';

// import Link from 'next/link';

interface SingleProgramTypes {
  content: {
    __component: string;
    title: string;
    content: {
      data: {
        attributes: {
          url: string | undefined;
          needToEdit: boolean;
        };
      };
    };
  };
  inSidebar:boolean;
}
function SingleProgram({ content,inSidebar }: SingleProgramTypes) {
  const [fetchedData, setFetchedData] = useState<SingleProgramType>();
  const [loading, setLoading] = useState<boolean>(true);
  const pathname = usePathname();
  const programId = pathname.split('/')[pathname.split('/').length - 1];
  const { setColor } = useColor(); // Consume the color from the context
  const [isImageLoading, setIsImageLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (content.content.data.attributes.url) {
        try {
          let apiUrl = content.content.data.attributes.url;

          if (content.content.data.attributes.needToEdit) {
            apiUrl = apiUrl.replace('objId', programId as unknown as string);
          }

          if (apiUrl) {
            setLoading(true);
            const res = await axios.get<SingleProgramType>(apiUrl);
            setFetchedData(res.data);
            setLoading(false);
          }
        } catch (error) {}
      }
    };

    fetchData();
  }, [
    content.content.data.attributes.needToEdit,
    content.content.data.attributes.url,
    programId,
  ]);

  useEffect(() => {
    if (fetchedData) {
      setColor(fetchedData.data.attributes.school?.data?.attributes?.color);
    }
  }, [fetchedData, setColor]);
  // Check if fetchedData exists and has the necessary structure

  if (!fetchedData || !fetchedData.data) {
    return <Loading />; // Return null if data is missing or empty
  }

  return (
    <div className={`${inSidebar?'':'sm:container'} px-1 sm:p-0`}>
      {/* <div className="my-5 max-w-4 leading-10"> */}
      {loading ? (
        <Loading />
      ) : (
        <>
          <div
            className="pb-4"
            style={{
              color:
                fetchedData.data.attributes.school?.data?.attributes?.color,
            }}
          >
            {fetchedData.data.attributes.title ? (
              <Title
                text={fetchedData.data.attributes.title}
                textColor={`text-${fetchedData.data.attributes.school?.data?.attributes?.color}`}
                fontSize={'text-5xl'}
                fontWeight={'font-bold'}
                line={LineType.Before}
                lineColor={'after:bg-primary'}
                className="max-w-2xl leading-tight"
              />
            ) : null}
          </div>
          {/* </div> */}
          {/* {fetchedData.data.attributes.description && (
        <p className="font-normal mb-4 my-4 text-justify text-gray-700 text-base pb-5  leading-loose">
          {fetchedData.data.attributes.description}
        </p>
      )} */}
          {/* {fetchedData.data.attributes.description ? (
        <AdvancedRichText
          content={{
            advancedRichText: fetchedData.data.attributes.description,
          }}
        />
      ) : null} */}
          {fetchedData.data.attributes.description &&
            (() => {
              const paragraphs =
                fetchedData.data.attributes.description.split('\n\n'); // Split text into paragraphs
              const imageRegex = /!\[.*?\]\((.*?)\)/; // Regex to match markdown image syntax

              return (
                <div>
                  <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 mt-4`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
                      <div>
                        {paragraphs
                          .filter((paragraph) => !imageRegex.test(paragraph))
                          .map((paragraph, index) => (
                            <DescriptionRichText
                              content={{ advancedRichText: paragraph }}
                              key={index}
                            />
                          ))}
                      </div>
                      <div className="flex justify-end items-center">
                        {isImageLoading && (
                          <Skeleton
                            className="w-full h-full"
                            baseColor="#fff"
                            highlightColor="#ccc"
                          />
                        )}
                        {imageRegex.test(
                          fetchedData.data.attributes.description,
                        ) && (
                          <Image
                            width={500}
                            height={100}
                            src={
                              fetchedData?.data?.attributes?.description?.match(
                                imageRegex,
                              )?.[1] || ''
                            }
                            alt="Program Image"
                            className="h-4/6 object-cover transition-opacity opacity-0 duration-100"
                            onLoadingComplete={(image) => {
                              image.classList.remove('opacity-0');
                              setIsImageLoading(false);
                            }}
                            loading="lazy"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          {fetchedData.data.attributes.accreditationInfo &&
            (() => {
              const paragraphs =
                fetchedData.data.attributes.accreditationInfo.split('\n\n'); // Split text into paragraphs
              const imageRegex = /!\[.*?\]\((.*?)\)/; // Regex to match markdown image syntax

              // Extract all images from paragraphs
              const images = paragraphs.filter((paragraph) =>
                imageRegex.test(paragraph),
              );

              return (
                <div>
                  <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 mt-4`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start pb-4">
                      <div>
                        {paragraphs.map(
                          (paragraph, index) =>
                            !imageRegex.test(paragraph) && (
                              <AdvancedRichText
                                content={{ advancedRichText: paragraph }}
                                key={index}
                              />
                            ),
                        )}
                      </div>
                      <div className="flex flex-col items-end justify-center">
                        {images.map((image, index) => (
                          <div key={index} className="mt-4">
                            {isImageLoading && (
                              <Skeleton
                                className="w-full h-full"
                                baseColor="#fff"
                                highlightColor="#ccc"
                              />
                            )}
                            <Image
                              width={500}
                              height={135}
                              src={image.match(imageRegex)?.[1] || ''}
                              alt={`Image ${index + 1}`}
                              className="transition-opacity opacity-0 duration-100"
                              onLoadingComplete={(image) => {
                                image.classList.remove('opacity-0');
                                setIsImageLoading(false);
                              }}
                              loading="lazy"
                            />
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}

          {/* {fetchedData?.data?.attributes?.accreditationInfo ? (
        <AdvancedRichText
          content={{
            advancedRichText: fetchedData.data.attributes.accreditationInfo,
          }}
        />
      ) : null} */}

          {fetchedData?.data?.attributes?.mediaLink ? (
            <div className="overflow-hidden  mb-8 flex justify-center h-80">
              <iframe
                loading="lazy"
                className="w-3/4 md:w-1/2"
                src={fetchedData?.data?.attributes?.mediaLink}
                title="YouTube video player"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              ></iframe>
            </div>
          ) : null}

          {fetchedData.data.attributes.PEOs &&
            (() => {
              const splitText = fetchedData.data.attributes.PEOs.split('\n');
              const textHeader: string = splitText[0];
              const remainingText: string = splitText.slice(1).join('\n');
              return (
                <div className="mt-8">
                  <ProgramAdvancedRichText
                    content={{
                      advancedRichText: { textHeader, remainingText },
                    }}
                  />
                </div>
              );
            })()}

          {fetchedData.data.attributes.SOs &&
            (() => {
              const splitText = fetchedData.data.attributes.SOs.split('\n');
              const textHeader: string = splitText[0];
              const remainingText: string = splitText.slice(1).join('\n');
              return (
                <ProgramAdvancedRichText
                  content={{
                    advancedRichText: { textHeader, remainingText },
                  }}
                />
              );
            })()}

          {/* {fetchedData.data.attributes.programCollapse &&
        (() => {
          const splitText =
            fetchedData.data.attributes.programCollapse.split('\n');
          const textHeader: string = splitText[0];
          const remainingText: string = splitText.slice(1).join('\n');
          return (
            <ProgramAdvancedRichText
              content={{
                advancedRichText: { textHeader, remainingText },
              }}
            />
          );
        })()} */}

          {fetchedData.data.attributes.numEnrolledGraduated &&
            (() => {
              const splitText =
                fetchedData.data.attributes.numEnrolledGraduated.split('\n');
              const textHeader: string = splitText[0];
              const remainingText: string = splitText.slice(1).join('\n');
              return (
                <ProgramAdvancedRichText
                  content={{
                    advancedRichText: { textHeader, remainingText },
                  }}
                />
              );
            })()}

          {fetchedData.data.attributes.graduationRequirements &&
            (() => {
              const splitText =
                fetchedData.data.attributes.graduationRequirements.split('\n');
              const textHeader: string = splitText[0];
              const remainingText: string = splitText.slice(1).join('\n');
              return (
                <ProgramAdvancedRichText
                  content={{
                    advancedRichText: { textHeader, remainingText },
                  }}
                />
              );
            })()}

          {fetchedData?.data?.attributes?.courseTree?.data &&
            (() => {
              return (
                <div className="sm:container mb-4 !ps-0">
                  <Accordion className="w-full" collapseAll>
                    <AccordionPanel>
                      <AccordionTitle className="py-1 text-black">
                        <ReactMarkdown
                          className="!h3 !text-inherit"
                          remarkPlugins={[remarkGfm]}
                          // eslint-disable-next-line @typescript-eslint/no-explicit-any
                          rehypePlugins={[rehypeRaw] as any}
                          components={{
                            h1: ({ children }) => (
                              <h1 className="h1 !text-inherit">{children}</h1>
                            ),
                            h2: ({ children }) => (
                              <h2 className="h2 !text-inherit">{children}</h2>
                            ),
                            h3: ({ children }) => (
                              <h3 className="h3 !text-inherit">{children}</h3>
                            ),
                            h4: ({ children }) => (
                              <h4 className="h4 !text-inherit">{children}</h4>
                            ),
                          }}
                        >
                          Course Tree
                        </ReactMarkdown>
                      </AccordionTitle>
                      <AccordionContent>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${fetchedData?.data?.attributes?.courseTree?.data?.attributes?.url}`}
                          alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${fetchedData?.data?.attributes?.courseTree?.data?.attributes?.alternativeText}`}
                          width="1040"
                          height="720"
                          className="object-cover  transition-opacity opacity-0 duration-100 w-full h-full"
                          onLoadingComplete={(image) => {
                            image.classList.remove('opacity-0');
                            setIsImageLoading(false);
                          }}
                          loading="lazy"
                        />
                      </AccordionContent>
                    </AccordionPanel>
                  </Accordion>
                </div>
              );
            })()}

          {fetchedData.data.attributes.sampleStudyPlan &&
            (() => {
              const splitText =
                fetchedData.data.attributes.sampleStudyPlan.split('\n');
              const textHeader: string = splitText[0];
              const remainingText: string = splitText.slice(1).join('\n');
              return (
                <ProgramAdvancedRichText
                  content={{
                    advancedRichText: { textHeader, remainingText },
                  }}
                />
              );
            })()}

          {fetchedData.data.attributes.research &&
            (() => {
              const splitText =
                fetchedData.data.attributes.research.split('\n');
              const textHeader: string = splitText[0];
              const remainingText: string = splitText.slice(1).join('\n');
              return (
                <ProgramAdvancedRichText
                  content={{
                    advancedRichText: { textHeader, remainingText },
                  }}
                />
              );
            })()}
          {fetchedData.data.attributes.otherResources &&
            (() => {
              const splitText =
                fetchedData.data.attributes.otherResources.split('\n');
              const textHeader: string = splitText[0];
              const remainingText: string = splitText.slice(1).join('\n');
              return (
                <ProgramAdvancedRichText
                  content={{
                    advancedRichText: { textHeader, remainingText },
                  }}
                />
              );
            })()}
        </>
      )}
    </div>
  );
}

export default SingleProgram;
