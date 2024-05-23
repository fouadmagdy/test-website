import * as React from 'react';
import Image from 'next/image';
import {
  MdOutlineKeyboardDoubleArrowRight,
  MdOutlineKeyboardDoubleArrowLeft,
} from 'react-icons/md';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { useAppSelector } from '@/store/types';
import Title, { LineType } from '../shared/Title';
import { boardMembersData } from '@/types/ContentData';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import axios from 'axios';
import Loading from '@/app/loading';
/**
 * Represents the properties for the Board of Trustees component.
 * @interface IBoardoftrusteesProps
 * @property {object} content - The content object for the component.
 * @property {number} content.id - The ID of the content.
 * @property {string} content.title - The title of the content.
 * @property {string} content.__component - The component type.
 * @property {members.data[]} data?.data - An array of board members.
 */
interface IBoardoftrusteesProps {
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
    targetPage: {
      data: {
        attributes: {
          title: string;
          slug: string;
        };
      };
    };
  };
}

/**
 * A functional component that renders a board of trustees section.
 * @component
 * @param {IBoardoftrusteesProps} props - The component props.
 * @param {string} props.content - The content of the board of trustees section.
 * @returns {JSX.Element} - The rendered board of trustees section.
 */
const BoardOfTrustees: React.FunctionComponent<IBoardoftrusteesProps> = ({
  content,
}) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const [data, setData] = React.useState<boardMembersData>();
  const [isLoading, setIsLoading] = React.useState(true);
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  const pathName = usePathname();
  React.useEffect(() => {
    const fetchData = async () => {
      if (content.content.data.attributes.url) {
        try {
          setIsLoading(true);
          const res = await axios.get<boardMembersData>(content.content.data.attributes.url);
          setData(res.data);
          setIsLoading(false);
        } catch (error) {
          // console.error('Error fetching data:', error);
        }
      }
    };

    fetchData();
  }, [
    content.content.data.attributes.needToEdit,
    content.content.data.attributes.url,
  ]);

  return (
    <div className="sm:container mx-auto px-1 sm:px-12">
      <Title
        text={content.title}
        textColor={'text-primary'}
        fontSize={''}
        fontWeight={''}
        line={LineType.Before}
        lineColor={'border-black'}
        className="font-bold"
      />
      {isLoading ? (
          <Loading />
        ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {data && data?.data.length ? (
          <>
            <div className="hidden lg:block"></div>
            <div className="group transition ease-linear duration-500 overflow-hidden shadow-xl">
              <div
                className={`relative bg-black overflow-hidden bg-cover bg-no-repeat`}
                data-te-ripple-init
                data-te-ripple-color="light"
              >
                <div className=" overflow-hidden h-[300px]">
                  {isImageLoading && (
                    <Skeleton
                      className="w-full h-full"
                      baseColor="#fff"
                      highlightColor="#ccc"
                    />
                  )}
                  <Image
                    src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data?.data[0]?.attributes?.image?.data?.attributes?.url}`}
                    alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${data?.data[0]?.attributes?.image?.data?.attributes?.alternativeText}`}
                    fill={true}
                    className="w-full max-w-full object-cover ease-in-out hover:scale-110 transition-opacity opacity-0 duration-100"
                    onLoadingComplete={(image) => {
                      image.classList.remove('opacity-0');
                      setIsImageLoading(false);
                    }}
                    loading="lazy"
                  />
                </div>
              </div>

              <div className="px-5 pt-5 bg-[#F9F9F9]">
                <div className="border-b-2 pb-2 flex justify-between">
                  <Link
                    className="font-bold text-lg  group-hover:underline transition ease-linear duration-500 cursor-pointer border-s-[3px] pt-1 border-s-secondary justify-center ps-1"
                    href={
                      content.targetPage.data.attributes.slug !== undefined
                        ? pathName === '/'
                          ? `/${content.targetPage.data.attributes.slug}/${data?.data[0]?.id}`
                          : `${pathName}/${content.targetPage.data.attributes.slug}/${data?.data[0]?.id}`
                        : ''
                    }
                  >
                    {data?.data[0]?.attributes.name}
                  </Link>
                  {locale == 'en' ? (
                    <MdOutlineKeyboardDoubleArrowRight className=" text-secondary group-hover:translate-x-3 transition ease-linear duration-500 text-3xl" />
                  ) : (
                    <MdOutlineKeyboardDoubleArrowLeft className=" text-secondary group-hover:translate-x-3 transition ease-linear duration-500 text-3xl" />
                  )}
                </div>
                <div className="pt-4 pb-4">
                <div className="h-auto">
                    <p className="!leading-5 small-p line-clamp-3">
                    {data?.data[0].attributes.administrativePositionsTitle || 'Dean of Academic Affairs, Director of Physics of Universe Program, English Program and Humanities Program'}
                    </p>
                </div>
                <div className="h-auto">
                    <p className="!leading-5 small-p line-clamp-3">
                    {data?.data[0].attributes.rank || 'Professor, Physics of Universe Program'}
                    </p>
                </div>
                  <a
                    href={`mailto:${data?.data[0].attributes.email}`}
                    className="text-primary text-sm"
                  >
                    {data?.data[0].attributes.email}
                  </a>
                </div>
              </div>
            </div>
            <div className=" hidden lg:block"></div>
          </>
        ) : (
          ''
        )}
        {data && data?.data?.length >= 2 &&
          data?.data.slice(1).map((member, index) => {
            return (
              <div
                key={index}
                className="group transition ease-linear duration-500 overflow-hidden shadow-xl"
              >
                <div
                  key={index}
                  className={`relative bg-black overflow-hidden bg-cover bg-no-repeat`}
                  data-te-ripple-init
                  data-te-ripple-color="light"
                >
                  <div className=" overflow-hidden h-[300px]">
                    {isImageLoading && (
                      <Skeleton
                        className="w-full h-full"
                        baseColor="#fff"
                        highlightColor="#ccc"
                      />
                    )}
                    <Image
                      src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member?.attributes?.image?.data?.attributes?.url}`}
                      alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${member?.attributes?.image?.data?.attributes?.alternativeText}`}
                      fill={true}
                      className="w-full max-w-full object-cover ease-in-out hover:scale-110 transition-opacity opacity-0 duration-100"
                      onLoadingComplete={(image) => {
                        image.classList.remove('opacity-0');
                        setIsImageLoading(false);
                      }}
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="px-5 pt-5 bg-[#F9F9F9]">
                  <div className="border-b-2 pb-2 flex justify-between">
                  <Link
                    className="font-bold text-lg  group-hover:underline transition ease-linear duration-500 cursor-pointer border-s-[3px] pt-1 border-s-secondary justify-center ps-1"
                    href={
                      content.targetPage.data.attributes.slug !== undefined
                        ? pathName === '/'
                          ? `/${content.targetPage.data.attributes.slug}/${member.id}`
                          : `${pathName}/${content.targetPage.data.attributes.slug}/${member.id}`
                        : ''
                    }
                  >
                    {member.attributes.name}
                  </Link>
                    {locale == 'en' ? (
                      <MdOutlineKeyboardDoubleArrowRight className=" text-secondary group-hover:translate-x-3 transition ease-linear duration-500 text-3xl" />
                    ) : (
                      <MdOutlineKeyboardDoubleArrowLeft className=" text-secondary group-hover:translate-x-3 transition ease-linear duration-500 text-3xl" />
                    )}
                  </div>
                  <div className="pt-4 pb-4">
                  <div className="h-auto">
                      <p className="!leading-5 small-p line-clamp-3">
                      {member.attributes.administrativePositionsTitle || 'Dean of Academic Affairs, Director of Physics of Universe Program, English Program and Humanities Program'}
                      </p>
                  </div>
                  <div className="h-auto">
                      <p className="!leading-5 small-p line-clamp-3">
                      {member.attributes.rank || 'Professor, Physics of Universe Program'}
                      </p>
                  </div>
                    <a
                      href={`mailto:${member.attributes.email}`}
                      className="text-primary text-sm"
                    >
                      {member.attributes.email}
                    </a>
                  </div>
                </div>
              </div>
            );
          })}
      </div>
      )
      }
    </div>
  );
};

export default BoardOfTrustees;
