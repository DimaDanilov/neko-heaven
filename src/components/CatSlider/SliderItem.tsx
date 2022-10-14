import { FC, ReactElement, useEffect, useLayoutEffect, useRef, useState } from "react";
import styled from 'styled-components';
import { CatImage, getCatImage } from "../../api/cat-images";
import defaultImage from '../../assets/images/stock-image.png';


interface SliderImageProps {
    imageScale: number
}

interface SliderItemProps {
    windowWidth: number, // Width of device display
    currentCenter: number // Center of the slider coordinate (X)
}

const maxHeightPercent = 100;

export const SliderItem: FC<SliderItemProps> = ({ windowWidth, currentCenter }): ReactElement => {

    const imgRef = useRef<HTMLImageElement>(null);
    const [isCatImageLoadingStarted, setIsCatImageLoadingStarted] = useState(false) // If cat image started loading from the server
    const [catImageInfo, setCatImageInfo] = useState<CatImage | undefined>(undefined) // Cat image info (artist, url, etc.)
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
    useEffect(() => {
        if (!isCatImageLoadingStarted) {
            setIsCatImageLoadingStarted(true);
            (async () => setCatImageInfo(await getCatImage()))();
        }
    }, [isCatImageLoadingStarted])

    return <SliderImage ref={imgRef} src={catImageInfo === undefined ? defaultImage : catImageInfo.url} imageScale={imageHeight} />
}

const SliderImage = styled.img<SliderImageProps>`
    alt: "";
    transform: scale(${props => props.imageScale});
    height: 100%;
`