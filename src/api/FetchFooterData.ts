/**
 * The function fetches footer data from an API endpoint based on the specified locale.
 * @param {string} locale - The `locale` parameter is a string that represents the language or region
 * for which the footer data is being fetched. It is used to specify the desired language or region for
 * the data.
 * @returns The function `fetchFooterData` is returning a Promise that resolves to an object of type
 * `StrapiData<FooterData>`.
 */

import { FooterData } from '@/types/Footer';

const fetchFooterData = async (locale: string): Promise<FooterData> => {
  // const URL = `${GetApiUrl()}/footer?populate=deep&locale=${locale}`;
  // const response = await fetch(URL, { cache: 'no-store' });
  // const data = await response.json();
  const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/footer?populate=deep&locale=${locale}`;
  const response = await fetch(URL, { cache: 'no-store' });
  const data = await response.json();
  return data;
};

export default fetchFooterData;
