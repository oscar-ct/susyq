"use client"

import Link from "next/link";
import {useEffect} from "react";
import {useParams} from "next/navigation";

const NavScrollToButton = ({children, id= ""}) => {

    const params = useParams();

    // const handleScroll = () => {
    //     const element = document.getElementById(id);
    //     if (element) {
    //         element.scrollIntoView({ behavior: 'smooth', block: "center"});
    //     }
    // };

    useEffect(() => {
        if (window.location.hash === `#${id}`) {
            const element = document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth', block: "center"});
            }
        }
    }, [params, id])

    return <Link href={`/#${id}`} scroll={false} className={"uppercase py-3.5 px-2 md:px-4 flex flex-col items-center hover:bg-susy hover:text-white transition duration-150 ease-in-out font-light"}>{children}</Link>;
};

export default NavScrollToButton;