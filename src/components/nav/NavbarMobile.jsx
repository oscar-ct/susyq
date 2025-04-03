"use client"

import { useRef } from "react";
import { motion, useCycle } from "framer-motion";
import useDimensions from "@/hooks/useDimensions";
import NavbarMobileMenuToggle from "@/components/nav/NavbarMobileMenuToggle";
import NavbarMobileMenu from "@/components/nav/NavbarMobileMenu";


const NavbarMobile = () => {
    const sidebar = {
        open: (height = 1000) => ({
            clipPath: `circle(${height * 2 + 200}px at 265px 30px)`,
            transition: {
                type: "spring",
                stiffness: 20,
                restDelta: 2
            },
        }),
        closed: {
            clipPath: "circle(0px at 265px 30px)",
            transition: {
                delay: 0.5,
                type: "spring",
                stiffness: 400,
                damping: 40
            },
        }
    };

    const [isOpen, toggleOpen] = useCycle(false, true);
    const containerRef = useRef(null);

    const { height } = useDimensions(containerRef);

    return (
        <motion.nav
            initial={false}
            animate={isOpen ? "open" : "closed"}
            custom={height}
            ref={containerRef}
            className={"w-72"}
        >
            <motion.div className={`fixed top-0 right-0 bottom-0 w-72 bg-susy`} variants={sidebar} />
            <NavbarMobileMenu toggle={() => toggleOpen()}/>
            <NavbarMobileMenuToggle toggle={() => toggleOpen()} />
        </motion.nav>
    );
};

export default NavbarMobile;