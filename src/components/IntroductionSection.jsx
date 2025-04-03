import Image from "next/image";
import susy from "/public/images/susyQCleaningServices.png"
import bg from "../../public/images/zoddex-WGoGhVqtWyc-unsplash-original.jpg";
import { HiLightningBolt } from "react-icons/hi";
import IntroductionSwiper from "@/components/IntroductionSwiper";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";



const IntroductionSection = () => {

    return (
        <section className={"h-[49rem] md:h-[40rem] relative"}>
            <div className={"w-full h-full flex flex-col justify-between"}>
                <div className={"w-full h-full mx-auto max-w-screen-xl"}>
                    <div className={"w-full h-full flex flex-col md:flex-row md:justify-center"}>
                       <div className={"h-full flex items-center w-full md:w-5/12 lg:w-6/12 xl:w-7/12"}>
                           <div className={"pl-3 w-full pt-3 md:pl-5 lg:pl-16"}>
                               <IntroductionSwiper/>
                           </div>
                       </div>
                        <div className={"h-full w-full md:w-7/12 lg:w-6/12 xl:w-5/12 flex justify-center md:justify-end md:items-end"}>
                            <div className={"z-10 translate-y-5 md:pr-5 lg:pr-16"}>
                                <Image
                                    quality={100}
                                    unoptimized={true}
                                    priority
                                    width={420}
                                    height={440}
                                    src={susy}
                                    alt={"susy"}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                {/*BANNER BELOW*/}
                <div className={"bg-cyan-600"}>
                    <div className={"w-full h-full mx-auto max-w-screen-xl py-8 px-4 lg:px-8"}>
                        <div className={"gap-4 h-full flex flex-col items-center text-white md:flex-row md:justify-between"}>
                            <div className={"h-28 flex items-center"}>
                                <h3 className={"text-center text-2xl w-full font-light"}><span
                                    className={"font-bold pr-1"}><span className={"text-lime-400"}>Green house</span> cleaning services</span> in
                                    the Austin
                                    metro area.
                                </h3>
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
            {/*BACKGROUND IMAGE BELOW*/}
            <Image
                quality={100}
                priority
                src={bg}
                alt="background image"
                fill={true}
                className={"rotate-180 object-cover object-bottom -z-10"}
            />
        </section>
    );
};

export default IntroductionSection;