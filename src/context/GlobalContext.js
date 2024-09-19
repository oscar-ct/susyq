"use client";

import {createContext, useReducer} from "react";
import globalReducer from "@/context/GlobalReducer";


const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const initialState = {
        serviceSubmitted: false,
        services : [],
        serviceDetails: {
            rooms: {
                bedroom: "3",
                bathroom: "2"
            },
            size: "",
            extras: []
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
                name: "Select Service(s)",
                disabled: false,
                error: false,
                errorMsg: "",
            },
            {
                id: 1,
                name: "Service Details",
                disabled: true,
                error: false,
                errorMsg: "",
            },
            {
                id: 2,
                name: "Contact Info",
                disabled: true,
                error: false,
                errorMsg: "",
            },
            {
                id: 3,
                name: "Notes",
                disabled: true,
                error: false,
                errorMsg: "",
            },
        ]
    };
    const [state, dispatch] = useReducer(globalReducer, initialState);
    return (
        <GlobalContext.Provider value={{
            dispatch,
            serviceSubmitted: state.serviceSubmitted,
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