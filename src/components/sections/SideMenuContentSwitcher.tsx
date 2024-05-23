// import React from 'react';
// // import { useState, useCallback, useEffect } from 'react';
// // import { useRouter } from 'next/router';
// // import Loading from '@/app/loading';
// import { IoIosArrowForward } from 'react-icons/io';
// // import { fetchSchool } from '@/store/schoolSlice';
// import { SchoolsData } from '@/types/schools.types'; // Import the types
// import { School } from '@/types/school.types';
// import Title, { LineType } from '../shared/Title';

// interface SideMenuProps {
//   schools: SchoolsData[];
//   school: School | null;
//   activeTab: string;
//   handleSchoolClick: (slug: string) => void;
// }
// function SideMenuContentSwitcher({
//   school,
//   schools,
//   activeTab,
//   handleSchoolClick,
// }: SideMenuProps) {
//   return (
//     <div className="container mt-10" id="SideMenuContentSwitcher">
//       <div className="">
//         <div className="grid grid-cols-1 md:grid-cols-7 ">
//           <div
//             className="h-fit col-span-2"
//             style={{
//               borderTopWidth: '8px',
//               borderTopColor: school?.color || 'black',
//               color: 'black',
//               borderStyle: 'solid',
//             }}
//           >
//             {schools && schools.length > 0 ? (
//               <div>
//                 {schools.map((school) => (
//                   <div
//                     key={school.attributes.slug}
//                     className={`delay-75 font-normal px-4 py-2 grid grid-flow-col-dense justify-between items-center ${
//                       activeTab === school.attributes.slug
//                         ? `font-extrabold  text-white`
//                         : ''
//                     }`}
//                     style={{
//                       border:
//                         activeTab === school.attributes.slug
//                           ? `2px solid ${school.attributes.color}`
//                           : 'none',
//                       backgroundColor:
//                         activeTab === school.attributes.slug
//                           ? school.attributes.color
//                           : 'transparent',
//                     }}
//                     onClick={() => handleSchoolClick(school.attributes.slug)}
//                   >
//                     <button
//                       role="button"
//                       className={`font-normal w-full text-start    leading-loose`}
//                     >
//                       {school.attributes.title}
//                     </button>
//                     <IoIosArrowForward />
//                   </div>
//                 ))}
//               </div>
//             ) : (
//               <p>No schools data available</p>
//             )}
//           </div>
//           <div className=" md:border-s-2 p-5 grid grid-cols-1 col-span-5 gap-8 lg:gap-8">
//             <div className="">
//               <div className="max-w-lg mx-auto lg:max-w-none">
//                 <div className="prose text-gray-900 ">
//                   {schools ? (
//                     <div style={{ color: school?.color }} className='w-2/3'>
//                       <Title
//                         text={`${school?.title}`}
//                         textColor={`inherit`}
//                         fontSize={'text-4xl'}
//                         fontWeight={'font-bold'}
//                         line={LineType.Before}
//                         lineColor={'before:bg-secondary'}
//                         id="section-title"
//                         aria-labelledby="section-title"
//                       />
//                     </div>
//                   ) : null}
//                   <p className="pt-5  leading-loose">{school?.description}</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default SideMenuContentSwitcher;
