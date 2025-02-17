"use client"

import ScheduleFormTab from "@/components/ScheduleFormTab";
import {useCallback, useContext, useEffect, useState} from "react";
import ScheduleFormPanelService from "@/components/ScheduleFormPanelService";
import ScheduleFormPanelDetails from "@/components/ScheduleFormPanelDetails";
import ScheduleFormPanelContact from "@/components/ScheduleFormPanelContact";
import ScheduleFormPanelNotes from "@/components/ScheduleFormPanelNotes";
import ServiceFormButtons from "@/components/ServiceFormButtons";
import GlobalContext from "@/context/GlobalContext";
import ScheduleFormPanelFrequency from "@/components/ScheduleFormPanelFrequency";


const ScheduleForm = () => {
    // on window reload, scroll to top
    const resetWindowScrollPosition = useCallback(() => window.scrollTo(0, 0), [])
    useEffect(() => {
        window.onbeforeunload = function () {
            resetWindowScrollPosition();
        }
    }, [resetWindowScrollPosition]);

    const { tabs, activeTab, hasSubmittedEstimateSuccessfully } = useContext(GlobalContext);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {setMounted(true);}, []);

    return (
        <div className={"min-h-[34rem] lg:pr-10"}>
            <ScheduleFormTab/>
            <div className={"py-2 h-full w-full md:py-2"}>
                <div className={"h-8 mb-2 flex justify-center items-center"}>
                    {
                        mounted && tabs?.map((tab) => {
                            if (tab.error && activeTab === tab.id) {
                                return (
                                    <div key={tab.id} className={"text-sm text-center leading-4 text-red-500 font-semibold md:text-base"}>
                                        {tab.errorMsg}
                                    </div>
                                );
                            }
                        })
                    }
                </div>
                {
                    !mounted ? (
                        <div className={"h-52 flex items-center justify-center"}>
                            <span className="loading-lg"/>
                        </div>
                    ) : (
                        <div className={`${hasSubmittedEstimateSuccessfully || activeTab === 0 || activeTab === 1 ? "" : "border"} h-full`}>
                            {
                                activeTab === 0 ?
                                    <ScheduleFormPanelFrequency/>
                                    : activeTab === 1 ?
                                        <ScheduleFormPanelService/>
                                        : activeTab === 2 ?
                                            <ScheduleFormPanelDetails/>
                                            : activeTab === 3 ?
                                                <ScheduleFormPanelContact/>
                                                : <ScheduleFormPanelNotes/>
                            }
                        </div>
                    )
                }
            </div>
            <div className={"w-full flex items-end justify-center pt-4 gap-4 md:justify-end"}>
                {/*{*/}
                {/*    mounted && tabs?.map((tab) => {*/}
                {/*        if (tab.error && activeTab === tab.id) {*/}
                {/*            return (*/}
                {/*                <span key={tab.id} className={"flex-grow text-center leading-4 md:text-xl text-red-500 font-semibold"}>{tab.errorMsg}</span>*/}
                {/*            )*/}
                {/*        }*/}
                {/*    })*/}
                {/*}*/}
                {
                    mounted && (
                        <ServiceFormButtons/>
                    )
                }
            </div>
        </div>
    );
};

export default ScheduleForm;