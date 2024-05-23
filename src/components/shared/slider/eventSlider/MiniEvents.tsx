import * as React from 'react';
import MiniEventCard from './MiniEventCard';
import { useEffect, useState } from 'react';
import axios from 'axios';

interface IMinEventsProps {
  content: {
    id: number;
    __component: string;
    title: string;
    content: {
      data: {
        attributes: {
          url: string | undefined;
          needToEdit: boolean;
        };
      };
    };
    daysRange: number;
    targetPage: {
      data: {
        attributes: {
          slug: string;
        };
      };
    };
  };
}

interface SlideData {
  data: {
    id: number;
    attributes: {
      title: string;
      date: string;
      endDate: string;
      locale: string;
      description: string;
      slug: string;
      images: {
        data: [
          {
            id: number;
            attributes: {
              alternativeText: string;
              url: string;
            };
          },
        ];
      };
    };
  }[];
}

const MiniEvents: React.FunctionComponent<IMinEventsProps> = ({
  content,
}: IMinEventsProps) => {
  const [fetchedData, setFetchedData] = useState<SlideData>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        let apiUrl = content?.content?.data?.attributes?.url;

        if (content?.content?.data?.attributes?.needToEdit) {
          apiUrl = apiUrl?.replace(
            'days',
            content?.daysRange as unknown as string,
          );
        }

        if (apiUrl) {
          const res = await axios.get<SlideData>(apiUrl);
          setFetchedData(res.data);
        }
      } catch (error) {}
    };

    fetchData();
  }, [content]);

  return (
    <div className="col-span-12 lg:col-span-4 rounded pr-8 container">
      <h2 className=" text-3xl font-bold text-start text-title mb-4">
        Upcoming Events
      </h2>
      <div className="grid gap-2 grid-cols-1 lg:grid-cols-2 xl:grid-cols-3  auto-rows-min">
        {fetchedData?.data.map((event) => {
          return (
            <div key={event.id}>
              <MiniEventCard
                {...event}
                targetPage={content?.targetPage?.data?.attributes?.slug}
                // isFixedHeight={true}
              />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default MiniEvents;
