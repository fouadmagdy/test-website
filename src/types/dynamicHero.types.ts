export interface IDynamicHero {
  data: RootObjectData;
}

interface RootObjectData {
  attributes: PurpleAttributes;
  id: number;
}

interface PurpleAttributes {
  banner: Banner;
  logo: Banner;
}

interface Banner {
  data: BannerData;
}

interface BannerData {
  attributes: FluffyAttributes;
  id: number;
}

interface FluffyAttributes {
  alternativeText: null;
  url: string;
}
