import React from 'react';

/**
 * Renders a search bar component.
 * @returns {JSX.Element} - The rendered search bar component.
 */
function SearchBar(): JSX.Element {
  return (
    <div className="flex-wrap items-center p-4 pe-0 lg:ps-8 inline-flex xs:p-0 ps-0">
      <div className="flex ">
        
        <div className="relative block ">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              className="w-4 h-4 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only ">Search icon</span>
          </div>
          <input
            type="text"
            id="search-navbar"
            className="block p-1.5 pl-10 pe-0 text-sm text-black border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-black dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder:text-sm"
            placeholder="Search..."
          />
        </div>
        {/* <button
          data-collapse-toggle="navbar-search"
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
          aria-controls="navbar-search"
          aria-expanded="false"
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button> */}
      </div>
    </div>
  );
}

export default SearchBar;
