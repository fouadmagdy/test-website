export interface EventData {
  id: number;
  attributes: {
    title: string;
    date: string;
    contactNumber: string;
    contactEmail: string;
    description: string;
    createdAt: string;
    slug: string;
    images: {
      data: {
        id: number;
        attributes: {
          alternativeText: string;
          url: string;
          // captions: string;
          // width: number;
          // height: number;
        };
      }[];
    };
    location:      Location;
    divisions:     Division[];
    series:        Series[];
    sponsors:      Sponsor[];
    categories:    Categories;
  };
}
 interface Categories {
  data: CategoriesDatum[];
}

 interface CategoriesDatum {
  id:         number;
  attributes: FluffyAttributes;
}

 interface FluffyAttributes {
  name:        string;
  createdAt:   Date;
  updatedAt:   Date;
  publishedAt: Date;
  slug:        string;
  locale:      string;
}

 interface Division {
  id:           number;
  divisionName: string;
}

 interface Location {
  id:            number;
  locationName:  string;
  googleMapLink: string;
}

 interface Series {
  id:         number;
  seriesName: string;
}

 interface Sponsor {
  id:          number;
  sponsorName: string;
}