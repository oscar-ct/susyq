"use client";

import {motion} from "framer-motion";
import {HiLightningBolt} from "react-icons/hi";
import {useRouter} from "next/navigation";

const Cta = () => {

    const router = useRouter();

    return (
        <div className={"cursor-pointer"}>
            <motion.div
                whileTap={{ scale: 0.9 }}
                onClick={() => router.push("/schedule")}
                className={`w-60 h-16 relative rounded ring-white ring px-5 flex items-center text-base overflow-hidden group bg-susy md:hover:bg-gradient-to-r md:hover:from-lime-500 md:hover:to-lime-400 text-white md:hover:ring-2 md:hover:ring-offset-0 md:hover:ring-lime-400 md:transition-all md:ease-out md:duration-300`}
            >
                <span className={"md:absolute md:right-0 md:w-8 md:h-32 md:-mt-12 md:transition-all md:duration-500 md:transform md:translate-x-12 md:bg-white md:opacity-10 md:rotate-12 md:group-hover:-translate-x-40 md:ease"}/>

                <div className={"text-xl flex gap-3 items-center uppercase"}>
                    <HiLightningBolt/>
                    <span>Schedule Now</span>
                </div>

            </motion.div>
        </div>
    );
};

export default Cta;