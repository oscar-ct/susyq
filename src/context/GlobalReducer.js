const globalReducer = (state, action) => {
    switch(action.type) {
        case "SUBMIT_SERVICE":
            return {
                ...state,
                serviceSubmitted: true
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