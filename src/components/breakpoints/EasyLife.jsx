"use client"

import {useRef} from 'react';
import {motion, useScroll, useTransform} from "framer-motion";
import {TiStarOutline} from "react-icons/ti";
import Image from "next/image";
import Background from "../../../public/images/ash-amplifies-NQ6Lh81BTRs-unsplash.jpg";
import CTA from "@/components/CTA";

const EasyLife = () => {
    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
            ref={container}
            className='relative flex items-center justify-center overflow-hidden py-20'
            style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
            <div className='z-10 flex flex-col items-center justify-center text-white'>
                <TiStarOutline size={80}/>
                <p className='py-10 w-full text-5xl uppercase text-center md:text-7xl md:w-[900px] font-bold'>
                    Let us make your life a little easier!!!
                </p>
                <CTA/>
            </div>
            <div className='fixed top-[-10vh] left-0 h-[125vh] w-full'>
                <motion.div style={{y}} className='relative w-full h-full'>
                    <Image src={Background} fill alt="austin" className={"object-cover"}/>
                </motion.div>
            </div>
        </div>
    );
};

export default EasyLife;