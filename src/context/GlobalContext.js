"use client";

import {createContext, useReducer} from "react";
import globalReducer from "@/context/GlobalReducer";


const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const initialState = {
        isAttemptingToSubmitEstimate: false,
        hasSubmittedEstimateSuccessfully: false,
        frequency: "",
        services : [],
        serviceDetails: {
            rooms: {
                bedroom: "3",
                bathroom: "2"
            },
            size: "",
            extras: [],
            frequency: "",
        },
        serviceContact: {
            validated: false,
            validating: false,
            cleaningAddress: {
                address1: "",
                address2: "",
                city: "",
                state: "TX",
                zipCode: ""
            },
            firstName: "",
            lastName: "",
            email: "",
            phone: "",
        },
        serviceNotes: "",
        activeTab: 0,
        tabs: [
            {
                id: 0,
                name: "Frequency",
                disabled: false,
                error: false,
                errorMsg: "",
            },
            {
                id: 1,
                name: "Services",
                disabled: true,
                error: false,
                errorMsg: "",
            },
            {
                id: 2,
                name: "Details",
                disabled: true,
                error: false,
                errorMsg: "",
            },
            {
                id: 3,
                name: "Contact",
                disabled: true,
                error: false,
                errorMsg: "",
            },
            {
                id: 4,
                name: "Notes",
                disabled: true,
                error: false,
                errorMsg: "",
            },
        ],
        serviceSource: "",
    };
    const [state, dispatch] = useReducer(globalReducer, initialState);
    return (
        <GlobalContext.Provider value={{
            dispatch,
            serviceSource: state.serviceSource,
            isAttemptingToSubmitEstimate: state.isAttemptingToSubmitEstimate,
            hasSubmittedEstimateSuccessfully: state.hasSubmittedEstimateSuccessfully,
            frequency: state.frequency,
            services: state.services,
            serviceDetails: state.serviceDetails,
            serviceContact: state.serviceContact,
            serviceNotes: state.serviceNotes,
            activeTab: state.activeTab,
            tabs: state.tabs,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;