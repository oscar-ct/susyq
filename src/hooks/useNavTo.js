import {useContext} from "react";
import GlobalContext from "@/context/GlobalContext";

const UseNavTo = () => {

    const { frequency, services, tabs, activeTab, dispatch, serviceContact, hasSubmittedEstimateSuccessfully, isAttemptingToSubmitEstimate } = useContext(GlobalContext);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const enableFrequencyTabError = () => {
        dispatch({ type: "SET_TAB_STATUS", payload: {id: 0, error: "true", errorMsg: "Please select an option below"}});
        dispatch({ type: "SET_ACTIVE_TAB", payload: 0 });
        dispatch({ type: "SET_LS" });
    };
    const enableServicesTabError = () => {
        dispatch({ type: "SET_TAB_STATUS", payload: {id: 1, error: "true", errorMsg: `A selection required, please select a service.`}});
        dispatch({ type: "SET_ACTIVE_TAB", payload: 1 });
    };
    const enableContactTabError = () => {
        dispatch({ type: "SET_TAB_STATUS", payload: {id: 3, error: "true", errorMsg: ""} });
        dispatch({ type: "SET_ACTIVE_TAB", payload: 3 });
        dispatch({ type: "SET_LS" });
    };

    const disableServicesTabError = () => {
        dispatch({ type: "SET_TAB_STATUS", payload: {id: 1, error: "false"} });
    };
    const disableFrequencyTabError = () => {
        dispatch({ type: "SET_TAB_STATUS", payload: {id: 0, error: "false"} });
    };
    const disableContactTabError = () => {
        dispatch({ type: "SET_TAB_STATUS", payload: {id: 3, error: "false"} });
    };

    const navToServices = () => {
        if (!hasSubmittedEstimateSuccessfully && !isAttemptingToSubmitEstimate) {
            scrollToTop();
            if (frequency === "one-time" || frequency === "recurring") {
                disableFrequencyTabError();
                dispatch({ type: "SET_TAB_STATUS", payload: {id: 1, disabled: "false"} });
                dispatch({ type: "SET_ACTIVE_TAB", payload: 1 });
                dispatch({ type: "SET_LS" });
            } else {
               enableFrequencyTabError();
            }
        }
    };

    const navToServiceDetails = () => {
        if (!hasSubmittedEstimateSuccessfully && !isAttemptingToSubmitEstimate) {
            scrollToTop();
            if (frequency === "one-time" || frequency === "recurring") {
                disableFrequencyTabError();
                if (services.length !== 0) {
                    disableServicesTabError();
                    if (tabs[2].disabled) {
                        dispatch({type: "SET_TAB_STATUS", payload: {id: 2, disabled: "false"}});
                        dispatch({ type: "SET_LS" });
                    }
                    dispatch({ type: "SET_ACTIVE_TAB", payload: 2 });
                    dispatch({ type: "SET_LS" });
                } else {
                    enableServicesTabError();
                }
            } else {
                enableFrequencyTabError();
            }
        }
    };

    const navToServiceContact = () => {
        if (!hasSubmittedEstimateSuccessfully && !isAttemptingToSubmitEstimate) {
            scrollToTop();
            if (frequency === "one-time" || frequency === "recurring") {
                disableFrequencyTabError();
                if (services.length !== 0) {
                    disableServicesTabError();
                    if (tabs[3].disabled) {
                        dispatch({type: "SET_TAB_STATUS", payload: {id: 3, disabled: "false"}});
                        dispatch({ type: "SET_LS" });
                    }
                    dispatch({type: "SET_ACTIVE_TAB", payload: 3});
                    dispatch({ type: "SET_LS" });
                } else {
                    enableServicesTabError();
                }
            } else {
                enableFrequencyTabError();
            }
        }
    };

    const navToServiceNotes = () => {
        if (!hasSubmittedEstimateSuccessfully && !isAttemptingToSubmitEstimate) {
            scrollToTop();
            if (frequency === "one-time" || frequency === "recurring") {
                disableFrequencyTabError();
                if (services.length !== 0) {
                    disableServicesTabError();
                    const details = {...serviceContact, validating: true}
                    dispatch({
                        type: "SET_SERVICE_CONTACT",
                        payload: details
                    });
                    dispatch({ type: "SET_LS" });
                    if (serviceContact.validated) {
                       disableContactTabError();
                        if (tabs[4].disabled) dispatch({type: "SET_TAB_STATUS", payload: {id: 4, disabled: "false"}});
                        const details = {...serviceContact, validating: false}
                        dispatch({
                            type: "SET_SERVICE_CONTACT",
                            payload: details
                        });
                        dispatch({type: "SET_ACTIVE_TAB", payload: 4});
                        dispatch({ type: "SET_LS" });
                    } else {
                       enableContactTabError();
                    }
                } else {
                    enableServicesTabError();
                }
            } else {
                enableFrequencyTabError();
            }
        }
    };

    const navToPrev = () => {
        if (!isAttemptingToSubmitEstimate) {
            scrollToTop();
            dispatch({ type: "SET_ACTIVE_TAB", payload: activeTab - 1 });
            dispatch({ type: "SET_LS" });
        }
    };

    return { navToServices, navToServiceDetails, navToServiceContact, navToPrev, navToServiceNotes };
};

export default UseNavTo;