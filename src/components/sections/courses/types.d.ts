export interface CourseAttributes {
  [key: string]: string;
  code: string;
  title: string;
  credits: string;
}

export interface ICourse {
  id: number;
  attributes: CourseAttributes;
}

export type ICourses = ICourse[];

/**
 * Represents the attributes for a data item.
 * @interface Attributes
 * @property {string} name - The name of the data item.
 * @property {string} url - The URL of the data item.
 * @property {string} createdAt - The creation date of the data item.
 * @property {string} updatedAt - The update date of the data item.
 * @property {string} publishedAt - The publication date of the data item.
 * @property {string} description - The description of the data item.
 * @property {string} locale - The locale of the data item.
 * @property {boolean} needToEdit - The edit requirement of the data item.
 */
interface Attributes {
  name: string;
  url: string;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  description: string;
  locale: string;
  needToEdit: boolean;
}

/**
 * Represents the localization data structure for a courses item.
 * @interface Localization
 * @property {number} id - The unique identifier of the localization.
 * @property {Attributes} attributes - The attributes of the localization.
 */
interface Localization {
  id: number;
  attributes: Attributes[];
}

/**
 * Represents the data attributes for a courses item.
 * @interface DataAttributes
 * @property {Localizations[]} localizations - The localizations of the data item.
 */
interface DataAttributes extends Attributes {
  localizations: {
    data: Localization[];
  };
}

/**
 * Represents the data structure for a courses item.
 * @interface CoursesItemData
 * @property {number} id - The unique identifier of the courses item.
 * @property {string} __component - The component type of the courses item.
 * @property {Object} targetPage - The target page of the courses item.
 * @property {Object} academicYears - The academic years of the courses item.
 * @property {Object} yearCourses - The year courses of the courses item.
 */
interface CoursesItemData {
  id: number;
  __component: string;
  targetPage: {
    data: {
      id: number;
      attributes: {
        title: string;
        slug: string;
        createdAt: string;
        updatedAt: string;
      };
    };
  };
  academicYears: {
    data: {
      id: number;
      attributes: DataAttributes;
    };
  };
  yearCourses: {
    data: {
      id: number;
      attributes: DataAttributes;
    };
  };
}
