import { useLayoutEffect, useRef, useState, FC } from "react";
import styled from 'styled-components';
import { SliderItem } from "./SliderItem"

const scrollMultiplier = 0.5;

export const CatSlider: FC = () => {
    const divRef = useRef<HTMLDivElement>(null);
    const [width, setWidth] = useState(0); // Width of container to move slider on width of container

    // Find width of container to move slider
    useLayoutEffect(() => {
        if (divRef.current)
            setWidth(divRef.current.offsetWidth);
    }, []);

    const moveSlider = (e: React.WheelEvent<HTMLDivElement>, width: number) => {
        if (divRef.current)
            if (e.deltaY > 0)
                divRef.current.scrollLeft += width * scrollMultiplier
            else
                divRef.current.scrollLeft -= width * scrollMultiplier
        // console.log(e.deltaY)
    }

    return (
        <SliderContainer>
            <ImgContainer ref={divRef} onWheel={(e) => moveSlider(e, width)}>
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
