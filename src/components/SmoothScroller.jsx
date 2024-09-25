"use client"

import { ReactLenis } from 'lenis/react'

const SmoothScroller = ({children}) => {

    return (
        <ReactLenis root>
            {children}
        </ReactLenis>
    )
};

export default SmoothScroller;