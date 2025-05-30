// "use client"
//
// import {useCallback, useEffect, useState} from "react";
// import {TiPhone} from "react-icons/ti";
// import * as emailjs from "@emailjs/browser";
// import {isValidEmail, isValidName, phoneNumberAutoFormat} from "@/utils/validation";
//
// const ContactSection2 = () => {
//
//     const [validating, setValidating] = useState(false);
//     const [btnMessage, setBtnMessage] = useState("Submit");
//
//     const [email, setEmail] = useState("");
//     const [emailInputHover, setEmailInputHover] = useState(false);
//     const [emailInputActive, setEmailInputActive] = useState(false);
//     const [emailError, setEmailError] = useState(false);
//
//     const [phone, setPhone] = useState("");
//     const [phoneInputHover, setPhoneInputHover] = useState(false);
//     const [phoneInputActive, setPhoneInputActive] = useState(false);
//     const [phoneError, setPhoneError] = useState(false);
//
//     const [name, setName] = useState("");
//     const [nameInputHover, setNameInputHover] = useState(false);
//     const [nameInputActive, setNameInputActive] = useState(false);
//     const [nameError, setNameError] = useState(false);
//
//     const [lastName, setLastName] = useState("");
//     const [lastNameInputHover, setLastNameInputHover] = useState(false);
//     const [lastNameInputActive, setLastNameInputActive] = useState(false);
//     const [lastNameError, setLastNameError] = useState(false);
//
//     const [message, setMessage] = useState("");
//     const [messageInputHover, setMessageInputHover] = useState(false);
//     const [messageInputActive, setMessageInputActive] = useState(false);
//     const [messageError, setMessageError] = useState(false);
//
//     const [btnLoading, setBtnLoading] = useState(false);
//     const [resSuccess, setResSuccess] = useState(false);
//     const [resError,  setResError] = useState(false);
//
//     const is10Characters = (str) => {
//         str = str.trim();
//         if (str.length < 10) return false;
//         return true;
//     };
//
//     const validateEmailCallback = useCallback((str) => {
//         if (!isValidEmail(str)) {
//             setEmailError(true);
//         } else {
//             setEmailError(false);
//         }
//     }, []);
//     const validateNameCallback = useCallback((str) => {
//         if (!isValidName(str)) {
//             setNameError(true);
//         } else {
//             setNameError(false);
//         }
//     }, []);
//     const validateLastNameCallback = useCallback((str) => {
//         if (!isValidName(str)) {
//             setLastNameError(true);
//         } else {
//             setLastNameError(false);
//         }
//     }, []);
//     const validateMessage = useCallback((str) => {
//         if (!is10Characters(str)) {
//             setMessageError(true);
//         } else {
//             setMessageError(false);
//         }
//     }, []);
//     const validatePhone = useCallback((str) => {
//         if (str.length !== 12) {
//             setPhoneError(true);
//         } else {
//             setPhoneError(false);
//         }
//     }, []);
//     useEffect(() => {
//         if (validating) {
//             validateEmailCallback(email);
//             validateNameCallback(name);
//             validateLastNameCallback(lastName);
//             validatePhone(phone);
//             validateMessage(message);
//         }
//     }, [validating, validateEmailCallback, validatePhone, validateNameCallback, validateLastNameCallback, validateMessage, name, lastName, email, phone, message]);
//     // const sendEmailToClient = async () => {
//     //     try {
//     //         await emailjs.send(`${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`, `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_2}`, {from_name: name, from_email: email}, `${process.env.NEXT_PUBLIC_EMAILJS_KEY}`);
//     //     } catch (e) {
//     //         console.log(e);
//     //     }
//     // };
//     const sendEmailToAdmin = async (contactMessage) => {
//         try {
//             const res = await emailjs.send(`${process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID}`, `${process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID}`, {from_name: `${name} ${lastName}`, from_email: email, from_phone: phone, message: message, res_message: contactMessage}, `${process.env.NEXT_PUBLIC_EMAILJS_KEY}`);
//             return res.status === 200;
//         } catch {
//             return false;
//         }
//     };
//     const submitContact = async (data) => {
//         const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/servicefusion/customers/create`, {
//             method: "POST",
//             body: JSON.stringify(data),
//         });
//         if (!res.ok) {
//             return "Error: Service Fusion connection failed.";
//         }
//         const resObj = await res.json();
//         return resObj.message;
//     };
//     // const delay = ms => new Promise(resolve => setTimeout(resolve, ms));
//     const submitMessage = async () => {
//         setBtnLoading(true);
//         if (!isValidName(name) || !isValidName(lastName) || !isValidEmail(email) || !is10Characters(message) || phone.length !== 12) {
//             setValidating(true);
//             setBtnLoading(false);
//         } else {
//             setBtnMessage("Sending");
//             // let res;
//             // await delay(3000);
//             // setBtnMessage("Sending...");
//             // await delay(3000);
//             // res = true;
//             const contactMessage = await submitContact({name, lastName, email, phone});
//             setBtnMessage("Sending...");
//             const res = await sendEmailToAdmin(contactMessage);
//             if (res) {
//                 setBtnLoading(false);
//                 setResError(false);
//                 setResSuccess(true);
//                 setValidating(false);
//                 setName("");
//                 setLastName("");
//                 setMessage("");
//                 setPhone("");
//                 setEmail("");
//                 setBtnMessage("Submit");
//                 // await sendEmailToClient();
//             } else {
//                 setBtnLoading(false);
//                 setResSuccess(false);
//                 setResError(true);
//                 setValidating(false);
//                 setTimeout(() => {
//                     setBtnMessage("Submit");
//                     setResError(false);
//                 }, 4000);
//             }
//         }
//     };
//     const setFormatPhone = (e) => {
//         const val = phoneNumberAutoFormat(e.target.value);
//         setPhone(val);
//     };
//
//     return (
//         <section className={"py-14 w-full bg-zinc-100"}>
//             <div className={"max-w-screen-xl mx-auto px-4 lg:px-8 flex flex-col items-center"}>
//                 <div className={"flex flex-col justify-center pb-8"}>
//                     <h1 className={"text-center text-5xl uppercase font-light text-gray-500"}>Contact Us</h1>
//                     <h4 className={"pt-5 text-center text-2xl font-light text-gray-500"}>
//                         Have a question or concern? Send us a message or give us a call. We&apos;d love to hear from
//                         you.
//                     </h4>
//                     <div className={"pt-3 flex justify-center"}>
//                         <div className={"text-lg text-gray-500 flex items-center justify-between"}>
//                             <TiPhone size={25}/>
//                             <a href={"tel:512-640-6264"} className={"text-susy underline"}>(512) 640-6264</a>
//                         </div>
//                     </div>
//                 </div>
//                 <div className={"py-5 w-full flex justify-center"}>
//                     <div className={"pt-8 pb-8 px-4 w-full lg:w-8/12 bg-white shadow-md rounded-xl flex flex-col sm:px-8 md:pb-5"}>
//
//                         {
//                             resSuccess ? (
//                                 <div className={"flex flex-col justify-center items-center gap-8 pb-3"}>
//                                     <h1 className={"text-center text-3xl leading-relaxed text-gray-500"}>
//                                         Thank you for your message. An expert representative will get in touch with you as soon as possible.
//                                     </h1>
//                                     <button onClick={()=> setResSuccess(false)} className={"bg-susy text-white button py-2 px-4 rounded"}>
//                                         Send another message
//                                     </button>
//                                 </div>
//                             ) : (
//                                 <>
//                                     <div className={"pb-6 text-center text-2xl text-gray-500"}>
//                                         Get in touch with us.
//                                     </div>
//                                     <div className={"flex flex-col md:flex-row gap-8"}>
//                                         <div className={"flex flex-col items-start w-full md:w-5/12 gap-8"}>
//                                             <div className={`relative h-11 w-full md:w-60`}>
//                                                 <input
//                                                     id={"firstName"}
//                                                     autoComplete={"given name"}
//                                                     onMouseEnter={() => setNameInputHover(true)}
//                                                     onMouseLeave={() => setNameInputHover(false)}
//                                                     onFocus={() => setNameInputActive(true)}
//                                                     // onBlur={() => discountCode.length === 0 && setDiscountLabelActive(false)}
//                                                     onBlur={() => name.length === 0 && setNameInputActive(false)}
//                                                     value={name}
//                                                     onChange={(e) => setName(e.target.value)}
//                                                     placeholder="Enter name"
//                                                     className={`${!nameInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${nameError ? "!border-b-2 !border-b-red-600" : ""}`}
//                                                 />
//                                                 <label
//                                                     htmlFor={"firstName"}
//                                                     className={`${nameInputHover ? "text-gray-700" : "text-gray-500"} after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
//                                                     {nameInputActive ? "First Name" : "First Name"}
//                                                 </label>
//                                                 {
//                                                     nameError && (
//                                                         <div className={"text-red-500 leading-tight font-semibold text-sm"}>
//                                                             Please enter a valid name
//                                                         </div>
//                                                     )
//                                                 }
//
//                                             </div>
//                                             <div className={`relative h-11 w-full md:w-60`}>
//                                                 <input
//                                                     id={"lastName"}
//                                                     autoComplete={"family name"}
//                                                     onMouseEnter={() => setLastNameInputHover(true)}
//                                                     onMouseLeave={() => setLastNameInputHover(false)}
//                                                     onFocus={() => setLastNameInputActive(true)}
//                                                     // onBlur={() => discountCode.length === 0 && setDiscountLabelActive(false)}
//                                                     onBlur={() => lastName.length === 0 && setLastNameInputActive(false)}
//                                                     value={lastName}
//                                                     onChange={(e) => setLastName(e.target.value)}
//                                                     placeholder="Enter name"
//                                                     className={`${!lastNameInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${lastNameError ? "!border-b-2 !border-b-red-600" : ""}`}
//                                                 />
//                                                 <label
//                                                     htmlFor={"lastName"}
//                                                     className={`${lastNameInputHover ? "text-gray-700" : "text-gray-500"} after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
//                                                     {lastNameInputActive ? "Last Name" : "Last Name"}
//                                                 </label>
//                                                 {
//                                                     lastNameError && (
//                                                         <div className={"text-red-500 leading-tight font-semibold text-sm"}>
//                                                             Please enter a valid name
//                                                         </div>
//                                                     )
//                                                 }
//
//                                             </div>
//                                             <div className={`relative h-11 w-full md:w-60`}>
//                                                 <input
//                                                     id={"email"}
//                                                     autoComplete={"email"}
//                                                     onMouseEnter={() => setEmailInputHover(true)}
//                                                     onMouseLeave={() => setEmailInputHover(false)}
//                                                     onFocus={() => setEmailInputActive(true)}
//                                                     // onBlur={() => discountCode.length === 0 && setDiscountLabelActive(false)}
//                                                     onBlur={() => email.length === 0 && setEmailInputActive(false)}
//                                                     value={email}
//                                                     onChange={(e) => setEmail(e.target.value)}
//                                                     placeholder="Enter email"
//                                                     className={`${!emailInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${emailError ? "!border-b-2 !border-b-red-600" : ""}`}/>
//                                                 <label
//                                                     htmlFor={"email"}
//                                                     className={`${emailInputHover ? "text-gray-700" : "text-gray-500"} after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
//                                                     {emailInputActive ? "Email Address" : "Email Address"}
//                                                 </label>
//                                                 {
//                                                     emailError && (
//                                                         <div className={"text-red-500 leading-tight font-semibold text-sm"}>
//                                                             Please enter a valid email
//                                                         </div>
//                                                     )
//                                                 }
//                                             </div>
//                                             {/*<div className={`relative h-11 w-full md:w-60`}>*/}
//                                             {/*    <input*/}
//                                             {/*        id={"tel"}*/}
//                                             {/*        type={"tel"}*/}
//                                             {/*        onMouseEnter={() => setPhoneInputHover(true)}*/}
//                                             {/*        onMouseLeave={() => setPhoneInputHover(false)}*/}
//                                             {/*        onFocus={() => setPhoneInputActive(true)}*/}
//                                             {/*        onBlur={() => phone.length === 0 && setPhoneInputActive(false)}*/}
//                                             {/*        value={phone}*/}
//                                             {/*        autoComplete={"tel"}*/}
//                                             {/*        maxLength={12}*/}
//                                             {/*        onChange={setFormatPhone}*/}
//                                             {/*        placeholder="Enter phone number"*/}
//                                             {/*        className={`${!phoneInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${phoneError ? "!border-b-2 !border-b-red-600" : ""}`}/>*/}
//                                             {/*    <label*/}
//                                             {/*        htmlFor={"tel"}*/}
//                                             {/*        className={`${phoneInputHover ? "text-gray-700" : "text-gray-500"} after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>*/}
//                                             {/*        {phoneInputActive ? "Phone Number" : "Phone Number"}*/}
//                                             {/*    </label>*/}
//                                             {/*    {*/}
//                                             {/*        phoneError && (*/}
//                                             {/*            <div className={"text-red-500 leading-tight font-semibold text-sm"}>*/}
//                                             {/*                Please enter a 10 digit phone number*/}
//                                             {/*            </div>*/}
//                                             {/*        )*/}
//                                             {/*    }*/}
//                                             {/*</div>*/}
//                                         </div>
//                                         <div className={"w-full h-full md:w-7/12 flex flex-col justify-between"}>
//                                             <div className={`relative h-11 w-full mb-8`}>
//                                                 <input
//                                                     id={"tel"}
//                                                     type={"tel"}
//                                                     onMouseEnter={() => setPhoneInputHover(true)}
//                                                     onMouseLeave={() => setPhoneInputHover(false)}
//                                                     onFocus={() => setPhoneInputActive(true)}
//                                                     onBlur={() => phone.length === 0 && setPhoneInputActive(false)}
//                                                     value={phone}
//                                                     autoComplete={"tel"}
//                                                     maxLength={12}
//                                                     onChange={setFormatPhone}
//                                                     placeholder="Enter phone number"
//                                                     className={`${!phoneInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer h-full w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 ${phoneError ? "!border-b-2 !border-b-red-600" : ""}`}/>
//                                                 <label
//                                                     htmlFor={"tel"}
//                                                     className={`${phoneInputHover ? "text-gray-700" : "text-gray-500"} after:content[''] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:-bottom-1.5 after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
//                                                     {phoneInputActive ? "Phone Number" : "Phone Number"}
//                                                 </label>
//                                                 {
//                                                     phoneError && (
//                                                         <div className={"text-red-500 leading-tight font-semibold text-sm"}>
//                                                             Please enter a 10 digit phone number
//                                                         </div>
//                                                     )
//                                                 }
//                                             </div>
//                                             <div className={`relative h-36 flex flex-col`}>
//                                                 <textarea
//                                                     id={"message"}
//                                                     rows={3}
//                                                     onMouseEnter={() => setMessageInputHover(true)}
//                                                     onMouseLeave={() => setMessageInputHover(false)}
//                                                     onFocus={() => setMessageInputActive(true)}
//                                                     // onBlur={() => discountCode.length === 0 && setDiscountLabelActive(false)}
//                                                     onBlur={() => message.length === 0 && setMessageInputActive(false)}
//                                                     value={message}
//                                                     onChange={(e) => setMessage(e.target.value)}
//                                                     placeholder="Enter message"
//                                                     className={`${!messageInputActive ? "cursor-pointer" : ""} text-[16px] lg:text-base peer w-full rounded-none border-b border-gray-300 hover:border-gray-400 bg-transparent pt-4 pb-1.5 font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border-blue-gray-200 placeholder-shown:text-[16px] focus:border-cyan-600 focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50 placeholder:opacity-0 focus:placeholder:opacity-100 h-28 ${messageError ? "!border-b-2 !border-b-red-600" : ""}`}
//                                                 />
//                                                 <label
//                                                     htmlFor={"message"}
//                                                     className={`${messageInputHover ? "text-gray-700" : "text-gray-500"} after:-bottom-1.5 after:content[''] pointer-events-none absolute left-0 -top-[6px] flex h-28 w-full select-none !overflow-visible truncate text-[11px] font-normal leading-tight transition-all after:absolute after:block after:w-full after:scale-x-0 after:border-b-2 after:border-cyan-600 after:transition-transform after:duration-300 peer-placeholder-shown:text-[16px] peer-placeholder-shown:leading-[4.25] peer-placeholder-shown:text-blue-gray-500 peer-focus:text-[12px] peer-focus:leading-tight peer-focus:text-cyan-600 peer-focus:after:scale-x-100 peer-focus:after:border-cyan-600 peer-disabled:text-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500`}>
//                                                     {messageInputActive ? "Your Message" : "Your Message"}
//                                                 </label>
//                                                 {
//                                                     messageError && (
//                                                         <div className={"text-red-500 leading-tight font-semibold text-sm"}>
//                                                             Please enter at least 10 characters
//                                                         </div>
//                                                     )
//                                                 }
//                                             </div>
//                                             <div className={"flex justify-end items-center md:items-end"}>
//                                                 <div className={"pr-2 flex-grow items-center md:hidden"}>
//                                                     {
//                                                         resError && (
//                                                             <p className={"text-sm text-red-500 !leading-tight text-center"}>Sorry,
//                                                                 something went
//                                                                 wrong please try again later.</p>
//                                                         )
//                                                     }
//                                                 </div>
//                                                 <button onClick={submitMessage} disabled={btnLoading}
//                                                         className={`${!btnLoading && !resSuccess && !resError ? "hover:bg-susy" : "opacity-60 cursor-not-allowed"} bg-susy text-white button py-2 px-4 rounded`}>
//                                                     <div className={"flex items-center"}>
//                                                         <span>{btnMessage}</span>
//                                                         {
//                                                             btnLoading && (
//                                                                 <span className={"ml-[6px] loading"}/>
//                                                             )
//                                                         }
//                                                     </div>
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className={"hidden md:flex justify-center items-end h-4"}>
//                                         {
//                                             resError && (
//                                                 <span className={"text-red-500"}>Sorry, something went wrong please try again later.</span>
//                                             )
//                                         }
//                                     </div>
//                                 </>
//                             )
//                         }
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// };
//
// export default ContactSection2;