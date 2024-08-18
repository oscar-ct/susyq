"use client";

import BackButton from "@/components/BackButton";
import Image from "next/image";
import susy from "/public/images/susyQCleaningServices.png"


const NotFoundPage = () => {
    return (
        <>
            <div className={"flex justify-start h-min"}>
                <BackButton/>
            </div>
            <div className={"max-w-screen-xl px-4 lg:px-8 mx-auto flex justify-center pt-10"}>

                <div className="hero">
                    <div className="text-center hero-content">
                        <div className="max-w-lg">
                            <h1 className="text-8xl font-bold mb-8"> 404
                            </h1>
                            <p className="text-3xl mb-8">
                                This page does not exist.
                            </p>
                            <div className={"flex justify-center"}>
                                <Image
                                    priority
                                    className={"object-scale-down w-full h-[420px]"}
                                    width={420}
                                    height={420}
                                    src={susy}
                                    alt={"susy"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default NotFoundPage;