import EventTypeFilters from './EventTypeFilters';

/**
 * Represents a filtered data object with an ID and a name.
 * @interface filteredData
 * @property {number} id - The ID of the filtered data.
 * @property {string} name - The name of the filtered data.
 */
interface filteredData {
  id: number;
  name: string;
}
/**
 * Represents the properties of an event filters component.
 * @interface EventFiltersProps
 * @property {Object.<string, string>} styles - The styles to apply to the component.
 * @property {Object} content - The content of the component.
 * @property {string[]} content.uniqueCategories - The unique categories of the events.
 * @property {filteredData[]} content.uniqueSeries - The unique series of the events.
 * @property {filteredData[]} content.uniqueSponsor - The unique sponsors of the events.
 * @property {filteredData[]} content.uniqueLocation - The unique locations of the events.
 */
interface EventFiltersProps {
  content: {
    uniqueCategories: string[];
    uniqueSeries: filteredData[];
    uniqueSponsor: filteredData[];
    uniqueLocation: filteredData[];
  };
}

/**
 * Renders the EventFilters component, which displays date filters and event type filters.
 * @param {EventFiltersProps} props - The props object containing styles and content.
 * @returns {JSX.Element} - The rendered EventFilters component.
 */
const EventFilters = ({ content }: EventFiltersProps): JSX.Element => {
  return (
    <>
      <EventTypeFilters content={content} />
    </>
  );
};

export default EventFilters;
