export interface SchoolAdmissionTypes {
  data: Data;
}

interface Data {
  attributes: Attributes;
  id: number;
}

interface Attributes {
  abbreviation: string;
  admissionCollapse: AdmissionCollapse[];
  color: string;
  createdAt: Date;
  description: string;
  locale: string;
  publishedAt: Date;
  richDescription: string;
  title: string;
  updatedAt: Date;
}

interface AdmissionCollapse {
  id: number;
  title?: string;
  items: Item[];
}

interface Item {
  description: string;
  id: number;
  title: string;
}
