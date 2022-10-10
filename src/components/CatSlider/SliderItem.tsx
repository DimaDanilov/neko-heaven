import { FC } from "react";
import styled from 'styled-components';
import stockImage from '../../assets/images/stock-image.png';

export const SliderItem: FC = () => <SliderImage src={stockImage} />

const SliderImage = styled.img`
    alt: "";
    height: 100%;
`