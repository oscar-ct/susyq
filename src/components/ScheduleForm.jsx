"use client"

import ScheduleFormTab from "@/components/ScheduleFormTab";
import {useContext} from "react";
import ScheduleFormPanelService from "@/components/ScheduleFormPanelService";
import ScheduleFormPanelDetails from "@/components/ScheduleFormPanelDetails";
import ScheduleFormPanelContact from "@/components/ScheduleFormPanelContact";
import ScheduleFormPanelNotes from "@/components/ScheduleFormPanelNotes";
import ServiceFormButtons from "@/components/ServiceFormButtons";
import GlobalContext from "@/context/GlobalContext";

const ScheduleForm = () => {

    const { tabs, activeTab, serviceSubmitted } = useContext(GlobalContext);

    return (
        <div className={"min-h-[34rem] lg:pr-10"}>
            <div className="w-full flex gap-2 md:gap-4 h-16">
                {
                    tabs?.map((tab, index) => {
                        return <ScheduleFormTab tabName={tab.name} key={index} id={tab.id} disabled={tab.disabled} error={tab.error}/>
                    })
                }
            </div>
            <div className={"py-2 h-full w-full md:py-2"}>
                <div className={"h-8 mb-2 flex justify-center items-center"}>
                    {
                        tabs.map((tab) => {
                            if (tab.error && activeTab === tab.id) {
                                return (
                                    <div key={tab.id} className={"text-center leading-4 text-red-500 font-semibold"}>{tab.errorMsg}</div>
                                )
                            }
                        })
                    }
                </div>
                <div className={`${serviceSubmitted || activeTab === 0 ? "" : "border"} h-full`}>
                    {
                        activeTab === 0 ? <ScheduleFormPanelService/> : activeTab === 1 ?
                            <ScheduleFormPanelDetails/> : activeTab === 2 ? <ScheduleFormPanelContact/> :
                                <ScheduleFormPanelNotes/>
                    }
                </div>
            </div>
            <div className={"w-full flex items-end justify-center pt-4 gap-4 md:justify-end"}>
                {/*{*/}
                {/*    tabs.map((tab) => {*/}
                {/*        if (tab.error && activeTab === tab.id) {*/}
                {/*            return (*/}
                {/*                <span key={tab.id} className={"flex-grow text-center leading-4 md:text-xl text-red-500 font-semibold"}>{tab.errorMsg}</span>*/}
                {/*            )*/}
                {/*        }*/}
                {/*    })*/}
                {/*}*/}
                <ServiceFormButtons/>
            </div>
        </div>
    );
};

export default ScheduleForm;