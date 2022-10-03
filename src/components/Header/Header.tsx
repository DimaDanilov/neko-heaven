import React, { FC } from "react";
import styled from 'styled-components';
import mainLogo from '../../assets/icons/neko-heaven-logo.svg';
import searchIcon from '../../assets/icons/search-icon.svg';

export const Header: FC = () => {
    return (
        <HeaderContainer>
            <LogoMenuContainer>
                <LogoContainer>
                    <MainLogoImg src={mainLogo} />
                    <MainLogoName>Neko Heaven</MainLogoName>
                </LogoContainer>
                <MenuUl>
                    <MenuLi>
                        <MenuLink href="/">Categories</MenuLink>
                    </MenuLi>
                    <MenuLi>
                        <MenuLink href="/">GIF</MenuLink>
                    </MenuLi>
                </MenuUl>
            </LogoMenuContainer>
            <SearchImg src={searchIcon} />

        </HeaderContainer>
    )
}

const HeaderContainer = styled.header`
    background: linear-gradient(#FFBCD1, #FFB2CA);
    height: 50px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 4%;
`
const LogoMenuContainer = styled.div`
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 30%;
`
const LogoContainer = styled.div`
    display: flex;
    align-items: center;
    height: 100%;
    gap: 8%;
`
const MenuUl = styled.ul`
    display: flex;
    gap: 20%;
`
const MenuLi = styled.li`
    list-style: none;
`
const MenuLink = styled.a`
    color: white;
    text-decoration: none;
`
const MainLogoImg = styled.img`
    alt: "";
    height: 50%;
`
const MainLogoName = styled.span`
    color: white;
    white-space: nowrap;
`
const SearchImg = styled.img`
    alt: "";
    height: 50%;
`