type link = {
  id: number;
  __component: string;
  displayName: string;
  // pageKey:string;
  // url: string;
  pageLink: {
    data?: {
      id: number;
      attributes: {
        PageName: string;
        url: string;
      };
    };
  };
};
export interface NavbarData {
  topLinks: link[];
  bottomLinks: link[];
  logo: string;
}

export interface NewNavbarData {
  logo: NavbarImage;
  secondLogo: NavbarImage;
  applyNow: {
    id: number;
    link: NewNavLink;
  };

  menu: {
    id: number;
    menuItems: {
      id: number;
      title: string;
      sup_menu_items: NewNavLink[];
      image: NavbarImage;
      links: NewNavLink[];
    }[];
    moreLinks: {
      id: number;
      title: string;
      buttons: MoreLinksItems[];
    }[];
    // buttons: NewNavLink[]
    // menuItem: NavbarMenuItem[]
  };
}
export interface NavbarImage {
  data: {
    attributes: {
      name: string;
      alternativeText: string;
      url: string;
    };
  };
}

export interface NewNavLink {
  id: number;
  label: string;
  isExternal:boolean;
  externalLink: string;
  target: {
    data: {
      id: number;
      attributes: {
        slug: string;
        title:string;
      };
    };
  }
  
}

export interface NavbarMenuItem {
  id: number;
  title: string;
  image: NavbarImage;
  button: NewNavLink[];
}

export interface MoreLinksItems {
  id: number;
  link: {
    label: string;
    target: {
      data: {
        attributes: {
          slug: string;
        };
      };
    };
  };
}
