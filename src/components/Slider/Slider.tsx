import { useRef, useCallback, useEffect } from "react";
import styled from 'styled-components';
import CatImagesStore from "../../store/CatImagesStore";
import WindowStore from "../../store/WindowStore";
import { SliderImages } from "./SliderImages/SliderImages";
import { observer } from "mobx-react-lite";


const scrollSpeedMultiplier = 6;
const screenWidth = window.innerWidth;

export const Slider = observer(() => {
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

    // First Initialization
    useEffect(() => {
        WindowStore.setScreenWidth(screenWidth)
        WindowStore.setSliderCenter(0)
    }, [])

    // Loading new images on button click (UPGRADE FEATURE LATER)
    const loadNewImages = () => {
        CatImagesStore.fetchImages(6);
    }

    // Change of center of the scroll
    const scrollHandle = useCallback(() => {
        if (divRef.current) {
            WindowStore.setSliderCenter(divRef.current.scrollLeft) // Count center of Slider again
        }
    }, [])

    return (
        <SliderContainer>
            <ImgContainer ref={divRef} onWheel={wheelHandler} onScroll={scrollHandle} >
                <SliderImages />
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
