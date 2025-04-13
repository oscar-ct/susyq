"use client"

import {useRef} from "react";
import {useScroll, useTransform, motion} from "framer-motion";
import Image from "next/image";
import Background from "/public/images/greatingsFromAustinLowRes.jpg"
import { TiStarOutline } from "react-icons/ti";
import CTA from "@/components/CTA";

const KeepAustinWeird = () => {

    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
            ref={container}
            className='relative flex items-center justify-center py-20 overflow-hidden'
            style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
            <div className='z-10 flex flex-col items-center justify-center text-white'>
                <TiStarOutline size={80}/>
                <p className='py-10 w-[300px] md:w-[800px] text-7xl uppercase text-center font-bold'>Keep austin <span className={"text-susy"}>clean</span> and weird</p>
                <CTA/>
            </div>
            <div className='fixed top-[-10%] left-0 h-[125%] w-full'>
                <motion.div style={{y}} className='relative w-full h-full'>
                    <Image src={Background} fill alt="austin" className={"object-cover"}/>
                </motion.div>
            </div>
        </div>
    );
};

export default KeepAustinWeird;