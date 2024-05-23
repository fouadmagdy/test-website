
export interface SingleNewsTypes {
  data: RootObjectData;
}
 interface RootObjectData {
 attributes: PurpleAttributes;
 id:         number;
}

 interface PurpleAttributes {
 body:        string;
 categories:  Categories;
 createdAt:   Date;
 date:        Date;
 image:       AttributesImage;
 locale:      string;
 publishedAt: Date;
 related:     Related[];
 title:       string;
 updatedAt:   Date;
}

 interface Categories {
 data: Datum[];
}

 interface Datum {
 attributes: DatumAttributes;
 id:         number;
}

 interface DatumAttributes {
 createdAt:   Date;
 name:        string;
 publishedAt: Date;
 slug:        string;
 updatedAt:   Date;
}

 interface AttributesImage {
 data: ImageData;
}

 interface ImageData {
 attributes: FluffyAttributes;
 id:         number;
}

 interface FluffyAttributes {
 alternativeText:   string;
 caption:           null;
 createdAt:         Date;
 ext:               string;
 formats:           Formats;
 hash:              string;
 height:            number;
 mime:              string;
 name:              string;
 previewUrl:        null;
 provider:          string;
 provider_metadata: null;
 size:              number;
 updatedAt:         Date;
 url:               string;
 width:             number;
}

 interface Formats {
 thumbnail: Thumbnail;
}

 interface Thumbnail {
 ext:    string;
 hash:   string;
 height: number;
 mime:   string;
 name:   string;
 path:   null;
 size:   number;
 url:    string;
 width:  number;
}

export interface Related {
 body:   string;
 date:   Date;
 id:     number;
 image:  RelatedImage;
 locale: string;
 title:  string;
}

 interface RelatedImage {
 id:  number;
 url: string;
}

