import Link from 'next/link';
import React from 'react';

/**
 * Represents the properties of an article.
 * @typedef {Object} Article_Props
 * @property {Object} content - The content of the article.
 * @property {string} content.title - The title of the article.
 * @property {string} content.firstParagraph - The first paragraph of the article.
 * @property {string} content.secondParagraph - The second paragraph of the article.
 * @property {Object} content.button - The button object.
 * @property {string} content.button.buttonText - The text displayed on the button.
 * @property {Object} content.button.buttonLink - The link object of the button.
 * @property {Object} content.button.buttonLink.data - The data object of the button link
 */
interface Article_Props {
  content: {
    title: string;
    firstParagraph: string;
    secondParagraph: string;
    button: {
      buttonText: string;
      buttonLink: {
        data: {
          attributes: { PageName: string };
        };
      };
    };
  };
  inSidebar:boolean;
}
/**
 * Functional component that renders an article with the given content.
 * @param {Article_Props} props - The props object containing the content to render.
 * @returns JSX element representing the article.
 */
const Article: React.FC<Article_Props> = ({ content , inSidebar }) => {
  return (
    <section className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 mx-auto py-4`}>
      {content.title && (
        <h2 className="text-3xl text-primary font-normal mb-4 border-s-4 border-gray-600 ps-5 rounded  ">
          {content.title}
        </h2>
      )}
      <div className="grid grid-cols-1 gap-4">
        <div className="flex flex-col">
          {content.firstParagraph ? (
            <article className="text-justify text-base text-gray-800 tracking-tight leading-7">
              {content.firstParagraph}
              {content.button ? (
                <Link
                  className="text-primary px-1 hover:text-cyan-900"
                  href={content?.button?.buttonLink?.data?.attributes?.PageName}
                >
                  {`${content.button.buttonText}...`}
                </Link>
              ) : null}
            </article>
          ) : null}
        </div>
        <div className="flex flex-col">
          {content.secondParagraph ? (
            <article className="text-justify text-sm text-gray-800 tracking-tight leading-7">
              {content.secondParagraph}
              {content.button ? (
                <Link
                  className="text-primary px-1 hover:text-cyan-900"
                  href={content?.button?.buttonLink?.data?.attributes?.PageName}
                >
                  {`${content?.button?.buttonText}...`}
                </Link>
              ) : null}
            </article>
          ) : null}
        </div>
      </div>
    </section>
  );
};

export default Article;
