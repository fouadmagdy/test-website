import { PageHyperlink } from '@/types/PageHyperlink';
import Link from 'next/link';

/**
 * Represents the props for a two-column information list component.
 * @interface TwoColInfoListProps
 * @property {Object[]} content - The content of the component.
 * @property {string} content.title - The title of the information list.
 * @property {string} content.description - The description of the information list.
 * @property {Object[]} content.button - The buttons in the information list.
 * @property {number} content.button.id - The ID of the button.
 * @property {string} content.button.buttonText - The text of the button.
 * @property {PageHyperlink} content.button.buttonLink - The link of the button.
 */
interface TwoColInfoListProps {
  content: {
    title: string;
    description: string;
    button: {
      id: number;
      buttonText: string;
      buttonLink: PageHyperlink;
    }[];
  };
  inSidebar:boolean;
}
/**
 * Renders a two-column information list component.
 * @param {TwoColInfoListProps} props - The props object containing the content for the component.
 * @returns The rendered JSX element of the two-column information list.
 */
const TwoColInfoList = ({ content , inSidebar }: TwoColInfoListProps) => {
  return (
    <section className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 my-10 mx-auto flex gap-10 flex-col-reverse lg:flex-row items-center lg:items-start`}>
      <ul className="border-t-[10px] border-orange-400 w-72 min-[400px]:w-96 flex-shrink-0">
        {content.button.map((link, idx: number) => (
          <li
            className="hover:bg-orange-400 duration-500 h-14 py-auto w-full  bg-gray-200"
            key={idx}
          >
            <Link
              className="text-base lg:text-xl block flex items-center font-bold ps-5 text-lg w-full h-full"
              href={link?.buttonLink?.data?.attributes?.PageName}
            >
              {link?.buttonText.charAt(0) + link?.buttonText.slice(1)}
            </Link>
          </li>
        ))}
      </ul>
      <div className="flex flex-col items-center lg:items-start px-2">
        <h2 className="font-bold mb-3 text-primary text-wrap">
          {content.title}
        </h2>
        <p className="text-base lg:text-2xl">{content.description}</p>
      </div>
    </section>
  );
};

export default TwoColInfoList;
