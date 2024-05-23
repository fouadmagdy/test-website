import { useColor } from '@/context/color.context';
import React from 'react';
/**
 * An enumeration representing different types of lines.
 */
export enum LineType {
  None = 'none',
  UnderFull = 'under_full',
  Under = 'under',
  Before = 'before',
  Beside = 'beside',
  Center = 'center',
}

/**
 * Represents the properties for a title component.
 * @interface TitleProps
 * @property {string} text - The text content of the title.
 * @property {string} textColor - The color of the title text.
 * @property {string} fontSize - The font size of the title text.
 * @property {string} fontWeight - The font weight of the title text.
 * @property {LineType} line - The type of line to display below the title.
 * @property {string} lineColor - The color of the line below the title.
 * @property {string} [className] - The optional CSS class name for the title component.
 * @property {string} [id] - The optional HTML id attribute
 */
interface TitleProps {
  text: string;
  textColor: string;
  fontSize: string;
  fontWeight: string;
  // line: string;
  line: LineType; // Use the LineType enum here
  lineColor: string;
  lineWieght?: string;
  // lineWidth: string;
  // lineHeight?: string;
  className?: string;
  id?: string;
}

/**
 * A React functional component that renders a title with various styling options.
 * @param {TitleProps} props - The props object containing the following properties:
 *   - text: The text to display as the title.
 *   - textColor: The color of the title text.
 *   - fontSize: The font size of the title text.
 *   - fontWeight: The font weight of the title text.
 *   - line: The type of line to display below or around the title.
 *   - lineColor: The color of the line.
 *   - className: Additional CSS classes to apply to the title element.
 *   - id: The ID of the title element.
 * @returns A React element representing the title.
 */
const Title: React.FC<TitleProps> = ({
  text,
  textColor,
  fontSize,
  fontWeight,
  line,
  lineColor,
  lineWieght,
  className,
  id,
  // lineColor,
}) => {
  const { color } = useColor();

  {
    /* under full width */
  }
  if (line == 'under_full') {
    const weight = lineWieght ? `border-b-[${lineWieght}px]` : 'border-b-[4px]';
    return (
      <h2
        className={` inline-block ${textColor} ${weight} ${fontSize} ${fontWeight} border-grey_dark ${className}`}
        style={{
          color: color ? color : '',
        }}
      >
        {text}
      </h2>
    );
  }
  {
    /* under with width */
  }
  if (line == 'under') {
    const weight = lineWieght ? `after:h-[${lineWieght}px]` : 'after:h-[2px]';

    return (
      <h2
        style={{
          color: color ? color : '',
        }}
        className={` w-fit after:block after:w-[100px]  ${lineColor}  ${weight} ${textColor} ${fontSize} ${fontWeight} ${className}`}
      >
        {text}
      </h2>
    );
  }
  if (line == 'center') {
    const weight = lineWieght ? `after:h-[${lineWieght}px]` : 'after:h-[5px]';
    return (
      <h2
        style={{
          color: color ? color : '',
        }}
        className={` w-fit after:block after:w-[30%] after:bg-grey_dark ${textColor} ${weight} ${fontSize} ${fontWeight} ${className} after:m-auto after:mt-4`}
      >
        {text}
      </h2>
    );
  }

  {
    /* before full width */
  }
  if (line == 'before') {
    const weight = lineWieght ? `border-s-[${lineWieght}px]` : 'border-s-[4px]';

    return (
      <h2
        style={{
          color: color ? color : '',
        }}
        className={` flex items-center  pt-1  px-4 ${textColor} ${fontSize} ${fontWeight} ${weight} border-grey_dark ${lineColor} ${className}`}
      >
        {text}
      </h2>
    );
  }
  {
    /* after inline  */
  }
  if (line == 'beside') {
    return (
      <h2
        style={{
          color: color ? color : '',
        }}
        className={`${
          className ?? ''
        }  relative after:md:ms-5 after:w-0 after:inline-block after:md:w-[15%] after:md:h-[4px] after:bg-grey_dark   ${textColor} ${fontSize} ${fontWeight} border-grey_dark after:top-1/2 after:translate-y-1/2 after:absolute`}
      >
        {text}
      </h2>
    );
  } else
    return (
      <h2
        style={{
          color: color ? color : '',
        }}
        id={id}
        className={`${textColor} ${lineWieght} ${fontSize} ${fontWeight} ${className} `}
      >
        {text}
      </h2>
    );
};

export default Title;
