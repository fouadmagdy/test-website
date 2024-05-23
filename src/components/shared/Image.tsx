import React, { useState } from 'react';
import Image , {ImageProps} from 'next/image';

/**
 * Represents the properties for an image component with fallback.
 * @interface ImageWithFallbackProps
 * @property {string} src - The source URL of the image.
 * @property {string} fallbackSrc - The fallback source URL when the image fails to load.
 */
interface ImageWithFallbackProps extends ImageProps {
    src: string;
    fallbackSrc?: string;
}

/**
 * A functional component that renders an image with a fallback source.
 * @param {ImageWithFallbackProps} props - The properties of the image.
 * @returns The rendered image component.
 */
const ImageWithFallback = (props: ImageWithFallbackProps) => {
    const { src, alt, fallbackSrc, ...rest } = props;
    const [imgSrc, setImgSrc] = useState(src);

    return (
        <Image
            {...rest}
            alt={alt}
            src={imgSrc}
            onError={() => {
                setImgSrc(fallbackSrc || '');
            }}
            className='transition-opacity opacity-0 duration-100'
            onLoadingComplete={(image) => image.classList.remove('opacity-0')}
        />
    );
};

export default ImageWithFallback;
