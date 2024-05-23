import * as React from 'react';
import Title, { LineType } from '../shared/Title';
import Image from 'next/image';

/**
 * Represents the props for a one-column description component.
 * @interface oneColumnDescriptionProps
 * @property {object} [content] - The content of the component.
 * @property {string} [content.__component] - The component type.
 * @property {string} [content.title] - The title of the component.
 * @property {string} [content.description] - The description of the component.
 */
export interface oneColumnDescriptionProps {
  content?: {
    __component: string;
    title: string;
    description: string;
  };
}

/**
 * Renders a one-column description component with images.
 * @param {oneColumnDescriptionProps} props - The props for the component.
 * @returns The rendered component.
 */
export function OneColumnDesciptionwithImages({}: oneColumnDescriptionProps) {
  return (
    <div className="sm:container mx-auto px-10 lg:px-20">
      <div className="max-w-[10px] mb-10">
        <Title
          text={'Awards & Achievements'}
          textColor="text-primary"
          fontSize=" md:leading-[3rem]"
          fontWeight="font-extrabold"
          line={LineType.Before}
          lineColor="md:before:bg-primary"
        />
      </div>

      <div className="description">
        <p className="text-sm text-gray-800 tracking-tight leading-7">
          Zewail City Of Science , Technology And Innovation Is A Nonprofit,
          Independent Institution Of Learning, Research And Innovation. The
          Cornerstone Of Zewail City Of Science And Technology Was Laid On
          January 1, 2000. After Many Delays In The City’s Establishment, The
          January 25 Revolution In 2011 Led To The Revival Of The Initiative,
          Late Dr. Zewail Was Asked By The Egyptian Government To Form The
          Supreme Advisory Board And Re-Launch The Initiative On Its Original
          Site. On May 11, 2011 The Cabinet Of Ministers Issued A Decree To
          Establish The National Project For Scientific Renaissance, And Named
          It Zewail City Of Science And Technology. The City Was Officially
          Inaugurated On November 1, 2011. The Final Legal Status Was
          Established When The City Was Granted Law 161, Issued On December 20,
          2012. This Law Outlines The City’s Aims And Constituents, As Well As
          Its Financial And Administrative Structures.
        </p>
      </div>

      <div className="images grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4 gap-y-4 py-4">
        <div className="w-full h-36">
          {' '}
          <Image
            className="max-w-full max-h-full object-cover transition-opacity opacity-0 duration-100"
            onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            src={'/Images/image1 (1).JPG'}
            alt="campus Life"
            width={700}
            height={300}
          />
        </div>
        <div className="w-full h-36">
          <Image
            className="max-w-full max-h-full object-cover transition-opacity opacity-0 duration-100"
            onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            src={'/Images/image1 (2).jpg'}
            alt="campus Life"
            width={700}
            height={300}
          />
        </div>
        <div className="w-full h-36">
          <Image
            className="max-w-full max-h-full object-cover transition-opacity opacity-0 duration-100"
            onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            src={'/Images/image1 (2).jpg'}
            alt="campus Life"
            width={700}
            height={300}
          />
        </div>
        <div className="w-full h-36">
          <Image
            className="max-w-full max-h-full object-cover transition-opacity opacity-0 duration-100"
            onLoadingComplete={(image) => image.classList.remove('opacity-0')}
            src={'/Images/image1 (4).JPG'}
            alt="campus Life"
            width={700}
            height={500}
          />
        </div>
      </div>
    </div>
  );
}
