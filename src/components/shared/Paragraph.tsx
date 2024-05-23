import { useAppSelector } from '@/store/types';
import React from 'react'
/**
 * Represents the properties for a paragraph component.
 * @interface ParagraphProps
 * @property {string} [infoText] - The informational text for the paragraph.
 * @property {string} [infoColor] - The color of the informational text.
 * @property {boolean} [redirect] - Indicates whether the paragraph should redirect.
 * @property {string} redirectColor - The color of the redirect text.
 * @property {string} redirectTo - The URL to redirect to.
 */
interface ParagraphProps {
    infoText?: string;
    infoColor?: string;
    redirect?:boolean;
    redirectColor:string;
    redirectTo?:string;
  }
  
  /**
   * A functional component that renders a paragraph with optional truncation and a "Read More" button.
   * @param {ParagraphProps} infoText - The text to display in the paragraph.
   * @param {string} infoColor - The color class to apply to the paragraph.
   * @param {boolean} [redirect=false] - Whether to truncate the text and show a "Read More" button.
   * @param {string} [redirectColor='text-default'] - The color class to apply to the "Read More" button.
   * @returns The rendered paragraph component.
   */
  const Paragraph: React.FC<ParagraphProps> = ({ infoText, infoColor, redirect=false,redirectColor='text-default'}) => {
    const locale = useAppSelector((state) => state.lang.locale);
    const truncatedInfo = infoText&&infoText.length>100 &&redirect?  infoText.slice(0, 100) + '...':infoText;

  return (
    <>
    <p className={`inline ${infoColor}`}>{truncatedInfo}</p>
        {infoText&&infoText.length>100 &&redirect && (
          <button className={`${redirectColor} font-bold  cursor-pointer`}>
            {locale==='en'?'Read More':'اقرأ المزيد'}
          </button>
        )}
    </>
  )
}

export default Paragraph