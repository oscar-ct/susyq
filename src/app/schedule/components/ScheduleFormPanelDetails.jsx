import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { PiOven } from "react-icons/pi";
import { GiWindow } from "react-icons/gi";
import {useContext, useState} from "react";
import GlobalContext from "@/context/GlobalContext";
import DropdownMenuArrowSvg from "@/components/DropdownMenuArrowSvg";
import {MdBalcony, MdOutlineGarage} from "react-icons/md";

const ScheduleFormPanelDetails = () => {

    const { frequency, services, serviceDetails, dispatch } = useContext(GlobalContext);
    const extraOptions = [
        {title: "Refrigerator Service", description: "Refrigerator Cleaning Service", icon: <CgSmartHomeRefrigerator size={80}/>},
        {title: "Oven Service", description: "Kitchen Oven Cleaning Service", icon: <PiOven size={80}/>},
        {title: "Window Service", description: "Window Cleaning Service", icon: <GiWindow size={80}/>}
    ];

    const moveInOutExtraOptions = [
        { title: "Garage Service (1-car)", description: "Garage Cleaning Service (1-car)", icon: <MdOutlineGarage size={80}/>},
        { title: "Garage Service (2-car)", description: "Garage Cleaning Service (2-car)", icon: <span className={"flex gap-2"}><MdOutlineGarage size={60}/><MdOutlineGarage size={60}/></span>},
        { title: "Patio/Porch/Balcony Service", description: "Patio/Porch/Balcony Cleaning Service", icon: <MdBalcony size={80}/>}
    ];

    const [checkboxSelected, setCheckboxSelected] = useState(serviceDetails.size !== "");
    const [sqFt, setSqFt] = useState("< 500");
    // const [isResidential] = useState(!services.includes("Commercial Cleaning"));
    const isResidential = !services?.includes("Commercial Cleaning");

    const dispatchServiceDetails = (details) => {
        dispatch({ type: "SET_SERVICE_DETAILS", payload: details });
        dispatch({ type: "SET_LS" });
    };

    const handleExtraChange = (description) => {
        const extras = serviceDetails.extras;
        if (extras.includes(description)) {
            const updated = extras.filter((extra) => {
                return extra !== description;
            });
            const details = { ...serviceDetails, extras: updated }
           dispatchServiceDetails(details);
        } else {
            const details = { ...serviceDetails, extras: [...extras, description] }
           dispatchServiceDetails(details);
        }
    };

    const setBedrooms = (e) => {
        const details = {...serviceDetails, rooms: { ...serviceDetails.rooms, bedroom: e.target.value }}
        dispatchServiceDetails(details);
    };

    const setBathrooms = (e) => {
        const details = {...serviceDetails, rooms: { ...serviceDetails.rooms, bathroom: e.target.value }}
        dispatchServiceDetails(details);
    };

    // const previousCheckboxState = usePrevious(checkboxSelected);
    const handleCheckboxChange = () => {
        setCheckboxSelected((prevState) => {
            return !prevState;
        });
        if (!checkboxSelected) {
            const details = {...serviceDetails, size: sqFt}
            dispatchServiceDetails(details);
        } else {
            const details = {...serviceDetails, size: ""}
            dispatchServiceDetails(details);
        }
    };

    const handleSqFtChange = (e) => {
          setSqFt(e.target.value);
        const details = {...serviceDetails, size: e.target.value}
        dispatchServiceDetails(details);
    };

    const setFrequencyChange = (e) => {
        const details = {...serviceDetails, frequency: e.target.value}
        dispatchServiceDetails(details);
    };

    return (
        <div className={"px-2 py-8 md:p-8"}>
            <div className={"md:pt-3 pb-4 md:pb-2"}>
                <div className={"pb-6 flex flex-col items-center gap-4 md:flex-row"}>
                    <div className="hidden md:block tracking-wide font-semibold text-gray-700 md:w-2/12">
                        {isResidential ? "Rooms" : "Spaces"}
                    </div>
                    <div className="md:hidden text-xl tracking-wide font-semibold text-gray-700">
                        {isResidential ? "House Size" : "Building Size"}
                    </div>
                    <div className={"w-full flex flex-col items-center gap-4 md:flex-row md:w-10/12"}>
                        <div className="relative w-full md:w-6/12">
                            <select
                                className="cursor-pointer block appearance-none w-full bg-stone-100 border border-stone-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none hover:bg-stone-200"
                                id="bedroom"
                                onChange={(e) => setBedrooms(e)}
                                value={serviceDetails.rooms.bedroom}
                            >
                                <option value={"1"}>1 {isResidential ? "Bedroom" : "Office"}</option>
                                <option value={"2"}>2 {isResidential ? "Bedroom" : "Office"}</option>
                                <option value={"3"}>3 {isResidential ? "Bedroom" : "Office"}</option>
                                <option value={"4"}>4 {isResidential ? "Bedroom" : "Office"}</option>
                                <option value={"5"}>5+ {isResidential ? "Bedroom" : "Office"}</option>
                            </select>
                            <DropdownMenuArrowSvg/>
                        </div>
                        <div className="relative w-full md:w-6/12">
                            <select
                                className="cursor-pointer block appearance-none w-full bg-stone-100 border border-stone-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none hover:bg-stone-200"
                                id="bathroom"
                                onChange={(e) => setBathrooms(e)}
                                value={serviceDetails.rooms.bathroom}
                            >
                                <option value={"1"}>1 Bathroom</option>
                                <option value={"1.5"}>1.5 Bathroom</option>
                                <option value={"2"}>2 Bathroom</option>
                                <option value={"2.5"}>2.5 Bathroom</option>
                                <option value={"3"}>3 Bathroom</option>
                                <option value={"3.5"}>3.5 Bathroom</option>
                                <option value={"4"}>4 Bathroom</option>
                                <option value={"4.5"}>4.5 Bathroom</option>
                                <option value={"5"}>5+ Bedroom</option>
                            </select>
                            <DropdownMenuArrowSvg/>
                        </div>
                    </div>
                </div>
                <div className={"pb-6 flex flex-col items-center gap-4 md:flex-row"}>
                    <div className="hidden pr-4 md:block py-3 tracking-wide font-semibold text-gray-700 md:w-2/12">
                        {isResidential ? "House Size" : "Building Size"}
                    </div>
                    <div className={"py-3 flex w-full md:w-5/12"}>
                        <input
                            id={"checkbox"}
                            onChange={handleCheckboxChange}
                            checked={checkboxSelected}
                            type={"checkbox"}
                            className={"cursor-pointer"}
                        />
                        <div className={"pl-4 cursor-pointer tracking-wide font-semibold text-gray-700"}
                             onClick={handleCheckboxChange}>
                            I know my square footage
                        </div>
                    </div>

                    <div className="relative w-full md:w-5/12">
                        {
                            checkboxSelected && (
                                <>
                                    <select
                                        className="cursor-pointer block appearance-none w-full bg-stone-100 border border-stone-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none hover:bg-stone-200"
                                        id="sq"
                                        onChange={(e) => handleSqFtChange(e)}
                                        value={serviceDetails.size}
                                    >
                                        <option value={"< 500"}>&#60; 500 sq ft</option>
                                        <option value={"500 - 1000"}>500 - 1000 sq ft</option>
                                        <option value={"1000 - 2000"}>1000 - 2000 sq ft</option>
                                        <option value={"2000 - 3000"}>2000 - 3000 sq ft</option>
                                        <option value={"3000 - 4000"}>3000 - 4000 sq ft</option>
                                        <option value={"4000 - 5000"}>4000 - 5000 sq ft</option>
                                        <option value={"5000 +"}>5000 + sq ft</option>
                                    </select>
                                    <DropdownMenuArrowSvg/>
                                </>
                            )
                        }
                    </div>
                </div>
                {
                    frequency === "recurring" && (
                        <div className={"pb-6 flex flex-col items-center gap-4 md:flex-row"}>
                            <div className="text-xl md:text-base tracking-wide font-semibold text-gray-700 md:w-2/12">
                                Frequency
                            </div>
                            <div className="relative w-full md:w-10/12">
                                <select
                                    className="cursor-pointer block appearance-none w-full bg-stone-100 border border-stone-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none hover:bg-stone-200"
                                    id="frequency"
                                    onChange={(e) => setFrequencyChange(e)}
                                    value={serviceDetails.frequency}
                                >
                                    <option value={"Every Week"}>Every Week</option>
                                    <option value={"Every 2 Weeks"}>Every 2 Weeks</option>
                                    <option value={"Every 4 Weeks"}>Every 4 Weeks</option>
                                </select>
                                <DropdownMenuArrowSvg/>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className={"flex flex-col"}>
                <div className={"border-b py-2 text-xl text-center font-semibold text-gray-700"}>
                    Need an extra service?
                </div>
                <div className={"w-full"}>
                    <div className={"pt-8 grid grid-cols-2 gap-4 md:grid-cols-3"}>
                        {
                            services[0] === "Move In Cleaning" || services[0] === "Move Out Cleaning" ? (
                                <>
                                    {
                                        moveInOutExtraOptions.map(( {title, description, icon}) => {
                                            return (
                                                <div
                                                    key={title}
                                                    onClick={() => handleExtraChange(title)}
                                                    className={`${serviceDetails.extras.includes(title) ? "!bg-susy text-white" : "hover:bg-stone-200"} cursor-pointer flex flex-col items-center gap-4 p-4 rounded text-center bg-stone-100 border border-stone-200 h-44 w-full`}
                                                >
                                                    {icon}
                                                    <span className={`px-2 ${serviceDetails.extras.includes(title) ? "text-white" : "text-susy"}`}>{description}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                            ) : <>
                                    {
                                        extraOptions.concat(moveInOutExtraOptions).map(({title, description, icon}) => {
                                            return (
                                                <div
                                                    key={title}
                                                    onClick={() => handleExtraChange(title)}
                                                    className={`${serviceDetails.extras.includes(title) ? "!bg-susy text-white" : "hover:bg-stone-200"} cursor-pointer flex flex-col items-center gap-4 p-4 rounded text-center bg-stone-100 border border-stone-200 h-44 w-full`}
                                                >
                                                    {icon}
                                                    <span className={`${serviceDetails.extras.includes(title) ? "text-white" : "text-susy"} text-sm md:text-base`}>{description}</span>
                                                </div>
                                            )
                                        })
                                    }
                                </>
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleFormPanelDetails;