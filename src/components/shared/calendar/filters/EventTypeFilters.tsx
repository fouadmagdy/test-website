import { createQueryString } from '@/lib/QueryParams';
import { useState } from 'react';
import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useAppDispatch, useAppSelector } from '@/store/types';
import { setEventFilters } from '@/store/eventSlice';
import { SingleValue } from 'react-select/dist/declarations/src';
// import { Select } from 'flowbite-react';
import Select from 'react-select';
import { eventPropertyLabel } from './eventPropertyLabels';

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
 * Represents the properties of an event type.
 * @interface EventTypeProps
 * @property {object} content - The content of the event type.
 * @property {string[]} content.uniqueCategories - An array of unique categories for the event type.
 * @property {filteredData[]} content.uniqueSeries - An array of unique series for the event type.
 * @property {filteredData[]} content.uniqueSponsor - An array of unique sponsors for the event type.
 * @property {filteredData[]} content.uniqueLocation - An array of unique locations for the event type.
 */
interface EventTypeProps {
  content: {
    uniqueCategories: string[];
    uniqueSeries: filteredData[];
    uniqueSponsor: filteredData[];
    uniqueLocation: filteredData[];
  };
}
const EventTypeFilters = ({ content }: EventTypeProps) => {
  // Same as calendar, using these variables to update searchParams
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams()!;
  const searchParamsArray = Array.from(searchParams.entries());

  const dispatch = useAppDispatch();
  const eventFilters = useAppSelector((state) => state.event.eventFilters);

  const [selectedEventTypeRadio, setSelectedEventTypeRadio] = useState<string>(
    searchParams.get('eventType') ?? '',
  );

  const handleSelectChange = (
    newOption: SingleValue<{ label: string; value: string }>,
    keyName: string,
  ) => {
    const filterType = keyName;
    dispatch(
      setEventFilters({ ...eventFilters, [filterType]: newOption?.value }),
    );

    /**
     * Creates a query string based on the given search parameters array and additional values.
     * Then, updates the router's URL with the new query string.
     * @param {Array<string>} searchParamsArray - The array of search parameters.
     * @param {Array<string>} additionalValues - The additional values to include in the query string.
     * @returns None
     */
    const query = createQueryString(searchParamsArray, [
      eventPropertyLabel[filterType],
      newOption?.value ?? '',
    ]);
    router.push(`${pathname}${query}`, { scroll: false });
  };

  /**
   * Handles the change event for the event type radio buttons.
   * @param {React.ChangeEvent<HTMLInputElement>} event - The change event object.
   * @returns None
   */
  const handleEventTypeRadioChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const filterChoice = event.target.name;
    setSelectedEventTypeRadio(filterChoice);
    dispatch(setEventFilters({ ...eventFilters, categories: filterChoice }));

    // Update url params
    const query = createQueryString(searchParamsArray, [
      'eventType',
      filterChoice,
    ]);
    router.push(`${pathname}${query}`, { scroll: false });
  };
  type EventPropertyKey = 'uniqueSeries' | 'uniqueSponsor' | 'uniqueLocation';

  return (
    <>
      <div className="bg-calendar py-4 px-4 mt-4 w-full">
        <h1 className="font-semibold text-lg">Filter</h1>
        <div className="mb-2">
          {content.uniqueCategories.map((category, index: number) => (
            <div key={index} className="mt-2">
              <label
                className="text-xs md:text-sm lg:text-sm flex items-center"
                htmlFor={`calendar-radio-${category
                  ?.toLowerCase()
                  .replace(' ', '-')}`}
              >
                <input
                  className="pe-1 ms-2 lg:me-1"
                  id={`calendar-radio-${category
                    ?.toLowerCase()
                    .replace(' ', '-')}`}
                  type="radio"
                  name={category}
                  checked={selectedEventTypeRadio === category}
                  onChange={handleEventTypeRadioChange}
                />
                {'  ' + category}
              </label>
            </div>
          ))}
        </div>

        {Object.entries(content).map(([eventPropertyKey, value], index) => {
          let searchableItems;
          if (eventPropertyKey !== 'uniqueCategories') {
            searchableItems = (value as filteredData[]).map(
              (item: filteredData) => {
                return {
                  label: item.name,
                  value: item.name,
                };
              },
            );
          }
          return (
            eventPropertyKey !== 'uniqueCategories' &&
            value.length > 1 && (
              <div className="py-2" key={index}>
                <label className="text-xs md:text-sm lg:text-sm">
                  {eventPropertyLabel[eventPropertyKey]}
                </label>
                <Select
                  value={{
                    label: eventFilters[eventPropertyKey as EventPropertyKey],
                    value: eventFilters[eventPropertyKey as EventPropertyKey],
                  }}
                  options={searchableItems}
                  onChange={(newOption) =>
                    handleSelectChange(newOption, eventPropertyKey)
                  }
                  className="text-sm"
                />
              </div>
            )
          );
        })}
      </div>
    </>
  );
};

export default EventTypeFilters;
