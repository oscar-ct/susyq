import ServicesItem from "@/components/services/ServicesItem";

const ServicesSection = () => {

    const services = [
        ["TiLeaf", "Green Cleaning", "We believe in green cleaning services that help protect your home, preserve the planet and give you peace of mind."],
        ["TiHomeOutline", "Residential House Cleaning", "Our cleaners are fully trained and experienced, they are fast and efficient in what they do to provide residential house cleaning."],
        ["TiBriefcase", "Commercial Cleaning", "Susy Q understands the importance of your company’s image and your office’s appearance."],
        ["TiArrowMinimiseOutline", "Move in Cleaning", "We understand the stress of moving your home lets us take care of the cleaning!."],
        ["TiArrowMaximiseOutline", "Move Out Cleaning", "Don’t want to clean up or be charged a fortune after moving out, our team works hard and we put every effort to meet your expectations."],
        ["TiShoppingBag", "Organization", "Organization is key to keeping a tidy home, let us help unclutter your home."],
    ];

    return (
        <section className={"py-14 w-full mx-auto px-4 lg:px-8 max-w-screen-xl"}>
            <div className={"flex flex-col items-center"}>
                <div className={"flex flex-col justify-center gap-4"}>
                    <h2 className={"text-center text-4xl uppercase font-light text-gray-500"}>
                        Our Services
                    </h2>
                    <h3 className={"text-center text-2xl font-light text-susy"}>
                        We are doing a couple of things you might be interested in
                    </h3>
                </div>
                <div className={"pt-14 grid gap-10 md:grid-cols-2"}>
                    {
                        services.map(([iconName, title, content], index) => {
                            return (
                                <ServicesItem
                                    title={title}
                                    content={content}
                                    iconName={iconName}
                                    key={index}
                                />
                            )
                        })
                    }
                </div>
            </div>
        </section>
    );
};

export default ServicesSection;