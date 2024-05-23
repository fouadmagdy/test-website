import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { DateRange } from 'react-day-picker';

interface EventFilters {
  // [key: string]: any,
  categories: string;
  uniqueSponsor: string;
  uniqueSeries: string;
  uniqueLocation: string;
  selectedDateRange: DateRange | undefined;
}

export interface EventState {
  selectedCustomDateRange: DateRange | undefined;
  eventFilters: EventFilters;
  singleDate: Date | undefined;
}

const initialState: EventState = {
  eventFilters: {
    categories: 'All Events',
    uniqueSponsor: 'All Sponsors',
    uniqueSeries: 'All Series',
    uniqueLocation: 'All Locations',
    selectedDateRange: undefined,
  },
  singleDate: new Date(),
  selectedCustomDateRange: { from: new Date(), to: new Date() },
};

/**
 * Creates a Redux slice for managing the 'event' state.
 * @param {object} config - The configuration object for creating the slice.
 * @param {string} config.name - The name of the slice.
 * @param {object} config.initialState - The initial state of the slice.
 * @param {object} config.reducers - The reducer functions for the slice.
 * @returns {object} - The created Redux slice.
 */
const eventSlice = createSlice({
  name: 'event',
  initialState,
  reducers: {
    setEventFilters: (state, action: PayloadAction<EventFilters>) => {
      state.eventFilters = action.payload;
      state.singleDate = undefined;
    },
    setCustomDateRange: (
      state,
      action: PayloadAction<DateRange | undefined>,
    ) => {
      state.singleDate = undefined;
      state.selectedCustomDateRange = action.payload;
      state.eventFilters.selectedDateRange = undefined;
    },
    setSingleDateRange: (state, action: PayloadAction<Date | undefined>) => {
      state.selectedCustomDateRange = undefined;
      state.eventFilters.selectedDateRange = undefined;
      state.singleDate = action.payload;
    },
  },
});

export const { setEventFilters, setCustomDateRange, setSingleDateRange } =
  eventSlice.actions;
export default eventSlice.reducer;
