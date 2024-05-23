/**
 * The function `FatchSingleElementData` is an asynchronous function that fetches data from an API
 * based on the provided page name, item ID, and locale.
 * @param {string} pageName - The `pageName` parameter is a string that represents the name of the page
 * or resource you want to fetch data from. It is used to construct the URL for the API request.
 * @param {number} itemID - The `itemID` parameter is the ID of the specific element you want to fetch
 * data for. It is a number that uniquely identifies the element in the system.
 * @param {string} locale - The `locale` parameter is a string that represents the language or region
 * for which the data should be fetched. It is used to specify the desired language or region for
 * localization purposes.
 * @returns The function `FatchSingleElementData` is returning a Promise that resolves to the fetched
 * data from the specified URL.
 */
import { GetApiUrl } from '@/lib/Networking';

export const FatchSingleElementData = async (
  pageName: string,
  itemID: string,
  locale: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<any> => {
  const URL = `${GetApiUrl()}/${pageName}?filters[slug]=${itemID}&populate=deep&locale=${locale}`;

  const res = await fetch(URL, {
    cache: 'no-store',
  });
  const data = await res.json();
  return data;
};

export default FatchSingleElementData;
