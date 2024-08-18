import { motion } from "framer-motion";
import NavbarMobileMenuItem from "@/components/NavbarMobileMenuItem";
import {TiHomeOutline, TiMail, TiStarOutline, TiTabsOutline, TiThumbsUp} from "react-icons/ti";

const NavbarMobileMenu = () => {

    const variants = {
        open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 }
        },
        closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    };
    const iconSize = 32;
    return (
        <motion.ul className={"z-50 p-8 absolute top-14 w-72"} variants={variants}>
            <NavbarMobileMenuItem>
                <div className={"mr-5"}>
                    <TiHomeOutline size={iconSize}/>
                </div>
                <span className={"text-2xl uppercase"}>Home</span>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem>
                <div className={"mr-5"}>
                    <TiThumbsUp size={iconSize}/>
                </div>
                <span className={"text-2xl uppercase"}>Services</span>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem>
                <div className={"mr-5"}>
                    <TiStarOutline size={iconSize}/>
                </div>
                <span className={"text-2xl uppercase"}>About</span>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem>
                <div className={"mr-5"}>
                    <TiTabsOutline size={iconSize}/>
                </div>
                <span className={"text-2xl uppercase"}>FAQ</span>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem>
                <div className={"mr-5"}>
                    <TiMail size={iconSize}/>
                </div>
                <span className={"text-2xl uppercase"}>Contact</span>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem textColorClass={"text-cyan-600"}>
                <button className={"text-xl w-full bg-white flex items-center justify-center uppercase rounded-md border-2 p-5 truncate"}>
                    <span className={""}>Schedule Now</span>
                </button>
            </NavbarMobileMenuItem>
        </motion.ul>
    );
};

export default NavbarMobileMenu;