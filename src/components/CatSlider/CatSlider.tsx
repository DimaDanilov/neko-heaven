import { useRef, useState, FC, ReactElement } from "react";
import styled from 'styled-components';
import { SliderItem } from "./SliderItem"
import oneImg from '../../assets/images/1.png';
import twoImg from '../../assets/images/2.png';
import threeImg from '../../assets/images/3.png';
import fourImg from '../../assets/images/4.png';
import fiveImg from '../../assets/images/5.png';
import sixImg from '../../assets/images/6.png';
import sevenImg from '../../assets/images/7.png';
import eightImg from '../../assets/images/8.png';

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
                <SliderItem imgSource={oneImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSource={twoImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSource={threeImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSource={fourImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSource={fiveImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSource={sixImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSource={sevenImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSource={eightImg} windowWidth={screenWidth} currentCenter={currentCenter} />
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
