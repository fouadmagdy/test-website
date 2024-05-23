// import fetchFooterData from '@/api/FetchFooterData';
// // import Footer from './Footer';
// import { StrapiData } from '@/types/StrapiData';
// import { FooterData } from '@/types/Footer';

const FooterWrapper = async () => {
  // const en = (await fetchFooterData('en')) as StrapiData<FooterData>;
  // const ar = (await fetchFooterData('ar')) as StrapiData<FooterData>;

  // // TODO: make sure locale is fetched from cookies first before passing it to navbar props to avoid passing the old value to the navbar
  // const data = {
  //   en,
  //   ar,
  // };
  return (
    <footer className={`bg-primary text-white md:h-96 `}>
      {/* <Footer footerData={data} /> */}
    </footer>
  );
};

export default FooterWrapper;
