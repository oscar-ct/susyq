import {useCallback, useContext, useEffect, useState} from "react";
import GlobalContext from "@/context/GlobalContext";
import DropdownMenuArrowSvg from "@/components/DropdownMenuArrowSvg";
import {useRouter} from "next/navigation";
import Link from "next/link";


const ScheduleFormPanelNotes = () => {

    const router = useRouter();
    const { dispatch, hasApiError, serviceNotes, hasSubmittedEstimateSuccessfully, isAttemptingToSubmitEstimate, serviceSource } = useContext(GlobalContext);
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
    const handleTryAgain = () => {
        dispatch({ type: "SET_API_ERROR", payload: false });
        dispatch({ type: "SET_LS" });
    };

    return (
        <div className={"px-2 py-8 md:p-8"}>
            {
                hasSubmittedEstimateSuccessfully ? (
                    <div className={"flex flex-col gap-6 py-4 text-center"}>
                        <div className={"text-4xl"}>Thank you! We will be reaching out to you shortly.</div>
                        <div className={"flex justify-center"}>
                            <Link
                                href="/"
                                className="bg-susy text-white button py-2 px-4 rounded"
                            >
                                Go Back Home
                            </Link>
                        </div>
                        <div>You will be automatically redirected back home in {formatTime(seconds)}</div>
                    </div>
                ) : hasApiError ? (
                    <div className={"flex flex-col gap-6 py-4 text-center"}>
                        <div className={"text-2xl"}> Sorry, we encountered an unexpected error. Please try again or call 512-640-6264 to get your
                            request shining!</div>
                        <div className={"flex justify-center"}>
                            <button
                                onClick={handleTryAgain}
                                className="bg-susy text-white button py-2 px-4 rounded"
                            >
                                Try Again
                            </button>
                        </div>
                    </div>
                ) : (
                    <>
                        <div className={"pt-3 pb-6 text-center tracking-wide font-semibold text-gray-700"}>
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
                                    <option value={"Internet Search"}>Internet Search (Google, Bing, etc.)</option>
                                    <option value={"Facebook"}>Facebook</option>
                                    <option value={"Instagram"}>Instagram</option>
                                    <option value={"Friend/Family"}>Friend/Family</option>
                                    <option value={"Yelp"}>Yelp</option>
                                    <option value={"Other"}>Other</option>
                                </select>
                                <DropdownMenuArrowSvg/>
                            </div>
                        </div>
                    </>
                )
            }
        </div>
    );
};

export default ScheduleFormPanelNotes;