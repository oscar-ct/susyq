import {useContext} from "react";
import GlobalContext from "@/context/GlobalContext";
import useNavToServiceDetails from "@/hooks/useNavTo";

const ScheduleFormTab = ({ disabled, tabName, id, error }) => {

    const { activeTab, services, dispatch, serviceSubmitted, submitInProgress } = useContext(GlobalContext);
    const { navToServiceDetails, navToServiceContact, navToServiceNotes } = useNavToServiceDetails();

    const onClick = () => {
        if (id === 0 && !serviceSubmitted && !submitInProgress) {
            dispatch({
                type: "SET_ACTIVE_TAB",
                payload: id
            });
        }
        if (id === 1) {
            navToServiceDetails();
            return;
        }
        if (id === 2) {
            navToServiceContact();
            return;
        }
        if (id === 3) {
            navToServiceNotes();
        }
    };

    return (
        <div className={"h-full w-4/12"} onClick={onClick}>
            <div className={`${disabled ? "bg-stone-200 text-gray-600 cursor-not-allowed" : "bg-susy text-white cursor-pointer"} ${activeTab === id && !disabled ? "opacity-100" : "opacity-60"} ${error ? "!bg-red-500" : ""} ${services.length === 0 && id !== 0 ? "cursor-not-allowed" : ""} ${serviceSubmitted || submitInProgress ? "!cursor-not-allowed" : ""} h-full rounded flex items-center justify-center sm:justify-start`}>
                <span className={"px-2 lg:px-4 text-center lg:text-start"}>{tabName}</span>
            </div>
        </div>
    );
};

export default ScheduleFormTab;