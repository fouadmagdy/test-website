export interface ISingleMember {
  data: RootObjectData;
}

interface RootObjectData {
  attributes: PurpleAttributes;
  id: number;
}

interface PurpleAttributes {
  administrativePositionsTitle?: string;
  createdAt: Date;
  email: string;
  image: Image;
  locale: string;
  name: string;
  officePhoneNumber?: string;
  otherResources?: string;
  publications?: null;
  publishedAt: Date;
  rank?: string;
  researchInterests?: string;
  roomNumber?: string;
  updatedAt: Date;
  biography:string;
  officeLocation:string;
  researchCenters:string;
  programs:{
    data: Program[]
  };
}

export interface Program {
  id: number;
  attributes: {
    title: string;
  }
}

interface Image {
  data: ImageData;
}

interface ImageData {
  attributes: FluffyAttributes;
  id: number;
}

interface FluffyAttributes {
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

interface Formats {
  thumbnail: Thumbnail;
}

interface Thumbnail {
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
