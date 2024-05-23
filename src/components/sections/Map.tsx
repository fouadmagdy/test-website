import React from 'react';
interface Map_Props {
  content: {
    location: {
      id: number;
      locationName: string;
      googleMapLink: string;
    };
  };
}
import Title, { LineType } from '../shared/Title';

function Map({ content }: Map_Props) {
  return (
    <div className="map -mb-18">
      <div className="mb-5 w-1/2">
        <Title
          text={content.location.locationName}
          textColor={'text-primary'}
          fontSize={''}
          fontWeight={''}
          line={LineType.Before}
          lineColor={'before:bg-secondary'}
          id="section-title"
          aria-labelledby="section-title"
          className=" leading-tight "
        />
      </div>
      <iframe
        className="transition-opacity opacity-0 duration-100 mb-2"
        src={content.location.googleMapLink!}
        width="100%"
        height="700"
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
}

export default Map;
