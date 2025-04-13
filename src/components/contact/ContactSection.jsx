import {TiPhone} from "react-icons/ti";
import ContactForm from "@/components/contact/ContactForm";

const ContactSection = () => {
    return (
        <section className={"py-14 w-full bg-zinc-100"}>
            <div className={"max-w-screen-xl mx-auto px-4 flex flex-col items-center lg:px-8"}>
                <div className={"flex flex-col justify-center gap-6"}>
                    <h2 className={"text-center text-4xl font-light text-gray-500 uppercase"}>
                        Contact Us
                    </h2>
                    <h3 className={"text-center text-2xl font-light text-gray-500"}>
                        Have a question or concern? Send us a message or give us a call. We&apos;d love to hear from
                        you.
                    </h3>
                    <div className={"text-2xl text-gray-500 flex items-center justify-center"}>
                        <TiPhone size={28}/>
                        <a href={"tel:512-640-6264"} className={"text-susy underline"}>(512) 640-6264</a>
                    </div>
                </div>
                <div className={"w-full pt-14"}>
                    <ContactForm/>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;