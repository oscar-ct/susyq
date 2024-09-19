import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { PiOven } from "react-icons/pi";
import { GiWindow } from "react-icons/gi";
import { useContext, useState} from "react";
import GlobalContext from "@/context/GlobalContext";
import ArrowSvg from "@/components/ArrowSvg";

const ScheduleFormPanelDetails = () => {

    const { serviceDetails, dispatch } = useContext(GlobalContext);
    const extraOptions = [
        ["Refrigerator", "Refrigerator Cleaning Service"], ["Oven", "Kitchen Oven Cleaning Service"], ["Window", "Window Cleaning Service"]
    ];

    const [checkboxSelected, setCheckboxSelected] = useState(serviceDetails.size !== "");
    const [sqFt, setSqFt] = useState("< 500");
    const dispatchServiceDetails = (details) => {
        dispatch({ type: "SET_SERVICE_DETAILS", payload: details });
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

    return (
        <div className={"px-2 py-8 md:p-8"}>
            <div className={"flex flex-col pb-8 md:pb-2"}>
                <div className={"border-b pb-2 text-2xl text-center md:text-start"}>House</div>
                <div className="w-full py-3 flex flex-col gap-4">
                    <div className={"flex flex-col items-center gap-4 md:flex-row"}>
                        <div className="tracking-wide font-semibold text-gray-700 md:w-20">
                            Rooms
                        </div>
                        <div className="relative w-full md:w-6/12">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none hover:bg-gray-300"
                                id="bedroom"
                                onChange={(e) => setBedrooms(e)}
                                defaultValue={serviceDetails.rooms.bedroom}
                            >
                                <option value={"0"}>0 Bedroom</option>
                                <option value={"1"}>1 Bedroom</option>
                                <option value={"2"}>2 Bedroom</option>
                                <option value={"3"}>3 Bedroom</option>
                                <option value={"4"}>4 Bedroom</option>
                                <option value={"5+"}>5+ Bedroom</option>
                            </select>
                            <ArrowSvg/>
                        </div>
                        <div className="relative w-full md:w-6/12">
                            <select
                                className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none hover:bg-gray-300"
                                id="bathroom"
                                onChange={(e) => setBathrooms(e)}
                                defaultValue={serviceDetails.rooms.bathroom}
                            >
                                <option value={"1"}>1 Bathroom</option>
                                <option value={"2"}>2 Bathroom</option>
                                <option value={"3"}>3 Bathroom</option>
                                <option value={"4"}>4 Bathroom</option>
                                <option value={"5+"}>5+ Bedroom</option>
                            </select>
                            <ArrowSvg/>
                        </div>
                    </div>
                    <div className={"flex flex-col items-center gap-4 md:flex-row"}>
                        <div className="py-3 tracking-wide font-semibold text-gray-700 md:w-20">
                            Size
                        </div>
                        <div className={"py-3 flex w-full md:w-6/12"}>
                            <input
                                onChange={handleCheckboxChange}
                                checked={checkboxSelected}
                                type={"checkbox"}
                                className={"cursor-pointer"}
                            />
                            <div className={"pl-4 cursor-pointer tracking-wide font-semibold text-gray-700"} onClick={handleCheckboxChange}>
                                I know my square footage
                            </div>
                        </div>

                        <div className="relative w-full md:w-6/12">
                            {
                                checkboxSelected && (
                                    <>
                                        <select
                                            className="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none hover:bg-gray-300"
                                            id="sq"
                                            onChange={(e) => handleSqFtChange(e)}
                                            defaultValue={serviceDetails.size}
                                        >
                                            <option value={"< 500"}>&#60; 500 sq ft</option>
                                            <option value={"500 - 1000"}>500 - 1000 sq ft</option>
                                            <option value={"1000 - 2000"}>1000 - 2000 sq ft</option>
                                            <option value={"2000 - 3000"}>2000 - 3000 sq ft</option>
                                            <option value={"3000 - 4000"}>3000 - 4000 sq ft</option>
                                            <option value={"4000 - 5000"}>4000 - 5000 sq ft</option>
                                            <option value={"5000 +"}>5000 + sq ft</option>
                                        </select>
                                        <ArrowSvg/>
                                    </>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>

            <div className={"flex flex-col"}>
                <div className={"border-b py-2 text-2xl text-center md:text-start"}>Add Extras</div>
                    <div className={"w-full px-3 md:px-0"}>
                        <div className={"py-4 flex flex-col md:flex-row gap-4"}>
                            {
                                extraOptions.map(([title, description]) => {
                                    return (
                                        <div onClick={() => handleExtraChange(description)} key={title}
                                             className={`${serviceDetails.extras.includes(description) ? "bg-cyan-600 text-white" : "hover:bg-zinc-100"} cursor-pointer flex flex-col items-center gap-4 p-4 text-center border-2 h-48 w-full lg:w-4/12`}>
                                            {
                                                title === "Refrigerator" ?
                                                    <CgSmartHomeRefrigerator size={100}/> : title === "Oven" ?
                                                        <PiOven size={100}/> : <GiWindow size={100}/>
                                            }
                                            <span className={`${serviceDetails.extras.includes(description) ? "text-white" : "text-cyan-600"}`}>{description}</span>
                                        </div>
                                    )
                                })
                            }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ScheduleFormPanelDetails;