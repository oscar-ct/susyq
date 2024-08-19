"use client"

import {useEffect} from "react";
import Lenis from "lenis";

const SmoothScroller = () => {

    useEffect( () => {
        const lenis = new Lenis()
        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }
        requestAnimationFrame(raf)
    });

    return null;
};

export default SmoothScroller;