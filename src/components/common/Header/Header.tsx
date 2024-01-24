import { useState } from "react";
import styled from "styled-components";
import mainLogo from "assets/icons/neko-heaven-logo.svg";
import { DropDownMenu } from "components/common/Header/subcomponents/DropDownMenu";
import { Link } from "react-router-dom";
import {
  CAT_CATEGORIES,
  WAIFUIM_CATEGORIES,
  WAIFUPICS_CATEGORIES,
} from "types/Categories";

interface IBurgerMenuProps {
  $pinned: boolean;
}

interface IMenuLinkProps {
  $pinned: boolean;
}

export const Header = () => {
  // Pins for dropdown menu (you can show your dropdown menu even if you move mouse if you click on parent)
  const [isDropdownPinned, setIsDropdownPinned] = useState([
    false,
    false,
    false,
    false,
  ]);
  const [isDropdownHovered, setIsDropdownHovered] = useState([
    false,
    false,
    false,
  ]);

  const clickHandler = (elemID: number) => {
    if (elemID === 1) {
      setIsDropdownPinned([!isDropdownPinned[0], false, false, false]);
    } else if (elemID === 2) {
      setIsDropdownPinned([false, !isDropdownPinned[1], false, false]);
    } else if (elemID === 3) {
      setIsDropdownPinned([false, false, !isDropdownPinned[2], false]);
    } else if (elemID === 4) {
      setIsDropdownPinned([false, false, false, !isDropdownPinned[3]]); // Last one for burger menu
    }
  };

  const hoverHandler = (elemID: number) => {
    if (elemID === 1) {
      setIsDropdownHovered([!isDropdownHovered[0], false, false]);
    } else if (elemID === 2) {
      setIsDropdownHovered([false, !isDropdownHovered[1], false]);
    } else if (elemID === 3) {
      setIsDropdownHovered([false, false, !isDropdownHovered[2]]);
    }
  };

  return (
    <HeaderContainer>
      <LogoLink to={"/" + CAT_CATEGORIES[0]}>
        <LogoContainer>
          <MainLogoImg src={mainLogo} />
          <MainLogoName>Neko Heaven</MainLogoName>
        </LogoContainer>
      </LogoLink>

      <MenuUl>
        <MenuLi
          onMouseEnter={() => hoverHandler(1)}
          onMouseLeave={() => hoverHandler(1)}
        >
          <MenuLink
            to=""
            $pinned={isDropdownPinned[0]}
            onClick={() => clickHandler(1)}
          >
            Neko
          </MenuLink>
          <DropDownMenu
            pinStatus={isDropdownPinned[0]}
            hoverStatus={isDropdownHovered[0]}
            categories={CAT_CATEGORIES}
          />
        </MenuLi>
        <MenuLi
          onMouseEnter={() => hoverHandler(2)}
          onMouseLeave={() => hoverHandler(2)}
        >
          <MenuLink
            to=""
            $pinned={isDropdownPinned[1]}
            onClick={() => clickHandler(2)}
          >
            Waifu.im
          </MenuLink>
          <DropDownMenu
            pinStatus={isDropdownPinned[1]}
            hoverStatus={isDropdownHovered[1]}
            categories={WAIFUIM_CATEGORIES}
          />
        </MenuLi>
        <MenuLi
          onMouseEnter={() => hoverHandler(3)}
          onMouseLeave={() => hoverHandler(3)}
        >
          <MenuLink
            to=""
            $pinned={isDropdownPinned[2]}
            onClick={() => clickHandler(3)}
          >
            Waifu.pics
          </MenuLink>
          <DropDownMenu
            pinStatus={isDropdownPinned[2]}
            hoverStatus={isDropdownHovered[2]}
            categories={WAIFUPICS_CATEGORIES}
          />
        </MenuLi>
      </MenuUl>

      <BurgerMenuContainer onClick={() => clickHandler(4)}>
        <BurgerMenu $pinned={isDropdownPinned[3]}></BurgerMenu>
        <DropDownMenu
          pinStatus={isDropdownPinned[3]}
          categories={CAT_CATEGORIES.concat(WAIFUIM_CATEGORIES).concat(
            WAIFUPICS_CATEGORIES
          )}
        />
      </BurgerMenuContainer>
    </HeaderContainer>
  );
};

const BurgerMenuContainer = styled.div`
  width: 30px;
  margin: 0 5%;
  display: none;
  @media (max-width: 768px) {
    display: block;
  }
`;

const BurgerMenu = styled.div<IBurgerMenuProps>`
  &,
  &:before,
  &:after {
    display: block;
    position: absolute;
    height: 4px;
    width: 30px;
    transition: transform 400ms cubic-bezier(0.23, 1, 0.32, 1);
    border-radius: 2px;
  }
  &:before {
    content: "";
    margin-top: ${(props) => (props.$pinned ? "0px" : "-8px")};
    transform: ${(props) => (props.$pinned ? "rotate(45deg)" : "")};
    background-color: #fff;
  }
  &:after {
    content: "";
    margin-top: ${(props) => (props.$pinned ? "0px" : "8px")};
    transform: ${(props) => (props.$pinned ? "rotate(-45deg)" : "")};
    background-color: #fff;
  }
  background-color: ${(props) => (props.$pinned ? "#ffb2ca0" : "#fff")};
`;

const HeaderContainer = styled.header`
  position: relative;
  background: linear-gradient(#ffbcd1, #ffb2ca);
  height: 50px;
  display: flex;
  justify-content: start;
  align-items: center;
  @media (max-width: 768px) {
    justify-content: space-between;
  }
`;
const LogoContainer = styled.div`
  display: flex;
  align-items: center;
  margin: 0 5%;
  height: 100%;
  gap: 8%;
`;
const MenuUl = styled.ul`
  display: flex;
  height: 100%;
  margin: 0 5%;
  padding: 0;
  @media (max-width: 768px) {
    display: none;
  }
`;
const MenuLi = styled.li`
  list-style: none;
  height: 100%;
  display: flex;
  overflow: hidden;
`;
const MenuLink = styled(Link)<IMenuLinkProps>`
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
  background-color: ${(props) => (props.$pinned ? "#f995b4" : "")};
  &:hover {
    background-color: #fea4bd;
  }
`;
const LogoLink = styled(Link)`
  height: 100%;
  text-decoration: none;
  vertical-align: center;
  margin: 0 4%;
`;
const MainLogoImg = styled.img`
  alt: "";
  height: 50%;
`;
const MainLogoName = styled.span`
  color: white;
  white-space: nowrap;
  font-size: 24px;
  font-family: "InterSemiBold";
`;
