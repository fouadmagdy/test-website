export interface Schools {
  data: SchoolsData[];
}

export interface SchoolsData {
  attributes: Attributes;
  id: number;
}

interface Attributes {
  slug: string;
  title: string;
  color: string;
}
