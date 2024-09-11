import connectDB from "@/lib/connectDB";

import Test from "@/models/test";

export async function POST(req) {
    await connectDB();
    const triggerData = await req.json();
    const data = await Test.create({
        goHighLevelTriggerData: triggerData,
    });
    return Response.json(data)
}

