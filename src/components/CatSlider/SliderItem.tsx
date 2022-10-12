import { FC, useLayoutEffect, useRef, useState } from "react";
import styled from 'styled-components';

interface SliderImageProps {
    mymy: string
}

export interface SliderItemProps {
    imgSrc: string,
    windowWidth: number,
    currentCenter: number
}

const maxHeightPercent = 90

export const SliderItem = ({ imgSrc, windowWidth, currentCenter }: SliderItemProps) => {

    const imgRef = useRef<HTMLImageElement>(null);
    const [imageHeight, setImageHeight] = useState('0%');

    useLayoutEffect(() => {
        if (imgRef.current) {
            // let imgPosition = imgRef.current.offsetLeft;
            let imgPosition = imgRef.current.offsetLeft + (imgRef.current.width / 2);
            let newImageHeight = -(((imgPosition - currentCenter) ** 2) / (((windowWidth / 2) / 5) ** 2)) + maxHeightPercent
            if (newImageHeight > 0) {
                setImageHeight(newImageHeight + '%');
            } else if (imgPosition < currentCenter) {
                // If img size should be lower than 0% then smooth size change
                let newImageHeight = -(((imgPosition - currentCenter + (windowWidth / 2) * 20) ** 2) / (((windowWidth / 2) / 5) ** 2)) + maxHeightPercent
                setImageHeight(newImageHeight + '%')
            }
            else {
                let newImageHeight = -(((imgPosition - currentCenter - (windowWidth / 2) * 20) ** 2) / (((windowWidth / 2) / 5) ** 2)) + maxHeightPercent
                setImageHeight(newImageHeight + '%')
            }
            console.log(currentCenter)
        }
    }, [currentCenter, imageHeight]);

    return <SliderImage ref={imgRef} src={imgSrc} mymy={imageHeight} />
}

const SliderImage = styled.img<SliderImageProps>`
    alt: "";
    height: ${props => props.mymy};
`