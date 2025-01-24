import reviewIcon from "@/assets/png/icons8-review-96.png";
import starIcon from "@/assets/png/icons8-star-48.png";
import Image from "next/image";

const TestimonialsCard = ({children, author = ""}) => {
    return (
        <div className={"bg-white rounded-xl shadow-md px-8 pt-8 pb-3 relative flex flex-col justify-between"}>
            <Image
                className={"mx-auto top-0 left-0 right-0 absolute -translate-y-7 bg-white rounded-full"}
                priority
                width={60}
                height={60}
                src={reviewIcon}
                alt={"reviews"}
            />
            <div className={"pb-3"}>
                <div className={"flex flex-col text-gray-500"}>
                    <p className={"pb-3 text-lg font-light sm:w-52"}>
                        &quot;{children}&quot;
                    </p>
                    <span className={"font-light text-xs"}>{author}</span>
                </div>
            </div>
            <div className={"flex items-center gap-3"}>
                <div className={"text-xl font-bold text-gray-500"}>
                    5/5
                </div>
                <div className={"flex gap-0.5"}>
                    <Image
                        priority
                        width={25}
                        height={25}
                        src={starIcon}
                        alt={"star"}
                    />
                    <Image
                        priority
                        width={25}
                        height={25}
                        src={starIcon}
                        alt={"star"}
                    />
                    <Image
                        priority
                        width={25}
                        height={25}
                        src={starIcon}
                        alt={"star"}
                    />
                    <Image
                        priority
                        width={25}
                        height={25}
                        src={starIcon}
                        alt={"star"}
                    />
                    <Image
                        priority
                        width={25}
                        height={25}
                        src={starIcon}
                        alt={"star"}
                    />
                </div>
            </div>
        </div>
    );
};

export default TestimonialsCard;