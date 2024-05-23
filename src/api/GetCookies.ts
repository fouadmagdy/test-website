/**
 * The function `getLocaleCookie` returns the value of the 'locale' cookie, or 'en' if the cookie is
 * not set.
 * @returns The function `getLocaleCookie` returns the value of the 'locale' cookie if it exists,
 * otherwise it returns the string 'en'.
 */
import Cookies from 'js-cookie';
export const getLocaleCookie = () => {
  return Cookies.get('locale') ?? 'en';
};
