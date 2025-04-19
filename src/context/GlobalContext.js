"use client";

import {createContext, useReducer} from "react";
import globalReducer from "@/context/GlobalReducer";
import {initialStateObj} from "@/utils/initialState";


const GlobalContext = createContext();

export function GlobalProvider({ children }) {
    const initialState = typeof window !== "undefined" && localStorage.getItem("susy") ? JSON.parse(localStorage.getItem("susy")) : initialStateObj;
    const [state, dispatch] = useReducer(globalReducer, initialState);
    return (
        <GlobalContext.Provider value={{
            dispatch,
            hasApiError: state.hasApiError,
            isAttemptingToSubmitEstimate: state.isAttemptingToSubmitEstimate,
            hasSubmittedEstimateSuccessfully: state.hasSubmittedEstimateSuccessfully,
            frequency: state.frequency,
            services: state.services,
            serviceDetails: state.serviceDetails,
            serviceContact: state.serviceContact,
            serviceNotes: state.serviceNotes,
            activeTab: state.activeTab,
            tabs: state.tabs,
            serviceSource: state.serviceSource,
        }}>
            {children}
        </GlobalContext.Provider>
    )
}

export default GlobalContext;