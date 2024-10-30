import ServiceIcon from "@/components/ServiceIcon";

const ServicesItem = ({ title, content, iconName, iconSize = 75 } ) => {
    return (
        <div className={`py-5 md:py-6 w-full md:w-6/12`}>
            <div className={"flex flex-col items-center text-gray-500 font-light gap-3"}>
                <span className={"lg:hidden text-2xl"}>{title}</span>
                <div className={"flex items-center"}>
                    <div className={"px-8 flex justify-center items-start text-susy"}>
                        <ServiceIcon iconName={iconName} iconSize={iconSize}/>
                    </div>
                    <div className={"flex flex-col lg:gap-3"}>
                        <span className={"hidden lg:block text-2xl"}>{title}</span>
                        <p className={"text-lg leading-tight"}>
                            {content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServicesItem;