import { observer } from "mobx-react-lite";
import CatImagesStore from "../../../store/CatImagesStore";
import { ImageItem } from "./ImageItem";

export const SliderImages = observer(() => {
    let catsArray = CatImagesStore.imagesArray
    let cats = catsArray.map((cat) =>
        <ImageItem key={cat.id} catImageInfo={cat} />
    )
    return <>{cats}</>
})