import { observer } from "mobx-react-lite";
import CatStore from "../../../store/CatStore";
import { ImageItem } from "./ImageItem";

export const SliderImages = observer(() => {
    let catsImages = CatStore.imgsArray.map((cat) =>
        <ImageItem key={cat.id} cat={cat} />
    )
    return <>{catsImages}</>
})