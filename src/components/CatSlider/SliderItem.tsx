import { FC, ReactElement, useLayoutEffect, useRef, useState } from "react";
import styled from 'styled-components';

interface SliderImageProps {
    imageScale: number
}

interface SliderItemProps {
    imgSource: string,
    windowWidth: number, // Width of device display
    currentCenter: number // Center of the slider coordinate (X)
}

const maxHeightPercent = 100;

export const SliderItem: FC<SliderItemProps> = ({ imgSource, windowWidth, currentCenter }): ReactElement => {

    const imgRef = useRef<HTMLImageElement>(null);
    const [imageHeight, setImageHeight] = useState(1);

    useLayoutEffect(() => {
        if (imgRef.current) {
            // When center of screen changed - count newimage scale 
            let imgPosition = imgRef.current.offsetLeft + (imgRef.current.width / 2);
            let newImageHeight = (-(((imgPosition - currentCenter) ** 2) / (((windowWidth / 2) / 8) ** 2)) + maxHeightPercent) / 100
            if (newImageHeight > 0) {
                setImageHeight(newImageHeight);
            } else
                setImageHeight(0) // If img scale should be lower than 0 then set scale to 0 (just in case)
        }
    }, [currentCenter, windowWidth]);

    return <SliderImage ref={imgRef} src={imgSource} imageScale={imageHeight} />
}

const SliderImage = styled.img<SliderImageProps>`
    alt: "";
    transform: scale(${props => props.imageScale});
    height: 100%;
`