export interface SingleEventTypes {
  data: Data;
}

interface Data {
  attributes: DataAttributes;
  id: number;
}

interface DataAttributes {
  categories: Categories;
  contactEmail: string;
  contactNumber: string;
  createdAt: Date;
  date: Date;
  description: string;
  endDate: string;
  images: Images;
  locale: string;
  publishedAt: Date;
  title: string;
  updatedAt: Date;
}

interface Categories {
  data: CategoriesDatum[];
}

interface CategoriesDatum {
  attributes: PurpleAttributes;
  id: number;
}

interface PurpleAttributes {
  createdAt: Date;
  name: string;
  publishedAt: Date;
  slug: string;
  updatedAt: Date;
}

interface Images {
  data: ImagesDatum[];
}

interface ImagesDatum {
  attributes: FluffyAttributes;
  id: number;
}

interface FluffyAttributes {
  alternativeText: null;
  url: string;
}