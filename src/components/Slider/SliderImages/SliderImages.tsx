import { observer } from "mobx-react-lite";
import CatImagesStore from "../../../store/CatImagesStore";
import { ImageItem } from "./ImageItem";


interface ISliderImagesProps {
    windowWidth: number, // Width of device display
    currentCenter: number // Center of the slider coordinate (X)
}

export const SliderImages = observer(({ windowWidth, currentCenter }: ISliderImagesProps) => {
    let catsArray = CatImagesStore.imagesArray
    let cats = catsArray.map((cat, index) =>
        <ImageItem key={index} catImageInfo={cat} windowWidth={windowWidth} currentCenter={currentCenter} />
    )
    return <>{cats}</>
})