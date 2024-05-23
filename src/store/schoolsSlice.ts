// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { RootState } from '.';
// import { SchoolsData } from '@/types/schools.types'; // Import the types

// // Define the thunk action to fetch schools data
// export const fetchSchools = createAsyncThunk<
//   SchoolsData[],
//   void,
//   { state: RootState }
// >('schools/fetchSchools', async (_, { rejectWithValue }) => {
//   try {
//     const response = await axios.get(
//       `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/schools?fields[0]=title&fields[1]=slug&fields[2]=color`,
//     );
//     return response.data.data; // Return the fetched schools data
//   } catch (error) {
//     return rejectWithValue('Error fetching schools data'); // Return an error message
//   }
// });

// // Define the initial state
// interface SchoolsState {
//   schools: SchoolsData[] ;
//   loading: boolean;
//   error: string | null;
// }

// const initialState: SchoolsState = {
//   schools: [],
//   loading: false,
//   error: null,
// };

// // Create a slice for managing schools data
// export const schoolsSlice = createSlice({
//   name: 'schools',
//   initialState,
//   reducers: {
//     schoolsData: (state) => {
//       state.schools = [];
//     },
//   },
//   extraReducers: (builder) => {
//     builder.addCase(fetchSchools.pending, (state) => {
//       state.loading = true;
//       state.error = null;
//     });
//     builder.addCase(
//       fetchSchools.fulfilled,
//       (state, action: PayloadAction<SchoolsData[]>) => { // Use SchoolsData type here
//         state.loading = false;
//         state.error = null;
//         state.schools = action.payload;
//       },
//     );
//     builder.addCase(fetchSchools.rejected, (state, action) => {
//       state.loading = false;
//       state.error = action.payload as string;
//       state.schools = [];
//     });
//   },
// });

// // Export actions and reducer
// export const { schoolsData } = schoolsSlice.actions;
// export default schoolsSlice.reducer;
