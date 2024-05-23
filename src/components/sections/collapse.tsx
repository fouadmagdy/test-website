import React from 'react';
import { Accordion } from 'flowbite-react';
import { AccordionPanel } from 'flowbite-react/lib/esm/components/Accordion/AccordionPanel';
import { AccordionTitle } from 'flowbite-react/lib/esm/components/Accordion/AccordionTitle';
import { AccordionContent } from 'flowbite-react/lib/esm/components/Accordion/AccordionContent';
import { useColor } from '@/context/color.context';
import AdvancedRichText from './AdvancedRichText';

interface CollapseProps {
  content: {
    id: number;
    title?: string;
    items: {
      id: number;
      title: string;
      description: string;
    }[];
  };
  inSidebar:boolean;
}

function Collapse({ content , inSidebar }: CollapseProps) {
  const { color } = useColor(); // Consume the color from the context

  return (
    <section className={`${inSidebar ? '' : 'sm:container'} px-1 sm:p-0 leading-loose ps-0`}>
      {content.title && (
        <h2
          className="text-primary font-bold text-2xl my-4 my"
          style={{
            color: color ? color : 'primary',
          }}
        >
          {content.title}
        </h2>
      )}
      <Accordion className="w-full">
        {content.items.map((item) => (
          <AccordionPanel key={item.id}>
            <AccordionTitle className="text-gray-900 py-3">
              <h5 className="h5">{item.title}</h5>
            </AccordionTitle>
            <AccordionContent>
              <AdvancedRichText
                content={{
                  advancedRichText: item.description,
                }}
              />
            </AccordionContent>
          </AccordionPanel>
        ))}
      </Accordion>
    </section>
  );
}

export default Collapse;
