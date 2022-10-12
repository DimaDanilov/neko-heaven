import { FC, useLayoutEffect, useRef, useState } from "react";
import styled from 'styled-components';

interface SliderImageProps {
    mymy: number
}

export interface SliderItemProps {
    imgSrc: string,
    windowWidth: number,
    currentCenter: number
}

const maxHeightPercent = 100

export const SliderItem = ({ imgSrc, windowWidth, currentCenter }: SliderItemProps) => {

    const imgRef = useRef<HTMLImageElement>(null);
    const [imageHeight, setImageHeight] = useState(1);

    useLayoutEffect(() => {
        if (imgRef.current) {
            // let imgPosition = imgRef.current.offsetLeft;
            let imgPosition = imgRef.current.offsetLeft + (imgRef.current.width / 2);
            let newImageHeight = (-(((imgPosition - currentCenter) ** 2) / (((windowWidth / 2) / 8) ** 2)) + maxHeightPercent) / 100
            if (newImageHeight > 0) {
                setImageHeight(newImageHeight);
                console.log(newImageHeight)
            } else
                setImageHeight(0) // If img size should be lower than 0% then smooth size change
        }
    }, [currentCenter, imageHeight]);

    return <SliderImage ref={imgRef} src={imgSrc} mymy={imageHeight} />
}

const SliderImage = styled.img<SliderImageProps>`
    alt: "";
    transform: scale(${props => props.mymy});
    height: 100%;
`