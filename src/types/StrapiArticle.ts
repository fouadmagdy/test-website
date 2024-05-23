export interface StrapiArticle {
  id: number,
  title: string,
  bodyHtml: string,
  body: string,
  date:string,
  images: {
    data: [{
      attributes: {
        alternativeText: string,
        url: string,
      }
    }]
  };
}
