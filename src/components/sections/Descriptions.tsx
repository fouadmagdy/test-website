import Title, { LineType } from '../shared/Title';
import LongParagraph from '../shared/LongParagraph'

/**
 * Interface representing a property object.
 * @interface IProp
 * @property {object} content - The content of the property.
 * @property {string} content.description - The description of the property.
 */
interface IProp {
    content: {
        title: string,
        descriptions:
        {
            id: number,
            title: string,
            description: string,
        }[],
    };
}

/**
 * Renders a component that displays a grid of icon boxes with titles and links.
 * @param {IProp} content - The content object containing the data for the icon boxes.
 * @returns The rendered IconBox component.
 */
function Descriptions({ content }: IProp) {
    return (
            <div className="" >
                <Title
                    text={content.title}
                    textColor="text-primary"
                    fontSize=""
                    fontWeight=""
                    line={LineType.None} // Set the line type using the enum
                    lineColor="md:after:bg-grey_dark"
                />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    {content.descriptions.map((dec, index) => <div className="pe-4" key={index}>
                        <h4 className='text-softBlack'>{dec.title}</h4>
                        <p><LongParagraph text={dec.description}/></p>
                    </div>)}

                </div>
            </div>
    );
}

export default Descriptions;
