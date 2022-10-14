import { useRef, useState, FC, ReactElement } from "react";
import styled from 'styled-components';
import { SliderItem } from "./SliderItem"

const scrollSpeedMultiplier = 0.4;
const screenWidth = window.innerWidth

export const CatSlider: FC = (): ReactElement => {
    const divRef = useRef<HTMLDivElement>(null);
    const [currentCenter, setCurrentCenter] = useState(screenWidth / 2)

    // Scrolling event
    const wheelHandler = (e: React.WheelEvent<HTMLDivElement>, screenWidth: number) => {
        if (divRef.current) {
            if (e.deltaY > 0)
                divRef.current.scrollLeft += screenWidth * scrollSpeedMultiplier
            else
                divRef.current.scrollLeft -= screenWidth * scrollSpeedMultiplier
        }
    }

    // Change of center of the scroll
    const scrollHandle = (e: React.UIEvent<HTMLDivElement>) => {
        if (divRef.current)
            setCurrentCenter(divRef.current.scrollLeft + screenWidth / 2) // Count center of Slider again
    }

    return (
        <SliderContainer>
            <ImgContainer ref={divRef} onWheel={(e) => wheelHandler(e, screenWidth)} onScroll={(e) => scrollHandle(e)} >
                <SliderItem windowWidth={screenWidth} currentCenter={currentCenter} />
            </ImgContainer>
        </SliderContainer>
    )
};

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
