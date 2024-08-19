import { motion } from "framer-motion";
import NavbarMobileMenuItem from "@/components/NavbarMobileMenuItem";
import {TiHomeOutline, TiMail, TiStarOutline, TiTabsOutline, TiThumbsUp} from "react-icons/ti";
import CustomButton from "@/components/CustomButton";
import {useParams, useRouter} from "next/navigation";
import {useEffect, useState} from "react";

const NavbarMobileMenu = ({toggle}) => {

    const variants = {
        open: {
            transition: { staggerChildren: 0.07, delayChildren: 0.2 }
        },
        closed: {
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    };
    const iconSize = 32;

    const params = useParams();
    const router = useRouter();

    const navigate = () => {
        router.push("/schedule");
    };

    // const [hash, setHash] = useState("")
    //
    //
    // useEffect(() => {
    //     if (window.location.hash === `#${hash}`) {
    //         const element = document.getElementById(hash);
    //         if (element) {
    //             element.scrollIntoView({ behavior: 'smooth', block: "center"});
    //         }
    //     }
    // }, [params, hash]);
    //


    return (
        <motion.ul className={"z-50 p-8 absolute top-14 w-72"} variants={variants}>
            <NavbarMobileMenuItem id={"home"} toggle={toggle}>
                <div className={"mr-5"}>
                    <TiHomeOutline size={iconSize}/>
                </div>
                <span className={"text-2xl uppercase"}>Home</span>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem id={"services"} toggle={toggle}>
                <div className={"mr-5"}>
                    <TiThumbsUp size={iconSize}/>
                </div>
                <span className={"text-2xl uppercase"}>Services</span>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem id={"about"} toggle={toggle}>
                <div className={"mr-5"}>
                    <TiStarOutline size={iconSize}/>
                </div>
                <span className={"text-2xl uppercase"}>About</span>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem id={"faq"} toggle={toggle}>
                <div className={"mr-5"}>
                    <TiTabsOutline size={iconSize}/>
                </div>
                <span className={"text-2xl uppercase"}>FAQ</span>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem id={"contact"} toggle={toggle}>
                <div className={"mr-5"}>
                    <TiMail size={iconSize}/>
                </div>
                <span className={"text-2xl uppercase"}>Contact</span>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem toggle={toggle}>
                <CustomButton customClass={"h-14 bg-white"} onClick={navigate}>
                    <div className={"text-xl flex items-center uppercase truncate"}>
                        <span className={"text-cyan-600"}>Schedule Now</span>
                    </div>
                </CustomButton>
            </NavbarMobileMenuItem>
        </motion.ul>
    );
};

export default NavbarMobileMenu;