import quotes from "@/assets/svg/quotation-mark.svg";
import Image from "next/image";


const TestimonialsCard = ({children, author = ""}) => {
    // const iconSize = 28;
    return (
        <div className={"bg-white rounded-xl shadow-md relative"}>
            <Image
                className={"left-0 absolute rotate-180 -translate-y-4 translate-x-5 bg-white rounded-full"}
                priority
                width={30}
                height={30}
                src={quotes}
                alt={"quotes"}
            />
            <div className={"p-8 flex flex-col text-gray-500"}>
                <p className={"w-56 text-xl font-light"}>
                    {children}
                </p>
                <span className={"absolute bottom-0 -translate-y-3 font-light text-xs"}>{author}</span>
            </div>
            <Image
                className={"right-0 bottom-0 absolute translate-y-4 -translate-x-5 bg-white rounded-full"}
                priority
                width={30}
                height={30}
                src={quotes}
                alt={"quotes"}
            />
        </div>
    );
};

export default TestimonialsCard;