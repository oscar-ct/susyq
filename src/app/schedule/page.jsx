import ScheduleGuarantees from "@/components/ScheduleGuarantees";
import ScheduleForm from "@/components/ScheduleForm";
import {GlobalProvider} from "@/context/GlobalContext";
import ScheduleFormResetButton from "@/components/ScheduleFormResetButton";


export const metadata = {
    title: "Schedule a Cleaning - Susy Q Cleaning",
    description: "Book green cleaning in Austin with Susy Q. Schedule a healthier home now!",
    alternates: {
        canonical: "https://susyqcleaning.com/schedule",
    },
    openGraph: {
        title: "Schedule a Cleaning - Susy Q Cleaning",
        description: "Book green cleaning in Austin with Susy Q. Schedule a healthier home now!",
        images: [{ url: "/opengraph-image.png", width: 800, height: 599, alt: "susy q cleaning schedule" }],
    },
    twitter: {
        title: "Schedule a Cleaning - Susy Q Cleaning",
        description: "Book green cleaning in Austin with Susy Q. Schedule a healthier home now!",
        images: ["/opengraph-image.png"],
    },
};

const SchedulePage = () => {
    return (
        <GlobalProvider>
            <section className={"w-full mx-auto lg:pb-8 px-4 lg:px-8 max-w-screen-xl"}>
                <div className={"relative py-10 text-center text-5xl uppercase font-light text-gray-500 sm:py-20"}>
                    Customize Your Cleaning
                    <ScheduleFormResetButton/>
                </div>
                <div className={"flex flex-col lg:flex-row"}>
                    <div className={"w-full lg:w-9/12"}>
                        <ScheduleForm/>
                    </div>
                    <div className={"w-full h-full lg:w-3/12"}>
                        <ScheduleGuarantees/>
                    </div>
                </div>
            </section>
        </GlobalProvider>
    );
};

export default SchedulePage;