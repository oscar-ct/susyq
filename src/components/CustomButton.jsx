"use client";

import {motion} from "framer-motion";

const CustomButton = ({isDisabled = false, customClass="", children, onClick, type="button"}) => {


    return (
        <motion.button whileTap={{scale: 0.9}} onClick={onClick} className={`relative rounded-full ring-white ring-2 px-5 py-2.5 text-base ${customClass} ${isDisabled ? "bg-gray-100 text-gray-300" : "overflow-hidden group bg-susy relative md:hover:bg-gradient-to-r md:hover:from-lime-500 md:hover:to-lime-400 text-white md:hover:ring-2 md:hover:ring-offset-0 md:hover:ring-lime-400 md:transition-all md:ease-out md:duration-300"}`} disabled={isDisabled} type={type}>
            <span className={!isDisabled ? "md:absolute md:right-0 md:w-8 md:h-32 md:-mt-12 md:transition-all md:duration-500 md:transform md:translate-x-12 md:bg-white md:opacity-10 md:rotate-12 md:group-hover:-translate-x-40 md:ease" : ""}/>
            <span className={"relative"}>{children}</span>
        </motion.button>
    );
};


export default CustomButton;