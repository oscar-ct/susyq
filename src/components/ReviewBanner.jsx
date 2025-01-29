import Image from "next/image";
import yelpIcon from "@/assets/png/5starYelp.png";
import googleIcon from "@/assets/png/google_g_icon_download.png";
import angiesIcon from "@/assets/png/angies-list_logo.png";

const ReviewBanner = () => {
    return (
        <section className={"bg-zinc-100 w-full mx-auto px-4 sm:bg-susy lg:px-8"}>
            <div className={"mx-auto w-full max-w-screen-2xl flex flex-col items-center py-6 lg:flex-row"}>
                <h1 className={"flex justify-start text-gray-600 pb-4 text-2xl sm:text-white sm:font-semibold lg:w-5/12 lg:pb-0 xl:text-4xl xl:w-7/12"}>
                    Service You Can Trust!
                </h1>
                <div className={"w-full flex justify-end gap-4 items-center sm:gap-0 lg:w-7/12 xl:w-5/12"}>
                    <a
                        className={"w-5/12 flex justify-center sm:w-4/12"}
                        aria-label="portfolio"
                        href={"https://www.angi.com/companylist/us/tx/austin/susy-q-cleaning-reviews-7976733.htm#reviews"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className={"w-full max-w-[150px]"}
                            priority
                            width={150}
                            height={50}
                            src={angiesIcon}
                            alt={"angies list"}
                        />
                    </a>
                    <a
                        className={"w-5/12 flex justify-center sm:w-4/12"}
                        aria-label="portfolio"
                        href={"https://www.yelp.com/biz/susy-q-cleaning-austin"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className={"w-full max-w-[150px]"}
                            priority
                            width={150}
                            height={50}
                            src={yelpIcon}
                            alt={"yelp reviews"}
                        />
                    </a>
                    <a
                        className={"w-2/12 flex flex-col justify-center items-center sm:w-4/12"}
                        aria-label="portfolio"
                        href={"https://www.google.com/maps/place/Susy+Q+Cleaning/@30.4249436,-97.7701436,10.02z/data=!4m6!3m5!1s0x8644ca319618068d:0x49ea24942bbe87a3!8m2!3d30.4206125!4d-97.763874!16s%2Fg%2F1v8x2l5y?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D"}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <Image
                            className={"w-full max-w-[48px]"}
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