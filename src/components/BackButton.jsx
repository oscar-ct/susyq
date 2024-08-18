import arrow from "../assets/svg/arrow_back.svg";
import Image from "next/image";
import {useRouter} from "next/navigation";

const BackButton = () => {

    const router = useRouter();

    return (
        <div className={"fixed lg:relative z-10 lg:z-0 pt-3 pl-3"}>
            <div className={"cursor-pointer p-3 bg-black/50 rounded-full flex items-center w-12"} onClick={() => router.back()}>
                <Image
                    priority
                    src={arrow}
                    className={"w-6 h-6"}
                    alt={"back"}
                />
            </div>
        </div>
    );
};

export default BackButton;