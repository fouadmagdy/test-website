import Title, { LineType } from '@/components/shared/Title';
import React from 'react';

/**
 * Renders a component that displays the campus location of the institution.
 * @returns {JSX.Element} - The rendered component.
 */
const CampusLocation = () => {
  return (
    <div>
      <Title
        text={'Our Campus'}
        textColor={'text-primary'}
        fontSize={''}
        fontWeight={'font-bold'}
        line={LineType.Beside}
        lineColor={'before:bg-secondary'}
      />
      <div className="w-full h-96 pt-10">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3457.444718804991!2d31.068775!3d29.9378843!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x145851a1eb48c6ed%3A0x74319e1ab59b71a6!2sZewail%20City%20of%20Science%20and%20Technology!5e0!3m2!1sen!2seg!4v1690705828366!5m2!1sen!2seg"
          title="Zewail City of Science and Technology"
          className="w-full h-full"
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default CampusLocation;
