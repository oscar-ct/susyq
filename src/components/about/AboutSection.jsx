import Image from "next/image";
import aboutImg from "../../../public/images/services.png"
import {TiLeaf} from "react-icons/ti";

const AboutSection = () => {
    return (
        <section className={"py-14 w-full mx-auto px-4 lg:px-8 max-w-screen-xl"}>
            <div className={"flex flex-col items-center"}>
                <div className={"flex flex-col justify-center gap-4"}>
                    <h2 className={"text-center text-4xl font-light text-gray-500 uppercase"}>
                        About Us
                    </h2>
                    <h3 className={"text-center text-2xl font-light text-gray-500"}>
                        We our a local Austin cleaning service company
                    </h3>
                </div>
                <div className={"pt-14 flex flex-col md:flex-row gap-6"}>
                    <div className={"flex justify-center items-center md:w-4/12"}>
                        <Image
                            src={aboutImg}
                            alt={"About Susy Q Cleaning"}
                            width={705}
                            height={705}
                            className={"w-full h-auto max-w-96"}
                        />
                    </div>
                    <div className={"flex flex-col text-gray-500 md:w-8/12"}>
                        <div className={"flex flex-col gap-6"}>
                            <p className={"text-lg leading-tight text-center font-light md:text-left"}>
                                Susy Q Cleaning is a professional company dedicated to be part of your life. Our
                                interest are focused on meeting your needs by offering high quality services and high
                                level satisfaction to our customers. Our green healthy cleaning techniques provide your
                                home with a cleaner healthier environment.
                            </p>
                            <div className={"flex flex-col gap-6 md:flex-row"}>
                                <div className={"flex flex-col gap-4"}>
                                    <h4 className={"text-xl flex gap-1 justify-center items-center text-lime-600"}>
                                        <span className={"font-light"}>Green Cleaning</span>
                                       <TiLeaf/>
                                    </h4>
                                    <p className={"text-lg leading-tight font-light text-center md:text-left"}>
                                        We are eco friendly, green cleaners. We bring all of our own green supplies so that
                                        you never have to worry about harmful cleaning chemicals and residues. You don’t
                                        have to be concerned about being allergic to our cleaning supplies or having harsh
                                        chemicals in your home, on your surfaces, or around your children or pets.
                                    </p>
                                </div>
                                <div className={"flex flex-col gap-4"}>
                                    <h4 className={"text-xl text-susy text-center"}>
                                        100% Satisfaction Guarantee
                                    </h4>
                                    <p className={"text-lg leading-tight font-light text-center md:text-left"}>
                                        If you are not satisfied with the work we have performed in your home, call
                                        within
                                        24 hours, and we will re-clean it – at no additional charge! We are focused
                                        on
                                        making sure that each client is pleased, it is the soul and heart of our
                                        business.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default AboutSection;