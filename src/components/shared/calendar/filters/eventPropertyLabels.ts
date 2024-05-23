/**
 * Defines the labels for different event properties.
 * @type {labelType}
 * @property {string} uniqueCategories - The label for the category property.
 * @property {string} uniqueSeries - The label for the event series property.
 * @property {string} uniqueSponsor - The label for the event sponsors property.
 * @property {string} uniqueLocation - The label for the locations property.
 */
export const eventPropertyLabel: labelType = {
  uniqueCategories: 'Category',
  uniqueSeries: 'Event Series',
  uniqueSponsor: 'Event Sponsors',
  uniqueLocation: 'Locations',
};

/**
 * Represents a label type with key-value pairs.
 * @interface labelType
 * @property {string} key - The key of the label.
 * @property {string} value - The value of the label.
 */
interface labelType {
  [key: string]: string;
}
