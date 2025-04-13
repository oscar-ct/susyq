import Image from "next/image";
import yelpIcon from "@/assets/png/5starYelp.png";
import googleIcon from "@/assets/png/google_g_icon_download.png";
import angiesIcon from "@/assets/png/angies-list_logo.png";

const ReviewBanner = () => {
    return (
        <section className={"bg-gray-100 w-full px-4 sm:bg-susy lg:px-8"}>
            <div className={"pb-14 w-full flex flex-col justify-between gap-8 sm:py-14 md:py-6 lg:flex-row lg:justify-evenly lg:items-center"}>
                <div className={"text-center text-gray-600 text-2xl sm:text-white sm:font-semibold"}>
                    Service You Can Trust! – See Our Reviews
                </div>
                <div className={"flex justify-evenly gap-4 items-center lg:gap-10"}>
                    <a
                        className={"flex justify-center"}
                        aria-label="portfolio"
                        href={"https://www.angi.com/companylist/us/tx/austin/susy-q-cleaning-reviews-7976733.htm#reviews"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className={"w-full h-auto max-w-[150px]"}
                            priority
                            width={150}
                            height={50}
                            src={angiesIcon}
                            alt={"angies list"}
                        />
                    </a>
                    <a
                        className={"flex justify-center"}
                        aria-label="portfolio"
                        href={"https://www.yelp.com/biz/susy-q-cleaning-austin-2"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className={"w-full h-auto max-w-[150px]"}
                            priority
                            width={150}
                            height={50}
                            src={yelpIcon}
                            alt={"yelp reviews"}
                        />
                    </a>
                    <a
                        className={"flex flex-col justify-center items-center"}
                        aria-label="portfolio"
                        href={"https://www.google.com/maps/place/Susy+Q+Cleaning/@30.4249436,-97.7701436,10.02z/data=!4m6!3m5!1s0x8644ca319618068d:0x49ea24942bbe87a3!8m2!3d30.4206125!4d-97.763874!16s%2Fg%2F1v8x2l5y?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className={"w-full h-auto max-h-[48px] max-w-[48px]"}
                            priority
                            width={48}
                            height={48}
                            src={googleIcon}
                            alt={"google reviews"}
                        />
                        <span className={"hidden text-sm text-center text-white underline underline-offset-4 sm:block"}>4.5/5 Customer Rating</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ReviewBanner;