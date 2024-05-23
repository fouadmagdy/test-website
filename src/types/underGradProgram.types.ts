export interface underGradProgram {
  data: Datum[];
  meta: Meta;
}

export interface Datum {
  attributes: DatumAttributes;
  id: number;
}

export interface DatumAttributes {
  degree: Degree;
  media: Media;
  school: School;
  title: string;
}

export enum Degree {
  BachelorOfBusinessAdministration = 'Bachelor of Business Administration',
  BachelorOfScience = 'Bachelor of Science',
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
  title: Title;
}

export enum Title {
  SchoolOfBusiness = 'School of Business',
  SchoolOfComputationalSciencesArtificialIntelligence = 'School of Computational Sciences & Artificial Intelligence',
  SchoolOfEngineering = 'School of Engineering',
  SchoolOfScience = 'School of Science',
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
