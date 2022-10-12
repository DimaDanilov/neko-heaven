import { useLayoutEffect, useRef, useState, FC } from "react";
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


const scrollMultiplier = 0.4;
const screenWidth = window.innerWidth

export const CatSlider: FC = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0); // Width of container to move slider on width of container
    const [currentCenter, setCurrentCenter] = useState(screenWidth / 2)

    // Find width of container to move slider
    useLayoutEffect(() => {
        if (divRef.current)
            setWidth(divRef.current.offsetWidth);
    }, []);

    const wheelHandler = (e: React.WheelEvent<HTMLDivElement>, width: number) => {
        if (divRef.current) {
            if (e.deltaY > 0)
                divRef.current.scrollLeft += width * scrollMultiplier
            else
                divRef.current.scrollLeft -= width * scrollMultiplier
            console.log(divRef.current.scrollLeft + screenWidth / 2)
        }
    }

    const scrollHandle = (e: React.UIEvent<HTMLDivElement>) => {
        if (divRef.current)
            setCurrentCenter(divRef.current.scrollLeft + screenWidth / 2) // Count center of Slider again
    }

    return (
        <SliderContainer>
            <ImgContainer ref={divRef} onWheel={(e) => wheelHandler(e, width)} onScroll={(e) => scrollHandle(e)} >
                <SliderItem imgSrc={oneImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSrc={twoImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSrc={threeImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSrc={fourImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSrc={fiveImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSrc={sixImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSrc={sevenImg} windowWidth={screenWidth} currentCenter={currentCenter} />
                <SliderItem imgSrc={eightImg} windowWidth={screenWidth} currentCenter={currentCenter} />
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
