import Image from "next/image";
import susy from "/public/images/susyQCleaningServices.png"
import bg from "../../../public/images/zoddex-WGoGhVqtWyc-unsplash-original.jpg";
import IntroductionSwiper from "@/components/introduction/IntroductionSwiper";
import CTA from "@/components/CTA";


const IntroductionSection = () => {
    return (
        <section className={"relative"}>
            <div className={"mx-auto max-w-screen-xl flex flex-col px-4 md:flex-row md:items-center lg:px-8"}>
                <div className={"translate-y-4 md:translate-y-0 md:w-5/12 lg:w-6/12 xl:w-7/12"}>
                    <IntroductionSwiper/>
                </div>
                <div className="flex justify-center md:justify-end md:w-7/12 lg:w-6/12 xl:w-5/12">
                    <div
                        className="relative w-[375px] h-[392px] z-10 translate-y-4 sm:w-[421] sm:h-[441]"
                        style={{minWidth: '375px', minHeight: '392px'}}
                    >
                        <Image
                            quality={100}
                            priority
                            width={421}
                            height={441}
                            src={susy}
                            alt="Susy"
                            className={"object-cover"}
                        />
                    </div>
                </div>
            </div>

            {/*BANNER WITH CTA BTN*/}
            <div className={"bg-cyan-600 py-14"}>
                <div className={"mx-auto max-w-screen-xl gap-14 flex flex-col items-center text-white px-4 lg:px-8 md:gap-6 md:flex-row md:justify-between"}>
                    <h1 className={"text-center text-2xl font-light md:text-start"}>
                        <span className={"font-bold pr-1"}><span className={"text-lime-400"}>Green house</span> cleaning services</span> in
                        the Austin metro area.
                    </h1>
                    <CTA/>
                </div>
            </div>

            {/*BLUE WAVES BACKGROUND IMAGE*/}
            <Image
                quality={100}
                priority
                src={bg}
                alt="blue waves"
                fill={true}
                className={"rotate-180 object-cover object-bottom -z-10"}
            />
        </section>
    );
};

export default IntroductionSection;