import Image from "next/image";
import susy from "../../public/images/susyQCleaningServices.png"
import { FaLinkedin, FaXTwitter, FaFacebook, FaYelp } from "react-icons/fa6";
import {FaGoogle, FaInstagram} from "react-icons/fa";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className="bg-susy">
            <div className={"h-80 md:h-44 max-w-screen-xl px-4 flex items-center mx-auto lg:px-8"}>
                <div className={"flex flex-col gap-10 justify-between w-full items-center md:flex-row"}>
                    <Link href={"/"}>
                        <Image
                            width={50}
                            height={52}
                            priority
                            className={"w-[50px] h-auto"}
                            src={susy}
                            alt="susy"
                        />
                    </Link>
                    <div className={"flex flex-col gap-4"}>
                        <p className={"text-white text-center text-sm lg:text-base"}>
                            Copyright © 2025 Susy Q Cleaning / All rights reserved.
                        </p>
                        <div className={"flex justify-center gap-4 text-white text-sm lg:text-base"}>
                            <Link href={"/privacy"} className={"underline"}>
                                Privacy Policy
                            </Link>
                            <Link href={"/terms"} className={"underline"}>
                                Terms and Conditions
                            </Link>
                            <Link href={"/careers"} className={"underline"}>
                                Careers
                            </Link>
                        </div>
                    </div>
                    <div className={"text-white flex flex-col gap-6 justify-center"}>
                        <span className="text-center text-sm lg:text-base">Check us out on Social Media!</span>
                        <div className="grid grid-flow-col gap-4 text-xl">
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
                            <a aria-label="portfolio" href={"https://www.yelp.com/biz/susy-q-cleaning-austin-2"}
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