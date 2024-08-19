import {TiLeaf} from "react-icons/ti";
import { TiBriefcase } from "react-icons/ti";
import { TiArrowMinimiseOutline } from "react-icons/ti";
import { TiArrowMaximiseOutline } from "react-icons/ti";
import { TiHomeOutline } from "react-icons/ti";
import { TiShoppingBag } from "react-icons/ti";

const ServicesItem = ({title, content, iconName}) => {

    const iconSize = 75;

    const renderIcon = (iconName) => {
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


    return (
        <div className={"py-5 md:py-6 w-full md:w-6/12 flex"}>
            <div className={"px-8 flex justify-center items-start text-cyan-600"}>
                {renderIcon(iconName)}
            </div>
            <div className={"flex flex-col text-gray-500 font-light"}>
                <span className={"text-2xl"}>{title}</span>
                <p className={"pt-3 text-lg leading-tight"}>
                    {content}
                </p>
            </div>
        </div>
    );
};

export default ServicesItem;