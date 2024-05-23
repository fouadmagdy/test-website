import Link from 'next/link'
import React from 'react'
import { MdOutlineKeyboardDoubleArrowRight,MdOutlineKeyboardDoubleArrowLeft } from 'react-icons/md';
import { useAppSelector } from '@/store/types';
/**
 * Represents an interface for a property object.
 * @interface IProp
 * @property {string} PageName - The name of the page.
 */
interface IProp {
    PageName: string
}
/**
 * A React functional component that renders a "Read More" button.
 * @param {IProp} props - The component props.
 * @param {string} props.PageName - The name of the page to link to.
 * @returns The rendered "Read More" button component.
 */
const ReadMoreBtn: React.FC<IProp> = ({ PageName }) => {
    const locale = useAppSelector((state) => state.lang.locale);
    return (
        <span className='text-primary inline-flex flex group items-center gap-1 hover:gap-3  hover:text-secondary  transition-all delay-75'>
            <Link className='' href={PageName}>{locale==='en'?'Read More':'اقرأ المزيد'}</Link>
            {locale==='en'?
            <MdOutlineKeyboardDoubleArrowRight size={20} />
            :<MdOutlineKeyboardDoubleArrowLeft size={20} />
            }      
        </span>
    )
}

export default ReadMoreBtn