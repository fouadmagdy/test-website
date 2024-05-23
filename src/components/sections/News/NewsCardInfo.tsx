import Image from 'next/image';
import Title, { LineType } from '@/components/shared/Title';
import Link from 'next/link';
import { format, getMonth } from 'date-fns';
import { ImageProp } from '@/types/image.types';
import { usePathname } from 'next/navigation';
import { useAppSelector } from '@/store/types';
import { MdOutlineKeyboardDoubleArrowRight,MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';

/**
 * Interface representing the props for an app.
 * @interface IAppProps
 * @property {object} content - The content object.
 * @property {number} content.id - The ID of the content.
 * @property {object} content.attributes - The attributes of the content.
 * @property {string} content.attributes.title - The title of the content.
 * @property {string} content.attributes.date - The date of the content.
 * @property {string} content.attributes.body - The body of the content.
 * @property {string} content.attributes.createdAt - The creation date of the content.
 * @property {object} content.attributes.image - The image object.
 * @property {object} content.attributes.image.data - The
 */
interface IAppProps {
  targetPage?: string;
  content: {
    id: number;
    attributes: {
      title: string;
      date: string;
      body: string;
      createdAt: string;
      slug: string;
      image: ImageProp;
    };
  };
  collection_url: string;
}
/**
 * A functional component that renders a news card with information.
 * @param {IAppProps} props - The component props.
 * @param {Content} props.content - The content object containing the news information.
 * @returns JSX element representing the news card.
 */
const NewsCardInfo: React.FunctionComponent<IAppProps> = ({
  content,
  targetPage,
}) => {
  const pathName = usePathname();
  const locale = useAppSelector((state) => state.lang.locale);
  return (
    <div className="h-[500px] md:h-[480px]">
      <div className="overflow-hidden h-[250px] relative">
        {content.attributes.image ? (
          <Image
            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content?.attributes?.image?.data?.attributes?.url}`}
            alt={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content?.attributes?.image?.data?.attributes?.alternativeText}`}
            width={500}
            height={500}
            className="h-full object-cover transition duration-300 ease-in-out group-hover:scale-110 blur-lg"
            onLoadingComplete={(image) => image.classList.remove('blur-lg')}
          />
        ) : (
          <></>
        )}
        <div className="absolute bottom-0  left-0 bg-secondary h-16 w-16 text-white ">
          <div className="grid grid-cols-1  items-center justify-items-center  ">
            <span className="font-bold text-2xl ">
              {format(new Date(content.attributes.date), 'dd')}
            </span>
            <span className="text-base">
              {' '}
              {format(
                new Date(0, getMonth(new Date(content.attributes.date))),
                'MMM',
              )}
            </span>
          </div>
        </div>
      </div>
      <div className=" py-5 px-3 flex flex-col ">
        <Title
          text={content.attributes.title}
          textColor="text-lightBlack"
          fontSize="text-xs"
          fontWeight="font-bold leading-5"
          line={LineType.Under}
          lineColor={'after:bg-secondary'}
        />

        <p className="text-xs my-5 leading-5 tracking-wide line-clamp-3">
          {content.attributes.body}
        </p>
        <div
          className={`text-white bg-primary text-sm rounded-full text-center flex gap-5 items-center max-w-fit px-4 py-1  hover:bg-secondary duration-500 ease-linear transition-transform transform hover:translate-x-1`}
        >
          <Link
            href={
              targetPage !== undefined
                ? pathName === '/'
                  ? `/${targetPage}/${content?.id}`
                  : `${pathName}/${targetPage}/${content?.id}`
                : ''
            }
            className="flex items-center"
          >
            <span className={`tracking-wide   `}>{locale==='en'?'Read More':'اقرأ المزيد'}</span>
            {locale==='en'?<MdOutlineKeyboardDoubleArrowRight size={20} />:<MdOutlineKeyboardDoubleArrowLeft size={20} />}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewsCardInfo;
