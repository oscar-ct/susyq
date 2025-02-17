import {useContext, useState} from "react";
import GlobalContext from "@/context/GlobalContext";
import useNavTo from "@/hooks/useNavTo";

const ServiceFormButtons = () => {

    const { frequency, services, activeTab, serviceDetails, serviceContact, serviceNotes, dispatch, hasSubmittedEstimateSuccessfully, tabs, isAttemptingToSubmitEstimate, serviceSource } = useContext(GlobalContext);
    const { navToServices, navToServiceDetails, navToServiceContact, navToPrev, navToServiceNotes } = useNavTo();
    const [btnLoading, setBtnLoading] = useState(false);

    const clearLoadingStatus = () => {
        dispatch({type: "SUBMIT_IN_PROGRESS", payload: false});
        setBtnLoading(false);
    };

    const submitEstimate = async () => {
        dispatch({type: "SUBMIT_IN_PROGRESS", payload: true});
        setBtnLoading(true);
        const data = {
            frequency,
            services,
            serviceDetails,
            serviceContact,
            serviceNotes,
            serviceSource,
        };
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/servicefusion/estimates/create`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            const message = await res.text();
            dispatch({type: "SET_TAB_STATUS", payload: {id: 4, error: "true", errorMsg: message}});
            dispatch({ type: "SET_LS" });
            clearLoadingStatus();
            return;
        }
        const response = await res.text();
        if (response === "500") {
            console.log("Internal Service Error, Status: 500");
        }
        clearLoadingStatus();
        if (tabs[4].error) {
            dispatch({type: "SET_TAB_STATUS", payload: {id: 4, error: "false"}});
        }
        dispatch({type: "SUBMISSION_SUCCESS"});
        dispatch({ type: "SET_LS" });
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
                        <button className="bg-stone-200 text-gray-600 opacity-60 py-2 px-4 rounded cursor-not-allowed">
                            Previous
                        </button>
                        <button onClick={navToServices} className={`py-2 px-4 rounded ${frequency.length !== 0 ? "bg-susy hover:bg-susy text-white" : "bg-stone-200 text-gray-600 cursor-not-allowed opacity-70"}`}>
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
                        <button onClick={navToServiceDetails} className={`py-2 px-4 rounded ${services.length !== 0 ? "bg-susy hover:bg-susy text-white" : "bg-stone-200 text-gray-600 cursor-not-allowed opacity-70"}`}>
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
                        <button onClick={navToServiceContact} className={`bg-susy hover:bg-susy text-white py-2 px-4 rounded`}>
                            Next
                        </button>
                    </>
                )
            }
            {
                activeTab === 3 && (
                    <>
                        <button className={`bg-susy hover:bg-susy text-white py-2 px-4 rounded`} onClick={navToPrev}>
                            Previous
                        </button>
                        <button onClick={navToServiceNotes} className={`py-2 px-4 rounded ${serviceContact.validated ? "bg-susy hover:bg-susy text-white" : "bg-stone-200 text-gray-600 cursor-not-allowed opacity-70"}`}>
                            Next
                        </button>
                    </>
                )
            }
            {
                activeTab === 4 && !hasSubmittedEstimateSuccessfully && (
                    <div className={"flex flex-col items-center md:items-end"}>
                        <div className={"flex gap-4"}>
                            <button
                                className={`${isAttemptingToSubmitEstimate ? "bg-stone-200 text-gray-600 opacity-60 cursor-not-allowed" : "bg-susy hover:bg-susy text-white"} py-2 px-4 rounded`}
                                onClick={navToPrev}>
                                Previous
                            </button>
                            <button onClick={submitEstimate} disabled={btnLoading}
                                    className={`bg-cyan-700 text-white button py-2 px-4 rounded ${!btnLoading ? "hover:bg-susy" : "opacity-60 cursor-not-allowed"}`}>
                                <div className={"flex items-center"}>
                                    {
                                        isAttemptingToSubmitEstimate ? "Processing" : "Finish"
                                    }
                                    {
                                        btnLoading && (
                                            <span className={"ml-[6px] loading"}/>
                                        )
                                    }
                                </div>
                            </button>
                        </div>
                        {
                            isAttemptingToSubmitEstimate && (
                                <div className={"text-sm text-center font-semibold pt-4 flex justify-center lg:justify-end items-end"}>
                                    Please wait while we process your estimate...
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default ServiceFormButtons;