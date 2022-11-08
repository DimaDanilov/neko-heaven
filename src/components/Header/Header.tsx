import { useState } from 'react';
import styled from 'styled-components';
import mainLogo from '../../assets/icons/neko-heaven-logo.svg';
import searchIcon from '../../assets/icons/search-icon.svg';
import { DropDownMenu } from './DropDownMenu';

interface IMenuLinkProps {
    pinStatus?: boolean
}

export const Header = () => {
    const [isDropdownPinned, setIsDropdownPinned] = useState(false); // Pin for dropdown menu (you can show your dropdown menu even if you move mouse if you click on parent)
    const [isDropdownHovered, setIsDropdownHovered] = useState(false);

    const clickHandler = () => {
        setIsDropdownPinned((pin) => !pin)
    }

    const hoverHandler = () => {
        setIsDropdownHovered((hover) => !hover)
    }

    return (
        <HeaderContainer>
            <LogoMenuContainer>
                <LogoLink href="/">
                    <LogoContainer>
                        <MainLogoImg src={mainLogo} />
                        <MainLogoName>Neko Heaven</MainLogoName>
                    </LogoContainer>
                </LogoLink>
                <MenuUl>
                    <MenuLi onMouseEnter={hoverHandler} onMouseLeave={hoverHandler}>
                        <MenuLink pinStatus={isDropdownPinned} onClick={clickHandler}>Categories</MenuLink>
                        <DropDownMenu pinStatus={isDropdownPinned} hoverStatus={isDropdownHovered} />
                    </MenuLi>
                    <MenuLi>
                        <MenuLink href="/">GIF</MenuLink>
                    </MenuLi>
                </MenuUl>
            </LogoMenuContainer>
            <SearchImg src={searchIcon} />
        </HeaderContainer >
    )
}

const HeaderContainer = styled.header`
    position: relative;
    background: linear-gradient(#FFBCD1, #FFB2CA);
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
`
const LogoMenuContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30%;
    margin: 0 4%;
`
const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    gap: 8%;
`
const MenuUl = styled.ul`
    display: flex;
    gap: 15%;
    height: 100%;
`
const MenuLi = styled.li`
    list-style: none;
    height: 100%;
    display: flex;
`
const MenuLink = styled.a<IMenuLinkProps>`
    cursor: pointer;
    color: white;
    text-decoration: none;
    font-size: 24px;
    font-family: "PolyRegular";
    height: 100%;
    padding: 0 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all 0.25s ease-out;
    background-color: ${props => props.pinStatus === true ? "#f995b4" : ""};
    &:hover {
        background-color: #fea4bd;
    }
`
const LogoLink = styled.a`
    height: 100%;
    text-decoration: none;
    vertical-align: center;
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
const SearchImg = styled.img`
    alt: "";
    height: 50%;
    margin: 0 4%;
`