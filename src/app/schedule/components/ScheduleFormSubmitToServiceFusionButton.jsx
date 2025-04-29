import {useCallback, useContext} from "react";
import GlobalContext from "@/context/GlobalContext";
import * as emailjs from "@emailjs/browser";

const ScheduleFormSubmitToServiceFusionButton = ({ activeButtonClass, disabledButtonClass, isSubmitting }) => {

    const {frequency, services, serviceDetails, serviceContact, serviceNotes, dispatch, serviceSource } = useContext(GlobalContext);

    const submitMessageToEmailJS = useCallback(async () => {
        const service = getService(frequency, serviceDetails.frequency, services[0], serviceDetails.rooms.bedroom, serviceDetails.rooms.bathroom, serviceDetails.size, serviceDetails.extras, serviceSource)
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


    const getService = (frequency, frequencyRate, services, bedrooms, bathrooms, size, extrasArray, source) => {
        const frequencyStr = `Frequency: ${frequency.charAt(0).toUpperCase()}${frequency.slice(1)} ${frequencyRate ? "(" + frequencyRate + ")" : ""}`;
        const serviceStr = `Service: ${services}`;
        const bedroomsStr = `Bedrooms: ${bedrooms}`;
        const bathroomsStr = `Bathrooms: ${bathrooms}`;
        const sqftStr = `Sqft: ${size ? size : "not provided"}`;
        const extrasStr = `Extras: ${extrasArray.length !== 0 ? extrasArray.toString() : "not provided"}`;
        const sourceStr = `Source: ${source ? source : "not provided"}`;
        return `${frequencyStr} --- ${serviceStr} --- ${bedroomsStr} --- ${bathroomsStr} --- ${sqftStr} --- ${extrasStr} --- ${sourceStr}`;
    };

    return (
        <button
            onClick={submitEstimate}
            disabled={isSubmitting}
            className={`${isSubmitting ? disabledButtonClass : activeButtonClass}`}
        >
            <div className={"flex items-center"}>
                {isSubmitting ? "Processing" : "Finish"}
                {isSubmitting && <span className={"ml-[6px] loading"}/>}
            </div>
        </button>
    );
};

export default ScheduleFormSubmitToServiceFusionButton;