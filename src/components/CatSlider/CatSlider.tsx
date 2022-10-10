import { useLayoutEffect, useRef, useState, FC } from "react";
import styled from 'styled-components';
import arrowImg from '../../assets/icons/arrow-right.svg';
import { SliderItem } from "./SliderItem"

export const CatSlider: FC = () => {

    const divRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0); // Width of container to move slider on width of container

    // Find width of container to move slider
    useLayoutEffect(() => {
        if (divRef.current)
            setWidth(divRef.current.offsetWidth);
    }, []);

    const moveSlider = (width: number) => {
        if (divRef.current)
            divRef.current.scrollLeft += width;
    }

    return (
        <SliderContainer>
            <PreBtn onClick={() => moveSlider(-width)}><img src={arrowImg} alt="" /></PreBtn>
            <NxtBtn onClick={() => moveSlider(width)}><img src={arrowImg} alt="" /></NxtBtn>
            <ImgContainer ref={divRef}>
                <SliderItem />
                <SliderItem />
                <SliderItem />
                <SliderItem />
                <SliderItem />
            </ImgContainer>
        </SliderContainer >
    )
};


const SliderContainer = styled.section`
    height: calc(100vh - 50px);
    padding: 20px;
    position: relative;
    overflow: hidden;
    box-sizing: border-box;
`
const PreBtn = styled.button`
    border: none;
    width: 10vw;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
    cursor: pointer;
    left: 0;
    transform: rotate(180deg);
`
const NxtBtn = styled.button`
    border: none;
    width: 10vw;
    height: 100%;
    position: absolute;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    background: linear-gradient(90deg, rgba(255, 255, 255, 0) 0%, #fff 100%);
    cursor: pointer;
    right: 0;
`
const ImgContainer = styled.div`
    padding: 0 10vw;
    display: flex;
    overflow-x: auto;
    scroll-behavior: smooth;
    gap: 10%;
    height: 100%;
    &::-webkit-scrollbar {
        display: none;
    }
`
