import styled from 'styled-components';

interface IDropDownMenuProps {
    pinStatus: boolean
    hoverStatus: boolean
}

export const DropDownMenu = ({ pinStatus, hoverStatus }: IDropDownMenuProps) => {
    return (
        <CategoriesContainer pinStatus={pinStatus} hoverStatus={hoverStatus}>
            <CategoriesList>
                <Category href="#">Neko</Category>
                <Category href="#">Husbando</Category>
                <Category href="#">Kitsune</Category>
                <Category href="#">Waifu</Category>
            </CategoriesList>
        </CategoriesContainer>
    )
}

const CategoriesContainer = styled.div<IDropDownMenuProps>`
    display: ${props => (props.pinStatus || props.hoverStatus) ? "block" : "none"};
    width: 100%;
    height: 50px;
    position: absolute;
    z-index: 1;
    top: 50px;
    left: 0;
    background: linear-gradient(#E184C0, #CE7BB0);
`
const Category = styled.a`
    color: white;
    text-decoration: none;
    font-size: 22px;
    font-family: "InterLight";
    height: 100%;
    padding: 0 20px 0 0;
    display: flex;
    justify-content: center;
    align-items: center;
    white-space: nowrap;
    position: relative;

    &::after {
        content: "";
        position: absolute;
        display: block;
        margin: auto;
        height: 5px;
        width: 0;
        bottom: 0;
        background: transparent;
        transition: all 0.3s;
        border-radius: 2px;
    }
    &:hover::after, &.active::after {
        width: 100%;
        background: #FFBCD1;
    }
`
const CategoriesList = styled.div`
    height: 100%;
    margin: 0 4%;
    width: fit-content;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    gap: 30px;
`
