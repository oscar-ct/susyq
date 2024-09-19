import {useContext} from "react";
import GlobalContext from "@/context/GlobalContext";

const ScheduleFormPanelNotes = () => {

    const { dispatch, serviceNotes, serviceSubmitted } = useContext(GlobalContext);

    const setServiceNotes = (e) => {
        dispatch({ type: "SET_SERVICE_NOTES", payload: e.target.value });
    };

    if (serviceSubmitted) {
        return (
            <div className={"px-2 py-8 md:p-8"}>
                <div className={"w-full pt-3 pb-8 text-4xl text-center"}>
                    Thank you! We will be reaching out to you shortly.
                </div>
            </div>
        )
    } else {
        return (
            <div className={"px-2 py-8 md:p-8"}>
                <div className={"w-full pt-3 pb-8 text-center text-gray-500"}>
                    Special Instructions, message or concerns?
                </div>
                <textarea
                    onChange={setServiceNotes}
                    rows={10}
                    className={"w-full border-2 p-4 focus:outline-none"}
                    value={serviceNotes}
                />
            </div>
        );
    }


};

export default ScheduleFormPanelNotes;