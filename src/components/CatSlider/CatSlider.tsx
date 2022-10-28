import { useRef, useState, FC, ReactElement, useCallback } from "react";
import styled from 'styled-components';
import { SliderItem } from "./SliderItem"

const scrollSpeedMultiplier = 0.4;
const screenWidth = window.innerWidth

export const CatSlider = (): ReactElement => {
    const divRef = useRef<HTMLDivElement>(null);
    const [currentCenter, setCurrentCenter] = useState(screenWidth / 2)

    const wheelHandler = useCallback((e: React.WheelEvent<HTMLDivElement>) => {
        if (divRef.current) {
            if (e.deltaX > 0) {
                divRef.current.scrollLeft += e.deltaX * scrollSpeedMultiplier
            }
            else {
                divRef.current.scrollLeft -= e.deltaX * scrollSpeedMultiplier
            }
        }
    }, [])

    // Change of center of the scroll
    const scrollHandle = useCallback((e: React.UIEvent<HTMLDivElement>) => {
        if (divRef.current) {
            setCurrentCenter(divRef.current.scrollLeft + screenWidth / 2) // Count center of Slider again
        }
    }, [])

    return (
        <SliderContainer>
            <ImgContainer ref={divRef} onWheel={wheelHandler} onScroll={scrollHandle} >
                <SliderItem windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem windowWidth={screenWidth} currentCenter={currentCenter} />
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
