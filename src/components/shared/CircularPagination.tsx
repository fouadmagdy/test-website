'use client';
import React, { useEffect } from 'react';
import { Button, IconButton } from '@material-tailwind/react';
import { useAppSelector } from '@/store/types';
/**
 * Represents the props for a pagination component.
 * @interface PaginationProps
 * @property {number} pagesNumber - The total number of pages.
 * @property {(id: number) => void} setActivePage - A function to set the active page.
 */
interface PaginationProps {
  pagesNumber: number;
  setActivePage: (id: number) => void;
}
/**
 * A circular pagination component for React.
 * @param {PaginationProps} props - The pagination props.
 * @param {number} props.pagesNumber - The total number of pages.
 * @param {Function} props.setActivePage - A function to set the active page.
 * @returns A React functional component that renders a circular pagination.
 */
const CircularPagination: React.FC<PaginationProps> = ({
  pagesNumber,
  setActivePage,
}) => {
  const locale = useAppSelector((state) => state.lang.locale);
  const [active, setActive] = React.useState(1);

  /**
   * Returns an object containing the properties for an item based on the given index.
   * @param {number} index - The index of the item.
   * @returns {Object} An object containing the properties for the item.
   */
  const getItemProps = (index:number) =>
    ({
      variant: active === index ? 'filled' : 'text',
      color: 'gray',
      onClick: () => setActive(index),
      className: 'bg-primary text-white ',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    }) as any;

  const next = () => {
    if (active === 5) return;

    setActive(active + 1);
  };

  const prev = () => {
    if (active === 1) return;

    setActive(active - 1);
  };
  /**
   * useEffect hook that updates the active page when the 'active' prop changes.
   * @param {number} active - The currently active page.
   * @param {function} setActivePage - The function to set the active page.
   * @returns None
   */
  useEffect(() => {
    setActivePage(active);
  }, [active, setActivePage]);
  const pageNumbers = Array.from(
    { length: pagesNumber },
    (_, index) => index + 1,
  );

  return (
      <div className="flex items-center mt-5 gap-4 justify-center pt-10">
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={prev}
          disabled={active === 1}
        >
          {locale==='en'?'Previous':'السابق'}
        </Button>
        <div className="flex items-center gap-2">
          {pageNumbers.map((pageNumber) => (
            <IconButton
              key={pageNumber}
              {...getItemProps(pageNumber)}
              className={
                pageNumber == active ? 'bg-secondary' : 'bg-primary text-white'
              }
            >
              {pageNumber}
            </IconButton>
          ))}
        </div>
        <Button
          variant="text"
          className="flex items-center gap-2 rounded-full"
          onClick={next}
          disabled={active === 5}
        >
          {locale==='en'?'Next':'التالي'}
        </Button>
      </div>
  );
};

export default CircularPagination;
