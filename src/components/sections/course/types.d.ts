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
 * Represents the localization data structure for a course item.
 * @interface Localization
 * @property {number} id - The unique identifier of the localization.
 * @property {Attributes} attributes - The attributes of the localization.
 */
interface Localization {
  id: number;
  attributes: Attributes[];
}

/**
 * Represents the data attributes for a course item.
 * @interface DataAttributes
 * @property {Localizations[]} localizations - The localizations of the data item.
 */
interface DataAttributes extends Attributes {
  localizations: {
    data: Localization[];
  };
}

/**
 * Represents the data structure for a course item.
 * @interface CourseItemData
 * @property {number} id - The unique identifier of the course item.
 * @property {string} __component - The component type of the course item.
 * @property {Object} data - The data page of the course item.
 */
interface CourseItemData {
  id: number;
  __component: string;
  data: {
    id: number;
    attributes: DataAttributes;
  };
}



/**
 * Represents the attributes for a SingleCourse component.
 * @interface ICourseAttributes
 * @property {string} title - The title of the course.
 * @property {string | null} description - The description of the course.
 * @property {string} createdAt - The creation date of the course.
 * @property {string} updatedAt - The last update date of the course.
 * @property {string} publishedAt - The publication date of the course.
 * @property {string} locale - The locale of the course.
 * @property {string} code - The code of the course.
 * @property {number} credits - The number of credits for the course.
 * @property {number | null} lectureHours - The number of lecture hours for the course.
 * @property {number | null} practiceHours - The number of practice hours for the course.
 * @property {string | null} prerequisites - The prerequisites of the course.
 * @property {string | null} corequisites - The corequisites of the course.
 * @property {string} academicYear - The academic year of the course.
 */
interface ICourseAttributes {
  title: string;
  description: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string;
  locale: string;
  code: string;
  credits: number;
  lectureHours: number | null;
  practiceHours: number | null;
  prerequisites: string | null;
  corequisites: string | null;
  academicYear: string;
}

/**
 * Represents the props for a SingleCourse component.
 * @interface ISingleCourseProps
 * @property {number} id - The ID of the course.
 * @property {ICourseAttributes} attributes - The attributes of the course.
 */
export interface ISingleCourseProps {
  id: number;
  attributes: ICourseAttributes;
}

