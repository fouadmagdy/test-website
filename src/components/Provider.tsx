'use client';
import { Provider } from 'react-redux';
import { store } from '@/store/index';
import { ReactNode } from 'react';

/**
 * Interface representing the props for a component.
 * @interface Props
 * @property {ReactNode} [children] - The children of the component.
 */
interface Props {
  children?: ReactNode;
  // any props that come into the component
}

/**
 * A functional component that wraps its children with a Redux store provider.
 * @param {Props} children - The child components to be wrapped.
 * @returns The wrapped components with the Redux store provider.
 */
const Providers = ({ children }: Props) => {
  return <Provider store={store}>{children}</Provider>;
};

export default Providers;
