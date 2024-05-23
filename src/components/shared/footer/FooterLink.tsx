'use client';

interface Props {
  text: string;
  link: string;
  locale: string;
}

const FooterLink = ({ text, link, locale }: Props) => {
  return (
    <li
      className={`flex items-center justify-between gap-x-2  pt-1  text-sm lg:text-base`}
    >
      <a href={`/${link}`}>{text}</a>
      <span className="lg:hidden">
        {locale === 'ar' ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="10px"
            viewBox="0 0 512 512"
            fill="white"
          >
            <path d="M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="10px"
            viewBox="0 0 512 512"
            fill="white"
          >
            <path d="M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" />
          </svg>
        )}
      </span>
    </li>
  );
};

export default FooterLink;
