import ScheduleGuarantees from "@/components/ScheduleGuarantees";
import ScheduleForm from "@/components/ScheduleForm";
import {GlobalProvider} from "@/context/GlobalContext";

const SchedulePage = () => {
    return (
        <GlobalProvider>
            <section className={"w-full mx-auto px-4 lg:px-8 max-w-screen-xl"}>
                <div className={"py-10 text-center text-5xl uppercase font-thin text-gray-500 sm:py-20"}>
                    Customize Your Cleaning
                </div>
                <div className={"flex flex-col lg:flex-row"}>
                    <div className={"w-full lg:w-9/12"}>
                        <ScheduleForm/>
                    </div>
                    <div className={"w-full h-full lg:w-3/12"}>
                        <ScheduleGuarantees/>
                    </div>
                </div>
            </section>
        </GlobalProvider>
    );
};

export default SchedulePage;