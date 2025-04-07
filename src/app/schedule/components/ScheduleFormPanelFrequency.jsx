import {useContext} from "react";
import GlobalContext from "@/context/GlobalContext";
import {TiArrowRepeatOutline, TiBell} from "react-icons/ti";

const ScheduleFormPanelFrequency = () => {

    const { frequency, serviceDetails, dispatch } = useContext(GlobalContext);

    const setFrequencyValue = (value) => {
        dispatch({
            type: "SET_FREQUENCY",
            payload: value,
        });
        if (frequency.length === 0) {
            dispatch({type: "SET_TAB_STATUS", payload: {id: 1, disabled: "false"}});
        }
        if (value === "recurring") {
            dispatch({
                type: "SET_SERVICE_DETAILS",
                payload: {...serviceDetails, frequency: "Every 2 Weeks"}
            });
        } else {
            dispatch({
                type: "SET_SERVICE_DETAILS",
                payload: {...serviceDetails, frequency: ""}
            });
        }
        if (value !== frequency) {
            dispatch({
                type: "SET_SERVICES",
                payload: ""
            });

        }
        dispatch({ type: "SET_LS" });
    };

    const frequencyOptions = [
        ["one-time", "One-Time Service", "Single Cleaning", "A one-time service offers a single, thorough cleaning session for your home or office."],
        ["recurring", "Recurring Service", "Every Week, Every Two Weeks, Every Four Weeks", "A recurring service provides regular, scheduled cleanings for your home or office, ensuring consistent cleanliness."],
    ];

    return (
        <div className={"w-full flex flex-col lg:flex-row"}>
            {
                frequencyOptions.map(([value, title, subtitle, description], index) => {
                    return (
                        <div key={index} onClick={() => setFrequencyValue(value)} className={"w-full lg:w-6/12"}>
                            <div className={"px-2 pb-4"}>
                                <div className={`h-full cursor-pointer bg-stone-100 border border-stone-200 rounded p-5 flex items-center lg:h-72 ${frequency === value ? "!bg-susy" : "hover:bg-stone-200"}`}>
                                    <div className={"flex justify-center items-center gap-2"}>
                                        {
                                            value === "one-time" ? (
                                                <div className={`${frequency === value ? "text-white" : "text-susy"}`}>
                                                    <TiBell size={60}/></div>
                                            ) : (
                                                <div className={`${frequency === value ? "text-white" : "text-susy"}`}>
                                                    <TiArrowRepeatOutline size={60}/></div>
                                            )
                                        }
                                        <div className={"flex flex-col"}>
                                            <div
                                                className={`text-xl ${frequency === value ? "text-white" : "text-gray-600"}`}>
                                                {title}
                                            </div>
                                            <div
                                                className={`pb-2 ${frequency === value ? "text-white" : "text-gray-600"}`}>
                                                {subtitle}
                                            </div>
                                            <p className={`font-light ${frequency === value ? "text-white" : "text-gray-700 "}`}>
                                                {description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
};

export default ScheduleFormPanelFrequency;
