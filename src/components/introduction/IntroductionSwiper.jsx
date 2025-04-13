"use client"

import { Swiper, SwiperSlide} from "swiper/react";
import {Autoplay, EffectFade} from "swiper/modules";
import 'swiper/css';
import 'swiper/css/autoplay';
import 'swiper/css/effect-fade';
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
                modules={[EffectFade, Autoplay]}
                effect={"fade"}
                fadeEffect={{crossFade: true}}
                pagination={windowWidth > 1024}
            >
                <SwiperSlide>
                    <div className={"flex flex-col text-white"}>
                        <div className={"text-2xl sm:text-[6vw] xl:text-8xl font-light uppercase leading-tight"}>
                            Hello, this is Susy
                        </div>
                        <div className={"text-lg md:text-2xl font-light"}>
                            Call <a href={"tel:512-640-6264"} className={"underline"}>512-640-6264</a>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={"flex flex-col text-white"}>
                        <div className={"inline-block text-2xl sm:text-[6vw] xl:text-8xl font-light uppercase leading-tight"}>
                            100% Green cleaning <TiLeaf className={"text-lime-400 inline-block"}/>
                        </div>
                        <div className={"text-lg md:text-2xl font-light"}>
                            Beautiful. Clean. Safe.
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide>
                    <div className={"flex flex-col text-2xl sm:text-[5vw] xl:text-8xl font-light uppercase text-white leading-tight"}>
                        <div>Satisfaction Guaranteed</div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default IntroductionSwiper;