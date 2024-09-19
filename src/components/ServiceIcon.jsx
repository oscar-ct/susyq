import {TiLeaf} from "react-icons/ti";
import { TiBriefcase } from "react-icons/ti";
import { TiArrowMinimiseOutline } from "react-icons/ti";
import { TiArrowMaximiseOutline } from "react-icons/ti";
import { TiHomeOutline } from "react-icons/ti";
import { TiShoppingBag } from "react-icons/ti";

const ServiceIcon = ({ iconName, iconSize }) => {
    switch (iconName) {
        case 'TiLeaf':
            return <TiLeaf className={"text-lime-400"} size={iconSize}/>
        case 'TiBriefcase':
            return <TiBriefcase size={iconSize}/>
        case 'TiArrowMinimiseOutline':
            return <TiArrowMinimiseOutline size={iconSize}/>
        case 'TiArrowMaximiseOutline':
            return <TiArrowMaximiseOutline size={iconSize}/>
        case 'TiHomeOutline':
            return <TiHomeOutline size={iconSize}/>
        case 'TiShoppingBag':
            return <TiShoppingBag size={iconSize}/>
        default:
            return "unavailable";
    }
};

export default ServiceIcon;