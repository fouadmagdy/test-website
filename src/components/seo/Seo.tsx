import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { SEO_DATA } from './seo.types';

function Seo() {
  const [data, setData] = useState<SEO_DATA | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/pages?filters[slug][$eq]=program&locale=en&fields[0]=id&fields[1]=title&populate=seo`,
        );
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching SEO data:', error);
      }
    };
    fetchData();
  }, []);

  if (!data) return null;

  return (
    <>
      {data.data.map((datum) => {
        const seo = datum.attributes.seo;

        return (
          <Head key={datum.id}>
            <title>{seo.metaTitle}</title>
            <meta name="description" content={seo.metaDescription} />
            <meta name="keywords" content={seo.keywords} />
            <meta name="robots" content={seo.metaRobots} />
            {/* preventIndexing is a boolean property that indicates whether the page should be indexed or not. */}
            {seo.preventIndexing && (
              <meta name="robots" content="noindex, nofollow" />
            )}

            <script type="application/ld+json">
              {JSON.stringify(seo.structuredData)}
            </script>
            <link rel="icon" href="Images/ZC-logo.png" />
          </Head>
        );
      })}
    </>
  );
}

export default Seo;
