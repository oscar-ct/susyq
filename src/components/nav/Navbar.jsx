import {TiThumbsUp} from "react-icons/ti";
import { TiHomeOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { TiTabsOutline } from "react-icons/ti";
import { TiMail } from "react-icons/ti";
import NavbarMobile from "@/components/nav/NavbarMobile";
import NavScrollToButton from "@/components/nav/NavScrollToButton";
import Link from "next/link";


const Navbar = () => {

    const iconSize = 24;

    return (
        <>
            <div className={"z-40 fixed right-0 top-0 md:hidden"}>
                <NavbarMobile/>
            </div>


            <div className={"fixed h-14 md:h-20 bg-white inset-0 z-30 border-b"}>
                <div className={"h-full flex justify-between max-w-screen-xl mx-auto px-4 lg:px-8 relative"}>


                    <Link href={"/"} className={"flex items-center"}>
                        <span className={"py-1 text-2xl md:text-4xl text-gray-500 font-light truncate"}>Susy Q Cleaning </span>
                    </Link>


                    <div className={"hidden text-gray-500 cursor-pointer md:flex md:items-center"}>
                        <NavScrollToButton id={"home"}>
                            <TiHomeOutline size={iconSize}/>
                            Home
                        </NavScrollToButton>
                        <NavScrollToButton id={"services"}>
                            <TiThumbsUp size={iconSize}/>
                            Services
                        </NavScrollToButton>
                        <NavScrollToButton id={"about"}>
                            <TiStarOutline size={iconSize}/>
                            About
                        </NavScrollToButton>
                        <NavScrollToButton id={"faq"}>
                            <TiTabsOutline size={iconSize}/>
                            FAQ
                        </NavScrollToButton>
                        <NavScrollToButton id={"contact"}>
                            <TiMail size={iconSize}/>
                            Contact
                        </NavScrollToButton>
                    </div>


                </div>
            </div>
        </>
    );
};

export default Navbar;