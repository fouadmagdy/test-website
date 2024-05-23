'use client';
import React, { useEffect, useState } from 'react';
// import SearchBar from '../SearchBar';
import Link from 'next/link';
import Image from 'next/image';
import { StrapiDataV2 } from '@/types/StrapiData';
import { NewNavbarData } from '@/types/Navbar';
// import Cookies from 'js-cookie';
import { useAppDispatch, useAppSelector } from '@/store/types';
import { setLocale } from '@/store/langSlice';
// import { useRouter } from 'next/navigation';
import { Button, Navbar } from '@material-tailwind/react';
import MenuNavbar from './MenuNavbar';
import NewNavbar from './NewNavbar';
// import Search from './Search';

interface NavbarProps {
  navbarData: { [key: string]: StrapiDataV2<NewNavbarData> };
  localeFromServer: string;
}

// const setLocaleCookie = (newLocale: string) => {
//   Cookies.set('locale', newLocale, { expires: 30 });
// };
const MainNavbar = ({ navbarData, localeFromServer }: NavbarProps) => {
  const dispatch = useAppDispatch();
  const locale = useAppSelector((state) => state.lang.locale);
  const [, setIsClient] = useState(false);
  // const router = useRouter();
  const [small, setSmall] = useState<boolean>(false);
  useEffect(() => {
    dispatch(setLocale(localeFromServer));
    setIsClient(true);
  }, [dispatch, localeFromServer]);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window.addEventListener('scroll', () => setSmall(window.scrollY > 500));
    }
  }, []);

  return (
    <div dir={locale == 'ar' ? 'rtl' : 'ltr'}>
      <Navbar
        className={`container bg-white bg-opacity-100 fixed top-0 z-50 max-w-full rounded-none px-4 lg:px-32 py-0 transition-all duration-1000 ease-in-out ${
          small ? 'py-1' : 'py-2'
        }`}
      >
        <div
          className={`flex items-center justify-between text-blue-gray-900  `}
        >
          <Link href="/" className="mr-4 cursor-pointer  font-medium">
            {small ? (
              <Image
                src={'/Images/zcLogoSecond.svg'}
                className="transition h-[60px] w-[200px] duration-100 ease-in-out transform scale-75 opacity-0"
                onLoadingComplete={(image) =>
                  image.classList.remove('opacity-0')
                }
                alt="zewailcityLogo"
                priority
                width={100}
                height={100}
              />
            ) : (
              <Image
                src={'/Images/zcLogo.svg'}
                className="transition h-20 w-full  duration-100 ease-in-out transform scale-100 opacity-0"
                onLoadingComplete={(image) =>
                  image.classList.remove('opacity-0')
                }
                alt="zewailcityLogo"
                priority
                width={100}
                height={100}
              />
            )}
          </Link>

          <div className="text-center bg-white py-4 hidden lg:block">
            <div className="container mx-auto">
              <p>
                New site coming soon! Visit our
                <a
                  className="underline text-primary capitalize font-bold px-2 hover:text-secondary"
                  href="https://www.zewailcity.edu.eg/main/index.php?lang=en"
                  target="_blank"
                >
                  {' '}
                  current website
                </a>{' '}
                for updates.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between gap-x-4">
            {navbarData[locale]?.data?.attributes.applyNow.link.isExternal ? (
              <Link
                href={`${navbarData[locale]?.data?.attributes.applyNow.link?.externalLink}`}
              >
                {/* <a target="_blank" rel="noopener noreferrer"> */}
                <Button
                  className="py-3 px-6 bg-primary text-white text-sm font-bold hover:bg-secondary hidden lg:block lg:text-lg"
                  size="sm"
                >
                  {navbarData[locale]?.data?.attributes.applyNow.link.label}
                </Button>
                {/* </a> */}
              </Link>
            ) : (
              <Link
                href={`/${navbarData[locale]?.data?.attributes.applyNow.link?.target?.data?.attributes?.slug}`}
              >
                <Button
                  className="py-3 px-6 bg-primary text-white text-sm font-bold hover:bg-secondary hidden lg:block lg:text-lg"
                  size="sm"
                >
                  {navbarData[locale]?.data?.attributes.applyNow.link.label}
                </Button>
              </Link>
            )}

            {/* <Search /> */}
            {/* <div className="gcse-search"></div> */}
            <div className="grid grid-cols-2 items-center">
              {/* <Link
                prefetch={true}
                href=""
                id="lang"
                className={`block mb-1 text-primary font-bold dark:text-white`}
                onClick={() => {
                  const newLocale = `${locale === 'ar' ? 'en' : 'ar'}`;
                  setLocaleCookie(newLocale);
                  dispatch(setLocale(newLocale));
                  router.refresh();
                }}
              >
                <span className="text-3xl ">
                  {locale !== 'en' ? 'En' : 'ع'}
                </span>
              </Link> */}
              <div className="hidden lg:block  ">
                <MenuNavbar NavbarData={navbarData[locale]?.data?.attributes} />
              </div>
              <NewNavbar NavbarData={navbarData[locale]?.data.attributes} />
            </div>
          </div>
        </div>
      </Navbar>
    </div>
  );
};

export default MainNavbar;
