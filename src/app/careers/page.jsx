import {MdOutlineCleaningServices} from "react-icons/md";
import {TiHomeOutline, TiPhoneOutline} from "react-icons/ti";
import Link from "next/link";
import {jobs} from "@/utils/jobsList";
import LangToggle from "@/app/careers/[id]/components/LangToggle";

export const metadata = {
    title: "Careers - Susy Q Cleaning",
    description: "Join our team at Susy Q Cleaning in Austin! Become part of a green cleaning company making homes healthier. Competitive pay and growth opportunities. Apply now!",
    alternates: {
        canonical: "https://susyqcleaning.com/careers",
    },
    openGraph: {
        title: "Careers - Susy Q Cleaning",
        description: "Join our team at Susy Q Cleaning in Austin! Become part of a green cleaning company making homes healthier. Competitive pay and growth opportunities. Apply now!",
        images: [{ url: "/opengraph-image-careers.png", width: 300, height: 282, alt: "susy q cleaning careers" }],
    },
    twitter: {
        title: "Careers - Susy Q Cleaning",
        description: "Join our team at Susy Q Cleaning in Austin! Become part of a green cleaning company making homes healthier. Competitive pay and growth opportunities. Apply now!",
        images: ["/opengraph-image-careers.png"],
    },
};

const CareersPage = ({ searchParams }) => {

    const lang = searchParams.lang === 'es' ? 'es' : 'en';
    const langSuffix = lang === 'es' ? '_es' : '';

    return (
        <section className={"relative w-full mx-auto pb-6 px-4 lg:px-8 max-w-screen-xl"}>
            <div className={"flex flex-col gap-2 pt-10 sm:pt-20"}>
                <h1 className={"text-center text-5xl uppercase font-light text-gray-500"}>
                    {lang === 'es' ? 'Carreras' : 'Careers'}
                </h1>
                <h4 className={"text-center text-2xl font-light text-gray-500"}>
                    {lang === 'es' ? 'Únete a nuestro equipo de limpieza en Austin hoy' : 'Join Our Cleaning Team in Austin Today'}
                </h4>
            </div>
            <div className={"w-full flex justify-center py-6 md:justify-end"}>
                <LangToggle lang={lang}/>
            </div>
            <div className={"flex flex-col gap-6 md:grid md:grid-cols-2"}>
                {
                    jobs.map((job,) => {
                        return (
                            <Link
                                className={"cursor-pointer bg-stone-100 border border-stone-200 rounded p-5 w-full h-full flex flex-col gap-2 hover:bg-stone-200"}
                                key={job.id}
                                href={`/careers/${job.id}${lang === 'es' ? '?lang=es' : ''}`}
                            >
                                <div className={"flex gap-3"}>
                                    <div className={"flex items-center justify-center text-susy"}>
                                        {
                                            job.type === "admin" ? <TiPhoneOutline size={50}/>
                                                : job.type === "cleaner" ? <MdOutlineCleaningServices size={50}/>
                                                    : <TiHomeOutline size={50}/>
                                        }
                                    </div>
                                    <div className={"flex flex-col gap-3"}>
                                        <h3 className={"text-xl text-gray-500 font-light"}>
                                            {lang === 'es' ? job.title_es : job.title}
                                        </h3>
                                        <h5 className={"text-sm text-gray-500 font-light leading-tight"}>
                                            {job[`short_description${langSuffix}`]}
                                        </h5>
                                    </div>
                                </div>
                            </Link>
                        )
                    })
                }
            </div>
        </section>
    );
};

export default CareersPage;