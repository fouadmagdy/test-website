import NewsArticle from './NewsArticle';
import SectionHeader from '../SectionHeader';
import styles from '../../../styles/news.module.css';
// import { StrapiArticle } from '@/types/StrapiArticle';
// import { MainSectionLink } from '@/types/MainSectionLink';
// import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
// import { Autoplay, Pagination } from 'swiper/modules';
// import { StrapiButton } from '@/types/StrapiData';

/**
 * Represents the data structure for a news item.
 * @interface NewsItemData
 * @property {number} id - The unique identifier of the news item.
 * @property {string} __component - The component type of the news item.
 * @property {string} title - The title of the news item.
 * @property {StrapiButton} [button] - Optional button data associated with the news item.
 * @property {Object[]} [news] - Optional array of news data associated with the news item.
 * @property {number} news[].data.id - The unique identifier of the news data.
 * @property {Object} news[].data.attributes - The attributes of the news data.
 */
interface NewsItemData {
  id: number;
  __component: string;
  sectionHeader: {
    id: 1;
    title: string;
    button: {
      id: 9;
      theme: string;
      link: {
        id: number;
        label: string;
        target: {
          data: {
            attributes: {
              slug: string;
            };
          };
        };
      };
    };
  };
  news: {
    data: {
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
    }[];
  };
  targetPage: {
    data: {
      attributes: {
        slug: string;
      };
    };
  };
}
/**
 * Represents the properties of a news component.
 * @interface NewsProps
 * @property {NewsItemData} content - The data of the news item.
 */
interface NewsProps {
  content: NewsItemData;
  inSidebar:boolean;
}
/**
 * A functional component that renders a news section with multiple news articles.
 * @param {NewsProps} content - The props containing the news content to display.
 * @returns The rendered news section component.
 */
const NewsWrapper = ({ content , inSidebar }: NewsProps) => {
  return (
    <section className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 m-auto`}>
      {/* Hide the 'desktop' div on screens smaller than lg */}
      <SectionHeader
        sectionTitle={content?.sectionHeader?.title}
        mainSectionLink={content?.sectionHeader?.button}
      />
        <div
          className={`${styles.gridWrapper} grid sm:grid-cols-12 md:gap-x-8 md:gap-y-8`}
        >
          <div className="mt-2 md:m-0 col-span-12 md:col-span-6 row-span-2">
            <NewsArticle articles={content?.news?.data[0]} targetPage={content.targetPage.data?.attributes?.slug}/>
          </div>
          <div className="mt-2 md:m-0 col-span-12 md:col-span-6 lg:col-span-3">
            <NewsArticle articles={content?.news?.data[1]} targetPage={content.targetPage.data?.attributes?.slug}/>
          </div>
          <div className="mt-2 md:m-0 col-span-12 md:col-span-6 lg:col-span-3">
            <NewsArticle articles={content?.news?.data[2]} targetPage={content.targetPage.data?.attributes?.slug}/>
          </div>
          <div className="mt-2 md:m-0 col-span-12 md:col-span-12 lg:col-span-6">
            <NewsArticle articles={content?.news?.data[3]} targetPage={content.targetPage.data?.attributes?.slug}/>
          </div>
        </div>
      {/* Show the 'mobile' div on screens smaller than lg */}
      {/* <div className="mobile block lg:hidden">
        <Swiper
          spaceBetween={10}
          autoplay={{
            delay: 5000,
            disableOnInteraction: true,
          }}
          breakpoints={{
            640: {
              slidesPerView: 2,
              centeredSlides: false,
              spaceBetween: 20,
            },
            768: {
              slidesPerView: 2,
              centeredSlides: false,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: 2,
              spaceBetween: 20,
            },
          }}
          navigation={true}
          modules={[Autoplay, Pagination]}
          className="mySwiper"
        >
          {content.articles.map((article, index) => (
            <SwiperSlide key={index} className="w-full">
              <div className="w-full">
                <NewsArticle articles={article} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div> */}
    </section>
  );
};

export default NewsWrapper;
