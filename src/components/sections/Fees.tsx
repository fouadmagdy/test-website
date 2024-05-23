import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

/**
 * Renders a component that displays information about tuition fees and scholarships.
 * @returns JSX element
 */
function Fees() {
  return (
    <div className="sm:container mx-auto px-12">
      <div className="grid sm:grid-cols-12">
        <div className="sm:col-span-12 lg:col-span-3 xl:col-span-4 mx-auto mb-5">
          <div className="relative w-80 h-80 lg:mb-9">
            <div className="absolute z-10 -left-4 xl:-right-14">
              <Image
                src="https://via.placeholder.com/400x400"
                decoding="async"
                alt="some alt text"
                width={400}
                height={400}
                className="object-cover transition-opacity opacity-0 duration-100"
                onLoadingComplete={(image) => image.classList.remove('opacity-0')}
              />
            </div>
          </div>
        </div>
        <div className="sm:col-span-12 lg:col-span-9 xl:col-span-8 lg:ps-28 lg:mt-9 xl:ps-10 bg-gray-100 mx-auto p-4 ">
          <h2 className="text-primary   resposive-head font-semibold py-1 mb-3">
            tuition fees and scholarships
          </h2>
          <Link
            href="/acadimic"
            className=" py-1 text-black resposive-paragraph"
          >
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas,
            ut suscipit nesciunt unde perferendis dignissimos, consequuntur
            exercitationem quidem molestiae molestias optio sed mollitia
            consectetur qui obcaecati aliquam aliquid porro voluptatum! Lorem
            ipsum dolor sit amet consectetur adipisicing elit. Voluptas, ut
            suscipit nesciunt unde perferendis dignissimos, consequuntur
            exercitationem quidem molestiae molestias optio sed mollitia
            consectetur qui obcaecati aliquam aliquid porro voluptatum!
            <Link
              href="/acadimic"
              className="text-sky-500 hover:text-sky-600 m-2 p-1 hover:underline"
            >
              Read More &rarr;
            </Link>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Fees;
