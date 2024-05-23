import React from 'react';
import { Collapse, Typography, IconButton } from '@material-tailwind/react';

import { NewNavLink, NewNavbarData } from '@/types/Navbar';
import Link from 'next/link';

interface navItem {
  titleLink?: {
    data: {
      attributes: {
        slug: string;
      };
    };
  };
  id: number;
  title: string;
  links: NewNavLink[];
}

// interface MoreItemLinks {
//   id: number;
//   title: string;
//   buttons: NewNavLink[];
// }
interface NavbarData {
  NavbarData: NewNavbarData;
}
const NewNavbar = ({ NavbarData }: NavbarData) => {
  const [openNav, setOpenNav] = React.useState(false);
  const [openSubMenus, setOpenSubMenus] = React.useState<number[]>([]);

  React.useEffect(() => {
    window.addEventListener(
      'resize',
      () => window.innerWidth >= 960 && setOpenNav(false),
    );
  }, []);

  const toggleSubMenu = (index: number) => {
    setOpenSubMenus((prev) =>
      prev.includes(index)
        ? prev.filter((item) => item !== index)
        : [...prev, index],
    );
  };

  const isSubMenuOpen = (index: number) => {
    return openSubMenus.includes(index);
  };

  const navList = (
    <div className={`${openNav ? `block` : `hidden`} p-8`}>
      <div className="flex justify-end">
        <div className="flex items-center">
          <span className="text-base text-white">Close</span>
          <IconButton
            variant="text"
            className="h-10 w-10 flex text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent "
            ripple={false}
            onClick={() => setOpenNav(false)}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              className="h-10 w-10"
              viewBox="0 0 24 24"
              stroke="white"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </IconButton>
        </div>
      </div>

      <ul
        className={` overflow-auto absolute p-8   bg-lightBlack left-0 h-auto z-40 w-[100%] mt-2 mb-4 flex flex-col  lg:mb-0 lg:mt-0 lg:flex-column  lg:flex-start lg:gap-6`}
      >
        {NavbarData?.menu?.menuItems?.map((item: navItem, index: number) => (
          <div key={index}>
            <Typography
              as="li"
              variant="small"
              color="white"
              className="flex items-center justify-between gap-x-2 p-2  font-medium"
            >
              <Link
                href={`/${item?.titleLink?.data?.attributes?.slug ??''}`}
                className="flex items-center font-bold text-sm tracking-wider hover:text-primary"
                onClick={() => setOpenNav(false)}
              >
                {item.title}
              </Link>
              <div onClick={() => toggleSubMenu(index)} className="w-[20px] h-[20px] rounded-full bg-white flex items-center justify-center cursor-pointer">
                {isSubMenuOpen(index) ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#000"
                    className="bi bi-chevron-compact-up"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M7.776 5.553a.5.5 0 0 1 .448 0l6 3a.5.5 0 1 1-.448.894L8 6.56 2.224 9.447a.5.5 0 1 1-.448-.894l6-3z"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="#000"
                    className="bi bi-chevron-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
                    />
                  </svg>
                )}
              </div>
            </Typography>
            <div
              className={`${
                isSubMenuOpen(index) ? 'block' : 'hidden'
              } py-1  transition ease-in-out delay-150  duration-300`}
            >
              <ul className="p-2 divide-y">
                {item.links?.map((item: NewNavLink, index: number) => (
                  <Link
                    href={item?.target?.data?.attributes?.slug ?? ''}
                    className="py-2 block tracking-wider text-start text-white hover:text-primary text-xs px-3  "
                    key={index}
                    onClick={() => setOpenNav(false)}
                  >
                    {item?.label}
                  </Link>
                ))}
              </ul>
            </div>
          </div>
        ))}
        
        {/* {NavbarData.menu.more_links.map((item: any, index: number) => <div key={index}>
        <div className='flex flex-col text-sm  w-full'>
          {item.button.map((navitem: NewNavLink, indexx: number) => <div key={indexx} className='w-full rounded gap-y-2 mt-2 bg-primary p-2 text-white text-center'>
            <p>{navitem.buttonText}</p>
          </div>
          )}
        </div>
      </div>)} */}

        <div className="">
          {NavbarData?.menu?.moreLinks?.map((item, index: number) => (
            <div className="py-2" key={index}>
              <p className=" font-bold tracking-wider border-b-2 text-sm text-primary border-gray-200 py-2  ">
                {item.title}
              </p>
              <div className="w-full text-sm gap-1 flex flex-wrap">
                {item.buttons.map((navitem, indexx: number) => (
                  <Link
                    href={`/${
                      navitem?.link?.target?.data?.attributes?.slug ?? ''
                    }`}
                    key={indexx}
                    className="py-2 gap-y-2 mt-3 me-2 px-6 inline-block  border-white text-white text-center border-2 rounded-full text-xs tracking-wider"
                  >
                    {navitem?.link?.label}{' '}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </ul>
    </div>
  );
  return (
    <>
      <div className="lg:hidden">
        <IconButton
          variant="text"
          className="h-10 w-10 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent "
          ripple={false}
          onClick={() => setOpenNav(true)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="#00B4D1"
            stroke="#00B4D1"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </IconButton>
      </div>

      <Collapse open={openNav}>
        <div
          className={`absolute overflow-auto left-0 z-40 top-0 lg:hidden bg-lightBlack ${
            openNav ? 'h-[100vh] w-[100vw]' : ''
          }`}
        >
          {navList}
        </div>
      </Collapse>
    </>
  );
};
export default NewNavbar;
