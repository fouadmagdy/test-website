/**
 * This is a TypeScript React component that fetches page content based on the user's locale and
 * renders it using the PageContent component.
 * @returns The function `HomePage` is returning a JSX element. Specifically, it is returning the
 * `PageContent` component with the `data` prop set to the `data` object.
 */
import React from 'react';

import { fetchPageContent } from '@/api/FetchPageIndices';
import PageContent from '@/components/PageContent';
import { cookies } from 'next/headers';
import Loading from '@/app/loading';
import { ColorProvider } from '@/context/color.context';
async function HomePage(): Promise<JSX.Element> {
  const cookiesStore = cookies();
  const localeCookie = cookiesStore.get('locale');

  let data = {};

  if (localeCookie?.value === 'ar') {
    const ar = await fetchPageContent('home', 'ar');
    data = { ar };
  } else {
    const en = await fetchPageContent('home', 'en');
    data = { en };
  }

  if (!data) {
    <Loading />;
  }

  return (
    <ColorProvider>
      <PageContent data={data} />
    </ColorProvider>
  );
}

export default HomePage;
