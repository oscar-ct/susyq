"use client"

import {useRef} from "react";
import {useScroll, useTransform, motion} from "framer-motion";
import Image from "next/image";
import Background from "../../../public/images/paralax-1.jpg"
import { BiSolidQuoteLeft } from "react-icons/bi";
import { BiSolidQuoteRight } from "react-icons/bi";

const ErmaBombeck = () => {

    const container = useRef();
    const { scrollYProgress } = useScroll({
        target: container,
        offset: ["start end", 'end start']
    })
    const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

    return (
        <div
            ref={container}
            className='relative flex items-center justify-center h-[400px] overflow-hidden'
            style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
        >
            <div className='z-10 flex flex-col items-center justify-center text-white'>
                    <div className="text-5xl inline-block px-4 md:px-20">
                        <BiSolidQuoteLeft className={"inline-block -translate-y-5"}/>
                        <span className={"uppercase font-light md:leading-relaxed"}>My idea of house work is to sweep the room with a glance.</span>
                        <BiSolidQuoteRight className={"inline-block -translate-y-5"}/>
                    </div>
                <span className={"pt-5 md:pt-0 uppercase text-2xl font-light"}>— Emma Bombeck</span>
            </div>
            <div className='fixed top-[-10vh] left-0 h-[125vh] w-full'>
                <motion.div style={{y}} className='relative w-full h-full'>
                    <Image src={Background} fill alt="austin" className={"object-cover"}/>
                </motion.div>
            </div>
        </div>
    )
};

export default ErmaBombeck;