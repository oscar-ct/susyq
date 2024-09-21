import { TiStarOutline } from "react-icons/ti";
import { TiFlagOutline } from "react-icons/ti";
import { TiLockClosed } from "react-icons/ti";


const ScheduleGuarantees = () => {
    return (
        <div className={"my-8 p-0 flex flex-col gap-4 sm:flex-row lg:flex-col lg:mt-0"}>
            <div className={"p-4 bg-susy text-white w-full sm:w-4/12 lg:w-full"}>
                <div className={"text-xl font-light"}>
                    100% Satisfaction Guarantee
                </div>
                <p className={"pt-4 text-xs leading-6"}>
                    If you are not completely satisfied with your cleaning, we will come back and re-clean for free.
                </p>
                <div className={"pt-4 flex justify-center"}>
                    <TiStarOutline size={30}/>
                    <TiStarOutline size={30}/>
                    <TiStarOutline size={30}/>
                    <TiStarOutline size={30}/>
                    <TiStarOutline size={30}/>
                </div>
            </div>
            <div className={"p-4 bg-susy text-white w-full sm:w-4/12 lg:w-full"}>
                <div className={"text-xl font-light"}>
                    We are committed to your safety
                </div>
                <p className={"pt-4 text-xs leading-6"}>
                    Your safety and peace of mind are our top priority!
                </p>
                <div className={"pt-4 flex justify-center"}>
                    <TiFlagOutline size={80}/>
                </div>
            </div>
            <div className={"p-4 bg-zinc-100 border w-full sm:w-4/12 lg:w-full"}>
                <div className={"text-xl text-gray-600 font-light"}>
                    Your privacy is important to us. We never sell or share your info!
                </div>
                <div className={"pt-4 flex justify-center"}>
                    <TiLockClosed size={80}/>
                </div>
            </div>
        </div>
    );
};
export default ScheduleGuarantees;