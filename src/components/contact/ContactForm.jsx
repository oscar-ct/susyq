"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as emailjs from "@emailjs/browser";
import { isValidEmail, isValidName, phoneNumberAutoFormat } from "@/utils/validation";

const ContactForm = () => {
    const [formValues, setFormValues] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        message: "",
    });

    const [inputStatus, setInputStatus] = useState({
        firstName: { active: false, error: false },
        lastName: { active: false, error: false },
        email: { active: false, error: false },
        phone: { active: false, error: false },
        message: { active: false, error: false },
    });

    const [formState, setFormState] = useState({
        isValidating: false,
        buttonText: "Submit",
        isSubmitting: false,
        isSuccess: false,
        hasError: false,
        attemptCount: 0,
    });

    const debounceTimeoutRef = useRef(null);

    const is10Characters = (str) => str.trim().length >= 10;

    const validateField = useCallback((field, value) => {
        switch (field) {
            case "firstName":
            case "lastName":
                return isValidName(value);
            case "email":
                return isValidEmail(value);
            case "phone":
                return value.length === 12;
            case "message":
                return is10Characters(value);
            default:
                return true;
        }
    }, []);

    const validateForm = useCallback(() => {
        const errors = {
            firstName: !validateField("firstName", formValues.firstName),
            lastName: !validateField("lastName", formValues.lastName),
            email: !validateField("email", formValues.email),
            phone: !validateField("phone", formValues.phone),
            message: !validateField("message", formValues.message),
        };

        setInputStatus((prev) => ({
            ...prev,
            firstName: { ...prev.firstName, error: errors.firstName },
            lastName: { ...prev.lastName, error: errors.lastName },
            email: { ...prev.email, error: errors.email },
            phone: { ...prev.phone, error: errors.phone },
            message: { ...prev.message, error: errors.message },
        }));

        return !Object.values(errors).some((error) => error);
    }, [formValues, validateField]);

    const submitMessage = async () => {
        if (formState.attemptCount >= 3) {
            setFormState((prev) => ({
                ...prev,
                hasError: true,
                buttonText: "Too Many Attempts",
                isSubmitting: false,
            }));
            setTimeout(() => {
                setFormState((prev) => ({
                    ...prev,
                    hasError: false,
                    buttonText: "Submit",
                    attemptCount: 0,
                }));
            }, 5000);
            return;
        }
        setFormState((prev) => ({
            ...prev,
            isSubmitting: true,
            isValidating: true,
            attemptCount: prev.attemptCount + 1,
        }));
        if (!validateForm()) {
            setFormState((prev) => ({ ...prev, isSubmitting: false }));
            return;
        }
        setFormState((prev) => ({ ...prev, buttonText: "Sending" }));
        const contactMessage = await submitContactToServiceFusion(formValues);
        setFormState((prev) => ({ ...prev, buttonText: "Sending..." }));
        const emailSuccess = await submitEmailToAPI(contactMessage);
        if (emailSuccess) {
            setFormValues({ firstName: "", lastName: "", email: "", phone: "", message: "" });
            setInputStatus({
                firstName: { active: false, error: false },
                lastName: { active: false, error: false },
                email: { active: false, error: false },
                phone: { active: false, error: false },
                message: { active: false, error: false },
            });
            setFormState({
                isValidating: false,
                buttonText: "Submit",
                isSubmitting: false,
                isSuccess: true,
                hasError: false,
                attemptCount: 0,
            });
        } else {
            setFormState({
                isValidating: false,
                buttonText: "Submit",
                isSubmitting: false,
                isSuccess: false,
                hasError: true,
            });
            setTimeout(() => {
                setFormState((prev) => ({ ...prev, hasError: false }));
            }, 4000);
        }
    };

    const submitContactToServiceFusion = async (data) => {
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/servicefusion/customers/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (!res.ok) {
                return "Error: Service Fusion connection failed.";
            }
            const resObj = await res.json();
            return resObj.message;
        } catch {
            return "Error: Service Fusion connection failed.";
        }
    };

    const submitEmailToAPI = async (contactMessage) => {
        try {
            const res = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                {
                    from_name: `${formValues.firstName} ${formValues.lastName}`,
                    from_email: formValues.email,
                    from_phone: formValues.phone,
                    message: formValues.message,
                    res_message: contactMessage,
                },
                process.env.NEXT_PUBLIC_EMAILJS_KEY
            );
            return res.status === 200;
        } catch {
            return false;
        }
    };

    const handleInputChange = (field, value) => {
        setFormValues((prev) => ({ ...prev, [field]: value }));
    };

    const setFormatPhone = (e) => {
        const val = phoneNumberAutoFormat(e.target.value);
        handleInputChange("phone", val);
    };

    const handleInputInteraction = (field, type, value) => {
        setInputStatus((prev) => ({
            ...prev,
            [field]: { ...prev[field], [type]: value },
        }));
    };

    const handleReset = () => {
        setFormState((prev) => ({ ...prev, isSuccess: false }));
    };

    useEffect(() => {
        if (formState.isValidating) {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
            debounceTimeoutRef.current = setTimeout(() => {
                validateForm();
            }, 300);
        }
        return () => {
            if (debounceTimeoutRef.current) {
                clearTimeout(debounceTimeoutRef.current);
            }
        };
    }, [formState.isValidating, formValues, validateForm]);

    // const handleKeyDown = (e) => {
    //     if (e.key === "Enter" && e.target.tagName !== "TEXTAREA") {
    //         e.preventDefault();
    //     }
    // };

    return (
        <div className="py-5 w-full flex justify-center">
            <div className="pt-8 pb-8 px-4 w-full lg:w-8/12 bg-white shadow-md rounded-xl flex flex-col sm:px-8 md:pb-5">
                <form onSubmit={(e) => e.preventDefault()} >
                    {formState.isSuccess ? (
                        <div className="flex flex-col justify-center items-center gap-8 pb-3">
                            <h1 className="text-center text-xl leading-relaxed text-gray-500">
                                Thank you for your message. An expert representative will get in touch with you as soon as possible.
                            </h1>
                            <button
                                onClick={handleReset}
                                className="bg-susy text-white button py-2 px-4 rounded"
                            >
                                Send another message
                            </button>
                        </div>
                    ) : (
                        <>
                            <div className="pb-6 text-center text-2xl text-gray-500">
                                Get in touch with us.
                            </div>
                            <div className="flex flex-col md:flex-row gap-8">
                                <div className="flex flex-col items-start w-full md:w-5/12 gap-8">
                                    <div className="relative h-11 w-full md:w-60">
                                        <input
                                            id="firstName"
                                            autoComplete="given-name"
                                            onFocus={() => handleInputInteraction("firstName", "active", true)}
                                            onBlur={() =>
                                                formValues.firstName.length === 0 &&
                                                handleInputInteraction("firstName", "active", false)
                                            }
                                            value={formValues.firstName}
                                            onChange={(e) => handleInputChange("firstName", e.target.value)}
                                            placeholder="Enter name"
                                            className={`${
                                                !inputStatus.firstName.active ? "cursor-pointer" : ""
                                            } text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${
                                                inputStatus.firstName.error ? "!border-b-2 !border-b-red-600" : ""
                                            }`}
                                        />
                                        <label
                                            htmlFor="firstName"
                                            className="text-gray-500 hover:text-gray-700 after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                        >
                                            {inputStatus.firstName.active ? "First Name" : "First Name"}
                                        </label>
                                        {inputStatus.firstName.error && (
                                            <div className="text-red-500 leading-tight font-semibold text-sm">
                                                Please enter a valid first name
                                            </div>
                                        )}
                                    </div>
                                    <div className="relative h-11 w-full md:w-60">
                                        <input
                                            id="lastName"
                                            autoComplete="family-name"
                                            onFocus={() => handleInputInteraction("lastName", "active", true)}
                                            onBlur={() =>
                                                formValues.lastName.length === 0 &&
                                                handleInputInteraction("lastName", "active", false)
                                            }
                                            value={formValues.lastName}
                                            onChange={(e) => handleInputChange("lastName", e.target.value)}
                                            placeholder="Enter name"
                                            className={`${
                                                !inputStatus.lastName.active ? "cursor-pointer" : ""
                                            } text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${
                                                inputStatus.lastName.error ? "!border-b-2 !border-b-red-600" : ""
                                            }`}
                                        />
                                        <label
                                            htmlFor="lastName"
                                            className="text-gray-500 hover:text-gray-700 after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                        >
                                            {inputStatus.lastName.active ? "Last Name" : "Last Name"}
                                        </label>
                                        {inputStatus.lastName.error && (
                                            <div className="text-red-500 leading-tight font-semibold text-sm">
                                                Please enter a valid last name
                                            </div>
                                        )}
                                    </div>
                                    <div className="relative h-11 w-full md:w-60">
                                        <input
                                            id="email"
                                            autoComplete="email"
                                            onFocus={() => handleInputInteraction("email", "active", true)}
                                            onBlur={() =>
                                                formValues.email.length === 0 && handleInputInteraction("email", "active", false)
                                            }
                                            value={formValues.email}
                                            onChange={(e) => handleInputChange("email", e.target.value)}
                                            placeholder="Enter email"
                                            className={`${
                                                !inputStatus.email.active ? "cursor-pointer" : ""
                                            } text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${
                                                inputStatus.email.error ? "!border-b-2 !border-b-red-600" : ""
                                            }`}
                                        />
                                        <label
                                            htmlFor="email"
                                            className="text-gray-500 hover:text-gray-700 after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                        >
                                            {inputStatus.email.active ? "Email Address" : "Email Address"}
                                        </label>
                                        {inputStatus.email.error && (
                                            <div className="text-red-500 leading-tight font-semibold text-sm">
                                                Please enter a valid email address
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full h-full md:w-7/12 flex flex-col justify-between">
                                    <div className="relative h-11 w-full mb-8">
                                        <input
                                            id="tel"
                                            type="tel"
                                            onFocus={() => handleInputInteraction("phone", "active", true)}
                                            onBlur={() =>
                                                formValues.phone.length === 0 && handleInputInteraction("phone", "active", false)
                                            }
                                            value={formValues.phone}
                                            autoComplete="tel"
                                            maxLength={12}
                                            onChange={setFormatPhone}
                                            placeholder="Enter phone number"
                                            className={`${
                                                !inputStatus.phone.active ? "cursor-pointer" : ""
                                            } text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${
                                                inputStatus.phone.error ? "!border-b-2 !border-b-red-600" : ""
                                            }`}
                                        />
                                        <label
                                            htmlFor="tel"
                                            className="text-gray-500 hover:text-gray-700 after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                        >
                                            {inputStatus.phone.active ? "Phone Number" : "Phone Number"}
                                        </label>
                                        {inputStatus.phone.error && (
                                            <div className="text-red-500 leading-tight font-semibold text-sm">
                                                Please enter a valid 10-digit phone number
                                            </div>
                                        )}
                                    </div>
                                    <div className="relative h-36 flex flex-col">
                                        <textarea
                                            id="message"
                                            rows={3}
                                            onFocus={() => handleInputInteraction("message", "active", true)}
                                            onBlur={() =>
                                                formValues.message.length === 0 &&
                                                handleInputInteraction("message", "active", false)
                                            }
                                            value={formValues.message}
                                            onChange={(e) => handleInputChange("message", e.target.value)}
                                            placeholder="Enter message"
                                            className={`${
                                                !inputStatus.message.active ? "cursor-pointer" : ""
                                            } text-[16px] lg:text-base peer w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 h-28 ${
                                                inputStatus.message.error ? "!border-b-2 !border-b-red-600" : ""
                                            }`}
                                        />
                                        <label
                                            htmlFor="message"
                                            className="text-gray-500 hover:text-gray-700 after:-bottom-1.5 after:content[''] pointer-events-none absolute left-0 -top-[6px] flex h-28 w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                        >
                                            {inputStatus.message.active ? "Your Message" : "Your Message"}
                                        </label>
                                        {inputStatus.message.error && (
                                            <div className="text-red-500 leading-tight font-semibold text-sm">
                                                Please enter at least 10 characters
                                            </div>
                                        )}
                                    </div>
                                    <div className="flex justify-end items-center md:items-end">
                                        <div className="pr-2 flex-grow items-center md:hidden">
                                            {formState.hasError && (
                                                <p className="text-sm text-red-500 !leading-tight text-center">
                                                    {formState.attemptCount >= 3
                                                        ? "Too many attempts. Please try again later."
                                                        : "Sorry, something went wrong. Please try again later."}
                                                </p>
                                            )}
                                        </div>
                                        <button
                                            onClick={submitMessage}
                                            disabled={formState.isSubmitting}
                                            className={`${
                                                !formState.isSubmitting && !formState.isSuccess && !formState.hasError
                                                    ? "hover:bg-susy"
                                                    : "opacity-60 cursor-not-allowed"
                                            } bg-susy text-white button py-2 px-4 rounded`}
                                        >
                                            <div className="flex items-center">
                                                <span>{formState.buttonText}</span>
                                                {formState.isSubmitting && <span className="ml-[6px] loading" />}
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:flex justify-center items-end h-4">
                                {formState.hasError && (
                                    <span className="text-red-500">
                                    {
                                        formState.attemptCount >= 3
                                        ? "Too many attempts. Please try again later."
                                        : "Sorry, something went wrong. Please try again later."
                                    }
                                    </span>
                                )}
                            </div>
                        </>
                    )}
                </form>
            </div>
        </div>
    );
};

export default ContactForm;