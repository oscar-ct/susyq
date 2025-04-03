import {useContext} from "react";
import GlobalContext from "@/context/GlobalContext";
import ScheduleFormPanelServiceCard from "@/app/schedule/components/ScheduleFormPanelServiceCard";

const ScheduleFormPanelService = () => {

    const oneTimeServiceList = [
        ["TiLeaf", "Deep Cleaning", " Thorough cleaning of your house. Deep cleaning ensures that your house is spotless and stays that way."],
        ["TiBriefcase", "Commercial Cleaning", "Susy Q understands the importance of your company’s image and your office’s appearance."],
        ["TiArrowMinimiseOutline", "Move In Cleaning", "We understand the stress of moving, let us handle the cleaning!"],
        ["TiArrowMaximiseOutline", "Move Out Cleaning", "Avoid the hassle and expense of post-move cleanup, our dedicated team works tirelessly to meet your expectations."],
    ];

    const recurringServiceList = [
        ["TiHomeOutline", "Residential Cleaning", "Our cleaners are fully trained and experienced, delivering fast and efficient residential house cleaning."],
        ["TiBriefcase", "Commercial Cleaning", "Susy Q understands the importance of your company’s image and your office’s appearance."],
    ];


    const { frequency } = useContext(GlobalContext);

    return (
        <div className={"w-full flex flex-col md:flex-row flex-wrap"}>
        {
            frequency === "one-time" && oneTimeServiceList.map(([iconName, title, content], index) => {
                return (
                   <ScheduleFormPanelServiceCard key={index} iconName={iconName} title={title} content={content} />
                );
            })
        }
        {
            frequency === "recurring" && recurringServiceList.map(([iconName, title, content], index) => {
                return (
                    <ScheduleFormPanelServiceCard key={index} iconName={iconName} title={title} content={content} />
                );
            })
        }
        </div>
    );
};

export default ScheduleFormPanelService;