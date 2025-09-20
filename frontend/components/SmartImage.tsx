'use client';

import { useState, useEffect } from 'react';
import PlaceholderImage from './PlaceholderImage';

interface SmartImageProps {
    src: string;
    alt: string;
    className?: string;
    onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
}

export default function SmartImage({
    src,
    alt,
    className = '',
    onError
}: SmartImageProps) {
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        // Reset error state when the src changes
        if (src) {
            setIsError(false);
        }
    }, [src]);

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setIsError(true);
        if (onError) {
            onError(e);
        }
    };

    return (
        <div className={`smart-image-container ${className}`}>
            {(!src || isError) ? (
                <PlaceholderImage alt={alt} />
            ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                    src={src}
                    alt={alt}
                    className="w-full h-full object-cover"
                    onError={handleError}
                />
            )}
        </div>
    );
}
