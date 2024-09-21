import { motion } from "framer-motion";
import NavbarMobileMenuItem from "@/components/NavbarMobileMenuItem";
import {TiHomeOutline, TiMail, TiStarOutline, TiTabsOutline, TiThumbsUp} from "react-icons/ti";
import CustomButton from "@/components/CustomButton";
import {useParams, useRouter} from "next/navigation";
import Link from "next/link";
import {useEffect, useState} from "react";

const NavbarMobileMenu = ({toggle}) => {

    const variants = {
        open: {
            visibility: "visible",
            transition: { staggerChildren: 0.07, delayChildren: 0.2 }
        },
        closed: {
            visibility: "hidden",
            transition: { staggerChildren: 0.05, staggerDirection: -1 }
        }
    };
    const iconSize = 32;

    const params = useParams();
    const router = useRouter();

    const navigate = () => {
        toggle();
        router.push("/schedule");
    };

    const [hash, setHash] = useState("");

    useEffect(() => {
        if (window.location.hash === `#${hash}`) {
            const element = document.getElementById(hash);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: "center"});
            }
        }
    }, [params, hash]);

    const onClick = (id) => {
        setHash(id);
        toggle();
    };


    return (
        <motion.ul className={"z-50 p-8 absolute top-14 w-72"} variants={variants}>
            <NavbarMobileMenuItem>
                <Link href={"/#home"} scroll={false} onClick={onClick} className={"flex"}>
                    <TiHomeOutline size={iconSize}/>
                    <div className={"text-2xl uppercase pl-5 w-full"}>Home</div>
                </Link>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem>
                <Link href={"/#services"} scroll={false} onClick={onClick} className={"flex"}>
                    <TiThumbsUp size={iconSize}/>
                    <div className={"text-2xl uppercase pl-5 w-full"}>Services</div>
                </Link>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem>
                <Link href={"/#about"} scroll={false} onClick={onClick} className={"flex"}>
                    <TiStarOutline size={iconSize}/>
                    <div className={"text-2xl uppercase pl-5 w-full"}>About</div>
                </Link>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem>
                <Link href={"/#faq"} scroll={false} onClick={onClick} className={"flex"}>
                    <TiTabsOutline size={iconSize}/>
                    <div className={"text-2xl uppercase pl-5 w-full"}>FAQ</div>
                </Link>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem>
                <Link href={"/#contact"} scroll={false} onClick={onClick} className={"flex"}>
                    <TiMail size={iconSize}/>
                    <div className={"text-2xl uppercase pl-5 w-full"}>Contact</div>
                </Link>
            </NavbarMobileMenuItem>
            <NavbarMobileMenuItem>
                <CustomButton customClass={"h-14 bg-white"} onClick={navigate}>
                    <div className={"text-xl flex items-center uppercase truncate"}>
                        <span className={"text-susy"}>Schedule Now</span>
                    </div>
                </CustomButton>
            </NavbarMobileMenuItem>
        </motion.ul>
    );
};

export default NavbarMobileMenu;