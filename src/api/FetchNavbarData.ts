/**
 * The function fetchNavbarData fetches the navbar data from an API endpoint and returns it as a
 * Promise.
 * @param {string} locale - The `locale` parameter is a string that represents the language or region
 * for which the navbar data is being fetched. It is used to determine the appropriate localization for
 * the data.
 * @returns The function `fetchNavbarData` is returning a Promise that resolves to an object of type
 * `StrapiData<NewNavbarData>`.
 */
// import { GetApiUrl } from '@/lib/Networking';
import { NewNavbarData } from '@/types/Navbar';
import { StrapiData } from '@/types/StrapiData';

export const fetchNavbarData = async (
  locale: string,
): Promise<StrapiData<NewNavbarData>> => {
  const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/header?populate=deep,6&locale=${locale}`;
  const response = await fetch(URL, { cache: 'no-store' });
  const data = await response.json();
  return data;
};

export default fetchNavbarData;
