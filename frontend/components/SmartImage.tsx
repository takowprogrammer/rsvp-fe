'use client';

import { useState, useEffect } from 'react';
import PlaceholderImage from './PlaceholderImage';

interface SmartImageProps {
    src: string;
    alt: string;
    className?: string;
    style?: React.CSSProperties;
    onError?: (e: React.SyntheticEvent<HTMLImageElement, Event>) => void;
    fallbackSrc?: string;
}

export default function SmartImage({
    src,
    alt,
    className = '',
    style = {},
    onError,
    fallbackSrc = '/placeholder-image.png'
}: SmartImageProps) {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);
    const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);

    useEffect(() => {
        if (src) {
            setImageLoaded(false);
            setImageError(false);
            setImageDimensions(null);
        }
    }, [src]);

    const handleLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        const img = e.target as HTMLImageElement;
        setImageDimensions({
            width: img.naturalWidth,
            height: img.naturalHeight
        });
        setImageLoaded(true);
    };

    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
        setImageError(true);
        if (onError) {
            onError(e);
        }
    };

    // Determine optimal object position based on image dimensions
    const getOptimalObjectPosition = () => {
        if (!imageDimensions) return 'center 30%';

        const { width, height } = imageDimensions;
        const aspectRatio = width / height;

        // For portrait images (taller than wide), focus on upper portion
        if (aspectRatio < 0.8) {
            return 'center 25%';
        }
        // For square images, center focus
        else if (aspectRatio >= 0.8 && aspectRatio <= 1.2) {
            return 'center 35%';
        }
        // For landscape images, focus on center
        else {
            return 'center 40%';
        }
    };

    if (imageError) {
        return (
            <PlaceholderImage
                className={className}
                alt={alt}
            />
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            style={{
                ...style,
                objectPosition: getOptimalObjectPosition(),
                minHeight: '100%',
                minWidth: '100%'
            }}
            onLoad={handleLoad}
            onError={handleError}
        />
    );
}
