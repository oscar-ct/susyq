import {useCallback, useContext, useEffect, useState} from "react";
import GlobalContext from "@/context/GlobalContext";
import ArrowSvg from "@/components/ArrowSvg";
import CustomButton from "@/components/CustomButton";
import {useRouter} from "next/navigation";


const ScheduleFormPanelNotes = () => {

    const router = useRouter();
    const { dispatch, serviceNotes, hasSubmittedEstimateSuccessfully, isAttemptingToSubmitEstimate, serviceSource } = useContext(GlobalContext);
    const [seconds, setSeconds] = useState(10);

    const navBackHome = useCallback(() => {
        router.push("/");
        dispatch({ type: "RESET_STATE" });
        dispatch({ type: "SET_LS" });
    }, [dispatch, router]);

    useEffect(() => {
        if (hasSubmittedEstimateSuccessfully) {
            if (seconds > 0) {
                const timerId = setInterval(() => {
                    setSeconds(prevSeconds => prevSeconds - 1);
                }, 1000);

                return () => clearInterval(timerId);
            } else {
                navBackHome();
            }
        }
    }, [seconds, hasSubmittedEstimateSuccessfully, navBackHome]);

    const formatTime = (timeInSeconds) => {
        const minutes = Math.floor(timeInSeconds / 60).toString().padStart(2, '0');
        const remainingSeconds = (timeInSeconds % 60).toString().padStart(2, '0');
        return `${minutes}:${remainingSeconds}`;
    };

    const setServiceNotes = (e) => {
        dispatch({ type: "SET_SERVICE_NOTES", payload: e.target.value });
        dispatch({ type: "SET_LS" });
    };
    const setServiceSource = (e) => {
        dispatch({ type: "SET_SERVICE_SOURCE", payload: e.target.value });
        dispatch({ type: "SET_LS" });
    };

    if (hasSubmittedEstimateSuccessfully) {
        return (
            <div className={"px-2 py-8 md:p-8"}>
                <div className={"w-full pt-3 pb-8 text-4xl text-center"}>
                    Thank you! We will be reaching out to you shortly.
                </div>
                <div className={"pb-8 flex justify-center"}>
                    <CustomButton customClass={"h-16 text-xl"} onClick={() => navBackHome()}>
                        GO BACK HOME
                    </CustomButton>
                </div>
                <h5 className={"text-center"}>
                    You will be automatically redirected back home in {formatTime(seconds)}
                </h5>
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
                    className={"w-full border p-4 rounded bg-stone-100 border-stone-200 focus:bg-stone-100 focus:outline-none"}
                    value={serviceNotes}
                    placeholder={"Please use this section to provide any additional details, specific requests, gate code, or important information that you would like us to know."}
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