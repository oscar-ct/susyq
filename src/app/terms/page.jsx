import Link from "next/link";

export const metadata = {
    title: "Terms of Service - Susy Q Cleaning",
    description: "Susy Q Cleaning’s terms for cleaning services in Austin. Read our policies now.",
    alternates: {
        canonical: "https://susyqcleaning.com/terms",
    },
    openGraph: {
        title: "Terms of Service - Susy Q Cleaning",
        description: "Susy Q Cleaning’s terms for cleaning services in Austin. Read our policies now.",
        images: [{ url: "/opengraph-image.png", width: 800, height: 599, alt: "susy q cleaning terms" }],
    },
    twitter: {
        title: "Terms of Service - Susy Q Cleaning",
        description: "Susy Q Cleaning’s terms for cleaning services in Austin. Read our policies now.",
        images: ["/opengraph-image.png"],
    },
};

const Page = () => {
    return (
        <section className={"py-14 w-full mx-auto px-4 lg:px-8 max-w-screen-xl bg-stone-100"}>
            <div className={"flex flex-col items-center"}>
                <div className={"flex flex-col justify-center pb-8 md:pb-4"}>
                    <h1 className={"text-center text-5xl uppercase font-light text-gray-500"}>Terms and Conditions</h1>
                    <h4 className={"pt-5 text-center text-xl font-light text-gray-500"}>Last updated: October 1st,
                        2024</h4>
                </div>
                <div className={"flex flex-col max-w-screen-lg gap-6"}>
                    <div>
                        <h4 className={"text-2xl font-semibold text-gray-600"}>Conditions of use</h4>
                        <p className={"pt-4 leading-relaxed tracking-wide"}>By using this website, you certify that you have read and reviewed this Agreement and that you agree to comply with
                            its terms. If you do not want to be bound by the terms of this agreement, you are advised to stop using the website
                            accordingly. Susy Q Cleaning only grants use and access of this website and its services to those who
                            have accepted its terms.
                        </p>
                    </div>
                    <div>
                        <h4 className={"text-2xl font-semibold text-gray-600"}>Privacy Policy</h4>
                        <p className={"pt-4 leading-relaxed tracking-wide"}>Before you continue using our website, we advise you to read our <Link className={"underline text-blue-600"} href={"/privacy"}>Privacy Policy</Link> regarding our
                            user data collection. It will help you better understand our practices.
                        </p>
                    </div>
                    <div>
                        <h4 className={"text-2xl font-semibold text-gray-600"}>Age Restriction</h4>
                        <p className={"pt-4 leading-relaxed tracking-wide"}>
                            You must be at least 18 (eighteen) years of age before you can use this website. By using this website, you warrant
                            that you are at least 18 years of age and you may legally adhere to this agreement. Susy Q Cleaning assumes no
                            responsibility for liabilities related to age misrepresentation.
                        </p>
                    </div>
                    <div>
                        <h4 className={"text-2xl font-semibold text-gray-600"}>Cancellation</h4>
                        <p className={"pt-4 leading-relaxed tracking-wide"}>
                            You may cancel or change your appointment up to 24 hours before the start time. Appointments
                            canceled or changed less than 24 hours in advance will be charged at full price.
                        </p>
                    </div>
                    <div>
                        <h4 className={"text-2xl font-semibold text-gray-600"}>Communication</h4>
                        <p className={"pt-4 leading-relaxed tracking-wide"}>By providing your phone number and email,
                            you are agreeing to receive confirmations, receipts, notices and updates about your cleans.
                            We will also send marketing communications. You can opt-out any time. Standard messaging
                            rates apply
                        </p>
                    </div>
                    <div>
                        <h4 className={"text-2xl font-semibold text-gray-600"}>Utilities</h4>
                        <p className={"pt-4 leading-relaxed tracking-wide"}>It is the client&apos;s responsibility to
                            ensure that all utilities needed to successfully clean the home will be working during the
                            clean. If any utilities are turned off, the housekeepers will do the best that they can, but
                            cannot guarantee a result. Appointments canceled or changed less than 24 hours in advance
                            will be charged at full price. If the temperature in the home exceeds 90 degrees Fahrenheit
                            or is below 40 degrees Fahrenheit, the housekeepers will leave the home and the appointment
                            will be charged in full.
                        </p>
                    </div>
                    <div>
                        <h4 className={"text-2xl font-semibold text-gray-600"}>Late Access / No-show</h4>
                        <p className={"pt-4 leading-relaxed tracking-wide"}>It is the client&apos;s responsibility to
                            provide entry instructions for the housekeeping team. If the team is unable to access your
                            home with the provided entry instructions, you will receive a text from our office. If after
                            30 minutes from the time the text is sent the housekeepers are still unable to access your
                            home, they will leave and the appointment will be charged in full. If the appointment starts
                            late, the housekeepers will clean for the remainder of the booked time. Any additional time
                            must be purchased.
                        </p>
                    </div>
                    <div>
                        <h4 className={"text-2xl font-semibold text-gray-600"}>Biohazard</h4>
                        <p className={"pt-4 leading-relaxed tracking-wide"}>According to regulations placed by the
                            Occupational Safety and Health Administration (OSHA), housekeepers are not permitted to
                            handle biohazards. This includes but is not limited to all bodily fluids, pests and
                            pathogens. If biohazards are present, the housekeepers will do the best they can in cleaning
                            around them and the appointment will be charged in full.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
};

export default Page;