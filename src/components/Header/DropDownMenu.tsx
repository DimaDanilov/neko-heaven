import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface IDropDownMenuProps {
    pinStatus: boolean
    hoverStatus?: boolean
    categories: string[]
}
interface IDropDownMenuStyleProps {
    pinStatus: boolean
    hoverStatus: boolean
}

// Make first letter big (word -> Word)
const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

export const DropDownMenu = ({ pinStatus, hoverStatus, categories }: IDropDownMenuProps) => {

    const categoryList = categories.map((category, index) =>
        <Category key={index} to={"/" + category}>{capitalizeFirstLetter(category)}</Category >
    )

    return (
        <CategoriesContainer pinStatus={pinStatus} hoverStatus={hoverStatus ? hoverStatus : false}>
            <CategoriesList>
                {categoryList}
            </CategoriesList>
        </CategoriesContainer>
    )
}

const CategoriesContainer = styled.div<IDropDownMenuStyleProps>`
    display: ${props => (props.pinStatus || props.hoverStatus) ? "block" : "none"};
    width: 100%;
    height: 50px;
    position: absolute;
    z-index: 1;
    top: 50px;
    left: 0;
    background: linear-gradient(#E9A8D2, #D49BBF);
    @media (max-width: 768px) {
        background: linear-gradient(#E184C0B4, #c272a4b4);
        height: fit-content;
    }
`
const Category = styled(Link)`
    color: white;
    text-decoration: none;
    font-size: 22px;
    font-family: "InterLight";
    height: 100%;
    padding: 0 30px 0 0;
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

    @media (max-width: 768px) {
        padding: 10px 30px 10px 0;
    }
`
const CategoriesList = styled.div`
    height: 100%;
    margin: 0 4%;
    width: fit-content;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    @media (max-width: 768px) {
        height: fit-content;
        flex-direction: column;
    }
`
