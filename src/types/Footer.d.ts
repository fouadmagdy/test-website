// export interface FooterData {
//   address: string;
//   logo: {
//     data: {
//       attributes: {
//         alternativeText: string;
//         url: string;
//       };
//     };
//   };
//   socialMedia: { id: number; social_media_link: string }[];
//   footerItem: [
//     {
//       id: number;
//       title: string;
//       button: [
//         {
//           id: number;
//           buttonText: string;
//           buttonLink: {
//             data: {
//               id: number;
//               attributes: {
//                 PageName: string;
//                 url: string;
//               };
//             };
//           };
//         },
//       ];
//     },
//   ];

//   links?: [
//     {
//       id: number;
//       __component: string;
//       footerMain: {
//         id: number;
//         title: string;
//         description: string;
//         logo: {
//           data: {
//             id: number;
//             attributes: {
//               name: string;
//               alternativeText: string;
//               url: string;
//             };
//           };
//         };
//       };
//     },
//   ];
// }

export interface FooterData {
  data: {
    id: number;
    attributes: {
      address: string;
      createdAt: string;
      updatedAt: string;
      publishedAt: string;
      locale: string;
      logo: {
        data: {
          id: number;
          attributes: {
            name: string;
            alternativeText: string;
            caption: string;
            width: number;
            height: number;

            url: string;

            createdAt: string;
            updatedAt: string;
          };
        };
      };
      socialMedia: [
        {
          id: number;
          socialMediaLink: string;
        },
      ];
      footerItems: [
        {
          id: number;
          title: string;
          buttons: [
            {
              id: 2;
              link: {
                id: number;
                label: string;
                target: {
                  data: {
                    id: number;
                    attributes: {
                      title: string;
                      createdAt: string;
                      updatedAt: string;
                      publishedAt: string;
                      locale: string;
                      slug: string;
                    };
                  };
                };
              };
            },
          ];
        },
      ];
    };
  };
}
