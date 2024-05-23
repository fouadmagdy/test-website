import React from 'react';
import Image from 'next/image';
import { GetServerUrl } from '@/lib/Networking';
import ChevronDouble from '@/components/icons/chevron-double-right';
import { format } from 'date-fns';
import { usePathname } from 'next/navigation';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

interface NewsArticle {
  targetPage: string;
  articles: {
    id: number;
    attributes: {
      title: string;
      date: string;
      body: string;
      createdAt: string;
      slug: string;
      image: {
        data: {
          id: number;
          attributes: {
            name: string;
            alternativeText: string;
            url: string;
          };
        };
      };
    };
  };
}

function NewsArticle({ articles, targetPage }: NewsArticle) {
  const pathName = usePathname();
  const [isImageLoading, setIsImageLoading] = React.useState(true);
  return (
    <div className="relative md:h-full py-5 group overflow-hidden rounded-xl hover:shadow-lg">
      <div className="h-96 static">
        {isImageLoading && (
          <Skeleton
            className="w-full h-full"
            baseColor="#fff"
            highlightColor="#ccc"
          />
        )}
        <Image
          src={
            GetServerUrl() + articles?.attributes.image?.data?.attributes?.url
          }
          alt={
            GetServerUrl() +
            articles?.attributes.image?.data?.attributes.alternativeText
          }
          priority
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover w-full h-full rounded-xl transition ease-in-out duration-300 group-hover:scale-100 opacity-0"
          onLoadingComplete={(image) => {
            image.classList.remove('opacity-0');
            setIsImageLoading(false);
          }}
          // loading="lazy"
        />
      </div>
      <a
        href={
          targetPage !== undefined
            ? pathName === '/'
              ? `/${targetPage}/${articles?.id}`
              : `${pathName}/${targetPage}/${articles?.id}`
            : ''
        }
      >
        <div className="absolute -bottom-10 left-0 right-0 mx-3 mb-8 z-1">
          <div className="bg-white p-5 rounded-xl shadow-sm hover:shadow-md parent group max-h-50">
            <h4 className="text-gray-950 py-0 border-spacing-2 border-s-2 border-primary ps-3 overflow-hidden group-hover:text-primary font-semibold line-clamp-1">
              {articles?.attributes?.title}
            </h4>
            <div>
              {/* Other content */}
              <p className="small-p text-gray-600 ps-3 transition-all duration-700 opacity-0 group-hover:opacity-100 group-hover:h-[3.3rem] h-0 line-clamp-3">
                {articles?.attributes?.body}
              </p>
              <div className="flex items-center justify-between pe-2">
                <p className="date  font-semibold text-primary ps-3">
                  {/* {articles?.attributes?.createdAt} */}
                  {articles?.attributes
                    ? format(
                        new Date(articles?.attributes?.createdAt),
                        'dd, MMM yyyy',
                      )
                    : ''}
                </p>
                <span className="text-secondary">
                  <ChevronDouble />
                </span>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}

export default NewsArticle;
