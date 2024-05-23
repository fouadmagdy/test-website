import { configureStore } from '@reduxjs/toolkit';
import lang from './langSlice';
import event from './eventSlice';
import schedule from './scheduleSlice';
// import school  from '@/store/schoolSlice';
// import schools  from '@/store/schoolsSlice';


/**
 * Creates a Redux store with the specified reducers and middleware.
 * @param {object} reducer - An object containing the reducers for the store.
 * @param {function} middleware - A function that returns the middleware for the store.
 * @returns The created Redux store.
 */
export const store = configureStore({
  reducer: {
    lang,
    event,
    schedule,
    // school,
    // schools
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;