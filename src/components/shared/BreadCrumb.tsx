import Link from 'next/link';
import React from 'react';

/**
 * Represents the interface for the Props object.
 * @interface Props
 * @property {Array<{ label: string; url: string }>} links - An array of objects containing
 * the label and URL of each link.
 */
interface Props {
  links: { label: string; url: string }[];
}

/**
 * Renders a breadcrumb navigation component.
 * @param {Props} links - An array of objects representing the links in the breadcrumb.
 * @returns The rendered breadcrumb navigation component.
 */
function BreadCrumb({ links }: Props) {
  return (
    <nav
      className="bg-secondary_light   py-5 pl-4 pr-7 font-bold text-white shadow-md inline-flex"
      aria-label="Breadcrumb"
    >
      <ol className="inline-flex items-center space-x-1 md:space-x-3">
        {links.map((link, index) => (
          <li key={index} className="inline-flex items-center">
            <div className="flex items-center">
              {index !== 0 && <span className="mr-2">/</span>}
              <Link
                href={link.url}
                className="inline-flex items-center text-base hover:cursor-pointer"
              >
                {index === 0 && (
                  <svg
                    className="w-4 h-4 mr-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                )}
                {link.label}
              </Link>
            </div>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default BreadCrumb;
