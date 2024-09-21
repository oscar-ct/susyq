import Image from "next/image";
import susy from "../../public/images/susyQCleaningServices.png"
import { FaLinkedin, FaXTwitter, FaFacebook, FaYelp } from "react-icons/fa6";

const Footer = () => {
    return (
        <footer className="footer bg-susy">
            <div className={"max-w-screen-xl px-4 lg:px-8 py-8 mx-auto flex flex-col justify-between w-full md:flex-row items-center"}>
                <div className={"flex flex-col md:flex-row items-center"}>
                    <div className={"flex justify-center"}>
                        <Image
                            width={50}
                            height={50}
                            priority
                            className={"w-[50px] md:w-[36px] h-auto"}
                            src={susy}
                            alt="susy"
                        />
                    </div>
                    <p className={"pt-6 md:pt-0 pl-2 text-white"}>
                        Copyright © 2024 Susy Q Cleaning / All rights reserved.
                    </p>
                </div>

                <div className={"text-white pt-10 md:pt-0 flex flex-col justify-center"}>
                    <span className="text-center">Check us out!</span>
                    <div className="pt-5 grid grid-flow-col gap-4 text-xl">
                        <a aria-label="linkedin" href={"https://www.linkedin.com/in/oscar-ct"} target="_blank"
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
                        <a aria-label="portfolio" href={"https://www.yelp.com/biz/susy-q-cleaning-austin"} target="_blank"
                           rel="noopener noreferrer">
                            <FaYelp/>
                        </a>
                    </div>
                </div>

            </div>
        </footer>
    );
};

export default Footer;