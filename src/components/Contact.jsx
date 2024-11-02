"use client"

import {useCallback, useEffect, useState} from "react";
import {TiPhone} from "react-icons/ti";
import {phoneNumberAutoFormat} from "@/utils/phoneNumberAutoFormat";
import * as emailjs from "@emailjs/browser";

const Contact = () => {

    const [validating, setValidating] = useState(false);
    const [btnMessage, setBtnMessage] = useState("Send");

    const [email, setEmail] = useState("");
    const [emailInputHover, setEmailInputHover] = useState(false);
    const [emailInputActive, setEmailInputActive] = useState(false);
    const [emailError, setEmailError] = useState(false);

    const [phone, setPhone] = useState("");
    const [phoneInputHover, setPhoneInputHover] = useState(false);
    const [phoneInputActive, setPhoneInputActive] = useState(false);
    const [phoneError, setPhoneError] = useState(false);

    const [name, setName] = useState("");
    const [nameInputHover, setNameInputHover] = useState(false);
    const [nameInputActive, setNameInputActive] = useState(false);
    const [nameError, setNameError] = useState(false);

    const [message, setMessage] = useState("");
    const [messageInputHover, setMessageInputHover] = useState(false);
    const [messageInputActive, setMessageInputActive] = useState(false);
    const [messageError, setMessageError] = useState(false);

    const [btnLoading, setBtnLoading] = useState(false);
    const [resSuccess, setResSuccess] = useState(false);
    const [resError,  setResError] = useState(false);


    const validateEmail = useCallback((str) => {
        const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if (!emailRegex.test(str)) {
            setEmailError(true);
        } else {
            setEmailError(false);
        }
    }, []);
    const validateName = useCallback((str) => {
        if (str.length === 0) {
            setNameError(true);
        } else {
            setNameError(false);
        }
    }, []);
    const validateMessage = useCallback((str) => {
        if (str.length === 0) {
            setMessageError(true);
        } else {
            setMessageError(false);
        }
    }, []);
    const validatePhone = useCallback((str) => {
        if (str.length !== 12) {
            setPhoneError(true);
        } else {
            setPhoneError(false);
        }
    }, []);
    useEffect(() => {
        if (validating) {
            validateEmail(email);
            validateName(name);
            validatePhone(phone);
            validateMessage(message);
        }
    }, [validating, validateEmail, validatePhone, validateName, validateMessage, name, email, phone, message]);


    const sendEmail = async (contactMessage) => {
        try {
            const res = await emailjs.send(`${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`, `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`, {from_name: name, from_email: email, from_phone: phone, message: message, res_message: contactMessage}, `${process.env.NEXT_PUBLIC_EMAILJS_KEY}`);
            return res.status === 200;
        } catch {
            return false;
        }
    };
    const submitContact = async (data) => {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/servicefusion/customers/create`, {
            method: "POST",
            body: JSON.stringify(data),
        });
        if (!res.ok) {
            return "Error: Service Fusion connection failed.";
        }
        const resObj = await res.json();
        return resObj.message;
    };
    // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
    const submitMessage = async () => {
        setBtnLoading(true);
        const emailRegex = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;
        if (message.length === 0 || name.length === 0 || phone.length !== 12 || !emailRegex.test(email)) {
            setValidating(true);
            setBtnLoading(false);
        } else {
            setBtnMessage("Sending");
            // let res;
            // await delay(3000);
            // setBtnMessage("Sending...");
            // await delay(3000);
            // res = true;
            const contactMessage = await submitContact({name, email, phone});
            setBtnMessage("Sending...");
            const res = await sendEmail(contactMessage);
            if (res) {
                setBtnLoading(false);
                setResError(false);
                setResSuccess(true);
                setValidating(false);
                setName("");
                setMessage("");
                setPhone("");
                setEmail("");
                setBtnMessage("Sent!");
            } else {
                setBtnLoading(false);
                setResSuccess(false);
                setResError(true);
                setValidating(false);
            }
            setTimeout(() => {
                setBtnMessage("Send");
                setResError(false);
                setResSuccess(false);
            }, 4000);
        }
    };
    const setFormatPhone = (e) => {
        const val = phoneNumberAutoFormat(e.target.value);
        setPhone(val);
    };

    return (
        <section className={"py-14 w-full bg-zinc-100"}>
            <div className={"max-w-screen-xl mx-auto px-4 lg:px-8 flex flex-col items-center"}>
                <div className={"flex flex-col justify-center pb-8"}>
                    <h1 className={"text-center text-5xl uppercase font-light text-gray-500"}>Contact Us</h1>
                    <h4 className={"pt-5 text-center text-2xl font-light text-gray-500"}>
                        Have a question or concern? Send us a message or give us a call. We&apos;d love to hear from
                        you.
                    </h4>
                    <div className={"pt-3 flex justify-center"}>
                        <div className={"text-lg text-gray-500 flex items-center justify-between"}>
                            <TiPhone size={25}/>
                            <a href={"tel:512-640-6264"} className={"text-susy underline"}>(512) 640-6264</a>
                        </div>
                    </div>
                </div>
                <div className={"py-5 w-full flex justify-center"}>
                    <div className={"pt-8 px-4 w-full lg:w-8/12 bg-white shadow-md rounded-xl flex flex-col sm:px-8"}>
                        <div className={"pb-6 text-center text-2xl text-gray-500"}>
                            Contact Information
                        </div>
                        <div className={"flex flex-col md:flex-row gap-8"}>
                            <div className={"flex flex-col items-start w-full md:w-5/12 gap-8"}>
                                <div className={`relative h-11 w-full md:w-60`}>
                                    <input
                                        id={"name"}
                                        autoComplete={"name"}
                                        onMouseEnter={() => setNameInputHover(true)}
                                        onMouseLeave={() => setNameInputHover(false)}
                                        onFocus={() => setNameInputActive(true)}
                                        // onBlur={() => discountCode.length === 0 && setDiscountLabelActive(false)}
                                        onBlur={() => name.length === 0 && setNameInputActive(false)}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter name"
                                        className={`${!nameInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${nameError ? "!border-b-2 !border-b-red-600" : ""}`}/>
                                    <label
                                        htmlFor={"name"}
                                        className={`${nameInputHover ? "text-gray-700" : "text-gray-500"} after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
                                        {nameInputActive ? "Full Name" : "Full Name"}
                                    </label>
                                    {
                                        nameError && (
                                            <div className={"text-red-500 leading-tight font-semibold text-sm"}>
                                                Please enter your name
                                            </div>
                                        )
                                    }

                                </div>
                                <div className={`relative h-11 w-full md:w-60`}>
                                    <input
                                        id={"email"}
                                        autoComplete={"email"}
                                        onMouseEnter={() => setEmailInputHover(true)}
                                        onMouseLeave={() => setEmailInputHover(false)}
                                        onFocus={() => setEmailInputActive(true)}
                                        // onBlur={() => discountCode.length === 0 && setDiscountLabelActive(false)}
                                        onBlur={() => email.length === 0 && setEmailInputActive(false)}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                        className={`${!emailInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${emailError ? "!border-b-2 !border-b-red-600" : ""}`}/>
                                    <label
                                        htmlFor={"email"}
                                        className={`${emailInputHover ? "text-gray-700" : "text-gray-500"} after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
                                        {emailInputActive ? "Email Address" : "Email Address"}
                                    </label>
                                    {
                                        emailError && (
                                            <div className={"text-red-500 leading-tight font-semibold text-sm"}>
                                                Please enter a valid email
                                            </div>
                                        )
                                    }
                                </div>
                                <div className={`relative h-11 w-full md:w-60`}>
                                    <input
                                        id={"tel"}
                                        type={"tel"}
                                        onMouseEnter={() => setPhoneInputHover(true)}
                                        onMouseLeave={() => setPhoneInputHover(false)}
                                        onFocus={() => setPhoneInputActive(true)}
                                        onBlur={() => phone.length === 0 && setPhoneInputActive(false)}
                                        value={phone}
                                        autoComplete={"tel"}
                                        maxLength={12}
                                        onChange={setFormatPhone}
                                        placeholder="Enter phone number"
                                        className={`${!phoneInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${phoneError ? "!border-b-2 !border-b-red-600" : ""}`}/>
                                    <label
                                        htmlFor={"tel"}
                                        className={`${phoneInputHover ? "text-gray-700" : "text-gray-500"} after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
                                        {phoneInputActive ? "Phone Number" : "Phone Number"}
                                    </label>
                                    {
                                        phoneError && (
                                            <div className={"text-red-500 leading-tight font-semibold text-sm"}>
                                                Please enter a 10 digit phone number
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                            <div className={"w-full h-full md:w-7/12 flex-col"}>
                                <div className={`relative`}>
                                    <textarea
                                        id={"message"}
                                        rows={4}
                                        onMouseEnter={() => setMessageInputHover(true)}
                                        onMouseLeave={() => setMessageInputHover(false)}
                                        onFocus={() => setMessageInputActive(true)}
                                        // onBlur={() => discountCode.length === 0 && setDiscountLabelActive(false)}
                                        onBlur={() => message.length === 0 && setMessageInputActive(false)}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Enter message"
                                        className={`${!messageInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer  w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 h-full ${messageError ? "!border-b-2 !border-b-red-600" : ""}`}
                                    />
                                    <label
                                        htmlFor={"message"}
                                        className={`${messageInputHover ? "text-gray-700" : "text-gray-500"} after:content[''] pointer-events-none absolute left-0 -top-[11px] flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
                                        {messageInputActive ? "Your Message" : "Your Message"}
                                    </label>
                                </div>
                                {
                                    messageError && (
                                        <div className={"text-red-500 leading-tight font-semibold text-sm"}>
                                            Please enter a message
                                        </div>
                                    )
                                }
                                <div className={"pt-6 pb-8 flex justify-end items-center md:items-end md:pb-0"}>
                                    <div className={"pr-2 flex-grow items-center md:hidden"}>
                                        {
                                            resSuccess && (
                                                <span className={"text-sm"}>Thank you for your message! We will get back to you as soon as possible.</span>
                                            )
                                        }
                                        {
                                            resError && (
                                                <p className={"text-sm text-red-500 !leading-tight"}>Sorry, something went
                                                    wrong please try again later.</p>
                                            )
                                        }
                                    </div>
                                    <button onClick={submitMessage} disabled={btnLoading}
                                            className={`${!btnLoading && !resSuccess && !resError ? "hover:bg-susy" : "opacity-60 cursor-not-allowed"} bg-susy text-white button py-2 px-4 rounded`}>
                                        <div className={"flex items-center"}>
                                            <span>{btnMessage}</span>
                                            {
                                                btnLoading && (
                                                    <span className={"ml-[6px] loading"}/>
                                                )
                                            }
                                        </div>
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className={"hidden md:flex justify-center items-center h-8 my-3"}>
                        {
                            resSuccess && (
                                    <span>Thank you for your message! We will get back to you as soon as possible.</span>
                                )
                            }
                            {
                                resError && (
                                    <span className={"text-red-500"}>Sorry, something went wrong please try again later.</span>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;