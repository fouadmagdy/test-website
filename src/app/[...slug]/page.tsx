/**
 * This is a TypeScript React function that fetches page content based on a slug and renders it using
 * the PageContent component.
 * @param  - The "Details" function is a React component that takes in a "params" object as a prop. The
 * "params" object has a property called "slug" which is a string.
 * @returns a JSX element.
 */
import React from 'react';
import { fetchPageContent } from '@/api/FetchPageIndices';
import { fetchPageContentPreview } from '@/api/FetchPagePreview';
// import { StrapiData } from '@/types/StrapiData';
// import { PageData } from '@/types/PageData';
import PageContent from '@/components/PageContent';
// import { FatchSingleElementData } from '@/api/FatchSingleElementData';
import { cookies } from 'next/headers';
import { ColorProvider } from '@/context/color.context';
import { Metadata } from 'next';

export const generateMetadata = async ({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> => {
  const title: string = await new Promise((resolve) => {
    setTimeout(() => {
      resolve(
        `${
          params.slug.length > 1 && /^\d+$/.test(params.slug.slice(-1)[0])
            ? params.slug.slice(-2, -1)[0]
            : params.slug.slice(-1)[0]
        }`,
      );
    }, 100);
  });
  const MetaTitle = title.split('-') // Step 1: Split by "-"
                    .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Step 2: Capitalize first letter
                    .join(' '); // Step 3: Join with space
                    
  return {
    title: {
      absolute: `${MetaTitle} | Zewail City`,
    },
  };
};
export default async function Details({
  params,
}: {
  params: { slug: string };
}) {
  const cookiesStore = cookies();
  const localeCookie = cookiesStore.get('locale');
  const lastSlug = params.slug.slice(-1)[0];
  let previousSlug = '';

  if (params.slug.length > 1 && /^\d+$/.test(lastSlug)) {
    previousSlug = params.slug.slice(-2, -1)[0];
    let data = {};
    if (localeCookie?.value === 'ar') {
      const ar = await fetchPageContent(previousSlug, 'ar');
      data = { ar };
    } else {
      const en = await fetchPageContent(previousSlug, 'en');
      data = { en };
    }

    return (
      <ColorProvider>
        <PageContent data={data} />
      </ColorProvider>
    );
  } else {
    let data = {};
    if (localeCookie?.value === 'ar') {
      if (params.slug.includes('preview')) {
        const ar = await fetchPageContentPreview(lastSlug, 'ar');
        data = { ar };
      } else {
        const ar = await fetchPageContent(lastSlug, 'ar');
        data = { ar };
      }
    } else {
      if (params.slug.includes('preview')) {
        const en = await fetchPageContentPreview(lastSlug, 'en');
        data = { en };
      } else {
        const en = await fetchPageContent(lastSlug, 'en');
        data = { en };
      }
    }

    return (
      <ColorProvider>
        <PageContent data={data} />
      </ColorProvider>
    );
  }
}
