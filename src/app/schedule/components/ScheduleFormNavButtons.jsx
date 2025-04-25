import {useCallback, useContext} from "react";
import GlobalContext from "@/context/GlobalContext";
import useNavTo from "@/hooks/useNavTo";
import * as emailjs from "@emailjs/browser";

const ScheduleFormNavButtons = () => {

    const { hasApiError, frequency, services, activeTab, serviceDetails, serviceContact, serviceNotes, dispatch, hasSubmittedEstimateSuccessfully, isAttemptingToSubmitEstimate, serviceSource } = useContext(GlobalContext);
    const { navToServices, navToServiceDetails, navToServiceContact, navToPrev, navToServiceNotes } = useNavTo();

    const submitMessageToEmailJS = useCallback(async () => {
        const service = getService(frequency, serviceDetails.frequency, services[0], serviceDetails.rooms.bedroom, serviceDetails.rooms.bathroom, serviceDetails.size, serviceDetails.size, serviceSource)
        try {
            await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_3,
                {
                    name: `${serviceContact.firstName} ${serviceContact.lastName}`,
                    email: serviceContact.email,
                    phone: serviceContact.phone,
                    service: service
                },
                process.env.NEXT_PUBLIC_EMAILJS_KEY
            );
        } catch (e) {
            console.error("EmailJS Error:", e.message || e.text);
        }
    }, [serviceContact, frequency, serviceDetails, services, serviceSource]);

    const submitEstimate = useCallback (async () => {
        dispatch({type: "SUBMIT_IN_PROGRESS", payload: true});
        const payload = {
            frequency,
            services,
            serviceDetails,
            serviceContact,
            serviceNotes,
            serviceSource,
        };
        const SUBMIT_TIMEOUT_MS = 10000;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), SUBMIT_TIMEOUT_MS);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/servicefusion/estimates/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
                signal: controller.signal,
            });
            clearTimeout(timeoutId);
            if (!res.ok) {
                const message = await res.text();
                console.error(message);
                dispatch({type: "SET_API_ERROR", payload: true});
                return;
            }
            dispatch({type: "SUBMISSION_SUCCESS"});
            await submitMessageToEmailJS();
        } catch (e) {
            console.error(e);
            dispatch({type: "SET_API_ERROR", payload: true});
        } finally {
            dispatch({ type: "SUBMIT_IN_PROGRESS", payload: false });
            dispatch({ type: "SET_LS" });
        }
    }, [dispatch, frequency, services, serviceDetails, serviceContact, serviceNotes, serviceSource, submitMessageToEmailJS]);


    const getService = (frequency, frequencyRate, services, bedrooms, bathrooms, size, extrasArray, source, phone) => {
        const frequencyStr = `Frequency: ${frequency.charAt(0).toUpperCase()}${frequency.slice(1)} ${frequencyRate ? "(" + frequencyRate + ")" : ""}`;
        const serviceStr = `Service: ${services}`;
        const bedroomsStr = `Bedrooms: ${bedrooms}`;
        const bathroomsStr = `Bathrooms: ${bathrooms}`;
        const sqftStr = `Sqft: ${size ? size : "not provided"}`;
        const extrasStr = `Extras: ${extrasArray.length !== 0 ? extrasArray.toString() : "not provided"}`;
        const sourceStr = `Source: ${source ? source : "not provided"}`;
        return `${frequencyStr} --- ${serviceStr} --- ${bedroomsStr} --- ${bathroomsStr} --- ${sqftStr} --- ${extrasStr} --- ${sourceStr}`;
    };

    const ACTIVE_BUTTON_CLASS = "bg-susy hover:bg-susy/90 text-white py-2 px-4 rounded";
    const DISABLED_BUTTON_CLASS = "bg-stone-200 text-gray-600 opacity-60 cursor-not-allowed py-2 px-4 rounded";

    return (
        <div className={"flex gap-4"}>
            {
                activeTab === 0 && (
                    <>
                        <button className={DISABLED_BUTTON_CLASS} disabled>
                            Previous
                        </button>
                        <button
                            onClick={navToServices}
                            className={frequency.length ? ACTIVE_BUTTON_CLASS : DISABLED_BUTTON_CLASS}
                        >
                            Next
                        </button>
                    </>
                )
            }
            {
                activeTab === 1 && (
                    <>
                        <button
                            className={ACTIVE_BUTTON_CLASS}
                            onClick={navToPrev}
                        >
                            Previous
                        </button>
                        <button
                            onClick={navToServiceDetails}
                            className={services.length ? ACTIVE_BUTTON_CLASS : DISABLED_BUTTON_CLASS}
                        >
                            Next
                        </button>
                    </>
                )
            }
            {
                activeTab === 2 && (
                    <>
                        <button
                            className={ACTIVE_BUTTON_CLASS}
                            onClick={navToPrev}
                        >
                            Previous
                        </button>
                        <button
                            onClick={navToServiceContact}
                            className={ACTIVE_BUTTON_CLASS}>
                            Next
                        </button>
                    </>
                )
            }
            {
                activeTab === 3 && (
                    <>
                        <button
                            className={ACTIVE_BUTTON_CLASS}
                            onClick={navToPrev}
                        >
                            Previous
                        </button>
                        <button
                            onClick={navToServiceNotes}
                            className={serviceContact.validated ? ACTIVE_BUTTON_CLASS : DISABLED_BUTTON_CLASS}
                        >
                            Next
                        </button>
                    </>
                )
            }
            {
                activeTab === 4 && !hasSubmittedEstimateSuccessfully && !hasApiError && (
                    <div className={"flex flex-col items-center md:items-end"}>
                        <div className={"flex gap-4"}>
                            <button
                                className={isAttemptingToSubmitEstimate ? DISABLED_BUTTON_CLASS : ACTIVE_BUTTON_CLASS}
                                onClick={navToPrev}
                            >
                                Previous
                            </button>
                            <button
                                onClick={submitEstimate}
                                disabled={isAttemptingToSubmitEstimate}
                                className={`${ACTIVE_BUTTON_CLASS} ${isAttemptingToSubmitEstimate ? "opacity-60 cursor-not-allowed" : "hover:bg-susy"}`}                            >
                                <div className={"flex items-center"}>
                                    {isAttemptingToSubmitEstimate ? "Processing" : "Finish"}
                                    {isAttemptingToSubmitEstimate && <span className={"ml-[6px] loading"}/>}
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

export default ScheduleFormNavButtons;