import mongoose from "mongoose";

const Test = mongoose.Schema(
    {
        goHighLevelTriggerData: {},
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Test || mongoose.model("Test", Test);