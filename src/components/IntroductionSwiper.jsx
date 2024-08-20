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
        <div className={"z-20 h-full w-[14rem] sm:w-[20rem] md:w-[20rem] lg:w-[30rem] xl:w-[48rem]  xl:pl-20"}>
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
                    <div className={"flex flex-col pt-5 md:pt-32"}>
                        <span className={"text-[6vw] xl:text-[70px] font-light uppercase text-white leading-tight"}>Hello, this is Susy</span>
                        <span className={"text-lg md:text-2xl text-white font-light"}>Call (512) 640-6264</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={"flex flex-col pt-5 lg:pt-24"}>
                        <span className={"text-[6vw] xl:text-[70px] font-light uppercase text-white leading-tight"}>100% Green cleaning <TiLeaf /></span>
                        <span className={"text-lg md:text-2xl text-white font-light"}>Beautiful. Clean. Safe.</span>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={"flex flex-col pt-5 lg:pt-32"}>
                        <span className={"text-[6vw] xl:text-[70px] font-light uppercase text-white leading-tight"}> Satisfaction Guaranteed <PiHandshake /></span>
                        {/*<span className={"text-lg md:text-2xl text-white font-light"}>100% Satisfaction</span>*/}
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default IntroductionSwiper;