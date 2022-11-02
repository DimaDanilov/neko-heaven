import { useLayoutEffect, useRef, useState } from "react";
import styled from 'styled-components';
import defaultImage from '../../../assets/images/stock-image.svg';
import CatStore, { ICatImage } from "../../../store/CatStore";
import WindowStore from "../../../store/WindowStore";
import { observer } from "mobx-react-lite";


interface IImageItemProps {
    cat: ICatImage
}

interface IImageProps {
    imageScale: number
}

const maxHeightPercent = 100;


export const ImageItem = observer(({ cat }: IImageItemProps) => {
    const startNextImageLoading = () => {
        // When this image is loaded, change variable to load the next image source
        if (cat.id === CatStore.imgLoadingID)
            CatStore.imgLoadingID++
    }

    const windowWidth = WindowStore.screenWidth
    const currentCenter = WindowStore.sliderCenter

    const imgRef = useRef<HTMLImageElement>(null);
    const [imageHeight, setImageHeight] = useState(1);

    useLayoutEffect(() => {
        if (imgRef.current) {
            // When center of screen changed - count newimage scale 
            let imgPosition = imgRef.current.offsetLeft + (imgRef.current.width / 2);
            let newImageHeight = (-(((imgPosition - currentCenter) ** 2) / (((windowWidth / 2) / 8) ** 2)) + maxHeightPercent) / 100
            if (newImageHeight > 0)
                setImageHeight(newImageHeight);
            else
                setImageHeight(0) // If img scale should be lower than 0 then set scale to 0 (just in case)
        }
    }, [currentCenter, windowWidth]);

    return <SliderImage
        ref={imgRef}
        onLoad={startNextImageLoading}
        src={(cat === undefined) || (cat.id > CatStore.imgLoadingID)
            ? defaultImage
            : cat.url}
        imageScale={imageHeight}
    />
})

const SliderImage = styled.img<IImageProps>`
    alt: "";
    transform: scale(${props => props.imageScale});
    height: 100%;
`