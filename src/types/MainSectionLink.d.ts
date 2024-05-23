
export interface MainSectionLink {
    id: number,
    buttonText: string
    pageHyperlink?: PageHyperlink
}

export interface PageHyperlink {
    data: {
      id: number;
      attributes: { PageName: string; url: string };
    };
  }
  