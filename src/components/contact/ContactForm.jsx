"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import * as emailjs from "@emailjs/browser";
import { isValidEmail, isValidName, phoneNumberAutoFormat } from "@/utils/validation";

const ContactForm = () => {
    const [formValues, setFormValues] = useState({
        firstName: { value: "", error: false },
        lastName: { value: "", error: false },
        email: { value: "", error: false },
        phone: { value: "", error: false },
        message: { value: "", error: false },
        honeypot: { value: "", error: false },
    });

    const [formState, setFormState] = useState({
        isValidating: false,
        buttonText: "Submit",
        isSubmitting: false,
        isSuccess: false,
        hasError: false,
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
            firstName: !validateField("firstName", formValues.firstName.value),
            lastName: !validateField("lastName", formValues.lastName.value),
            email: !validateField("email", formValues.email.value),
            phone: !validateField("phone", formValues.phone.value),
            message: !validateField("message", formValues.message.value),
        };

        setFormValues((prev) => ({
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
        if (formValues.honeypot.value) {
            console.log("Submission ignored! Go away bot!");
            handleResetFromValues();
            return;
        }
        setFormState((prev) => ({
            ...prev,
            isSubmitting: true,
            isValidating: true,
        }));
        if (!validateForm()) {
            setFormState((prev) => ({ ...prev, isSubmitting: false }));
            return;
        }
        setFormState((prev) => ({
            ...prev,
            buttonText: "Sending",
            isValidating: false,
        }));
        try {
            // create a copy of formValues with only customer data strings
            const customerData = Object.keys(formValues).reduce((acc, key) => {
                acc[key] = formValues[key].value;
                return acc;
            }, {});
            delete customerData.honeypot;
            const message = await submitContactToServiceFusion(customerData);
            setFormState((prev) => ({...prev, buttonText: "Sending..."}));
            const isSuccessful = await submitMessageToEmailJS(message);
            if (isSuccessful) {
                handleResetFromValues();
                setFormState((prev) => ({
                    ...prev,
                    buttonText: "Submit",
                    isSubmitting: false,
                    isSuccess: true,
                }));
            } else {
                setFormState((prev) => ({
                    ...prev,
                    buttonText: "Submit",
                    isSubmitting: false,
                    hasError: true,
                }));
            }
        } catch {
            setFormState((prev) => ({
                ...prev,
                buttonText: "Submit",
                isSubmitting: false,
                hasError: true,
            }));
        }
    };


    const submitContactToServiceFusion = async (data) => {
        const TIMEOUT_MS = 10000;
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), TIMEOUT_MS);
        try {
            const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/servicefusion/customers/create`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
                signal: controller.signal
            });
            clearTimeout(timeoutId);
            const message = await res.text();
            if (!res.ok) {
                console.error(message);
                return "Error: Service Fusion connection failed.";
            }
            return message;
        } catch (e) {
            console.error(e);
            return `Error: Service Fusion connection ${e.name === "AbortError" ? "timed out" : "failed"}...`;
        }
    };


    const submitMessageToEmailJS = async (contactMessage) => {
        const TIMEOUT_MS = 10000;
        const timeoutPromise = new Promise((_, reject) => {
            setTimeout(() => reject(new Error("EmailJS request timed out")), TIMEOUT_MS);
        });
        try {
            const emailPromise =  emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
                {
                    from_name: `${formValues.firstName.value} ${formValues.lastName.value}`,
                    from_email: formValues.email.value,
                    from_phone: formValues.phone.value,
                    message: formValues.message.value,
                    res_message: contactMessage,
                },
                process.env.NEXT_PUBLIC_EMAILJS_KEY
            );
            const res = await Promise.race([emailPromise, timeoutPromise]);
            return res.status === 200;
        } catch (e) {
            console.error("Error:", e.message || e.text);
            throw e;
        }
    };

    const handleInputChange = (field, value) => {
        setFormValues((prev) => ({
            ...prev,
            [field]: { ...prev[field], value: value },
        }));
    };

    const setFormatPhone = (e) => {
        const val = phoneNumberAutoFormat(e.target.value);
        handleInputChange("phone", val);
    };

    const handleResetForm = () => {
        setFormState({
            isValidating: false,
            buttonText: "Submit",
            isSubmitting: false,
            isSuccess: false,
            hasError: false,
        });
    };

    const handleResetFromValues = () => {
        setFormValues({
            firstName: { value: "", error: false },
            lastName: { value: "", error: false },
            email: { value: "", error: false },
            phone: { value: "", error: false },
            message: { value: "", error: false },
            honeypot: { value: "", error: false },
        });
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
            <div className="pt-8 pb-8 px-4 w-full lg:w-8/12 bg-white shadow-md rounded-xl sm:px-8 md:pb-5">
                {formState.isSuccess ? (
                    <div className="flex flex-col justify-center items-center gap-8 pb-3">
                        <h1 className="text-center text-xl leading-relaxed text-gray-500">
                            Thank you for your message. An expert representative will get in touch with you as soon as possible.
                        </h1>
                        <button
                            onClick={handleResetForm}
                            className="bg-susy text-white button py-2 px-4 rounded"
                        >
                            Send another message
                        </button>
                    </div>
                ) : formState.hasError ? (
                    <div className="flex flex-col justify-center items-center gap-8 pb-3">
                        <h1 className="text-center text-xl leading-relaxed text-gray-500">
                            Sorry, we encountered an unexpected error. Please try again or call 512-640-6264 to get your request shining!
                        </h1>
                        <button
                            onClick={handleResetForm}
                            className="bg-susy text-white button py-2 px-4 rounded"
                        >
                            Try Again
                        </button>
                    </div>
                ) : (
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div style={{display: 'none'}}>
                            <label htmlFor="url">Website</label>
                            <input
                                type={"text"}
                                id={"url"}
                                name={"url"}
                                value={formValues.honeypot.value}
                                onChange={(e) => handleInputChange("honeypot", e.target.value)}
                                autoComplete={"off"}
                            />
                        </div>
                        <div className="pb-6 text-center text-2xl text-gray-500">
                            Get in touch with us.
                        </div>
                        <div className="flex flex-col md:flex-row gap-8">
                            <div className="flex flex-col items-start w-full md:w-5/12 gap-8">
                                <div className="relative h-11 w-full md:w-60">
                                    <input
                                        id="firstName"
                                        autoComplete="given-name"
                                        value={formValues.firstName.value}
                                        onChange={(e) => handleInputChange("firstName", e.target.value)}
                                        placeholder="Enter first name"
                                        className={`text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${
                                            formValues.firstName.error ? "!border-b !border-b-red-600" : ""
                                        }`}
                                    />
                                    <label
                                        htmlFor="firstName"
                                        className="text-gray-500 hover:text-gray-700 after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                    >
                                        First Name
                                    </label>
                                    {formValues.firstName.error && (
                                        <div className="text-red-500 leading-tight text-sm">
                                            Please enter a valid first name
                                        </div>
                                    )}
                                </div>
                                <div className="relative h-11 w-full md:w-60">
                                    <input
                                        id="lastName"
                                        autoComplete="family-name"
                                        value={formValues.lastName.value}
                                        onChange={(e) => handleInputChange("lastName", e.target.value)}
                                        placeholder="Enter last name"
                                        className={`text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${
                                            formValues.lastName.error ? "!border-b !border-b-red-600" : ""
                                        }`}
                                    />
                                    <label
                                        htmlFor="lastName"
                                        className="text-gray-500 hover:text-gray-700 after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                    >
                                        Last Name
                                    </label>
                                    {formValues.lastName.error && (
                                        <div className="text-red-500 leading-tight text-sm">
                                            Please enter a valid last name
                                        </div>
                                    )}
                                </div>
                                <div className="relative h-11 w-full md:w-60">
                                    <input
                                        id="email"
                                        autoComplete="email"
                                        value={formValues.email.value}
                                        onChange={(e) => handleInputChange("email", e.target.value)}
                                        placeholder="Enter email"
                                        className={`text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${
                                            formValues.email.error ? "!border-b !border-b-red-600" : ""
                                        }`}
                                    />
                                    <label
                                        htmlFor="email"
                                        className="text-gray-500 hover:text-gray-700 after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                    >
                                        Email Address
                                    </label>
                                    {formValues.email.error && (
                                        <div className="text-red-500 leading-tight text-sm">
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
                                        value={formValues.phone.value}
                                        autoComplete="tel"
                                        maxLength={12}
                                        onChange={setFormatPhone}
                                        placeholder="Enter phone number"
                                        className={`text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${
                                            formValues.phone.error ? "!border-b !border-b-red-600" : ""
                                        }`}
                                    />
                                    <label
                                        htmlFor="tel"
                                        className="text-gray-500 hover:text-gray-700 after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                    >
                                        Phone Number
                                    </label>
                                    {formValues.phone.error && (
                                        <div className="text-red-500 leading-tight text-sm">
                                            Please enter a valid 10-digit phone number
                                        </div>
                                    )}
                                </div>
                                <div className="relative h-36 flex flex-col">
                                    <textarea
                                        id="message"
                                        rows={3}
                                        value={formValues.message.value}
                                        onChange={(e) => handleInputChange("message", e.target.value)}
                                        placeholder="Enter message"
                                        className={`text-[16px] lg:text-base peer w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 h-28 ${
                                            formValues.message.error ? "!border-b !border-b-red-600" : ""
                                        }`}
                                    />
                                    <label
                                        htmlFor="message"
                                        className="text-gray-500 hover:text-gray-700 after:-bottom-1.5 after:content[''] pointer-events-none absolute left-0 -top-[6px] flex h-28 w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500"
                                    >
                                        Your Message
                                    </label>
                                    {formValues.message.error && (
                                        <div className="text-red-500 leading-tight text-sm">
                                            Please enter at least 10 characters
                                        </div>
                                    )}
                                </div>
                                <div className="flex justify-end items-center md:items-end">

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
                                            {formState.isSubmitting && <span className="ml-[6px] loading"/>}
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

// yvett@susyqcleaning.com

export default ContactForm;