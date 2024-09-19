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
        <div className={"min-h-[34rem]"}>
            <div className="w-full flex h-20">
                {
                    tabs?.map((tab, index) => {
                        return <ScheduleFormTab tabName={tab.name} key={index} id={tab.id} disabled={tab.disabled} error={tab.error}/>
                    })
                }
            </div>
            <div className={"p-2 h-full"}>
                <div className={`${serviceSubmitted ? "" : "border"} h-full`}>
                    {
                        activeTab === 0 ? <ScheduleFormPanelService/> : activeTab === 1 ?
                            <ScheduleFormPanelDetails/> : activeTab === 2 ? <ScheduleFormPanelContact/> :
                                <ScheduleFormPanelNotes/>
                    }
                </div>
            </div>
            <div className={"w-full flex items-end justify-end pt-4 px-2 gap-4"}>
                {
                    tabs.map((tab) => {
                        if (tab.error && activeTab === tab.id) {
                            return (
                                <span key={tab.id} className={"flex-grow text-center leading-4 md:text-xl text-red-500 font-semibold"}>{tab.errorMsg}</span>
                            )
                        }
                    })
                }
                <ServiceFormButtons/>
            </div>
        </div>
    );
};

export default ScheduleForm;