'use client';
import { createContext } from 'react';
/**
 * The GlobalContent type represents an object with a locale property of type string.
 * @property {string} locale - The `locale` property represents the language and region settings for
 * the content. It is typically represented as a string, such as "en-US" for English (United States) or
 * "fr-FR" for French (France).
 */
export type GlobalContent = {
  locale: string;
};
/* The code `export const LangContext = createContext<GlobalContent>({ locale: 'en' });` is creating a
context object called `LangContext` using the `createContext` function from the `react` library. */
export const LangContext = createContext<GlobalContent>({
  locale: 'en',
});
