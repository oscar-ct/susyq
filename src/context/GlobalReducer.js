import {initialStateObj} from "@/utils/initialState";

const globalReducer = (state, action) => {
    switch(action.type) {
        case "SET_LS":
            localStorage.setItem("susy", JSON.stringify(state));
            return state;
        case "RESET_STATE":
            return {
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
        case "SET_SERVICE_SOURCE":
            return {
                ...state,
                serviceSource: action.payload
            }
        case "SUBMIT_IN_PROGRESS":
            return {
                ...state,
                isAttemptingToSubmitEstimate: action.payload
            }
        case "SUBMISSION_SUCCESS":
            return {
                ...state,
                hasSubmittedEstimateSuccessfully: true
            }
        case "SET_FREQUENCY":
            return {
                ...state,
                frequency: action.payload
            }
        case "SET_SERVICES":
            return {
                ...state,
                services: action.payload
            }
        case "SET_SERVICE_DETAILS":
            return {
                ...state,
                serviceDetails: action.payload
            }
        case "SET_SERVICE_CONTACT":
            return {
                ...state,
                serviceContact: action.payload
            }
        case "SET_SERVICE_NOTES":
            return {
                ...state,
                serviceNotes: action.payload
            }
        case "SET_ACTIVE_TAB":
            return {
                ...state,
                activeTab: action.payload
            }
        case "SET_TAB_STATUS":
            // const newState = tabs.map((tab) => {
            //     if (tab.id === 1 && tab.disabled) {
            //         let newTabs = {...tab};
            //         newTabs["disabled"] = false;
            //         return newTabs;
            //     }
            //     return tab;
            // });
            const { id, disabled, error, errorMsg } = action.payload;
            const updatedTabs = state.tabs.map((tab) => {
                if (tab.id === id) {
                    if (disabled === "true") {
                        tab.disabled = true
                    }
                    if (disabled === "false") {
                        tab.disabled = false
                    }
                    if (error === "true") {
                        tab.error = true
                        tab.errorMsg = errorMsg
                    }
                    if (error === "false") {
                        tab.error = false
                        tab.errorMsg = ""
                    }
                }
                return tab;
            });
            return {
                ...state,
                tabs: updatedTabs
            }
        default:
            console.log("case missed...")
            return state;
    }
};
export default globalReducer;