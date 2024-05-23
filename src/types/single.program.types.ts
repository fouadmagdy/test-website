export interface SingleProgram {
  data: RootObjectData;
}

export interface RootObjectData {
  attributes: PurpleAttributes;
  id: number;
}

export interface PurpleAttributes {
  PEOs: string;
  SOs: string;
  abbreviation: string;
  accreditationInfo: string;
  courseTree: CourseTree;
  createdAt: Date;
  description: string;
  graduationRequirements: string;
  locale: string;
  media: CourseTree;
  numEnrolledGraduated: string;
  otherResources: string;
  programCollapse: ProgramCollapse[];
  programType: string;
  publishedAt: Date;
  research: string;
  richDescription: string;
  sampleStudyPlan: string;
  school: School;
  title: string;
  updatedAt: Date;
  mediaLink: string;
}

export interface CourseTree {
  data: CourseTreeData;
}

export interface CourseTreeData {
  attributes: FluffyAttributes;
  id: number;
}

export interface FluffyAttributes {
  alternativeText: null;
  caption: null;
  createdAt: Date;
  ext: string;
  formats: Formats;
  hash: string;
  height: number;
  mime: string;
  name: string;
  previewUrl: null;
  provider: string;
  provider_metadata: null;
  size: number;
  updatedAt: Date;
  url: string;
  width: number;
}

export interface Formats {
  thumbnail: Thumbnail;
}

export interface Thumbnail {
  ext: string;
  hash: string;
  height: number;
  mime: string;
  name: string;
  path: null;
  size: number;
  url: string;
  width: number;
}

export interface ProgramCollapse {
  id: number;
  title?: string;
  items: Item[];
}

export interface Item {
  description: string;
  id: number;
  title: string;
}

export interface School {
  data: SchoolData;
}

export interface SchoolData {
  attributes: TentacledAttributes;
  id: number;
}

export interface TentacledAttributes {
  abbreviation: null;
  color: string;
  createdAt: Date;
  description: string;
  locale: string;
  publishedAt: Date;
  richDescription: null;
  title: string;
  updatedAt: Date;
}
