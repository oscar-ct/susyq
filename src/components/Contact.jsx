"use client"

import {useState} from "react";
import {TiLeaf, TiPhone, TiLocationOutline} from "react-icons/ti";
import CustomButton from "@/components/CustomButton";

const Contact = () => {

    const [email, setEmail] = useState("");
    const [emailInputHover, setEmailInputHover] = useState(false);
    const [emailInputActive, setEmailInputActive] = useState(false);

    const [phone, setPhone] = useState("");
    const [phoneInputHover, setPhoneInputHover] = useState(false);
    const [phoneInputActive, setPhoneInputActive] = useState(false);

    const [name, setName] = useState("");
    const [nameInputHover, setNameInputHover] = useState(false);
    const [nameInputActive, setNameInputActive] = useState(false);

    const [message, setMessage] = useState("");
    const [messageInputHover, setMessageInputHover] = useState(false);
    const [messageInputActive, setMessageInputActive] = useState(false);
    return (
        <section className={"py-14 w-full bg-zinc-100"}>
            <div className={"max-w-screen-xl mx-auto px-4 lg:px-8 flex flex-col items-center"}>
                <div className={"flex flex-col justify-center pb-8"}>
                    <span className={"text-center text-5xl uppercase font-light text-gray-500"}>Contact Us</span>
                </div>

                <div className={"w-full flex flex-col lg:flex-row gap-8"}>


                    <div className={"p-8 w-full lg:w-4/12 bg-white rounded-xl shadow-xl flex flex-col"}>
                        <div className={"pb-14 text-2xl text-gray-500 font-light flex justify-center"}>
                            Susy Q Cleaning <TiLeaf className={"rotate-12 text-lime-400"}/>
                        </div>
                        <div className={"flex flex-col gap-4"}>
                            <div className={"text-xl text-gray-500 flex items-center justify-between"}>
                                <TiLocationOutline size={25}/>
                                <span className={"w-10/12"}>7703 N Lamar Blvd, Ste 119 Austin, Tx 78752</span>
                            </div>
                            <div className={"text-xl text-gray-500 flex items-center justify-between"}>
                                <TiPhone size={25}/>
                                <span className={"w-10/12"}>(512) 640-6264</span>
                            </div>
                        </div>
                    </div>

                    <div className={"p-8 w-full lg:w-8/12 bg-white rounded-xl shadow-xl flex flex-col"}>
                        <div className={"pb-10 text-center text-2xl text-gray-500"}>
                            Have a question or concern? Send us a message!
                        </div>
                        <div className={"flex flex-col md:flex-row gap-8"}>
                            <div className={"flex flex-col items-start w-full md:w-5/12 gap-8"}>
                                <div className={`relative h-11 w-full md:w-60`}>
                                    <input
                                        id={"name"}
                                        onMouseEnter={() => setNameInputHover(true)}
                                        onMouseLeave={() => setNameInputHover(false)}
                                        onFocus={() => setNameInputActive(true)}
                                        // onBlur={() => discountCode.length === 0 && setDiscountLabelActive(false)}
                                        onBlur={() => name.length === 0 && setNameInputActive(false)}
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        placeholder="Enter name"
                                        className={`${!nameInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100`}/>
                                    <label
                                        htmlFor={"name"}
                                        className={`${nameInputHover ? "text-gray-700" : "text-gray-500"} after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
                                        {nameInputActive ? "Name" : "Enter name"}
                                    </label>
                                </div>
                                <div className={`relative h-11 w-full md:w-60`}>
                                    <input
                                        id={"email"}
                                        onMouseEnter={() => setEmailInputHover(true)}
                                        onMouseLeave={() => setEmailInputHover(false)}
                                        onFocus={() => setEmailInputActive(true)}
                                        // onBlur={() => discountCode.length === 0 && setDiscountLabelActive(false)}
                                        onBlur={() => email.length === 0 && setEmailInputActive(false)}
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        placeholder="Enter email"
                                        className={`${!emailInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100`}/>
                                    <label
                                        htmlFor={"email"}
                                        className={`${emailInputHover ? "text-gray-700" : "text-gray-500"} after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
                                        {emailInputActive ? "Email" : "Enter email"}
                                    </label>
                                </div>
                                <div className={`relative h-11 w-full md:w-60`}>
                                    <input
                                        id={"tel"}
                                        onMouseEnter={() => setPhoneInputHover(true)}
                                        onMouseLeave={() => setPhoneInputHover(false)}
                                        onFocus={() => setPhoneInputActive(true)}
                                        onBlur={() => phone.length === 0 && setPhoneInputActive(false)}
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        placeholder="Enter phone"
                                        className={`${!phoneInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100`}/>
                                    <label
                                        htmlFor={"tel"}
                                        className={`${phoneInputHover ? "text-gray-700" : "text-gray-500"} after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
                                        {phoneInputActive ? "Phone" : "Enter phone"}
                                    </label>
                                </div>
                            </div>

                            <div className={"w-full h-full md:w-7/12 flex-col"}>
                                <div className={`relative`}>
                                    <textarea
                                        rows={4}
                                        cols={20}
                                        id={"message"}
                                        onMouseEnter={() => setMessageInputHover(true)}
                                        onMouseLeave={() => setMessageInputHover(false)}
                                        onFocus={() => setMessageInputActive(true)}
                                        // onBlur={() => discountCode.length === 0 && setDiscountLabelActive(false)}
                                        onBlur={() => message.length === 0 && setMessageInputActive(false)}
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        placeholder="Enter message"
                                        className={`${!messageInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer  w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 h-full`}
                                    />
                                    <label
                                        htmlFor={"message"}
                                        className={`${messageInputHover ? "text-gray-700" : "text-gray-500"} after:content[''] pointer-events-none absolute left-0 -top-[11px] flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
                                        {messageInputActive ? "Message" : "Enter message"}
                                    </label>
                                </div>
                                <div className={"pt-6 flex justify-end items-end"}>
                                   <CustomButton>
                                       Send
                                   </CustomButton>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </section>
    );
};

export default Contact;