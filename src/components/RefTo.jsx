"use client";

import {useRef} from 'react';

const RefTo = ({children, id = ""}) => {
    const ref = useRef(null);
    return <div id={id} ref={ref}>{children}</div>;
};

export default RefTo;