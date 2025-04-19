import {useCallback, useContext, useEffect, useState} from "react";
import {isValidEmail, isValidName, phoneNumberAutoFormat} from "@/utils/validation";
import GlobalContext from "@/context/GlobalContext";

const ScheduleFormPanelContact = () => {
    const { dispatch, serviceContact } = useContext(GlobalContext);

    const [errors, setErrors] = useState({
        firstName: false,
        lastName: false,
        email: false,
        phone: false,
    });

    const dispatchContact = useCallback((data) => {
        dispatch({
            type: "SET_SERVICE_CONTACT",
            payload: data
        });
    }, [dispatch]);
    const dispatchSetLocalStorage = useCallback(() => {
        dispatch({ type: "SET_LS" });
    }, [dispatch]);
    const validateField = useCallback((field, value) => {
        switch (field) {
            case "firstName":
            case "lastName":
                return !isValidName(value);
            case "email":
                return !isValidEmail(value);
            case "phone":
                return value.length !== 12;
            default:
                return false;
        }
    }, []);

    const validateAll = useCallback(({ firstName, lastName, email, phone }) => {
        return isValidName(firstName) && isValidName(lastName) && isValidEmail(email) && phone.length === 12;
    }, []);

    const setGlobalStateValidation = useCallback((data) => {
        const validated = validateAll(data);
        dispatch({type: "SET_TAB_STATUS", payload: {id: 4, disabled: validated ? "false" : "true"}});
        dispatchContact({...data, validated: validated});
    }, [dispatch, dispatchContact, validateAll]);

    const handleInputChange = useCallback((field, value, updateDetails) => {
            setErrors((prev) => ({ ...prev, [field]: validateField(field, value) }));
            updateDetails();
        }, [validateField]);

    const setFirstName = useCallback((e) => {
        const val = e.target.value;
        const details = {...serviceContact, firstName: val}
        handleInputChange("firstName", val, () => setGlobalStateValidation(details));
    }, [serviceContact, handleInputChange, setGlobalStateValidation]);

    const setLastName = useCallback((e) => {
        const val = e.target.value;
        const details = {...serviceContact, lastName: val}
        handleInputChange("lastName", val, () => setGlobalStateValidation(details));
    }, [serviceContact, handleInputChange, setGlobalStateValidation]);

    const setEmailAddress = useCallback((e) => {
        const val = e.target.value;
        const details = {...serviceContact, email: val}
        handleInputChange("email", val, () => setGlobalStateValidation(details));
    }, [serviceContact, handleInputChange, setGlobalStateValidation]);

    const setPhone = useCallback((e) => {
        const val = phoneNumberAutoFormat(e.target.value);
        const details = {...serviceContact, phone: val}
        handleInputChange("phone", val, () => setGlobalStateValidation(details));
    }, [serviceContact, handleInputChange, setGlobalStateValidation]);


    const setAddress1 = useCallback((e) => {
        const details = {...serviceContact, cleaningAddress: { ...serviceContact.cleaningAddress, address1: e.target.value }}
        dispatchContact(details);
    }, [serviceContact, dispatchContact]);

    const setAddress2 = useCallback((e) => {
        const details = {...serviceContact, cleaningAddress: { ...serviceContact.cleaningAddress, address2: e.target.value }}
        dispatchContact(details);
    }, [serviceContact, dispatchContact]);

    const setCity = useCallback((e) => {
        const details = {...serviceContact, cleaningAddress: { ...serviceContact.cleaningAddress, city: e.target.value }}
        dispatchContact(details);
    }, [serviceContact, dispatchContact]);

    const setZipCode = useCallback((e) => {
        const details = {...serviceContact, cleaningAddress: { ...serviceContact.cleaningAddress, zipCode: e.target.value }}
        dispatchContact(details);
    }, [serviceContact, dispatchContact]);
    const handleZipKeyPress = useCallback((e) => {
        if (!/[0-9]/.test(e.key)) {
            e.preventDefault();
        }
    }, []);

    useEffect(() => {
        if (serviceContact.validating) {
            const { firstName, lastName, email, phone } = serviceContact;
            setErrors({
                firstName: validateField("firstName", firstName),
                lastName: validateField("lastName", lastName),
                email: validateField("email", email),
                phone: validateField("phone", phone),
            });
        }
    }, [serviceContact.validating, validateField]);

    const INPUT_CLASS =
        "block appearance-none w-full bg-stone-100 border border-stone-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-stone-200 focus:border-cyan-600";
    const ERROR_INPUT_CLASS = "border-red-600 focus:border-red-600";
    const ERROR_TEXT_CLASS = "text-center text-red-500 md:text-start text-sm";

    return (
        <div className={"px-2 py-8 md:p-8 flex flex-col-reverse md:flex-col"}>
            <div className={"w-full pt-8 md:pt-3 pb-8 md:border-b"}>
                <div className={"flex flex-col items-center gap-4 md:flex-row"}>
                    <div className="tracking-wide font-semibold text-gray-700 md:w-2/12">
                        Cleaning Address
                    </div>
                    <div className={"w-full flex flex-col gap-4 md:w-10/12"}>
                        <div className={"flex flex-col md:flex-row gap-4"}>
                            <div className="relative w-full md:w-9/12">
                                <input
                                    autoComplete="address-line1"
                                    className={INPUT_CLASS}
                                    id="address1"
                                    type={"text"}
                                    placeholder={"Street Address"}
                                    onChange={setAddress1}
                                    value={serviceContact.cleaningAddress.address1 || ""}
                                    onBlur={dispatchSetLocalStorage}
                                />
                            </div>
                            <div className="relative w-full md:w-3/12">
                                <input
                                    autoComplete="address-line2"
                                    className={INPUT_CLASS}
                                    id="address2"
                                    type={"text"}
                                    placeholder={"Apt/Suite #"}
                                    onChange={setAddress2}
                                    value={serviceContact.cleaningAddress.address2 || ""}
                                    onBlur={dispatchSetLocalStorage}
                                />
                            </div>
                        </div>
                        <div className={"flex flex-col md:flex-row gap-4"}>
                            <div className="relative w-full md:w-8/12">
                                <input
                                    autoComplete="locality"
                                    className={INPUT_CLASS}
                                    id="city"
                                    type={"text"}
                                    placeholder={"City"}
                                    onChange={setCity}
                                    value={serviceContact.cleaningAddress.city || ""}
                                    onBlur={dispatchSetLocalStorage}
                                />
                            </div>
                            <div className={"flex w-full gap-4 md:4/12"}>
                                <div className="relative w-full md:w-6/12">
                                    <input
                                        disabled={true}
                                        className={`${INPUT_CLASS} bg-stone-200 cursor-not-allowed`}
                                        id="state"
                                        type={"text"}
                                        placeholder={"Texas"}
                                        value="Texas"
                                    />
                                </div>
                                <div className="relative w-full md:w-6/12">
                                    <input
                                        className={INPUT_CLASS}
                                        id="postalCode"
                                        type={"text"}
                                        placeholder={"5-digit ZIP"}
                                        autoComplete={"postal-code"}
                                        pattern="[0-9]{5}"
                                        maxLength={5}
                                        onKeyDown={handleZipKeyPress}
                                        onChange={setZipCode}
                                        value={serviceContact.cleaningAddress.zipCode || ""}
                                        onBlur={dispatchSetLocalStorage}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"border-b pb-8 md:pb-3 md:pt-8 md:border-none"}>
                <p className={"text-center pb-8 text-gray-500"}>
                    Enter your details to schedule a sparkling clean! We&apos;ll only use this to contact you about your cleaning.
                </p>
                <div className={"flex flex-col gap-4"}>
                    <div className={"flex flex-col md:flex-row gap-4 items-center"}>
                        <div className="tracking-wide font-semibold text-gray-700 md:w-2/12">
                            Full Name*
                        </div>
                        <div className={"w-full flex gap-4 flex-row md:w-10/12"}>
                            <div className={"w-full flex flex-col gap-2 md:w-6/12"}>
                                <div className="relative w-full">
                                    <input
                                        id={"firstName"}
                                        autoComplete={"given name"}
                                        className={`${INPUT_CLASS} ${errors.firstName ? ERROR_INPUT_CLASS : ""}`}
                                        type={"text"}
                                        placeholder={"First Name"}
                                        onChange={setFirstName}
                                        value={serviceContact.firstName || ""}
                                        onBlur={dispatchSetLocalStorage}
                                    />
                                </div>
                                {
                                    errors.firstName && (
                                        <div id="firstName-error" className={ERROR_TEXT_CLASS}>
                                            Please enter a valid first name
                                        </div>
                                    )
                                }
                            </div>
                            <div className={"w-full flex flex-col gap-2 md:w-6/12"}>
                                <div className="relative w-full">
                                    <input
                                        id={"lastName"}
                                        autoComplete={"family name"}
                                        className={`${INPUT_CLASS} ${errors.lastName ? ERROR_INPUT_CLASS : ""}`}
                                        type={"text"}
                                        placeholder={"Last Name"}
                                        onChange={setLastName}
                                        value={serviceContact.lastName || ""}
                                        onBlur={dispatchSetLocalStorage}
                                    />
                                </div>
                                {
                                    errors.lastName && (
                                        <div id="lastName-error" className={ERROR_TEXT_CLASS}>
                                            Please enter a valid last name
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    </div>
                    <div className={"flex flex-col md:flex-row gap-4 items-center"}>
                        <div className="tracking-wide font-semibold text-gray-700 md:w-2/12">
                            Email*
                        </div>
                        <div className={"w-full flex flex-col gap-2 md:w-10/12"}>
                            <div className="relative w-full">
                                <input
                                    id={"email"}
                                    autoComplete={"email"}
                                    className={`${INPUT_CLASS} ${errors.email ? ERROR_INPUT_CLASS : ""}`}
                                    type={"email"}
                                    placeholder={"Email Address"}
                                    value={serviceContact.email || ""}
                                    onChange={setEmailAddress}
                                    onBlur={dispatchSetLocalStorage}
                                />
                            </div>
                            {
                                errors.email && (
                                    <div id="email-error" className={ERROR_TEXT_CLASS}>
                                        Please enter a valid email
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    <div className={"flex flex-col md:flex-row gap-4 items-center"}>
                        <div className="tracking-wide font-semibold text-gray-700 md:w-2/12">
                            Phone*
                        </div>
                        <div className={"w-full flex flex-col gap-2 md:w-10/12"}>
                            <div className="relative w-full">
                                <input
                                    id={"phone"}
                                    autoComplete={"tel"}
                                    className={`${INPUT_CLASS} ${errors.phone ? ERROR_INPUT_CLASS : ""}`}
                                    type={"tel"}
                                    placeholder="123-456-7890"
                                    maxLength={12}
                                    onChange={setPhone}
                                    value={serviceContact.phone || ""}
                                    onBlur={dispatchSetLocalStorage}
                                />
                            </div>
                            {
                                errors.phone && (
                                    <div id="phone-error" className={ERROR_TEXT_CLASS}>
                                        Please enter a valid phone number
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleFormPanelContact;