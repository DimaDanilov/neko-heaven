import { useLayoutEffect, useRef } from "react";
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

const onLoadHandler = (catID: number) => {
    // When this image is loaded, change variable to load the next image source
    if (catID === CatStore.imgLoadingID)
        CatStore.incrementImgLoadingID()
}

export const ImageItem = observer(({ cat }: IImageItemProps) => {

    const imgRef = useRef<HTMLImageElement>(null);
    const offsetLeft = imgRef.current ? imgRef.current.offsetLeft : 0

    useLayoutEffect(() => {
        if (imgRef.current) {
            let imgPosition = imgRef.current.offsetLeft + (imgRef.current.width / 2);
            WindowStore.setPositionOfImage(cat.id, imgPosition);
            WindowStore.countHeightForID(cat.id);
        }
    }, [offsetLeft, cat.id]);

    return <SliderImage
        ref={imgRef}
        onLoad={() => onLoadHandler(cat.id)}
        src={(cat === undefined) || (cat.id > CatStore.imgLoadingID)
            ? defaultImage
            : cat.url}
        imageScale={WindowStore.imgsHeightArray[cat.id]}
    />
})

const SliderImage = styled.img<IImageProps>`
    alt: "";
    transform: scale(${props => props.imageScale});
    height: 100%;
`