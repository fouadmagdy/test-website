// import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
// import axios from 'axios';
// import { RootState } from '.';
// import { School, Datum, SchoolResponse } from '@/types/school.types';

// // Define the thunk action to fetch schools data
// export const fetchSchool = createAsyncThunk<School[], string, { rejectValue: string; state: RootState }>(
//   'school/fetchSchool',
//   async (slug, { rejectWithValue }) => {
//     try {
//       const response = await axios.get<SchoolResponse>(
//         `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/schools?filters[slug]=${slug}&fields[0]=title&fields[1]=slug&fields[2]=color&fields[3]=description&populate[logo][fields][0]=url&populate[banner][fields][0]=url&populate[programs][fields][0]=title&populate[programs][fields][1]=slug&populate[programs][fields][2]=programType&populate[programs][populate][0]=media`
//       );

//       // Extracting attributes from the response data array and returning an array of schools
//       const schools: School[] = response.data.data.map((item: Datum) => item.attributes);
//       return schools;
//     } catch (error) {
//       return rejectWithValue('Error fetching schools data');
//     }
//   }
// );

// // Define the initial state
// interface SchoolState {
//   school: School[] | null; // Change the state to accept an array of schools or null
//   loading: boolean;
//   error: string | null;
// }

// // Adjust the initial state to reflect the changes
// const initialState: SchoolState = {
//   school: null, // Initialize as null to match the state type
//   loading: true,
//   error: null,
// };

// export const schoolSlice = createSlice({
//   name: 'school',
//   initialState,
//   reducers: {
//     setSchool: (state, action: PayloadAction<School[] | null>) => { // Rename setSchool to setSchools
//       state.school = action.payload;
//       state.loading = false;
//       state.error = null;
//     },
//     setLoading: (state, action: PayloadAction<boolean>) => {
//       state.loading = action.payload;
//     },
//     setError: (state, action: PayloadAction<string>) => {
//       state.error = action.payload;
//       state.loading = false;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchSchool.pending, (state) => {
//         state.loading = true;
//         state.error = null;
//       })
//       .addCase(fetchSchool.fulfilled, (state, action) => {
//         state.loading = false;
//         state.error = null;
//         state.school = action.payload;
//       })
//       .addCase(fetchSchool.rejected, (state, action) => {
//         state.loading = false;
//         state.error = action.payload as string;
//         state.school = null; // Update to match the state type
//       });
//   },
// });

// export const { setSchool, setLoading, setError } = schoolSlice.actions; // Update action names
// export default schoolSlice.reducer;
