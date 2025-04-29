import {useCallback, useContext, useEffect, useState} from "react";
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

    const handleNavToAction = useCallback((id) => {
        if (hasSubmittedEstimateSuccessfully || isAttemptingToSubmitEstimate) {
            return;
        }
        switch (id) {
            case 0:
                dispatch({ type: "SET_ACTIVE_TAB", payload: id });
                dispatch({ type: "SET_LS" });
                break;
            case 1:
                navToServices();
                break;
            case 2:
                navToServiceDetails();
                break;
            case 3:
                navToServiceContact();
                break;
            case 4:
                navToServiceNotes();
                break;
            default:
                console.warn(`navigation ID error: ${id}`);
        }
    }, [dispatch, navToServices, navToServiceDetails, navToServiceContact, navToServiceNotes, hasSubmittedEstimateSuccessfully, isAttemptingToSubmitEstimate,]);

    const [mounted, setMounted] = useState(false);
    useEffect(() => {setMounted(true);}, []);

    const BASE_DESKTOP_TAB_CLASS = "hidden w-full h-full rounded md:flex items-center justify-center opacity-60";
    const DESKTOP_ENABLED_TAB_CLASS = "bg-susy hover:bg-susy/80 text-white cursor-pointer";
    const DESKTOP_DISABLED_TAB_CLASS = "bg-stone-400 text-gray-600 cursor-not-allowed";

    const BASE_MOBILE_TAB_CLASS = "gap-2 h-min flex flex-col items-center justify-center md:hidden opacity-60";

    return (
        <div className="h-full w-full flex gap-1 md:gap-4 md:h-14">
            {
                !mounted ? (
                    <>
                        {
                            initialStateObj.tabs.map((tab, index) => (
                                <div key={index} className={"w-1/5"}>
                                    {/*Mobile Tabs*/}
                                    <div key={index} className={`${BASE_MOBILE_TAB_CLASS} cursor-not-allowed`}>
                                        <span className={"text-xs"}>{tab.name}</span>
                                        <div className={"h-1 w-full rounded-full bg-stone-400"}/>
                                    </div>

                                    {/*Desktop Tabs*/}
                                    <div key={tab.name} className={`${BASE_DESKTOP_TAB_CLASS} ${DESKTOP_DISABLED_TAB_CLASS}`}>
                                        <span>{tab.name}</span>
                                    </div>
                                </div>
                            ))
                        }
                    </>
                ) : (
                    <>
                        {
                            tabs.map((tab, index) => (
                                <div
                                    key={index}
                                    className={`${activeTab === tab.id ? "w-1/4" : "w-1/5"} md:w-1/5`}
                                >
                                    {/*Mobile Tabs*/}
                                    <div
                                        key={index}
                                        onClick={() => handleNavToAction(tab.id)}
                                        className={`
                                            ${BASE_MOBILE_TAB_CLASS} 
                                            ${tab.disabled || hasSubmittedEstimateSuccessfully || isAttemptingToSubmitEstimate ? "cursor-not-allowed" : "cursor-pointer"} 
                                            ${activeTab === tab.id && !tab.disabled && !hasSubmittedEstimateSuccessfully && !isAttemptingToSubmitEstimate ? "!opacity-100" : ""}
                                        `}
                                    >
                                        <span className={`${activeTab === tab.id ? "text-base" : "text-xs"}`}>{tab.name}</span>
                                        <div className={`
                                                h-1 w-full rounded-full 
                                                ${tab.disabled || hasSubmittedEstimateSuccessfully || isAttemptingToSubmitEstimate ? "bg-stone-400" : "bg-susy"} 
                                                ${tab.error ? "!bg-red-500" : ""}
                                            `}
                                        />
                                    </div>
                                    {/*Desktop Tabs*/}
                                    <div
                                        onClick={() => handleNavToAction(tab.id)}
                                        className={`
                                            ${BASE_DESKTOP_TAB_CLASS} 
                                            ${tab.disabled || hasSubmittedEstimateSuccessfully || isAttemptingToSubmitEstimate ? DESKTOP_DISABLED_TAB_CLASS : DESKTOP_ENABLED_TAB_CLASS} 
                                            ${activeTab === tab.id && !tab.disabled && !hasSubmittedEstimateSuccessfully && !isAttemptingToSubmitEstimate ? "!opacity-100" : ""} 
                                            ${tab.error ? "!bg-red-500" : ""}
                                        `}
                                    >
                                        <span>{tab.name}</span>
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