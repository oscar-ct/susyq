import {useContext, useState} from "react";
import GlobalContext from "@/context/GlobalContext";
import useNavTo from "@/hooks/useNavTo";

const ServiceFormButtons = () => {

    const { services, activeTab, serviceDetails, serviceContact, serviceNotes, dispatch, serviceSubmitted, tabs, submitInProgress, serviceSource } = useContext(GlobalContext);
    const { navToServiceDetails, navToServiceContact, navToPrev, navToServiceNotes } = useNavTo();
    const [btnLoading, setBtnLoading] = useState(false);

    const submitEstimate = async () => {
        dispatch({type: "SUBMIT_IN_PROGRESS", payload: true});
        setBtnLoading(true);
        const data = {
            serviceSource,
            services,
            serviceDetails,
            serviceContact,
            serviceNotes,
        };
        if (services.length !== 0 && serviceContact.firstName.length !== 0 && serviceContact.firstName.length !== 0 && serviceContact.email.length !== 0 && serviceContact.phone.length === 12) {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/servicefusion/estimates/create`, {
                method: "POST",
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                const message = await res.text();
                dispatch({type: "SET_TAB_STATUS", payload: {id: 3, error: "true", errorMsg: message}});
                setBtnLoading(false);
                dispatch({type: "SUBMIT_IN_PROGRESS", payload: false});
                return;
            }
            dispatch({type: "SUBMIT_IN_PROGRESS", payload: false});
            setBtnLoading(false);
            if (tabs[3].error) {
                dispatch({type: "SET_TAB_STATUS", payload: {id: 3, error: "false"}});
            }
            dispatch({type: "SUBMIT_SERVICE"});
        }
        // setTimeout(() => {
        //     dispatch({type: "SUBMIT_IN_PROGRESS", payload: false});
        //     setBtnLoading(false);
        // }, 3000)
    };

    return (
        <div className={"flex gap-4"}>
            {
                activeTab === 0 && (
                    <>
                        <button className="bg-stone-200 text-gray-600 opacity-60 py-2 px-4 rounded  cursor-not-allowed">
                            Previous
                        </button>
                        <button onClick={navToServiceDetails} className={`${services.length !== 0 ? "bg-susy hover:bg-susy text-white" : "bg-stone-200 text-gray-600 cursor-not-allowed opacity-70"} py-2 px-4 rounded`}>
                            Next
                        </button>
                    </>
                )
            }
            {
                activeTab === 1 && (
                    <>
                        <button className={`bg-susy hover:bg-susy text-white py-2 px-4 rounded`} onClick={navToPrev}>
                            Previous
                        </button>
                        <button onClick={navToServiceContact} className={`bg-susy hover:bg-susy text-white py-2 px-4 rounded`}>
                            Next
                        </button>
                    </>
                )
            }
            {
                activeTab === 2 && (
                    <>
                        <button className={`bg-susy hover:bg-susy text-white py-2 px-4 rounded`} onClick={navToPrev}>
                            Previous
                        </button>
                        <button onClick={navToServiceNotes} className={`${serviceContact.validated ? "bg-susy hover:bg-susy text-white" : "bg-stone-200 text-gray-600 cursor-not-allowed opacity-70"} py-2 px-4 rounded`}>
                            Next
                        </button>
                    </>
                )
            }
            {
                activeTab === 3 && !serviceSubmitted && (
                    <>
                        <button className={`${submitInProgress ? "bg-stone-200 text-gray-600 opacity-60 cursor-not-allowed" : "bg-susy hover:bg-susy text-white"} py-2 px-4 rounded`} onClick={navToPrev}>
                            Previous
                        </button>
                        <button onClick={submitEstimate} disabled={btnLoading} className={`${!btnLoading ? "hover:bg-susy" : "opacity-60 cursor-not-allowed"} bg-susy text-white button py-2 px-4 rounded`}>
                            <div className={"flex items-center"}>
                                <span>Finish</span>
                                {
                                    btnLoading && (
                                        <span className={"ml-[6px] loading"}/>
                                    )
                                }
                            </div>
                        </button>
                    </>
                )
            }
        </div>
    );
};

export default ServiceFormButtons;