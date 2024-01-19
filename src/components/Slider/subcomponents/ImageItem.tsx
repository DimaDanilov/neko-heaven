import { useLayoutEffect, useRef } from "react";
import styled from "styled-components";
import defaultImage from "../../../assets/images/stock-image.svg";
import { useCatStore } from "../../../store/CatStore";
import { observer } from "mobx-react-lite";
import { IImageItem } from "../../../types/Cat";

interface IImageItemProps {
  cat: IImageItem;
}

interface IImageProps {
  imageScale: number;
}

export const ImageItem = observer(({ cat }: IImageItemProps) => {
  const catStore = useCatStore();
  const imgRef = useRef<HTMLImageElement>(null);
  const offsetLeft = imgRef.current ? imgRef.current.offsetLeft : 0;

  const onLoadHandler = (catID: number) => {
    // When this image is loaded, change variable to load the next image source
    if (catID === catStore.imgLoadingID) {
      catStore.incrementImgLoadingID();
    }
  };

  useLayoutEffect(() => {
    if (imgRef.current) {
      let imgPosition = imgRef.current.offsetLeft + imgRef.current.width / 2;
      catStore.setPositionOfImage(cat.id, imgPosition);
      catStore.countScaleOfImage(cat.id);
    }
  }, [offsetLeft, cat.id, catStore]);

  return (
    <SliderImage
      ref={imgRef}
      onLoad={() => onLoadHandler(cat.id)}
      src={
        cat === undefined || cat.id > catStore.imgLoadingID
          ? defaultImage
          : cat.catInfo.url
      }
      imageScale={cat.scale}
    />
  );
});

const SliderImage = styled.img<IImageProps>`
  alt: "";
  transform: scale(${(props) => props.imageScale});
  height: 100%;
`;
