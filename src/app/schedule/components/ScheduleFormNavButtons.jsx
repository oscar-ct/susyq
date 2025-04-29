import {useContext} from "react";
import GlobalContext from "@/context/GlobalContext";
import useNavTo from "@/hooks/useNavTo";
import ScheduleFormSubmitToServiceFusionButton from "@/app/schedule/components/ScheduleFormSubmitToServiceFusionButton";

const ScheduleFormNavButtons = () => {

    const { hasApiError, frequency, services, activeTab, serviceContact, hasSubmittedEstimateSuccessfully, isAttemptingToSubmitEstimate } = useContext(GlobalContext);
    const { navToServices, navToServiceDetails, navToServiceContact, navToPrev, navToServiceNotes } = useNavTo();

    const ACTIVE_BUTTON_CLASS = "bg-susy hover:bg-susy/80 text-white py-2 px-4 rounded";
    const DISABLED_BUTTON_CLASS = "bg-stone-400 text-gray-600 opacity-60 cursor-not-allowed py-2 px-4 rounded";

    return (
        <div className={"flex gap-4"}>
            {
                activeTab === 0 && (
                    <>
                        <button className={DISABLED_BUTTON_CLASS} disabled>
                            Previous
                        </button>
                        <button
                            onClick={navToServices}
                            className={frequency.length ? ACTIVE_BUTTON_CLASS : DISABLED_BUTTON_CLASS}
                        >
                            Next
                        </button>
                    </>
                )
            }
            {
                activeTab === 1 && (
                    <>
                        <button
                            className={ACTIVE_BUTTON_CLASS}
                            onClick={navToPrev}
                        >
                            Previous
                        </button>
                        <button
                            onClick={navToServiceDetails}
                            className={services.length ? ACTIVE_BUTTON_CLASS : DISABLED_BUTTON_CLASS}
                        >
                            Next
                        </button>
                    </>
                )
            }
            {
                activeTab === 2 && (
                    <>
                        <button
                            className={ACTIVE_BUTTON_CLASS}
                            onClick={navToPrev}
                        >
                            Previous
                        </button>
                        <button
                            onClick={navToServiceContact}
                            className={ACTIVE_BUTTON_CLASS}>
                            Next
                        </button>
                    </>
                )
            }
            {
                activeTab === 3 && (
                    <>
                        <button
                            className={ACTIVE_BUTTON_CLASS}
                            onClick={navToPrev}
                        >
                            Previous
                        </button>
                        <button
                            onClick={navToServiceNotes}
                            className={serviceContact.validated ? ACTIVE_BUTTON_CLASS : DISABLED_BUTTON_CLASS}
                        >
                            Next
                        </button>
                    </>
                )
            }
            {
                activeTab === 4 && !hasSubmittedEstimateSuccessfully && !hasApiError && (
                    <div className={"flex flex-col items-center md:items-end"}>
                        <div className={"flex gap-4"}>
                            <button
                                className={isAttemptingToSubmitEstimate ? DISABLED_BUTTON_CLASS : ACTIVE_BUTTON_CLASS}
                                onClick={navToPrev}
                            >
                                Previous
                            </button>
                            <ScheduleFormSubmitToServiceFusionButton
                                activeButtonClass={ACTIVE_BUTTON_CLASS}
                                disabledButtonClass={DISABLED_BUTTON_CLASS}
                                isSubmitting={isAttemptingToSubmitEstimate}
                            />
                        </div>
                        {
                            isAttemptingToSubmitEstimate && (
                                <div className={"text-sm text-center font-semibold pt-4 flex justify-center lg:justify-end items-end"}>
                                    Please wait while we process your estimate...
                                </div>
                            )
                        }
                    </div>
                )
            }
        </div>
    );
};

export default ScheduleFormNavButtons;