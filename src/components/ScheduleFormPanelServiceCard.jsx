import ServiceIcon from "@/components/ServiceIcon";
import {useContext} from "react";
import GlobalContext from "@/context/GlobalContext";

const ScheduleFormPanelServiceCard = ({ iconName, title, content }) => {

    const { services, dispatch } = useContext(GlobalContext);

    const setServiceContext = (title) => {
        if (services.length === 0) {
            dispatch({type: "SET_TAB_STATUS", payload: {id: 2, disabled: "false"}});
            dispatch({type: "SET_TAB_STATUS", payload: {id: 3, disabled: "false"}});
        }
        dispatch({
            type: "SET_SERVICES",
            payload: [title]
        });
        dispatch({ type: "SET_LS" });
    };

    return (
        <div className={"w-full md:w-6/12"}>
            <div className={`px-2 pb-4 h-full`}>
                <div onClick={() => setServiceContext(title)}
                     className={`cursor-pointer bg-stone-100 border border-stone-200 rounded p-5 w-full h-full flex ${services.includes(title) ? "!bg-susy" : "hover:bg-stone-200"}`}>
                    <div
                        className={`flex items-center justify-center ${services.includes(title) ? "text-white" : "text-susy"}`}>
                        <ServiceIcon iconName={iconName} iconSize={60}/>
                    </div>
                    <div
                        className={`min-h-[120px] px-2 flex flex-col font-light gap-3 justify-center ${services.includes(title) ? "text-white" : "text-gray-700"}`}>
                        <span className={"text-xl"}>{title}</span>
                        <p className={"leading-tight"}>
                            {content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleFormPanelServiceCard;



// const setServiceContext = (title) => {
//     let globalContextServices;
//     if (!services.includes(title)) {
//         globalContextServices = [
//             ...services,
//             title,
//         ];
//         dispatch({
//             type: "SET_SERVICES",
//             payload: globalContextServices
//         });
//         if (title === "Weekly, Bi-Weekly, Monthly") {
//             dispatch({
//                 type: "SET_SERVICE_DETAILS",
//                 payload: {...serviceDetails, frequency: "Bi-Weekly"}
//             });
//         }
//         return;
//     }
//     globalContextServices = services.filter((string) => {
//         return string !== title;
//     });
//     dispatch({
//         type: "SET_SERVICES",
//         payload: globalContextServices
//     });
//     if (title === "Weekly, Bi-Weekly, Monthly") {
//         dispatch({
//             type: "SET_SERVICE_DETAILS",
//             payload: {...serviceDetails, frequency: ""}
//         });
//     }
// };