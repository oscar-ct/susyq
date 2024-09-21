import ServicesItem from "@/components/ServicesItem";

const Services = () => {


    const services = [
        ["TiLeaf", "Clean and Green", "We believe in green cleaning services that help protect your home, preserve the planet and give you peace of mind."],
        ["TiHomeOutline", "Residential House Cleaning", "Our cleaners are fully trained and experienced, they are fast and efficient in what they do to provide residential house cleaning."],
        ["TiBriefcase", "Commercial Cleaning", "Susy Q understands the importance of your company’s image and your office’s appearance."],
        ["TiArrowMinimiseOutline", "Move in Cleaning", "We understand the stress of moving your home lets us take care of the cleaning!."],
        ["TiArrowMaximiseOutline", "Move Out Cleaning", "Don’t want to clean up or be charged a fortune after moving out, our team works hard and we put every effort to meet your expectations."],
        ["TiShoppingBag", "Organization", "Organization is key to keeping a tidy home, let us help."],
    ]

    return (
        <section className={"py-14 w-full mx-auto px-4 lg:px-8 max-w-screen-xl"}>
            <div className={"flex flex-col items-center"}>
                <div className={"flex flex-col justify-center pb-8 md:pb-4"}>
                    <span className={"text-center text-5xl uppercase font-light text-gray-500"}>Our Services</span>
                    <span className={"pt-5 text-center text-xl font-light text-susy"}>We are doing a couple of things you might be interested in</span>
                </div>
                <div className={"flex flex-col md:flex-row flex-wrap"}>
                    {
                        services.map(([iconName, title, content], index) => {
                            return (
                                <ServicesItem title={title} content={content} iconName={iconName} key={index}/>
                            )
                        })
                    }

                </div>
            </div>
        </section>
    );
};

export default Services;