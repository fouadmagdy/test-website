import { useDispatch, useSelector } from 'react-redux';
import type { TypedUseSelectorHook } from 'react-redux/es/types';
import { AppDispatch } from '.';
import { RootState } from './index';

/**
 * A custom hook that returns the dispatch function from the Redux store.
 * @returns {AppDispatch} The dispatch function from the Redux store.
 */
export const useAppDispatch: () => AppDispatch = useDispatch;
/**
 * A custom hook that provides type-safe access to the Redux store's state.
 * @template RootState - The type of the root state object.
 * @param {TypedUseSelectorHook<RootState>} useSelector - The useSelector function from the react-redux library.
 * @returns The selected state from the Redux store.
 */
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
