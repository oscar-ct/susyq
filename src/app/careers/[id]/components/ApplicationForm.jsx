"use client"

import {useState} from "react";
import {phoneNumberAutoFormat, isValidEmail} from "@/utils/validation";
import * as emailjs from "@emailjs/browser";

const ApplicationForm = ( { title, lang = 'en' } ) => {
    const [loading, setLoading] = useState(false);
    const [applicationHasSubmit, setApplicationHasSubmit] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        resume: null,
    });

    const [errors, setErrors] = useState({
        name: false,
        email: false,
        phone: false,
        resume: false,
        api: false,
    });

    const validateInput = (name, value) => {
        switch (name) {
            case "name":
                return value.trim().length > 0;
            case "email":
                return isValidEmail(value);
            case "phone":
                return /^\d{10}$/.test(value.replace(/\D/g, "")); // Accepts 10-digit phone numbers
            case "resume":
                if (!value) return true;
                const validTypes = ["application/pdf", "application/msword", "application/vnd.openxmlformats-officedocument.wordprocessingml.document"];
                return value instanceof File && validTypes.includes(value.type);
            default:
                return true;
        }
    };

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        if (name === "resume") {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else if (name === "phone") {
            const val = phoneNumberAutoFormat(value); // auto-format phone number
            setFormData((prev) => ({ ...prev, [name]: val }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
        setErrors((prev) => ({
            ...prev,
            [name]: !validateInput(name, name === "resume" ? files[0] : value),
        }));
    };

    const handleBlur = (e) => {
        const { name, files } = e.target;
        setErrors((prev) => ({
            ...prev,
            [name]: !validateInput(name, name === "resume" ? files[0] : formData[name]),
        }));
    };

    const submitEmailToAPI = async () => {
        const emailData = {
            title: title,
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
        }
        try {
            const res = await emailjs.send(
                process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
                process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID_2,
                emailData,
                process.env.NEXT_PUBLIC_EMAILJS_KEY);
            // console.log("EmailJS Response:", res);
            return res.status === 200;
        } catch (error) {
            // console.error("EmailJS Error:", error);
            return false;
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = {
            name: !validateInput("name", formData.name),
            email: !validateInput("email", formData.email),
            phone: !validateInput("phone", formData.phone),
            resume: !validateInput("resume", formData.resume),
            api: false,
        };
        setErrors(newErrors);
        if (!Object.values(newErrors).some(Boolean)) {
            setLoading(true);
            console.log("Form submitted:", formData);
            const apiResponse = await submitEmailToAPI();
            if (!apiResponse) {
                setErrors((prev) => {
                    return {
                        ...prev,
                        api: true,
                    };
                });
                setLoading(false);
                return;
            }
            setApplicationHasSubmit(true);
            setLoading(false);
            setFormData({
                name: "",
                email: "",
                phone: "",
                resume: null,
            })
        }
    };

    const text = lang === 'es' ? {
        title: "Aplica Ahora",
        nameLabel: "Nombre Completo*",
        namePlaceholder: "Ingresa tu nombre completo",
        nameError: "Por favor, ingresa un nombre válido.",
        emailLabel: "Correo Electrónico*",
        emailPlaceholder: "Ingresa tu correo electrónico",
        emailError: "Por favor, ingresa una dirección de correo electrónico válida.",
        phoneLabel: "Teléfono*",
        phonePlaceholder: "Ingresa tu número de teléfono",
        phoneError: "Por favor, ingresa un número de teléfono válido de 10 dígitos.",
        resumeLabel: "Adjunto de Currículum (PDF o Word Doc)",
        resumeError: "Por favor, sube un documento válido en PDF o Word.",
        resumeSuccess: "ha sido subido exitosamente.",
        submitButton: "Enviar Solicitud",
        submittingButton: "Enviando Solicitud",
        apiError: "Algo salió mal, por favor intenta de nuevo más tarde.",
        thankYou: "Gracias por enviar tu solicitud. Nuestro equipo revisará tus detalles pronto y se pondrá en contacto contigo lo antes posible."
    } : {
        title: "Apply Now",
        nameLabel: "Full Name*",
        namePlaceholder: "Enter your full name",
        nameError: "Please enter a valid name.",
        emailLabel: "Email*",
        emailPlaceholder: "Enter your email",
        emailError: "Please enter a valid email address.",
        phoneLabel: "Phone*",
        phonePlaceholder: "Enter your phone number",
        phoneError: "Please enter a valid 10-digit phone number.",
        resumeLabel: "Resume Attachment (PDF or Word Doc)",
        resumeError: "Please upload a valid PDF or Word document.",
        resumeSuccess: "uploaded successfully.",
        submitButton: "Submit Application",
        submittingButton: "Submitting Application",
        apiError: "Something went wrong, please try again later.",
        thankYou: "Thank you for submitting your application. Our team will review your details shortly and reach out to you as soon as possible."
    };

    return (
        <div className="bg-gray-100 p-6 shadow-md rounded-lg w-full mx-auto sm:w-96 md:p-8">
            {applicationHasSubmit ? (
                <h1 className="text-center text-xl leading-relaxed text-gray-800">
                    {text.thankYou}
                </h1>
            ) : (
                <form onSubmit={handleSubmit} encType="multipart/form-data">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">{text.title}</h2>
                    <div className="mb-4 relative">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            {text.nameLabel}
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={text.namePlaceholder}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                                errors.name ? "border-red-500" : "hover:border-gray-400"
                            }`}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{text.nameError}</p>
                        )}
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            {text.emailLabel}
                        </label>
                        <input
                            id="email"
                            name="email"
                            type="email"
                            autoComplete="email"
                            value={formData.email}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={text.emailPlaceholder}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                                errors.email ? "border-red-500" : "hover:border-gray-400"
                            }`}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{text.emailError}</p>
                        )}
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                            {text.phoneLabel}
                        </label>
                        <input
                            id="phone"
                            name="phone"
                            type="tel"
                            autoComplete="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            onBlur={handleBlur}
                            placeholder={text.phonePlaceholder}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                                errors.phone ? "border-red-500" : "hover:border-gray-400"
                            }`}
                        />
                        {errors.phone && (
                            <p className="text-red-500 text-sm mt-1">{text.phoneError}</p>
                        )}
                    </div>
                    <div className="mb-4 relative">
                        <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">
                            {text.resumeLabel}
                        </label>
                        <input
                            id="resume"
                            name="resume"
                            type="file"
                            accept=".pdf,.doc,.docx"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            className={`w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent ${
                                errors.resume ? "border-red-500" : "hover:border-gray-400"
                            }`}
                        />
                        {errors.resume && (
                            <p className="text-red-500 text-sm mt-1">{text.resumeError}</p>
                        )}
                        {formData.resume && !errors.resume && (
                            <p className="text-green-500 text-sm mt-1">
                                {formData.resume.name} {text.resumeSuccess}
                            </p>
                        )}
                    </div>
                    <button
                        type="submit"
                        disabled={loading}
                        className={`${!loading ? "hover:bg-cyan-700" : "opacity-60 cursor-not-allowed"} w-full bg-susy text-white button py-2 px-4 rounded`}
                    >
                        <div className="flex justify-center items-center">
                            <span>{loading ? text.submittingButton : text.submitButton}</span>
                            {loading && <span className="ml-[6px] loading" />}
                        </div>
                    </button>
                    {errors.api && (
                        <p className="text-center text-red-500 text-sm mt-1">{text.apiError}</p>
                    )}
                </form>
            )}
        </div>
    );
};

export default ApplicationForm;