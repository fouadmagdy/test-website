import { useAppSelector } from '@/store/types';
import React from 'react';

/**
 * Renders a grid of program cards with images and content.
 * @returns JSX element representing the program cards grid.
 */
const ProgramsCards = () => {
  const Images = ['/Images/img1.jpg', '/Images/img2.jpg'];
  const locale = useAppSelector((state) => state.lang.locale);
  /**
   * An array of items, where each item has an id, title, and content.
   * @type {Array<Object>}
   */
  const items = [
    { id: 1, title: 'UNDERGRADUATE SCHOOLS', content: 'Content for Item 1' },
    { id: 2, title: 'Item 2', content: 'Content for Item 2' },
    { id: 3, title: 'Item 3', content: 'Content for Item 3' },
    { id: 4, title: 'Item 4', content: 'Content for Item 4' },
    { id: 5, title: 'Item 5', content: 'Content for Item 5' },
    { id: 6, title: 'Item 6', content: 'Content for Item 6' },
  ];

  return (
    <div className="md:max-w-[75%] m-auto py-20">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-16">
        {items.map((item, index) => (
          <div
            key={item.id}
            className="min-h-[250px] bg-cover bg-no-repeat -z-30 relative bg-secondary grid items-center justify-items-center"
            style={index ? { backgroundImage: `url("${Images[0]}")` } : {}}
          >
            <div>
              <div className="text-white p-4 z-20">
                <h2 className="text-2xl font-extrabold ">{item.title}</h2>
                <p>{item.content}</p>
                {!index ? (
                  <p className="border-2 border-white max-w-fit m-auto p-2 mt-auto">
                    {locale==='en'?'Apply Now':'قدم الآن'}
                  </p>
                ) : (
                  ''
                )}
              </div>
            </div>
            {index ? (
              <div className="bg-primary bg-opacity-50 absolute top-0 w-full h-[250px] -z-10"></div>
            ) : (
              ''
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgramsCards;
