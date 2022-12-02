import { useState } from 'react';
import styled from 'styled-components';
import mainLogo from '../../assets/icons/neko-heaven-logo.svg';
import { DropDownMenu } from './DropDownMenu';
import { Link } from 'react-router-dom';
import { CAT_CATEGORIES, WAIFU_CATEGORIES } from '../../models/Categories';

interface IMenuLinkProps {
    pinned: boolean
}

export const Header = () => {
    const [isDropdownPinned1, setIsDropdownPinned1] = useState(false); // Pin for dropdown menu (you can show your dropdown menu even if you move mouse if you click on parent)
    const [isDropdownPinned2, setIsDropdownPinned2] = useState(false); // Pin for dropdown menu (you can show your dropdown menu even if you move mouse if you click on parent)
    const [isDropdownHovered1, setIsDropdownHovered1] = useState(false);
    const [isDropdownHovered2, setIsDropdownHovered2] = useState(false);

    const clickHandler = (elemID: number) => {
        if (elemID === 1)
            setIsDropdownPinned1((pin) => !pin)
        else if (elemID === 2)
            setIsDropdownPinned2((pin) => !pin)
    }

    const hoverHandler = (elemID: number) => {
        if (elemID === 1)
            setIsDropdownHovered1((hover) => !hover)
        else if (elemID === 2)
            setIsDropdownHovered2((hover) => !hover)
    }

    return (
        <HeaderContainer>
            <LogoLink to="/">
                <LogoContainer>
                    <MainLogoImg src={mainLogo} />
                    <MainLogoName>Neko Heaven</MainLogoName>
                </LogoContainer>
            </LogoLink>
            <MenuUl>
                <MenuLi onMouseEnter={() => hoverHandler(1)} onMouseLeave={() => hoverHandler(1)}>
                    <MenuLink to="" pinned={isDropdownPinned1} onClick={() => clickHandler(1)}>Neko</MenuLink>
                    <DropDownMenu pinStatus={isDropdownPinned1} hoverStatus={isDropdownHovered1} categories={CAT_CATEGORIES} />
                </MenuLi>
                <MenuLi onMouseEnter={() => hoverHandler(2)} onMouseLeave={() => hoverHandler(2)}>
                    <MenuLink to="" pinned={isDropdownPinned2} onClick={() => clickHandler(2)}>Waifu</MenuLink>
                    <DropDownMenu pinStatus={isDropdownPinned2} hoverStatus={isDropdownHovered2} categories={WAIFU_CATEGORIES} />
                </MenuLi>
            </MenuUl>
        </HeaderContainer >
    )
}

const HeaderContainer = styled.header`
    position: relative;
    background: linear-gradient(#FFBCD1, #FFB2CA);
    height: 50px;
    display: flex;
    justify-content: start;
    align-items: center;
`
const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    gap: 8%;
`
const MenuUl = styled.ul`
    display: flex;
    height: 100%;
`
const MenuLi = styled.li`
    list-style: none;
    height: 100%;
    display: flex;
`
const MenuLink = styled(Link) <IMenuLinkProps>`
    cursor: pointer;
    color: white;
    text-decoration: none;
    font-size: 24px;
    font-family: "PolyRegular";
    height: 100%;
    padding: 0 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease-out;
    background-color: ${props => props.pinned ? "#f995b4" : ""};
    &:hover {
        background-color: #fea4bd;
    }
`
const LogoLink = styled(Link)`
    height: 100%;
    text-decoration: none;
    vertical-align: center;
    margin: 0 4%;
`
const MainLogoImg = styled.img`
    alt: "";
    height: 50%;
`
const MainLogoName = styled.span`
    color: white;
    white-space: nowrap;
    font-size: 24px;
    font-family: "InterSemiBold";
`