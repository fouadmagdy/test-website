import { StrapiData } from '@/types/StrapiData';
import fetchNavbarData from '@/api/FetchNavbarData';
import { store } from '@/store';
import { NewNavbarData } from '@/types/Navbar';
import MainNavbar from './MainNavbar';

const NavbarWrapper = async () => {
  const locale = store.getState().lang.locale;
  // TODO: make sure locale is fetched from cookies first before passing it to navbar props to avoid passing the old value to the
  let data = {};

  if (locale === 'ar') {
    const ar = (await fetchNavbarData('ar')) as StrapiData<NewNavbarData>;
    data = { ar };
  } else {
    const en = (await fetchNavbarData('en')) as StrapiData<NewNavbarData>;
    data = { en };
  }
  return (
    <header>
      <MainNavbar navbarData={data} localeFromServer={locale} />
    </header>
  );
};

export default NavbarWrapper;
