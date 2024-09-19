import ServiceIcon from "@/components/ServiceIcon";
import {useContext} from "react";
import GlobalContext from "@/context/GlobalContext";

const ScheduleFormPanelService = () => {

    const serviceList = [
        ["TiLeaf", "Deep Cleaning", " Thorough cleaning of your house. Deep cleaning ensures that your house is spotless and stays that way."],
        ["TiHomeOutline", "Weekly, Bi-Weekly, Monthly", "Our cleaners are fully trained and experienced, they are fast and efficient in what they do to provide residential house cleaning."],
        ["TiBriefcase", "Commercial Cleaning", "Susy Q understands the importance of your company’s image and your office’s appearance."],
        ["TiArrowMinimiseOutline", "Move In Cleaning", "We understand the stress of moving your home lets us take care of the cleaning!."],
        ["TiArrowMaximiseOutline", "Move Out Cleaning", "Don’t want to clean up or be charged a fortune after moving out, our team works hard and we put every effort to meet your expectations."],
        ["TiShoppingBag", "Organization", "Organization is key to keeping a tidy home, let us help."],
    ];

    const { services, dispatch } = useContext(GlobalContext);

    const onClick = (title) => {
        let globalContextServices;
        if (!services.includes(title)) {
            globalContextServices = [
                ...services,
                title,
            ];
            dispatch({
                type: "SET_SERVICES",
                payload: globalContextServices
            });
            return;
        }
        globalContextServices = services.filter((string) => {
            return string !== title;
        });
        dispatch({
            type: "SET_SERVICES",
            payload: globalContextServices
        });
    };

    return (
        <>
            <div className={"cursor-pointer flex flex-col md:flex-row flex-wrap"}>
                {
                    serviceList.map(([iconName, title, content], index) => {
                        return (
                            <div key={index} onClick={() => onClick(title)} className={`border  p-5 w-full md:w-6/12 flex ${services.includes(title) ? "bg-cyan-600" : "hover:bg-zinc-100"}`}>
                                <div className={`flex items-center justify-center ${services.includes(title) ? "text-white" : "text-cyan-600"}`}>
                                    <ServiceIcon iconName={iconName} iconSize={60}/>
                                </div>
                                <div className={`min-h-[120px] px-2 flex flex-col font-light gap-3 justify-center ${services.includes(title) ? "text-white" : "text-gray-500"}`}>
                                    <span className={"text-xl"}>{title}</span>
                                    <p className={"leading-tight"}>
                                        {content}
                                    </p>
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        </>
    );
};

export default ScheduleFormPanelService;