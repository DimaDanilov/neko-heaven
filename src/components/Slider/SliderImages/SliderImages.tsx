import { observer } from "mobx-react-lite";
import CatStore from "../../../store/CatStore";
import { ImageItem } from "./ImageItem";

export const SliderImages = observer(() => {
    let catsArray = CatStore.imgsArray
    let catsItems = catsArray.map((cat) =>
        <ImageItem key={cat.id} cat={cat} />
    )
    return <>{catsItems}</>
})