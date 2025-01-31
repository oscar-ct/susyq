import {useContext} from "react";
import GlobalContext from "@/context/GlobalContext";
import useNavToServiceDetails from "@/hooks/useNavTo";

const ScheduleFormTab = ({disabled, tabName, id, error}) => {

    const {
        activeTab,
        dispatch,
        hasSubmittedEstimateSuccessfully,
        isAttemptingToSubmitEstimate
    } = useContext(GlobalContext);
    const {navToServices, navToServiceDetails, navToServiceContact, navToServiceNotes} = useNavToServiceDetails();

    const handleNavToAction = () => {
        if (id === 0 && !hasSubmittedEstimateSuccessfully && !isAttemptingToSubmitEstimate) {
            dispatch({
                type: "SET_ACTIVE_TAB",
                payload: id
            });
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

    return (
        <>
            {/*Desktop Tabs*/}
            <div onClick={handleNavToAction} className={`gap-2 h-full flex flex-col items-center justify-center md:hidden ${activeTab === id ? "w-1/4" : "w-1/5"} ${disabled ? "cursor-not-allowed" : "cursor-pointer"} ${activeTab === id && !disabled ? "opacity-100" : "opacity-60"} ${hasSubmittedEstimateSuccessfully || isAttemptingToSubmitEstimate ? "!cursor-not-allowed" : ""}`}>
                <span className={`${activeTab === id ? "text-base md:text-xl" : "text-xs md:text-base"}`}>{tabName}</span>
                <div className={`h-1 w-full rounded-full ${disabled ? "bg-stone-300" : "bg-susy"} ${error ? "!bg-red-500" : ""}`}/>
            </div>
            {/*Mobile Tabs*/}
            <div onClick={handleNavToAction} className={`hidden w-1/5 h-full rounded md:flex items-center justify-center ${disabled ? "bg-stone-200 text-gray-600 cursor-not-allowed" : "bg-susy text-white cursor-pointer"} ${activeTab === id && !disabled ? "opacity-100" : "opacity-60"} ${error ? "!bg-red-500" : ""}  ${hasSubmittedEstimateSuccessfully || isAttemptingToSubmitEstimate ? "!cursor-not-allowed" : ""}`}>
                <span className={"text-xs sm:text-base"}>{tabName}</span>
            </div>

        </>
    );
};

export default ScheduleFormTab;