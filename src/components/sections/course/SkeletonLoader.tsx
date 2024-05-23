import React from 'react'
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface IProps {

}

const SkeletonLoader: React.FC<IProps> = ({}) => {
    return(
        <div className="grid grid-rows-none gap-y-2 w-1/2 mx-auto mt-12 mb-12">
					<Skeleton className="row-start-1 h-16 bg-black text-white flex justify-between py-4 px-12 bg-darkHeader rounded-t-lg" baseColor="#bbb" />
					<div className="grid md:grid-cols-12 grid-cols-1 grid-rows-6 md:grid-rows-none md:gap-y-1 gap-y-0 gap-x-1">
						<div className="bg-darkCyan col-span-1 md:col-span-4 text-white font-semibold text-md rounded-lg">
							<Skeleton className="w-full h-full py-4 px-6" />
						</div>
						<div className="col-start-1 md:col-span-8 col-span-1 bg-lightCyan border-l-4 md:border-l-0 border-darkCyan">
							<Skeleton className="w-full h-full py-4 px-6" />
						</div>
						<div className="bg-darkCyan col-span-1 md:col-span-4 text-white font-semibold text-md mt-2 md:mt-0 rounded-lg">
							<Skeleton className="w-full h-full py-4 px-6" />
						</div>
						<div className="col-start-1 md:col-span-8 col-span-1 bg-lightCyan border-l-4 md:border-l-0 border-darkCyan">
							<Skeleton className="w-full h-full py-4 px-6" />
						</div>
						<div className="bg-darkCyan col-span-1 md:col-span-4 text-white font-semibold text-md mt-2 md:mt-0 rounded-lg">
							<Skeleton className="w-full h-full py-4 px-6" />
						</div>
						<div className="col-start-1 md:col-span-8 col-span-1 bg-lightCyan border-l-4 md:border-l-0 border-darkCyan">
							<Skeleton className="w-full h-full py-4 px-6" />
						</div>
						<div className="bg-darkCyan col-span-1 md:col-span-4 text-white font-semibold text-md mt-2 md:mt-0 rounded-lg">
							<Skeleton className="w-full h-full py-4 px-6" />
						</div>
						<div className="col-start-1 md:col-span-8 col-span-1 bg-lightCyan border-l-4 md:border-l-0 border-darkCyan">
							<Skeleton className="w-full h-full py-4 px-6" />
						</div>
						<div className="bg-darkCyan col-span-1 md:col-span-4 text-white font-semibold text-md mt-2 md:mt-0 rounded-lg">
							<Skeleton className="w-full h-full py-4 px-6" />
						</div>
						<div className="col-start-1 md:col-span-8 col-span-1 bg-lightCyan border-l-4 md:border-l-0 border-darkCyan">
							<Skeleton className="w-full h-full py-4 px-6" />
						</div>
						<div className="bg-darkCyan col-span-1 md:col-span-4 text-white font-semibold text-md mt-2 md:mt-0 rounded-lg row-auto md:row-span-2">
							<Skeleton className="w-full h-full py-4 px-6" />
						</div>
						<div className="col-start-1 md:col-span-8 col-span-1 bg-lightCyan border-l-4 md:border-l-0 border-darkCyan row-auto md:row-span-2">
							<Skeleton className="w-full h-full py-4 px-6" />
						</div>

					</div>
				</div>

    )
}


export default SkeletonLoader;