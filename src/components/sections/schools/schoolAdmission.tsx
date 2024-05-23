import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Title, { LineType } from '@/components/shared/Title';
import { useColor } from '@/context/color.context';
import { SchoolAdmissionTypes } from '@/types/school.admission.types';
import Collapse from '../collapse';
import AdvancedRichText from '../AdvancedRichText';
interface SchoolAdmissionProps {
  content: {
    id: number;
    __component: string;
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
function SchoolAdmission({ content , inSidebar }: SchoolAdmissionProps) {
  const [fetchedData, setFetchedData] = useState<SchoolAdmissionTypes>();
  const pathname = usePathname();
  const schoolId = pathname.split('/')[pathname.split('/').length - 1];
  const { color, setColor } = useColor();
  useEffect(() => {
    const fetchData = async () => {
      if (content.content.data.attributes.url) {
        try {
          let apiUrl = content.content.data.attributes.url;

          if (content.content.data.attributes.needToEdit) {
            apiUrl = apiUrl.replace('objId', schoolId as unknown as string);
          }

          if (apiUrl) {
            const res = await axios.get<SchoolAdmissionTypes>(apiUrl);
            setFetchedData(res.data);
          }
        } catch (error) {}
      }
    };

    fetchData();
  }, [
    content.content.data.attributes.url,
    content.content.data.attributes.needToEdit,
    schoolId,
  ]);

  useEffect(() => {
    if (fetchedData) {
      setColor(fetchedData.data.attributes.color);
    }
  }, [fetchedData, setColor]);
  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <div className=" p-5 grid grid-cols-1 col-span-5 gap-8 lg:gap-8">
        <div className="">
          <div className="max-w-lg mx-auto lg:max-w-none">
            <div className="prose text-gray-900 ">
              {fetchedData ? (
                <div style={{ color: color }}>
                  <Title
                    text={`${fetchedData.data.attributes.title}`}
                    textColor={`inherit`}
                    fontSize={''}
                    fontWeight={'font-bold'}
                    line={LineType.Before}
                    lineColor={'before:bg-secondary'}
                    id="section-title"
                    aria-labelledby="section-title"
                    className="w-1/2"
                  />
                </div>
              ) : null}
              <p className="pt-5  leading-loose">
                {fetchedData?.data.attributes.description}
              </p>
            </div>
          </div>
        </div>
      </div>
      {fetchedData?.data.attributes.richDescription ? (
        <AdvancedRichText
          content={{
            advancedRichText: fetchedData.data.attributes.richDescription,
          }}
        />
      ) : null}
      {fetchedData?.data.attributes.admissionCollapse && (
        <section className="my-10">
          {fetchedData?.data.attributes.admissionCollapse.map((collapse) => (
            <Collapse inSidebar={inSidebar} key={collapse.id} content={collapse} />
          ))}
        </section>
      )}
    </div>
  );
}

export default SchoolAdmission;
