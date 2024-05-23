import { IButton } from '@/types/button.types';
import { ImageProp } from '@/types/image.types';
import React from 'react';
import Image from 'next/image';
import { useColor } from '@/context/color.context';
import Link from 'next/link';
// import { MdKeyboardDoubleArrowRight,MdKeyboardDoubleArrowLeft } from 'react-icons/md';
import AdvancedRichText from './sections/AdvancedRichText';
import { useAppSelector } from '@/store/types';
import Title, { LineType } from './shared/Title';
import Button from './shared/Button';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
/**
 * Represents the properties of a catalog component.
 * @interface CatalogProps
 * @property {object} content - The content of the catalog.
 * @property {string} content.title - The title of the catalog.
 * @property {'image-right' | 'image-left'} content.imageOrder - The order of the image in the catalog.
 * @property {string} content.description - The description of the catalog.
 * @property {ImageProp} content.image - The image of the catalog.
 * @property {IButton[]} content.button - The buttons in the catalog.
 */
interface CatalogProps {
  content: {
    title: string;
    imageOrder: 'image-right' | 'image-left';
    description: string;
    image: ImageProp;
    button: IButton[];
  };
  inSidebar:boolean;
}

/**
 * Renders a catalog component with the given content.
 * @param {CatalogProps} content - The content object for the catalog.
 * @returns The rendered catalog component.
 */
function Catalog({ content,inSidebar }: CatalogProps) {
  const locale = useAppSelector((state) => state.lang.locale);
  const { color } = useColor(); // Consume the color from the context
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  // console.log(content.title === 'EXPERIENCE CAMPUS');
  return (
    <div
      className={`${content.title === 'EXPERIENCE CAMPUS' ? ' bg-gray-50 bg-opacity-90' : ''}`}
      style={
        content.title === 'EXPERIENCE CAMPUS'
          ? {
              backgroundImage: `url('Images/layer.jpg')`,

              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }
          : {}
      }
    >
      <div
        className={
          content.title === 'EXPERIENCE CAMPUS'
            ? ' bg-gray-50 bg-opacity-90'
            : ''
        }
        // check if the content is an experience campus to add background image
      >
        <div
          className={`${inSidebar?'':'sm:container'} px-1 sm:p-0`}
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div
              className={`flex items-start w-full h-full overflow-hidden ${
                content?.imageOrder === 'image-right' ? 'order-2' : 'order-1'
              }`}
            >
              {isImageLoading && (
                <Skeleton
                  className="w-full h-full"
                  baseColor="#fff"
                  highlightColor="#ccc"
                />
              )}
              {content?.image.data?.attributes.url ? (
                <Image
                  className={`max-w-full transition-opacity opacity-0 duration-100 ${
                    content?.imageOrder === 'image-right'
                      ? locale === 'en'
                        ? 'rounded-tr-[120px]'
                        : 'rounded-tl-[120px]'
                      : locale === 'en'
                        ? 'rounded-tl-[120px]'
                        : 'rounded-tr-[120px]'
                  }`}
                  onLoadingComplete={(image) => {
                    image.classList.remove('opacity-0');
                    setIsImageLoading(false);
                  }}
                  loading="lazy"
                  width={600}
                  height={800}
                  alt={content?.image?.data?.attributes?.alternativeText || ''}
                  src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${content?.image.data?.attributes.url}`}
                />
              ) : null}
            </div>

            <div
              className={`flex flex-col items-start justify-center gap-3 ${
                content?.imageOrder === 'image-right' ? 'order-1' : 'order-2'
              }`}
            >
              {content?.title && (
                <Title
                  text={content?.title}
                  textColor="text-primary"
                  fontSize=""
                  fontWeight="font-bold"
                  line={LineType.Before}
                  lineColor="md:before:bg-primary"
                />
              )}
              {content.description ? (
                <AdvancedRichText
                  content={{
                    advancedRichText: content.description,
                  }}
                />
              ) : null}
              {content.button && content.button.length > 0
                ? content.button.map((button, index) => (
                    <Link
                    // className='inline'
                      style={{
                        backgroundColor: color ? color : '',
                      }}
                      key={index}
                      href={button?.link?.target?.data?.attributes?.slug || ''}
                    >
                      <Button
                        text={button?.link.label}
                        backgroundColor="bg-primary"
                      />
                      {/* {`${button?.link.label}`}
                  {locale==='en'?
                  <MdKeyboardDoubleArrowRight
                    className="transition-transform transform group-hover:translate-x-1 duration-500 ease-linear"
                    size={26}
                  />
                  :<MdKeyboardDoubleArrowLeft
                    className="transition-transform transform group-hover:translate-x-1 duration-500 ease-linear"
                    size={26}
                  />
                  } */}
                    </Link>
                  ))
                : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Catalog;
