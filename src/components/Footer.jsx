import Image from "next/image";
import susy from "../../public/images/susyQCleaningServices.png"
import { FaLinkedin, FaXTwitter, FaFacebook, FaYelp } from "react-icons/fa6";
import {FaGoogle, FaInstagram} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-susy">
            <div className={"py-8 md:py-14 max-w-screen-xl px-4 lg:px-8 mx-auto"}>
                <div className={"flex flex-col justify-between w-full md:flex-row items-center"}>
                    <Link href={"/"}>
                        <Image
                            width={50}
                            height={50}
                            priority
                            className={"w-[50px] h-[50px]"}
                            src={susy}
                            alt="susy"
                        />
                    </Link>
                    <div className={"pt-6 md:pt-0 pl-4 text-white"}>
                        <p className={"pb-10 md:pb-4"}>
                            Copyright © 2024 Susy Q Cleaning / All rights reserved.
                        </p>
                        <div className={"flex justify-center gap-4"}>
                            <Link href={"/privacy"} className={"underline"}>
                                Privacy Policy
                            </Link>
                            <Link href={"/terms"} className={"underline"}>
                                Terms and Conditions
                            </Link>
                        </div>
                    </div>
                    <div className={"text-white pt-10 md:pt-0 flex flex-col justify-center"}>
                        <span className="text-center">Check us out on Social Media!</span>
                        <div className="pt-5 grid grid-flow-col gap-4 text-xl">
                            <a aria-label="linkedin" href={"https://www.linkedin.com/company/susy-q-cleaning/"}
                               target="_blank"
                               rel="noopener noreferrer">
                                <FaLinkedin/>
                            </a>
                            <a aria-label="github" href={"https://x.com/susyQcleaning"} target="_blank"
                               rel="noopener noreferrer">
                                <FaXTwitter/>
                            </a>
                            <a aria-label="portfolio" href={"https://www.facebook.com/SusyQCleaning"} target="_blank"
                               rel="noopener noreferrer">
                                <FaFacebook/>
                            </a>
                            <a aria-label="portfolio" href={"https://www.yelp.com/biz/susy-q-cleaning-austin"}
                               target="_blank"
                               rel="noopener noreferrer">
                                <FaYelp/>
                            </a>
                            <a aria-label="portfolio" href={"https://www.instagram.com/susyqcleaning/"}
                               target="_blank"
                               rel="noopener noreferrer">
                                <FaInstagram/>
                            </a>
                            <a aria-label="portfolio" href={"https://www.google.com/maps/place/Susy+Q+Cleaning/@30.4249436,-97.7701436,10.02z/data=!4m6!3m5!1s0x8644ca319618068d:0x49ea24942bbe87a3!8m2!3d30.4206125!4d-97.763874!16s%2Fg%2F1v8x2l5y?entry=ttu&g_ep=EgoyMDI0MTAyMy4wIKXMDSoASAFQAw%3D%3D"}
                               target="_blank"
                               rel="noopener noreferrer">
                                <FaGoogle/>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;