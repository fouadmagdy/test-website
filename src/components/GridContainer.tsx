import { useEffect, useState } from 'react';
import { ImageProp } from '@/types/image.types';
import React from 'react';
import Image from 'next/image';
import axios from 'axios';
import { useAppSelector } from '@/store/types';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
/**
 * Represents the props for a grid container component.
 * @interface GridContainerProps
 * @property {object} content - The content of the grid container.
 * @property {object} content.collection_url - The collection URL data.
 * @property {object} content.collection_url.data - The data of the collection URL.
 * @property {object} content.collection_url.data.attributes - The attributes of the collection URL data.
 * @property {string} content.collection_url.data.attributes.name - The name of the collection URL.
 * @property {string} content.collection_url.data.attributes.url - The URL of the collection.
 */
interface GridContainerProps {
  content: {
    collection_url: {
      data: {
        attributes: {
          name: string;
          url: string;
        };
      };
    };
  };
  inSidebar:boolean;
}
/**
 * Interface representing the achievement data.
 * @interface achievementData
 * @property {Data[]} data - An array of Data objects.
 */
interface achievementData {
  data: Data[];
}

/**
 * Represents a data object with attributes.
 * @interface Data
 * @property {DatumAttributes} attributes - The attributes of the data object.
 */
interface Data {
  attributes: DatumAttributes;
}

/**
 * Represents the attributes of a Datum object.
 * @interface DatumAttributes
 * @property {string} title - The title of the Datum.
 * @property {null} description - The description of the Datum (currently set to null).
 * @property {Date} date - The date of the Datum.
 * @property {ImageProp} image - The image associated with the Datum.
 */
interface DatumAttributes {
  title: string;
  description: null;
  date: Date;
  image: ImageProp;
}
/**
 * Fetches data from a dynamic URL with the specified locale.
 * @param {string} locale - The locale to use for the request.
 * @param {string} dynamicUrl - The dynamic URL to fetch data from.
 * @returns {Promise<any>} - A promise that resolves to the fetched data.
 */
const fetcher = async (locale: string, dynamicUrl: string) => {
  const res = await axios.get(dynamicUrl + '&locale=' + locale);
  return res.data;
};

/**
 * A functional component that renders a grid container with dynamically fetched data.
 * @param {GridContainerProps} content - The props object containing the content for the grid container.
 * @returns The rendered grid container component.
 */
function GridContainer({ content , inSidebar }: GridContainerProps) {
  const locale = useAppSelector((state) => state.lang.locale);
  const [data, setData] = useState<achievementData>();
  const [, setIsLoading] = useState<boolean>(true);
  const [isImageLoading, setIsImageLoading] = React.useState(true);

  /**
   * useEffect hook that fetches data from a specified URL and updates the state variables
   * isLoading and data accordingly.
   * @param {string} locale - The locale to use for the fetch request.
   * @param {string} content - The content object containing the collection URL.
   * @returns None
   */
  useEffect(() => {
    (async () => {
      const res = await fetcher(
        locale,
        content.collection_url.data.attributes.url,
      );
      setIsLoading(true);
      setData(res);
      setIsLoading(false);
    })();
  }, [locale, content]);
  return (
    <div className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0`}>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {data?.data.map((item, index) => (
          <div
            key={index}
            className="relative  h-72 group rounded-lg overflow-hidden"
          >
            {isImageLoading && (
              <Skeleton
                className="w-full h-full"
                baseColor="#fff"
                highlightColor="#ccc"
              />
            )}
            <Image
              fill
              alt={item.attributes.image.data.attributes.alternativeText || ''}
              src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${item.attributes.image.data.attributes.url}`}
              className="w-full h-full transition-opacity opacity-0 duration-100"
              onLoadingComplete={(image) => {
                image.classList.remove('opacity-0');
                setIsImageLoading(false);
              }}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent">
              {item.attributes.title && (
                <h3 className="absolute inset-x-0 bottom-0 text-center text-white p-8   text-lg opacity-0 group-hover:opacity-100 transition-opacity duration-1000 ease-in-out">
                  <span>{item.attributes.title}</span>
                </h3>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default GridContainer;
