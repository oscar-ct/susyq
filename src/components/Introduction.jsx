import Image from "next/image";
import susy from "/public/images/susyQCleaningServices.png"
// import speech from "../../public/images/FreeVector-Speech-Bubble-Vector-removebg-preview.png"
import { HiLightningBolt } from "react-icons/hi";
import IntroductionSwiper from "@/components/IntroductionSwiper";
import IntroductionBackground from "@/components/IntroductionBackground";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";
// import {useEffect} from "react";


const Introduction = () => {

    // useEffect(() => {
    //
    // }, [])



    return (
        <IntroductionBackground>
            <div className={"h-[42rem] relative"}>
                <div className={"max-w-screen-xl px-4 lg:px-8 mx-auto relative h-full"}>
                    <div className={"w-full flex flex-col items-center sm:flex-row sm:justify-start"}>
                        <div className={"pt-5 w-full sm:w-min"}>
                            <IntroductionSwiper/>
                        </div>
                        <div className={"z-10 -translate-y-20 translate-x-8 sm:translate-y-12 sm:translate-x-0"}>
                            {/*<div className={"flex"}>*/}
                                {/*<Image*/}
                                {/*    priority*/}
                                {/*    className={"hidden object-scale-down w-full h-[200px] translate-x-40 -translate-y-5 md:block"}*/}
                                {/*    width={300}*/}
                                {/*    height={200}*/}
                                {/*    src={speech}*/}
                                {/*    alt={"susy"}*/}
                                {/*/>*/}
                                {/*<span className={"hidden md:block absolute pl-48 pt-8 text-xl text-gray-500 w-[400px] leading-tight text-center"}>I specialize in cleaning homes and businesses in Austin, TX</span>*/}
                                <Image
                                    priority
                                    className={"w-max h-max object-cover sm:object-scale-down"}
                                    width={420}
                                    height={420}
                                    src={susy}
                                    alt={"susy"}
                                />
                            {/*</div>*/}
                        </div>
                    </div>
                </div>
                <div className={"absolute bottom-0 w-full bg-cyan-600 shadow-2xl md:bottom-16"}>
                    <div className={"py-8 px-4 w-full h-full max-w-screen-xl mx-auto md:py-8 lg:px-8"}>
                        <div
                            className={"gap-4 h-full flex flex-col items-center text-white md:flex-row md:justify-between"}>
                            <div className={"h-28 flex items-center"}>
                                <p className={" text-center text-2xl w-full font-light"}><span
                                    className={"font-bold pr-1"}><span className={"text-lime-400"}>Green house</span> cleaning services</span> in the Austin
                                    metro area.
                                </p>
                            </div>

                            <Link className={"mb-5 md:mb-0 md:mt-5 rounded-full"} href={"/schedule"}>
                                <CustomButton customClass={"h-16"} id={"faq"} route={"/schedule"} navigate={true}>
                                    <div
                                        className={"text-xl flex items-center uppercase truncate"}>
                                        <HiLightningBolt/>
                                        <span className={"pl-3"}>Schedule Now</span>
                                    </div>
                                </CustomButton>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </IntroductionBackground>

        // <div className={"h-[42rem] relative"}>
        //     <Image
        //         priority
        //         className={"overflow-hidden rotate-180 absolute object-cover object-bottom w-full h-full"}
        //         width={2400}
        //         height={900}
        //         src={parallaxBlue}
        //         alt={"susy"}
        //         quality={100}
        //     />
        //     <div className={"max-w-screen-xl px-4 lg:px-8 mx-auto relative h-full"}>
        //         <div className={"w-full flex"}>
        //             <IntroductionSwiper/>
        //             <div className={"absolute right-0 z-10 translate-y-8 md:translate-y-14 lg:-translate-x-10"}>
        //                 <div className={"flex"}>
        //                     <Image
        //                         priority
        //                         className={"hidden object-cover w-full h-[200px] translate-x-40 -translate-y-5 md:block"}
        //                         width={300}
        //                         height={200}
        //                         src={speech}
        //                         alt={"susy"}
        //                     />
        //                     <span className={"hidden md:block absolute pl-48 pt-10 text-xl text-gray-500 w-[400px] leading-tight text-center"}>We service homes and businesses in Austin, Texas</span>
        //                     <Image
        //                         priority
        //                         className={"object-cover w-full h-[400px] lg:h-[420px]"}
        //                         width={420}
        //                         height={420}
        //                         src={susy}
        //                         alt={"susy"}
        //                     />
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        //     <div className={"absolute bottom-0 w-full bg-cyan-600 shadow-2xl md:bottom-16"}>
        //         <div className={"py-8 px-4 w-full h-full max-w-screen-xl mx-auto md:py-8 lg:px-8"}>
        //             <div className={"gap-4 h-full flex flex-col items-center text-white md:flex-row md:justify-between"}>
        //                 <div className={"h-28 flex items-center"}>
        //                     <p className={" text-center text-2xl w-full font-light"}><span className={"font-bold pr-1"}>Green house cleaning services</span> in the Austin metro area.
        //                     </p>
        //                 </div>
        //
        //                 <div className={"pt-5"}>
        //                     <button className={"text-xl flex items-center uppercase rounded-md border-2 p-5 truncate"}>
        //                     <HiLightningBolt/>
        //                         <span className={"pl-3"}>Schedule Now</span>
        //                     </button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </div>
    );
};

export default Introduction;