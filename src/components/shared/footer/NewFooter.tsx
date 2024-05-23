'use client';
// import React, { useEffect, useState } from 'react';
import { FooterData } from '@/types/Footer';
// import { StrapiData } from '@/types/StrapiData';

import Image from 'next/image';
import FooterLink from './FooterLink';
import SocialLinks from './SocialLinks';
// import logo from '../../../../public/Images/ZC-logo.png';
import { useAppSelector } from '@/store/types';
// import Loading from '@/app/loading';

interface Props {
  footerData: { [key: string]: FooterData | undefined };
  localeFromServer: string;
}
const NewFooter = ({ footerData }: Props) => {
  const locale = useAppSelector((state) => state.lang.locale);

  return (
    <div
      dir={locale == 'ar' ? 'rtl' : 'ltr'}
      className={`md:container md:mx-auto py-10`}
    >
      <div className="grid lg:grid-cols-4 md:grid-cols-2 p-t-20 lg:gap-8 gap-y-8">
        <div className="firstSection flex justify-center lg:flex-start px-20 lg:px-0">
          <div className="logoContainer lg:text-left text-center mx-auto">
            <div className="w-[150px] h-[120px]">
              <Image
                width={921}
                height={729}
                priority
                // loading="lazy"
                className="mx-auto lg:mx-0 mb-2 transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) => image.classList.remove('opacity-0')}
                src={`${process.env.NEXT_PUBLIC_STRAPI_URL}${footerData[locale]?.data?.attributes.logo.data.attributes.url}`}
                alt="zewailcityLogo"
              />
            </div>
            <p className="text-white text-sm lg:text-base">
              {footerData[locale]?.data.attributes.address}
            </p>
            <div className="socialMediaContainer mx-auto py-5 flex justify-center lg:justify-start lg:px-0">
              <SocialLinks />
            </div>
          </div>
        </div>

        {footerData[locale]?.data?.attributes?.footerItems.map(
          (item, index) => (
            <div className="secondSection py-2" key={index}>
              <div className="px-20 lg:px-12">
                <h3 className=" py-2 lg:border-b border-white text-center font-bold  lg:px-10   text-lg ">
                  {item.title}
                </h3>
                <ul className="py-2 border-t lg:border-0 border-white">
                  {item.buttons.map(({ link }, idx: number) => {
                    return (
                      <FooterLink
                        text={link?.label}
                        link={link?.target?.data?.attributes?.slug}
                        locale={locale}
                        key={idx}
                      />
                    );
                  })}
                </ul>
              </div>
            </div>
          ),
        )}
      </div>
    </div>

    //   <div className={`container mx-auto  `}>
    //     <div
    //       className={`flex flex-col ${
    //         locale === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'
    //       } justify-center items-center py-2 md:px-12 `}
    //     >
    //       <div
    //         className={`firstSection ${
    //           locale === 'ar' ? 'md:items-end' : 'md:items-start'
    //         } flex flex-col justify-center items-center gap-y-8 md:w-1/2`}
    //       >
    //         <p>
    //           {
    //             footerData[locale]?.data.attributes.links[0].footerMain
    //               .title
    //           }
    //         </p>
    //         <div className="logoContainer max-h-48 max-w-48  ">
    //           <Image
    //             width={150}
    //             loading="lazy"
    //             src={logo}
    //             alt="Footer Logo"
    //           />
    //         </div>
    //       </div>
    //       <div className="secondSection w-full min-[500px]:w-1/2 flex justify-between ">
    //         {footerData[locale]?.data.attributes.links[0].footerItems.map(
    //           (item, index) => (
    //             <ul
    //               key={index}
    //               className={`footerLinks flex flex-col ${
    //                 locale === 'ar' ? 'flex-wrap-reverse' : 'flex-wrap'
    //               } gap-x-8 xl:gap-x-20 max-h-96 lg:py-24 px-4 md:px-0 py-8`}
    //             >
    //               <p>{item.title}</p>
    //               {item.button.map((link, idx: number) => {
    //                 return (
    //                   <FooterLink
    //                     text={link.buttonText}
    //                     link={link.buttonLink.data.attributes.PageName}
    //                     locale={locale}
    //                     key={idx}
    //                   />
    //                 );
    //               })}
    //             </ul>
    //           ),
    //         )}
    //       </div>
    //     </div>

    //     <div className="flex justify-between items-center pb-8 md:px-12">
    //       <p className="text-white font-mediumbold pb-2 text-xl w-72 border-b-2 border-white">
    //         Contact Us
    //       </p>
    //       <SocialLinks />
    //     </div>
    //   </div>
  );
};

export default NewFooter;
