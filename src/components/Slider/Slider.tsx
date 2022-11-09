import { useRef, useCallback, useEffect } from "react";
import styled from 'styled-components';
import { useCatStore } from "../../store/CatStore";
import { useWindowStore } from "../../store/WindowStore";
import { observer } from "mobx-react-lite";
import { ImageItem } from "./ImageItem";

const scrollSpeedMultiplier = 6;
const screenWidth = window.innerWidth;

interface ISliderProps {
    category: string
}

export const Slider = observer(({ category }: ISliderProps) => {
    const catStore = useCatStore();
    const windowStore = useWindowStore();

    const divRef = useRef<HTMLDivElement>(null);

    const wheelHandler = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
        if (divRef.current) {
            if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) { // Made cause of difference between touchpad and wheel
                divRef.current.scrollLeft += e.deltaX * scrollSpeedMultiplier
            }
            else {
                divRef.current.scrollLeft += e.deltaY * scrollSpeedMultiplier
            }
        }
    }, [])

    // Loading new images on button click (UPGRADE FEATURE LATER)
    const loadNewImages = async () => {
        await catStore.fetchImages(category, 6);
    }


    // Change of center of the scroll
    const scrollHandle = useCallback(() => {
        if (divRef.current) {
            windowStore.setSliderCenter(divRef.current.scrollLeft); // Count center of Slider again
        }
    }, [windowStore])

    // First Initialization
    useEffect(() => {
        windowStore.setScreenWidth(screenWidth);
        windowStore.setSliderCenter(0);
    }, [windowStore])

    // If link changed then clear an array
    useEffect(() => {
        catStore.resetCatArray();
        catStore.resetImgLoadingID();
    }, [category, catStore])

    // If slider is empty fill it with images
    useEffect(() => {
        if (catStore.imgsArray.length === 0) {
            loadNewImages();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [catStore.imgsArray.length])

    return (
        <SliderContainer>
            <ImgContainer ref={divRef} onWheel={wheelHandler} onScroll={scrollHandle} >
                {/* All cat images */}
                {catStore.imgsArray.map((cat, index) =>
                    <ImageItem key={cat.catInfo.url + index} cat={cat} />
                )}
            </ImgContainer>
            <button onClick={loadNewImages}>LOAD NEW IMAGES</button>
        </SliderContainer>
    )
});

const SliderContainer = styled.section`
    height: calc(100vh - 50px);
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
`
const ImgContainer = styled.div`
    padding: 0 10vw;
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    gap: 8%;
    height: 80%;
    &::-webkit-scrollbar {
        display: none;
    }
`
