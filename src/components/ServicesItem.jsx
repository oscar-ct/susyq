import ServiceIcon from "@/components/ServiceIcon";

const ServicesItem = ({ title, content, iconName, iconSize = 75 } ) => {
    return (
        <div className={`py-5 md:py-6 w-full md:w-6/12 flex items-center`}>
            <div className={"px-8 flex justify-center items-start text-susy"}>
                <ServiceIcon iconName={iconName} iconSize={iconSize}/>
            </div>
            <div className={"flex flex-col text-gray-500 font-light gap-3"}>
                <span className={"text-2xl"}>{title}</span>
                <p className={"text-lg leading-tight"}>
                    {content}
                </p>
            </div>
        </div>
    );
};

export default ServicesItem;