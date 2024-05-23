const debug = true;
const lanMode = true;

const debugServerUrl = `${lanMode ? process.env.NEXT_PUBLIC_STRAPI_URL : ''}`;

const productionServerUrl = '';

/**
 * The function `GetServerUrl` returns the server URL based on whether the code is running in debug or
 * production mode.
 * @returns a string value. The specific value being returned depends on the value of the `debug`
 * variable. If `debug` is true, then the `debugServerUrl` variable is returned. Otherwise, the
 * `productionServerUrl` variable is returned.
 */
export const GetServerUrl = (): string => {
  return debug ? debugServerUrl : productionServerUrl;
};

/**
 * Returns the API URL by combining the server URL and the "/api" path.
 * @returns {string} The API URL.
 */
export const GetApiUrl = (): string => {
  return `${GetServerUrl()}/api`;
};
