import { TiThumbsUp } from "react-icons/ti";
import { TiHomeOutline } from "react-icons/ti";
import { TiStarOutline } from "react-icons/ti";
import { TiTabsOutline } from "react-icons/ti";
import { TiMail } from "react-icons/ti";


const Navbar = () => {

    const iconSize = 24;

    return (
        <div className={"bg-white fixed inset-0 z-30 h-min"}>
            <div className={"flex justify-between max-w-screen-xl mx-auto px-4 lg:px-8 "}>
                <div className={"flex items-center"}>
                    <span className={"text-4xl text-[#4FAFC2] font-light"}>Susy Q Cleaning</span>
                </div>
                <div className={"flex text-gray-500 cursor-pointer"}>
                    <button className={"uppercase py-5 px-4 flex flex-col items-center hover:bg-[#4FAFC2] hover:text-white transition duration-150 ease-in-out"}>
                        <TiHomeOutline size={iconSize}/>
                        <span className={"font-light"}>Home</span>
                    </button>
                    <button
                        className={"uppercase py-5 px-4 flex flex-col items-center hover:bg-[#4FAFC2] hover:text-white transition duration-150 ease-in-out"}>
                        <TiThumbsUp size={iconSize}/>
                        <span className={"font-light"}>Services</span>
                    </button>
                    <button
                        className={"uppercase py-5 px-4 flex flex-col items-center hover:bg-[#4FAFC2] hover:text-white transition duration-150 ease-in-out"}>
                        <TiStarOutline size={iconSize}/>
                        <span className={"font-light"}>About</span>
                    </button>
                    <button
                        className={"uppercase py-5 px-4 flex flex-col items-center hover:bg-[#4FAFC2] hover:text-white transition duration-150 ease-in-out"}>
                        <TiTabsOutline size={iconSize}/>
                        <span className={"font-light"}>FAQ</span>
                    </button>
                    <button
                        className={"uppercase py-5 px-4 flex flex-col items-center hover:bg-[#4FAFC2] hover:text-white transition duration-150 ease-in-out"}>
                        <TiMail size={iconSize}/>
                        <span className={"font-light"}>Contact</span>
                    </button>
                </div>
            </div>
        </div>

    );
};

export default Navbar;