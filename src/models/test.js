import mongoose from "mongoose";

const Test = mongoose.Schema(
    {
        goHighLevelTriggerData: Schema.Types.Mixed,
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Test || mongoose.model("Test", Test);