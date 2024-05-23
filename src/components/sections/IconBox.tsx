import { StrapiImage } from '@/types/StrapiImage';
import Title, { LineType } from '../shared/Title';
import Image from 'next/image';
import Link from 'next/link';
import { StrapiLinkV2 } from '@/types/StrapiData';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import { useState } from 'react';

/**
 * Interface representing a property object.
 * @interface IProp
 * @property {object} content - The content of the property.
 * @property {string} content.title - The title of the property.
 * @property {object[]} content.iconBox - An array of icon box objects.
 * @property {number} content.iconBox.id - The ID of the icon box.
 * @property {string} content.iconBox.title - The title of the icon box.
 * @property {StrapiImage} content.iconBox.icon - The icon of the icon box.
 * @property {StrapiLinkV2} content.iconBox.linkTo - The link associated with the icon box.
 */
interface IProp {
  content: {
    iconBoxes: {
      title: string;
      iconBox: {
        id: number;
        title: string;
        icon: StrapiImage;
        linkTo: StrapiLinkV2;
      }[];
    }[];
  };
  inSidebar:boolean;
}

/**
 * Renders a component that displays a grid of icon boxes with titles and links.
 * @param {IProp} content - The content object containing the data for the icon boxes.
 * @returns The rendered IconBox component.
 */
function IconBox({ content , inSidebar }: IProp) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <section className="sm:py-32 mb-10 events-clipt bg-softBeige">
      <div className=" py-10">
        <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
          {content.iconBoxes.map((mainBox, index) => (
            <div key={index} className="pt-10">
              <div className="m-auto text-center my-2">
                <Title
                  text={mainBox.title}
                  textColor={'text-primary'}
                  fontSize={''}
                  fontWeight={'font-bold'}
                  line={LineType.Center}
                  lineColor={'after:bg-gray-100'}
                  className="m-auto"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mt-20 gap-y-14  md:gap-y-28">
                {mainBox.iconBox.map((item, index) => (
                  <div
                    key={index}
                    className=" border-t-8 min-h-[100px] md:min-h-[150px] border-primary group hover:border-secondary relative bg-white transition duration-300 ease-in"
                  >
                    <Link href={item.linkTo?.data?.attributes.slug ?? ''}>
                      <div className=" w-24 h-24 md:w-32 lg:w-36 md:h-32 lg:h-36 overflow-hidden  absolute border-4  rounded-full -top-[30%] md:-top-[35%] lg:-top-[40%] start-[35%] sm:start-[38.5%]  md:start-[32%]  lg:start-[38.5%] border-primary group-hover:border-secondary bg-white">
                        {isImageLoading && (
                          <Skeleton
                            className="w-full h-full"
                            baseColor="#fff"
                            highlightColor="#ccc"
                          />
                        )}
                        {item?.icon.data?.attributes.url && (
                          <Image
                            className=" w-20 h-20 p-3 ease-linear transition-all opacity-0 duration-100"
                            onLoadingComplete={(image) => {
                              image.classList.remove('opacity-0');
                              setIsImageLoading(false);
                            }}
                            loading="lazy"
                            fill
                            alt={
                              item?.icon?.data?.attributes?.alternativeText ||
                              ''
                            }
                            src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item?.icon.data?.attributes.url}`}
                          />
                        )}
                      </div>
                      <div className="mt-16 md:mt-32 md:mb-10">
                        <Title
                          text={item.title}
                          textColor={'text-primary'}
                          fontSize={'text-md md:text-xl lg:text-2xl'}
                          fontWeight={''}
                          line={LineType.Under}
                          lineColor={'after:bg-primary'}
                          className="m-auto font-bold transition-all group-hover:after:bg-secondary group-hover:text-secondary duration-500 ease-linear"
                          lineWieght="5"
                        />
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default IconBox;
