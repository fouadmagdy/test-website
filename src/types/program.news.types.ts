export interface IProgramNews {
  data: RootObjectData;
}

interface RootObjectData {
  attributes: PurpleAttributes;
  id: number;
}

interface PurpleAttributes {
  news: News;
}

interface News {
  data: Datum[];
}

interface Datum {
  attributes: DatumAttributes;
  id: number;
}

interface DatumAttributes {
  body: string;
  date: Date;
  image: Image;
  locale: string;

  title: string;
}

interface Image {
  data: ImageData;
}

interface ImageData {
  attributes: FluffyAttributes;
}

interface FluffyAttributes {
  alternativeText: null;

  url: string;
}
