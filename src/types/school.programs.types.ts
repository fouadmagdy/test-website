export interface SchoolProgramsTypes {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  attributes: DatumAttributes;
  id: number;
}

export interface DatumAttributes {
  PEOs: null;
  SOs: null;
  abbreviation: string;
  accreditationInfo: null;
  createdAt: Date;
  description: string;
  graduationRequirements: null;
  locale: string;
  media: Media;
  numEnrolledGraduated: null;
  otherResources: null;
  programType: string;
  publishedAt: Date;
  research: null;
  sampleStudyPlan: null;
  school: School;
  title: string;
  updatedAt: Date;
}

export interface Media {
  data: MediaData;
}

export interface MediaData {
  attributes: PurpleAttributes;
  id: number;
}

export interface PurpleAttributes {
  alternativeText: null;
  url: string;
}

export interface School {
  data: SchoolData;
}

export interface SchoolData {
  attributes: FluffyAttributes;
  id: number;
}

export interface FluffyAttributes {
  color: string;
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
