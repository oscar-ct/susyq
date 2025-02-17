import {useContext, useEffect, useState} from "react";
import GlobalContext from "@/context/GlobalContext";
import useNavToServiceDetails from "@/hooks/useNavTo";
import {initialStateObj} from "@/utils/initialState";

const ScheduleFormTab = () => {

    const {
        activeTab,
        tabs,
        dispatch,
        hasSubmittedEstimateSuccessfully,
        isAttemptingToSubmitEstimate
    } = useContext(GlobalContext);

    const {navToServices, navToServiceDetails, navToServiceContact, navToServiceNotes} = useNavToServiceDetails();

    const handleNavToAction = (id) => {
        if (id === 0 && !hasSubmittedEstimateSuccessfully && !isAttemptingToSubmitEstimate) {
            dispatch({
                type: "SET_ACTIVE_TAB",
                payload: id
            });
            dispatch({ type: "SET_LS" });
        }
        if (id === 1) {
            navToServices();
            return;
        }
        if (id === 2) {
            navToServiceDetails();
            return;
        }
        if (id === 3) {
            navToServiceContact();
            return;
        }
        if (id === 4) {
            navToServiceNotes();
        }
    };

    const [mounted, setMounted] = useState(false);
    useEffect(() => {setMounted(true);}, []);

    return (
        <div className="h-full w-full flex gap-1 md:gap-4 md:h-14">
            {
                !mounted ? (
                    <>
                        {
                            initialStateObj.tabs.map((tab, index) => (
                                <div key={index} className={"w-1/5"}>
                                    {/*Mobile Tabs*/}
                                    <div key={index} className={"gap-2 w-full h-full flex flex-col items-center justify-center md:hidden cursor-not-allowed opacity-40"}>
                                        <span className={"text-xs md:text-base"}>{tab.name}</span>
                                        <div className={"h-1 w-full rounded-full bg-stone-300"}/>
                                    </div>

                                    {/*Desktop Tabs*/}
                                    <div key={tab.name} className={"hidden w-full h-full rounded md:flex items-center justify-center bg-stone-200 text-gray-600 cursor-not-allowed opacity-40"}>
                                        <span className={"text-xs sm:text-base"}>{tab.name}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                ) : (
                    <>
                        {
                            tabs.map((tab, index) => (
                                <div key={index} className={` ${activeTab === tab.id ? "w-1/4" : "w-1/5"} md:w-1/5`}>
                                    {/*Mobile Tabs*/}
                                    <div key={index} onClick={() => handleNavToAction(tab.id)}
                                         className={`gap-2 h-min flex flex-col items-center justify-center md:hidden ${tab.disabled ? "cursor-not-allowed" : "cursor-pointer"} ${activeTab === tab.id && !tab.disabled ? "opacity-100" : "opacity-60"} ${hasSubmittedEstimateSuccessfully || isAttemptingToSubmitEstimate ? "!cursor-not-allowed" : ""}`}
                                    >
                                        <span className={`${activeTab === tab.id ? "text-base md:text-xl" : "text-xs md:text-base"}`}>{tab.name}</span>
                                        <div className={`h-1 w-full rounded-full ${tab.disabled ? "bg-stone-300" : "bg-susy"} ${tab.error ? "!bg-red-500" : ""}`}/>
                                    </div>
                                    {/*Desktop Tabs*/}
                                    <div onClick={() => handleNavToAction(tab.id)}
                                         className={`hidden w-full h-full rounded md:flex items-center justify-center ${tab.disabled ? "bg-stone-200 text-gray-600 cursor-not-allowed" : "bg-susy text-white cursor-pointer"} ${activeTab === tab.id && !tab.disabled ? "opacity-100" : "opacity-60"} ${tab.error ? "!bg-red-500" : ""}  ${hasSubmittedEstimateSuccessfully || isAttemptingToSubmitEstimate ? "!cursor-not-allowed" : ""}`}
                                    >
                                        <span className={"text-xs sm:text-base"}>{tab.name}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                )
            }
        </div>
    );
};

export default ScheduleFormTab;