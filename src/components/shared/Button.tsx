import { useColor } from '@/context/color.context';
import React from 'react';
import { MdOutlineKeyboardDoubleArrowRight , MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { useAppSelector } from '@/store/types';

/**
 * Represents the properties of a button component.
 * @interface ButtonProps
 * @property {string} [text] - The text content of the button.
 * @property {string} [backgroundColor] - The background color of the button.
 * @property {string} [fontSize] - The font size of the button text.
 * @property {string} [fontBold] - The font weight of the button text.
 */
interface ButtonProps {
  text?: string;
  backgroundColor?: string;
  fontSize?: string;
  fontBold?: string;
}

/**
 * A functional component that renders a button with customizable properties.
 * @param {ButtonProps} props - The properties of the button.
 * @param {string} props.text - The text to display on the button.
 * @param {string} props.backgroundColor - The background color of the button.
 * @param {string} props.fontSize - The font size of the button text.
 * @param {string} props.fontBold - The font weight of the button text. If not provided, defaults to 'md:font-bold'.
 * @returns The rendered button component.
 */
const Button: React.FC<ButtonProps> = ({
  text,
  backgroundColor,
  fontSize,
  fontBold,
}) => {
  const { color } = useColor();
  const locale = useAppSelector((state) => state.lang.locale);
  return (
    <div
    style={{
      backgroundColor: color ? color : `${backgroundColor}`,
    }}
      className={`bg-primary group text-white rounded-md text-center flex gap-2 md:gap-4 items-center max-w-fit px-2 md:px-4 py-1 md:py-2 duration-500 ease-in-out hover:bg-secondary`}
    >
      <span
        className={`${fontSize?? 'md:text-lg'} tracking-wide ${
          fontBold ?? 'md:font-semibold'
        }`}
      >
        {text}
      </span>
      
      {locale==='en'?<MdOutlineKeyboardDoubleArrowRight className={`group-hover:translate-x-1 transition-transform transform duration-500 ease-in-out`} size={30} />
                    :<MdOutlineKeyboardDoubleArrowLeft className={`group-hover:translate-x-1 transition-transform transform duration-500 ease-in-out`} size={30} />}
    </div>
  );
};

export default Button;
