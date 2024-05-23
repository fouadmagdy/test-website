export interface SEO_DATA {
  data: Datum[];
}

interface Datum {
  attributes: Attributes;
  id: number;
}

interface Attributes {
  seo: SEO;
  title: string;
}

interface SEO {
  id: number;
  keywords: string;
  metaDescription: string;
  metaRobots: string;
  metaTitle: string;
  preventIndexing: null;
  structuredData: StructuredData;
}

interface StructuredData {
  '@context': string;
  '@type': string;
  address: Address;
  contactPoint: ContactPoint;
  description: string;
  logo: string;
  name: string;
  sameAs: string[];
  url: string;
}

interface Address {
  '@type': string;
  addressCountry: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  streetAddress: string;
}

export interface ContactPoint {
  '@type': string;
  contactType: string;
  telephone: string;
}
