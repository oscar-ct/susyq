"use client"

import { Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade, Pagination} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import 'swiper/css/pagination';
import { TiLeaf } from "react-icons/ti";
import {useEffect, useState} from "react";



const IntroductionSwiper = () => {

    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(() => {
        if (windowWidth === 0) setWindowWidth(window.innerWidth);
        function handleResize() {
            setWindowWidth(window.innerWidth);
        }
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, [windowWidth]);


    return (
        <div className={"h-full w-full"}>
            <Swiper
                slidesPerView={1}
                autoplay={{
                    delay: 10500,
                    disableOnInteraction: false
                }}
                modules={[EffectFade, Autoplay, Pagination]}
                effect={"fade"}
                fadeEffect={{crossFade: true}}
                pagination={windowWidth > 1024}
            >
                <SwiperSlide>
                    <div className={"flex flex-col text-white"}>
                        <h1 className={"text-2xl sm:text-[6vw] xl:text-8xl font-light uppercase leading-tight"}>Hello,
                            this is Susy</h1>
                        <h4 className={"text-lg md:text-2xl font-light"}>Call <a href={"tel:512-640-6264"} className={"underline"}>512-640-6264</a></h4>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={"flex flex-col text-white"}>
                        <h1 className={"inline-block text-2xl sm:text-[6vw] xl:text-8xl font-light uppercase leading-tight"}>100% Green cleaning <TiLeaf className={"text-lime-400 inline-block"}/></h1>
                        <h4 className={"text-lg md:text-2xl font-light"}>Beautiful. Clean. Safe.</h4>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={"flex flex-col text-2xl sm:text-[6vw] xl:text-8xl font-light uppercase text-white leading-tight"}>
                        <h1>Satisfaction Guaranteed</h1>
                        {/*<div className={"text-7xl"}><PiHandshake/></div>*/}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default IntroductionSwiper;