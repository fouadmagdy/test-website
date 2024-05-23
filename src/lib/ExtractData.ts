import {
  filteredData,
  division,
  sponsor,
  series,
  // location,
} from '@/types/CalendarEvent';
import { EventData } from '@/types/EventData';
interface extractEventData {
  data: EventData[];
}
interface uniqueData {
  name: string;
  id: number;
}

/**
 * The function `GetControlsData` takes in an array of event data and extracts unique categories,
 * series, sponsors, and locations from the data, and returns an object containing these unique values.
 * @param {extractEventData} data - The `data` parameter is an object that contains the extracted event
 * data. It has the following structure:
 * @returns The function `GetControlsData` returns an object `controlledData` which contains four
 * properties: `uniqueCategories`, `uniqueSeries`, `uniqueSponsor`, and `uniqueLocation`.
 */
export function GetControlsData(data: extractEventData) {
  const cat_arr: string[] = [];
  const division_arr: filteredData[] = [];
  const sponsor_arr: filteredData[] = [];
  const series_arr: filteredData[] = [];
  const location_arr: filteredData[] = [];
  data?.data.map((event: EventData) => {
    cat_arr.push(
      event?.attributes?.categories?.data &&
        (event?.attributes?.categories?.data[0]?.attributes?.name ?? ''),
    );
    event.attributes.divisions.map((divisionItem: division) => {
      division_arr.push({
        id: divisionItem.id,
        name: divisionItem.divisionName,
      });
    });
    event?.attributes?.sponsors.map((sponsorItem: sponsor) => {
      sponsor_arr.push({ id: sponsorItem.id, name: sponsorItem.sponsorName });
    });
    event.attributes.series.map((seriesItem: series) => {
      series_arr.push({ id: seriesItem.id, name: seriesItem.seriesName });
    });
    // event.attributes.location.map((locationItem: location) => {
    //   location_arr.push({
    //     id: locationItem.id,
    //     name: locationItem.locationName,
    //   });
    // });
    location_arr.push({
      id: event?.attributes?.location?.id,
      name: event?.attributes?.location?.locationName,
    });
  });
  //  const unique_value=unique(cat_arr);

  const uniqueCategories = [...new Set(cat_arr.filter((item) => item !== ''))];
  uniqueCategories.unshift('All Events');

  const uniqueSeriesArray = series_arr.reduce<{ [key: string]: uniqueData }>(
    (acc, current) => {
      acc[current.name] = current;
      return acc;
    },
    {},
  );
  const uniqueSeries = Object.values(uniqueSeriesArray);
  uniqueSeries.unshift({ id:0, name: 'All Series' });

  const uniqueSponsorArray = sponsor_arr.reduce<{ [key: string]: uniqueData }>(
    (acc, current) => {
      acc[current.name] = current;
      return acc;
    },
    {},
  );
  const uniqueSponsor = Object.values(uniqueSponsorArray);
  uniqueSponsor.unshift({ id:0, name: 'All Sponsors' });

  const uniqueLocationArray = location_arr.reduce<{
    [key: string]: uniqueData;
  }>((acc, current) => {
    acc[current.name] = current;
    return acc;
  }, {});
  const uniqueLocation = Object.values(uniqueLocationArray);
  uniqueLocation.unshift({ id:0, name: 'All Locations' });

  const controlledData = {
    uniqueCategories,
    uniqueSeries,
    uniqueSponsor,
    uniqueLocation,
  };
  return controlledData;
}
