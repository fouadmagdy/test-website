export interface StrapiData<RequestedData> {
  data: [
    {
      attributes: RequestedData;
      id: number;
    },
  ];
  // meta type is never until we actually have a value from the backend
  meta: never;
}
export interface StrapiDataV2<RequestedData> {
  data: {
    attributes: RequestedData;
  };

  // meta type is never until we actually have a value from the backend
  meta: never;
}

export interface StrapiButton {
  id: number;
  buttonText: string;
  buttonLink: {
    data: {
      attributes: {
        PageName: string;
      };
    };
  };
}

export interface StrapiButtonV2 {
  id: number;
  theme: string;
  link: {
    id: number;
    label: string;
    target: {
      data: {
        id: number;
        attributes: {
          title: string;
          slug: string;
        };
      };
    };
  };
}

export interface StrapiLink {
  data: {
    attributes: {
      PageName: string;
    };
  };
}
export interface StrapiLinkV2 {
  data: {
    attributes: {
      slug: string;
    };
  };
}