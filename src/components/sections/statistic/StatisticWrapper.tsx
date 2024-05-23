import React from 'react';
import { useColor } from '@/context/color.context';
import StatisticBox from './StatisticBox';

interface StatisticWrapperProps {
  content: {
    __component: string;
    title: string;
    description: string;
    statistics: {
      data: {
        id: number;
        attributes: {
          title: string;
          statisticNumber: number;
          IsParentage: boolean;
        };
      }[];
    };
  };
}

const StatisticWrapper: React.FC<StatisticWrapperProps> = ({ content }) => {
  const { color } = useColor();  
  const [ElementVisible, setElementVisible] = React.useState(false);
  const ElementRef = React.useRef<HTMLDivElement>(null);
  /**
   * Sets up an intersection observer to track the visibility of an element.
   * @returns None
   */
  React.useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      setElementVisible(entry.isIntersecting);
    });
    observer.observe(ElementRef.current!);
  }, []);

  return (
    <section
      id="statistic-section"
      className="bg-primary text-center justify-center m-auto py-10 
      px-4 sm:px-6 lg:px-8 xl:px-10
      
      sm:py-30 lg:py-60 xl:py-90
      text-white events-clipt"
      style={{
        backgroundColor: color ? color : 'bg-primary',
      }}
      ref={ElementRef}
    >
      <div className="grid grid-cols-1">
        <div className="flex flex-col">
          <h2 className="">{content.title}</h2>
          <hr className="my-4 h-0.5 w-48 lg:w-80 m-auto mb-4 bg-white"></hr>
        </div>
      </div>
      <p className="">{content.description}</p>
      <div className="container mx-auto pt-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {content.statistics.data.map((item) => (
            <StatisticBox
              key={item.id}
              statisticValueNumber={Number(item.attributes.statisticNumber)}
              statisticValueText={item.attributes.title}
              enableAnimation={ElementVisible}
              IsParentage={item.attributes.IsParentage}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatisticWrapper;
