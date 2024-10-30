"use client"

import { Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
import { TiLeaf } from "react-icons/ti";
import { PiHandshake } from "react-icons/pi";



const IntroductionSwiper = () => {
    return (
        <div className={"h-full w-full"}>
            <Swiper
                slidesPerView={1}
                autoplay={{
                    delay: 10500,
                    disableOnInteraction: false
                }}
                modules={[EffectFade, Autoplay]}
                effect={"fade"}
                fadeEffect={{crossFade: true}}
            >
                <SwiperSlide>
                    <div className={"flex flex-col md:text-center text-white"}>
                        <h1 className={"text-2xl sm:text-[5.5vw] xl:text-[70px] font-light uppercase leading-tight"}>Hello,
                            this is Susy</h1>
                        <h4 className={"text-lg md:text-2xl font-light"}>Call <a href={"tel:512-640-6264"} className={"underline"}>512-640-6264</a></h4>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={"flex flex-col md:text-center text-white"}>
                        <h1 className={"inline-block text-2xl sm:text-[5.5vw] xl:text-[70px] font-light uppercase leading-tight"}>100% Green cleaning <TiLeaf className={"text-lime-400 inline-block"}/></h1>
                        <h4 className={"text-lg md:text-2xl font-light"}>Beautiful. Clean. Safe.</h4>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={"flex flex-col md:text-center text-2xl sm:text-[5.5vw] xl:text-[70px] font-light uppercase text-white leading-tight"}>
                        <h1>Satisfaction Guaranteed</h1>
                        <div className={"flex md:justify-center"}> <PiHandshake/></div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default IntroductionSwiper;