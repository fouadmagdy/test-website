import { PageData } from '@/types/PageData';
import { StrapiData } from '@/types/StrapiData';
import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit/dist/createAction';
import Cookies from 'js-cookie';
export interface LangState {
  locale: string;
  pageSource: string;
  pageData: StrapiData<PageData> | Record<string, never>;
}

/**
 * The initial state for the language slice of the Redux store.
 * @type {LangState}
 * @property {string} locale - The current locale/language.
 * @property {string} pageSource - The source of the page.
 * @property {object} pageData - Additional data related to the page.
 */
const initialState: LangState = {
  locale: 'en',
  pageSource: '',
  pageData: {},
};
const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    setLocale: (state, action: PayloadAction<string>) => {
      state.locale = action.payload;
    },
    getLocaleFromCookies: (state) => {
      const localeCookie = Cookies.get('locale');
      if (localeCookie) {
        state.locale = localeCookie;
      }
    },
  },
});

export const { setLocale, getLocaleFromCookies } = langSlice.actions;
export default langSlice.reducer;
