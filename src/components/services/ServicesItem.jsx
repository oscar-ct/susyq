import ServiceIcon from "@/components/ServiceIcon";

const ServicesItem = ({ title, content, iconName, iconSize = 75 } ) => {
    return (
        <div className={`w-full flex items-center gap-4`}>
            <div className={"h-full flex justify-center items-center text-susy"}>
                <ServiceIcon iconName={iconName} iconSize={iconSize}/>
            </div>
            <div className={"h-full flex flex-col gap-3 text-gray-500 font-light"}>
                <h4 className={"text-xl"}>
                    {title}
                </h4>
                <p className={"text-lg leading-tight"}>
                    {content}
                </p>
            </div>
        </div>
    );
};

export default ServicesItem;