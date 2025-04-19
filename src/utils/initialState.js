export const initialStateObj = {
    hasApiError: false,
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