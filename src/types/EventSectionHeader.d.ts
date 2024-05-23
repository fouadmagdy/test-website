// import { PageHyperlink } from './PageHyperlink';
import { StrapiImage } from './StrapiImage';
import { StrapiButton } from '@/types/StrapiData';

export interface EventSectionHeader {
  content: {
    subtitle:string;
    sectionHeader: {
      id: 1;
      title: string;
      button: {
        id: 9;
        theme: string;
        link: {
          id: number;
          label: string;
          target: {
            data: {
              attributes: {
                slug: string;
              };
            };
          };
        };
      };
    };
    id: number;
    content: {
      data: {
        attributes: {
          url: string | undefined;
          needToEdit: boolean;
        };
      };
    };

    daysRange: number;
    button?: StrapiButton;
    image?: StrapiImage;
    targetPage: {
      data: {
        attributes: {
          title: string;
          slug: string;
        };
      };
    };
    oldEvents: {
      data: {
        attributes: {
          needToEdit?: boolean;
          url: string;
        };
      };
    };
  };
  inSidebar:boolean;
}
