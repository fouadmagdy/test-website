import React from 'react'
import { MdKeyboardDoubleArrowRight } from 'react-icons/md';

export default function page() {
  return (
    <div className="container py-10">
        <h1 className='text-primary'><span className="text-secondary">H1:</span> Zewail City Luminary Dr. Salah Obayya is Recognized by the largest professional society as the foremost pioneer of photonics</h1>
        <hr/>
        <h2 className='text-primary'><span className="text-secondary">H2:</span> Zewail City Luminary Dr. Salah Obayya is Recognized by the largest professional society as the foremost pioneer of photonics</h2>
        <hr/>
        <h3 className='text-primary'><span className="text-secondary">H3:</span> Zewail City Luminary Dr. Salah Obayya is Recognized by the largest professional society as the foremost pioneer of photonics</h3>
        <hr/>
        <h4 className='text-primary'><span className="text-secondary">H4:</span> Egyptian Institution With International Standards</h4>
        <hr/>
        <h5 className='text-primary'><span className="text-secondary">H5:</span> Egyptian Institution With International Standards</h5>
        <hr/>
        <h6 className='text-primary'><span className="text-secondary">H6:</span> Egyptian Institution With International Standards</h6>
        <hr/>
        <p><span className="text-secondary">p:</span> Lorem ipsum dolor sit amet consectetur adipisicing elit. Commodi nam delectus hic harum deserunt, molestias voluptate nemo nihil obcaecati distinctio?</p>
        <hr/>
        <hr/>
        <hr/>
        <h1 >Buttons</h1>

        <div className="flex flex-col gap-3">
          <button
            className="px-2 md:px-4 py-1 md:py-2 text-primary group hover:bg-secondary hover:text-white duration-500 ease-linear transform border-2 rounded-md flex gap-3 items-center w-fit border-primary hover:border-white"
          >
            Read More
            <MdKeyboardDoubleArrowRight />
          </button>
          <button
            className={`basis-1/6 text-white group bg-primary text-sm rounded-full text-center flex gap-3 items-center max-w-fit px-2 md:px-4 py-1 md:py-2 hover:bg-secondary duration-500 ease-linear transform cursor-pointer`}
              >
            Read More
            <MdKeyboardDoubleArrowRight />
          </button>
          <button
            className={`bg-primary group text-white rounded-md text-center flex gap-2 md:gap-4 items-end max-w-fit px-2 md:px-4 py-1 md:py-2 duration-500 ease-in-out hover:bg-secondary`}
          >
              <span
                className='tracking-wide translate-y-[-3px] md:font-semibold'>
                Read More
              </span>
              
              <MdKeyboardDoubleArrowRight className={`group-hover:translate-x-1 transition-transform transform duration-500 ease-in-out`} size={30} />
            </button>

        </div>
    </div>
  )
}
