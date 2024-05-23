import React, { useEffect, useRef, useState } from 'react';
// import SearchBar from '../SearchBar';
import { IoMenu } from 'react-icons/io5';
// import { IoSearch } from 'react-icons/io5';
import { useAppSelector } from '@/store/types';
import { IoIosArrowDropleft, IoIosArrowDropright } from 'react-icons/io';
import { NewNavbarData, MoreLinksItems } from '@/types/Navbar';
import Image from 'next/image';
import { GetServerUrl } from '@/lib/Networking';
// import Link from 'next/link';
// import { Input } from '@material-tailwind/react';
interface navItem {
  id: number;
  title: string;
  titleLink?: {
    data: {
      attributes: {
        slug: string;
      };
    };
  };
}

interface moreItemLinks {
  id: number;
  title: string;
  buttons: MoreLinksItems[];
}

interface NavbarData {
  NavbarData: NewNavbarData;
}
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const MenuNavbar = ({ NavbarData }: NavbarData) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const [open, setOpen] = React.useState(false);
  const [subMenu, setSubMenu] = React.useState(false);
  const [subMenuItem, setSubMenuItem] = useState(0);
  const menuRef = useRef<HTMLDivElement>(null);

  const openDrawer = () => setOpen(true);
  const closeDrawer = () => {
    setOpen(false);
    setSubMenu(false);
  };
  const showSubMenu = (id: number) => {
    setSubMenu(true);
    setSubMenuItem(id);
  };

  useEffect(() => {
    const handleEscapeButton = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false);
        setSubMenu(false);
      }
    };
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpen(false);
        setSubMenu(false);
      }
    };

    document.addEventListener('keydown', handleEscapeButton);
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('keydown', handleEscapeButton);
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <>
      <p ref={menuRef} className="cursor-pointer" onClick={openDrawer}>
        <IoMenu className="text-primary font-bold text-4xl" />{' '}
      </p>
      {open ? (
        <div
          className={`absolute h-[101vh] ${
            subMenu ? 'w-[100vw]' : 'min-w-[35%]'
          }  pe-10 py-10 grid grid-flow-col justify-end text-white bg-black-gradient z-80 -top-1 -end-1 `}
        >
          {subMenu ? (
            <div className={'px-10'}>
              <div className="grid grid-cols-1 xl:grid-cols-2 mt-36 ">
                <div className="xxl:px-10 xl:px-0 px-10 w-full h-[300px] xl:h-[450px] overflow-hidden">
                  <Image
                    src={
                      GetServerUrl() +
                      NavbarData?.menu?.menuItems[subMenuItem]?.image?.data
                        ?.attributes?.url
                    }
                    className={`w-full object-fill h-full  transition-opacity opacity-0 duration-100 ${locale === 'en' ? 'rounded-tl-[120px]' : 'rounded-tr-[120px]'}`}
                    onLoadingComplete={(image) =>
                      image.classList.remove('opacity-0')
                    }
                    alt="zewailcityLogo"
                    width={500}
                    height={400}
                  />
                </div>
                <div className="h-[200px] xl:h-[500px] overflow-auto">
                  {NavbarData?.menu?.menuItems[subMenuItem]?.links.map(
                    (item, index: number) => (
                      <a
                        href={`/${item?.target?.data?.attributes?.slug}`}
                        onClick={closeDrawer}
                        className="py-2 block tracking-wider hover:text-primary text-end px-3  "
                        key={index}
                      >
                        {item?.label}
                      </a>
                    ),
                  )}
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
          <div
            className={`flex overflow-auto flex-col order-1  py-2 gap-y-8 ${
              subMenu ? 'min-w-[35%] ' : 'w-full'
            }`}
          >
            <h5
              className="text-end flex items-center gap-5 justify-end cursor-pointer text-white capitalize font-bold px-4"
              onClick={closeDrawer}
              title="close"
              aria-label="close"
              role="button"
              tabIndex={0}
            >
              close
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                className="h-8 w-8"
                viewBox="0 0 24 24"
                stroke="white"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>{' '}
            </h5>
            {/* <div className="flex justify-end px-5">
              <Input
                icon={
                  <IoSearch className="h-10 w-10 absolute font-bold text-3xl text-secondary" />
                }
                label="Search"
                className="p-0"
                color="white"
              />
            </div> */}
            <div
              className={`overflow-auto px-5 ${subMenu ? 'border-s-2' : ''}`}
            >
              <div>
                {NavbarData?.menu?.menuItems.map(
                  (item: navItem, index: number) => (
                    <div
                      key={index}
                      className={`my-3 flex ${
                        subMenuItem == index && subMenu ? 'text-primary' : ''
                      } hover:text-secondary gap-2 py-1`}
                      onMouseOver={() => {
                        showSubMenu(index);
                      }}
                    >
                      {/* <IoIosArrowDropright /> */}
                      {locale === 'en' ? (
                        <IoIosArrowDropleft
                          size={24}
                          className="text-3xl cursor-pointer"
                        />
                      ) : (
                        <IoIosArrowDropright
                          size={24}
                          className="text-3xl cursor-pointer"
                        />
                      )}

                      <a
                        href={`/${item?.titleLink?.data?.attributes?.slug ?? ''}`}
                        onClick={closeDrawer}
                      >
                        <h6 className="tracking-wider">{item.title}</h6>
                      </a>
                    </div>
                  ),
                )}
              </div>
              <div className="my-4">
                {NavbarData?.menu?.moreLinks.map(
                  (item: moreItemLinks, index: number) => (
                    <div key={index}>
                      <h4 className=" tracking-wider border-b-2 text-primary border-gray-200 pb-2">
                        {item.title}
                      </h4>
                      <div className=" flex flex-wrap text-sm py-2  gap-2">
                        {item?.buttons.map(
                          (navitem: MoreLinksItems, indexx: number) => (
                            <a
                              href={`/${
                                navitem?.link?.target?.data?.attributes?.slug ??
                                ''
                              }`}
                              onClick={closeDrawer}
                              key={indexx}
                              className="py-1 px-5 border-white hover:border-primary border-2 rounded-lg tracking-wider"
                            >
                              <p>{navitem?.link?.label} </p>
                            </a>
                          ),
                        )}
                      </div>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default MenuNavbar;
