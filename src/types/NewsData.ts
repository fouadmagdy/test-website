import { ImageProp } from '@/types/image.types';

// export interface NewsData {
//   id: number;
//   attributes: {
//     title: string;
//     date: string;
//     createdAt: string;
//     body: string;
//     publishedAt: string;
//     slug: string;
//     image: ImageProp
//   };
// }
export interface NewsData {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  attributes: DatumAttributes;
  id: number;
}

export interface DatumAttributes {
  body: string;
  createdAt: Date;
  date: Date;
  image: ImageProp;
  locale: string;
  publishedAt: Date;
  title: string;
  updatedAt: Date;
}

export interface Image {
  data: Data;
}

export interface Data {
  attributes: DataAttributes;
  id: number;
}

export interface DataAttributes {
  alternativeText: null | string;
  url: string;
}

export interface Meta {
  pagination: Pagination;
}

export interface Pagination {
  page: number;
  pageCount: number;
  pageSize: number;
  total: number;
}
