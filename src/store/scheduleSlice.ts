import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import { DateRange } from 'react-day-picker';


export interface ScheduleState {
  filterType:string;
  currentAcademicYear:string |number | undefined;
  academicYear: string |number | undefined;
  currentYear: string | undefined;
  year: string | undefined;
  selectedDateRange: DateRange | undefined;
  singleDate: Date | undefined;
  filterDate: boolean;
  month: Date;
};

const initialState: ScheduleState = {
  filterType:'',
  academicYear: '',
  currentAcademicYear:'',
  currentYear:'',
  year: '',
  singleDate: new Date(),
  selectedDateRange: undefined,
  filterDate:false,
  month:new Date()
};

/**
 * Creates a Redux slice for managing the 'schedule' state.
 * @param {object} config - The configuration object for creating the slice.
 * @param {string} config.name - The name of the slice.
 * @param {object} config.initialState - The initial state of the slice.
 * @param {object} config.reducers - The reducer functions for the slice.
 * @returns {object} - The created Redux slice.
 */
const scheduleSlice = createSlice({
  name: 'schedule',
  initialState,
  reducers: {
    setFilterType: (state, action: PayloadAction<string>) => {
      state.filterType = action.payload;
    },
    setSelectedDateRange: (state, action: PayloadAction<DateRange | undefined>) => {
      state.selectedDateRange = action.payload;
      state.singleDate = undefined;
      state.filterDate = true;
    },
    setSingleDateRange: (state, action: PayloadAction<Date | undefined>) => {
      state.singleDate = action.payload;
      state.filterDate = true;
    },
    setAcademicYear: (state, action: PayloadAction<string | number | undefined>) => {
      state.academicYear = action.payload;
      state.singleDate = undefined;
      state.filterDate = false;
    },
    setCurrentAcademicYear: (state, action: PayloadAction<string | number | undefined>) => {
      state.currentAcademicYear = action.payload;
    },
    setCurrentYear: (state, action: PayloadAction<string | undefined>) => {
      state.currentYear = action.payload;
    },
    setYear: (state, action: PayloadAction<string | undefined>) => {
      state.year = action.payload;
      state.singleDate = undefined;
      state.filterDate = false;
    },
    setMonth: (state, action: PayloadAction<Date>) => {
      state.month = action.payload;
    },
  },
});

export const { setSingleDateRange, setYear, setAcademicYear, setCurrentYear,setCurrentAcademicYear, setSelectedDateRange ,setFilterType , setMonth} =
  scheduleSlice.actions;
export default scheduleSlice.reducer;
