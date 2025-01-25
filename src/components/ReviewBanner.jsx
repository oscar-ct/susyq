import Image from "next/image";
import yelpIcon from "@/assets/png/5starYelp.png";
import googleIcon from "@/assets/png/google_g_icon_download.png";
import angiesIcon from "@/assets/png/angies-list_logo.png";

const ReviewBanner = () => {
    return (
        <section className={"bg-zinc-100 sm:bg-susy w-full mx-auto px-4 lg:px-8"}>
            <div className={"w-full flex flex-col lg:flex-row items-center justify-around py-6"}>
                <h1 className={"text-gray-600 pb-4 text-2xl lg:pb-0 xl:text-4xl sm:text-white sm:font-semibold"}>Service You Can Trust!</h1>
                <div className={"flex items-center gap-6 md:gap-10"}>
                    <a
                        aria-label="portfolio"
                        href={"https://www.angi.com/companylist/us/tx/austin/susy-q-cleaning-reviews-7976733.htm#reviews"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className={"object-scale-down"}
                            priority
                            width={150}
                            height={50}
                            src={angiesIcon}
                            alt={"angies list"}
                        />
                    </a>
                    <a
                        aria-label="portfolio"
                        href={"https://www.yelp.com/biz/susy-q-cleaning-austin"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className={"object-scale-down"}
                            priority
                            width={150}
                            height={50}
                            src={yelpIcon}
                            alt={"yelp reviews"}
                        />
                    </a>
                    <a
                        aria-label="portfolio"
                        href={"https://www.google.com/maps/place/Susy+Q+Cleaning/@30.4249436,-97.7701436,10.02z/data=!4m6!3m5!1s0x8644ca319618068d:0x49ea24942bbe87a3!8m2!3d30.4206125!4d-97.763874!16s%2Fg%2F1v8x2l5y?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={"flex flex-col lg:flex-row gap-2 items-center"}
                    >
                        <Image
                            className={"object-scale-down"}
                            priority
                            width={48}
                            height={48}
                            src={googleIcon}
                            alt={"google reviews"}
                        />
                        <span className={"hidden lg:block text-center text-white underline underline-offset-4"}>Verified Customer Reviews</span>
                    </a>
                </div>
            </div>
        </section>
    );
};

export default ReviewBanner;