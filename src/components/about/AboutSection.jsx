import Image from "next/image";
import aboutImg from "../../../public/images/services.png"
import {TiLeaf} from "react-icons/ti";

const AboutSection = () => {
    return (
        <section className={"py-14 w-full mx-auto px-4 lg:px-8 max-w-screen-xl"}>
            <div className={"flex flex-col items-center"}>
                <div className={"flex flex-col justify-center pb-8 md:pb-4"}>
                    <h1 className={"text-center text-5xl uppercase font-light text-gray-500"}>About Us</h1>
                    <h4 className={"pt-5 text-center text-2xl font-light text-gray-500"}>We our a local Austin cleaning service company</h4>
                </div>
                <div className={"flex flex-col md:flex-row"}>
                    <div className={"flex justify-center items-center md:w-4/12"}>
                        <Image src={aboutImg} alt={"about"} width={900} height={900} className={"object-scale-down"}/>
                    </div>
                    <div className={"md:p-6 flex flex-col text-gray-500 md:w-8/12"}>
                        <p className={"pt-5 text-lg leading-tight text-center font-light md:text-left"}>
                            <span className={"text-susy pr-1 text-xl"}>Susy Q Cleaning</span>is a professional company dedicated to be part of your life. Our interest are focused on meeting your needs by offering high quality services and high level satisfaction to our customers. Our green healthy cleaning techniques provide your home with a cleaner healthier environment.
                        </p>
                        <div className={"flex flex-col md:flex-row md:gap-4"}>
                            <div className={"flex flex-col items-center md:items-start pt-8 md:w-6/12"}>
                                <h3 className={"pb-5 text-2xl flex items-center text-lime-400"}>Green Cleaning<TiLeaf/></h3>
                                <p className={"text-lg leading-tight font-light text-center md:text-left"}>
                                    We are eco friendly, green cleaners. We bring all of our own green supplies so that you never have to worry about harmful cleaning chemicals and residues. You don’t have to be concerned about being allergic to our cleaning supplies or having harsh chemicals in your home, on your surfaces, or around your children or pets
                                </p>
                            </div>
                            <div className={"flex flex-col items-center md:items-start pt-8 md:w-6/12"}>
                                <h3 className={"pb-5 text-2xl text-susy text-center md:text-left"}>100% Satisfaction Guarantee</h3>
                                <p className={"text-lg leading-tight font-light text-center md:text-left"}>
                                    If you are not satisfied with the work we have performed in your home, call within 24 hours, and we will re-clean it – at no additional charge! We are focused on making sure that each client is pleased, it is the soul and heart of our business.
                                </p>
                            </div>
                        </div>
                    </div>

                </div>

            </div>
        </section>
    );
};

export default AboutSection;