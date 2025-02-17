"use client"

import Link from "next/link";
import {useEffect} from "react";
import {useParams} from "next/navigation";

const NavScrollToButton = ({children, id= ""}) => {

    const params = useParams();

    useEffect(() => {
        if (window.location.hash === `#${id}`) {
            const element = document.getElementById(id);
            if (id === "home") {
                window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                });
            } else {
                if (element) {
                    const elementPosition = element.getBoundingClientRect().top + window.scrollY - 50;
                    window.scrollTo({
                        top: elementPosition,
                        behavior: "smooth",
                    });
                    // element.scrollIntoView({ behavior: 'smooth', block: "start" });
                }
            }

        }
    }, [params, id])

    return <Link href={`/#${id}`} scroll={false} className={"uppercase h-20 px-2 md:px-4 flex flex-col justify-center items-center hover:bg-susy hover:text-white transition duration-150 ease-in-out font-light"}>{children}</Link>;
};

export default NavScrollToButton;