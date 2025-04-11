import {jobs} from "@/utils/jobsList";
import NotFound from "@/app/not-found";
import Image from "next/image";
import susy from "/public/images/susy_is_hiring_jobs.png"
import bg from "../../../../public/images/zoddex-WGoGhVqtWyc-unsplash-original.jpg";
import ApplicationForm from "@/app/careers/[id]/components/ApplicationForm";
import LangToggle from "@/app/careers/[id]/components/LangToggle";

export async function generateMetadata({ params, searchParams }) {
    const id = await params.id;
    const lang = await searchParams.lang === 'es' ? 'es' : 'en';
    const langSuffix = lang === 'es' ? '_es' : '';
    const job = await jobs.find((job) => job.id === id);
    if (job === undefined || job === null) {
        return {
            title: "Unknown - Susy Q Cleaning"
        };
    }
    return {
        title: `${lang === 'es' ? job.title_es : job.title} - Susy Q Cleaning`,
        description: `${job[`short_description${langSuffix}`]}`,
        alternates: {
            canonical: `https://susyqcleaning.com/careers/${id}`,
        },
        openGraph: {
            title: `${lang === 'es' ? job.title_es : job.title} - Susy Q Cleaning`,
            description: `${job[`short_description${langSuffix}`]}`,
            images: [{ url: "/opengraph-image-careers.png", width: 300, height: 282, alt: "susy q cleaning careers" }],
        },
        twitter: {
            title: `${lang === 'es' ? job.title_es : job.title} - Susy Q Cleaning`,
            description: `${job[`short_description${langSuffix}`]}`,
            images: ["/opengraph-image-careers.png"],
        },
    };
}

const CareerPage = async ({ params, searchParams }) => {
    const id = await params.id;
    const lang = await searchParams.lang === 'es' ? 'es' : 'en';
    const langSuffix = lang === 'es' ? '_es' : '';

    const job = await jobs.find((job) => job.id === id);

    if (job === undefined || job === null) {
        return <NotFound />;
    }
    return (
        <>
            <div className={"h-64 relative w-full"}>
                <div className={"h-full mx-auto px-4 max-w-screen-xl lg:px-8"}>
                    <div className={"h-full flex items-center justify-end"}>
                        <Image
                            src={susy}
                            alt={"we are hiring"}
                            height={384}
                            width={288}
                            className={"w-52 h-auto translate-y-5 lg:-translate-x-40"}
                        />
                    </div>
                </div>
                <Image
                    quality={100}
                    priority
                    src={bg}
                    alt="background image"
                    fill={true}
                    className={"rotate-180 object-cover object-bottom -z-10"}
                />
            </div>
            <section className={"w-full mx-auto px-4 max-w-screen-xl lg:px-8"}>
                <div className={"flex flex-col gap-6 pt-10 md:pt-20"}>
                    <h1 className={"text-center text-3xl uppercase font-light text-gray-500 md:text-5xl"}>
                        {lang === 'es' ? job.title_es : job.title}
                    </h1>
                    <div className={"w-full flex justify-center md:justify-end"}>
                        <LangToggle lang={lang}/>
                    </div>
                    <p className={"text-gray-500"}>
                        {job[`long_description${langSuffix}`]}
                    </p>
                </div>
                <div className={"grid gap-10 py-10 lg:grid-cols-2"}>
                    <div className={"flex flex-col gap-6"}>
                        <div className={"uppercase text-gray-500"}>
                            {
                                lang === 'es' ? "Requisitos/Cualificaciones:" : "Requirements/Qualifications:"
                            }
                        </div>
                        <ul className={"pl-5"}>
                            {
                                job[`qualifications${langSuffix}`].map((qualification, index) => (
                                    <li
                                        key={index}
                                        className={"list-disc text-gray-500"}
                                    >
                                        {qualification}
                                    </li>
                                ))
                            }
                        </ul>
                    </div>
                    <ApplicationForm title={job.title} lang={lang}/>
                </div>
            </section>
        </>

    );
};

export default CareerPage;