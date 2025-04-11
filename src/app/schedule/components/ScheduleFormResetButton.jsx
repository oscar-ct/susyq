"use client";

import {GrPowerReset} from "react-icons/gr";
import {useContext} from "react";
import GlobalContext from "@/context/GlobalContext";

const ScheduleFormResetButton = () => {

    const { dispatch } = useContext(GlobalContext);

    const confirmReset = () => {
        const clientResponse = window.confirm("Are you sure you want to start over this scheduling?");
        if (clientResponse) {
            dispatch({ type: "RESET_STATE" });
            dispatch({ type: "SET_LS" });
        }
    };

    return (
        <button onClick={confirmReset} className={"absolute left-0 bottom-5 lg:bottom-0 lg:top-0"}>
            <div className={"text-gray-500 flex items-center gap-2"}>
                <GrPowerReset size={36}/>
                <span className={"hidden text-sm font-bold lg:block"}>Start Over</span>
            </div>
        </button>
    );
};

export default ScheduleFormResetButton;