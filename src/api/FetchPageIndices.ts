/**
 * The above code is a TypeScript function that fetches a page endpoint URL based on the page name and
 * locale, and then fetches the page content using the fetched URL.
 * @param {string} url - The `url` parameter is the URL of the API endpoint that is used to fetch the
 * page indices. It is constructed using the `GetApiUrl()` function, which returns the base URL of the
 * API. The `locale` parameter is the language/locale of the page.
 * @returns The `fetchPageContent` function returns a Promise that resolves to a `StrapiData<PageData>`
 * object or `undefined`.
 */
// import { PageData } from '@/types/PageData';
// import { StrapiData } from '@/types/StrapiData';
import axios from 'axios';

interface StrapiDataObj {
  data: [
    {
      id: number;
      attributes: {
        title: string;
        createdAt: string;
        updatedAt: string;
        publishedAt: string;
        locale: string;
        slug: string;

        Content: [
          {
            id: number;
            __component: string;
            title: string;
            image: {
              data: {
                id: number;
                attributes: {
                  name: string;
                  alternativeText: string;
                  caption: string;

                  formats: {
                    thumbnail: {
                      url: string;
                    };
                  };

                  url: string;
                  previewUrl: string;

                  createdAt: string;
                  updatedAt: string;
                };
              };
            };
          },
        ];
      };
    },
  ];
}

export const fetchPageContent = async (
  pageName: string,
  locale: string,
): Promise<StrapiDataObj | undefined> => {
  const URL = `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages/?filters[slug]=${pageName}&locale=${locale}&populate=deep,6`;
  const { data } = await axios.get<StrapiDataObj>(URL);

  return data ?? {};
};
