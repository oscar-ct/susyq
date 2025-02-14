import {useContext} from "react";
import GlobalContext from "@/context/GlobalContext";
import ArrowSvg from "@/components/ArrowSvg";
import CustomButton from "@/components/CustomButton";
import Link from "next/link";

const ScheduleFormPanelNotes = () => {

    const { dispatch, serviceNotes, hasSubmittedEstimateSuccessfully, isAttemptingToSubmitEstimate, serviceSource } = useContext(GlobalContext);

    const setServiceNotes = (e) => {
        dispatch({ type: "SET_SERVICE_NOTES", payload: e.target.value });
    };
    const setServiceSource = (e) => {
        dispatch({ type: "SET_SERVICE_SOURCE", payload: e.target.value });
    };

    if (hasSubmittedEstimateSuccessfully) {
        return (
            <div className={"px-2 py-8 md:p-8"}>
                <div className={"w-full pt-3 pb-8 text-4xl text-center"}>
                    Thank you! We will be reaching out to you shortly.
                </div>
                <div className={"pt-5 flex justify-center"}>
                    <Link href={"/"}>
                        <CustomButton customClass={"h-16 text-xl"}>
                            GO BACK HOME
                        </CustomButton>
                    </Link>
                </div>
            </div>
        )
    } else {
        return (
            <div className={"px-2 py-8 md:p-8"}>
                <div className={"w-full pt-3 pb-6 text-center tracking-wide font-semibold text-gray-700"}>
                    Special Instructions, message or concerns?
                </div>
                <textarea
                    id={"notes"}
                    disabled={Boolean(isAttemptingToSubmitEstimate)}
                    onChange={setServiceNotes}
                    rows={5}
                    className={"w-full border p-4 rounded bg-stone-50 border-stone-100 focus:bg-stone-100 focus:outline-none"}
                    value={serviceNotes}
                />
                <div className={"pt-6 pb-3 flex flex-col items-center gap-4 md:flex-row"}>
                    <div className="tracking-wide font-semibold text-gray-700 md:w-5/12">
                        How did you hear about us?
                    </div>
                    <div className="relative w-full md:w-7/12">
                        <select
                            disabled={isAttemptingToSubmitEstimate}
                            className="cursor-pointer block appearance-none w-full bg-stone-100 border border-stone-200 text-gray-700 py-3 px-4 rounded leading-tight focus:outline-none hover:bg-stone-200"
                            id="source" value={serviceSource} onChange={setServiceSource}
                        >
                            <option disabled={true} value={""}>Please select one</option>
                            <option value={"search"}>Internet Search (Google, Bing, etc.)</option>
                            <option value={"facebook"}>Facebook</option>
                            <option value={"word of mouth"}>Friend/Family</option>
                            <option value={"yelp"}>Yelp</option>
                            <option value={"other"}>Other</option>
                        </select>
                        <ArrowSvg/>
                    </div>
                </div>
            </div>
        );
    }
};

export default ScheduleFormPanelNotes;