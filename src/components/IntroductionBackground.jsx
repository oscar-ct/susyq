"use client"

import React, {useRef} from 'react';
import {motion, useScroll, useTransform} from "framer-motion";
import Image from "next/image";
import Background from "../../public/images/zoddex-WGoGhVqtWyc-unsplash-original.jpg";
// import parallaxBlue from "/public/images/paralax-blue-3.jpg"


const IntroductionBackground = ({children}) => {
    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
            ref={container}
            className='relative flex items-center justify-center h-[41rem] overflow-hidden'
            style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
            <div className='z-10 flex flex-col w-full text-white'>
                {children}
            </div>
            <div className='fixed top-[-10vh] left-0 h-[125vh] w-full'>
                <motion.div style={{y}} className='relative w-full h-full'>
                    <Image
                        priority
                        className={"absolute object-cover h-full w-full rotate-180"}
                        width={2400}
                        height={1350}
                        src={Background}
                        alt={"susy"}
                        quality={100}
                    />
                </motion.div>
            </div>
        </div>
    )
};

export default IntroductionBackground;