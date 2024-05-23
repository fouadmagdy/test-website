// 'use client';
// import React, { useEffect, useState } from 'react';
// import { FooterData } from '@/types/Footer';
// import { StrapiData } from '@/types/StrapiData';

// import Image from 'next/image';
// import FooterLink from './FooterLink';
// import SocialLinks from './SocialLinks';
// import logo from '../../../../public/Images/ZC-logo.png';
// import { useAppSelector } from '@/store/types';
// import Loading from '@/app/loading';

// interface Props {
//   footerData: { [key: string]: StrapiData<FooterData> | undefined };
// }
// const Footer = ({ footerData }: Props) => {
//   const locale = useAppSelector((state) => state.lang.locale);
//   //
//   const [isClient, setIsClient] = useState(false);

//   useEffect(() => {
//     setIsClient(true);
//   }, []);
//   return (
//     <>
//       {' '}
//       {isClient ? (
//         <footer className={` bg-primary text-white md:min-h-96 `}>
//           <div className={`container mx-auto  `}>
//             <div
//               className={`flex flex-col ${
//                 locale === 'ar' ? 'md:flex-row-reverse' : 'md:flex-row'
//               } justify-center items-center py-2 md:px-12 `}
//             >
//               <div
//                 className={`firstSection ${
//                   locale === 'ar' ? 'md:items-end' : 'md:items-start'
//                 } flex flex-col justify-center items-center gap-y-8 md:w-1/2`}
//               >
//                 <p>
//                   {
//                     footerData[locale]?.data?.attributes?.links[0].footerMain
//                       .title
//                   }
//                 </p>
//                 <div className="logoContainer max-h-48 max-w-48  ">
//                   <Image
//                     width={150}
//                     loading="lazy"
//                     src={logo}
//                     alt="Footer Logo"
//                   />
//                 </div>
//               </div>
//               <div className="secondSection w-full min-[500px]:w-1/2 flex justify-between ">
//                 {footerData[locale]?.data.attributes.links[0].footerItems.map(
//                   (item, index) => (
//                     <ul
//                       key={index}
//                       className={`footerLinks flex flex-col ${
//                         locale === 'ar' ? 'flex-wrap-reverse' : 'flex-wrap'
//                       } gap-x-8 xl:gap-x-20 max-h-96 lg:py-24 px-4 md:px-0 py-8`}
//                     >
//                       <p>{item.title}</p>
//                       {item.button.map((link, idx: number) => {
//                         return (
//                           <FooterLink
//                             text={link.buttonText}
//                             link={link.buttonLink.data.attributes.PageName}
//                             locale={locale}
//                             key={idx}
//                           />
//                         );
//                       })}
//                     </ul>
//                   ),
//                 )}
//               </div>
//             </div>

//             <div className="flex justify-between items-center pb-8 md:px-12">
//               <p className="text-white font-mediumbold pb-2 text-xl w-72 border-b-2 border-white">
//                 Contact Us
//               </p>
//               <SocialLinks />
//             </div>
//           </div>
//         </footer>
//       ) : (
//         <Loading />
//       )}
//     </>
//   );
// };

// export default Footer;
import React from 'react';

export default function Footer() {
  return <div>Footer</div>;
}
