import fetchFooterData from '@/api/FetchFooterData';
import NewFooter from './NewFooter';
import { StrapiData } from '@/types/StrapiData';
import { FooterData } from '@/types/Footer';
import { store } from '@/store';

const FooterWrapper = async () => {
  // const imagePath = '/Images/footerBg.jpg';

  // const backgroundImageStyle: React.CSSProperties = {
  //   backgroundImage: `url(${imagePath})`,
  //   backgroundRepeat: 'no-repeat',
  //   // backgroundPosition: 'center',
  //   backgroundSize: 'cover',
  //   display: 'flex',
  //   flexDirection: 'column',
  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   height: 'auto',
  //   // clipPath: 'polygon(77% 0, 100% 21%, 100% 100%, 0 100%, 0 0, 21% 15%)',
  // };

  // TODO: make sure locale is fetched from cookies first before passing it to navbar props to avoid passing the old value to the navbar
  let data = {};
  const locale = store.getState().lang.locale;
  if (locale === 'ar') {
    const ar = (await fetchFooterData(
      'ar',
    )) as unknown as StrapiData<FooterData>;
    data = { ar };
  } else {
    const en = (await fetchFooterData(
      'en',
    )) as unknown as StrapiData<FooterData>;
    data = { en };
  }

  return (
    <footer className={`bg-lightBlack text-white`}>
      <div
        className="w-full h-full lg:py-20"
        // style={{
        //   clipPath: 'polygon(77% 0, 100% 21%, 100% 100%, 0 100%, 0 0, 21% 15%)',
        // }}
      >
        {/* <div className="pt-10"></div> */}
        <NewFooter footerData={data} localeFromServer={locale} />
      </div>

      {/* for maintence  */}
      <div className="text-center bg-primary py-4">
        <div className="container mx-auto">
          <p>
          {locale==='en'?'Contact us for any issue on this':'تواصل معنا بخصوص أي مشكلة على هذا'}{' '}
            <a
              className="underline"
              href="https://docs.google.com/forms/d/e/1FAIpQLSfidOzLxXc0Lf6WHrwymKnv6jMsojWGZu3M-Dn2Z9LLOkFt4w/viewform?usp=sf_link"
              target="_blank"
            >
              {locale==='en'?'link':'الرابط'}{' '}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default FooterWrapper;
