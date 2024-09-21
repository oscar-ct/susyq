import {useContext} from "react";
import GlobalContext from "@/context/GlobalContext";

const UseNavTo = () => {

    const { services, tabs, activeTab, dispatch, serviceContact, serviceSubmitted } = useContext(GlobalContext);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        })
    };

    const navToServiceDetails = () => {
        scrollToTop();
        if (!serviceSubmitted) {
            if (services.length !== 0) {
                dispatch({ type: "SET_TAB_STATUS", payload: {id: 0, error: "false"} });
                if (tabs[1].disabled) {
                    dispatch({ type: "SET_TAB_STATUS", payload: {id: 1, disabled: "false"} });
                    dispatch({ type: "SET_ACTIVE_TAB", payload: 1 });
                } else {
                    dispatch({ type: "SET_ACTIVE_TAB", payload: 1 });
                }
            } else {
                dispatch({ type: "SET_TAB_STATUS", payload: {id: 0, error: "true", errorMsg: "Please select at least one service"} });
            }
        }
    };

    const navToServiceContact = () => {
        scrollToTop();
        if (!serviceSubmitted) {
            if (services.length !== 0) {
                dispatch({type: "SET_TAB_STATUS", payload: {id: 0, error: "false"}});
                if (tabs[2].disabled) {
                    dispatch({type: "SET_TAB_STATUS", payload: {id: 2, disabled: "false"}});
                    dispatch({type: "SET_ACTIVE_TAB", payload: 2});
                } else {
                    dispatch({type: "SET_ACTIVE_TAB", payload: 2});
                }
            } else {
                dispatch({
                    type: "SET_TAB_STATUS",
                    payload: {id: 0, error: "true", errorMsg: "Please select at least one service"}
                });
            }
        }
    };

    const navToServiceNotes = () => {
        scrollToTop();
        if (!serviceSubmitted) {
            if (services.length !== 0) {
                dispatch({type: "SET_TAB_STATUS", payload: {id: 0, error: "false"}});
                const details = {...serviceContact, validating: true}
                dispatch({
                    type: "SET_SERVICE_CONTACT",
                    payload: details
                });
                if (serviceContact.validated) {
                    dispatch({type: "SET_TAB_STATUS", payload: {id: 2, error: "false"}});
                    if (tabs[3].disabled) {
                        dispatch({type: "SET_TAB_STATUS", payload: {id: 3, disabled: "false"}});
                        dispatch({type: "SET_ACTIVE_TAB", payload: 3});
                    } else {
                        dispatch({type: "SET_ACTIVE_TAB", payload: 3});
                    }
                    const details = {...serviceContact, validating: false}
                    dispatch({
                        type: "SET_SERVICE_CONTACT",
                        payload: details
                    });
                } else {
                    dispatch({type: "SET_TAB_STATUS", payload: {id: 2, error: "true", errorMsg: ""}});
                }
            } else {
                dispatch({
                    type: "SET_TAB_STATUS",
                    payload: {id: 0, error: "true", errorMsg: "Please select at least one service"}
                });
            }
        }
    };

    const navToPrev = () => {
        scrollToTop();
        dispatch({ type: "SET_ACTIVE_TAB", payload: activeTab - 1 });
    };


    return { navToServiceDetails, navToServiceContact, navToPrev, navToServiceNotes };
};

export default UseNavTo;