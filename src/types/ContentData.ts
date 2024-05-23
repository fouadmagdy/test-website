// export interface boardMembersData {
//   data: boardMembers[]

// }
export interface boardMembers {
  id: number;
  attributes: {
    name: string;
    description: string;
    email: string;
    image: {
      data: {
        id: number;
        attributes: {
          name: string;
          alternativeText: string;
          caption: string;
          width: number;
          height: number;
          url: string;
        };
      };
    };
  };
}
export interface ContentData {
  id: number;
  sidebar:boolean
  __component: string;
  text?: string;
  title?: string;
  photo?: {
    data: {
      attributes: {
        url: string;
        hash: string;
      };
    };
  };
  collection_url?: {
    data: {
      id: number;
      attributes: {
        name: string;
        url: string;
      };
    };
  };
  news?: {
    data: [{
      id: number;
      attributes: {
        title: string;
        date: string;
        body: string;
        createdAt: string;
        image: {
          data: {
            id: number;
            attributes: {
              name: string;
              alternativeText: string;
              url: string;
            };
          };
        };
      };
    }];
  };

  sliderdata?: [
    {
      id: number;
      title: string;
      paragraph: string;
      image: {
        data: {
          id: number;
          attributes: {
            name: string;
            alternativeText: string;
            caption: string;
            width: number;
            height: number;
            url: string;
          };
        };
      };
    },
  ];
  // boardMembers?: boardMembers[];
}
export interface boardMembersData {
  data: RootObjectDatum[];
  meta: Meta;
 }
 
 export interface RootObjectDatum {
  attributes: PurpleAttributes;
  id:         number;
 }
 
 export interface PurpleAttributes {
  administrativePositionsTitle: null;
  categories:                   Categories;
  createdAt:                    Date;
  biography:                    string;
  email:                        string;
  image:                        Image;
  locale:                       string;
  name:                         string;
  officePhoneNumber:            null;
  otherResources:               null;
  publications:                 null;
  publishedAt:                  Date;
  rank:                         null;
  researchInterests:            null;
  roomNumber:                   null;
  updatedAt:                    Date;
 }
 
 export interface Categories {
  data: CategoriesDatum[];
 }
 
 export interface CategoriesDatum {
  attributes: FluffyAttributes;
  id:         number;
 }
 
 export interface FluffyAttributes {
  name: string;
  slug: string;
 }
 
 export interface Image {
  data: Data;
 }
 
 export interface Data {
  attributes: DataAttributes;
  id:         number;
 }
 
 export interface DataAttributes {
  alternativeText: null;
  url:             string;
 }
 
 export interface Meta {
  pagination: Pagination;
 }
 
 export interface Pagination {
  page:      number;
  pageCount: number;
  pageSize:  number;
  total:     number;
 }
 