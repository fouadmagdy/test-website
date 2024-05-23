import { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import type { ISingleMember, Program } from '@/types/single.member.types';
import AdvancedRichText from './AdvancedRichText';
import Title, { LineType } from '../shared/Title';
//import { useColor } from '@/context/color.context';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface SingleMemberTypes {
  content: {
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
function SingleMember({ content , inSidebar }: SingleMemberTypes) {
  const [fetchedData, setFetchedData] = useState<ISingleMember>();
  const pathname = usePathname();
  // const { color } = useColor();
  const memberId = pathname.split('/')[pathname.split('/').length - 1];
  const [isImageLoading, setIsImageLoading] = useState(true);
  const bioRef = useRef<HTMLParagraphElement | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      if (content.content.data.attributes.url) {
        try {
          let apiUrl = content.content.data.attributes.url;

          if (content.content.data.attributes.needToEdit) {
            apiUrl = apiUrl.replace('objId', memberId as unknown as string);
          }

          if (apiUrl) {
            const res = await axios.get<ISingleMember>(apiUrl);
            setFetchedData(res.data);
          }
        } catch (error) {}
      }
    };

    fetchData();
  }, [
    content.content.data.attributes.needToEdit,
    content.content.data.attributes.url,
    memberId,
  ]);

  useEffect(()=>{
    if(bioRef.current){
      console.log(bioRef.current.innerHTML);
      bioRef.current.innerHTML = bioRef.current.innerHTML.replace(/&nbsp;/g, ' ');
    }
  },[fetchedData])
  
  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <div className="col-span-2 sm:col-span-1 order-1 sm:order-2 hover:shadow-none overflow-hidden justify-self-center sm:justify-self-start mb-6 sm:mb-0">
          {isImageLoading && (
            <Skeleton
              className="w-full h-full"
              baseColor="#fff"
              highlightColor="#ccc"
            />
          )}
          {fetchedData?.data.attributes.image.data.attributes.url ? (
            <Image
              className="object-cover rounded-lg sm:rounded-tr-[120px] w-[400px] h-[400px] transition-opacity opacity-0 duration-100"
              onLoadingComplete={(image) => {
                image.classList.remove('opacity-0');
                setIsImageLoading(false);
              }}
              loading="lazy"
              width={400}
              height={400}
              draggable="false"
              alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${
                fetchedData?.data?.attributes?.image?.data?.attributes?.url ||
                ''
              }`}
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${
                fetchedData?.data?.attributes?.image?.data?.attributes?.url ||
                ''
              }`}
            />
          ) : null}
        </div>

        <div className="order-2 sm:order-1 mt-2">
          {fetchedData?.data.attributes.name ? (
            <div className="w-full">
              <Title
                text={fetchedData.data.attributes.name}
                textColor={'text-primary'}
                fontSize={''}
                fontWeight={'font-bold'}
                line={LineType.Before}
                lineColor={'before:bg-secondary'}
                id="section-title"
                aria-labelledby="section-title"
                className=" leading-tight "
              />
            </div>
          ) : null}

          {fetchedData?.data.attributes.administrativePositionsTitle ? (
            <p className="mb-4 px-2 font-light">
              {fetchedData.data.attributes.administrativePositionsTitle}
            </p>
          ) : null}

          {fetchedData?.data.attributes.rank ? (
            <div className="pl-2">
              <h6 className="mb-4 inline mt-12">Rank:</h6>
              <span className="mb-4 pl-2 font-light">
                {fetchedData.data.attributes.rank}
              </span>
            </div>
          ) : null}

          {fetchedData?.data.attributes.email ? (
            <div className="pl-2">
              <h6 className="mb-4 inline mt-12">Email:</h6>
              <span className="mb-4 pl-2 font-light">
                {fetchedData.data.attributes.email}
              </span>
            </div>
          ) : null}

          {fetchedData?.data.attributes.officeLocation ? (
            <div className="pl-2">
             <h6 className="mb-4 inline">
                Office Location / Building:
              </h6>
              <span className="mb-4 pl-2 font-light">
                {fetchedData.data.attributes.officeLocation}
              </span>
            </div>
          ) : null}

          {fetchedData?.data.attributes.roomNumber ? (
            <div className="pl-2">
              <h6 className="mb-4 inline">Office Room Number:</h6>
              <span className="mb-4 pl-2 font-light">
                {fetchedData.data.attributes.roomNumber}
              </span>
            </div>
          ) : null}

          <ul className="mt-4 ml-2 list-inside list-disc">
            {fetchedData?.data.attributes.programs?.data &&
            fetchedData?.data.attributes.programs?.data.length > 0 ? (
              <li>
                <h6 className="mb-4 inline">Programs:</h6>
                <span className="mb-4 pl-2 font-light">
                  {fetchedData?.data.attributes.programs?.data.map(
                    (program: Program) => {
                      return program.attributes.title;
                    },
                  )}
                </span>
              </li>
            ) : null}
            {fetchedData?.data.attributes.researchCenters ? (
              <li>
                <p className="mb-4 pl-2 font-bold inline">Research Centers:</p>
                <span className="mb-4 pl-2 font-light">
                  {fetchedData?.data.attributes.researchCenters}
                </span>
              </li>
            ) : null}
            {fetchedData?.data.attributes.researchInterests ? (
              <li>
                <p className="mb-4 pl-2 font-bold inline">
                  Research Interests:
                </p>
                <span className="mb-4 pl-2 font-light">
                  {fetchedData?.data.attributes.researchInterests}
                </span>
              </li>
            ) : null}
          </ul>
        </div>
        <div className="order-3 col-span-2 w-10/12">
          {fetchedData?.data.attributes.biography ? (
            <div>
              <p className="text-2xl biography my-6 pl-2 font-bold">Biography</p>
              <p className="mb-4 pl-2 font-light text-wrap w-full" ref={bioRef}>
                <AdvancedRichText
                  content={{
                    advancedRichText: fetchedData.data.attributes.biography,
                  }}
                />
                {/* {fetchedData.data.attributes.biography} */}
              </p>
            </div>
          ) : null}

          {fetchedData?.data.attributes.publications ? (
            <div>
              <p className="mt-6 pl-2 font-bold">Publications</p>
              <p className="mb-4 pl-2 font-light text-wrap">
                {fetchedData?.data.attributes.publications}
              </p>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default SingleMember;
