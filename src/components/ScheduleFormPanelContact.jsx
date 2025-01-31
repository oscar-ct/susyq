import {useCallback, useContext, useEffect, useState} from "react";
import {isValidEmail, isValidName, phoneNumberAutoFormat} from "@/utils/validation";
import GlobalContext from "@/context/GlobalContext";

const ScheduleFormPanelContact = () => {
    const { dispatch, serviceContact } = useContext(GlobalContext);

    const [errorFirstName, setErrorFirstName] = useState(false);
    const [errorFirstNameMsg, setErrorFirstNameMsg] = useState("");
    const [errorLastName, setErrorLastName] = useState(false);
    const [errorLastNameMsg, setErrorLastNameMsg] = useState("");
    const [errorEmail, setErrorEmail] = useState(false);
    const [errorEmailMsg, setErrorEmailMsg] = useState("");
    const [errorPhone, setErrorPhone] = useState(false);
    const [errorPhoneMsg, setErrorPhoneMsg] = useState("");

    const dispatchContact = (data) => {
        dispatch({
            type: "SET_SERVICE_CONTACT",
            payload: data
        });
    };
    const validateEmailCallback = useCallback((str) => {
        if (!isValidEmail(str)) {
            setErrorEmail(true);
            setErrorEmailMsg("Please enter a valid email");
        } else {
            setErrorEmail(false);
            setErrorEmailMsg("");
        }
    }, []);
    const validateFirstNameCallback = useCallback((str) => {
        if (!isValidName(str)) {
            setErrorFirstName(true);
            setErrorFirstNameMsg("Please enter a valid name");
        } else {
            setErrorFirstName(false);
            setErrorFirstNameMsg("");
        }
    }, []);
    const validateLastNameCallback = useCallback((str) => {
        if (!isValidName(str)) {
            setErrorLastName(true);
            setErrorLastNameMsg("Please enter a valid name");
        } else {
            setErrorLastName(false);
            setErrorLastNameMsg("");
        }
    }, []);
    const validatePhoneCallback = useCallback((str) => {
        if (str.length !== 12) {
            setErrorPhone(true);
            setErrorPhoneMsg("Please enter a valid phone number");
        } else {
            setErrorPhone(false);
            setErrorPhoneMsg("");
        }
    }, []);
    useEffect(() => {
        const { firstName, lastName, email, phone } = serviceContact;
        if (serviceContact.validating) {
            validateEmailCallback(email);
            validateFirstNameCallback(firstName);
            validateLastNameCallback(lastName);
            validatePhoneCallback(phone);
        }
    }, [serviceContact.validating, serviceContact, validateEmailCallback, validatePhoneCallback, validateFirstNameCallback, validateLastNameCallback]);

    const validateAll = (contactDetails) => {
        const { firstName, lastName, email, phone } = contactDetails;
        return isValidName(firstName) && isValidName(lastName) && isValidEmail(email) && phone.length === 12;
    };
    const setGlobalStateValidation = (data) => {
        const validated = validateAll(data);
        if (validated) {
            const details = {...data, validated: true}
            dispatch({type: "SET_TAB_STATUS", payload: {id: 4, disabled: "false"}});
            dispatchContact(details);
        } else {
            const details = {...data, validated: false}
            dispatch({type: "SET_TAB_STATUS", payload: {id: 4, disabled: "true"}});
            dispatchContact(details);
        }
    };

    const setFirstName = (e) => {
        const val = e.target.value;
        const details = {...serviceContact, firstName: val}
        dispatchContact(details);
        setGlobalStateValidation(details);
    };
    const setLastName = (e) => {
        const val = e.target.value;
        const details = {...serviceContact, lastName: val}
        dispatchContact(details);
        setGlobalStateValidation(details);
    };
    const setEmailAddress = (e) => {
        const val = e.target.value;
        const details = {...serviceContact, email: val}
        dispatchContact(details);
        setGlobalStateValidation(details);
    };
    const setPhone = (e) => {
        const val = phoneNumberAutoFormat(e.target.value);
        const details = {...serviceContact, phone: val}
        dispatchContact(details);
        setGlobalStateValidation(details);
    };

    const setAddress1 = (e) => {
        const details = {...serviceContact, cleaningAddress: { ...serviceContact.cleaningAddress, address1: e.target.value }}
        dispatchContact(details);
    };
    const setAddress2 = (e) => {
        const details = {...serviceContact, cleaningAddress: { ...serviceContact.cleaningAddress, address2: e.target.value }}
        dispatchContact(details);
    };
    const setCity = (e) => {
        const details = {...serviceContact, cleaningAddress: { ...serviceContact.cleaningAddress, city: e.target.value }}
        dispatchContact(details);
    };
    const setZipCode = (e) => {
        const details = {...serviceContact, cleaningAddress: { ...serviceContact.cleaningAddress, zipCode: e.target.value }}
        dispatchContact(details);
    };

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
                                    autoComplete="address 1"
                                    className="block appearance-none w-full bg-stone-100 border border-stone-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-stone-200"
                                    id="address1"
                                    type={"text"}
                                    placeholder={"Street Address"}
                                    onChange={setAddress1}
                                    value={serviceContact.cleaningAddress.address1}
                                />
                            </div>
                            <div className="relative w-full md:w-3/12">
                                <input
                                    autoComplete="address 2"
                                    className="block appearance-none w-full bg-stone-100 border border-stone-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-stone-200"
                                    id="address2"
                                    type={"text"}
                                    placeholder={"Apt/Suite #"}
                                    onChange={setAddress2}
                                    value={serviceContact.cleaningAddress.address2}
                                />
                            </div>
                        </div>
                        <div className={"flex flex-col md:flex-row gap-4"}>
                            <div className="relative w-full md:w-7/12">
                                <input
                                    autoComplete="home city"
                                    className="block appearance-none w-full bg-stone-100 border border-stone-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-stone-200"
                                    id="city"
                                    type={"text"}
                                    placeholder={"City"}
                                    onChange={setCity}
                                    value={serviceContact.cleaningAddress.city}
                                />
                            </div>
                            <div className={"flex w-full gap-4 md:5/12"}>
                                <div className="relative w-full md:w-4/12">
                                    <input
                                        disabled={true}
                                        className="block appearance-none w-full bg-stone-100 border border-stone-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight cursor-not-allowed"
                                        id="state"
                                        type={"text"}
                                        placeholder={"Texas"}
                                    />
                                </div>
                                <div className="relative w-full md:w-8/12">
                                    <input
                                        className="block appearance-none w-full bg-stone-100 border border-stone-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-stone-200"
                                        id="zipCode"
                                        type={"text"}
                                        placeholder={"Zip Code"}
                                        autoComplete={"locality"}
                                        onChange={setZipCode}
                                        value={serviceContact.cleaningAddress.zipCode}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className={"border-b pb-8 md:pb-3 md:pt-8 md:border-none"}>
                <p className={"text-center pb-8 text-gray-500"}>
                    This information will only be used to contact you about your cleaning
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
                                        className={`${ errorFirstName && errorFirstNameMsg ? "bg-red-300 focus:border-red-500" : "bg-stone-100 focus:bg-stone-200 text-gray-700"} block appearance-none w-full border border-stone-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none `}
                                        type={"text"}
                                        placeholder={"First Name"}
                                        onChange={setFirstName}
                                        value={serviceContact.firstName}
                                    />
                                </div>
                                {
                                    errorFirstName && errorFirstNameMsg && (
                                        <div className={"text-center text-red-500 font-semibold md:text-start text-sm"}>
                                            {errorFirstNameMsg}
                                        </div>
                                    )
                                }
                            </div>
                            <div className={"w-full flex flex-col gap-2 md:w-6/12"}>
                                <div className="relative w-full">
                                    <input
                                        id={"lastName"}
                                        autoComplete={"family name"}
                                        className={`${ errorLastName && errorLastNameMsg ? "bg-red-300 focus:border-red-500" : "bg-stone-100 focus:bg-stone-200 text-gray-700"} block appearance-none w-full border border-stone-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none `}
                                        type={"text"}
                                        placeholder={"Last Name"}
                                        onChange={setLastName}
                                        value={serviceContact.lastName}
                                    />
                                </div>
                                {
                                    errorLastName && errorLastNameMsg && (
                                        <div className={"text-center text-red-500 font-semibold md:text-start text-sm"}>
                                            {errorLastNameMsg}
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
                                    className={`${ errorEmail && errorEmailMsg ? "bg-red-300 focus:border-red-500" : "bg-stone-100 focus:bg-stone-200 text-gray-700"} block appearance-none w-full border border-stone-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none `}
                                    type={"email"}
                                    placeholder={"Email Address"}
                                    value={serviceContact.email}
                                    onChange={setEmailAddress}
                                />
                            </div>
                            {
                                errorEmail && errorEmailMsg && (
                                    <div className={"text-center text-red-500 font-semibold md:text-start text-sm"}>
                                        {errorEmailMsg}
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
                                    className={`${ errorPhone && errorPhoneMsg ? "bg-red-300 focus:border-red-500" : "bg-stone-100 focus:bg-stone-200 text-gray-700"} block appearance-none w-full border border-stone-200 py-3 px-4 pr-8 rounded leading-tight focus:outline-none `}
                                    type={"tel"}
                                    placeholder={"Phone Number"}
                                    maxLength={12}
                                    onChange={setPhone}
                                    value={serviceContact.phone}
                                />
                            </div>
                            {
                                errorPhone && errorPhoneMsg && (
                                    <div className={"text-center text-red-500 font-semibold md:text-start text-sm"}>
                                        {errorPhoneMsg}
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