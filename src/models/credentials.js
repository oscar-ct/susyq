import mongoose from "mongoose";

const Credentials = mongoose.Schema(
    {
        goHighLevelAuthToken: String,
        goHighLevelRefreshToken: String,
        serviceFusionAuthToken: String,
        serviceFusionRefreshToken: String,
        serviceFusionJWT: String,
    },
    {
        timestamps: true,
    }
);

export default mongoose.models.Credentials || mongoose.model("Credentials", Credentials);